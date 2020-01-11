import { Component, OnInit, Input } from '@angular/core';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { User } from 'src/app/lib/domain/auth/models/user';
import { AuthService } from 'src/app/lib/domain/auth/core/auth.service';
import { ApplicationUsersService } from 'src/app/lib/domain/auth/core/services/users.service';
import { isDefined } from 'src/app/lib/domain/utils/type-utils';

@Component({
  selector: 'app-ressource-request-processing',
  templateUrl: './ressource-request-processing.component.html',
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
export class RessourceRequestProcessingComponent extends AbstractAlertableComponent implements OnInit {

  @Input() public url: string;
  @Input() public id: number | string;
  @Input() public permission: string;
  @Input() collectionID: string;
  public users: User[] = [];
  public authenticatedUser: User;
  @Input() public assignationButtonDisabled = false;

  constructor(uiStore: AppUIStoreManager, private auth: AuthService, private service: ApplicationUsersService) { super(uiStore); }

  ngOnInit() {
    this.authenticatedUser = this.auth.user as User;
    this.service.getUsers(
      `${this.service.ressourcesPath}${isDefined(this.permission) ? '?permission=' + this.permission : ''}`.trim()
    ).then((users: User[]) => {
      this.users = users;
    });
  }

  onValidateRessource() {
    // Perform validation request
    // if (this.selectedImmRequest.status !== 0) {
    //   return;
    // }
    // const translations = await this.componentService.loadTranslations();
    // if (this.dialog.confirm(translations.validationPrompt)) {
    //   this.appUIStoreManager.initializeUIStoreAction();
    //   this.resetAlertBooleanControllers();
    //   this.processImmUpdateRequest(
    //     this.componentService.collection.get('memberTypeForm').endpointURL,
    //     id,
    //     { status: 1 },
    //     translations.successfulValidation,
    //     translations.serverRequestFailed,
    //     translations.invalidRequestParams
    //   ).then(() => {
    //     this.showImmRequestHandlersFormAlert = true;
    //     this.initializeComponentProperties();
    //   })
    //   .catch(() => this.showImmRequestHandlersFormAlert = true);
    // }
  }

  onRejectRessource() {
    // Perform rejection operation
    // if (this.selectedImmRequest.status !== 0) {
    //   return;
    // }
    // const translations = await this.componentService.loadTranslations();
    // if (this.dialog.confirm(translations.rejectionPrompt)) {
    //   this.appUIStoreManager.initializeUIStoreAction();
    //   this.resetAlertBooleanControllers();
    //   this.processImmUpdateRequest(
    //     this.componentService.collection.get('memberTypeForm').endpointURL,
    //     id,
    //     { status: 2 },
    //     translations.successfulRejection,
    //     translations.serverRequestFailed,
    //     translations.invalidRequestParams
    //   ).then(() => {
    //     this.showImmRequestHandlersFormAlert = true;
    //     this.initializeComponentProperties();
    //   })
    //   .catch(() => this.showImmRequestHandlersFormAlert = true);
    // }
  }

  onUserSelected(user: User) {

  }

}
