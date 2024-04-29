<template>
  <div>
    <h1 class="qh-text-2 my-6 font-bold">Current Applications</h1>
    <div
      class="items-startjustify-between flex border-b border-dashed border-brand p-2 py-4"
      v-for="(job, index) in allJobs"
      :class="{ 'border-t': index === 0 }"
    >
      <div class="flex w-full gap-x-2">
        <img
          src="~~/assets/images/company-logo.jpg"
          alt=""
          class="block h-12"
        />
        <!-- 2 -->
        <div class="">
          <h1 class="qh-text-3 font-semibold">{{ job.job_title }}</h1>
          <h1 class="qh-text-4 -mt-1 font-medium text-brand">
            {{ job.posted_by?.company_name }}
          </h1>
          <div class="mt-2 flex gap-x-1">
            <qh-button
              label="Remote"
              class="h-4 rounded-full bg-dark-100 px-4 text-xs !text-brand-700"
            />
            <qh-button
              :label="job?.job_type"
              class="h-4 rounded-full bg-dark-100 px-4 text-xs !text-brand-700"
            />
          </div>
        </div>
      </div>
      <div class="px-2">
        <qh-button
          class="qh-text-4 block h-8 w-fit rounded-full !bg-transparent font-semibold !text-success-600"
        >
          {{ qhNumbers.formatCurrency(job.salary) }}
        </qh-button>
        <qh-button
          v-if="index % 2 === 0"
          class="block h-8 w-fit rounded-full bg-success md:px-8"
          label="Submitted"
        />
        <qh-button
          v-else
          class="block h-8 w-fit rounded-full bg-secondary md:px-8"
          label="Processing"
        />
      </div>
    </div>
    <div class="p-6">
      <RouterLink :to="QH_ROUTES.JOB.ALL" class="p-6">
        <qh-button
          class="apply-button w-full gap-x-6 rounded-full border border-brand bg-transparent font-medium !text-brand md:w-96"
        >
          <span class="">See all Jobs</span>
          <ArrowRightCircleIcon
            class="apply-icon h-5 w-5 text-brand duration-500"
          />
        </qh-button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightCircleIcon } from '@heroicons/vue/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { RiWebhookFill, RiGithubFill, RiGlobalLine } from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useJobStore } from '~/store/job-store';

definePageMeta({
  layout: 'users',
  middleware: 'auth',
  name: QH_CONSTANTS.JOBS,
});

useHead({
  title: 'QuickHire - Projects',
});
const { getSingleJob } = useJobStore();
const { allJobs } = storeToRefs(useJobStore());
</script>

<style scoped></style>
