<template>
  <div
    class="flex w-96 flex-col rounded-lg border border-dark-100 bg-white p-6 shadow"
  >
    <div class="flex w-full justify-between gap-x-2">
      <div class="flex">
        <img
          src="~~/assets/images/company-logo.jpg"
          alt=""
          class="block h-12"
        />

        <div class="ml-5 flex flex-col">
          <h1 class="qh-text-3 flex items-center font-bold text-brand">
            {{ job.posted_by?.company_name }}
            <RiVerifiedBadgeFill class="h-[14px] w-[14px] fill-success-500" />
          </h1>
          <h1 class="qh-text-4 ml-0">
            {{ job.posted_by?.company_location }}
          </h1>
          <h1 class="qh-text-4">Intership / Full-Time</h1>
        </div>
      </div>
      <div class="flex flex-col items-end">
        <div class="flex items-center gap-x-1 capitalize">
          <RiBuildingLine class="h-4 w-4 fill-brand" />
          <span class="text-sm text-dark-400">remote</span>
        </div>
        <h1 class="qh-text-4 font-bold text-success">
          {{ qhNumbers.formatCurrency(job.salary) }}
        </h1>
      </div>
    </div>

    <h1 class="qh-text-3 my-2 font-semibold">
      {{ qhHelpers.sliceWords(job.job_title, 30) }}
    </h1>
    <h1 class="qh-text-4">
      {{ qhHelpers.sliceWords(job.job_description, 200) }}
    </h1>
    <div class="mt-10 flex w-full items-center justify-between">
      <h1 class="qh-text-4">
        Posted On - {{ qhDates.formatDate(job.posted_on) }}
      </h1>
      <qh-button
        class="apply-button h-6 w-28 gap-x-4 self-end rounded-full border border-brand bg-transparent font-medium !text-brand"
      >
        <span class="">Apply</span>
        <ArrowRightCircleIcon
          class="apply-icon h-5 w-5 text-brand duration-500"
        />
      </qh-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightCircleIcon } from '@heroicons/vue/24/outline';
import {
  RiVerifiedBadgeFill,
  RiHomeOfficeFill,
  RiGlobalLine,
  RiBuildingLine,
} from 'vue-remix-icons';
import type { Job } from '~/types/company';
defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true,
  },
});
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
