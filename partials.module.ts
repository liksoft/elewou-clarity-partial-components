import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { AppTopBarComponent } from './app-top-bar/app-top-bar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubnavComponent } from './subnav/subnav.component';
import { ModuleDefaultSidebarComponent } from './module-default-sidebar/module-default-sidebar.component';
import { RessourceRequestProcessingModule } from './ressource-request-processing/ressource-request-processing.module';
import { RessourceRequestProcessingService } from './ressource-request-processing/ressource-request-processing.service';
import { ContributionsDefaultSidebarComponent } from './contributions-default-sidebar/contributions-default-sidebar.component';
import { AdminManagementSidebarComponent } from './admin-management-sidebar/admin-management-sidebar.component';
import { AdminDefaultSidebarComponent } from './admin-default-sidebar/admin-default-sidebar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LiquidationsDefaultSidebarComponent } from './liquidations-default-sidebar/liquidations-default-sidebar.component';
import { ComptabiliteDefaultSidebarComponent } from './comptabilite-default-sidebar/comptabilite-default-sidebar.component';
import { ClientTopBarComponent } from './online/client-top-bar/client-top-bar.component';
import { ClientSidebarComponent } from './online/client-sidebar/client-sidebar.component';
import { AppModuleModule } from './app-modules/app-modules.module';
import { DatgridHeaderComponent } from './datgrid-header/datgrid-header.component';
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    RessourceRequestProcessingModule,
    ScrollingModule,
    AppModuleModule],
  exports: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    SubnavComponent,
    ModuleDefaultSidebarComponent,
    ContributionsDefaultSidebarComponent,
    AdminManagementSidebarComponent,
    AdminDefaultSidebarComponent,
    RessourceRequestProcessingModule,
    LiquidationsDefaultSidebarComponent,
    ComptabiliteDefaultSidebarComponent,
    ClientTopBarComponent,
    ClientSidebarComponent,
    AppModuleModule,
    DatgridHeaderComponent
  ],
  declarations: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    SubnavComponent,
    ModuleDefaultSidebarComponent,
    ContributionsDefaultSidebarComponent,
    AdminManagementSidebarComponent,
    AdminDefaultSidebarComponent,
    LiquidationsDefaultSidebarComponent,
    ComptabiliteDefaultSidebarComponent,
    ClientTopBarComponent,
    ClientSidebarComponent,
    DatgridHeaderComponent
  ],
  providers: [RessourceRequestProcessingService]
})
export class PartialsModule { }
