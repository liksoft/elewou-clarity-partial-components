import { backendRoutes } from './backend-route-paths';
import { immRequestExcelSheetHeaders, rcDncHeaders } from './excel-sheets-headers';
import { appAccessControlList } from './access-control-list';
import { routeDefinitions } from './admin-route-definitions';
import { immatriculationRouteDefinitions } from './immatriculation-route-definitions';
import { contributionRouteDefinitions } from './contribution-route-definitions';
import { liquidationRouteDefinitions } from './liquidation-route-definitions';
import { accountingRouteDefinitions } from './accounting-route-definitions';
import { clientRoutes } from './online/client-route-paths';
import { clientRouteDefinitions } from './online/client-route-definitions';

/**
 * This file defines configuration values that are shared accross modules
 */
export const partialConfigs = {
  routes: {
    commonRoutes: {
      dashboardRoute: 'dashboard',
      dashboardHomeRoute: 'dashboard/home',
      homeRoute: 'home',
    },
    adminModuleRoutes: routeDefinitions,
    immatriculationModuleRoutes: immatriculationRouteDefinitions,
    contributionsModuleRoutes: contributionRouteDefinitions,
    liquidationsModuleRoutes: liquidationRouteDefinitions,
    comptabiliteModuleRoutes: accountingRouteDefinitions,
    clientModuleRoutes: clientRouteDefinitions
  },
  acl: appAccessControlList,
  backendRoutesPaths: backendRoutes,
  clientRoutePaths: clientRoutes,
  immRequestExcelHeaders: immRequestExcelSheetHeaders,
  rcDncExcelHeaders: rcDncHeaders,
  assignableCollections: {
    rtiei_membership_requests: 1,
    rtiei_contribution_declarations: 2,
    rtiei_contribution_payments: 3,
    rtiei_liquidations: 4,
    rc_membership: 5,
    rc_contribution_declarations: 6,
    rc_liquidations: 7,
  },
  latestTaskNumberOfMinutes: 2280,
  min_life_annuity: 10500,
  rtiei_retirement_age: 55,
  declarationsExcelHeaders: {
    insurance_id: 'Numero assurance',
    amount: 'Montant Cotisation'
  },
  liquidationTypes: {
    rachatTypeID: 1,
    capitalTypeID: 4,
    reversionTypeID: 5,
    annuityTypeID: 2,
    invalidityTypeID: 3
  },
  regimes: {
    rCompID: 3,
    rCapID: 2,
    rRevID: 1
  }
};

export const adminPermissions = [
  partialConfigs.acl.create_departments,
  partialConfigs.acl.update_departments,
  partialConfigs.acl.delete_departments,
  partialConfigs.acl.list_departments,
  partialConfigs.acl.manage_departments,
  partialConfigs.acl.create_modules,
  partialConfigs.acl.update_modules,
  partialConfigs.acl.delete_modules,
  partialConfigs.acl.list_modules,
  partialConfigs.acl.create_roles,
  partialConfigs.acl.update_roles,
  partialConfigs.acl.delete_roles,
  partialConfigs.acl.list_roles,
  partialConfigs.acl.create_organisations,
  partialConfigs.acl.update_organisations,
  partialConfigs.acl.delete_organisations,
  partialConfigs.acl.list_organisations,
];

/**
 * @description Constant array grouping list of permissions required for tiei modules
 */
export const contributionPermissions = [
  partialConfigs.acl.create_rtiei_contribution_declaration_assignations,
  partialConfigs.acl.delete_rtiei_contribution_declarations,
  partialConfigs.acl.delete_rtiei_contribution_declaration_assignations,
  partialConfigs.acl.list_rtiei_contribution_declarations,
  partialConfigs.acl.list_rtiei_contribution_declaration_assignations,
  partialConfigs.acl.list_rtiei_contribution_declarations,
  partialConfigs.acl.update_rtiei_contribution_declaration_assignations,
  partialConfigs.acl.update_rtiei_contribution_declarations
];

/**
 * @description Constant array grouping list of permissions required for rc modules
 */
export const rcContributionPermissions = [
  partialConfigs.acl.create_rc_contribution_declaration_assignations,
  partialConfigs.acl.delete_rc_contribution_declarations,
  partialConfigs.acl.delete_rc_contribution_declaration_assignations,
  partialConfigs.acl.list_rc_contribution_declarations,
  partialConfigs.acl.list_rc_contribution_declaration_assignations,
  partialConfigs.acl.list_rc_contribution_declarations,
  partialConfigs.acl.update_rc_contribution_declaration_assignations,
  partialConfigs.acl.update_rc_contribution_declarations
];

