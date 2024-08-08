import {
  CONVERT_IMAGE_TO_BASE64,
  GET_ALL_COUNTRIES,
  GET_CITIES_BY_STATE_AND_COUNTRY,
  GET_OPERATIONAL_INSIGHTS,
  GET_STATES_BY_COUNTRY,
} from '~/services/utils.service';

import type { RouteLocationRaw } from 'vue-router';

interface Insights {
  users: number;
  companies: number;
  jobs: number;
  active_applications: number;
}
interface UtilsType {
  Countries: any[];
  loadingCountries: boolean;

  States: any[];
  loadingStates: boolean;

  Cities: any[];
  loadingCities: boolean;
  Insights: Insights | null;
  redirectedFromRoute: RouteLocationRaw | null;
}

export const useUtilsStore = defineStore('utils', {
  state: (): UtilsType => {
    return {
      Countries: [],
      loadingCountries: false,

      States: [],
      loadingStates: false,

      Cities: [],
      loadingCities: false,

      Insights: { users: 0, companies: 0, jobs: 0, active_applications: 0 },
      redirectedFromRoute: null,
    };
  },

  getters: {
    countries(): any[] {
      return this.Countries;
    },
    states(): any[] {
      return this.States;
    },
    cities(): any[] {
      return this.Cities;
    },
    insights(): UtilsType['Insights'] {
      return this.Insights;
    },
  },

  actions: {
    async getAllCountries() {
      this.loadingCountries = true;
      const res = await GET_ALL_COUNTRIES();
      if (res.data) this.Countries = res.data;
      this.loadingCountries = false;
    },
    async getCountriesStates(id: string) {
      this.loadingStates = true;
      const res = await GET_STATES_BY_COUNTRY(id);
      if (res.data) this.States = res.data;
      this.loadingStates = false;
    },
    async getCitiesByStatesAndCountries(countryId: string, stateId: string) {
      this.loadingCities = true;
      const res = await GET_CITIES_BY_STATE_AND_COUNTRY(countryId, stateId);
      if (res.data) this.Cities = res.data;
      this.loadingCities = false;
    },

    async getBase64Image(url: string) {
      const res = await CONVERT_IMAGE_TO_BASE64({ image_url: url });
      if (res.success) return res.data;
      else return null;
    },

    async getOperationalInsights() {
      const res = await GET_OPERATIONAL_INSIGHTS();
      if (res.success) this.Insights = res.data;
    },
  },
  persist: {
    paths: ['insights'],
    storage: persistedState.localStorage,
  },
});
