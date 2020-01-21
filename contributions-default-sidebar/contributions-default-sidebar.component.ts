import { Component, OnInit } from '@angular/core';
import { RoutesMap } from '../../routes-definitions';
import { partialConfigs } from '../partials-configs';

@Component({
  selector: 'app-contributions-default-sidebar',
  templateUrl: './contributions-default-sidebar.component.html',
  styleUrls: ['./contributions-default-sidebar.component.scss']
})

export class ContributionsDefaultSidebarComponent implements OnInit {
  public navbarRoutesMap: RoutesMap[];
  public navbarRouteDefinitions: {
    [index: string]: string;
  };

  constructor() { }

  ngOnInit() {
    this.navbarRouteDefinitions = {
      navbar_tiei: 'Gestion TIEI',
      navbar_tiei_enregistrement: 'Enregistrement des cotisations',
      navbar_tiei_cotisation: 'Gestion des cotisations',
      navbar_manage_individual_accounts: 'Comptes individuels',
      navbar_manage_accounts: 'Comptes cotisants',
      navbar_rc: 'Gestion RC',
      navbar_rc_contribution_records: 'Enregistrement des cotisations',
      navbar_rc_list_requests: 'Gestion des cotisations',
      navbar_rc__individual_accounts: 'Comptes individuels',
      navbar_rc_manage_accounts: 'Comptes cotisants',
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_tiei',
        route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.contributionsModuleRoutes.tieiEnregistrementRoute}`,
        children: [
          {
            key: 'navbar_tiei_enregistrement',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.contributionsModuleRoutes.tieiEnregistrementRoute}`
          },
          {
            key: 'navbar_tiei_cotisation',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.contributionsModuleRoutes.tieiGestionCotisationsRoute}`
          },
          {
            key: 'navbar_manage_individual_accounts',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.contributionsModuleRoutes.tieiIndividualAccountsRoute}`
          },
          {
            key: 'navbar_manage_accounts',
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.contributionsModuleRoutes.tieiContributorsAccountsRoute}`
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