export const rcMembershipPermissions = [
  partialConfigs.acl.list_rc_memberships,
  partialConfigs.acl.create_rc_memberships,
  partialConfigs.acl.update_rc_memberships,
  partialConfigs.acl.delete_rc_memberships,
  partialConfigs.acl.list_rc_membership_assignations,
  partialConfigs.acl.create_rc_membership_assignations,
  partialConfigs.acl.update_rc_membership_assignations,
  partialConfigs.acl.delete_rc_membership_assignations,
];

// imm_request memberships

export const rtieiMembershipRequestPermissions = [
  partialConfigs.acl.list_rtiei_membership_requests,
  partialConfigs.acl.create_rtiei_membership_requests,
  partialConfigs.acl.update_rtiei_membership_requests,
  partialConfigs.acl.delete_rtiei_membership_requests,
  partialConfigs.acl.list_rtiei_membership_request_assignations,
  partialConfigs.acl.create_rtiei_membership_requests_assignation,
  partialConfigs.acl.update_rtiei_membership_request_assignation,
  partialConfigs.acl.delete_rtiei_membership_request_assignation,
];


// Permissions for handling rtiei liquidations

export const inLiquidationPermissions = [
  partialConfigs.acl.list_rtiei_liquidations,
  partialConfigs.acl.create_rtiei_liquidations,
  partialConfigs.acl.update_rtiei_liquidations,
  partialConfigs.acl.delete_rtiei_liquidations,
  partialConfigs.acl.list_rtiei_liquidation_assignations,
  partialConfigs.acl.create_rtiei_liquidation_assignations,
  partialConfigs.acl.update_rtiei_liquidation_assignations,
  partialConfigs.acl.delete_rtiei_liquidation_assignations,
];


// Permissions for handling rc liquidations
export const rcLiquidationPermissions = [
  partialConfigs.acl.list_rc_liquidations,
  partialConfigs.acl.create_rc_liquidations,
  partialConfigs.acl.update_rc_liquidations,
  partialConfigs.acl.delete_rc_liquidations,
  partialConfigs.acl.list_rc_liquidation_assignations,
  partialConfigs.acl.create_rc_liquidation_assignations,
  partialConfigs.acl.update_rc_liquidation_assignations,
  partialConfigs.acl.delete_rc_liquidation_assignations,
];

// Permissions for handling cpta modules operations
export const cptaPermissions = [
  partialConfigs.acl.cpta_accounts_list,
  partialConfigs.acl.cpta_accounts_create,
  partialConfigs.acl.cpta_accounts_update,
  partialConfigs.acl.cpta_accounts_delete,
  partialConfigs.acl.cpta_account_transactions_list,
  partialConfigs.acl.cpta_balances_list,
  partialConfigs.acl.cpta_balances_create,
  partialConfigs.acl.cpta_balances_update,
  partialConfigs.acl.cpta_balances_delete,
  partialConfigs.acl.cpta_categories_list,
  partialConfigs.acl.cpta_categories_create,
  partialConfigs.acl.cpta_categories_update,
  partialConfigs.acl.cpta_categories_delete,
  partialConfigs.acl.cpta_classes_list,
  partialConfigs.acl.cpta_classes_create,
  partialConfigs.acl.cpta_classes_update,
  partialConfigs.acl.cpta_classes_delete,
  partialConfigs.acl.cpta_entities_list,
  partialConfigs.acl.cpta_entities_create,
  partialConfigs.acl.cpta_entities_update,
  partialConfigs.acl.cpta_entities_delete,
  partialConfigs.acl.cpta_exercises_list,
  partialConfigs.acl.cpta_exercises_create,
  partialConfigs.acl.cpta_exercises_update,
  partialConfigs.acl.cpta_exercises_delete,
  partialConfigs.acl.cpta_exercise_periods_list,
  partialConfigs.acl.cpta_exercise_periods_create,
  partialConfigs.acl.cpta_exercise_periods_update,
  partialConfigs.acl.cpta_exercise_periods_delete,
  partialConfigs.acl.cpta_journals_list,
  partialConfigs.acl.cpta_journals_create,
  partialConfigs.acl.cpta_journals_update,
  partialConfigs.acl.cpta_journals_delete,
  partialConfigs.acl.cpta_managements_list,
  partialConfigs.acl.cpta_managements_create,
  partialConfigs.acl.cpta_managements_update,
  partialConfigs.acl.cpta_managements_delete,
  partialConfigs.acl.cpta_operation_entries_list,
  partialConfigs.acl.cpta_operation_entries_create,
  partialConfigs.acl.cpta_operation_entries_update,
  partialConfigs.acl.cpta_operation_entries_delete,
  partialConfigs.acl.cpta_operation_histories_list,
  partialConfigs.acl.cpta_operation_histories_create,
  partialConfigs.acl.cpta_operation_histories_update,
  partialConfigs.acl.cpta_operation_histories_delete,
  partialConfigs.acl.cpta_operations_list,
  partialConfigs.acl.cpta_operations_create,
  partialConfigs.acl.cpta_operations_update,
  partialConfigs.acl.cpta_operations_delete,
  partialConfigs.acl.cpta_operation_types_list,
  partialConfigs.acl.cpta_operation_types_create,
  partialConfigs.acl.cpta_operation_types_update,
  partialConfigs.acl.cpta_operation_types_delete,
  partialConfigs.acl.cpta_radixes_list,
  partialConfigs.acl.cpta_radixes_create,
  partialConfigs.acl.cpta_radixes_update,
  partialConfigs.acl.cpta_radixes_delete,
  partialConfigs.acl.cpta_series_list,
  partialConfigs.acl.cpta_series_create,
  partialConfigs.acl.cpta_series_update,
  partialConfigs.acl.cpta_series_delete,
  partialConfigs.acl.cpta_accounting_entry_sources_list,
  partialConfigs.acl.cpta_accounting_entry_sources_create,
  partialConfigs.acl.cpta_accounting_entry_sources_update,
  partialConfigs.acl.cpta_accounting_entry_sources_delete,
  partialConfigs.acl.cpta_accounting_entries_list,
  partialConfigs.acl.cpta_accounting_entries_create,
  partialConfigs.acl.cpta_accounting_entries_update,
  partialConfigs.acl.cpta_accounting_entries_delete,
];

