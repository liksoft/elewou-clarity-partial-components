export const accountingRouteDefinitions = {
  // Register Saisie Ecritures
  tieiSaisieEcrituresRoute: 'home/tiei-saisie-ecritures',
  tieiAjoutEcrituresRoute: 'home/add-ecriture',
  tieiSaisieEcrituresReleveRoute: 'home/releve-ecriture',
  // Register Saisie Ecritures details
  tieiSaisieEcrituresDetailsRoute: 'home/tiei-saisie-ecritures/details',
  //update ecriture
  tieiSaisieEcrituresUpdateRoute: 'home/tiei-saisie-ecritures/update',
  // Balance
  tieiBalanceRoute: 'home/tiei-balance/liste',
  // grand livre
  tieiGrandlivreRoute: 'home/tiei-grand-livre/liste',
  // Manage Deversements
  tieiDeversementsRoute: 'home/tiei-deversements',
  // Gestion Etats Comptables
  tieiEtatsComptablesRoute: 'home/tiei-etats-comptables',
  // Gestion Etats Financiers
  tieiEtatsFinanciersRoute: 'home/tiei-etats-financiers',
  tieiEtatsFinanciersBilanRoute: 'home/tiei-bilan',
  tieiEtatsFinanciersResultatRoute: 'home/tiei-resultat',
  // Ordonnance Paramétrages
  tieiParametrageComptesRoute: 'home/tiei-parametrage-comptes',
};

export enum accountingRouteParams {
  id = '/:id',
}
