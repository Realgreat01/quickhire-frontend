<template>
  <div>
    <div
      class="flex flex-col gap-y-4 rounded-lg border border-brand-50 bg-white p-4"
    >
      <!-- 1 -->
      <div class="grid grid-cols-2 items-start justify-between md:flex">
        <div class="flex flex-col gap-y-2">
          <div class="flex gap-x-8">
            <h1 class="qh-text-3 font-bold text-brand">
              {{ job?.job_title }}
            </h1>
            <qh-button
              v-if="job.job_status === 'open'"
              label="Active"
              class="qh-text-4 h-4 rounded-full bg-green-500 px-4 font-medium"
            />

            <qh-button
              v-else-if="job.job_status === 'paused'"
              label="Paused"
              class="qh-text-4 h-4 rounded-full bg-orange-600 px-4 font-medium !text-dark-100"
            />
            <qh-button
              v-else
              label="Closed"
              class="qh-text-4 h-4 rounded-full bg-error-600 px-4 font-medium !text-dark-100"
            />
          </div>

          <div class="flex w-full gap-x-2">
            <qh-button
              :label="job?.job_type"
              class="qh-text-4 h-4 rounded-full bg-brand-100 px-2 !text-brand-700"
            />
            <qh-button
              label="Remote"
              class="qh-text-4 h-4 rounded-full bg-brand-100 px-4 !text-brand-700"
            />
          </div>
          <h1 class="qh-text-3 font-bold text-success-800">
            {{ qhNumbers.formatCurrency(job.salary.value) }}
          </h1>
        </div>
        <div class="flex h-full flex-col items-end justify-between">
          <h2 class="hidden md:block">
            {{ qhNumbers.formatNumber(job?.applicants.length) }}
            Applicants
          </h2>
          <qh-button
            v-if="QH_CONSTANTS.GET_USER_TYPE() === 'company'"
            class="h-8 w-fit rounded-full bg-orange-500 px-5"
            label="See Applicants"
          />
          <qh-button
            v-else-if="job.job_status === 'paused'"
            class="disabled h-8 w-fit rounded-full bg-dark-400 px-8"
            label="Paused"
          />
          <qh-button
            v-else-if="
              job.applicants.some(
                (applicant: any) => applicant.user === user?._id,
              )
            "
            class="disabled h-8 w-fit rounded-full bg-brand-400 px-8"
            label="Appllied"
          />
          <qh-button
            v-else
            @click="getApplyForJob(job._id)"
            class="h-8 w-fit rounded-full bg-brand px-8"
            label="Apply"
          />

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
          <p class="">{{ qhDates.formatDate(job?.posted_on) }}</p>
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
import QH_CONSTANTS from '~/constants';
import { useJobStore } from '~/store/job-store';
import { useUserStore } from '~/store/user-store';

const { getApplyForJob } = useJobStore();
const { job } = storeToRefs(useJobStore());
const { user } = storeToRefs(useUserStore());
</script>

<style scoped></style>
