import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { AppTopBarComponent } from './app-top-bar/app-top-bar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubnavComponent } from './subnav/subnav.component';
import { AdminManagementSidebarComponent } from './admin-management-sidebar/admin-management-sidebar.component';

@NgModule({
  imports: [RouterModule, CommonModule, SharedModule],
  exports: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    SubnavComponent,
    AdminManagementSidebarComponent,
  ],
  declarations: [
    AppTopBarComponent,
    PageTitleComponent,
    SidebarComponent,
    SubnavComponent,
    AdminManagementSidebarComponent,
  ],
  providers: []
})
export class PartialsModule { }
