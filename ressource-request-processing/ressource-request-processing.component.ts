import { Component, OnInit, Input } from '@angular/core';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { User } from 'src/app/lib/domain/auth/models/user';
import { AuthService } from 'src/app/lib/domain/auth/core/auth.service';
import { ApplicationUsersService } from 'src/app/lib/domain/auth/core/services/users.service';
import { isDefined } from 'src/app/lib/domain/utils/type-utils';
import { RessourceRequestProcessingService } from './ressource-request-processing.service';
import { Dialog } from 'src/app/lib/domain/utils/window-ref';
import { FormControl, Validators } from '@angular/forms';
import { RessourceAssignment } from './ressource-assignment';

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
    .required-text,
    .field-has-error {
      color: rgb(241, 50, 50);
    }

    .clr-control-container textarea {
      min-width: 100% !important;
    }

    .clr-select-wrapper {
      min-width: 100% !important;
    }
    .clr-form-control-container {
      margin: 24px auto;
    }
    `
  ]
})
export class RessourceRequestProcessingComponent extends AbstractAlertableComponent implements OnInit {

  @Input() public url: string;
  @Input() public id: number | string;
  @Input() public permission: string;
  @Input() collectionID: string | number;
  @Input() status = 0;
  public users: User[] = [];
  public authenticatedUser: User;
  @Input() public assignationButtonDisabled = false;
  @Input() public rejectionButtonDisabled = false;
  @Input() public validationButtonDisabled = false;
  modalOpened = false;
  modalDescriptionText: string;
  isValidationAction: boolean;

  // Observation form control
  formControl = new FormControl(null, Validators.compose([
    Validators.required,
    Validators.maxLength(255)
  ]));

  constructor(
    uiStore: AppUIStoreManager,
    private auth: AuthService,
    private dialog: Dialog,
    private service: ApplicationUsersService,
    private ressourcesService: RessourceRequestProcessingService
  ) { super(uiStore); }

  ngOnInit() {
    this.authenticatedUser = this.auth.user as User;
    this.service.getUsers(
      `${this.service.ressourcesPath}${isDefined(this.permission) ? '?permission=' + this.permission : ''}`.trim()
    ).then((users: User[]) => {
      this.users = users;
    });
  }

  async performRessourceProcessingAction(value: boolean) {
    if (!this.rejectionButtonDisabled && !this.validationButtonDisabled) {
      const translations = await this.ressourcesService.loadTranslations(this.id);
      if (value) {
        this.modalDescriptionText = translations.validationPrompt;
      } else {
        this.modalDescriptionText = translations.rejectionPrompt;
      }
      this.isValidationAction = value;
      this.modalOpened = true;
    }
  }

  async confirmDataProcessingAction() {
    if (!this.rejectionButtonDisabled && !this.validationButtonDisabled) {
      this.formControl.markAllAsTouched();
      const translations = await this.ressourcesService.loadTranslations(this.id);
      if (this.isValidationAction) {
        this.onValidateRessource(translations);
        return;
      }
      this.onRejectRessource(translations);
    }
  }

  onValidateRessource(translations: any) {
    if (this.formControl.valid) {
      this.appUIStoreManager.initializeUIStoreAction();
      this.ressourcesService.updateRessource(
        this.url,
        this.id,
        { status: 1, observations: this.formControl.value },
      ).then((res) => {
        if (res.statusOK) {
          this.doCancelAction();
          this.validationButtonDisabled = true;
          this.rejectionButtonDisabled = true;
          this.assignationButtonDisabled = true;
          this.showSuccessMessage(translations.successfulValidation);
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

  onRejectRessource(translations: any) {
    if (this.formControl.valid) {
      this.appUIStoreManager.initializeUIStoreAction();
      this.ressourcesService.updateRessource(
        this.url,
        this.id,
        { status: 2, observations: this.formControl.value },
      ).then((res) => {
        if (res.statusOK) {
          this.doCancelAction();
          this.validationButtonDisabled = true;
          this.rejectionButtonDisabled = true;
          this.assignationButtonDisabled = true;
          this.showSuccessMessage(translations.successfulRejection);
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

  doCancelAction() {
    this.formControl.reset();
    this.modalOpened = false;
  }

  async onUserSelected(user: User) {
    const translations = await this.ressourcesService.loadTranslations(this.id, user.username);
    if (this.dialog.confirm(translations.assignmentPrompt)) {
      this.appUIStoreManager.initializeUIStoreAction();
      this.ressourcesService.createAssignment(this.ressourcesService.assignationRessoucesPath, {
        ressource: this.collectionID,
        ressource_id: this.id,
        assigned_to: user.id
      })
        .then((res) => {
          if (res instanceof RessourceAssignment) {
            this.showSuccessMessage(translations.successfullAssignment);
            this.assignationButtonDisabled = true;
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

}
