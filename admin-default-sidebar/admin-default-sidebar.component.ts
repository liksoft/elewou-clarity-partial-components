import { Component, OnInit } from '@angular/core';
import { RoutesMap } from '../../routes-definitions';
import { partialConfigs } from '../partials-configs';

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
        children: [
          {
            key: 'navbar_manage_users',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.adminModuleRoutes.managementsRoute}/${partialConfigs.routes.adminModuleRoutes.listUsersRoute}`
          },
          {
            key: 'navbar_roles_permissions',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.adminModuleRoutes.managementsRoute}/${partialConfigs.routes.adminModuleRoutes.rolesManagementRoute}`
          },
          {
            key: 'navbar_forms',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.adminModuleRoutes.managementsRoute}/${partialConfigs.routes.adminModuleRoutes.formsManagementRoute}`
          },
          {
            key: 'navbar_activities',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.adminModuleRoutes.managementsRoute}/${partialConfigs.routes.adminModuleRoutes.modulesManagementRoute}`
          }
        ]
      },
      {
        key: 'navbar_account',
        children: [
          {
            key: 'navbar_personal_information',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.adminModuleRoutes.accountRoute}`
          },
        ]
      }
    ];
  }

}
