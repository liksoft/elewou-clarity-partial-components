import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ClrDatagrid, ClrDatagridStateInterface } from '@clr/angular';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DrewlabsRessourceServerClient } from 'src/app/lib/domain/http/core';
import { mapPaginatorStateWith } from 'src/app/lib/domain/pagination/helpers';
import { createSubject, observableOf } from 'src/app/lib/domain/rxjs/helpers';
import { doLog } from 'src/app/lib/domain/rxjs/operators';
import { isDefined } from 'src/app/lib/domain/utils';
import { onDossierAction, paginateDossiersAction } from './state/actions/dossier';
import { dossierResponseTypeToApplicationTypeDossier } from './state/helpers';
import { Dossier, DossierWithFilesConfigInterface, DossierInterface } from './state/models/dossier';
import { DossiersProvider } from './state/providers/dossier';
import * as _ from 'lodash';

@Component({
  selector: 'app-module-dossier-deposits',
  templateUrl: './module-dossier-deposits.component.html',
  styles: [
  ]
})
export class ModuleDossierDepositsComponent implements OnInit {

  @Input() buttonActionLabel: string = 'createFromDossierLabelText';
  // ressourcesStatus = environment.ressourcesStatus;
  @ViewChild('clrDataGrid', { static: false }) dataGrid: ClrDatagrid;
  @Input() initialGridState = { page: { current: 1, size: 20 } };
  @Input() query = {};
  // tslint:disable-next-line: variable-name
  private _datagridState$ = createSubject<ClrDatagridStateInterface>();
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject<{}>();

  @Output() createFromDossierEvent = new EventEmitter<DossierInterface>();

  // tslint:disable-next-line: variable-name
  _currentList: DossierInterface[] = [];

  state$ = this.provider.state$.pipe(
    map(state => ({
      performingAction: state.performingAction,
      dataSource: {
        ...state.collections,
        data: isDefined(state.collections) && isDefined(state.collections.data) ?
          state.collections.data.map(value => {
            // return dossierResponseTypeToApplicationTypeDossier(value);
            return (value instanceof Dossier) ?
              dossierResponseTypeToApplicationTypeDossier(value) as (DossierInterface & DossierWithFilesConfigInterface) :
              value;
          }) : []
      }
    })),
    tap(state => {
      const { dataSource } = state;
      if (dataSource) {
        const { data } = dataSource;
        this._currentList = data;
      }
    })
  );

  constructor(
    private provider: DossiersProvider,
    private client: DrewlabsRessourceServerClient
  ) { }

  ngOnInit(): void {
    this._datagridState$
      .pipe(
        takeUntil(this._destroy$),
        debounceTime(700),
        distinctUntilChanged(),
        switchMap((state: ClrDatagridStateInterface) => observableOf(state)),
        doLog('Forms Datagrid state: '),
        tap(state => {
          paginateDossiersAction(this.provider.store$)(this.client, 'dossiers', state);
        })
      ).subscribe();
  }

  // tslint:disable-next-line: variable-name
  onDgRefresh = (state: ClrDatagridStateInterface = null, _query: string = null) => this._datagridState$.next(mapPaginatorStateWith([
    {
      _query: _query || JSON.stringify(this.query)
    }
  ])(!_.isEmpty(state) ? state : this.initialGridState))

  onGoToDetailsView(value: DossierInterface): void {
    if (this._currentList) {
      const match = this._currentList.find((dossier) => {
        return dossier.id === value.id;
      });
      if (match) {
        onDossierAction(this.provider.store$)(match);
      }
    }
    this.createFromDossierEvent.emit(value);
  }

  ngOnDestroy(): void {
    this._destroy$.next({});
  }

}
