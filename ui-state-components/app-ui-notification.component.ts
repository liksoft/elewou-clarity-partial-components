import { Component, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { map, tap, takeUntil } from 'rxjs/operators';
import { AppUIStateProvider, UIStateStatusCode, uiStatusUsingHttpErrorResponse } from 'src/app/lib/domain/helpers';
import { HttpRequestService } from 'src/app/lib/domain/http/core';
import { createSubject } from 'src/app/lib/domain/rxjs/helpers';
import { isDefined } from 'src/app/lib/domain/utils';
import { doLog } from 'src/app/lib/domain/rxjs/operators/index';
import { ConnectionStatus, OnlineStateMonitoringService } from 'src/app/lib/domain/components/online-state-monitoring';
import { createStateful } from 'src/app/lib/domain/rxjs/helpers/index';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-ui-notification',
  template: `
  <ng-container *ngIf="state$ | async as state">
  <drewlabs-action-notification-container *ngIf="!state.hidden">
      <ng-container [ngSwitch]="state.status">
        <clr-alert *ngSwitchCase="uiStateResultCode.ERROR" [clrAlertType]="'danger'" [clrAlertClosable]="false">
          <clr-alert-item>
              <span class="alert-text" [innerHTML]="(state?.message || 'serverRequestFailed') | translate | safeWebContent"></span>
              <div class="alert-actions">
                  <clr-icon shape="times" (click)="onClrAlertClosedChanged(true)"></clr-icon>
              </div>
          </clr-alert-item>
        </clr-alert>
        <!-- Case bad request input authentication -->
        <clr-alert *ngSwitchCase="uiStateResultCode.BAD_REQUEST" [clrAlertType]="'danger'" [clrAlertClosable]="false">
          <clr-alert-item>
              <span class="alert-text" [innerHTML]="(state?.message ? state?.message : 'invalidRequestParams') | translate | safeWebContent"></span>
              <div class="alert-actions">
                  <clr-icon shape="times" (click)="onClrAlertClosedChanged(true)"></clr-icon>
              </div>
          </clr-alert-item>
        </clr-alert>
        <!-- Case invalid credentials -->
        <clr-alert *ngSwitchCase="uiStateResultCode.UNAUTHENTICATED" [clrAlertType]="'warning'" [clrAlertClosable]="false">
          <clr-alert-item>
              <span class="alert-text" [innerHTML]="'login.authenticationFailed' | translate"></span>
              <div class="alert-actions">
                  <clr-icon shape="times" (click)="onClrAlertClosedChanged(true)"></clr-icon>
              </div>
          </clr-alert-item>
        </clr-alert>
        <!-- Case successful login -->
        <clr-alert *ngSwitchCase="uiStateResultCode.AUTHENTICATED" [clrAlertType]="'success'" [clrAlertClosable]="false">
          <clr-alert-item>
              <span class="alert-text" [innerHTML]="'login.successful' | translate"></span>
              <div class="alert-actions">
                  <clr-icon shape="times" (click)="onClrAlertClosedChanged(true)"></clr-icon>
              </div>
          </clr-alert-item>
        </clr-alert>

        <!-- Resource request completed successfully -->
        <clr-alert *ngSwitchCase="uiStateResultCode.STATUS_OK" [clrAlertType]="'success'" [clrAlertClosable]="false">
          <clr-alert-item>
              <span class="alert-text" [innerHTML]="state.message"></span>
              <div class="alert-actions">
                  <clr-icon shape="times" (click)="onClrAlertClosedChanged(true)"></clr-icon>
              </div>
          </clr-alert-item>
        </clr-alert>
        <clr-alert *ngSwitchCase="uiStateResultCode.STATUS_CREATED" [clrAlertType]="'success'" [clrAlertClosable]="false">
          <clr-alert-item>
              <span class="alert-text" [innerHTML]="state.message"></span>
              <div class="alert-actions">
                  <clr-icon shape="times" (click)="onClrAlertClosedChanged(true)"></clr-icon>
              </div>
          </clr-alert-item>
        </clr-alert>
        <!-- -->
      </ng-container>
      <ng-container *ngIf="onlineState$ | async as onlineState">
        <clr-alert [clrAlertType]="'danger'" [clrAlertClosable]="false" [clrAlertAppLevel]="true" *ngIf="!onlineState?.online">
            <clr-alert-item>
              <span class="alert-text">
                <span [translate]="'statusOffline'"></span>
              </span>
            </clr-alert-item>
        </clr-alert>
        <clr-alert [clrAlertType]="'success'" [clrAlertAppLevel]="true" *ngIf="onlineState?.online && onlineState?.wasOffline && !onlineState?.hidden">
            <clr-alert-item>
                <span class="alert-text" [translate]="'statusOnline'"></span>
            </clr-alert-item>
        </clr-alert>
      </ng-container>
    </drewlabs-action-notification-container>
  </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppUINotificationComponent implements OnDestroy {

  @Input() uiStateResultCode = UIStateStatusCode;
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject();

  state$ = this.uiState.uiState
    .pipe(
      doLog('Ui state value stream view state: '),
      map((state) => {
        return {
          message: state.uiMessage,
          status: state.status,
          hasError: state.hasError,
          hidden: (state.performingAction || !isDefined(state.status))
        };
      }),
    );
  // tslint:disable-next-line: variable-name
  _hideConnectionStateComponent$ = createStateful(false);
  hideConnectionStateComponent$ = this._hideConnectionStateComponent$.asObservable();

  // TODO : Takes computing of the online status algorithm to another observable
  onlineState$ = combineLatest([this.onlineStateMonitoring.connectionStatus$, this._hideConnectionStateComponent$]).pipe(
    map(([value, hidden]) => {
      if (isDefined(value)) {
        if (value === ConnectionStatus.OFFLINE) {
          return { wasOffline: true, online: false };
        } else {
          setTimeout(() => {
            // Hide the connection state Ui component
            this._hideConnectionStateComponent$.next(true);
          }, 2000);
          return { online: true, hidden };
        }
      }
    })
  );

  onClrAlertClosedChanged(value: boolean): void {
    if (value) {
      this.uiState.endAction('');
    }
  }

  constructor(
    private uiState: AppUIStateProvider,
    httpClient: HttpRequestService,
    private onlineStateMonitoring: OnlineStateMonitoringService
  ) {
    this.onlineStateMonitoring.registerToConnectionStates();
    httpClient.errorState$.pipe(
      takeUntil(this._destroy$),
      tap(
        state => {
          this.uiState.endAction('', uiStatusUsingHttpErrorResponse(state));
        }
      )
    ).subscribe();
    this.uiState.uiState
      .pipe(
        doLog('Ui state value stream: '),
        takeUntil(this._destroy$)
      )
      .subscribe(
        state => {
          if (state.hasError) {
            // Close the alert box after 3s
            setTimeout(() => {
              this.uiState.endAction('');
            }, 3000);
          }
        }
      );
  }

  ngOnDestroy = () => this._destroy$.next({});
}
