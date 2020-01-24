/**
 * This file defines configuration values that are shared accross modules
 */
export const partialConfigs = {
  routes: {
    commonRoutes: {
      // Dashboard module route paths
      dashboardRoute: 'dashboard',
      // Home component route path
      dashboardHomeRoute: 'dashboard/home',
      // Home component relative route path
      homeRoute: 'home',
    },
    adminModuleRoutes: {
      // Management routes
      managementsRoute: 'managements',
      // Account routes
      accountRoute: 'account',
      // Roles management routes
      rolesManagementRoute: 'roles',
      // Role creation routes
      createRole: 'roles/create',
      // Role update route
      updatedRoleRoute: 'roles/update',
      // User creation routes
      createUsersRoute: 'users/create',
      // Users update route
      updatedUserRoute: 'users/update',
      // User creation routes
      listUsersRoute: 'users/list',
      // Forms management routes
      formsManagementRoute: 'forms',
      // Forms creation routes
      createFormsRoute: 'forms/create',
      // Module management routes
      modulesManagementRoute: 'modules',
      // Module management routes
      createModulesRoute: 'modules/create',
      // Module management routes
      updateModulesRoute: 'modules/update',
    },
    immatriculationModuleRoutes: {
      // Enregistrement routes
      enregistrementRoute: 'home/enregistrement',
      // Dossier enregistrement routes
      listRecordsRoute: 'home/liste-enregistrements',
      // Dossier Structures routes
      structuresRoute: 'home/structures',
      // Dossier Travailleurs routes
      workersRoute: 'home/workers',
      // Ajouter Structures routes
      addStructureRoute: 'home/structures/add-structure',
      // Mon compte routes
      userInfoRoute: 'profile',
      // Adhésion RC route
      membershipRcRoute: 'home/membership_rc',
      // Adhésion Employeurs Route
      membershipRcEmployersRoute: 'home/employers',
      // Liste Demandes d'Adhésion Route
      membershipRcListRoute: 'home/membership_list',
      // Liste Adhérents
      membershipRcMembersRoute: 'home/members_rc',
    },
    contributionsModuleRoutes: {
      // Register contributions route path
      tieiEnregistrementRoute: 'home/tiei-register-contributions',
      // Manage Contributions route path
      tieiGestionCotisationsRoute: 'home/tiei-manage-contributions',
      // Individual accounts manage path
      tieiIndividualAccountsRoute: 'home/tiei-comptes-individuels',
      // Contributors account manage path
      tieiContributorsAccountsRoute: 'home/tiei-comptes-cotisants',
      // New contribution indidividual path
      tieiIndividualContributionRoute: 'home/tiei-individual-contribution',
      // New contribution indidividual path
      tieiStructureContrbutionRoute: 'home/tiei-structure-contribution',
      // Manage Paymwents Path
      tieiManagePaymentsRoute: 'home/tiei-manage-payments',
      // New contribution indidividual path
      tieiManageDncRoute: 'home/tiei-manage-dnc',
      // List individual contributions path
      tieiListIndividualContributionsRoute: 'home/tiei-list-individual-contributions',
      // List Structures contributions path
      tieiListStructuresContributionsRoute: 'home/tiei-list-structure-contributions',
    },
    liquidationsModuleRoutes: {
      // Register liquidations route path
      tieiEnregistrementRoute: 'home/tiei-register-liquidations',
      // Manage liquidations route path
      tieiGestionLiquidationsRoute: 'home/tiei-manage-liquidations',
      // Gestion Decomptes Path
      tieiGestionDecomptes: 'home/tiei-decomptes-liquidations',
      // Gestion Reversions Path
      tieiGestionReversions: 'home/tiei-reversions-liquidations',
      // Ordonnance des droits
      tieiOrdonnancementDroits: 'home/tiei-ordonnancer-droits',
      // Paiement des droits
      tieiPaiementDroits: 'home/tiei-paiement-droits',
    }
  },
  assignableCollections: {
    imm_requests: 1,
    rtiei_contribution_declarations: 2,
    rtiei_contribution_payments: 3
  },
  acl: {
    all: 'all',
    create_departments: 'create-departments',
    create_imm_request_assignation: 'create-imm-request-assignation',
    create_imm_requests: 'create-imm-requests',
    create_members: 'create-members',
    create_organisations: 'create-organisations',
    create_permissions: 'create-permissions',
    create_roles: 'create-roles',
    create_rtiei_contribution_declaration_assignations: 'create-rtiei-contribution-declaration-assignations',
    create_rtiei_contribution_payment_assignations: 'create-rtiei-contribution-payment-assignations',
    create_rtiei_contribution_declarations: 'create-rtiei-contribution-declarations',
    create_rtiei_contribution_payments: 'create-rtiei-contribution-payments',
    create_rtiei_membership_request_assignations: 'create-rtiei-membership-request-assignations',
    create_rtiei_membership_requests: 'create-rtiei-membership-requests',
    delete_departments: 'delete-departments',
    delete_imm_request_assignation: 'delete-imm-request-assignation',
    delete_imm_requests: 'delete-imm-requests',
    delete_members: 'delete-members',
    delete_organisations: 'delete-organisations',
    delete_permissions: 'delete-permissions',
    delete_roles: 'delete-roles',
    delete_rtiei_contribution_declaration_assignations: 'delete-rtiei-contribution-declaration-assignations',
    delete_rtiei_contribution_declarations: 'delete-rtiei-contribution-declarations',
    delete_rtiei_contribution_payment_assignations: 'delete-rtiei-contribution-payment-assignations',
    delete_rtiei_contribution_payments: 'delete-rtiei-contribution-payments',
    delete_rtiei_membership_request_assignations: 'delete-rtiei-membership-request-assignations',
    delete_rtiei_membership_requests: 'delete-rtiei-membership-requests',
    list_departments: 'list-departments',
    list_imm_request_assignations: 'list-imm-request-assignations',
    list_imm_requests: 'list-imm-requests',
    list_members: 'list-members',
    list_organisations: 'list-organisations',
    list_permissions: 'list-permissions',
    list_roles: 'list-roles',
    list_rtiei_accounts: 'list-rtiei-accounts',
    list_rtiei_contribution_declaration_assignations: 'list-rtiei-contribution-declaration-assignations',
    list_rtiei_contribution_declarations: 'list-rtiei-contribution-declarations',
    list_rtiei_contribution_payment_assignations: 'list-rtiei-contribution-payment-assignations',
    list_rtiei_contribution_payments: 'list-rtiei-contribution-payments',
    list_rtiei_membership_request_assignations: 'list-rtiei-membership-request-assignations',
    list_rtiei_membership_requests: 'list-rtiei-membership-requests',
    manage_departments: 'manage-departments',
    manage_organisations: 'manage-organisations',
    manage_permissions: 'manage-permissions',
    manage_roles: 'manage-roles',
    update_departments: 'update-departments',
    update_imm_request_assignation: 'update-imm-request-assignation',
    update_imm_requests: 'update-imm-requests',
    update_members: 'update-members',
    update_organisations: 'update-organisations',
    update_password: 'update-password',
    update_permissions: 'update-permissions',
    update_roles: 'update-roles',
    update_rtiei_contribution_declaration_assignations: 'update-rtiei-contribution-declaration-assignations',
    update_rtiei_contribution_declarations: 'update-rtiei-contribution-declarations',
    update_rtiei_contribution_payment_assignations: 'update-rtiei-contribution-payment-assignations',
    update_rtiei_contribution_payments: 'update-rtiei-contribution-payments',
    update_rtiei_membership_request_assignations: 'update-rtiei-membership-request-assignations',
    update_rtiei_membership_requests: 'update-rtiei-membership-requests',
    list_structures: 'list-structures',
    create_structures: 'create-structures',
    update_structures: 'update-structures',
    delete_structures: 'delete-structures',
    list_modules: 'list-modules',
    create_modules: 'create-modules',
    update_modules: 'update-modules',
    delete_modules: 'delete-modules'
  },
  latestTaskNumberOfMinutes: 2280,
  immRequestExcelHeaders: {
    firstname: 'Prenoms',
    lastname: 'Nom',
    birthdate: 'Date de naissance',
    in_member_type_id: 'Code type assure',
    in_civility_id: 'Code civilite',
    birthplace: 'Lieu de naissance',
    marital_status: 'Situation matrimoniale',
    nationality: 'Nationalite',
    sex: 'Code sexe',
    genre: 'Code genre',
    email: 'Email',
    phone_number: 'Numero de telephone',
    type: 'Code type immatriculation',
    annual_contribution: 'Contribution anuelle',
    job: 'Profession',
    activity_sector: 'Code secteur activite',
    structure_rate: 'Taux structure',
    member_rate: 'Taux adherant'
    // // To be modified, in order to point to the real form id
  },
  declarationsExcelHeaders: {
    insurance_id: 'Numero assurance',
    amount: 'Montant Cotisation'
  },
  backendRoutesPaths: {
    members: 'ressources/members',
    contributionNotificationEndpoint: 'ressources/rtiei_contribution_declaration_notification/'
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
// Add new constants here for module path
// Default Dashboard path
export const defaultPath = `/${partialConfigs.routes.commonRoutes.dashboardRoute}`;
// Immaatriculation Module Path
export const immatriculationPath = partialConfigs.routes.immatriculationModuleRoutes;

export const liquidationsPath = partialConfigs.routes.liquidationsModuleRoutes;
// Contriution Module Path
export const contributionPath = partialConfigs.routes.contributionsModuleRoutes;
// Rtiei contribution cotisation account id
export const rtieiCotisationAccountType = 1;
// Rtiei individual account id
export const rtieiIndividualAccountType = 2;
// Route definitions for backend ressources
export const backendRoutePaths = partialConfigs.backendRoutesPaths;
