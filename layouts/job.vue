<template>
  <div class="h-screen">
    <div class="relative grid md:grid-cols-[1fr,4fr]">
      <LayoutsJobSidebar
        class="sticky bottom-0 top-0 hidden overflow-y-scroll border-r-2 border-dark-100 md:block"
      />
      <div class="sticky bottom-0 top-0">
        <LayoutsJobNavbar class="sticky top-0 z-10" />
        <NuxtPage class="scroll overflow-y-scroll bg-white p-1 pb-4 md:p-4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
import { useJobStore } from '~/store/job-store';
import { QH_ROUTES } from '~/constants/routes';

const { getCurrentUser } = useUserStore();

const { getAllJobs, getAppliedJobs, getJobRecommendations } = useJobStore();
onBeforeMount(async () => {
  await getCurrentUser();
  await getAllJobs();
  await getJobRecommendations();
});
</script>

<style scoped></style>
