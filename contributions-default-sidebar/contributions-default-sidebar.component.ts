import { Component, OnInit } from '@angular/core';
import { RoutesMap } from '../../routes-definitions';
import { partialConfgis } from '../partials-configs';

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
        route: `/${AppRoutes.dashboardRoute}/${AppRoutes.tieiEnregistrementRoute}`,
        children: [
          {
            key: 'navbar_tiei_enregistrement',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.tieiEnregistrementRoute}`
          },
          {
            key: 'navbar_tiei_cotisation',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.tieiGestionCotisationsRoute}`
        route: `/${partialConfgis.routes.commonRoutes.dashboardRoute}/${partialConfgis.routes.immatriculationModuleRoutes.enregistrementRoute}`,
        children: [
          {
            key: 'navbar_contribution_records',
            route: `/${partialConfgis.routes.commonRoutes.dashboardRoute}/${partialConfgis.routes.immatriculationModuleRoutes.enregistrementRoute}`
          },
          {
            key: 'navbar_list_records',
            route: `/${partialConfgis.routes.commonRoutes.dashboardRoute}/${partialConfgis.routes.immatriculationModuleRoutes.listRecordsRoute}`
          },
          {
            key: 'navbar_manage_individual_accounts',
            route: `/${partialConfgis.routes.commonRoutes.dashboardRoute}/${partialConfgis.routes.immatriculationModuleRoutes.structuresRoute}`
          },
          {
            key: 'navbar_manage_accounts',
            route: `/${partialConfgis.routes.commonRoutes.dashboardRoute}/${partialConfgis.routes.immatriculationModuleRoutes.workersRoute}`
          },
          // {
          //   key: 'navbar_manage_individual_accounts',
          //   route: `/${AppRoutes.dashboardRoute}/${AppRoutes.tieiIndividualAccountsRoute}`
          // },
          // {
          //   key: 'navbar_manage_accounts',
          //   route: `/${AppRoutes.dashboardRoute}/${AppRoutes.tieiContributorsAccountsRoute}`
          // },
        ]
      },
      {
        key: 'navbar_rc',
        route: `/${partialConfgis.routes.commonRoutes.dashboardRoute}/${partialConfgis.routes.immatriculationModuleRoutes.structuresRoute}`,
        children: [
          {
            key: 'navbar_rc_contribution_records',
            route: `/${partialConfgis.routes.commonRoutes.dashboardRoute}/${partialConfgis.routes.immatriculationModuleRoutes.membershipRcRoute}`
          },
          {
            key: 'navbar_rc_list_requests',
            route: `/${partialConfgis.routes.commonRoutes.dashboardRoute}/${partialConfgis.routes.immatriculationModuleRoutes.membershipRcListRoute}`
          },
        ]
      },
    ];
  }
}
