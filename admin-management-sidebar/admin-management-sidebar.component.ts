import { Component, OnInit } from '@angular/core';
import { RoutesMap, AppRoutes } from '../../routes-definitions';

@Component({
  selector: 'app-admin-management-sidebar',
  templateUrl: './admin-management-sidebar.component.html',
  styleUrls: ['./admin-management-sidebar.component.scss']
})
export class AdminManagementSidebarComponent implements OnInit {

  public navbarRoutesMap: RoutesMap[];
  public navbarRouteDefinitions: { [index: string]: string };

  constructor() { }

  ngOnInit() {
    this.navbarRouteDefinitions = {
      navbar_user_groups_header: 'Utilisateurs & groupes',
      navbar_forms_managenents_header: 'Gestion des formulaires',
      navbar_modules_management_header: 'Gestion des modules',
      navbar_users_management_create: 'Ajouter un utilisateur',
      navbar_users_management_list: 'Liste des utilisateurs',
      navbar_roles_permissions: 'Roles & Permissions',
      navbar_forms_create: 'Créer un formulaire',
      navbar_forms_list: 'Liste des formulaires',
      navbar_modules_list: 'Liste des modules',
      navbar_modules_create: 'Ajouter un nouveau module', //
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_user_groups_header',
        // route: `/${AppRoutes.dashboardHomeRoute}`,
        children: [
          {
            key: 'navbar_users_management_create',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.managementsRoute}/${AppRoutes.createUsersRoute}`
          },
          {
            key: 'navbar_users_management_list',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.managementsRoute}/${AppRoutes.listUsersRoute}`
          },
          {
            key: 'navbar_roles_permissions',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.managementsRoute}/${AppRoutes.rolesManagementRoute}`
          }
        ]
      },
      {
        key: 'navbar_forms_managenents_header',
        // route: `/${AppRoutes.dashboardHomeRoute}`,
        children: [
          {
            key: 'navbar_forms_create',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.managementsRoute}/${AppRoutes.createFormsRoute}`
          },
          {
            key: 'navbar_forms_list',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.managementsRoute}/${AppRoutes.formsManagementRoute}`
          }
        ]
      },
      {
        key: 'navbar_modules_management_header',
        // route: `/${AppRoutes.dashboardHomeRoute}`,
        children: [
          {
            key: 'navbar_modules_create',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.managementsRoute}/${AppRoutes.createModulesRoute}`
          },
          {
            key: 'navbar_modules_list',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.managementsRoute}/${AppRoutes.modulesManagementRoute}`
          }
        ]
      }
    ];
  }

}
