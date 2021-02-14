import { GenericSerializaleSerializer, UndecoratedSerializer } from 'src/app/lib/domain/built-value/core/js/serializer';
import { isDefined } from 'src/app/lib/domain/utils/types/type-utils';
import { DossierAddedFilesType, DossierRequiredFilesType } from '../types';
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

export interface DossierWithDetailsType extends DossierInterface {
  details: { [prop: string]: any, addedFiles: DossierAddedFilesType[] };
}

export interface DossierWithFilesConfigInterface extends DossierInterface {
  requiredFiles: DossierRequiredFilesType[];
  addedFiles: DossierAddedFilesType[];
}

export class Dossier implements DossierWithDetailsType {
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
  details: { [prop: string]: any, addedFiles: DossierAddedFilesType[] };

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

export class LiquidationDossier implements DossierWithFilesConfigInterface {

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
  insuranceId: string = undefined;
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
  addedFiles: DossierAddedFilesType[] = [];
  registrantPassportPictureId: number = undefined;
  hasRegistrantPassportPicture: boolean = undefined;
  otherPhonenumber: number = undefined;
  totalApplicationSheetDocuments: number = undefined;
  totalIdentificationDocuments: number = undefined;
  totalDeathCertificateDocuments: number = undefined;
  totalMedicalCertificateDocuments: number = undefined;

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
    addedFiles: 'addedFiles',
    registrant_passport_picture_id: 'registrantPassportPictureId',
    has_registrant_passport_picture: 'hasRegistrantPassportPicture',
    other_phonenumber: 'otherPhonenumber',
    total_application_sheet_documents: 'totalApplicationSheetDocuments',
    total_identification_documents: 'totalIdentificationDocuments',
    total_death_certificate_documents: 'totalDeathCertificateDocuments',
    total_medical_certificate_documents: 'totalMedicalCertificateDocuments',
  })
}

export class MemberContributionDeclarationDossier implements DossierWithFilesConfigInterface {
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
  insuranceId: string = undefined;
  month: number = undefined;
  year: number = undefined;
  amount: number = undefined;
  hasPaymentFile: boolean = undefined;
  paymentFileId: number = undefined;
  requiredFiles: DossierRequiredFilesType[] = undefined;
  registrantPhoneNumber: string = undefined;
  registrantEmail: string = undefined;
  isCompleted: boolean = undefined;
  addedFiles: DossierAddedFilesType[] = [];
  otherPhonenumber: string = undefined;
  totalPaymentDocuments: number = undefined;
  totalApplicationSheetDocuments: number = undefined;

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
    addedFiles: 'addedFiles',
    other_phonenumber: 'otherPhonenumber',
    total_application_sheet_documents: 'totalApplicationSheetDocuments',
    total_payment_documents: 'totalPaymentDocuments'
  })
}

export class MembershipDossier implements DossierWithFilesConfigInterface {
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

  applicationSheetId: number = undefined;
  dossierId: string = undefined;
  insuranceId: string = undefined;
  registrantFirstname: string = undefined;
  registrantLastname: string = undefined;
  registrantAddress: string = undefined;
  registrantPhoneNumber: string = undefined;
  registranNationality?: number = undefined;
  registrantMartialStatus?: number = undefined;
  idenityFileType: string | number = undefined;
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
  addedFiles: DossierAddedFilesType[] = [];
  otherPhonenumber: string = undefined;
  totalApplicationSheetDocuments: number = undefined;
  totalIdentityFileDocuments: number = undefined;
  totalPassportPictureDocuments: number = undefined;
  birthdate: string = undefined;
  birthplace: number = undefined;
  sex: number = undefined;

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
    addedFiles: 'addedFiles',
    other_phonenumber: 'otherPhonenumber',
    total_application_sheet_documents: 'totalApplicationSheetDocuments',
    total_identity_file_documents: 'totalIdentityFileDocuments',
    total_passport_picture_documents: 'totalPassportPictureDocuments',
    birthdate: 'birthdate',
    birthplace: 'birthplace',
    sex: 'sex',
  })
}



export class GroupedMembershipDossier implements DossierWithFilesConfigInterface {
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
  structureId: string = undefined;
  totalMembers: number = undefined;
  memberListSheetId: string | number = undefined;
  requiredFiles: DossierRequiredFilesType[] = [];
  registrantPhoneNumber: string = undefined;
  registrantEmail: string = undefined;
  isCompleted: boolean = undefined;
  addedFiles: DossierAddedFilesType[] = [];
  otherPhonenumber: string = undefined;
  totalApplicationSheetDocuments: number = undefined;
  membersListExcelSheetId: number = undefined;
  totalMembersListDocuments: number = undefined;
  totalMemberDocuments: number = undefined;

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
    addedFiles: 'addedFiles',
    other_phonenumber: 'otherPhonenumber',
    total_application_sheet_documents: 'totalApplicationSheetDocuments',
    members_list_excel_sheet_id: 'membersListExcelSheetId',
    total_members_list_documents: 'totalMembersListDocuments',
    total_member_documents: 'totalMemberDocuments',
  })
}



export class GroupedContributionDeclarationDossier implements DossierWithFilesConfigInterface {
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
  structureId: string = undefined;
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
  addedFiles: DossierAddedFilesType[] = [];
  dncSourceFileID: number = undefined;
  otherPhonenumber: string = undefined;
  totalPaymentDocuments: number = undefined;
  totalApplicationSheetDocuments: number = undefined;
  dncExcelFileId: number = undefined;
  totalDncFileDocuments: number = undefined;

  static builder = () => new GenericSerializaleSerializer(GroupedContributionDeclarationDossier, new UndecoratedSerializer());

  static getJsonableProperties: () => {
    [prop: string]: { name: keyof GroupedContributionDeclarationDossier, type: any } |
    keyof GroupedContributionDeclarationDossier
  } = () => ({
    ...commonProperties,
    application_sheet_id: 'applicationSheetId',
    dossier_id: 'dossierId',
    month: 'month',
    year: 'year',
    amount: 'amount',
    has_payment_file: 'hasPaymentFile',
    payment_file_id: 'paymentFileId',
    requiredFiles: 'requiredFiles',
    registrant_phonenumber: 'registrantPhoneNumber',
    registrant_email: 'registrantEmail',
    dnc_file_id: 'dncFileID',
    structure_id: 'structureId',
    addedFiles: 'addedFiles',
    dnc_source_file_id: 'dncSourceFileID',
    other_phonenumber: 'otherPhonenumber',
    total_application_sheet_documents: 'totalApplicationSheetDocuments',
    total_payment_documents: 'totalPaymentDocuments',
    dnc_excel_file_id: 'dncExcelFileId',
    total_dnc_file_documents: 'totalDncFileDocuments',
  })
}
