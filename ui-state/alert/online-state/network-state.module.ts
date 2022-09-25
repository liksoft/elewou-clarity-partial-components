import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { OnlineStateMonitoringComponent } from './online-state-monitoring.component';

@NgModule({
  imports: [CommonModule, ClarityModule],
  declarations: [OnlineStateMonitoringComponent],
  exports: [OnlineStateMonitoringComponent],
})
export class NetworkStateModule {}
