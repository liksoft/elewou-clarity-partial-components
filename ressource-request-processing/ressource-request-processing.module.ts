import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClarityModule } from '@clr/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RessourceRequestProcessingComponent } from './ressource-request-processing.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RessourceAssignmentComponent } from './ressource-assignment/ressource-assignment.component';
import { SharedModule } from '../../shared.module';
import { RessourceAssignmentModule } from '../../../domain/components/ressource-assignment';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ClarityModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RessourceAssignmentModule
  ],
  declarations: [
    RessourceRequestProcessingComponent,
    RessourceAssignmentComponent
  ],
  exports: [
    RessourceRequestProcessingComponent,
    RessourceAssignmentComponent
  ]
})
export class RessourceRequestProcessingModule {
}
