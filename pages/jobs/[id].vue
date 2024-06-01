<template>
  <div>
    <div class="relative grid h-[80vh] w-full gap-4 md:grid-cols-[5fr,3fr]">
      <jobs-single />
      <jobs-related />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import { useJobStore } from '~/store/job-store';
const { getSingleJob } = useJobStore();
const route = useRoute();

definePageMeta({
  layout: 'job',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.JOB.SINGLE,
});

useHead({
  title: 'QuickHire - Jobs',
});

onBeforeMount(async () => {
  if (process.client) {
    if (typeof route.params.id === 'string')
      await getSingleJob(route.params.id);
  }
});
</script>

<style scoped></style>
