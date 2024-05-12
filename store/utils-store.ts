import {
  GET_ALL_COUNTRIES,
  GET_CITIES_BY_STATE_AND_COUNTRY,
  GET_STATES_BY_COUNTRY,
} from '~/services/utils.service';

interface UtilsType {
  Countries: any[];
  loadingCountries: boolean;

  States: any[];
  loadingStates: boolean;

  Cities: any[];
  loadingCities: boolean;
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
  },
  persist: false,
});
