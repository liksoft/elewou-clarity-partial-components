import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClarityModule } from '@clr/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RessourceRequestProcessingComponent } from './ressource-request-processing.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { DrewlabsRessourceAssignmentComponent } from './ressource-assignment/ressource-assignment.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ClarityModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    RessourceRequestProcessingComponent,
    DrewlabsRessourceAssignmentComponent
  ],
  exports: [
    RessourceRequestProcessingComponent,
    DrewlabsRessourceAssignmentComponent
  ]
})
export class RessourceRequestProcessingModule {
}
