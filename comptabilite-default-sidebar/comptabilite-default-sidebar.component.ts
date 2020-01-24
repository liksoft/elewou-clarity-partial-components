import { Component, OnInit } from '@angular/core';
import { RoutesMap } from '../../routes-definitions';
import { defaultPath, comptabilitePath } from '../partials-configs';

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
      navbar_tiei: 'Gestion Liquidations TIEI',
      navbar_tiei_enregistrement_liquidation: 'Enregistrer une liquidation',
      navbar_tiei_list_liquidations: 'Gestion des liquidations',
      navbar_tiei_manage_decomptes: 'Gestion des Décomptes',
      navbar_tiei_gestion_reversions: 'Gestion des Reversions',
      navbar_tiei_ordonnancer_droits: 'Ordonnancement des droits',
      navbar_tiei_paiement_droits: 'Paiement et clôture des droits',
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_tiei',
        // route: `/${defaultPath}/${comptabilitePath.tieiGestionLiquidationsRoute}`,
        children: [
          {
            key: 'navbar_tiei_saisie_ecritures',
            route: `/${defaultPath}/${comptabilitePath.tieiSaisieEcrituresRoute}`
          },
          {
            key: 'navbar_tiei_deversement',
            route: `/${defaultPath}/${comptabilitePath.tieiDeversementsRoute}`
          },
          {
            key: 'navbar_tiei_etats_comptable',
            route: `/${defaultPath}/${comptabilitePath.tieiEtatsComptablesRoute}`
          },
          {
            key: 'navbar_tiei_etat_financiers',
            route: `/${defaultPath}/${comptabilitePath.tieiEtatsFinanciersRoute}`
          },
          {
            key: 'navbar_tiei_parametrage_comptes',
            route: `/${defaultPath}/${comptabilitePath.tieiParametrageComptesRoute}`
          },
        ]
      },
      // {
      //   key: 'navbar_rc',
      //   route: `/${defaultPath}/${partialConfigs.routes.immatriculationModuleRoutes.structuresRoute}`,
      //   children: [
      //     {
      //       key: 'navbar_rc_contribution_records',
      //       route: `/${defaultPath}/${partialConfigs.routes.immatriculationModuleRoutes.membershipRcRoute}`
      //     },
      //     {
      //       key: 'navbar_rc_list_requests',
      //       route: `/${defaultPath}/${partialConfigs.routes.immatriculationModuleRoutes.membershipRcListRoute}`
      //     },
      //   ]
      // },
    ];
  }
}
