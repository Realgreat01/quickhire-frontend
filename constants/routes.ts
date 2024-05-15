export class QH_ROUTES {
  static HOME = 'home';

  static COMPANY = {
    INDEX: 'company',
    REGISTER: 'company-register',
    LOGIN: 'company-login',

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
    APPLIED_JOBS: 'user-jobs',
    PREVIEW: 'user-preview',
    SETTINGS: 'user-settings',
    ADDRESS: 'user-address',
    SOCIAL_LINKS: 'user-socials',
  };

  static JOB = {
    ALL: 'jobs',
    SINGLE: 'jobs-id',
    CREATE_JOB: 'create-job',
  };
}
