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
