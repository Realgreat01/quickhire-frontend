<template>
  <div
    class="h-screen w-screen bg-[url('~~/assets/images/office-image.jpg')] bg-cover bg-center bg-repeat"
  >
    <qh-container title="login" @close="qhReturnToHomepage">
      <VeeForm
        v-slot="{ handleSubmit, isSubmitting, errors }"
        class="h-fit p-10"
      >
        <form
          @submit.prevent="handleSubmit($event, loginCompany)"
          class="mx-4 flex flex-col justify-end gap-4"
        >
          <qh-input label="email" name="emailOrCompanyID" required />
          <qh-input
            label="Password"
            name="company_password"
            type="password"
            required
          />
          <qh-button
            label="Login"
            type="submit"
            class="mt-4 h-10 w-full p-1"
            :loading="isSubmitting"
            :disabled="Object.keys(errors).length !== 0 || isSubmitting"
          />
        </form>
      </VeeForm>
      <h1 class="qh-text-4 mb-4 text-center">
        Don't have an account ?
        <RouterLink class="text-brand" :to="QH_ROUTES.REGISTER"
          >Sign Up</RouterLink
        >
      </h1>
    </qh-container>
  </div>
</template>

<script setup lang="ts">
import { LOG_IN_COMPANY } from '~~/services/auth.service';
import { Form as VeeForm } from 'vee-validate';
import QH_CONSTANTS from '~/constants';
import { useRouter } from 'vue-router';
import { QH_ROUTES } from '~/constants/routes';

const router = useRouter();

const loginCompany = async (field: any) => {
  const res = await LOG_IN_COMPANY(field);
  if (res.success) {
    localStorage.setItem(QH_CONSTANTS.AUTH_TOKEN, res.data.token);
    QH_CONSTANTS.SET_USER_TYPE('company');
    router.replace(QH_ROUTES.COMPANY.DASHBOARD);
  } else qhToast.error(res.message);
};
</script>

<style scoped></style>
