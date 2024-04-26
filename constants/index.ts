export default class QH_CONSTANTS {
  static AUTH_TOKEN = 'auth-token';
  static LOGIN = '/auth/login';
  static APP_NAME = 'Quick Hire';
  public static USERNAME = '';
  static SET_USER_TYPE(type: 'user' | 'company') {
    localStorage.setItem('user-type', type);
  }
  public static USERTYPE = localStorage.getItem('user-type');

  static PROJECTS = 'projects';
  static DETAILS = 'profile';
  static EDUCATION = 'education';
  static EXPERIENCE = 'experience';
  static STACKS = 'stacks';
  static CONTACT = 'contact';
  static JOBS = 'jobs';

  //
  //
}
