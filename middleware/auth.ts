import QH_CONSTANTS from '~/constants';

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    let token = localStorage.getItem(QH_CONSTANTS.AUTH_TOKEN);
    if (token) {
      return true;
    } else {
      return true;
      // return navigateTo(QH_CONSTANTS.LOGIN);
    }
  }
});
