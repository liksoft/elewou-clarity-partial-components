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
  recipientsActiveRoute: 'rights/reciepients',
  recipientsInactiveRoute: 'rights/recipients/inactive',

  // Réglages de controles
  settingsRoute: 'settings',
  migrateDataRoute: 'settings/migrate-data', //Import & Export
  fingersRoute: 'settings/fingers', //Import & Export
  rightsTypeRoute: 'settings/rights', // Type of rights
  devicesRoute: 'settings/devices', //Liste des peripheriques de controle
  editionsRoute: 'settings/editions', // Editions de controle de vie
  sessionsRoute: 'settings/sessions', // Liste des sessions de controle par edition
  dataTypesRoute: 'settings/data-type', // Type de donnees biometriques
};
