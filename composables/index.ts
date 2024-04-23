import { push } from 'notivue';

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
