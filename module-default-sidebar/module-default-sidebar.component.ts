import { Component, OnInit } from '@angular/core';
import { RoutesMap } from '../../routes-definitions';
import { AppRoutes } from 'src/app/lib/presentation/routes-definitions';

@Component({
  selector: 'app-module-default-sidebar',
  templateUrl: './module-default-sidebar.component.html',
  styles: []
})
export class ModuleDefaultSidebarComponent implements OnInit {

  public navbarRoutesMap: RoutesMap[];
  public navbarRouteDefinitions: {
    [index: string]: string;
  };
  constructor() { }
  ngOnInit() {
    this.navbarRouteDefinitions = {
      navbar_dashboard: 'Immatriculation',
      navbar_new_record: 'Créer une immatriculation',
      navbar_list_records: 'Dossier des immatriculations',
      navbar_structures: 'Structures',
      navbar_add_structure: 'Ajouter une structure',
      navbar_list_structures: 'Dossier des structures',
      navbar_workers: 'Travailleurs',
      navbar_list_workers: 'Dossier des Travailleurs',
      navbar_account: 'Mon compte',
      navbar_personal_information: 'Informations personnelles',
      // navbar_data_personnalisation: '',
      // navbar_password_security: 'Sécurité & Mot de passe',
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_dashboard',
        route: `/${AppRoutes.dashboardRoute}/${AppRoutes.enregistrementRoute}`,
        children: [
          {
            key: 'navbar_new_record',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.enregistrementRoute}`
          },
          {
            key: 'navbar_list_records',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.listRecordsRoute}`
          },
        ]
      },
      {
        key: 'navbar_structures',
        route: `/${AppRoutes.dashboardRoute}/${AppRoutes.structuresRoute}`,
        children: [
          {
            key: 'navbar_add_structure',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.addStructureRoute}`
          },
          {
            key: 'navbar_list_structures',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.structuresRoute}`
          },
        ]
      },
      {
        key: 'navbar_workers',
        route: `/${AppRoutes.dashboardRoute}/${AppRoutes.homeRoute}`,
        children: [
          {
            key: 'navbar_list_workers',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.workersRoute}`
          },
        ]
      },
      {
        key: 'navbar_account',
        route: `/${AppRoutes.userInfoRoute}`,
        children: [
          {
            key: 'navbar_personal_information',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.userInfoRoute}`
          },
        ]
      }
    ];
  }
}
