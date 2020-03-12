import { Component, OnInit } from '@angular/core';
import { RoutesMap } from '../../routes-definitions';
import { partialConfigs, defaultPath, contributionPath, RC_STRUCTURES, RC_MEMBERS, contributionPermissions, rcContributionPermissions } from '../partials-configs';

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
      navbar_rc_enregistrement: 'Enregistrement des cotisations',
      navbar_rc_contribution_declarations: 'Gestion des cotisations (Assurés)',
      navbar_rc_structure_contribution_declarations: 'Gestion des cotisations (Employeurs / Faitières)',
      navbar_rc_individual_accounts: 'Comptes individuels',
      navbar_rc_manage_accounts: 'Comptes cotisants',
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_tiei',
        // route: `/${defaultPath}/${contributionPath.tieiEnregistrementRoute}`,
        permissions: contributionPermissions,
        children: [
          {
            key: 'navbar_tiei_enregistrement',
            route: `/${defaultPath}/${contributionPath.tieiEnregistrementRoute}`,
            permissions: [
              partialConfigs.acl.all,
              partialConfigs.acl.create_rtiei_contribution_declaration_assignations,
              partialConfigs.acl.create_rtiei_contribution_declarations,
            ]
          },
          {
            key: 'navbar_tiei_cotisation',
            route: `/${defaultPath}/${contributionPath.tieiGestionCotisationsRoute}`,
            permissions: [
              partialConfigs.acl.all,
              partialConfigs.acl.list_rtiei_contribution_declaration_assignations,
              partialConfigs.acl.list_rtiei_contribution_declarations,
            ]
          },
          {
            key: 'navbar_manage_individual_accounts',
            route: `/${defaultPath}/${contributionPath.tieiIndividualAccountsRoute}`,
            permissions: [
              partialConfigs.acl.all,
              partialConfigs.acl.list_rtiei_contribution_declaration_assignations,
              partialConfigs.acl.list_rtiei_contribution_declarations,
            ]
          },
          {
            key: 'navbar_manage_accounts',
            route: `/${defaultPath}/${contributionPath.tieiContributorsAccountsRoute}`,
            permissions: [
              partialConfigs.acl.all,
              partialConfigs.acl.list_rtiei_contribution_declaration_assignations,
              partialConfigs.acl.list_rtiei_contribution_declarations,
            ]
          },
        ]
      },
      {
        key: 'navbar_rc',
        permissions: rcContributionPermissions,
        children: [
          {
            key: 'navbar_rc_enregistrement',
            route: `/${defaultPath}/${contributionPath.rcEnregistrementRoute}`,
            permissions: [
              partialConfigs.acl.all,
              partialConfigs.acl.create_rc_contribution_declaration_assignations,
              partialConfigs.acl.create_rc_contribution_declarations,
            ]
          },
          {
            key: 'navbar_rc_contribution_declarations',
            route: `/${defaultPath}/${contributionPath.rcGestionCotisationsRoute}/${RC_MEMBERS}`,
            permissions: [
              partialConfigs.acl.all,
              partialConfigs.acl.list_rc_contribution_declaration_assignations,
              partialConfigs.acl.list_rc_contribution_declarations,
            ]
          },
          {
            key: 'navbar_rc_structure_contribution_declarations',
            route: `/${defaultPath}/${contributionPath.rcGestionCotisationsRoute}/${RC_STRUCTURES}`,
            permissions: [
              partialConfigs.acl.all,
              partialConfigs.acl.list_rc_contribution_declaration_assignations,
              partialConfigs.acl.list_rc_contribution_declarations,
            ]
          },
          {
            key: 'navbar_rc_individual_accounts',
            route: `/${defaultPath}/${contributionPath.rcIndividualAccountsRoute}`,
            permissions: [
              partialConfigs.acl.all,
              partialConfigs.acl.list_rc_contribution_declaration_assignations,
              partialConfigs.acl.list_rc_contribution_declarations,
            ]
          },
          {
            key: 'navbar_rc_manage_accounts',
            route: `/${defaultPath}/${contributionPath.rcContributorsAccountsRoute}`,
            permissions: [
              partialConfigs.acl.all,
              partialConfigs.acl.list_rc_contribution_declaration_assignations,
              partialConfigs.acl.list_rc_contribution_declarations,
            ]
          }
        ]
      },
    ];
  }
}
