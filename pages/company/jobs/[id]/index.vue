<template>
  <div>
    <div
      class="flex flex-col gap-y-4 rounded-lg border border-brand-50 bg-white p-4"
    >
      <!-- 1 -->
      <div class="grid grid-cols-2 items-start justify-between md:flex">
        <div class="flex w-full gap-x-2">
          <img
            :src="job?.posted_by?.logo"
            alt=""
            class="block max-h-12 max-w-12"
          />
          <!-- 2 -->
          <div class="flex flex-col gap-2">
            <div class="flex gap-4">
              <div class="">
                <h1 class="qh-text-3 font-bold">{{ job?.job_title }}</h1>
                <h1 class="qh-text-5 -mt-1 font-semibold text-brand">
                  {{ job?.posted_by?.company_name }}
                </h1>
              </div>
              <qh-button
                class="!h-6 rounded-full !py-2 px-4 text-xs capitalize"
                :class="{
                  '!bg-success-500': job?.job_status === 'open',
                  '!bg-dark-400 !text-success-600':
                    job?.job_status === 'paused',
                  '!bg-error': job?.job_status === 'closed',
                }"
                :label="job?.job_status === 'open' ? 'Active' : job?.job_status"
              />
            </div>
            <div class="flex w-full flex-wrap gap-2 text-xs !capitalize">
              <qh-button
                class="qh-text-5 flex h-4 items-center gap-x-2 rounded-full bg-dark-100 !px-3 !py-3 text-xs capitalize !text-brand-700"
              >
                <RiHomeOfficeLine class="h-4 w-4" />
                <p class="text-xs">{{ job?.job_location_type }}</p>
              </qh-button>
              <qh-button
                class="qh-text-5 flex h-4 items-center gap-x-2 rounded-full bg-dark-100 !px-3 !py-3 text-xs capitalize !text-brand-700"
              >
                <RiBriefcaseLine class="h-4 w-4" />
                <p class="text-xs">{{ job?.job_type }}</p>
              </qh-button>
              <qh-button
                class="qh-text-5 flex h-4 items-center gap-x-2 rounded-full bg-dark-100 !px-3 !py-3 text-xs capitalize !text-brand-700"
              >
                <RiToolsLine class="h-4 w-4" />
                <p class="">{{ job?.experience_level + ' Level' }}</p>
              </qh-button>
              <qh-button
                class="qh-text-5 flex h-4 items-center gap-x-2 rounded-full bg-dark-100 !px-3 !py-3 text-xs capitalize !text-brand-700"
              >
                <RiHourglassLine class="h-4 w-4" />
                <p class="">
                  {{
                    `${job?.job_duration.value} ${job?.job_duration.date}${job?.job_duration.value >= 1 ? 's' : ''}`
                  }}
                </p>
              </qh-button>
            </div>
            <div class="flex items-center gap-x-5">
              <qh-button
                class="qh-text-4 flex h-4 items-center gap-x-2 rounded-full !bg-success-100 px-4 text-xs font-semibold !text-success-500"
              >
                <RiCashLine class="h-4 w-4" />
                {{ qhNumbers.formatCurrency(job?.salary.value) }}
              </qh-button>
              <qh-button
                class="qh-text-4 flex h-4 items-center gap-x-2 rounded-full !bg-error-100 px-4 text-xs font-semibold !text-error-600"
              >
                <RiCalendarCloseLine class="h-4 w-4" />
                {{ qhDates.getReadableDate(job?.application_ends as Date) }}
              </qh-button>
            </div>
          </div>
        </div>
        <div class="flex h-full flex-col items-end justify-between">
          <h2 class="hidden md:block">
            {{ qhNumbers.formatNumber(job?.applicants.length) }}
            Applicants
          </h2>
          <qh-button
            class="h-8 w-fit rounded-full bg-orange-500 px-5"
            @click="seeApplicants(job?._id)"
            >See&nbsp;Applicants</qh-button
          >

          <h2 class="block md:hidden">
            {{ qhNumbers.formatNumber(job?.applicants.length) }}
            Applicants
          </h2>
        </div>
      </div>
      <hr class="border border-dashed border-brand" />
      <div class="">
        <h1 class="qh-text-3 font-bold">Job Description</h1>
        <p class="" v-html="job?.job_description"></p>
      </div>

      <hr class="my-4 border border-dashed border-brand" />

      <div class="flex justify-between">
        <div class="">
          <h1 class="qh-text-4 font-bold">Posted By</h1>
          <!-- <p class="">{{ qhDates.formatDate(job?.posted_on) }}</p> -->
        </div>
        <div class="">
          <h1 class="qh-text-4 font-bold">Application End</h1>
          <!-- <p class="">{{ qhDates.formatDate(job?.application_ends) }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import QH_CONSTANTS from '~/constants';
import { useJobStore } from '~/store/job-store';
import { useUserStore } from '~/store/user-store';

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

definePageMeta({
  layout: 'company',
  middleware: ['auth', 'company'],
  name: QH_ROUTES.COMPANY.JOB,
});

useHead({
  title: 'QuickHire - Company Profile',
});

const router = useRouter();
const route = useRoute();

const { getJobApplicants } = useJobStore();
const { job } = storeToRefs(useJobStore());
const { user } = storeToRefs(useUserStore());

const headers = [
  { text: 'PLAYER', value: 'player' },
  { text: 'TEAM', value: 'team' },
  { text: 'NUMBER', value: 'number' },
  { text: 'POSITION', value: 'position' },
  { text: 'HEIGHT', value: 'indicator.height' },
  { text: 'WEIGHT (lbs)', value: 'indicator.weight', sortable: true },
  { text: 'LAST ATTENDED', value: 'lastAttended', width: 200 },
  { text: 'COUNTRY', value: 'country' },
];

const seeApplicants = (id: string) => {
  getJobApplicants(id);
  router.push({ name: QH_ROUTES.COMPANY.APPLICANTS });
};

onMounted(async () => {
  await getJobApplicants(route.params.id as string);
});
</script>

<style scoped></style>
