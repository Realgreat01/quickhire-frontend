import QH_CONSTANTS from '~/constants';

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    let userType = QH_CONSTANTS.GET_USER_TYPE();
    if (userType === 'company') {
      return true;
    } else {
      return abortNavigation();
    }
  }
});
