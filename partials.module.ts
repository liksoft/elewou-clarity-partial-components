import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { AppTopBarComponent } from './app-top-bar/app-top-bar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubnavComponent } from './subnav/subnav.component';
import { AdminManagementSidebarComponent } from './admin-management-sidebar/admin-management-sidebar.component';
import { AdminDefaultSidebarComponent } from './admin-default-sidebar/admin-default-sidebar.component';
import { ModuleService } from './application-modules/module.service';
import { ApplicationModulesComponent } from './application-modules/application-modules.component';

@NgModule({
  imports: [RouterModule, CommonModule, SharedModule],
  exports: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    SubnavComponent,
    AdminManagementSidebarComponent,
    AdminDefaultSidebarComponent,
    ApplicationModulesComponent,
  ],
  declarations: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    SubnavComponent,
    AdminManagementSidebarComponent,
    AdminDefaultSidebarComponent,
    ApplicationModulesComponent
  ],
  providers: [ModuleService]
})
export class PartialsModule { }
