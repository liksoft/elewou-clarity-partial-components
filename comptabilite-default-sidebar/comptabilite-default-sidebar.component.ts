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
      navbar_tiei_saisie_ecritures: 'Ecritures',
      navbar_tiei_saisie_manuel: 'Passer une écriture',

      navbar_tiei_saisie_journaux: 'Journaux',
      navbar_tiei_saisie_ecritures_liste: 'Journal (Liste)',
      navbar_tiei_saisie_ecritures_releve: 'Journal (Relevé)',

      navbar_tiei_accounting_transfert: 'Transfert Comptable',

      navbar_tiei_etats_comptable: 'Etats Comptables',
      // navbar_tiei_balance: 'Balance',
      navbar_tiei_balance_liste: 'Balance ',
      navbar_tiei_grand_livre: 'Grand Livre',

      navbar_tiei_etat_financiers: 'Etats Financiers',
      navbar_tiei_etat_financiers_bilan: 'Bilan',
      navbar_tiei_etat_financiers_resultat: 'Résultat',

      navbar_tiei_parametrage_comptes: 'Paramétrages des comptes',
      navbar_tiei_parametrage_comptes_list: 'Liste des comptes',
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_tiei_saisie_ecritures',
        permissions: cptaPermissions,
        children: [
          {
            key: 'navbar_tiei_saisie_manuel',
            route: `/${defaultPath}/${comptabilitePath.tieiAjoutEcrituresRoute}`,
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ]
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
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ]
          },
          {
            key: 'navbar_tiei_saisie_ecritures_releve',
            route: `/${defaultPath}/${comptabilitePath.tieiSaisieEcrituresReleveRoute}`,
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ]
          }
        ]
      },
      // {
      //   key: 'navbar_tiei_balance',
      //   permissions: cptaPermissions,
      //   children: [
      //     {
      //       key: 'navbar_tiei_balance_liste',
      //       route: `/${defaultPath}/${comptabilitePath.tieiBalanceRoute}`,
      //       permissions: [
      //         partialConfigs.acl.list_accountancy_operations,
      //         partialConfigs.acl.all,
      //         partialConfigs.acl.create_accountancy_operations,
      //         partialConfigs.acl.update_accountancy_operations,
      //       ]
      //     }
      //   ]
      // },
      {
        key: 'navbar_tiei_accounting_transfert',
        permissions: cptaPermissions,
        children: [
          {
            key: 'navbar_tiei_accounting_transfert',
            route: `/${defaultPath}/${comptabilitePath.tieiAccountingTransfertRoute}`,
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ],
          },
        ]
      },
      {
        key: 'navbar_tiei_etats_comptable',
        permissions: cptaPermissions,
        children: [
          // {
          //   key: 'navbar_tiei_etats_comptable',
          //   route: `/${defaultPath}/${comptabilitePath.tieiEtatsComptablesRoute}`,
          //   permissions: [
          //     partialConfigs.acl.list_accountancy_operations,
          //     partialConfigs.acl.all,
          //     partialConfigs.acl.create_accountancy_operations,
          //     partialConfigs.acl.update_accountancy_operations,
          //   ],
          // },
          {
            key: 'navbar_tiei_balance_liste',
            route: `/${defaultPath}/${comptabilitePath.tieiBalanceRoute}`,
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ]
          },
          {
            key: 'navbar_tiei_grand_livre',
            route: `/${defaultPath}/${comptabilitePath.tieiGrandlivreRoute}`,
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ],
          },

        ]
      },
      {
        key: 'navbar_tiei_etat_financiers',
        permissions: cptaPermissions,
        children: [
          {
            key: 'navbar_tiei_etat_financiers',
            route: `/${defaultPath}/${comptabilitePath.tieiEtatsFinanciersRoute}`,
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ],
          },
          {
            key: 'navbar_tiei_etat_financiers_bilan',
            route: `/${defaultPath}/${comptabilitePath.tieiEtatsFinanciersBilanRoute}`,
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ],
          },
          {
            key: 'navbar_tiei_etat_financiers_resultat',
            route: `/${defaultPath}/${comptabilitePath.tieiEtatsFinanciersResultatRoute}`,
            permissions: [
              partialConfigs.acl.list_accountancy_operations,
              partialConfigs.acl.all,
              partialConfigs.acl.create_accountancy_operations,
              partialConfigs.acl.update_accountancy_operations,
            ],
          },

        ]
      },
      {
        key: 'navbar_tiei_parametrage_comptes',
        permissions: cptaPermissions,
        children: [
          {
            key: 'navbar_tiei_parametrage_comptes_list',
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
