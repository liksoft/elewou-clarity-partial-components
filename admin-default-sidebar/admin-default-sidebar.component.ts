import { Component, OnInit } from '@angular/core';
import { RoutesMap, AppRoutes } from '../../routes-definitions';

@Component({
  selector: 'app-admin-default-sidebar',
  templateUrl: './admin-default-sidebar.component.html',
  styles: []
})
export class AdminDefaultSidebarComponent implements OnInit {

  public navbarRoutesMap: RoutesMap[];
  public navbarRouteDefinitions: { [index: string]: string };

  constructor() { }

  ngOnInit() {
    this.navbarRouteDefinitions = {
      navbar_dashboard: 'Tableau de bord',
      navbar_manage_users: 'Utilisateurs',
      navbar_roles_permissions: 'Rôles & Permissions',
      navbar_forms: 'Formulaires',
      navbar_activities: 'Suivi & Activité',
      navbar_account: 'Mon compte',
      navbar_personal_information: 'Informations personnelles',
      // navbar_data_personnalisation: '',
      navbar_password_security: 'Sécurité & Mot de passe',
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_dashboard',
        // route: `/${AppRoutes.dashboardRoute}/${AppRoutes.homeRoute}`,
        children: [
          {
            key: 'navbar_manage_users',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.managementsRoute}/${AppRoutes.listUsersRoute}`
          },
          {
            key: 'navbar_roles_permissions',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.managementsRoute}/${AppRoutes.rolesManagementRoute}`
          },
          {
            key: 'navbar_forms',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.managementsRoute}/${AppRoutes.formsManagementRoute}`
          },
          {
            key: 'navbar_activities',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.managementsRoute}/${AppRoutes.modulesManagementRoute}`
          }
        ]
      },
      {
        key: 'navbar_account',
        // route: `/${AppRoutes.dashboardHomeRoute}`,
        children: [
          {
            key: 'navbar_personal_information',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.accountRoute}`
          },
        ]
      }
    ];
  }

}
