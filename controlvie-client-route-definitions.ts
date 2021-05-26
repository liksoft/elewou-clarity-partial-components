export const routeDefinitions = {
  // user
  userDashboard : 'home',
  checkUserAuthRoute : 'checkauth',
  verfyDataRoute : 'checkauth/verify',
  // Enrolement
  enrollDashboardRoute: 'enroll/dashboard',
  enrollDemographicRoute: 'enroll/demographic',
  enrollUserIdCardRoute: 'enroll/useridcard',
  enrollUserFacialRoute: 'enroll/userFacial',
  enrollUserVoiceRoute: 'enroll/uservoice',
  enrollUserFingerPrintsRoute: 'enroll/userfingerprint',
  enrollUserReceiptRoute: 'enroll/receipt',

  // Controle de Vie
  controlStartRoute: 'control/start', 
  controlPhoneCheckRoute: 'control/phonecheck', 
  controlDashboardRoute: 'control/dashboard',
  controlUserFacialRoute: 'control/userFacial',
  controlUserVoiceRoute: 'control/uservoice',
  controlUserFingerPrintsRoute: 'control/userfingerprint', 
  controlUserReceiptRoute: 'control/receipt',

  // Receipts 
  controlReceiptRoute: 'receipt/control',
  enrollReceiptRoute: 'receipt/enroll',
  
  // Réglages de controles
  userProfileRoute: 'settings/userprofile', 
  userChangePassRoute: 'settings/changepassword', 
};
