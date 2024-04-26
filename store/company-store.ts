import { GET_CURRENT_COMPANY } from '~/services/company.service';

import type { Company, Job } from '~/types/company';
interface CompanyType {
  company: Company | null;
}

export const useCompanyStore = defineStore('company', {
  state: (): CompanyType => {
    return {
      company: null,
    };
  },
  getters: {
    currentCompany(): Company | null {
      return this.company;
    },
  },
  actions: {
    async getCurrentCompany() {
      const res = await GET_CURRENT_COMPANY();
      if (res.success) {
        this.company = res.data;
      }
    },
  },
  persist: true,
});
