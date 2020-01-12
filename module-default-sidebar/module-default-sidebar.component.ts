import { Component, OnInit } from '@angular/core';
import { RoutesMap } from '../../routes-definitions';
import { partialConfigs } from '../partials-configs';
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
  public accessControlList = partialConfigs.acl;

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
        route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.enregistrementRoute}`,
        children: [
          {
            key: 'navbar_new_record',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.enregistrementRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.create_imm_requests
            ]
          },
          {
            key: 'navbar_list_records',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.listRecordsRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.list_imm_requests
            ]
          },
          {
            key: 'navbar_manage_structures',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.structuresRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.list_structures
            ]
          },
          {
            key: 'navbar_manage_members',
            // tslint:disable-next-line: max-line-length
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.workersRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.list_members
            ]
          },
        ]
      },
      {
        key: 'navbar_retraite_complementaire',
        children: [
          {
            key: 'navbar_rc_new_request',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.membershipRcRoute}`
          },
          {
            key: 'navbar_rc_list_requests',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.membershipRcListRoute}`
          },
          {
            key: 'navbar_rc_manage_employers',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.membershipRcEmployersRoute}`
          },
          {
            key: 'navbar_rc_manage_members',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.membershipRcMembersRoute}`
          },
        ]
      },
    ];
  }
}
