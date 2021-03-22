// TODO : Implements the dossier reducer
import { UIStateStatusCode } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { insertOrUpdateValuesUsingID, updatePaginationData } from 'src/app/lib/domain/rxjs/helpers';
import { DefaultStoreAction, StoreAction } from 'src/app/lib/domain/rxjs/state/rx-state';
import { PaginationDataState } from 'src/app/lib/domain/rxjs/types';
import { DossierState, DossierStoreActions } from '../actions/dossier';
import { Dossier } from '../models/dossier';

export const dossierReducer = (state: DossierState, action: Partial<StoreAction>) => {
  const { createResult, currentDossier, updateResult, deleteResult }: {
    updateResult: UIStateStatusCode,
    createResult: UIStateStatusCode,
    deleteResult: UIStateStatusCode
    currentDossier: Dossier
  } = action.payload || {};
  switch (action.type) {
    case DefaultStoreAction.ASYNC_UI_ACTION:
      return {
        ...state,
        performingAction: true,
        createResult: null,
        updateResult: null,
        deleteResult: null,
        currentDossier: null,
        error: null,
      } as DossierState;
    case DefaultStoreAction.ERROR_ACTION:
      return {
        ...state,
        performingAction: false,
        createResult: null,
        updateResult: null,
        deleteResult: null,
        currentDossier: null,
        error: action.payload
      } as DossierState;
    case DossierStoreActions.NEW_VALUE_ACTION:
      return {
        ...state,
        collections: action.payload ? {
          ...(state.collections || {}),
          items: insertOrUpdateValuesUsingID(
            state.collections ? (state.collections.items || {}) : {}, action.payload
          )
        } : { ...state.collections },
        currentDossier: action.payload,
        performingAction: false,
        error: null
      } as DossierState;
    case DossierStoreActions.GET_ALL_VALUES:
      return {
        ...state,
        collections: {
          ...state.collections,
          data: action.payload as Dossier[]
        } as PaginationDataState<Dossier>,
        createResult: null,
        updateResult: null,
        deleteResult: null,
        currentDossier: null,
        performingAction: false,
        error: null
      } as DossierState;
    case DossierStoreActions.PAGINATION_RESULT:
      return {
        ...state,
        collections: updatePaginationData<Dossier>(state.collections, action.payload),
        performingAction: false,
        error: null
      } as DossierState;
    case DossierStoreActions.CREATE_RESULT_ACTION:
      return {
        ...state,
        collections: currentDossier ? {
          ...state.collections,
          items: insertOrUpdateValuesUsingID(
            state.collections ? (state.collections.items || {}) : {}, currentDossier
          )
        } : { ...state.collections },
        currentDossier: currentDossier || state.currentDossier,
        createResult,
        performingAction: false,
        error: null
      } as DossierState;
    case DossierStoreActions.UPDATE_RESULT_ACTION:
      return {
        ...state,
        updateResult,
        collections: currentDossier ? {
          ...state.collections, items: insertOrUpdateValuesUsingID(
            state.collections ? (state.collections.items || {}) : {}, currentDossier
          )
        } : { ...state.collections },
        currentDossier: currentDossier || state.currentDossier,
        performingAction: false,
        error: null
      } as DossierState;
    default:
      return state;
  }
};
