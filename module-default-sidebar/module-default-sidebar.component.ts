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
      navbar_new_record: 'Immatriculation',
      navbar_list_imm: 'Demandes d\'immatriculation',
      navbar_list_adhesions: 'Demandes d\'Adhésion',
      navbar_manage_structures: 'Structures',
      navbar_manage_members: 'Adhérents',
      navbar_imm_processes: 'Aide : Processus',
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
<<<<<<< HEAD
            key: 'navbar_list_imm',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.listRecordsRoute}`
=======
            key: 'navbar_list_records',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.listRecordsRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.list_imm_requests
            ]
>>>>>>> a1a728e3265b52d8dffcf55f5900997a1b62cbfd
          },
          {
            key: 'navbar_list_adhesions',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.listRecordsRoute}`
          },
          {
            key: 'navbar_manage_members',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.workersRoute}`
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
<<<<<<< HEAD
            key: 'navbar_imm_processes',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.workersRoute}`
=======
            key: 'navbar_manage_members',
            // tslint:disable-next-line: max-line-length
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.workersRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.list_members
            ]
>>>>>>> a1a728e3265b52d8dffcf55f5900997a1b62cbfd
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
