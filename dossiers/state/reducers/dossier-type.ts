import { listItemToIdMaps } from 'src/app/lib/core/rxjs/helpers';
import { DefaultStoreAction, StoreAction } from 'src/app/lib/core/rxjs/state/rx-state';
import { DossierTypeState, DossierTypeStoreActions } from '../actions/dossier-type';


export const dossierTypeReducer = (state: DossierTypeState, action: Partial<StoreAction>) => {
  switch (action.type) {
    case DefaultStoreAction.ASYNC_UI_ACTION:
      return {
        ...state,
        performingAction: true,
        error: null,
      } as DossierTypeState;
    case DefaultStoreAction.ERROR_ACTION:
      return {
        ...state,
        performingAction: false,
        error: action.payload
      } as DossierTypeState;
    case DossierTypeStoreActions.GET_ALL_VALUES:
      return {
        ...state,
        items: listItemToIdMaps(action.payload),
        performingAction: false,
        error: null
      } as DossierTypeState;
    default:
      return state;
  }
};
