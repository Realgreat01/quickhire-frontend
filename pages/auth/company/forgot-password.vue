<template>
  <div class="w-full">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }" class="h-fit">
      <form
        @submit.prevent="handleSubmit($event, loginCompany)"
        class="mx-4 flex flex-col justify-end gap-4"
      >
        <qh-input
          label="Email / Company ID"
          name="email_or_company_id"
          required
        />
        <qh-input label="Password" name="password" type="password" required />
        <qh-button
          label="Login"
          type="submit"
          class="mt-4 !h-12 w-full p-1"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>
    <h1 class="qh-text-4 mt-4 text-center">
      Don't have a company account ?
      <RouterLink class="text-brand" :to="{ name: QH_ROUTES.COMPANY.REGISTER }"
        >Sign Up</RouterLink
      >
    </h1>
    <h1 class="qh-text-4 text-center">
      <RouterLink class="text-brand" :to="{ name: QH_ROUTES.USER.LOGIN }"
        >Are you a Developer ?</RouterLink
      >
    </h1>
  </div>
</template>

<script setup lang="ts">
import { LOG_IN_COMPANY } from '~~/services/auth.service';
import { Form as VeeForm } from 'vee-validate';
import QH_CONSTANTS from '~/constants';
import { useRouter } from 'vue-router';
import { QH_ROUTES } from '~/constants/routes';
import ApiService from '~/services/api-service.service';

const router = useRouter();
definePageMeta({
  layout: 'auth',
  name: QH_ROUTES.COMPANY.FORGOT_PASSWORD,
  title: 'Sign In',
  middleware: 'logged-in-user',
});

const loginCompany = async (field: any) => {
  const res = await LOG_IN_COMPANY(field);
  if (res.success) {
    QH_CONSTANTS.SET_USER_TYPE('company');
    ApiService.setToken(res.data.token);
    router.replace({ name: QH_ROUTES.COMPANY.DASHBOARD });
  } else qhToast.error(res.message);
};
</script>

<style scoped></style>
