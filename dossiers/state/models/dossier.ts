import { GenericSerializaleSerializer, UndecoratedSerializer } from 'src/app/lib/domain/built-value/core/js/serializer';
import { isDefined } from 'src/app/lib/domain/utils/types/type-utils';
import { DossierRequiredFilesType } from '../types';
import { DossierType } from './dossier-type';
import { isEmpty } from 'lodash';

export class File {
  id: number = undefined;
  name: string = undefined;
  url: string = undefined;
  size: number = undefined;
  createdAt: string = undefined;
  updatedAt: string = undefined;
  label: string = undefined;
  description: string = undefined;

  static builder = () => new GenericSerializaleSerializer(File, new UndecoratedSerializer());

  static getJsonableProperties = () => ({
    id: 'id',
    name: 'name',
    url: 'url',
    size: 'size',
    created_at: 'createdAt',
    updated_at: 'updatedAt',
    label: 'label',
    description: 'description'
  })
}
export class DossierFile {
  id: number;
  fileId: number = undefined;
  fileBox: number = undefined;
  dossierId: string = undefined;
  fileURL: string = undefined;
  boxLabel: string = undefined;
  file: File = undefined;

  static builder = () => new GenericSerializaleSerializer(DossierFile, new UndecoratedSerializer());

  static getJsonableProperties = () => ({
    id: 'id',
    file_id: 'fileId',
    file_box: 'fileBox',
    dossier_id: 'dossierId',
    file_url: 'fileURL',
    box_label: 'boxLabel',
    file: 'file'
  })
}

const commonProperties: {
  [prop: string]: { name: keyof DossierInterface, type: any } | keyof DossierInterface
} = {
  id: 'id',
  label: 'label',
  dossier_type_id: 'dossierTypeId',
  created_by: 'createdBy',
  handled_by: 'handledBy',
  status: 'status',
  created_at: 'createdAt',
  updated_at: 'updatedAt',
  registrant: 'registrant',
  agence_id: 'agenceId',
  agence: 'agence',
  type: 'type',
  regime: 'regime',
  regime_id: 'regimeId',
  dossier_files: { name: 'dossierFiles', type: DossierFile },
};

export interface DossierInterface {
  id: string | number;
  label: string;
  dossierTypeId: string;
  createdBy: string;
  handledBy: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  registrant?: string;
  agenceId?: number;
  agence?: string;
  type: string;
  regime: string;
  regimeId: number;
  dossierFiles: DossierFile[];
  registrantPhoneNumber: string;
  registrantEmail: string;
  isCompleted: boolean;
}

export class DossierFileConfigInterface {
  requiredFiles: DossierRequiredFilesType[];
}

export class Dossier implements DossierInterface {
  id: string = undefined;
  dossierFiles: DossierFile[] = [];
  label: string = undefined;
  dossierTypeId: string = undefined;
  createdBy: string = undefined;
  handledBy: string = undefined;
  status: number = undefined;
  createdAt: string = undefined;
  updatedAt: string = undefined;
  registrant: string = undefined;
  agenceId: number = undefined;
  agence: string = undefined;
  type: string = undefined;
  regime: string = undefined;
  regimeId: number = undefined;
  registrantPhoneNumber: string = undefined;
  registrantEmail: string = undefined;

  dossierType: DossierType;
  dossierVoucher: DossierVoucher;
  details: { [prop: string]: any };

  get isCompleted(): boolean {
    return isDefined(this.details) && !isEmpty(this.details);
  }

  static builder = () => new GenericSerializaleSerializer(Dossier, new UndecoratedSerializer());

  static getJsonableProperties: () => { [prop: string]: { name: keyof Dossier, type: any } | keyof Dossier } = () => ({
    ...commonProperties,
    // Relationship definitions
    dossier_type: { name: 'dossierType', type: DossierType },
    dossier_voucher: { name: 'dossierVoucher', type: DossierVoucher },
    details: 'details'
  })
}

export class DossierVoucher {

