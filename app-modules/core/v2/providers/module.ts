import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { createStore } from '../../../../../../domain/rxjs/state/rx-state';
import { initialModulesState, ModulesState, resetModulesStore } from '../actions/module';
import { modulesReducer } from '../reducers/module';

@Injectable({
  providedIn: 'root'
})
export class ModulesProvider implements OnDestroy {

  public readonly store$ = createStore(modulesReducer, initialModulesState);
  // tslint:disable-next-line: typedef
  get state$(): Observable<ModulesState> {
    return this.store$.connect();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy() {
    resetModulesStore(this.store$)();
  }
}
