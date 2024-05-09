<template>
  <div class="p-4">
    <div class="flex flex-wrap gap-4">
      <!-- {{ allJobs }} -->
      <div class="" v-for="(job, index) in allJobs">
        <qh-job-card :job="job" class="w-full" v-if="job._id" />
      </div>
    </div>

    <RouterLink :to="{ name: QH_ROUTES.JOB.ALL }">
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