  label: string;
  dossierId: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  static getJsonableProperties: () => { [prop: string]: { name: keyof DossierVoucher, type: any } | keyof DossierVoucher } = () => ({
    label: 'label',
    dossier_id: 'dossierId',
    status: 'status',
    created_at: 'createdAt',
    updated_at: 'updatedAt',
  })
}

export class LiquidationDossier implements DossierInterface, DossierFileConfigInterface {

  id: string | number = undefined;
  dossierFiles: DossierFile[] = [];
  label: string = undefined;
  dossierTypeId: string = undefined;
  createdBy: string = undefined;
  handledBy: string = undefined;
  status: number = undefined;
  createdAt: string = undefined;
  updatedAt: string = undefined;
  registrant?: string = undefined;
  agenceId: number = undefined;
  agence: string = undefined;
  type: string = undefined;
  regime: string = undefined;
  regimeId: number = undefined;

  // Dossier details
  applicationSheetId: number = undefined;
  dossierId: number = undefined;
  insuranceId: number = undefined;
  registrantFirstname: string = undefined;
  registrantLastname: string = undefined;
  registrantAddress: string = undefined;
  registrantPhoneNumber: string = undefined;
  registrantPostalBox: string = undefined;
  hasRegistrantIdentificationFile: boolean = undefined;
  registrantFileId: number = undefined;
  hasMemberDeathCertificateFile: boolean = undefined;
  memberDeathCertificateFileId: number = undefined;
  hasMedicalCertificateFile: boolean = undefined;
  medicalCertificateFileId: number = undefined;
  liquidationTypeId: number = undefined;
  registrantEmail: string = undefined;
  requiredFiles: DossierRequiredFilesType[] = undefined;
  isCompleted: boolean = undefined;
  registrantPictureSourceFileId: number = undefined;
  memberDeathCertificateSourceFileId: number = undefined;
  medicalCertificateSourceFileId: number = undefined;

  static builder = () => new GenericSerializaleSerializer(LiquidationDossier, new UndecoratedSerializer());

  static getJsonableProperties: () => {
    [prop: string]: { name: keyof LiquidationDossier, type: any } |
    keyof LiquidationDossier
  } = () => ({
    ...commonProperties,
    application_sheet_id: 'applicationSheetId',
    dossier_id: 'dossierId',
    insurance_id: 'insuranceId',
    registrant_firstname: 'registrantFirstname',
    registrant_lastname: 'registrantLastname',
    registrant_address: 'registrantAddress',
    registrant_phonenumber: 'registrantPhoneNumber',
    registrant_postal_box: 'registrantPostalBox',
    has_registrant_identification_file: 'hasRegistrantIdentificationFile',
    registrant_file_id: 'registrantFileId',
    has_member_death_certificate_file: 'hasMemberDeathCertificateFile',
    member_death_certificate_file_id: 'memberDeathCertificateFileId',
    has_medical_certificate_file: 'hasMedicalCertificateFile',
    medical_certificate_file_id: 'medicalCertificateFileId',
    liquidation_type_id: 'liquidationTypeId',
    registrant_email: 'registrantEmail',
    requiredFiles: 'requiredFiles',
    registrant_picture_source_file_id: 'registrantPictureSourceFileId',
    member_death_certificate_source_file_id: 'memberDeathCertificateSourceFileId',
    medical_certificate_source_file_id: 'medicalCertificateSourceFileId'
  })
}

export class MemberContributionDeclarationDossier implements DossierInterface, DossierFileConfigInterface {
  id: string | number = undefined;
  dossierFiles: DossierFile[] = [];
  label: string = undefined;
  dossierTypeId: string = undefined;
  createdBy: string = undefined;
  handledBy: string = undefined;
  status: number = undefined;
  createdAt: string = undefined;
  updatedAt: string = undefined;
  agenceId: number = undefined;
  agence: string = undefined;
  registrant?: string = undefined;
  type: string = undefined;
  regime: string = undefined;
  regimeId: number = undefined;

