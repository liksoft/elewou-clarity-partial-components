import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClarityModule } from '@clr/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RessourceRequestProcessingComponent } from './ressource-request-processing.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ClarityModule,
    ScrollingModule
  ],
  declarations: [
    RessourceRequestProcessingComponent
  ],
  exports: [
    RessourceRequestProcessingComponent
  ]
})
export class RessourceRequestProcessingModule {
}
