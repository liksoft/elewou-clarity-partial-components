import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DrewlabsRessourceAssignment } from './ressource-assignment';
import { User } from 'src/app/lib/core/auth/contracts/v2';
import { UIStateStatusCode } from 'src/app/lib/core/helpers/app-ui-store-manager.service';
import { DrewlabsRessourceAssignmentService } from './ressource-assignment.service';
import { Dialog, isArray } from 'src/app/lib/core/utils';
import { DrewlabsRessourceServerClient, IResponseBody } from 'src/app/lib/core/http/core';
import { UsersProvider } from '../../../../core/auth/core/providers';
import { getUsersAction } from '../../../../core/auth/core/actions/app-users';
import { map, takeUntil } from 'rxjs/operators';
import { AppUIStateProvider } from '../../../../core/helpers/app-ui-store-manager.service';
import { combineLatest } from 'rxjs';
import { createSubject } from '../../../../core/rxjs/helpers/index';
import { doLog } from '../../../../core/rxjs/operators/index';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'drewlabs-ressource-assignment',
  templateUrl: './ressource-assignment.component.html',
  styles: [
    `
    .dropdown .dropdown-toggle.btn {
      margin-right: .5rem;
    }
    .clr-dropdown-menu {
      max-height: 200px;
      width: 100%;
    }

    .users-viewport {
      min-height: 75px;
      width: auto;
      overflow-x: hidden;
    }
    `
  ]
})
export class DrewlabsRessourceAssignmentComponent implements OnDestroy {

  @Input() collectionID: number | string;
  // @Input() public permission: string[] | string;
  @Input() public buttonDisabled = false;
  @Input() selectedIds: number[] = [];
  // tslint:disable-next-line: no-inferrable-types
  @Input() triggerButtonClass: string = 'btn btn-primary';
  @Output() assignmentCompletedSuccessfully = new EventEmitter<object>();

  @Input() set permission(value: string | string[]) {
    if (value) {
      // tslint:disable-next-line: prefer-const
      let queryParams = {};
      if (isArray(value.length)) {
        queryParams = { ...queryParams, permission: `${(value as string[]).join(',')}`.trim() };
      } else if (!isArray(value.length)) {
        queryParams = { ...queryParams, permission: (value as string).trim() };
      }
      getUsersAction(this._usersProvider.store$)(this._client, 'users', queryParams);
    }
  }

  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject();

  // tslint:disable-next-line: variable-name
  _usersState$ = this._usersProvider.state$.pipe(
    map(state => ({ performingAction: state.performingAction, items: state.items || {} })),
    map(state => ({ ...state, items: Object.values(state.items) }))
  );

  state$ = combineLatest([
    this._usersState$,
    this._uiState.uiState
  ]).pipe(
    map(([state, uistate]) => ({ ...state, performingAction: state.performingAction || uistate.performingAction })),
    doLog('Assignment component state:')
  );

  constructor(
    // tslint:disable-next-line: variable-name
    private _uiState: AppUIStateProvider,
    private dialog: Dialog,
    public componentService: DrewlabsRessourceAssignmentService,
    // tslint:disable-next-line: variable-name
    private _usersProvider: UsersProvider,
    // tslint:disable-next-line: variable-name
    private _client: DrewlabsRessourceServerClient
  ) {
    this._usersState$.pipe(takeUntil(this._destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next({});
  }

  // tslint:disable-next-line: typedef
  async onUserSelected(user: User) {
    this.onBatchAssignment(user, this.selectedIds);
  }

  // tslint:disable-next-line: typedef
  async onBatchAssignment(user: User, selectedItems: number[]) {
    const translations = await this.componentService.loadTranslations(null, user.username, selectedItems.length);
    if (this.dialog.confirm(translations.batchAssignmentPrompt)) {
      this._uiState.startAction();
      this.componentService.createAssignment(
        `${this.componentService.assignationRessoucesPath}/${this.collectionID}`, selectedItems.map((i) => {
          return {
            ressource_id: i,
            assigned_to: user.id
          };
        }))
        .then((res) => {
          this.onAssignmentResponse(res, translations);
        })
        .catch((_) => {
          this._uiState.endAction(translations.serverRequestFailed, UIStateStatusCode.ERROR);
        });
    }
  }

  // tslint:disable-next-line: deprecation
  onAssignmentResponse = (res: DrewlabsRessourceAssignment | IResponseBody, trans: any) => {
    if ((res instanceof DrewlabsRessourceAssignment) || (res.statusOK)) {
      // Notify the parent of successful completion of the assignment request
      this.assignmentCompletedSuccessfully.emit({});
      this._uiState
        .endAction(trans.successfullAssignment, UIStateStatusCode.STATUS_OK);
      this.buttonDisabled = true;
    } else if (res.errors) {
      this._uiState
        .endAction(trans.invalidRequestParams, UIStateStatusCode.BAD_REQUEST);
    } else {
      this._uiState
        .endAction(trans.serverRequestFailed, UIStateStatusCode.BAD_REQUEST);
    }
  }
}
