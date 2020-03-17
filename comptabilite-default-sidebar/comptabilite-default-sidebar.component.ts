import { Component, OnInit } from '@angular/core';
import { RoutesMap } from '../../routes-definitions';
import { defaultPath, comptabilitePath, cptaPermissions, partialConfigs } from '../partials-configs';

@Component({
  selector: 'app-comptabilite-default-sidebar',
  templateUrl: './comptabilite-default-sidebar.component.html',
  styles: []
})
export class ComptabiliteDefaultSidebarComponent implements OnInit {

  public navbarRoutesMap: RoutesMap[];
  public navbarRouteDefinitions: {
    [index: string]: string;
  };

  constructor() { }

  ngOnInit() {
    this.navbarRouteDefinitions = {
      navbar_tiei: 'Comptabilité',
      navbar_tiei_saisie_ecritures: 'Ecritures et journal',
      navbar_tiei_deversement: 'Déversements',
      navbar_tiei_etats_comptable: 'Etats Comptables',
      navbar_tiei_etat_financiers: 'Etats Financiers',
      navbar_tiei_parametrage_comptes: 'Paramétrages des comptes',
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_tiei',
        permissions: cptaPermissions,
        children: [
          {
            key: 'navbar_tiei_saisie_ecritures',
            route: `/${defaultPath}/${comptabilitePath.tieiSaisieEcrituresRoute}`,
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ]
          },
          {
            key: 'navbar_tiei_deversement',
            route: `/${defaultPath}/${comptabilitePath.tieiDeversementsRoute}`,
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ]
          },
          {
            key: 'navbar_tiei_etats_comptable',
            route: `/${defaultPath}/${comptabilitePath.tieiEtatsComptablesRoute}`,
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ]
          },
          {
            key: 'navbar_tiei_etat_financiers',
            route: `/${defaultPath}/${comptabilitePath.tieiEtatsFinanciersRoute}`,
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ]
          },
          {
            key: 'navbar_tiei_parametrage_comptes',
            route: `/${defaultPath}/${comptabilitePath.tieiParametrageComptesRoute}`,
            permissions: [
              partialConfigs.acl.list_comptes,
              partialConfigs.acl.all,
              partialConfigs.acl.create_comptes,
              partialConfigs.acl.update_comptes,
            ]
          },
        ]
      },
    ];
  }
}
