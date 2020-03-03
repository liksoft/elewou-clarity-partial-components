import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { User } from 'src/app/lib/domain/auth/models/user';
import { RessourceRequestProcessingService } from './ressource-request-processing.service';
import { Dialog } from 'src/app/lib/domain/utils/window-ref';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ressource-request-processing',
  templateUrl: './ressource-request-processing.component.html',
  styles: [
    `
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
  public users: User[] = [];
  public authenticatedUser: User;
  @Input() public assignationButtonDisabled = false;
  @Input() public rejectionButtonDisabled = false;
  @Input() public validationButtonDisabled = false;

  @Output() assignmentCompletedSuccessfully = new EventEmitter();
  @Output() ressourceHandlerCompleted = new EventEmitter<number>();

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
    public componentService: RessourceRequestProcessingService,
    private dialog: Dialog,
  ) { super(uiStore); }

  ngOnInit() {
  }

  async performRessourceProcessingAction(value: boolean) {
    if (!this.rejectionButtonDisabled && !this.validationButtonDisabled) {
      const translations = await this.componentService.loadTranslations(this.id);
      if (value) {
        // this.modalDescriptionText = translations.validationPrompt;
        if (this.dialog.confirm(translations.validationPrompt)) {
          this.isValidationAction = value;
          this.onValidateRessource(translations);
        }
      } else {
        this.modalDescriptionText = translations.rejectionPrompt;
        this.modalOpened = true;
        this.isValidationAction = value;
      }
      // this.modalOpened = true;
    }
  }

  async confirmDataProcessingAction() {
    if (!this.rejectionButtonDisabled && !this.validationButtonDisabled) {
      this.formControl.markAllAsTouched();
      const translations = await this.componentService.loadTranslations(this.id);
      if (this.isValidationAction) {
        this.onValidateRessource(translations);
        return;
      }
      this.onRejectRessource(translations);
    }
  }

  onValidateRessource(translations: any) {
    this.appUIStoreManager.initializeUIStoreAction();
    this.componentService.updateRessource(
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
        this.ressourceHandlerCompleted.emit(1);
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

  onRejectRessource(translations: any) {
    if (this.formControl.valid) {
      this.appUIStoreManager.initializeUIStoreAction();
      this.componentService.updateRessource(
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
          this.ressourceHandlerCompleted.emit(2);
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

}
