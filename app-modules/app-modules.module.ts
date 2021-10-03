import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { AppModulesComponent } from './app-modules.component';
import { HttpModule } from 'src/app/lib/core/http';

@NgModule({
  exports: [
    AppModulesComponent
  ],
  declarations: [
    AppModulesComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    HttpModule
  ],
  providers: []
})
export class AppModuleModule { }
