import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertablePageComponent } from '../../component-interfaces';
import { User } from 'src/app/lib/domain/auth/models/user';
import { AuthService } from 'src/app/lib/domain/auth/core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/lib/domain/utils/custom-validators';
import { AppUIStoreManager } from '../../app-ui-store-manager.service';
import { ComponentReactiveFormHelpers } from '../../component-reactive-form-helpers';
import { ApplicationUsersService } from 'src/app/lib/domain/auth/core/services/users.service';
import { TranslationService } from 'src/app/lib/domain/translator/translator.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent extends AlertablePageComponent implements OnInit, OnDestroy {

  public connectedUser: User;
  public passwordUpdateFormGroup: FormGroup;

  constructor(
    uiStore: AppUIStoreManager,
    private auth: AuthService,
    private builder: FormBuilder,
    private applicationUsersService: ApplicationUsersService,
    private translate: TranslationService
  ) { super(uiStore); }

  ngOnInit() {
    this.subscribeToUIActions();
    this.connectedUser = this.auth.user as User;
    this.passwordUpdateFormGroup = this.builder.group({
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password_confirmation: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.passwordUpdateFormGroup.setValidators(CustomValidators.Match('password', 'password_confirmation'));
  }

  async onFormSubmitted(event: Event) {
    event.preventDefault();
    this.appUIStoreManager.initializeUIStoreAction();
    ComponentReactiveFormHelpers.validateFormGroupFields(
      this.passwordUpdateFormGroup
    );
    const translations = await this.translate.translate([
      'invalidRequestParams',
      'serverRequestFailed',
      'successfulRequest',
    ]).toPromise();
    Object.keys(this.passwordUpdateFormGroup.controls).forEach((k) => {
      console.log(this.passwordUpdateFormGroup.get(k).valid);
    });
    if (this.passwordUpdateFormGroup.valid) {
      this.applicationUsersService.updateUser(null, this.connectedUser.id, this.passwordUpdateFormGroup.getRawValue())
        .then((res) => {
          if (res.statusOK) {
            this.showSuccessMessage(translations.successfulRequest);
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
    return;
  }

  ngOnDestroy(): void {
    this.clearUIActionSubscriptions();
    this.resetUIStore();
  }

}
