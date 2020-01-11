import { Component, OnInit } from '@angular/core';
import { RoutesMap } from '../../routes-definitions';
import { AppRoutes } from 'src/app/lib/presentation/routes-definitions';

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
      navbar_contribution_records: 'Enregistrement des cotisations',
      navbar_list_records: 'Gestion des cotisations',
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
        route: `/${AppRoutes.dashboardRoute}/${AppRoutes.enregistrementRoute}`,
        children: [
          {
            key: 'navbar_contribution_records',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.enregistrementRoute}`
          },
          {
            key: 'navbar_list_records',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.listRecordsRoute}`
          },
          {
            key: 'navbar_manage_individual_accounts',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.structuresRoute}`
          },
          {
            key: 'navbar_manage_accounts',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.workersRoute}`
          },
        ]
      },
      {
        key: 'navbar_rc',
        route: `/${AppRoutes.dashboardRoute}/${AppRoutes.structuresRoute}`,
        children: [
          {
            key: 'navbar_rc_contribution_records',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.membershipRcRoute}`
          },
          {
            key: 'navbar_rc_list_requests',
            route: `/${AppRoutes.dashboardRoute}/${AppRoutes.membershipRcListRoute}`
          },
        ]
      },
    ];
  }
}
