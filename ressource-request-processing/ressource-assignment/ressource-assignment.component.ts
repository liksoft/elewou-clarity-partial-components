import { Component, OnInit, Input } from '@angular/core';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { Dialog } from 'src/app/lib/domain/utils/window-ref';
import { RessourceRequestProcessingService } from '../ressource-request-processing.service';
import { ApplicationUsersService } from 'src/app/lib/domain/auth/core/services/users.service';
import { AuthService } from 'src/app/lib/domain/auth/core';
import { User } from 'src/app/lib/domain/auth/models/user';
import { isDefined } from 'src/app/lib/domain/utils/type-utils';
import { RessourceAssignment } from '../ressource-assignment';
import { IResponseBody } from 'src/app/lib/domain/http/contracts/http-response-data';

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


  constructor(
    uiStore: AppUIStoreManager,
    private auth: AuthService,
    private service: ApplicationUsersService,
    private dialog: Dialog,
    public componentService: RessourceRequestProcessingService
  ) { super(uiStore); }

  ngOnInit() {
    // this.authenticatedUser = this.auth.user as User;
    this.service.getUsers(
      `${this.service.ressourcesPath}${isDefined(this.permission) ? '?permission=' + this.permission : ''}`.trim()
    ).then((users: User[]) => {
      console.log(users);
      this.users = users;
    })
      .catch((_) => console.log(_));
  }

  async onUserSelected(user: User) {
    this.onBatchAssignment(user, this.selectedIds);
    // if (this.selectedIds.length === 1) {
    //   this.onAssignment(user, this.selectedIds[0]);
    // } else if (this.selectedIds.length > 1) {
    //   this.onBatchAssignment(user, this.selectedIds);
    // } else {
    //   // Do nothing or notify user of something
    // }
  }

  async onAssignment(user: User, id: number | string) {
    const translations = await this.componentService.loadTranslations(id, user.username);
    if (this.dialog.confirm(translations.assignmentPrompt)) {
      this.appUIStoreManager.initializeUIStoreAction();
      this.componentService.createAssignment(this.componentService.assignationRessoucesPath, {
        ressource: this.collectionID,
        ressource_id: id,
        assigned_to: user.id
      })
        .then((res) => {
          this.onAssignmentResponse(res, translations);
        })
        .catch((_) => {
          this.showErrorMessage(translations.serverRequestFailed);
        });
    }
  }

  async onBatchAssignment(user: User, selectedItems: number[]) {
    const translations = await this.componentService.loadTranslations(null, user.username, selectedItems.length);
    if (this.dialog.confirm(translations.batchAssignmentPrompt)) {
      this.appUIStoreManager.initializeUIStoreAction();
      this.componentService.createAssignment(
        `${this.componentService.assignationRessoucesPath}/${this.collectionID}`, selectedItems.map((i) => {
        return {
          // ressource: this.collectionID,
          ressource_id: i,
          assigned_to: user.id
        };
      }))
        .then((res) => {
          if (res instanceof RessourceAssignment) {
            this.showSuccessMessage(translations.successfullAssignment);
            this.buttonDisabled = true;
          } else if (res.errors) {
            this.showBadRequestMessage(translations.invalidRequestParams);
          } else {
            this.showBadRequestMessage(translations.serverRequestFailed);
          }
        })
        .catch((_) => {
          this.showErrorMessage(translations.serverRequestFailed);
        });
    }
  }

  onAssignmentResponse(res: RessourceAssignment | IResponseBody, trans: any) {
    if ((res instanceof RessourceAssignment) || (res.statusOK)) {
      this.showSuccessMessage(trans.successfullAssignment);
      this.buttonDisabled = true;
    } else if (res.errors) {
      this.showBadRequestMessage(trans.invalidRequestParams);
    } else {
      this.showBadRequestMessage(trans.serverRequestFailed);
    }
  }
}
