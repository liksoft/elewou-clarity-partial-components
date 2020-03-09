import { Component, OnInit } from '@angular/core';
import { RoutesMap } from '../../routes-definitions';
import { defaultPath, liquidationsPath } from '../partials-configs';

@Component({
  selector: 'app-liquidations-default-sidebar',
  templateUrl: './liquidations-default-sidebar.component.html',
  styles: []
})
export class LiquidationsDefaultSidebarComponent implements OnInit {

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
      navbar_tiei_paiement_droits: 'Paiement des droits',
      navbar_tiei_bordereaux_virement: 'Gestion des bordereaux',
      // Rc route maps
      navbar_rc: 'Gestion des Liquidation RC',
      navbar_rc_enregistrement_liquidation: 'Enregistrer une liquidation',
      navbar_rc_list_liquidations: 'Gestion des liquidations',
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_tiei',
        // route: `/${defaultPath}/${liquidationsPath.tieiGestionLiquidationsRoute}`,
        children: [
          {
            key: 'navbar_tiei_enregistrement_liquidation',
            route: `/${defaultPath}/${liquidationsPath.tieiEnregistrementRoute}`
          },
          {
            key: 'navbar_tiei_list_liquidations',
            route: `/${defaultPath}/${liquidationsPath.tieiGestionLiquidationsRoute}`
          },
          {
            key: 'navbar_tiei_paiement_droits',
            route: `/${defaultPath}/${liquidationsPath.tieiPaiementDroitsRoute}`
          },
          {
            key: 'navbar_tiei_bordereaux_virement',
            route: `/${defaultPath}/${liquidationsPath.tieiGestionBordereauxVirementRoute}`
          },
        ]
      },
      {
        key: 'navbar_rc',
        children: [
          {
            key: 'navbar_rc_enregistrement_liquidation',
            route: `/${defaultPath}/${liquidationsPath.rcEnregistrementRoute}`
          },
          {
            key: 'navbar_rc_list_liquidations',
            route: `/${defaultPath}/${liquidationsPath.rcGestionLiquidationsRoute}`
          },
        ]
      },
    ];
  }
}
