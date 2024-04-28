<template>
  <div>
    <!-- Jobs -->
    <div class="flex flex-col gap-4">
      <div
        class="flex flex-col gap-y-4 rounded-lg border border-brand-50 bg-white p-4"
      >
        <!-- 1 -->
        <div class="flex items-start justify-between">
          <div class="">
            <div class="flex gap-x-8">
              <h1 class="qh-text-3 font-bold text-brand">
                {{ job?.job_title }}
              </h1>
              <qh-button
                v-if="job?.isActive"
                label="Active"
                class="qh-text-4 h-4 rounded-full bg-green-500 px-4 font-medium"
              />

              <qh-button
                v-else
                label="Closed"
                class="qh-text-4 h-4 rounded-full bg-error-600 px-4 font-medium !text-dark-100"
              />
            </div>

            <div class="flex gap-x-3">
              <qh-button
                :label="job?.job_type"
                class="qh-text-4 h-4 rounded-full bg-brand-100 px-4 !text-brand-700"
              />
              <qh-button
                label="Remote"
                class="qh-text-4 h-4 rounded-full bg-brand-100 px-4 !text-brand-700"
              />
            </div>
            <h1 class="qh-text-3 my-3 font-bold text-success-800">
              {{ qhNumbers.formatCurrency(job.salary) }}
            </h1>
          </div>
          <div class="">
            <h2 class="">
              {{ qhNumbers.formatNumber(job?.applicants.length) }}
              Applicants
            </h2>
            <qh-button
              v-if="QH_CONSTANTS.GET_USER_TYPE() === 'company'"
              class="h-8 w-fit rounded-full bg-secondary px-5"
              label="See Applicants"
            />
            <qh-button
              v-else
              class="h-8 w-fit rounded-full bg-brand px-8"
              label="Apply"
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
            <p class="">{{ qhDates.formatDate(job?.posted_on) }}</p>
          </div>
          <div class="">
            <h1 class="qh-text-4 font-bold">Application End</h1>
            <p class="">{{ qhDates.formatDate(job?.application_ends) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '~/types/job';

import jobs from '~/data/jobs.json';
import QH_CONSTANTS from '~/constants';

const route = useRoute();

defineProps({
  job: {
    type: Object as PropType<Job | null>,
    required: true,
  },
});
</script>

<style scoped></style>
