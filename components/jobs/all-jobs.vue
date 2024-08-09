<template>
  <div class="w-full p-2 md:p-4">
    <div
      class="flex grid-cols-2 flex-wrap gap-4 md:grid"
      v-if="allJobs.length > 0"
    >
      <template v-for="(job, index) in allJobs">
        <qh-job-card :job="job" class="" v-if="job._id" />
      </template>
    </div>

    <qh-empty-content v-else
      ><h2 class="qh-flex-center">
        <MagnifyingGlassIcon class="h-10 w-10 text-brand" />
        No matched job found
        <span class="qh-flex-center mx-1 flex" v-if="searchQuery.title">
          <span class="mx-1">for title - </span>
          <span class="text-brand">{{ searchQuery.title }}</span>
        </span>
      </h2></qh-empty-content
    >

    <RouterLink
      :to="{ name: QH_ROUTES.JOB.ALL }"
      class="qh-flex-center mx-auto w-full min-w-[40%]"
    >
      <qh-button
        @click="getAllJobs"
        variant="outlined"
        class="apply-button my-6 !h-10 min-w-[40%] max-w-96 !gap-x-6 rounded-full border border-brand bg-transparent font-medium !text-brand"
      >
        <span class="">Load more Jobs</span>
        <ArrowRightCircleIcon
          class="apply-icon h-5 w-5 text-brand duration-500"
        />
      </qh-button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import {
  ArrowRightCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/solid';
import { useJobStore } from '~/store/job-store';

defineProps({ Class: String });
const { allJobs, searchQuery } = storeToRefs(useJobStore());
const { getAllJobs } = useJobStore();
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
