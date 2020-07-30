import { Component, OnInit } from '@angular/core';
import { RoutesMap } from '../../routes-definitions';
import { defaultPath, adminPath } from '../partials-configs';

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
      navbar_department_management_header: 'Gestion des départements',
      navbar_department_list: 'Liste des départements'
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_user_groups_header',
        children: [
          {
            key: 'navbar_users_management_list',
            route: `/${defaultPath}/${adminPath.managementsRoute}/${adminPath.listUsersRoute}`
          },
          {
            key: 'navbar_roles_permissions',
            route: `/${defaultPath}/${adminPath.managementsRoute}/${adminPath.rolesManagementRoute}`
          }
        ]
      },
      {
        key: 'navbar_forms_managenents_header',
        children: [
          {
            key: 'navbar_forms_list',
            route: `/${defaultPath}/${adminPath.managementsRoute}/${adminPath.formsManagementRoute}`
          }
        ]
      },
      {
        key: 'navbar_modules_management_header',
        children: [
          {
            key: 'navbar_modules_list',
            route: `/${defaultPath}/${adminPath.managementsRoute}/${adminPath.modulesManagementRoute}`
          }
        ]
      },
      {
        key: 'navbar_department_management_header',
        children: [
          {
            key: 'navbar_department_list',
            route: `/${defaultPath}/${adminPath.managementsRoute}/${adminPath.departmentManagementRoute}`
          }
        ]
      }
    ];
  }

}
