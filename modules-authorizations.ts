import { appAccessControlList } from './access-control-list';

export const adminPermissions = [
  appAccessControlList.create_departments,
  appAccessControlList.update_departments,
  appAccessControlList.delete_departments,
  appAccessControlList.list_departments,
  appAccessControlList.manage_departments,
  appAccessControlList.create_modules,
  appAccessControlList.update_modules,
  appAccessControlList.delete_modules,
  appAccessControlList.list_modules,
  appAccessControlList.create_roles,
  appAccessControlList.update_roles,
  appAccessControlList.delete_roles,
  appAccessControlList.list_roles,
  appAccessControlList.create_organisations,
  appAccessControlList.update_organisations,
  appAccessControlList.delete_organisations,
  appAccessControlList.list_organisations,
];

/**
 * @description Constant array grouping list of permissions required for tiei modules
 */
export const contributionPermissions = [
  appAccessControlList.create_rtiei_contribution_declaration_assignations,
  appAccessControlList.delete_rtiei_contribution_declarations,
  appAccessControlList.delete_rtiei_contribution_declaration_assignations,
  appAccessControlList.list_rtiei_contribution_declarations,
  appAccessControlList.list_rtiei_contribution_declaration_assignations,
  appAccessControlList.list_rtiei_contribution_declarations,
  appAccessControlList.update_rtiei_contribution_declaration_assignations,
  appAccessControlList.update_rtiei_contribution_declarations
];

/**
 * @description Constant array grouping list of permissions required for rc modules
 */
export const rcContributionPermissions = [
  appAccessControlList.create_rc_contribution_declaration_assignations,
  appAccessControlList.delete_rc_contribution_declarations,
  appAccessControlList.delete_rc_contribution_declaration_assignations,
  appAccessControlList.list_rc_contribution_declarations,
  appAccessControlList.list_rc_contribution_declaration_assignations,
  appAccessControlList.list_rc_contribution_declarations,
  appAccessControlList.update_rc_contribution_declaration_assignations,
  appAccessControlList.update_rc_contribution_declarations
];

export const rcMembershipPermissions = [
  appAccessControlList.list_rc_memberships,
  appAccessControlList.create_rc_memberships,
  appAccessControlList.update_rc_memberships,
  appAccessControlList.delete_rc_memberships,
  appAccessControlList.list_rc_membership_assignations,
  appAccessControlList.create_rc_membership_assignations,
  appAccessControlList.update_rc_membership_assignations,
  appAccessControlList.delete_rc_membership_assignations,
];

// imm_request memberships

export const rtieiMembershipRequestPermissions = [
  appAccessControlList.list_rtiei_membership_requests,
  appAccessControlList.create_rtiei_membership_requests,
  appAccessControlList.update_rtiei_membership_requests,
  appAccessControlList.delete_rtiei_membership_requests,
  appAccessControlList.list_rtiei_membership_request_assignations,
  appAccessControlList.create_rtiei_membership_requests_assignation,
  appAccessControlList.update_rtiei_membership_request_assignation,
  appAccessControlList.delete_rtiei_membership_request_assignation,
];


// Permissions for handling rtiei liquidations

export const rtieiLiquidationPermissions = [
  appAccessControlList.list_rtiei_liquidations,
  appAccessControlList.create_rtiei_liquidations,
  appAccessControlList.update_rtiei_liquidations,
  appAccessControlList.delete_rtiei_liquidations,
  appAccessControlList.list_rtiei_liquidation_assignations,
  appAccessControlList.create_rtiei_liquidation_assignations,
  appAccessControlList.update_rtiei_liquidation_assignations,
  appAccessControlList.delete_rtiei_liquidation_assignations,
];


// Permissions for handling rc liquidations
export const rcLiquidationPermissions = [
  appAccessControlList.list_rc_liquidations,
  appAccessControlList.create_rc_liquidations,
  appAccessControlList.update_rc_liquidations,
  appAccessControlList.delete_rc_liquidations,
  appAccessControlList.list_rc_liquidation_assignations,
  appAccessControlList.create_rc_liquidation_assignations,
  appAccessControlList.update_rc_liquidation_assignations,
  appAccessControlList.delete_rc_liquidation_assignations,
];

