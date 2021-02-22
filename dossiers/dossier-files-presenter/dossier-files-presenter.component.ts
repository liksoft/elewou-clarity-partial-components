import { Component, Input, OnDestroy } from '@angular/core';
import { distinctUntilChanged, } from 'rxjs/operators';
import { FileHelperService, TypeUtilHelper } from 'src/app/lib/domain/helpers';
import { ServerFileInterface } from 'src/app/lib/domain/helpers/file-helper.service';
import { createStateful, createSubject } from 'src/app/lib/domain/rxjs/helpers';
import { imagesMimeExtensions } from '../../partials-configs';
import { DossierFile, DossierInterface } from '../state/models/dossier';
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
        this.getDossierFiles().subscribe();
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
  @Input() performingAction = false;

  constructor(
    private dossiersProvider: DossiersProvider,
    public readonly fileHelper: FileHelperService,
    public readonly typeHelper: TypeUtilHelper
  ) { }

  getDossierFiles() {
    return this.dossiersProvider.getDossierFiles(this.dossier);
  }

  ngOnDestroy(): void { this._destroy$.next({}); }

}
