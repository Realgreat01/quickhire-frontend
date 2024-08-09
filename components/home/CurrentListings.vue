<template>
  <div class="py-10">
    <h1 class="qh-text-1 mb-3 mt-10 md:mb-5">Latest Jobs</h1>
    <div class="flex flex-wrap gap-4 md:hidden">
      <qh-job-card v-for="(job, index) in allJobs.slice(0, 4)" :job="job" />
    </div>
    <div class="hidden flex-wrap gap-4 md:flex">
      <qh-job-card v-for="job in allJobs.slice(0, 6)" :job="job" />
    </div>
    <RouterLink :to="{ name: QH_ROUTES.JOB.ALL }">
      <qh-button
        variant="outlined"
        class="apply-button mx-auto my-6 !h-12 !w-full max-w-96 !gap-x-6 rounded-full border border-brand-500 bg-transparent px-4 font-medium !text-brand md:!min-w-[40%]"
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
import { QH_ROUTES } from '~/constants/routes';
import { ArrowRightCircleIcon } from '@heroicons/vue/24/solid';
import { useJobStore } from '~/store/job-store';
defineProps({ Class: String });
const { allJobs } = storeToRefs(useJobStore());
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
