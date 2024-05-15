<template>
  <qh-container @close="$emit('close')" title="Address">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-10 grid w-full gap-4 p-2"
        @submit.prevent="handleSubmit($event, submitAddress)"
      >
        <qh-input
          name="country"
          type="select"
          :options="countries"
          v-model="country"
          label="Countries"
          required
          :loading="loadingCountries"
          labelName="name"
        />
        <qh-input
          name="state"
          label="States"
          type="select"
          :options="states"
          v-model="state"
          required
          :loading="loadingStates"
          labelName="name"
        />

        <qh-input
          name="city"
          label="City"
          type="select"
          :reduce="(option: any) => option.name"
          :options="cities"
          v-model="address.city"
          required
          :loading="loadingCities"
          labelName="name"
        />

        <qh-input name="area" label="Area" v-model="address.area" />
        <qh-input name="street" label="Street" v-model="address.street" />

        <qh-button
          type="submit"
          class="mt-4 w-full"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>
  </qh-container>
</template>

<script setup lang="ts">
import { useUtilsStore } from '~/store/utils-store';
import { Form as VeeForm } from 'vee-validate';
import { useCompanyStore } from '~/store/company-store';
import type { AddressInterface } from '~/types/utils';
import { UPDATE_COMPANY_DETAILS } from '~/services/company.service';

const { getCurrentCompany } = useCompanyStore();
const { company } = storeToRefs(useCompanyStore());

const { getAllCountries, getCountriesStates, getCitiesByStatesAndCountries } =
  useUtilsStore();

const {
  countries,
  states,
  cities,

  loadingCountries,
  loadingStates,
  loadingCities,
} = storeToRefs(useUtilsStore());

const country = ref({ name: 'Nigeria', iso2: 'NG' });
const state = ref({ name: '', iso2: 'FC' });
const city = ref({ name: '' });

const address = ref<AddressInterface | any>({
  country: company.value?.address.country,
  state: company.value?.address.state,
  city: company.value?.address.city,
  alpha_code: company.value?.address.alpha_code || country.value.iso2,
  area: company.value?.address.area,
  street: company.value?.address.street,
});

const submitAddress = async (field: any) => {
  const response = await UPDATE_COMPANY_DETAILS({ address: address.value });
  if (response.success) {
    qhToast.success('Address submitted successfully');
    qhCloseModal();
    getCurrentCompany();
  } else qhToast.error(response.message);
};

watch(country, async (newCountry) => {
  address.value.country = newCountry.name;
  await getCountriesStates(newCountry.iso2);
});

watch(state, async (newState) => {
  address.value.state = newState.name;
  await getCitiesByStatesAndCountries(country.value.iso2, newState.iso2);
});

onBeforeMount(async () => {
  const res = await getAllCountries();
  country.value = countries.value.find(
    (country: any) => country.name === 'Nigeria',
  );
});
</script>

<style scoped></style>
