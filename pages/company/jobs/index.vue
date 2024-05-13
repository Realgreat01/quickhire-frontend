<template>
  <div class="pb-5">
    <RouterLink
      :to="{
        name: QH_ROUTES.COMPANY.JOB,
        params: { id: job._id },
      }"
      @click="getSingleJob(job?._id)"
      class="flex items-start justify-between border-b border-dashed border-brand p-2 py-4 hover:bg-brand-50"
      v-for="(job, index) in companyJobs"
      :class="{ 'border-t': index === 0 }"
    >
      <div class="flex w-full gap-x-2">
        <img
          src="~~/assets/images/company-logo.jpg"
          alt=""
          class="block h-12"
        />
        <!-- 2 -->
        <div class="flex flex-col gap-2">
          <div class="flex gap-4">
            <div class="">
              <h1 class="qh-text-3 font-bold">{{ job.job_title }}</h1>
              <h1 class="qh-text-5 -mt-1 font-semibold text-brand">
                {{ job.posted_by?.company_name }}
              </h1>
            </div>
            <qh-button
              class="!h-6 rounded-full !py-2 px-4 text-xs capitalize"
              :class="{
                '!bg-success-500': job.job_status === 'open',
                '!bg-dark-400 ': job.job_status === 'paused',
                '!bg-error': job.job_status === 'closed',
              }"
              :label="job?.job_status === 'open' ? 'Active' : job.job_status"
            />
          </div>
          <div class="flex gap-x-1 !capitalize">
            <qh-button
              class="flex h-4 items-center gap-x-2 rounded-full bg-dark-100 px-4 text-xs capitalize !text-brand-700"
            >
              <RiHomeOfficeLine class="h-4 w-4" />
              {{ job.job_location_type }}
            </qh-button>
            <qh-button
              class="flex h-4 items-center gap-x-2 rounded-full bg-dark-100 px-4 text-xs !capitalize !text-brand-700"
            >
              <RiBriefcaseLine class="h-4 w-4" />
              {{ job.job_type }}
            </qh-button>
            <qh-button
              class="flex h-4 items-center gap-x-2 rounded-full bg-dark-100 px-4 text-xs capitalize !text-brand-700"
            >
              <RiToolsLine class="h-4 w-4" />
              {{ job?.experience_level + ' Level' }}
            </qh-button>
            <qh-button
              class="flex h-4 items-center gap-x-2 rounded-full bg-dark-100 px-4 text-xs capitalize !text-brand-700"
            >
              <RiHourglassLine class="h-4 w-4" />
              {{
                `${job?.job_duration.value} ${job.job_duration.date}${job?.job_duration.value >= 1 ? 's' : ''}`
              }}
            </qh-button>
          </div>
          <div class="flex items-center gap-x-5">
            <qh-button
              class="qh-text-4 flex h-4 items-center gap-x-2 rounded-full !bg-success-100 px-4 text-xs font-semibold !text-success-500"
            >
              <RiCashLine class="h-4 w-4" />
              {{ qhNumbers.formatCurrency(job.salary.value) }}
            </qh-button>
            <qh-button
              class="qh-text-4 flex h-4 items-center gap-x-2 rounded-full !bg-error-100 px-4 text-xs font-semibold !text-error-600"
            >
              <RiCalendarCloseLine class="h-4 w-4" />
              {{ qhDates.getReadableDate(job.application_ends as Date) }}
            </qh-button>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightCircleIcon } from '@heroicons/vue/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import {
  RiWebhookFill,
  RiToolsLine,
  RiGithubFill,
  RiHourglassLine,
  RiGlobalLine,
  RiBriefcaseLine,
  RiHomeOfficeLine,
  RiCalendarCloseLine,
  RiCashLine,
} from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useJobStore } from '~/store/job-store';

definePageMeta({
  layout: 'company',
  middleware: ['auth', 'company'],
  name: QH_ROUTES.COMPANY.ALL_JOBS,
});

useHead({
  title: 'QuickHire - Open Applications',
});

const router = useRouter();
const { getSingleJob } = useJobStore();
const { companyJobs } = storeToRefs(useJobStore());
</script>

<style scoped></style>
