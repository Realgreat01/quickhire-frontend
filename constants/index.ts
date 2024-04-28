export default class QH_CONSTANTS {
  static AUTH_TOKEN = 'auth-token';
  static LOGIN = '/auth/login';
  static APP_NAME = 'Quick Hire';
  public static USERNAME = '';
  static SET_USER_TYPE(type: 'user' | 'company') {
    localStorage.setItem('user-type', type);
  }
  public static GET_USER_TYPE = () => localStorage.getItem('user-type');

  static PROJECTS = 'user-projects';
  static DETAILS = 'user-profile';
  static EDUCATION = 'user-education';
  static EXPERIENCE = 'user-experience';
  static STACKS = 'user-stacks';
  static CONTACT = 'user-contact';
  static JOBS = 'user-jobs';

  //
  //
}
