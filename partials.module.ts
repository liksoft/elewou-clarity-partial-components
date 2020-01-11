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
import { ContributionsDefaultSidebarComponent } from './contributions-default-sidebar/contributions-default-sidebar.component';
@NgModule({
  imports: [RouterModule, CommonModule, SharedModule],
  exports: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    SubnavComponent,
    ApplicationModulesComponent,
    ModuleDefaultSidebarComponent,
    ContributionsDefaultSidebarComponent,
  ],
  declarations: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    SubnavComponent,
    ApplicationModulesComponent,
    ModuleDefaultSidebarComponent,
    ContributionsDefaultSidebarComponent
  ],
  providers: [ModuleService]
})
export class PartialsModule { }
