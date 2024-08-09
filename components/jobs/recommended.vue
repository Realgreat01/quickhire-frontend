<template>
  <qh-card
    :loading="loadingJobRecommendations"
    class="sticky top-0 mb-4 min-h-[calc(100vh-100px)] overflow-y-scroll bg-white p-4"
  >
    <h1 class="qh-text-2 mb-5 text-center font-bold text-brand">
      Jobs For You
    </h1>
    <div
      class="flex items-start justify-between pb-4"
      v-for="job in jobRecommendations"
    >
      <div class="flex w-full gap-x-2 border-b border-dashed border-brand pb-2">
        <img
          :src="job.posted_by?.logo"
          alt=""
          class="block max-h-12 max-w-12"
        />
        <!-- 2 -->
        <div class="">
          <h1 class="qh-text-3 font-semibold">{{ job.job_title }}</h1>
          <h1 class="qh-text-4 -mt-1 font-medium text-brand">
            {{ job.posted_by?.company_name }}
          </h1>
          <div class="mt-2 flex gap-x-1">
            <qh-button
              :label="job?.job_location_type"
              variant="light"
              class="!h-6 !px-4 !text-xs !font-normal capitalize"
            />
            <qh-button
              :label="job?.job_type"
              variant="light"
              class="!h-6 !px-4 !text-xs !font-normal capitalize"
            />
            <qh-button
              :label="job?.experience_level + ' Level'"
              variant="light"
              class="!h-6 !px-4 !text-xs !font-normal capitalize"
            />
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
    <qh-empty-content
      class="gap-2"
      v-if="!jobRecommendations || jobRecommendations.length <= 0"
    >
      <h1 class="qh-text-3 font-bold">
        You have no job recommendations for now!
      </h1>
      <h2 class="qh-text-4 font-medium text-success">
        Update your profile to get more recommendations!
      </h2>
    </qh-empty-content>
  </qh-card>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { QH_ROUTES } from '~/constants/routes';
import { useJobStore } from '~/store/job-store';
const { jobRecommendations, loadingJobRecommendations } =
  storeToRefs(useJobStore());
const { getSingleJob } = useJobStore();
</script>

<style scoped></style>
