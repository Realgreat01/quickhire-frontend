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
import { useUserStore } from '~/store/user-store';
import type { User } from '~/types/user';
import { EDIT_USER_DETAILS } from '~/services/user.service';
import type { AddressInterface } from '~/types/utils';

const { getCurrentUser } = useUserStore();
const { user } = storeToRefs(useUserStore());

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

const address = ref<User | any>({
  country: user.value?.address.country,
  state: user.value?.address.state,
  city: user.value?.address.city,
  alpha_code: user.value?.address.alpha_code || country.value.iso2,
  area: user.value?.address.area,
  street: user.value?.address.street,
});
const submitAddress = async (field: any) => {
  const response = await EDIT_USER_DETAILS({ address: address.value });
  if (response.success) {
    qhToast.success('Address submitted successfully');
    qhCloseModal();
    getCurrentUser();
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
  await getAllCountries();
});
</script>

<style scoped></style>
