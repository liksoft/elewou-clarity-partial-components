import * as lodash from "lodash";
import {
  DefaultStoreAction,
  StoreAction,
} from "../../../../../../core/rxjs/state/rx-state";
import { ModulesState, ModulesStoreActions } from "../actions/module";
import { ModuleV2 } from "../models/module";

export const modulesReducer = (
  state: ModulesState,
  action: Partial<StoreAction>
) => {
  let items: ModuleV2[] = [];
  const values = [...state.items];
  const { item, updateResult, deleteResult } = action.payload || {};
  switch (action.type) {
    case DefaultStoreAction.ASYNC_UI_ACTION:
      return {
        ...state,
        performingAction: true,
        error: undefined,
      } as ModulesState;
    case DefaultStoreAction.ERROR_ACTION:
      return {
        ...state,
        performingAction: false,
        error: action.payload,
      } as ModulesState;
    case ModulesStoreActions.INIT_ITEMS_CACHE_ACTION:
      return {
        ...state,
        items: [...action.payload],
        performingAction: false,
        error: undefined,
      } as ModulesState;
    case ModulesStoreActions.PAGINATION_DATA_ACTION:
      return {
        ...state,
        pagination: action.payload,
        performingAction: false,
        error: undefined,
      } as ModulesState;
    case ModulesStoreActions.CREATED_MODULE_ACTION:
      return {
        ...state,
        items: [
          ...state.items,
          ...(!lodash.isEmpty(action.payload) ? [action.payload] : []),
        ],
        createdModule: action.payload,
        performingAction: false,
        error: undefined,
      } as ModulesState; //
    case ModulesStoreActions.INSERT_OR_UPDATE_ACTION:
      items = [...state.items];
      if (action.payload) {
        const module = items.findIndex((i) => i.id === action.payload.id);
        items.splice(module, 1, action.payload);
      } else {
        items = [...items, action.payload];
      }
      return {
        ...state,
        items,
        createdModule: undefined,
        performingAction: false,
        error: undefined,
      } as ModulesState;
    case ModulesStoreActions.MODULE_UPDATED_ACTION:
      if (item) {
        values.splice(
          items.findIndex((i) => i.id === item.id),
          1,
          action.payload
        );
      }
      return {
        ...state,
        items: [...values],
        performingAction: false,
        updateResult,
        error: undefined,
      } as ModulesState;
    case ModulesStoreActions.MODULE_DELETED_ACTION:
      items = [...state.items];
      if (item) {
        lodash.remove(values, (v) => v.id === item.id);
      }
      return {
        ...state,
        items: [...values],
        performingAction: false,
        deleteResult,
        error: undefined,
      } as ModulesState;
    default:
      return state;
  }
};
