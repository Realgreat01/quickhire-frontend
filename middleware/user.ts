import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    let userType = QH_CONSTANTS.USERTYPE;
    if (userType === 'user') {
      return true;
    } else {
      return navigateTo(QH_ROUTES.LOGIN);
    }
  }
});
