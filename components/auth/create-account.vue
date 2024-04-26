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
              v-for="(detail, index) in registrationForm"
              :key="index"
              :errors="errors"
              v-bind="detail"
              v-model="registrationDetails[detail.name]"
              :required="true"
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
      <h1 class="qh-text-4 my-4 text-center">
        Already have an account ?
        <RouterLink class="text-brand" :to="QH_ROUTES.LOGIN">Login</RouterLink>
      </h1>
    </qh-container>
  </div>
</template>

<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate';
import * as Yup from 'yup';
import { QH_ROUTES } from '~/constants/routes';
import { ValidationRules } from '~/constants/validation-rules';

const registrationDetails = ref<any>({ password: '', confirmPassword: '' });

const rules = ref({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .matches(
      /(?=.*[a-z])/,
      'Password must contain at least one lowercase letter',
    )
    .matches(
      /(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter',
    )
    .matches(/(?=.*[0-9])/, 'Password must contain at least one number')

    .matches(
      /(?=.*[!@#$%^&*])/,
      'Password must contain at least one special character',
    ),

  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .test('passwords-match', 'Passwords does not match', function (value) {
      return registrationDetails.value.password === value;
    }),
});

const registrationForm = ref([
  {
    label: 'Email Address',
    name: 'email',
    type: 'text',
  },
  {
    label: 'Preferred Username',
    name: 'username',
    type: 'text',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    rules: rules.value.password,
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    type: 'password',
    rules: rules.value.confirmPassword,
  },
]);

const createAccount = (field: any) => {};
</script>

<style scoped></style>
