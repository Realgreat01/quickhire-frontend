<template>
  <div>
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }" class="h-fit">
      <form
        class="mx-auto mt-4 w-full gap-4"
        @submit.prevent="handleSubmit($event, SubmitOTP)"
      >
        <qh-otp
          v-model="otp"
          @resend="resendOtp"
          @complete="completeOtp = true"
          @in-complete="completeOtp = false"
        />
        <qh-button
          label="Verify"
          type="submit"
          class="mt-4 !h-12 w-full p-1"
          :disabled="Object.keys(errors).length !== 0 || !completeOtp"
        />
      </form>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
import { LOG_IN_USER, FORGOT_PASSWORD_USER } from '~~/services/auth.service';
import { Form as VeeForm } from 'vee-validate';
import QH_CONSTANTS from '~/constants';
import { useRouter } from 'vue-router';
import { QH_ROUTES } from '~/constants/routes';
import ApiService from '~/services/api-service.service';

definePageMeta({
  layout: 'auth',
  name: QH_ROUTES.USER.VERIFY_OTP,
  title: 'Verify OTP',
  pageHint: 'Enter the OTP sent to your email or phone number!',
  middleware: 'logged-in-user',
});

const otp = ref<number>();
const router = useRouter();
const completeOtp = ref(false);
const route = useRoute();

const resendOtp = async () => {
  const email = route.query.email as string;

  const res = await FORGOT_PASSWORD_USER({ email });
  if (res.success) {
    router.replace({
      query: { email },
    });
    qhToast.success(res.message);
  } else qhToast.error(res.message);
};

const SubmitOTP = async (field: any) => {
  if (completeOtp) {
    router.push({
      name: QH_ROUTES.USER.RESET_PASSWORD,
      query: { email: route.query.email, otp: otp.value },
    });
  }
};
</script>

<style scoped></style>

<style lang="scss" scoped></style>

<style scoped></style>
