import { qhSecuredLS } from '~/utils/secure-ls';

export default class QH_CONSTANTS {
  static AUTH_TOKEN = 'auth-token';
  static APP_NAME = 'Quick Hire';
  public static USERNAME = '';
  static SET_USER_TYPE(type: 'user' | 'company') {
    qhSecuredLS.set('user-type', type);
  }
  public static GET_USER_TYPE = () => qhSecuredLS.get('user-type');
}
