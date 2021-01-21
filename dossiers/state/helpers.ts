import {
  Dossier,
  DossierInterface,
  GroupedContributionDeclarationDossier,
  GroupedMembershipDossier,
  LiquidationDossier,
  MemberContributionDeclarationDossier,
  MembershipDossier
} from './models/dossier';
import { DossierTypes } from './types';

/**
 * Create an instance of Dossier interface using the properties of a generic dossier using the type attribute
 * @param dossier [[Dossier]] Instance of Generic Dossier Type
 */
export const dossierResponseTypeToApplicationTypeDossier: (dossier: Dossier) => DossierInterface = (dossier: Dossier) => {
  const {
    id,
    dossierFiles,
    label,
    dossierTypeId,
    createdBy,
    handledBy,
    status,
    createdAt,
    regime,
    regimeId,
    type,
    agence,
    agenceId,
    updatedAt, isCompleted } = dossier;
  const values = {
    id,
    dossierFiles,
    label,
    dossierTypeId,
    createdBy,
    handledBy,
    status,
    createdAt,
    updatedAt,
    regime,
    regimeId,
    type,
    agence,
    agenceId,
    isCompleted
  };
  const dossierTypes = DossierTypes;

  switch (dossier.dossierTypeId) {
    case dossierTypes.rcLiquidation:
      return LiquidationDossier.builder().build(LiquidationDossier, {
        ...dossier.details,
        ...values
      });
    case dossierTypes.rtieiLiquidation:
      return LiquidationDossier.builder().build(LiquidationDossier, {
        ...dossier.details,
        ...values
      });
    case dossierTypes.rtieiMemberContributionDeclaration:
      return MemberContributionDeclarationDossier.builder().build(MemberContributionDeclarationDossier, {
        ...dossier.details,
        ...values
      });
    case dossierTypes.rcMemberContributionDeclaration:
      return MemberContributionDeclarationDossier.builder().build(MemberContributionDeclarationDossier, {
        ...dossier.details,
        ...values
      });
    case dossierTypes.rtieiMembership:
      return MembershipDossier.builder().build(MembershipDossier, {
        ...dossier.details,
        ...values
      });
    case dossierTypes.rcMembership:
      return MembershipDossier.builder().build(MembershipDossier, {
        ...dossier.details,
        ...values
      });
    case dossierTypes.rtieiGroupedMembership:
      return GroupedMembershipDossier.builder().build(GroupedMembershipDossier, {
        ...dossier.details,
        ...values
      });
    case dossierTypes.rtieiGroupedContributionDeclaration:
      return GroupedContributionDeclarationDossier.builder().build(GroupedContributionDeclarationDossier, {
        ...dossier.details,
        ...values
      });
    case dossierTypes.rcGroupedContributionDeclaration:
      return GroupedContributionDeclarationDossier.builder().build(GroupedContributionDeclarationDossier, {
        ...dossier.details,
        ...values
      });
    default:
      return dossier;
  }
};
