<template>
  <div>
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }" class="h-fit">
      <form
        class="mx-auto mt-4 w-full gap-4"
        @submit.prevent="handleSubmit($event, sendEmailForOtpVerification)"
      >
        <qh-input
          name="email"
          label="Email Address"
          :rules="ValidationRules.userDetails.email"
        />
        <qh-button
          label="Continue"
          type="submit"
          class="mt-4 !h-12 w-full p-1"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
import { FORGOT_PASSWORD_USER } from '~~/services/auth.service';
import { Form as VeeForm } from 'vee-validate';
import QH_CONSTANTS from '~/constants';
import { useRouter } from 'vue-router';
import { QH_ROUTES } from '~/constants/routes';
import ApiService from '~/services/api-service.service';

definePageMeta({
  layout: 'auth',
  name: QH_ROUTES.USER.FORGOT_PASSWORD,
  title: 'Forgot Password',
  pageHint: 'Enter your registered email address!',
  middleware: 'logged-in-user',
});

const router = useRouter();

const sendEmailForOtpVerification = async (field: any) => {
  const res = await FORGOT_PASSWORD_USER(field);
  if (res.success) {
    router.replace({
      name: QH_ROUTES.USER.VERIFY_OTP,
      query: { email: field.email },
    });
    qhToast.success(res.message);
  } else qhToast.error(res.message);
};
</script>

<style scoped></style>

<style lang="scss" scoped></style>

<style scoped></style>
