import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { Dialog } from 'src/app/lib/domain/utils/window-ref';
import { RessourceRequestProcessingService } from '../ressource-request-processing.service';
import { ApplicationUsersService } from 'src/app/lib/domain/auth/core/services/users.service';
import { User } from 'src/app/lib/domain/auth/models/user';
import { isDefined } from 'src/app/lib/domain/utils/type-utils';
import { RessourceAssignment } from '../ressource-assignment';
import { IResponseBody } from 'src/app/lib/domain/http/contracts/http-response-data';
import { partialConfigs } from '../../partials-configs';
import { AuthService } from '../../../../domain/auth/core/auth.service';

@Component({
  selector: 'app-ressource-assignment',
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
export class RessourceAssignmentComponent extends AbstractAlertableComponent implements OnInit {

  @Input() collectionID: number | string;
  public users: User[];
  @Input() public permission: string;
  @Input() public buttonDisabled = false;
  @Input() selectedIds: number[] = [];
  @Output() assignmentCompletedSuccessfully = new EventEmitter<object>();
  accessControlList = partialConfigs.acl;


  constructor(
    uiStore: AppUIStoreManager,
    private service: ApplicationUsersService,
    private dialog: Dialog,
    public componentService: RessourceRequestProcessingService,
    public auth: AuthService
  ) { super(uiStore); }

  ngOnInit() {
    this.service.getUsers(
      `${this.service.ressourcesPath}${isDefined(this.permission) ? '?permission=' + this.permission : ''}`.trim()
    ).then((users: User[]) => {
      this.users = users;
    })
      .catch((_) => console.log(_));
  }

  async onUserSelected(user: User) {
    this.onBatchAssignment(user, this.selectedIds);
  }

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
          // if (res instanceof RessourceAssignment) {
          //   this.showSuccessMessage(translations.successfullAssignment);
          //   this.buttonDisabled = true;
          // } else if (res.errors) {
          //   this.showBadRequestMessage(translations.invalidRequestParams);
          // } else {
          //   this.showBadRequestMessage(translations.serverRequestFailed);
          // }
          this.onAssignmentResponse(res, translations);
        })
        .catch((_) => {
          this.showErrorMessage(translations.serverRequestFailed);
        });
    }
  }

  onAssignmentResponse(res: RessourceAssignment | IResponseBody, trans: any) {
    if ((res instanceof RessourceAssignment) || (res.statusOK)) {
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
