import axios from 'axios';
import { push } from 'notivue';
import { QH_ROUTES } from '~/constants/routes';
import { getActivePinia } from 'pinia';
import type { Pinia, Store } from 'pinia';
import ApiService from '~/services/api-service.service';
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
  setTimeout(async () => await navigateTo({}), 500);
};

export const qhReturnToHomepage = async () => {
  setTimeout(async () => await navigateTo({ name: QH_ROUTES.HOME }), 200);
};

export const qhHelpers = {
  sliceWords(words: string, slice: number = 24) {
    if (words.length > slice) return words.slice(0, slice) + ' ...';
    else return words.slice(0, slice);
  },

  capitalizeWords(word: string) {
    return word.replace(/(^|\s)\S/g, (match) => match.toUpperCase());
  },

  generateUniqueHexCode() {
    const characters = '0123456789ABCDEF';
    let hexCode = '#';

    for (let i = 0; i < 6; i++) {
      hexCode += characters[Math.floor(Math.random() * 16)];
    }
    return hexCode;
  },

  removeDuplicates(arr?: any[]) {
    const seen = new Map();

    if (arr)
      return arr.filter((item) => {
        const { _id, ...rest } = item; // Destructure to separate _id from the rest of the properties
        const key = JSON.stringify(rest); // Create a unique key based on the properties other than _id

        if (!seen.has(key)) {
          seen.set(key, true);
          return true;
        }
        return false;
      });
  },

  formatWebsiteName(url: string) {
    return url.replace(/^(https?:\/\/)/, '');
  },

  async getImageBase64(url: string) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return `data:${response.headers['content-type'].toLowerCase()};base64,${Buffer.from(response.data).toString('base64')}`;
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
      document.cookie = '';
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
