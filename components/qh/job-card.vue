<template>
  <qh-card class="bg-white">
    <div class="flex w-full justify-between gap-x-2">
      <div class="flex">
        <img
          src="~~/assets/images/company-logo.jpg"
          alt=""
          class="block h-12"
        />

        <div class="ml-5 flex flex-col">
          <h1 class="qh-text-3 flex items-center font-bold text-brand">
            <span class=""> {{ job.posted_by?.company_name }}</span>
            <RiVerifiedBadgeFill class="h-[14px] w-[14px] fill-success-500" />
          </h1>
          <h1 class="qh-text-4 ml-0">
            {{ job.posted_by?.company_location }}
          </h1>
          <h1 class="qh-text-4">Intership / {{ job.job_type }}</h1>
        </div>
      </div>
      <div class="flex flex-col items-end">
        <div class="flex items-center gap-x-1 capitalize">
          <RiBuildingLine class="h-4 w-4 fill-brand" />
          <span class="text-sm text-dark-400">remote</span>
        </div>
        <h1 class="qh-text-4 font-bold text-success">
          {{
            qhNumbers.formatCurrency(
              qhNumbers.convertCurrencyToNumber(job.salary) / 600.73,
            )
          }}
        </h1>
      </div>
    </div>

    <h1 class="qh-text-3 my-2 font-semibold">
      {{ qhHelpers.sliceWords(job.job_title, 30) }}
    </h1>
    <h1
      class="qh-text-4"
      v-html="qhHelpers.sliceWords(job.job_description, 200)"
    ></h1>
    <div class="mt-5 flex w-full items-end justify-between">
      <h1 class="qh-text-4 flex items-center gap-x-2 text-dark-400">
        <ClockIcon class="apply-icon h-4 w-4 duration-500" />
        <span class="">{{ qhDates.formatDate(job.posted_on) }}</span>
      </h1>
      <div class="flex flex-col">
        <router-link
          :to="{ name: QH_ROUTES.JOB.SINGLE, params: { id: job._id } }"
        >
          <qh-button
            @click="getSingleJob(job?._id)"
            class="apply-button h-6 w-28 gap-x-4 self-end rounded-full border border-brand bg-transparent font-medium !text-brand"
          >
            <span class="">Apply</span>
            <ArrowRightCircleIcon
              class="apply-icon h-5 w-5 text-brand duration-500"
            />
          </qh-button>
        </router-link>

        <h2 class="qh-text-4 mt-4 flex h-6 items-center gap-x-1 text-dark-400">
          <RiUserFill class="h-4 w-4" />

          <h2 class="ml-1 font-bold">
            <!-- {{ qhNumbers.formatNumber(job.applicants.length) }} -->
          </h2>
          <h2 class="block">Applicants</h2>
        </h2>
      </div>
    </div>
  </qh-card>
</template>

<script setup lang="ts">
import { ArrowRightCircleIcon, ClockIcon } from '@heroicons/vue/24/outline';
import {
  RiVerifiedBadgeFill,
  RiHomeOfficeFill,
  RiGlobalLine,
  RiUserFill,
  RiBuildingLine,
} from 'vue-remix-icons';
import { QH_ROUTES } from '~/constants/routes';
import { useJobStore } from '~/store/job-store';
import type { Job } from '~/types/job';
defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true,
  },
});
const route = useRoute();
const { allJobs } = storeToRefs(useJobStore());
const { getSingleJob } = useJobStore();
onMounted(() => console.log(route));
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