// Permissions for handling cpta modules operations
export const cptaPermissions = [
  appAccessControlList.cpta_accounts_list,
  appAccessControlList.cpta_accounts_create,
  appAccessControlList.cpta_accounts_update,
  appAccessControlList.cpta_accounts_delete,
  appAccessControlList.cpta_account_transactions_list,
  appAccessControlList.cpta_balances_list,
  appAccessControlList.cpta_balances_create,
  appAccessControlList.cpta_balances_update,
  appAccessControlList.cpta_balances_delete,
  appAccessControlList.cpta_categories_list,
  appAccessControlList.cpta_categories_create,
  appAccessControlList.cpta_categories_update,
  appAccessControlList.cpta_categories_delete,
  appAccessControlList.cpta_classes_list,
  appAccessControlList.cpta_classes_create,
  appAccessControlList.cpta_classes_update,
  appAccessControlList.cpta_classes_delete,
  appAccessControlList.cpta_entities_list,
  appAccessControlList.cpta_entities_create,
  appAccessControlList.cpta_entities_update,
  appAccessControlList.cpta_entities_delete,
  appAccessControlList.cpta_exercises_list,
  appAccessControlList.cpta_exercises_create,
  appAccessControlList.cpta_exercises_update,
  appAccessControlList.cpta_exercises_delete,
  appAccessControlList.cpta_exercise_periods_list,
  appAccessControlList.cpta_exercise_periods_create,
  appAccessControlList.cpta_exercise_periods_update,
  appAccessControlList.cpta_exercise_periods_delete,
  appAccessControlList.cpta_journals_list,
  appAccessControlList.cpta_journals_create,
  appAccessControlList.cpta_journals_update,
  appAccessControlList.cpta_journals_delete,
  appAccessControlList.cpta_managements_list,
  appAccessControlList.cpta_managements_create,
  appAccessControlList.cpta_managements_update,
  appAccessControlList.cpta_managements_delete,
  appAccessControlList.cpta_operation_entries_list,
  appAccessControlList.cpta_operation_entries_create,
  appAccessControlList.cpta_operation_entries_update,
  appAccessControlList.cpta_operation_entries_delete,
  appAccessControlList.cpta_operation_histories_list,
  appAccessControlList.cpta_operation_histories_create,
  appAccessControlList.cpta_operation_histories_update,
  appAccessControlList.cpta_operation_histories_delete,
  appAccessControlList.cpta_operations_list,
  appAccessControlList.cpta_operations_create,
  appAccessControlList.cpta_operations_update,
  appAccessControlList.cpta_operations_delete,
  appAccessControlList.cpta_operation_types_list,
  appAccessControlList.cpta_operation_types_create,
  appAccessControlList.cpta_operation_types_update,
  appAccessControlList.cpta_operation_types_delete,
  appAccessControlList.cpta_radixes_list,
  appAccessControlList.cpta_radixes_create,
  appAccessControlList.cpta_radixes_update,
  appAccessControlList.cpta_radixes_delete,
  appAccessControlList.cpta_series_list,
  appAccessControlList.cpta_series_create,
  appAccessControlList.cpta_series_update,
  appAccessControlList.cpta_series_delete,
  appAccessControlList.cpta_accounting_entry_sources_list,
  appAccessControlList.cpta_accounting_entry_sources_create,
  appAccessControlList.cpta_accounting_entry_sources_update,
  appAccessControlList.cpta_accounting_entry_sources_delete,
  appAccessControlList.cpta_accounting_entries_list,
  appAccessControlList.cpta_accounting_entries_create,
  appAccessControlList.cpta_accounting_entries_update,
  appAccessControlList.cpta_accounting_entries_delete,
  appAccessControlList.cpta_balance_sheets_list,
  appAccessControlList.cpta_balance_sheets_create,
  appAccessControlList.cpta_balance_sheets_update,
  appAccessControlList.cpta_balance_sheets_delete,
  appAccessControlList.cpta_company_configs_list,
  appAccessControlList.cpta_company_configs_create,
  appAccessControlList.cpta_company_configs_update,
  appAccessControlList.cpta_company_configs_delete,
  appAccessControlList.cpta_result_accounts_list,
  appAccessControlList.cpta_result_accounts_create,
  appAccessControlList.cpta_result_accounts_update,
  appAccessControlList.cpta_result_accounts_delete,
  appAccessControlList.cpta_result_account_roots_list,
  appAccessControlList.cpta_result_account_roots_create,
  appAccessControlList.cpta_result_account_roots_update,
  appAccessControlList.cpta_result_account_roots_delete,
  appAccessControlList.cpta_generate_accounting_balance,
  appAccessControlList.cpta_generate_general_ledger,
  appAccessControlList.cpta_settings_list,
  appAccessControlList.cpta_settings_create,
  appAccessControlList.cpta_settings_update,
  appAccessControlList.cpta_settings_delete,
];

export const dossierRegistrationAuthorizations = [
  appAccessControlList.rtiei_membership_dossiers_list,
  appAccessControlList.rtiei_membership_dossiers_create,
  appAccessControlList.rtiei_membership_dossiers_update,
  appAccessControlList.rtiei_membership_dossiers_delete,
  appAccessControlList.rc_membership_dossiers_list,
  appAccessControlList.rc_membership_dossiers_create,
  appAccessControlList.rc_membership_dossiers_update,
  appAccessControlList.rc_membership_dossiers_delete,
  appAccessControlList.rtiei_liquidation_dossiers_list,
  appAccessControlList.rtiei_liquidation_dossiers_create,
  appAccessControlList.rtiei_liquidation_dossiers_update,
  appAccessControlList.rtiei_liquidation_dossiers_delete,
  appAccessControlList.rc_liquidation_dossiers_list,
  appAccessControlList.rc_liquidation_dossiers_create,
  appAccessControlList.rc_liquidation_dossiers_update,
  appAccessControlList.rc_liquidation_dossiers_delete,
  appAccessControlList.rtiei_contribution_declaration_dossiers_list,
  appAccessControlList.rtiei_contribution_declaration_dossiers_create,
  appAccessControlList.rtiei_contribution_declaration_dossiers_update,
  appAccessControlList.rtiei_contribution_declaration_dossiers_delete,
  appAccessControlList.rc_contribution_declaration_dossiers_list,
  appAccessControlList.rc_contribution_declaration_dossiers_create,
  appAccessControlList.rc_contribution_declaration_dossiers_update,
  appAccessControlList.rc_contribution_declaration_dossiers_delete,
];


export const registeredDossierFilesAuthorizations = [
  appAccessControlList.dossier_files_list,
  appAccessControlList.dossier_files_create,
  appAccessControlList.dossier_files_update,
  appAccessControlList.dossier_files_delete,
];
