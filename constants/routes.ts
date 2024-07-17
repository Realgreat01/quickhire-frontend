export class QH_ROUTES {
  static HOME = 'home';

  static COMPANY = {
    INDEX: 'company',
    REGISTER: 'company-register',
    LOGIN: 'company-login',
    FORGOT_PASSWORD: 'company-forgot-password',

    INFO: 'company-info',
    ADDRESS: 'company-address',
    SOCIAL_LINKS: 'company-socials',

    DASHBOARD: 'company-dashboard',
    ALL_JOBS: 'company-jobs',
    JOB: 'company-job',
    APPLICANTS: 'company-applicants',
    APPLICANT: 'company-applicant',
    TALENTS: 'company-talents',
    MESSAGES: 'company-messages',
    NOTIFICATIONS: 'company-notifications',
    CONTACT: 'company-contact',
    PUBLIC: 'company-public',
  };

  static USER = {
    LOGIN: 'auth-login',
    REGISTER: 'create-account',
    FORGOT_PASSWORD: 'forgot-password',
    VERIFY_OTP: 'verify-otp',
    RESET_PASSWORD: 'reset-password',
    CHANGE_PASSWORD: 'change-password',
    UPDATE_PASSWORD: 'update-password',

    // MODALS AND ROUTES
    INDEX: 'user',
    PROFILE: 'user-profile',
    EDUCATION: 'education',
    PROJECTS: 'user-projects',
    DETAILS: 'user-profile',
    EXPERIENCE: 'user-experience',
    WORK_DETAILS: 'user-work-details',
    SKILLS: 'user-skills',
    ABOUT: 'user-about',
    CONTACT: 'user-contact',
    APPLIED_JOBS: 'jobs',
    PREVIEW: 'user-preview',
    SETTINGS: 'user-settings',
    ADDRESS: 'user-address',
    SOCIAL_LINKS: 'user-socials',
  };

  static JOB = {
    ALL: 'all-jobs',
    SINGLE: 'jobs-id',
    CREATE_JOB: 'create-jobs',
  };
}
