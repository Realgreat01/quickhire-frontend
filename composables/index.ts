import { push } from 'notivue';
import { QH_ROUTES } from '~/constants/routes';
import { getActivePinia } from 'pinia';
import type { Pinia, Store } from 'pinia';
interface ExtendedPinia extends Pinia {
  _s: Map<string, Store>;
}

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
      qhSecuredLS.clear();
      localStorage.clear();
    }, 200);
  },

  filterEmptyValues(obj: any) {
    const filtered: any = {};
    Object.keys(obj).forEach((key: any) => {
      if (
        obj[key] !== null &&
        obj[key] !== undefined &&
        obj[key] !== '' &&
        obj[key].length !== 0
      ) {
        filtered[key] = obj[key];
      }
    });
    return filtered;
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
