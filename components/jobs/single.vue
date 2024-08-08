<template>
  <qh-card
    :loading="loadingJob"
    class="overflow-y-scroll bg-white !p-0 md:sticky md:top-10"
  >
    <div class="flex flex-col gap-y-4 p-4">
      <!-- 1 -->
      <div
        class="grid grid-cols-1 flex-col items-start justify-between md:flex"
      >
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
                  'disabled !bg-dark-500 !text-dark-100':
                    job?.job_status === 'paused',
                  'disabled !bg-error': job?.job_status === 'closed',
                }"
                :disabled="
                  job?.job_status === 'closed' || job?.job_status === 'paused'
                "
                :label="job?.job_status === 'open' ? 'Active' : job?.job_status"
              />
              <qh-button
                v-if="job?.is_new"
                class="qh-text-center !h-6 gap-1 rounded-full bg-red-100 !py-2 px-4 text-xs capitalize"
              >
                <h2 class="text-red-500">NEW</h2>
                <FireIcon class="h-4 w-4 text-orange-500" />
              </qh-button>
            </div>
          </div>
        </div>
        <div class="my-4 flex w-full flex-wrap gap-2 text-xs !capitalize">
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
        <div class="flex h-full w-full items-end justify-between">
          <qh-button
            class="hidden !h-8 !rounded-full border border-brand bg-transparent !py-2 px-4 text-xs capitalize !text-dark md:block"
            :label="
              qhNumbers.formatNumber(job.applicants_count) + ' Applicants'
            "
          />
          <qh-button
            v-if="QH_CONSTANTS.GET_USER_TYPE() === 'company'"
            class="h-8 w-fit rounded-full bg-orange-500 px-5"
            label="See Applicants"
          />
          <qh-button
            v-else-if="job?.job_status === 'paused'"
            class="h-8 w-fit rounded-full bg-dark-500 px-8"
            label="Paused"
            disabled
          />
          <qh-button
            v-else-if="job?.is_applicant"
            class="disabled h-8 w-fit rounded-full bg-brand-400 px-8"
            label="Applied"
            disabled
          />

          <qh-button
            v-else
            @click="getApplyForJob(job?._id)"
            class="h-8 w-fit rounded-full bg-brand px-8"
            label="Apply"
          />

          <h2 class="block md:hidden">
            {{ qhNumbers.formatNumber(job?.applicants.length) }}
            Applicants
          </h2>
        </div>
        <div class="my-4 flex flex-wrap gap-2">
          <qh-devicon
            v-for="icon in job?.required_skills"
            :icon="icon"
            class="min-w-20 rounded-lg bg-dark-100 p-2"
            hide-tooltip
            show-icon-name
          />
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
          <p class="qh-text-4">{{ qhDates.formatDate(job?.posted_on) }}</p>
        </div>
        <div class="">
          <h1 class="qh-text-4 font-bold">Application End</h1>
          <p class="qh-text-4">
            {{ qhDates.formatDate(job?.application_ends) }}
          </p>
        </div>
      </div>
    </div>
  </qh-card>
</template>

<script setup lang="ts">
import QH_CONSTANTS from '~/constants';
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
import { useJobStore } from '~/store/job-store';
import { useUserStore } from '~/store/user-store';
import { FireIcon } from '@heroicons/vue/24/solid';

const { getApplyForJob } = useJobStore();
const { job, loadingJob } = storeToRefs(useJobStore());
const { user } = storeToRefs(useUserStore());
</script>

<style scoped></style>