  // Details properties
  applicationSheetId: number = undefined;
  dossierId: string = undefined;
  insuranceId: number = undefined;
  month: number = undefined;
  year: number = undefined;
  amount: number = undefined;
  hasPaymentFile: boolean = undefined;
  paymentFileId: number = undefined;
  requiredFiles: DossierRequiredFilesType[] = undefined;
  registrantPhoneNumber: string = undefined;
  registrantEmail: string = undefined;
  isCompleted: boolean = undefined;
  paymentSourceFileID: number = undefined;

  static builder = () => new GenericSerializaleSerializer(MemberContributionDeclarationDossier, new UndecoratedSerializer());

  static getJsonableProperties: () => {
    [prop: string]: { name: keyof MemberContributionDeclarationDossier, type: any } |
    keyof MemberContributionDeclarationDossier
  } = () => ({
    ...commonProperties,
    application_sheet_id: 'applicationSheetId',
    dossier_id: 'dossierId',
    insurance_id: 'insuranceId',
    month: 'month',
    year: 'year',
    amount: 'amount',
    has_payment_file: 'hasPaymentFile',
    payment_file_id: 'paymentFileId',
    requiredFiles: 'requiredFiles',
    registrant_phonenumber: 'registrantPhoneNumber',
    registrant_email: 'registrantEmail',
    payment_source_file_id: 'paymentSourceFileID'
  })
}

export class MembershipDossier implements DossierInterface, DossierFileConfigInterface {
  id: string | number = undefined;
  dossierFiles: DossierFile[] = [];
  label: string = undefined;
  dossierTypeId: string = undefined;
  createdBy: string = undefined;
  handledBy: string = undefined;
  status: number = undefined;
  createdAt: string = undefined;
  updatedAt: string = undefined;
  agenceId: number = undefined;
  agence: string = undefined;
  registrant?: string = undefined;
  type: string = undefined;
  regime: string = undefined;
  regimeId: number = undefined;
  identityFileNumber?: string = undefined;
  identityFileIssueDate?: string = undefined;
  identityFileIssueBy?: number | string = undefined;
  identityFileIssueAt?: number | string = undefined;
  passportPictureSourceFileId?: number = undefined;
  identitySourceFileId?: number = undefined;

  applicationSheetId: number = undefined;
  dossierId: string = undefined;
  insuranceId: number = undefined;
  registrantFirstname: string = undefined;
  registrantLastname: string = undefined;
  registrantAddress: string = undefined;
  registrantPhoneNumber: string = undefined;
  registranNationality?: number = undefined;
  registrantMartialStatus?: number = undefined;
  // idenityFileType: string | number = undefined;
  hasIdentityFile: boolean = undefined;
  identityFileId: number = undefined;
  hasPassportPicture: boolean = undefined;
  registrantPassportFileId: number = undefined;
  groupId?: number = undefined;
  contributionPlate: number = undefined;
  membershipTypeId: number = undefined;
  requiredFiles: DossierRequiredFilesType[] = undefined;
  registrantEmail: string = undefined;
  identityFileType: string = undefined;
  isCompleted: boolean = undefined;

  static builder = () => new GenericSerializaleSerializer(MembershipDossier, new UndecoratedSerializer());

  static getJsonableProperties: () => {
    [prop: string]: { name: keyof MembershipDossier, type: any } |
    keyof MembershipDossier
  } = () => ({
    ...commonProperties,
    application_sheet_id: 'applicationSheetId',
    dossier_id: 'dossierId',
    insurance_id: 'insuranceId',
    registrant_firstname: 'registrantFirstname',
    registrant_lastname: 'registrantLastname',
    registrant_address: 'registrantAddress',
    registrant_phonenumber: 'registrantPhoneNumber',
    registrant_nationality: 'registranNationality',
    registrant_martial_status: 'registrantMartialStatus',
    identity_file_type: 'identityFileType',
    has_identity_file: 'hasIdentityFile',
    identity_file_id: 'identityFileId',
    has_passport_picture: 'hasPassportPicture',
    registrant_passport_file_id: 'registrantPassportFileId',
    contribution_plate: 'contributionPlate',
    membership_type_id: 'membershipTypeId',
    group_id: 'groupId',
    requiredFiles: 'requiredFiles',
    registrant_email: 'registrantEmail',
    identity_file_number: 'identityFileNumber',
    identity_file_issue_date: 'identityFileIssueDate',
    identity_file_issue_by: 'identityFileIssueBy',
    identity_file_issue_at: 'identityFileIssueAt',
    passport_picture_source_file_id: 'passportPictureSourceFileId',
    identity_source_file_id: 'identitySourceFileId',
  })
}



