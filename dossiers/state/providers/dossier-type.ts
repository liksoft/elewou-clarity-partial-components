import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createStore } from 'src/app/lib/domain/rxjs/state/rx-state';
import { DossierTypeState } from '../actions/dossier-type';
import { dossierTypeReducer } from '../reducers/dossier-type';

@Injectable({
  providedIn: 'root'
})
export class DossierTypeProvider {

  public readonly store$ = createStore(dossierTypeReducer, {
    items: {},
    performingAction: false,
    error: null
  });

  get state$(): Observable<DossierTypeState> {
    return this.store$.connect();
  }
}
