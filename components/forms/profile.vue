<template>
  <qh-container @close="$emit('close')" title="Basic Details">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-10 w-full gap-4 p-2"
        @submit.prevent="handleSubmit($event, submitUserDetails)"
      >
        <div class="grid grid-cols-1 gap-4">
          <qh-input
            label="First Name"
            type="text"
            name="firstname"
            placeholder="Your firstname"
            v-model="profile.firstname"
            :rules="ValidationRules.userDetails.firstname"
          />

          <qh-input
            label="Last Name"
            type="text"
            name="lastname"
            placeholder="Your lastname"
            v-model="profile.lastname"
            :rules="ValidationRules.userDetails.lastname"
          />

          <qh-input
            label="Middle Name"
            type="text"
            name="middlename"
            placeholder="Your middlename"
            v-model="profile.middlename"
            :rules="ValidationRules.userDetails.middlename"
          />

          <qh-input
            type="select"
            label="Gender"
            name="gender"
            class="capitalize"
            v-model="profile.gender"
            :options="['male', 'female', 'others']"
          />

          <qh-input
            label="Phone Number"
            type="tel"
            name="phone_number"
            placeholder="Your phone number"
            v-model="profile.phone_number"
            :rules="ValidationRules.userDetails.phone_number"
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
import type { User } from '~/types/user';

import { useUserStore } from '~/store/user-store';

const { getCurrentUser } = useUserStore();
const { user } = storeToRefs(useUserStore());

const profile = ref<User | any>({
  firstname: user.value?.firstname,
  lastname: user.value?.lastname,
  middlename: user.value?.middlename,
  phone_number: user.value?.phone_number,
  gender: user.value?.gender,
});

const submitUserDetails = async (field: any) => {
  const response = await EDIT_USER_DETAILS(profile.value);
  if (response.success) {
    qhToast.success('Details submitted successfully');
    qhCloseModal();
    getCurrentUser();
  } else qhToast.error(response.message);
};
</script>
