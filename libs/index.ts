import QH_CONSTANTS from '~/constants';

export const getToken = () => localStorage.getItem(QH_CONSTANTS.AUTH_TOKEN);
