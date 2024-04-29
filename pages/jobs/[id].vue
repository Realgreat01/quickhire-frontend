<template>
  <div>
    <div class="relative grid w-full gap-4 md:grid-cols-[5fr,3fr]">
      <jobs-single :job="job" />
      <div class="sticky top-0 mb-4 h-fit bg-white p-4">
        <h1 class="qh-text-2 mb-5 text-center font-bold">Other Jobs</h1>
        <div
          class="flex items-start justify-between pb-4"
          v-for="job in otherJobs"
        >
          <div
            class="flex w-full gap-x-2 border-b border-dashed border-brand pb-2"
          >
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
          <router-link
            :to="{ name: QH_ROUTES.JOB.SINGLE, params: { id: job._id } }"
          >
            <ArrowTopRightOnSquareIcon
              @click="getSingleJob(job?._id)"
              class="h-6 w-6 rounded-3xl p-1 text-brand hover:bg-brand hover:text-white"
            />
          </router-link>
        </div>
      </div>
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
const { job, otherJobs } = storeToRefs(useJobStore());
const { getSingleJob } = useJobStore();
const route = useRoute();

definePageMeta({
  layout: 'users',
  // middleware: ['auth', 'user'],
  // name: QH_ROUTES.JOB,
});

useHead({
  title: 'QuickHire - Jobs',
});

onBeforeMount(async () => {
  if (process.client) {
    if (typeof route.params.id === 'string')
      await getSingleJob(route.params.id);
  }
});
</script>

<style scoped></style>
