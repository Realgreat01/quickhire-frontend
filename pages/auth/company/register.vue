<template>
  <div>
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }" class="h-fit">
      <form
        @submit.prevent="handleSubmit($event, loginCompany)"
        class="mx-4 flex flex-col justify-end gap-4"
      >
        <qh-input label="Company Name" name="company_name" required />
        <qh-input label="Company Email" name="company_email" required />
        <qh-input label="Company Location" name="company_location" required />
        <qh-input
          label="Company Category"
          name="company_category"
          placeholder="IT Company"
          required
        />
        <qh-input
          label="Password"
          name="company_password"
          type="password"
          required
        />
        <qh-input
          label="Confirm Password"
          name="confirm_password"
          type="password"
          required
        />
        <qh-button
          label="Create Account"
          type="submit"
          class="mt-4 h-12 w-full"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>
    <h1 class="qh-text-4 mt-4 text-center">
      Already have an account ?
      <RouterLink class="text-brand" :to="{ name: QH_ROUTES.COMPANY.LOGIN }"
        >Log in</RouterLink
      >
    </h1>
    <h1 class="qh-text-4 text-center">
      <RouterLink class="text-brand" :to="{ name: QH_ROUTES.USER.LOGIN }"
        >Log in as User</RouterLink
      >
    </h1>
  </div>
</template>

<script setup lang="ts">
import { LOG_IN_COMPANY, REGISTER_COMPANY } from '~~/services/auth.service';
import { Form as VeeForm } from 'vee-validate';
import QH_CONSTANTS from '~/constants';
import { useRouter } from 'vue-router';
import { QH_ROUTES } from '~/constants/routes';
import ApiService from '~/services/api-service.service';

definePageMeta({
  layout: 'auth',
  name: QH_ROUTES.COMPANY.REGISTER,
  title: 'Create Account',
});

const router = useRouter();

const loginCompany = async (field: any) => {
  const res = await REGISTER_COMPANY(field);
  console.log(field);
  if (res.success) {
    QH_CONSTANTS.SET_USER_TYPE('company');
    ApiService.setToken(res.data.token);
    router.replace({ name: QH_ROUTES.COMPANY.DASHBOARD });
  } else qhToast.error(res.message);
};
</script>

<style scoped></style>
s
