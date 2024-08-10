<template>
  <div class="relative grid gap-4 md:grid-cols-[3fr,2fr]">
    <qh-card class="w-full bg-white !px-0 pt-10">
      <div
        @click="
          router.push({ name: QH_ROUTES.JOB.SINGLE, params: { id: job._id } })
        "
        class="flex items-start justify-between border-b border-dashed border-brand p-2 py-4 hover:bg-brand-50"
        v-for="(job, index) in appliedJobs"
        :key="job._id"
        :class="{ 'border-t': index === 0 }"
      >
        <div class="flex w-full gap-x-2">
          <img
            :src="job.posted_by?.logo"
            alt=""
            class="block max-h-10 max-w-10 md:max-h-12 md:max-w-12"
          />
          <!-- 2 -->
          <div class="flex flex-1 flex-col gap-2">
            <div class="flex w-full flex-1 justify-between">
              <div class="">
                <h1 class="qh-text-3 font-bold">{{ job.job_title }}</h1>
                <h1 class="qh-text-5 -mt-1 font-semibold text-brand">
                  {{ job.posted_by?.company_name }}
                </h1>
              </div>
              <qh-button
                class="!h-6 !w-fit justify-self-end !py-2 px-4 text-xs capitalize"
                :class="{
                  '!bg-success-500': job.job_status === 'open',
                  '!bg-dark-400 !text-dark-50': job.job_status === 'paused',
                  '!bg-error': job.job_status === 'closed',
                }"
                :label="job?.job_status === 'open' ? 'Active' : job.job_status"
              />
            </div>

            <div class="px-2 md:hidden">
              <qh-button
                variant="plain"
                class="qh-text-5 !h-7 !w-fit bg-success capitalize"
                :class="{
                  '!bg-dark-100 !text-brand':
                    job.candidate.status === 'submitted',
                  '!bg-dark-100 !text-success-600':
                    job.candidate.status === 'received',
                  '!bg-brand !text-white':
                    job.candidate.status === 'processing',
                  'bg-success-500 !text-white':
                    job.candidate.status === 'accepted',
                  '!bg-error !text-white': job.candidate.status === 'rejected',
                }"
                :label="job.candidate.status"
              />
            </div>

            <!-- Long Line -->
            <div class="hidden flex-wrap gap-1 font-medium !capitalize md:flex">
              <qh-button
                variant="light"
                class="qh-text-5 !font-medium capitalize"
              >
                <RiHomeOfficeLine class="h-4 w-4" />
                {{ job.job_location_type }}
              </qh-button>

              <qh-button
                variant="light"
                class="qh-text-5 !font-medium capitalize"
              >
                <RiBriefcaseLine class="h-4 w-4" />
                {{ job.job_type }}
              </qh-button>

              <qh-button
                variant="light"
                class="qh-text-5 !font-medium capitalize"
              >
                <RiToolsLine class="h-4 w-4" />
                {{ job?.experience_level + ' Level' }}
              </qh-button>
              <qh-button
                variant="light"
                class="qh-text-5 !font-medium capitalize"
              >
                <RiHourglassLine class="h-4 w-4" />
                {{
                  `${job?.job_duration.value} ${job.job_duration.date}${job?.job_duration.value >= 1 ? 's' : ''}`
                }}
              </qh-button>
            </div>

            <div class="hidden items-center gap-x-5 md:flex">
              <qh-button
                class="qh-text-4 qh-text-5 flex h-4 items-center gap-x-2 rounded-full !bg-success-100 px-4 text-xs text-xs !font-medium font-semibold !text-success-500"
              >
                <RiCashLine class="h-4 w-4" />
                {{ qhNumbers.formatCurrency(job.salary.value) }}
              </qh-button>
              <qh-button
                class="qh-text-4 qh-text-5 flex h-4 items-center gap-x-2 rounded-full !bg-error-100 px-4 text-xs text-xs !font-medium font-semibold !text-error-600"
              >
                <RiCalendarCloseLine class="h-4 w-4" />
                {{ qhDates.getReadableDate(job.application_ends as Date) }}
              </qh-button>
            </div>
          </div>
        </div>
        <div class="hidden flex-col items-end px-2 md:flex">
          <qh-button
            variant="plain"
            class="qh-text-5 !h-10 !w-fit rounded-full bg-success capitalize"
            :class="{
              '!bg-dark-100 !text-brand': job.candidate.status === 'submitted',
              '!bg-dark-100 !text-success-600':
                job.candidate.status === 'received',
              '!bg-brand': job.candidate.status === 'processing',
              'bg-success-500': job.candidate.status === 'accepted',
              '!bg-error': job.candidate.status === 'rejected',
            }"
            :label="job.candidate.status"
          />
        </div>
      </div>

      <qh-empty-content
        v-if="!appliedJobs || appliedJobs.length <= 0"
        message="You have not applied for any job yet!"
      />
      <div class="p-6">
        <RouterLink :to="{ name: QH_ROUTES.JOB.ALL }" class="p-6">
          <qh-button
            variant="outlined"
            class="apply-button mx-auto !h-12 !w-full gap-x-6 font-medium md:!w-96"
          >
            <span class="">See all Jobs </span>
            <ArrowRightCircleIcon
              class="apply-icon h-5 w-5 text-brand duration-500"
            />
          </qh-button>
        </RouterLink>
      </div>
    </qh-card>

    <jobs-recommended />
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
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.APPLIED_JOBS,
});

useHead({
  title: 'QuickHire - Projects',
});
const router = useRouter();
const { getSingleJob } = useJobStore();
const { allJobs, appliedJobs } = storeToRefs(useJobStore());
</script>

<style scoped></style>
