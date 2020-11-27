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

      navbar_tiei_parametrage_comptes: 'Comptes',
      navbar_tiei_parametrage_comptes_list: 'Configuration',
      navbar_act_balance_sheet: 'Bilan',
      navbar_act_account_result: 'Résultat',
      navbar_act_account_nature: 'Nature de compte',

      navbar_act_writting_parameter: 'Ecritures',
      navbar_act_journal_type: 'Type de Journaux',
      navbar_act_operation_type: 'Type d\'opération',

      navbar_exercice_param: 'Exercices',
      navbar_exercice: 'Exercices',
      navbar_exercice_period: 'Période d\'exercices',

      navbar_parametre_general: 'Paramètres Généraux',
      navbar_societe: 'Société',
      navbar_directeur: 'Premier Dirigeant',
      navbar_setting: 'Paramètres',

    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_tiei_saisie_ecritures',
        permissions: cptaPermissions,
        routeIcon: 'form',
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
        routeIcon: 'map',
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
        routeIcon: 'balance',
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
        routeIcon: 'bar-chart',
        children: [
          {
            key: 'navbar_tiei_etat_financiers1',
            route: `/${defaultPath}/${comptabilitePath.tieiEtatsFinanciersRoute}`,
            // permissions: [],
          },

        ]
      },
      {
        key: 'navbar_exercice_param',
        routeIcon: 'cog',
        // permissions: [],
        children: [
          {
            key: 'navbar_exercice',
            route: `/${defaultPath}/${comptabilitePath.actExerciseRoute}`,
            // permissions: []
          },
          {
            key: 'navbar_exercice_period',
            route: `/${defaultPath}/${comptabilitePath.actExercisePeriodRoute}`,
            // permissions: []
          },
        ]
      },
      {
        key: 'navbar_tiei_parametrage_comptes',
        routeIcon: 'cog',
        children: [
          {
            key: 'navbar_tiei_parametrage_comptes_list',
            route: `/${defaultPath}/${comptabilitePath.tieiParametrageComptesRoute}`,
            // permissions: []
          },
          {
            key: 'navbar_act_balance_sheet',
            route: `/${defaultPath}/${comptabilitePath.actBalanceSheetRoute}`,
            // permissions: []
          },
          {
            key: 'navbar_act_account_result',
            route: `/${defaultPath}/${comptabilitePath.actResultAccountRoute}`,
            // permissions: []
          },
          {
            key: 'navbar_act_account_nature',
            route: `/${defaultPath}/${comptabilitePath.actAccountNatureRoute}`,
            // permissions: []
          },
        ]
      },
      {
        key: 'navbar_act_writting_parameter',
        routeIcon: 'cog',
        // permissions: [],
        children: [
          {
            key: 'navbar_act_journal_type',
            route: `/${defaultPath}/${comptabilitePath.actTypeJournalRoute}`,
            // permissions: []
          },
          {
            key: 'navbar_act_operation_type',
            route: `/${defaultPath}/${comptabilitePath.actTypeJournalOperation}`,
            // permissions: []
          },
        ]
      },
      {
        key: 'navbar_parametre_general',
        routeIcon: 'cog',
        // permissions: [],
        children: [
          {
            key: 'navbar_societe',
            route: `/${defaultPath}/${comptabilitePath.actCompanyRoute}`,
            // permissions: []
          },
          {
            key: 'navbar_directeur',
            route: `/${defaultPath}/${comptabilitePath.actDirectorRoute}`,
            // permissions: []
          },
          {
            key: 'navbar_setting',
            route: `/${defaultPath}/${comptabilitePath.actSettingsRoute}`,
            // permissions: []
          },
        ]
      },
    ];
  }
}
