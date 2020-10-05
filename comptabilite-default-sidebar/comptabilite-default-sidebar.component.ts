import { Component, OnInit } from '@angular/core';
import { RoutesMap } from 'src/app/lib/domain/routes';
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

  ngOnInit(): void {
    this.navbarRouteDefinitions = {
      navbar_tiei_saisie_ecritures: 'Ecritures',
      navbar_tiei_saisie_manuel: 'Nouvelle écriture',

      navbar_tiei_saisie_journaux: 'Journaux',
      navbar_tiei_saisie_ecritures_liste: 'Journal',
      // navbar_tiei_saisie_ecritures_releve: 'Journal (Relevé)',

      navbar_tiei_etats_comptable: 'Etats Comptables',
      // navbar_tiei_balance: 'Balance',
      navbar_tiei_balance_liste: 'Balance ',
      navbar_tiei_grand_livre: 'Grand Livre',

      navbar_tiei_etat_financiers: 'Etats financier ',
      navbar_tiei_etat_financiers1: 'Générer les états ',
      // navbar_tiei_etat_financiers_bilan: 'Bilan',
      // navbar_tiei_etat_financiers_resultat: 'Résultat',

      navbar_tiei_parametrage_comptes: 'Paramétrage',
      navbar_tiei_parametrage_comptes_list: 'Configuration',
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_tiei_saisie_ecritures',
        permissions: cptaPermissions,
        children: [
          {
            key: 'navbar_tiei_saisie_manuel',
            route: `/${defaultPath}/${comptabilitePath.tieiAjoutEcrituresRoute}`,
            // permissions: []
          }
        ]
      },
      {
        key: 'navbar_tiei_saisie_journaux',
        permissions: cptaPermissions,
        children: [
          {
            key: 'navbar_tiei_saisie_ecritures_liste',
            route: `/${defaultPath}/${comptabilitePath.tieiSaisieEcrituresRoute}`,
          },
        ]
      },
      {
        key: 'navbar_tiei_etats_comptable',
        permissions: cptaPermissions,
        children: [
          {
            key: 'navbar_tiei_balance_liste',
            route: `/${defaultPath}/${comptabilitePath.tieiBalanceRoute}`,
            // permissions: []
          },
          {
            key: 'navbar_tiei_grand_livre',
            route: `/${defaultPath}/${comptabilitePath.tieiGrandlivreRoute}`,
            // permissions: [],
          },

        ]
      },
      {
        key: 'navbar_tiei_etat_financiers',
        permissions: cptaPermissions,
        children: [
          {
            key: 'navbar_tiei_etat_financiers1',
            route: `/${defaultPath}/${comptabilitePath.tieiEtatsFinanciersRoute}`,
            // permissions: [],
          },

        ]
      },
      {
        key: 'navbar_tiei_parametrage_comptes',
        // permissions: [],
        children: [
          {
            key: 'navbar_tiei_parametrage_comptes_list',
            route: `/${defaultPath}/${comptabilitePath.tieiParametrageComptesRoute}`,
            // permissions: []
          },
        ]
      },
    ];
  }
}
