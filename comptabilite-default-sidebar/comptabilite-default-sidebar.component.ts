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
      navbar_tiei: 'Gestion Comptabilites et finances TIEI',
      navbar_tiei_saisie_ecritures: 'Ecritures et journal',
      navbar_tiei_deversement: 'Déversements',
      navbar_tiei_etats_comptable: 'Etats Comptables',
      navbar_tiei_etat_financiers: 'Etats Financiers',
      navbar_tiei_parametrage_comptes: 'Paramétrages des comptes',
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