// Add new constants here for module path
// Default Dashboard path
export const defaultPath = `/${partialConfigs.routes.commonRoutes.dashboardRoute}`;
// Immatriculation Module Path
export const immatriculationPath = partialConfigs.routes.immatriculationModuleRoutes;
// Liquidation Module Path
export const liquidationsPath = partialConfigs.routes.liquidationsModuleRoutes;
// Contriution Module Path
export const contributionPath = partialConfigs.routes.contributionsModuleRoutes;
// Contriution Module Path
export const comptabilitePath = partialConfigs.routes.comptabiliteModuleRoutes;
// Admin module path
export const adminPath = partialConfigs.routes.adminModuleRoutes;
// Route definitions for backend ressources
export const backendRoutePaths = partialConfigs.backendRoutesPaths;
// Route definitions for clients ressources
export const clientRoutePaths = partialConfigs.clientRoutePaths;

// contribution cotisation account id
export const contributionAccountType = 1;
// individual account id
export const individualAccountType = 2;
// retirement account id
export const retirementAccountType = 3;

// Ressources Datasource Injection Tokens
// Admin Module
export const USERS_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'UsersDatasource';
// Department Data source provider key
export const DEPARTMENT_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'DepartmentDataSource';

// Rtiei Modules
// ImmRequest Data source provider key
export const RTIEI_MEMBERSHIP_REQUEST_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'ImmRequestDataSource';
// inWorkers Data source provider key
export const IN_WORKERS_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'InWorkersDataSource';
// Strutures Data source provider key
export const STRUCTURES_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'StructuresDataSource';
// Rtiei Contribution declaration data source injection token
export const RTIEI_CONTRIBUTION_DECLRATION_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'RtieiContributionDeclarationDataSource';

// Rc Module data source
export const RC_MEMBERSHIP_DATASOURCE_INJECTION_TOKEN = 'RcMembershipDataSource';
// Rc Member data source injection token
export const RC_MEMBERS_DATASOURCE_INJECTION_TOKEN = 'RcMembersDataSource';
// Rc Contribution declaration data source injection token
export const RC_CONTRIBUTION_DECLRATION_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'RcContributionDeclarationDataSource';


// Type of possible liquidations
export const liquidationTypes = partialConfigs.liquidationTypes;
// Component form ids constants
export { rcModulesForms, inModulesForms } from './modules-forms';

// Complementary retireement entity definition for structures
export const RC_STRUCTURES = 'rc_structures';
// Complementary retireement entity definition for members
export const RC_MEMBERS = 'rc_members';

// Fixed value of the currency used in the application
export const APPLICATION_CURRENCY = 'XOF';

// Immatriculation configuration values
// Member types constantes
export const independantWorker = 2;
export const worshipMinister = 3;
export const informalWorkers = 1;
