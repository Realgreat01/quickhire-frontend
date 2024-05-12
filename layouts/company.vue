<template>
  <div class="h-screen">
    <div class="relative grid md:grid-cols-[1fr,4fr]">
      <layouts-company-sidebar
        class="scroll top-overflow-y-scroll sticky bottom-0 hidden md:block"
      />
      <div class="sticky bottom-0 top-0">
        <layouts-company-navbar class="sticky top-0 z-10" />
        <NuxtPage class="scroll relative overflow-y-scroll pb-4" />
      </div>
    </div>
    <forms-create-job v-if="modalController.createJob" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { useCompanyStore } from '~/store/company-store';
import { useJobStore } from '~/store/job-store';
const { getCurrentCompany } = useCompanyStore();
const { getCompanyJobs } = useJobStore();
import { useRoute, useRouter } from 'vue-router';

import { QH_ROUTES } from '~/constants/routes';

const route = useRoute();
const router = useRouter();

const closeModal = () => {
  router.replace({});
};

const modalController = computed(() => {
  return {
    createJob: route.query.action === QH_ROUTES.JOB.CREATE_JOB,
  };
});
onMounted(() => {
  getCurrentCompany();
  getCompanyJobs();
});
</script>

<style scoped></style>
