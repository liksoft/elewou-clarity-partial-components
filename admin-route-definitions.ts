export const routeDefinitions = {
  // --- APP USER ROUTE -----
  // Données entrantes
  incomingListRoute: 'incoming/list',
  incomingEditRoute: 'incoming/edit',

  // Gestion des données de controle
  controlListRoute: 'control/list', // liste des controles
  controlStatsRoute: 'control/stats', // Statistiques des controle

  // Gestion des droits et Beneficiaires
  rightsListRoute: 'rights/list',
  recipientsRoute: 'rights/recipients',
  recipientsInactiveRoute: 'rights/inactive',
  recipientsActiveRoute: 'rights/active',

  // Réglages de controles
  settingsRoute: 'settings',
  movingDataRoute: 'settings/migrate-data', //Import & Export
  rightsTypeRoute: 'settings/rights', // Type of rights
  devicesRoute: 'settings/devices', //Liste des peripheriques de controle
  editionsRoute: 'settings/editions', // Editions de controle de vie
  sessionsRoute: 'settings/sessions', // Liste des sessions de controle par edition
  dataTypesRoute: 'settings/data-type', // Type de donnees biometriques

  // ----- ADMIN ROUTES -----

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
  // Department management route
  departmentManagementRoute: 'departments',
  // Module management routes
  createDepartmentRoute: 'department',
  // Configurations
  globalConfigurationsRoute: 'configurations-globales'
};
