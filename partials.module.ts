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
import { ModuleDefaultSidebarComponent } from './module-default-sidebar/module-default-sidebar.component';
import { RessourceRequestProcessingModule } from './ressource-request-processing/ressource-request-processing.module';
import { RessourceRequestProcessingService } from './ressource-request-processing/ressource-request-processing.service';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ContributionsDefaultSidebarComponent } from './contributions-default-sidebar/contributions-default-sidebar.component';
import { AdminManagementSidebarComponent } from './admin-management-sidebar/admin-management-sidebar.component';
import { AdminDefaultSidebarComponent } from './admin-default-sidebar/admin-default-sidebar.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { SecurityComponent } from './myaccount/security/security.component';
@NgModule({
  imports: [RouterModule, CommonModule, SharedModule, RessourceRequestProcessingModule],
  exports: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    SubnavComponent,
    ApplicationModulesComponent,
    ModuleDefaultSidebarComponent,
    ContributionsDefaultSidebarComponent,
    AdminManagementSidebarComponent,
    AdminDefaultSidebarComponent,
    RessourceRequestProcessingModule,
    MyaccountComponent,
    SecurityComponent
  ],
  declarations: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    SubnavComponent,
    ApplicationModulesComponent,
    ModuleDefaultSidebarComponent,
    ContributionsDefaultSidebarComponent,
    AdminManagementSidebarComponent,
    AdminDefaultSidebarComponent,
    MyaccountComponent,
    SecurityComponent
  ],
  providers: [ModuleService, RessourceRequestProcessingService]
})
export class PartialsModule { }
