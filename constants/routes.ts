export class QH_ROUTES {
  static HOME = 'home';

  static COMPANY = {
    REGISTER: 'company-register',
    LOGIN: 'company-login',
    DASHBOARD: 'company',
    JOBS: 'company-jobs',
  };

  static USER = {
    LOGIN: 'auth-login',
    REGISTER: 'create-account',

    // MODALS AND ROUTES
    INDEX: 'user',
    PROFILE: 'user-profile',
    EDUCATION: 'user-education',
    PROJECTS: 'user-projects',
    DETAILS: 'user-profile',
    EXPERIENCE: 'user-experience',
    STACKS: 'user-stacks',
    CONTACT: 'user-contact',
    APPLIED_JOBS: 'user-jobs',
  };

  static JOB = {
    ALL: 'jobs',
    SINGLE: 'jobs-id',
    CREATE_JOB: 'create-job',
  };
}
