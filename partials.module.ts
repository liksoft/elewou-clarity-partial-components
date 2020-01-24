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

import { ContributionsDefaultSidebarComponent } from './contributions-default-sidebar/contributions-default-sidebar.component';
import { AdminManagementSidebarComponent } from './admin-management-sidebar/admin-management-sidebar.component';
import { AdminDefaultSidebarComponent } from './admin-default-sidebar/admin-default-sidebar.component';
import { StructureTypeDropdownComponent } from './structure-type-dropdown/structure-type-dropdown.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LiquidationsDefaultSidebarComponent } from './liquidations-default-sidebar/liquidations-default-sidebar.component';
import { ComptabiliteDefaultSidebarComponent } from './comptabilite-default-sidebar/comptabilite-default-sidebar.component';
@NgModule({
  imports: [RouterModule, CommonModule, SharedModule, RessourceRequestProcessingModule, ScrollingModule],
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
    StructureTypeDropdownComponent,
    LiquidationsDefaultSidebarComponent,
    ComptabiliteDefaultSidebarComponent
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
    StructureTypeDropdownComponent,
    LiquidationsDefaultSidebarComponent,
    ComptabiliteDefaultSidebarComponent
  ],
  providers: [ModuleService, RessourceRequestProcessingService]
})
export class PartialsModule { }
