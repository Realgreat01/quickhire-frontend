<template>
  <div class="scroll relative top-0 h-screen">
    <icons-logo class="sticky top-0 h-40 bg-white text-brand" />

    <div class="mb-8">
      <div
        class="text-brand"
        v-for="job in jobQuery"
        @click="searchJob(job)"
        :class="{
          'bg-brand text-white':
            searchQuery.title === job || route.query.title === job,
        }"
      >
        <h2
          class="qh-text-4 flex w-full cursor-pointer items-center justify-between border-b border-brand-400 px-4 py-3 font-normal"
        >
          <span class="block"> {{ job }} </span>
          <ArrowRightIcon class="h-4 w-4" />
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/solid';
import { QH_ROUTES } from '~/constants/routes';
import { useJobStore } from '~/store/job-store';
import { jobQuery } from './job-types';
const job = useJobStore();
const router = useRouter();
const route = useRoute();
const { searchQuery } = storeToRefs(useJobStore());
const { getMatchedJobs } = useJobStore();

const searchJob = (title: string) => {
  router.replace({ name: QH_ROUTES.JOB.ALL, query: { title } });
  searchQuery.value.title = title;
  getMatchedJobs();
};
</script>

<style scoped></style>
