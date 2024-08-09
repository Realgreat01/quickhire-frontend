<template>
  <div class="w-full">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-4 w-full"
        @submit.prevent="handleSubmit($event, createAccount)"
      >
        <div class="grid gap-2 md:grid-cols-2">
          <qh-input
            name="email"
            :errors="errors"
            label="Email Address"
            v-model.trim="registration.email"
            :rules="ValidationRules.userDetails.email"
            :serverErrors="serverErrors"
            required
          />
          <qh-input
            name="username"
            :errors="errors"
            label="Preferred Username"
            v-model.trim="registration.username"
            :serverErrors="serverErrors"
            :rules="ValidationRules.userDetails.username"
            required
          />
          <qh-input
            name="firstname"
            :errors="errors"
            label="Firstname"
            :serverErrors="serverErrors"
            v-model.trim="registration.firstname"
            :rules="ValidationRules.userDetails.firstname"
            required
          />
          <qh-input
            name="lastname"
            :errors="errors"
            label="Lastname"
            :serverErrors="serverErrors"
            v-model.trim="registration.lastname"
            :rules="ValidationRules.userDetails.lastname"
            required
          />
          <qh-input
            name="password"
            :errors="errors"
            label="Password"
            type="password"
            :rules="rules.password"
            v-model.trim="registration.password"
            required
          />
          <qh-input
            name="confirm_password"
            :errors="errors"
            label="Confirm Password"
            type="password"
            :rules="rules.confirmPassword"
            v-model="registration.confirm_password"
            required
          />
        </div>
        <qh-button
          type="submit"
          label="Create Account"
          class="mt-4 !h-12 w-full"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>
    <h1 class="qh-text-4 my-2 text-center">
      Already have an account ?
      <RouterLink
        class="font-medium text-brand"
        :to="{ name: QH_ROUTES.USER.LOGIN }"
        >Login</RouterLink
      >
    </h1>

    <RouterLink
      class="qh-text-4 qh-flex-center text-center font-medium text-brand"
      :to="{ name: QH_ROUTES.COMPANY.REGISTER }"
      >QuickHire for Business</RouterLink
    >
  </div>
</template>

<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate';
import * as Yup from 'yup';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { REGISTER_USER } from '~/services/auth.service';
import { useRouter } from 'vue-router';
import ApiService from '~/services/api-service.service';

definePageMeta({
  layout: 'auth',
  name: QH_ROUTES.USER.REGISTER,
  title: 'Create Account',
  pageHint: 'Enter your details to get started on QuickHire!',
  middleware: 'logged-in-user',
});

const registration = ref<any>({
  email: '',
  username: '',
  firstname: '',
  lastname: '',
  password: '',
  confirm_password: '',
});
const serverErrors = ref({});
const router = useRouter();

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
      return registration.value.password === value;
    }),
});

const createAccount = async (field: any) => {
  const res = await REGISTER_USER(registration.value);
  if (res.success) {
    ApiService.setToken(res.data.token);
    QH_CONSTANTS.SET_USER_TYPE('user');
    router.replace({ name: QH_ROUTES.USER.PROFILE });
  } else {
    console.log(res);
    qhToast.error(res.message);
    if (res.errors) serverErrors.value = res.errors;
  }
};
</script>

<style scoped></style>
