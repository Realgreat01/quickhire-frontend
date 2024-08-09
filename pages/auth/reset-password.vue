<template>
  <div>
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }" class="h-fit">
      <form
        class="mx-auto mt-4 flex w-full flex-col gap-4"
        @submit.prevent="handleSubmit($event, resetUserPassword)"
      >
        <qh-input
          name="password"
          :errors="errors"
          label="Password"
          type="password"
          :rules="rules.password"
          v-model.trim="data.password"
          required
        />
        <qh-input
          name="confirm_password"
          :errors="errors"
          label="Confirm Password"
          type="password"
          :rules="rules.confirmPassword"
          v-model="data.confirm_password"
          required
        />

        <qh-button
          label="Reset Password"
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
import { RESET_PASSWORD_USER } from '~~/services/auth.service';
import { Form as VeeForm } from 'vee-validate';
import * as Yup from 'yup';
import { useRouter } from 'vue-router';
import { QH_ROUTES } from '~/constants/routes';

definePageMeta({
  layout: 'auth',
  name: QH_ROUTES.USER.RESET_PASSWORD,
  title: 'Reset Password',
  pageHint: 'Enter your email address and new password! to set new password',
  middleware: 'logged-in-user',
});

const router = useRouter();
const route = useRoute();

const data = ref<any>({
  email: route.query.email,
  verification_code: parseInt(route.query.otp as string),
  password: '',
  confirm_password: '',
});

const resetUserPassword = async (field: any) => {
  const res = await RESET_PASSWORD_USER(data.value);
  if (res.success) {
    router.replace({ name: QH_ROUTES.USER.LOGIN });
    qhToast.success(res.message);
  } else {
    if (res.status === 401) {
      router.replace({
        name: QH_ROUTES.USER.VERIFY_OTP,
        query: { email: route.query.email },
      });
    }
    qhToast.error(res.message);
  }
};

const rules = ref({
  password: Yup.string()
    .required('password is required')
    .min(6, 'password must be at least 6 characters long')
    .matches(
      /(?=.*[a-z])/,
      'password must contain at least one lowercase letter',
    )
    .matches(
      /(?=.*[A-Z])/,
      'password must contain at least one uppercase letter',
    )
    .matches(/(?=.*[0-9])/, 'password must contain at least one number')

    .matches(
      /(?=.*[!@#$%^&*])/,
      'password must contain at least one special character',
    ),

  confirmPassword: Yup.string()
    .required('please confirm your password')
    .test('passwords-match', 'passwords does not match', function (value) {
      return data.value.password === value;
    }),
});
</script>

<style scoped></style>

<style lang="scss" scoped></style>

<style scoped></style>
