<template>
  <qh-container @close="$emit('close')" title="Basic Details">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-10 w-full gap-4 p-2"
        @submit.prevent="handleSubmit($event, submitBasicDetails)"
      >
        <div class="grid grid-cols-1 gap-4">
          <qh-input
            label="First Name"
            type="text"
            name="firstname"
            placeholder="Your firstname"
            v-model="profile.firstname"
            :rules="ValidationRules.basicDetails.firstname"
          />

          <qh-input
            label="Last Name"
            type="text"
            name="lastname"
            placeholder="Your lastname"
            v-model="profile.lastname"
            :rules="ValidationRules.basicDetails.lastname"
          />

          <qh-input
            label="Middle Name"
            type="text"
            name="middlename"
            placeholder="Your middlename"
            v-model="profile.middlename"
            :rules="ValidationRules.basicDetails.middlename"
          />

          <qh-input
            type="select"
            label="Gender"
            name="gender"
            v-model="profile.gender"
            :options="[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Others', value: 'others' },
            ]"
          />

          <qh-input
            label="Phone Number"
            type="tel"
            name="phone_number"
            placeholder="Your phone number"
            v-model="profile.phone_number"
            :rules="ValidationRules.basicDetails.phone_number"
          />
        </div>
        <qh-button
          type="submit"
          class="mt-4 w-full"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>

    <!--  -->
  </qh-container>
</template>

<script setup lang="ts">
import { EDIT_USER_DETAILS } from '~/services/user.service';
import { Form as VeeForm } from 'vee-validate';
import type { BasicDetails } from '~/types/user';

import { useUserStore } from '~/store/user-store';

const { getBasicDetails } = useUserStore();

const profile = ref<BasicDetails | any>({
  gender: '',
  firstname: '',
  lastname: '',
  middlename: '',
  phone_number: '',
});

const submitBasicDetails = async (field: any) => {
  const response = await EDIT_USER_DETAILS({
    ...field,
    ...profile.value,
    gender: profile.value.gender.value,
  });
  if (response.success) {
    qhToast.success('Details submitted successfully');
    qhCloseModal();
    getBasicDetails();
  } else qhToast.error(response.message);
};
</script>
