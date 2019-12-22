import { IAction } from 'src/app/lib/domain/store/action-interface';
import {
  IPayload,
  IReducer,
  removeByKeyHandler,
  addToStoreHandler,
  initializeStoreHandler,
  AbstractReducer
} from 'src/app/lib/domain/store';
import { List } from 'immutable';
import { TypeBuilder } from 'src/app/lib/domain/built-value/contracts/type';
import { isDefined } from 'src/app/lib/domain/utils/type-utils';
import { Module } from './module';

export const MODULES_STORE = 'modules';
export const MODULE_UPDATED = 'module_updated';
export const MODULE_DELETED = 'module_deleted';
export const MODULE_CONTAINER_INITIALIZED = 'modules_container_initialized';
export const MODULE_CREATED = 'module_created';

function initiModuleStore(reducer: IReducer<Module>, payload: IPayload): void {
  reducer.items.next(List(initializeStoreHandler(payload.value as List<Module>)));
}

function removeModuleByKey(reducer: IReducer<Module>, payload: IPayload): void {
  reducer.items.next(List(removeByKeyHandler(reducer.items.getValue(), payload.index as string|number, payload.needle)));
}

function addModule(reducer: IReducer<Module>, payload: IPayload): void {
  reducer.items.next(List(addToStoreHandler(reducer.items.getValue(), payload.value as Module)));
}

function updateModule(reducer: IReducer<Module>, payload: IPayload): void {
  if (!isDefined(reducer.items.getValue())) {
    return;
  }
  const items = reducer.items.getValue();
  const index = items.findIndex((value: Module) => value[payload.index] === payload.needle);
  const item = items.get(index);
  reducer.items.next(List(items.set(index, (Module.builder() as TypeBuilder<Module>).rebuild(item, payload.value))));
}

export class ModuleReducer extends AbstractReducer<Module> {

  constructor() {
    super({
      module_updated: updateModule,
      module_deleted: removeModuleByKey,
      modules_container_initialized: initiModuleStore,
      module_created: addModule
    });
  }
  protected onStream(stream: IAction) {
    if (this.handlers.contains(stream.type)) {
      this.handlers.get(stream.type)(this, stream.payload);
    }
  }
}
