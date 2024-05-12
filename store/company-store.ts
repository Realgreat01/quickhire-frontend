import { GET_CURRENT_COMPANY } from '~/services/company.service';

import type { Company } from '~/types/company';
interface CompanyType {
  Company: Company | null;
}

export const useCompanyStore = defineStore('company', {
  state: (): CompanyType => {
    return {
      Company: null,
    };
  },
  getters: {
    company(): Company | null {
      return this.Company;
    },
  },
  actions: {
    async getCurrentCompany() {
      const res = await GET_CURRENT_COMPANY();
      if (res.success) {
        this.Company = res.data;
      }
    },
  },
  persist: true,
});
