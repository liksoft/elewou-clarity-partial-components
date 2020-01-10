import { Component, OnInit, Input } from '@angular/core';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { User } from 'src/app/lib/domain/auth/models/user';

@Component({
  selector: 'app-ressource-request-processing',
  templateUrl: './ressource-request-processing.component.html',
  styles: [
    `
    .dropdown .dropdown-toggle.btn {
      margin-right: .5rem;
    }
    `
  ]
})
export class RessourceRequestProcessingComponent extends AbstractAlertableComponent implements OnInit {

  @Input() public url: string;
  @Input() public id: number | string;
  public users: User[] = [];
  @Input() public assignationButtonDisabled = false;

  constructor(uiStore: AppUIStoreManager) { super(uiStore); }

  ngOnInit() { }

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
