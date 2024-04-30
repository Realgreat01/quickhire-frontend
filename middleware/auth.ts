import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { qhSecuredLS } from '~/utils/secure-ls';

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    let token = qhSecuredLS.get(QH_CONSTANTS.AUTH_TOKEN);
    if (token) {
      return true;
    } else {
      return navigateTo({ name: QH_ROUTES.USER.LOGIN });
    }
  }
});
