import type { Job } from '~/types';
interface CompanyType {}

export const useUserStore = defineStore('company', {
  state: (): CompanyType => {
    return {};
  },
  getters: {},
  actions: {},
  persist: true,
});
