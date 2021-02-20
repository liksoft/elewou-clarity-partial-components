import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { RessourceRequestProcessingModule } from '../ressource-request-processing/ressource-request-processing.module';
import { DatgridHeaderComponent } from './datgrid-header.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RessourceRequestProcessingModule
  ],
  declarations: [
    DatgridHeaderComponent
  ],
  exports: [
    DatgridHeaderComponent
  ]
})
export class DatagridHeaderModule {}
