import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { AppTopBarComponent } from './app-top-bar/app-top-bar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubnavComponent } from './subnav/subnav.component';
import { ModuleService } from './application-modules/module.service';
import { ApplicationModulesComponent } from './application-modules/application-modules.component';

@NgModule({
  imports: [RouterModule, CommonModule, SharedModule],
  exports: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    SubnavComponent,
    ApplicationModulesComponent,
  ],
  declarations: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    SubnavComponent,
    ApplicationModulesComponent
  ],
  providers: [ModuleService]
})
export class PartialsModule { }
