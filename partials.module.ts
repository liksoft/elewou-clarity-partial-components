import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { AppTopBarComponent } from './app-top-bar/app-top-bar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RessourceRequestProcessingModule } from './ressource-request-processing/ressource-request-processing.module';
import { RessourceRequestProcessingService } from './ressource-request-processing/ressource-request-processing.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComptabiliteDefaultSidebarComponent } from './comptabilite-default-sidebar/comptabilite-default-sidebar.component';
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
    RessourceRequestProcessingModule,
    ComptabiliteDefaultSidebarComponent,
    AppModuleModule,
    DatgridHeaderComponent
  ],
  declarations: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    ComptabiliteDefaultSidebarComponent,
    DatgridHeaderComponent
  ],
  providers: [RessourceRequestProcessingService]
})
export class PartialsModule { }
