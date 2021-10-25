import { Component, Input, Output, EventEmitter } from "@angular/core";
import { mergeMap, filter, map } from "rxjs/operators";
import { AuthService } from "src/app/lib/core/auth/core";
import { doLog } from "src/app/lib/core/rxjs/operators";

@Component({
  selector: "app-components-loading",
  template: `
    <div class="outer-div" *ngIf="showUIElements">
      <div class="centered-loader">
        <span class="spinner spinner-inline"> </span>
        <span [translate]="'apploaderText'"> </span> <br />
        <span *ngIf="loadingCompleted$ | async">Redirecting ...</span>
      </div>
    </div>
  `,
  styles: [
    `
      .outer-div {
        margin: 25% auto;
        width: 25rem;
      }
    `,
  ],
})
export class AppComponentsLoadingComponent {
  // tslint:disable-next-line: no-inferrable-types
  @Input() showUIElements: boolean = true;
  @Output() isAuthenticated: EventEmitter<boolean> = new EventEmitter();

  loadingCompleted$ = this.auth.state$.pipe(
    doLog('AppComponentsLoadingComponent Auth state: '),
    map((state) => {
      this.isAuthenticated.emit(!state.authenticating && state.isLoggedIn);
      return true;
    })
  );

  constructor(private auth: AuthService) {}
}
