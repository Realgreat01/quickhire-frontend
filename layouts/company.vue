<template>
  <div class="h-screen">
    <div class="relative grid grid-cols-[1fr,4fr]">
      <layouts-company-sidebar
        class="scroll sticky bottom-0 top-0 overflow-y-scroll"
      />
      <div class="sticky bottom-0 top-0">
        <layouts-company-navbar class="sticky top-0 z-10" />
        <NuxtPage class="scroll overflow-y-scroll p-4" />
      </div>
    </div>
    <forms-create-job v-if="modalController.createJob" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { useCompanyStore } from '~/store/company-store';
const { getCurrentCompany } = useCompanyStore();

import { useRoute, useRouter } from 'vue-router';

import { QH_ROUTES } from '~/constants/routes';

const route = useRoute();
const router = useRouter();

const closeModal = () => {
  router.replace({});
};

const modalController = computed(() => {
  return {
    createJob: route.query.action === QH_ROUTES.COMPANY.CREATE_JOB,
  };
});
onMounted(() => {
  getCurrentCompany();
});
</script>

<style scoped></style>
