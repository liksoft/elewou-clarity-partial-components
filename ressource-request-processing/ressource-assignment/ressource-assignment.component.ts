import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DrewlabsRessourceAssignment } from './ressource-assignment';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { User } from 'src/app/lib/domain/auth/contracts/v2';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { DrewlabsRessourceAssignmentService } from './ressource-assignment.service';
import { Dialog, isDefined, isArray } from 'src/app/lib/domain/utils';
import { IResponseBody } from 'src/app/lib/domain/http/core';

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
export class DrewlabsRessourceAssignmentComponent extends AbstractAlertableComponent implements OnInit {

  @Input() collectionID: number | string;
  public users: User[];
  @Input() public permission: string[] | string;
  @Input() public buttonDisabled = false;
  @Input() selectedIds: number[] = [];
  // tslint:disable-next-line: no-inferrable-types
  @Input() triggerButtonClass: string = 'btn btn-primary';
  @Output() assignmentCompletedSuccessfully = new EventEmitter<object>();


  constructor(
    uiStore: AppUIStoreManager,
    private dialog: Dialog,
    public componentService: DrewlabsRessourceAssignmentService,
  ) { super(uiStore); }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    let permissionquery = null;
    if (isDefined(this.permission) && isArray(this.permission.length)) {
      permissionquery = `${'?permission=' + (this.permission as string[]).join(',')}`.trim();
    } else if (isDefined(this.permission) && !isArray(this.permission.length)) {
      permissionquery = `${'?permission=' + this.permission}`.trim();
    }
    try {
      // TODO : Write the users reducers, action and provider for this implementation to work
      // this.users = await this.service.getUsers(`${this.service.ressourcesPath}${isDefined(permissionquery) ? permissionquery : ''}`);
    } catch (_) {
      console.log(_);
    }
  }

  // tslint:disable-next-line: typedef
  async onUserSelected(user: User) {
    this.onBatchAssignment(user, this.selectedIds);
  }

  // tslint:disable-next-line: typedef
  async onBatchAssignment(user: User, selectedItems: number[]) {
    const translations = await this.componentService.loadTranslations(null, user.username, selectedItems.length);
    if (this.dialog.confirm(translations.batchAssignmentPrompt)) {
      this.appUIStoreManager.initializeUIStoreAction();
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
          this.showErrorMessage(translations.serverRequestFailed);
        });
    }
  }

  // tslint:disable-next-line: deprecation
  onAssignmentResponse(res: DrewlabsRessourceAssignment | IResponseBody, trans: any): void {
    if ((res instanceof DrewlabsRessourceAssignment) || (res.statusOK)) {
      // Notify the parent of successful completion of the assignment request
      this.assignmentCompletedSuccessfully.emit({});
      this.showSuccessMessage(trans.successfullAssignment);
      this.buttonDisabled = true;
    } else if (res.errors) {
      this.showBadRequestMessage(trans.invalidRequestParams);
    } else {
      this.showBadRequestMessage(trans.serverRequestFailed);
    }
  }
}
