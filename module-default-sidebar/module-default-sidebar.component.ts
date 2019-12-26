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
      navbar_economie_informelle: 'Indépendants & Economie Informelle',
      navbar_new_record: 'Nouvelle adhésion',
      navbar_list_records: 'Demandes d\'adhésion',
      navbar_manage_structures: 'Gestion des Structures',
      navbar_manage_members: 'Gestion des Adhérents',
      navbar_retraite_complementaire: 'Retraite Complémentaire',
      navbar_rc_new_request: 'Nouvelle adhésion',
      navbar_rc_list_requests: 'Demandes d\'adhésion',
      navbar_rc_manage_employers: 'Gestion des employeurs',
      navbar_rc_manage_members: 'Gestion des adhérents',
      // navbar_add_structure: 'Ajouter une structure',
      // navbar_list_structures: 'Dossier des structures',
      navbar_workers: 'Travailleurs',
      navbar_list_workers: 'Dossier des Travailleurs',
      navbar_account: 'Mon compte',
      navbar_personal_information: 'Informations personnelles',
      // navbar_data_personnalisation: '',
      // navbar_password_security: 'Sécurité & Mot de passe',
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_economie_informelle',
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
          {
            key: 'navbar_manage_structures',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.structuresRoute}`
          },
          {
            key: 'navbar_manage_members',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.workersRoute}`
          },
        ]
      },
      {
        key: 'navbar_retraite_complementaire',
        route: `/${AppRoutes.dashboardRoute}/${AppRoutes.structuresRoute}`,
        children: [
          {
            key: 'navbar_rc_new_request',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.membershipRcRoute}`
          },
          {
            key: 'navbar_rc_list_requests',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.membershipRcListRoute}`
          },
          {
            key: 'navbar_rc_manage_employers',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.membershipRcEmployersRoute}`
          },
          {
            key: 'navbar_rc_manage_members',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.membershipRcMembersRoute}`
          },
        ]
      },
      // {
      //   key: 'navbar_workers',
      //   route: `/${AppRoutes.dashboardRoute}/${AppRoutes.homeRoute}`,
      //   children: [
      //     {
      //       key: 'navbar_list_workers',
      //       route: `/${AppRoutes.dashboardRoute}/${AppRoutes.workersRoute}`
      //     },
      //   ]
      // },
      // {
      //   key: 'navbar_account',
      //   route: `/${AppRoutes.userInfoRoute}`,
      //   children: [
      //     {
      //       key: 'navbar_personal_information',
      //       route: `/${AppRoutes.dashboardRoute}/${AppRoutes.userInfoRoute}`
      //     },
      //   ]
      // }
    ];
  }
}
