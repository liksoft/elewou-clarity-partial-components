import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DrewlabsRessourceServerClient } from 'src/app/lib/domain/http/core';
import { getResponseDataFromHttpResponse } from 'src/app/lib/domain/http/helpers';
import { createStore, onErrorAction, onInitStoreStateAction } from 'src/app/lib/domain/rxjs/state/rx-state';
import { isArray, isDefined } from 'src/app/lib/domain/utils';
import { DossierState, dossierUpdatedAction } from '../actions/dossier';
import { Dossier, DossierFile, DossierInterface } from '../models/dossier';
import { dossierReducer } from '../reducers/dossier';
import { UIStateStatusCode } from '../../../../../domain/helpers/app-ui-store-manager.service';

export const initialState = {
  collections: {
    currentPage: 1,
    total: 0,
    items: {},
    data: [],
    lastPage: null,
    nextPageURL: null,
    lastPageURL: null
  },
  currentDossier: null,
  createResult: null,
  updateResult: null,
  deleteResult: null,
  performingAction: false,
  error: null
};

@Injectable()
export class DossiersProvider {

  public readonly store$ = createStore(dossierReducer, initialState);

  public constructor(
    private client: DrewlabsRessourceServerClient,
    @Inject('DOSSIER_FILES_ENDOINT') public readonly filesEndpoint: string,
    @Inject('DOSSIER_ENDPOINT') public readonly dossierEndpointURL: string
  ) { }

  get state$(): Observable<DossierState> {
    return this.store$.connect();
  }

  setState(state?: Partial<DossierState>): void {
    onInitStoreStateAction(this.store$)(state || initialState);
  }

  getDossierFiles(dossier: DossierInterface) {
    return this.client.get(this.filesEndpoint, {
      params: {
        _query: JSON.stringify({
          where: [
            'dossier_id',
            dossier?.id
          ]
        })
      }
    }).pipe(
      map(state => {
        const data = getResponseDataFromHttpResponse(state);
        if (isDefined(data) && isArray(data)) {
          dossierUpdatedAction(this.store$)({
            updateResult: null,
            currentDossier: Dossier.builder().rebuild(
              (dossier) as Dossier, {
              dossierFiles: (data as { [prop: string]: any }[]).map(
                (file) => DossierFile.builder().fromSerialized(file)
              )
            })
          });
        }
        return UIStateStatusCode.STATUS_OK;
      })
    );
  }

  getDossier(id: string | number, params = {}): Observable<Dossier|any> {
    return this.client.getUsingID(this.dossierEndpointURL, id, { params })
      .pipe(
        map((state) => {
          // tslint:disable-next-line: one-variable-per-declaration
          const data = getResponseDataFromHttpResponse(state);
          if (isDefined(data)) {
            return Dossier.builder().fromSerialized(data);
          }
          return data;
        })
      )
  }
}
