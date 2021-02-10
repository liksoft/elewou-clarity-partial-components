import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { FileHelperService, TypeUtilHelper } from 'src/app/lib/domain/helpers';
import { ServerFileInterface } from 'src/app/lib/domain/helpers/file-helper.service';
import { DrewlabsRessourceServerClient } from 'src/app/lib/domain/http/core';
import { getResponseDataFromHttpResponse } from 'src/app/lib/domain/http/helpers';
import { createStateful, createSubject } from 'src/app/lib/domain/rxjs/helpers';
import { isArray, isDefined } from 'src/app/lib/domain/utils';
import { imagesMimeExtensions } from '../../partials-configs';
import { dossierUpdatedAction } from '../state/actions/dossier';
import { Dossier, DossierFile, DossierInterface } from '../state/models/dossier';
import { DossiersProvider } from '../state/providers/dossier';
import * as strings from 'src/app/lib/domain/utils/types/strings';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dossier-files-presenter',
  templateUrl: './dossier-files-presenter.component.html',
  styles: []
})
export class DossierFilesPresenterComponent implements OnDestroy {
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject();
  // tslint:disable-next-line: variable-name
  private _loadFromServer = false;
  // tslint:disable-next-line: variable-name
  _files$ = createStateful<ServerFileInterface[]>([]);
  @Input() set dossierFiles(values: DossierFile[]) {
    if (values && values.length > 0) {
      Promise.all(values.map(value => {
        const { name, url, label } = value.file;
        return { name, url, label, id: value.id, extension: name ? strings.afterLast('.', name) : '' };
      }).map(async (file) => {
        const { name, label, url, id, extension } = file;
        const result = await this.fileHelper.urlToServerFileInterface(url, { name: label || name, id, extension });
        return { ...result, isImageRessource: [...imagesMimeExtensions].includes(result.extension) };
      })).then(files => {
        this._files$.next(files);
      });
    } else {
      if (!this._loadFromServer) {
        this.getDossierFiles();
      }
      this._loadFromServer = true;
    }
  }
  get files$(): Observable<ServerFileInterface[]> {
    return this._files$.pipe(
      distinctUntilChanged(),
    );
  }
  // tslint:disable-next-line: variable-name
  _dossier: DossierInterface;
  @Input() set dossier(value: DossierInterface) {
    this._dossier = value;
  }
  get dossier(): DossierInterface {
    return this._dossier;
  }
  constructor(
    private client: DrewlabsRessourceServerClient,
    private dossiersProvider: DossiersProvider,
    @Inject('DOSSIER_FILES_ENDOINT') private endpointURL: string,
    public readonly fileHelper: FileHelperService,
    public readonly typeHelper: TypeUtilHelper
  ) { }

  getDossierFiles(): void {
    this.client.get(this.endpointURL, {
      params: {
        _query: JSON.stringify({
          where: [
            'dossier_id',
            this.dossier.id
          ]
        })
      }
    }).pipe(
      takeUntil(this._destroy$),
      map(state => {
        const data = getResponseDataFromHttpResponse(state);
        if (isDefined(data) && isArray(data)) {
          dossierUpdatedAction(this.dossiersProvider.store$)({
            updateResult: null,
            currentDossier: Dossier.builder().rebuild(
              (this.dossier as DossierInterface) as Dossier, {
              dossierFiles: (data as { [prop: string]: any }[]).map(
                (file) => DossierFile.builder().fromSerialized(file)
              )
            })
          });
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void { this._destroy$.next({}); }

}
