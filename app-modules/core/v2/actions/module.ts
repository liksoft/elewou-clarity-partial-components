import { ModuleV2 } from '../models/module';
import { PaginationData } from 'src/app/lib/pagination/types';
import { GenericUndecoratedSerializaleSerializer } from 'src/app/lib/built-value/core/js/serializer';
import { createAction, DefaultStoreAction, DrewlabsFluxStore, onErrorAction, StoreAction } from 'src/app/lib/rxjs/state/rx-state';
import { DrewlabsRessourceServerClient } from 'src/app/lib/http/core/ressource-server-client';
import { catchError, map } from 'rxjs/operators';
import { isArray, isDefined, isObject, MomentUtils } from 'src/app/lib/utils';
import { emptyObservable } from 'src/app/lib/rxjs/helpers';
import { getResponseDataFromHttpResponse } from 'src/app/lib/http/helpers/http-response';
import { HttpErrorResponse } from '@angular/common/http';
import { IAppStorage } from 'src/app/lib/storage/contracts';
import * as moment from 'moment';

const MODULES_CACHE_KEY = 'X_APP_MODULES';

export interface ModulesState {
  performingAction: boolean;
  items: ModuleV2[];
  pagination: PaginationData<ModuleV2>;
  createdModule: ModuleV2;
  updateResult: boolean;
  deleteResult: boolean;
  error: any;
}

const deserializeSerializedModule = (serialized: any) => {
  return new GenericUndecoratedSerializaleSerializer()
    .fromSerialized(ModuleV2, serialized) as ModuleV2;
};

export enum ModulesStoreActions {
  PAGINATION_DATA_ACTION = '[MODULE_PAGINATION_DATA]',
  CREATED_MODULE_ACTION = '[CREATED_MODULE]',
  INSERT_OR_UPDATE_ACTION = '[INSERT_OR_UPDATE]',
  MODULE_UPDATED_ACTION = '[MODULE_UPDATED]',
  MODULE_DELETED_ACTION = '[MODULE_DELETED]',
  INIT_ITEMS_CACHE_ACTION = '[INIT_MODULES_CACHE]',
  RESET_STORE = '[RESETTING_MODULE_STORE]'
}

export const getModulesAction = (store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, (
    client: DrewlabsRessourceServerClient,
    path: string,
    params: { [index: string]: any } = {},
    _cache: IAppStorage = null
  ) => {
    if (_cache) {
      const state: { expired_at: string, modules: { [prop: string]: any }[] } = _cache.get(MODULES_CACHE_KEY);
      let serialized: { [prop: string]: any };
      if (state && state.expired_at) {
        serialized = state.modules;
        if (MomentUtils.isAfter(state.expired_at, moment().format('YYYY-MM-DD hh:mm:ss'))) {
          // Cache expires, Invalidate the cache by deleting the curren state
          _cache.delete(MODULES_CACHE_KEY);
        }
      }
      if (serialized) {
        const modules = (serialized as any[]).map((current) => deserializeSerializedModule(current));
        return modulesDataAction(store)(modules);
      }
    }
    // Else make an HTTP request
    return {
      type: DefaultStoreAction.ASYNC_UI_ACTION,
      payload: client.get(`${path}`, { params })
        .pipe(
          map(state => {
            const data = getResponseDataFromHttpResponse(state);
            if (isDefined(data) && isArray(data)) {
              const modules = (data as any[]).map((current) => deserializeSerializedModule(current));
              modulesDataAction(store)(modules);
              if (isDefined(_cache)) {
                _cache.set(MODULES_CACHE_KEY, { expired_at: moment().add(6, 'hours').format('YYYY-MM-DD hh:mm:ss'), modules: data });
              }
            }
          }),
          catchError(err => {
            onErrorAction(store)(err);
            return emptyObservable();
          })
        )
    };
  });

export const modulesDataAction = (store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, (payload: ModuleV2[]) => {
    return {
      type: ModulesStoreActions.INIT_ITEMS_CACHE_ACTION,
      payload
    };
  });

export const poaginateModuleAction = (store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, (
    client: DrewlabsRessourceServerClient,
    path: string,
    params: { [index: string]: any } = {}
  ) => {
    return {
      type: DefaultStoreAction.ASYNC_UI_ACTION,
      payload: client.get(`${path}`, { params })
        .pipe(
          map(state => {
            const { data, total } = isDefined(state.data)
              && (isDefined(state.data.data)) ? state.data : state;
            if (isDefined(data) && isArray(data)) {
              onModulePaginationDataLoaded(store)({
                data: (data as any[]).map((current) => deserializeSerializedModule(current)),
                total
              });
            } else {
              onModulePaginationDataLoaded(store)({ data: [], total: 0 });
            }
          }),
          catchError(err => {
            onErrorAction(store)(err);
            return emptyObservable();
          })
        )
    };
  });


