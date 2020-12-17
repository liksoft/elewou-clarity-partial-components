import { HttpErrorResponse } from '@angular/common/http';
import { isObject } from 'lodash';
import { catchError, map } from 'rxjs/operators';
import { DrewlabsHttpResponseStatusCode, DrewlabsRessourceServerClient } from 'src/app/lib/http/core';
import { createAction, DefaultStoreAction, DrewlabsFluxStore, onErrorAction, StoreAction } from 'src/app/lib/rxjs/state/rx-state';
import { Dossier } from '../models/dossier';
import { getResponseDataFromHttpResponse } from 'src/app/lib/http/helpers';
import { emptyObservable } from 'src/app/lib/rxjs/helpers';
import { isArray, isDefined } from 'src/app/lib/utils';
import { UIStateStatusCode } from 'src/app/lib/helpers';
import { PaginationDataState } from 'src/app/lib/rxjs/types';

export enum DossierStoreActions {
  GET_ALL_VALUES = '[GET_ALL_DOSSIERS]',
  PAGINATION_RESULT = '[DOSSIER_PAGINASTION_RESULT_VALUES]',
  CREATE_RESULT_ACTION = '[CREATE_DOSSIER_RESULT]',
  UPDATE_RESULT_ACTION = '[UPDATE_DOSSIER_RESULT]',
  DELETE_RESULT_ACTION = '[DELETE_DOSSIER_RESULT]',
  NEW_VALUE_ACTION = '[NEW_DOSSIER]'
}

export class DossierState {
  performingAction: boolean;
  error: any;
  currentDossier: Dossier;
  collections: PaginationDataState<Dossier>;
  createResult: UIStateStatusCode;
  updateResult: UIStateStatusCode;
  deleteResult: UIStateStatusCode;
}

export const deserializeSerializedDossier = (value: { [prop: string]: any }) => Dossier.builder().fromSerialized(value);

export const paginateDossiersAction = (store: DrewlabsFluxStore<DossierState, Partial<StoreAction>>) =>
  createAction(store, (
    client: DrewlabsRessourceServerClient,
    path: string,
    params: { [index: string]: any } = {}
  ) => {
    return {
      type: DefaultStoreAction.ASYNC_UI_ACTION,
      payload: client.get(path, { params }).pipe(
        map(state => {
          const { data, total } = isDefined(state.data)
            && (isDefined(state.data.data)) ? state.data : state;
          if (isDefined(data) && isArray(data)) {
            onPaginationResultAction(store)({
              data: (data as any[]).map(
                (current) => deserializeSerializedDossier(current)
              ),
              total
            } as PaginationDataState<Dossier>);
          } else {
            onPaginationResultAction(store)(
              {
                data: [],
                total: 0
              } as PaginationDataState<Dossier>);
          }
        })
      ),
    };
  });

export const onPaginationResultAction = (
  store: DrewlabsFluxStore<DossierState, Partial<StoreAction>>) =>
  createAction(store, (payload: PaginationDataState<Dossier>) =>
    ({ type: DossierStoreActions.PAGINATION_RESULT, payload }));

export const createDossierAction = (store: DrewlabsFluxStore<Partial<DossierState>, Partial<StoreAction>>) =>
  createAction(
    store, (client: DrewlabsRessourceServerClient, path: string, body: { [index: string]: any }, params: { [index: string]: any } = {}) => {
      return {
        type: DefaultStoreAction.ASYNC_UI_ACTION,
        payload: client.create(
          path,
          body,
          params
        ).pipe(
          map(state => {
            // tslint:disable-next-line: one-variable-per-declaration
            const data = getResponseDataFromHttpResponse(state);
            // Parse and return the loaded data
            if (data) {
              return dossierCreatedAction(store)(
                {
                  createResult: UIStateStatusCode.STATUS_CREATED,
                  currentDossier: deserializeSerializedDossier(data)
                });
            }
          }),
          catchError(err => {
            if (err instanceof HttpErrorResponse) {
              const errorResponse = client.handleErrorResponse(err);
              onErrorAction(store)(errorResponse);
            } else {
              onErrorAction(store)(err);
            }
            return emptyObservable();
          })
        )
      };
    });

export const dossierCreatedAction = (store: DrewlabsFluxStore<Partial<DossierState>, Partial<StoreAction>>) =>
  createAction(
    store, (payload: { currentDossier: Dossier, createResult: UIStateStatusCode }) => ({
      type: DossierStoreActions.CREATE_RESULT_ACTION,
      payload
    }));

export const updateDossierAction = (store: DrewlabsFluxStore<Partial<DossierState>, Partial<StoreAction>>) =>
  createAction(
    store, (client: DrewlabsRessourceServerClient, path: string, id: number | string, body: { [index: string]: any }) => {
      return {
        type: DefaultStoreAction.ASYNC_UI_ACTION,
        payload: client.updateUsingID(
          path,
          id,
          body,
        ).pipe(
          map(state => {
            // tslint:disable-next-line: one-variable-per-declaration
            const data = getResponseDataFromHttpResponse(state);
            return dossierUpdatedAction(store)({
              updateResult: state.statusCode === DrewlabsHttpResponseStatusCode.STATUS_OK ?
                UIStateStatusCode.STATUS_OK : UIStateStatusCode.BAD_REQUEST,
              currentDossier: isObject(data) ? deserializeSerializedDossier(data) : null
            });
            // Review the returned data in order to know how to parse it
          }),
          catchError(err => {
            if (err instanceof HttpErrorResponse) {
              const errorResponse = client.handleErrorResponse(err);
              onErrorAction(store)(errorResponse);
            } else {
              onErrorAction(store)(err);
            }
            return emptyObservable();
          })
        )
      };
    });

export const dossierUpdatedAction = (store: DrewlabsFluxStore<Partial<DossierState>, Partial<StoreAction>>) =>
  createAction(
    store, (payload: { updateResult: UIStateStatusCode, currentDossier: Dossier }) => ({
      type: DossierStoreActions.UPDATE_RESULT_ACTION,
      payload
    }));

export const getDossierUsingID = (
  store: DrewlabsFluxStore<DossierState, Partial<StoreAction>>) =>
  createAction(store, (
    client: DrewlabsRessourceServerClient,
    path: string,
    id: string | number,
    params: { [prop: string]: any } = {}
  ) =>
  ({
    type: DefaultStoreAction.ASYNC_UI_ACTION,
    payload: client.getUsingID(path, id, { params })
      .pipe(
        map((state) => {
          // tslint:disable-next-line: one-variable-per-declaration
          const data = getResponseDataFromHttpResponse(state);
          if (isDefined(data)) {
            return onDossierAction(store)((deserializeSerializedDossier(data)));
          }
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            const errorResponse = client.handleErrorResponse(err);
            onErrorAction(store)(errorResponse);
          } else {
            onErrorAction(store)(err);
          }
          return emptyObservable();
        })
      )
  }));

export const onDossierAction = (
  store: DrewlabsFluxStore<DossierState, Partial<StoreAction>>) =>
  createAction(store, (payload: Dossier) =>
    ({ type: DossierStoreActions.NEW_VALUE_ACTION, payload }));
