<template>
  <div
    class="flex h-screen w-screen items-center justify-center bg-brand-900 bg-[url('~~/assets/images/office-image.jpg')] bg-contain bg-center bg-repeat p-4"
  >
    <qh-container>
      <VeeForm
        v-slot="{ handleSubmit, isSubmitting, errors }"
        class="h-fit bg-white p-10"
      >
        <form
          @submit.prevent="handleSubmit($event, login)"
          class="mx-4 flex flex-col justify-end gap-4"
        >
          isisis {{ QH_CONSTANTS.AUTH_TOKEN }}
          <qh-input label="email" name="email" required />
          <qh-input label="Password" name="password" type="password" required />
          <qh-button label="Login" class="qh-text-3 mt-4 py-2" type="submit" />
        </form>
      </VeeForm>
    </qh-container>
  </div>
</template>

<script setup lang="ts">
import { LOG_IN_USER } from '~~/services/auth.service';
import { Form as VeeForm } from 'vee-validate';
import QH_CONSTANTS from '~/constants';
import { useRouter } from 'vue-router';

const router = useRouter();

const login = async (field: any) => {
  const res = await LOG_IN_USER(field);
  if (res.success) {
    localStorage.setItem(QH_CONSTANTS.AUTH_TOKEN, res.data.token);
    router.replace('/user');
  }
};
</script>

<style scoped></style>
~/services/auth.service
