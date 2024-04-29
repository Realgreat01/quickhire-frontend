import { push } from 'notivue';
import { QH_ROUTES } from '~/constants/routes';
import { getActivePinia } from 'pinia';
import type { Pinia, Store } from 'pinia';
interface ExtendedPinia extends Pinia {
  _s: Map<string, Store>;
}

// map through that list and use the **$reset** fn to reset the state

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
  setTimeout(async () => await navigateTo({ name: QH_ROUTES.HOME }), 200);
};

export const qhHelpers = {
  sliceWords(words: string, slice: number = 24) {
    if (words.length > slice) return words.slice(0, slice) + ' ...';
    else return words.slice(0, slice);
  },
  logout() {
    const $ResetPinia = (): Record<string | 'all', () => void> => {
      const pinia = getActivePinia() as ExtendedPinia;
      const resetStores: Record<string, () => void> = {};
      pinia._s.forEach((store, name) => {
        resetStores[name] = () => store.$reset();
      });
      resetStores.all = () => pinia._s.forEach((store) => store.$reset());
      return resetStores;
    };

    setTimeout(async () => {
      await navigateTo({ name: QH_ROUTES.HOME });
      $ResetPinia();
      localStorage.clear();
    }, 200);
  },
};
export const qhDropdown = reactive({
  show: false,
  close() {
    this.show = false;
    console.log('clikced close');
  },
  toggle() {
    this.show = !this.show;
  },
});
