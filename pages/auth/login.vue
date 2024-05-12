<template>
  <div>
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }" class="h-fit">
      <form
        class="mx-auto mt-4 grid w-full gap-4"
        @submit.prevent="handleSubmit($event, login)"
      >
        <qh-input label="email" name="email" required />
        <qh-input label="Password" name="password" type="password" required />
        <qh-button
          label="Login"
          type="submit"
          class="mt-4 h-10 w-full p-1"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>
    <h1 class="qh-text-4 mb-2 mt-4 text-center">
      Don't have an account ?
      <RouterLink class="text-brand" :to="{ name: QH_ROUTES.USER.REGISTER }"
        >Sign Up</RouterLink
      >
    </h1>
    <h1 class="qh-text-4 text-center">
      <RouterLink class="text-brand" :to="{ name: QH_ROUTES.COMPANY.LOGIN }"
        >Log in as Company</RouterLink
      >
    </h1>
  </div>
</template>

<script setup lang="ts">
import { LOG_IN_USER } from '~~/services/auth.service';
import { Form as VeeForm } from 'vee-validate';
import QH_CONSTANTS from '~/constants';
import { useRouter } from 'vue-router';
import { QH_ROUTES } from '~/constants/routes';
import ApiService from '~/services/api-service.service';

definePageMeta({
  layout: 'auth',
  name: QH_ROUTES.USER.LOGIN,
  title: 'Sign In',
});

const router = useRouter();

const login = async (field: any) => {
  const res = await LOG_IN_USER(field);
  if (res.success) {
    ApiService.setToken(res.data.token);
    QH_CONSTANTS.SET_USER_TYPE('user');
    router.replace({ name: QH_ROUTES.USER.PROFILE });
  } else qhToast.error(res.message);
};
</script>

<style scoped></style>

<style lang="scss" scoped></style>

<style scoped></style>
