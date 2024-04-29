export default class QH_CONSTANTS {
  static AUTH_TOKEN = 'auth-token';
  static APP_NAME = 'Quick Hire';
  public static USERNAME = '';
  static SET_USER_TYPE(type: 'user' | 'company') {
    localStorage.setItem('user-type', type);
  }
  public static GET_USER_TYPE = () => localStorage.getItem('user-type');
}
