import { catchError, map } from 'rxjs/operators';
import { DrewlabsRessourceServerClient } from 'src/app/lib/domain/http/core';
import { getResponseDataFromHttpResponse } from 'src/app/lib/domain/http/helpers';
import { emptyObservable } from 'src/app/lib/domain/rxjs/helpers';
import { isArray, isDefined } from 'src/app/lib/domain/utils';
import { createAction, DefaultStoreAction, DrewlabsFluxStore, onErrorAction, StoreAction } from 'src/app/lib/domain/rxjs/state/rx-state';
import { DossierType } from '../models/dossier-type';

export enum DossierTypeStoreActions {
  GET_ALL_VALUES = '[GET_ALL_DOSSIER_TYPES]'
}

export class DossierTypeState {
  items: { [prop: string]: DossierType };
  performingAction: boolean;
  error: any;
}

export const deserializeSerializedDossierType = (value: { [prop: string]: any }) => DossierType.builder().fromSerialized(value);

export const getAllDossierTypesAction = (store: DrewlabsFluxStore<DossierTypeState, Partial<StoreAction>>) =>
  createAction(store, (
    client: DrewlabsRessourceServerClient,
    path: string,
    params: { [index: string]: any } = {}
  ) => ({
    type: DefaultStoreAction.ASYNC_UI_ACTION,
    payload: client.get(`${path}`, { params })
      .pipe(
        map(state => {
          const data = getResponseDataFromHttpResponse(state);
          if (isDefined(data) && isArray(data)) {
            onDossierTypesAction(store)(
              (data as any[]).map(
                (current) => deserializeSerializedDossierType(current)
              )
            );
          }
        }),
        catchError(err => {
          onErrorAction(store)(err);
          return emptyObservable();
        })
      )
  }));

export const onDossierTypesAction = (store: DrewlabsFluxStore<DossierTypeState, Partial<StoreAction>>) =>
  createAction(store, (payload: DossierType[]) => {
    return {
      type: DossierTypeStoreActions.GET_ALL_VALUES,
      payload
    };
  });
