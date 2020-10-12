import { Component, OnInit } from '@angular/core';
import { RoutesMap } from 'src/app/lib/domain/routes';
import { partialConfigs, immatriculationPath, defaultPath, inImmRequestPermissions, rcMembershipPermissions } from '../partials-configs';
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

  ngOnInit(): void {

    this.navbarRouteDefinitions = {
      navbar_economie_informelle: 'Indépendants & Economie Informelle',
      navbar_new_record: 'Nouvelle adhésion',
      navbar_list_imm: 'Demandes d\'Adhésion',
      navbar_list_adhesions: 'Demandes d\'Adhésion',
      navbar_manage_structures: 'Structures',
      navbar_manage_members: 'Adhérents',
      navbar_imm_processes: 'Aide : Processus',
      navbar_retraite_complementaire: 'Retraite Complémentaire',
      navbar_rc_new_request: 'Nouvelle adhésion',
      navbar_rc_new_requests: 'Adhésion en lot',
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
        permissions: inImmRequestPermissions,
        children: [
          {
            key: 'navbar_new_record',
            route: `/${defaultPath}/${immatriculationPath.enregistrementRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.create_rtiei_membership_requests
            ]
          },
          {
            key: 'navbar_list_imm',
            route: `/${defaultPath}/${immatriculationPath.listRecordsRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.create_rtiei_membership_requests
            ]
          },
          {
            key: 'navbar_manage_members',
            route: `/${defaultPath}/${immatriculationPath.workersRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.create_rtiei_membership_requests
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
        ]
      },
      {
        key: 'navbar_retraite_complementaire',
        permissions: rcMembershipPermissions,
        children: [ //
          {
            key: 'navbar_rc_new_request',
            route: `/${defaultPath}/${immatriculationPath.createMembershipRcRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.create_rc_memberships
            ]
          },
          {
            key: 'navbar_rc_new_requests',
            route: `/${defaultPath}/${immatriculationPath.createManyMembershipsRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.create_rc_memberships
            ]
          },
          {
            key: 'navbar_rc_list_requests',
            route: `/${defaultPath}/${immatriculationPath.membershipRcListRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.list_rc_memberships
            ]
          },
          {
            key: 'navbar_rc_manage_members',
            route: `/${defaultPath}/${immatriculationPath.membershipRcMembersRoute}`,
            permissions: [
              this.accessControlList.all,
              this.accessControlList.list_rc_memberships
            ]
          },
        ]
      },
    ];
  }
}
