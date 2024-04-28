export class QH_ROUTES {
  static LOGIN = '/auth/login';
  static REGISTER = '/auth/create-account';
  static HOME = '/';

  static COMPANY = {
    REGISTER: '/',
    LOGIN: '/',
    DASHBOARD: '/company',
    CREATE_JOB: 'create-job',
    OPENINGS: '/company/jobs',
  };
  static USER = {
    PROFILE: '/user/profile',
    EDUCATION: '/user/education',
  };

  static JOB = {
    ALL: '/jobs',
    SINGLE: 'jobs-id',
  };
}