export class GroupedMembershipDossier implements DossierInterface, DossierFileConfigInterface {
  id: string | number = undefined;
  dossierFiles: DossierFile[] = [];
  label: string = undefined;
  dossierTypeId: string = undefined;
  createdBy: string = undefined;
  handledBy: string = undefined;
  status: number = undefined;
  createdAt: string = undefined;
  updatedAt: string = undefined;
  agenceId: number = undefined;
  agence: string = undefined;
  registrant?: string = undefined;
  type: string = undefined;
  regime: string = undefined;
  regimeId: number = undefined;

  // Details properties
  applicationSheetId: number = undefined;
  dossierId: string = undefined;
  structureId: number = undefined;
  totalMembers: number = undefined;
  memberListSheetId: string | number = undefined;
  requiredFiles: DossierRequiredFilesType[] = [];
  registrantPhoneNumber: string = undefined;
  registrantEmail: string = undefined;
  isCompleted: boolean = undefined;

  static builder = () => new GenericSerializaleSerializer(GroupedMembershipDossier, new UndecoratedSerializer());

  static getJsonableProperties: () => {
    [prop: string]: { name: keyof GroupedMembershipDossier, type: any } |
    keyof GroupedMembershipDossier
  } = () => ({
    ...commonProperties,
    application_sheet_id: 'applicationSheetId',
    dossier_id: 'dossierId',
    structure_id: 'structureId',
    total_members: 'totalMembers',
    member_list_sheet_id: 'memberListSheetId',
    requiredFiles: 'requiredFiles',
    registrant_phonenumber: 'registrantPhoneNumber',
    registrant_email: 'registrantEmail',
  })
}



export class GroupedContributionDeclarationDossier implements DossierInterface, DossierFileConfigInterface {
  id: string | number = undefined;
  dossierFiles: DossierFile[] = [];
  label: string = undefined;
  dossierTypeId: string = undefined;
  createdBy: string = undefined;
  handledBy: string = undefined;
  status: number = undefined;
  createdAt: string = undefined;
  updatedAt: string = undefined;
  agenceId: number = undefined;
  agence: string = undefined;
  registrant?: string = undefined;
  type: string = undefined;
  regime: string = undefined;
  regimeId: number = undefined;

  // Details properties
  applicationSheetId: number = undefined;
  dossierId: string = undefined;
  structureId: number = undefined;
  month: number = undefined;
  year: number = undefined;
  amount: number = undefined;
  hasPaymentFile: boolean = undefined;
  paymentFileId: number = undefined;
  requiredFiles: DossierRequiredFilesType[] = [];
  registrantPhoneNumber: string = undefined;
  registrantEmail: string = undefined;
  dncFileID: string | number = undefined;
  isCompleted: boolean = undefined;
  paymentSourceFileID: number = undefined;
  dncSourceFileID: number = undefined;

  static builder = () => new GenericSerializaleSerializer(GroupedContributionDeclarationDossier, new UndecoratedSerializer());

  static getJsonableProperties: () => {
    [prop: string]: { name: keyof GroupedContributionDeclarationDossier, type: any } |
    keyof GroupedContributionDeclarationDossier
  } = () => ({
    ...commonProperties,
    application_sheet_id: 'applicationSheetId',
    dossier_id: 'dossierId',
    structure_id: 'structureId',
    month: 'month',
    year: 'year',
    amount: 'amount',
    has_payment_file: 'hasPaymentFile',
    payment_file_id: 'paymentFileId',
    requiredFiles: 'requiredFiles',
    registrant_phonenumber: 'registrantPhoneNumber',
    registrant_email: 'registrantEmail',
    dnc_file_id: 'dncFileID',
    payment_source_file_id: 'paymentSourceFileID',
    dnc_source_file_id: 'dncSourceFileID'
  })
}