export const onModulePaginationDataLoaded = (store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, (payload: PaginationData<ModuleV2>) => {
    return {
      type: ModulesStoreActions.PAGINATION_DATA_ACTION,
      payload
    };
  });

export const createModuleAction = (
  store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, (client: DrewlabsRessourceServerClient, path: string, body: { [index: string]: any }) =>
  ({
    type: DefaultStoreAction.ASYNC_UI_ACTION,
    payload: client.create(path, body)
      .pipe(
        map((state) => {
          // tslint:disable-next-line: one-variable-per-declaration
          const data = getResponseDataFromHttpResponse(state);
          if (isDefined(data)) {
            return moduleCreatedAction(store)(deserializeSerializedModule(data));
          }
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            const errorResponse = client.handleErrorResponse(err);
            onErrorAction(store)(errorResponse);
          } else {
            onErrorAction(err);
          }
          return emptyObservable();
        })
      )
  }));

export const moduleCreatedAction = (
  store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, (payload: ModuleV2) =>
    ({ type: ModulesStoreActions.CREATED_MODULE_ACTION, payload }));

export const updateModuleAction = (
  store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, (client: DrewlabsRessourceServerClient, path: string, id: number | string, body: { [index: string]: any }) =>
  ({
    type: DefaultStoreAction.ASYNC_UI_ACTION,
    payload: client.updateUsingID(path, id, body)
      .pipe(
        map((state) => {
          // tslint:disable-next-line: one-variable-per-declaration
          const data = getResponseDataFromHttpResponse(state);
          if (isDefined(data)) {
            if (isObject(data)) {
              return moduleUpdatedAction(store)({
                item: deserializeSerializedModule(data),
                updateResult: true
              });
            } else {
              return moduleUpdatedAction(store)({ updateResult: true });
            }
          }
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            const errorResponse = client.handleErrorResponse(err);
            onErrorAction(store)(errorResponse);
          } else {
            onErrorAction(err);
          }
          return emptyObservable();
        })
      )
  }));

export const moduleUpdatedAction = (
  store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, (payload: { [index: string]: any }) =>
    ({ type: ModulesStoreActions.MODULE_UPDATED_ACTION, payload }));



export const deleteModuleAction = (
  store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, (client: DrewlabsRessourceServerClient, path: string, id: number | string) =>
  ({
    type: DefaultStoreAction.ASYNC_UI_ACTION,
    payload: client.deleteUsingID(path, id)
      .pipe(
        map((state) => {
          // tslint:disable-next-line: one-variable-per-declaration
          const data = getResponseDataFromHttpResponse(state);
          if (isDefined(data)) {
            if (isObject(data)) {
              return moduleDeletedAction(store)({
                item: deserializeSerializedModule(data),
                deleteResult: true
              });
            } else {
              return moduleDeletedAction(store)({ deleteResult: true });
            }
          }
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            const errorResponse = client.handleErrorResponse(err);
            onErrorAction(store)(errorResponse);
          } else {
            onErrorAction(err);
          }
          return emptyObservable();
        })
      )
  }));

export const moduleDeletedAction = (
  store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, (payload: { [index: string]: any }) =>
    ({ type: ModulesStoreActions.MODULE_DELETED_ACTION, payload }));


export const initialModulesState: ModulesState = {
  items: [],
  pagination: {} as PaginationData<ModuleV2>,
  createdModule: null,
  performingAction: false,
  error: null,
  updateResult: null,
  deleteResult: null
};

export const resetModulesStore = (store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, () => {
    return {
      type: ModulesStoreActions.RESET_STORE,
      payload: initialModulesState
    };
  });


export const getModuleUsingID = (
  store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, (client: DrewlabsRessourceServerClient, path: string, id: string | number) =>
  ({
    type: DefaultStoreAction.ASYNC_UI_ACTION,
    payload: client.getUsingID(path, id)
      .pipe(
        map((state) => {
          // tslint:disable-next-line: one-variable-per-declaration
          const data = getResponseDataFromHttpResponse(state);
          if (isDefined(data)) {
            return addModuleToList(store)(deserializeSerializedModule(data));
          }
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            const errorResponse = client.handleErrorResponse(err);
            onErrorAction(store)(errorResponse);
          } else {
            onErrorAction(err);
          }
          return emptyObservable();
        })
      )
  }));

export const addModuleToList = (store: DrewlabsFluxStore<ModulesState, Partial<StoreAction>>) =>
  createAction(store, (payload: ModuleV2) => {
    return {
      type: ModulesStoreActions.INSERT_OR_UPDATE_ACTION,
      payload
    };
  });
