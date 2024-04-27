<template>
  <div class="mt-20">
    <h1 class="qh-text-1">Latest Jobs</h1>
    <div class="flex flex-wrap gap-4 md:hidden">
      <qh-job-card v-for="(job, index) in latestJobs.slice(0, 4)" :job="job" />
    </div>
    <div class="hidden flex-wrap gap-4 md:flex">
      <qh-job-card v-for="job in latestJobs.slice(0, 6)" :job="job" />
    </div>
    <RouterLink :to="QH_ROUTES.JOB.ALL">
      <qh-button
        class="apply-button my-6 min-w-[40%] max-w-96 gap-x-6 rounded-full border border-brand bg-transparent font-medium !text-brand"
      >
        <span class="">See all Jobs</span>
        <ArrowRightCircleIcon
          class="apply-icon h-5 w-5 text-brand duration-500"
        />
      </qh-button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '~/types/company';
import jobs from '~/data/jobs.json';
import { QH_ROUTES } from '~/constants/routes';
import { ArrowRightCircleIcon } from '@heroicons/vue/24/solid';
defineProps({ Class: String });

const latestJobs = ref<Job[]>(jobs);
</script>

<style scoped lang="scss">
.apply-button:hover {
  @apply scale-[1.05] bg-brand text-white;
  .apply-icon,
  span {
    color: white !important;
  }
  svg {
    @apply translate-x-2 transform text-white;
  }
}
</style>
