import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { TranslateModule } from "@ngx-translate/core";
import {
  OnlineStateMonitoring,
  OnlineStateMonitoringComponent,
} from "./alert/online-state";
import { AppComponentsLoadingComponent } from "./loader/app-component-loader.component";
import { AppUINotificationComponent } from "./alert/notification/notification.component";
import { PipesModule } from "../pipes";

@NgModule({
  declarations: [
    OnlineStateMonitoringComponent,
    AppUINotificationComponent,
    AppComponentsLoadingComponent,
  ],
  imports: [CommonModule, ClarityModule, TranslateModule, PipesModule],
  exports: [
    OnlineStateMonitoringComponent,
    AppUINotificationComponent,
    AppComponentsLoadingComponent,
  ],
})
export class UIStateComponentsModule {
  static forRoot(): ModuleWithProviders<UIStateComponentsModule> {
    return {
      ngModule: UIStateComponentsModule,
      providers: [OnlineStateMonitoring],
    };
  }
}
