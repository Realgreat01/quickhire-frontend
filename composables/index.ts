import { push } from 'notivue';
import { QH_ROUTES } from '~/constants/routes';

export const qhToast = {
  success: (notification: Notification | string) => push.success(notification),
  error: (notification: Notification | string) => push.error(notification),
  warn: (notification: Notification | string) => push.warning(notification),
  info: (notification: Notification | string) => push.info(notification),
  default: (notification: Notification | string) => push.success(notification),
};

export const qhCloseModal = async () => {
  setTimeout(async () => await navigateTo({}), 1500);
};

export const qhReturnToHomepage = async () => {
  setTimeout(async () => await navigateTo(QH_ROUTES.HOME), 200);
};

export const qhHelpers = {
  sliceWords(words: string, slice: number = 24) {
    if (words.length > slice) return words.slice(0, slice) + ' ...';
    else return words.slice(0, slice);
  },
};
export const qhDropdown = reactive({
  show: false,
  close() {
    this.show = false;
  },
  toggle() {
    this.show = !this.show;
  },
});
