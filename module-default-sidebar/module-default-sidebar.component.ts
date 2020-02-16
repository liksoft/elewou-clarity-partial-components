import { Component, OnInit } from '@angular/core';
import { RoutesMap } from '../../routes-definitions';
import { partialConfigs, immatriculationPath, defaultPath } from '../partials-configs';
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
      navbar_list_imm: 'Demandes d\'immatriculations',
      navbar_list_adhesions: 'Demandes d\'Adhésion',
      navbar_manage_structures: 'Structures',
      navbar_manage_members: 'Adhérents',
      navbar_imm_processes: 'Aide : Processus',
      navbar_retraite_complementaire: 'Retraite Complémentaire',
      navbar_rc_new_request: 'Nouvelle adhésion',
      navbar_rc_list_requests: 'Demandes d\'adhésion',
      navbar_rc_manage_employers: 'Gestion des employeurs',
      navbar_rc_manage_members: 'Gestion des adhérents',
      navbar_workers: 'Travailleurs',
      navbar_list_workers: 'Dossier des Travailleurs',
      navbar_account: 'Mon compte',
      navbar_personal_information: 'Informations personnelles'
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_economie_informelle',
        route: `/${defaultPath}/${immatriculationPath.enregistrementRoute}`,
        children: [
          {
            key: 'navbar_list_imm',
            route: `/${defaultPath}/${immatriculationPath.listRecordsRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.create_imm_requests
            ]
          },
          // {
          //   key: 'navbar_list_records',
          //   route: `/${defaultPath}/${immatriculationPath.listRecordsRoute}`,
          //   permissions: [
          //     this.accessControlList.all,
          //     this.accessControlList.list_imm_requests
          //   ]
          // },
          {
            key: 'navbar_manage_members',
            route: `/${defaultPath}/${immatriculationPath.workersRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.create_imm_requests
            ]
          },
          {
            key: 'navbar_manage_structures',
            route: `/${defaultPath}/${immatriculationPath.structuresRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.list_structures
            ]
          },
          // {
          //   key: 'navbar_manage_members',
          //   // tslint:disable-next-line: max-line-length
          //   route: `/${defaultPath}/${immatriculationPath.workersRoute}`,
          // },
        ]
      },
      {
        key: 'navbar_retraite_complementaire',
        children: [
          {
            key: 'navbar_rc_new_request',
            route: `/${defaultPath}/${immatriculationPath.membershipRcRoute}`
          },
          {
            key: 'navbar_rc_list_requests',
            route: `/${defaultPath}/${immatriculationPath.membershipRcListRoute}`
          },
          {
            key: 'navbar_rc_manage_employers',
            route: `/${defaultPath}/${immatriculationPath.membershipRcEmployersRoute}`
          },
          {
            key: 'navbar_rc_manage_members',
            route: `/${defaultPath}/${immatriculationPath.membershipRcMembersRoute}`
          },
        ]
      },
    ];
  }
}
