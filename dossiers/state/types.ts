import { PaginationDataState } from 'src/app/lib/domain/rxjs/types';

export type DossierRequiredFilesType = {
  label: string;
  required: boolean;
  attribute: string,
  id: number,
  mime_types: string,
  max_file_size: number
};

export enum DossierTypes {
  rtieiLiquidation =  'TYP1101',
  rcLiquidation =  'TYP1110',
  rtieiMembership =  'TYP100',
  rtieiGroupedMembership =  'TYP1111',
  rcMembership =  'TYP1001',
  rtieiMemberContributionDeclaration =  'TYP1010',
  rcMemberContributionDeclaration =  'TYP1100',
  rtieiGroupedContributionDeclaration =  'TYP10001',
  rcGroupedContributionDeclaration =  'TYP10010'
}


export type DossierAddedFilesType = {
  label: string;
  index: number;
}


export type CollectionValueState<T> = {
  performingAction: boolean;
  current: T,
  error: any;
  collections: Partial<PaginationDataState<T>>;
}
