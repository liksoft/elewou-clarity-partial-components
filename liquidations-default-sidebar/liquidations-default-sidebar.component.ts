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
      navbar_tiei_enregistrement_liquidation: 'Enrégistrer une liquidation',
      navbar_tiei_list_liquidations: 'Gestion des liquidations',
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
        ]
      },
      // {
      //   key: 'navbar_rc',
      //   route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.structuresRoute}`,
      //   children: [
      //     {
      //       key: 'navbar_rc_contribution_records',
      //       route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.membershipRcRoute}`
      //     },
      //     {
      //       key: 'navbar_rc_list_requests',
      //       route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.immatriculationModuleRoutes.membershipRcListRoute}`
      //     },
      //   ]
      // },
    ];
  }
}
