<template>
  <div
    class="h-screen w-screen bg-[url('~~/assets/images/create-account.jpg')] bg-cover bg-center bg-no-repeat"
  >
    <qh-container @close="qhReturnToHomepage" title="Create Account">
      <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
        <form
          class="mx-auto mt-4 w-full"
          @submit.prevent="handleSubmit($event, createAccount)"
        >
          <div class="grid gap-4">
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
            class="mt-4 h-10 w-full p-1"
            :loading="isSubmitting"
            :disabled="Object.keys(errors).length !== 0 || isSubmitting"
          />
        </form>
      </VeeForm>
      <h1 class="qh-text-4 my-2 text-center">
        Already have an account ?
        <RouterLink class="text-brand" :to="{ name: QH_ROUTES.USER.LOGIN }"
          >Login</RouterLink
        >
      </h1>
      <h1 class="qh-text-4 text-center">
        <RouterLink
          class="text-brand"
          :to="{ name: QH_ROUTES.COMPANY.REGISTER }"
          >Register Company</RouterLink
        >
      </h1>
    </qh-container>
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

const registration = ref<any>({
  email: 'samsonrealgreat@gmail.com',
  username: 'realgreat',
  firstname: 'samson',
  lastname: 'ikuomenisan',
  password: '#Real4great',
  confirm_password: '#Real4great',
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
    qhToast.error(res.message);
    if (res.errors) serverErrors.value = res.errors;
  }
};
</script>

<style scoped></style>
