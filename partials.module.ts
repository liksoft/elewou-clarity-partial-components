import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { AppTopBarComponent } from './app-top-bar/app-top-bar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RessourceRequestProcessingModule } from './ressource-request-processing/ressource-request-processing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppModuleModule } from './app-modules/app-modules.module';
import { DossiersModule } from './dossiers/dossiers.module';
import { DatagridHeaderModule } from './datgrid-header/datagrid-header.module';
import { DetailedTablePreviewComponent } from './detailed-table-preview/detailed-table-preview.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    ScrollingModule,
    AppModuleModule
  ],
  exports: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    RessourceRequestProcessingModule,
    AppModuleModule,
    DossiersModule,
    DatagridHeaderModule,
    DetailedTablePreviewComponent
  ],
  declarations: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    DetailedTablePreviewComponent
  ],
  providers: []
})
export class PartialsModule { }
