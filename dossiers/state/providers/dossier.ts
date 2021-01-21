import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createStore, onInitStoreStateAction } from 'src/app/lib/domain/rxjs/state/rx-state';
import { DossierState } from '../actions/dossier';
import { dossierReducer } from '../reducers/dossier';

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

@Injectable({
  providedIn: 'root'
})
export class DossiersProvider {

  public readonly store$ = createStore(dossierReducer, initialState);

  get state$(): Observable<DossierState> {
    return this.store$.connect();
  }

  setState(state?: Partial<DossierState>): void {
    onInitStoreStateAction(this.store$)(state || initialState);
  }
}
