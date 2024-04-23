<template>
  <qh-container @close="$emit('close')" title="Basic Details">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-10 w-full gap-4 p-2"
        @submit.prevent="handleSubmit($event, submitBasicDetails)"
      >
        <div class="grid grid-cols-1 gap-4">
          <qh-input
            v-for="({ name, ...detail }, index) in formDetails"
            v-bind="detail"
            :name="name"
            :errors="errors"
            v-model="basicDetails[name]"
            :key="name"
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
import { ADD_USER_DETAILS } from '~/services/user.service';
import { Form as VeeForm } from 'vee-validate';
import type { BasicDetails } from '~/types';
import { ValidationRules } from '~/constants/validation-rules';

import { useUserStore } from '~/store/user-store';

const { getBasicDetails } = useUserStore();

const formDetails = reactive([
  {
    name: 'firstname',
    label: 'first name',
    type: 'text',
    placeholder: 'Your firstname',
    rules: ValidationRules.basicDetails.firstname,
  },

  {
    name: 'lastname',
    label: 'last name',
    type: 'text',
    placeholder: 'Your lastname',
    rules: ValidationRules.basicDetails.lastname,
  },
  {
    name: 'middlename',
    label: 'middle name',
    type: 'text',
    placeholder: 'Your middlename',
    rules: ValidationRules.basicDetails.middlename,
  },

  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    placeholder: 'Your gender',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Others', value: 'others' },
    ],
  },
  {
    name: 'phone_number',
    label: 'phone number',
    type: 'tel',
    placeholder: 'Your phone number',
    // rules: ValidationRules.basicDetails.phone_number,
  },
]);

const basicDetails = ref<BasicDetails | any>({
  gender: '',
});

const submitBasicDetails = async (field: any) => {
  const response = await ADD_USER_DETAILS({
    ...field,
    gender: basicDetails.value.gender.value,
  });
  if (response.success) {
    qhToast.success('Details submitted successfully');
    qhCloseModal();
    getBasicDetails();
  } else qhToast.error(response.message);
};
</script>
