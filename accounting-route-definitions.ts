export const accountingRouteDefinitions = {
  // Register Saisie Ecritures
  tieiSaisieEcrituresRoute: 'home/tiei-saisie-ecritures',
  tieiAjoutEcrituresRoute: 'home/add-ecriture',
  tieiSaisieEcrituresReleveRoute: 'home/releve-ecriture',
  // Register Saisie Ecritures details
  tieiSaisieEcrituresDetailsRoute: 'home/tiei-saisie-ecritures/details',
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
  actBalanceSheetRoute: 'home/act-parametrage-bilan',
  actResultAccountRoute: 'home/act-parametrage-resultat',
  actAccountNatureRoute: 'home/act-parametrage-nature',

  // exerices
  exerciseRoute: 'home/exercise',
  exercisePeriodRoute: 'home/exercise-period',

  // type operation / type journal
  actTypeJournalRoute: 'home/act-type-journal',
  actTypeJournalOperation: 'home/act-type-operation',

  // informations de compte (company, director, setting)
  actSettingsRoute: 'home/act-setting',
  actCompanyRoute: 'home/act-company',
  actDirectorRoute: 'home/act-director',

  // Onboarding root
  tieiOnBoardRoute: 'home/act-onBoard',
};

export enum accountingRouteParams {
  id = '/:id',
}
