export class QH_ROUTES {
  static HOME = 'home';

  static COMPANY = {
    REGISTER: 'company-register',
    LOGIN: 'company-login',
    INDEX: 'company',
    DASHBOARD: 'company-dashboard',
    JOBS: 'company-jobs',
    TALENTS: 'company-talents',
    APPLICANTS: 'company-applicants',
    MESSAGES: 'company-messages',
    NOTIFICATIONS: 'company-notifications',
    CONTACT: 'company-contact',
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
