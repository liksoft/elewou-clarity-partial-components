/**
 * @description This object defines the list of forms that will be loaded by <RC> Modules
 * components based on their unique identifier in the system
 */
export const rcModulesForms = {
  rcOptionContributionFormID: 41,
  rcMembershipFormID: 42,
  rcContributionDeclaration: 43,
  rcContributionDeclarationDetails: 44,
  rcContributionDeclarationPayment: 45,
  rcIndividualStatementForm: 47,
  rcContributionStatementForm: 48,
  liquidationForm: 50,
  liquidationAdvantagesDetailsFormID: 52,
  membershipListFormID: 55,
};

/**
 * @description Definitions of unique identifier of forms that will be loaded by <IN> Module components
 */
export const inModulesForms = {
  recipientsFormID: 30,
  roles: 13,
  permissions: 2,
  identification_employeur: 2,
  users: 14,
  departments: 18,
  modules: 15,
  immStructureFormID: 19, // To be modified, in order to point to the real form id
  memberIdentificationFormID: 16,
  memberTypeFormID: 20,
  immPiecesFormID: 21,
  structureFormID: 17,
  immatriculations: 22,
  massImmRequest: 24,
  declaration: 31,
  paymentInformations: 32,
  individualAccountReceiptForm: 33,
  contributionAccountReceiptForm: 34,
  liquidationForm: 37,
  liquidationFinancialOrganisationFormID: 40,
  slipGeneratorFormID: 38,
  liquidationAdvantagesDetailsFormID: 51
};

export const modulesCommonForms = {
  contribution_declaration_validation: 54,
  membershipValidationFormID: 56
};

export const adminModuleForms = {
  globalConfigurationForm: 57,
  regimeConfigurationForm: 58,
  branchesConfigurationForm: 59
};
