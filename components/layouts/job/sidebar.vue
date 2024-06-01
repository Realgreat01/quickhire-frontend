<template>
  <div class="relative top-0 h-screen">
    <icons-logo class="sticky top-0 h-40 bg-white text-brand" />

    <div class="text-brand" @click="getAllJob('')">
      <h2
        class="qh-text-4 flex w-full cursor-pointer items-center justify-between border-b border-dashed border-brand-400 p-1 px-4 font-normal"
      >
        <span class="block"> All Jobs</span>
        <ArrowRightIcon class="h-4 w-4" />
      </h2>
    </div>

    <div class="mb-8">
      <div
        class="text-brand"
        v-for="job in jobTypes"
        @click="searchJob(job)"
        :class="{
          'bg-brand text-white':
            searchQuery.title === job || route.query.title === job,
        }"
      >
        <h2
          class="qh-text-4 flex w-full cursor-pointer items-center justify-between border-b border-dashed border-brand-400 p-1 px-4 font-normal"
        >
          <span class="block"> {{ job }}</span>
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
const job = useJobStore();
const router = useRouter();
const route = useRoute();
const { searchQuery } = storeToRefs(useJobStore());
const { getAllJobs, getMatchedJobs } = useJobStore();

const getAllJob = (title: string) => {
  router.replace({ name: QH_ROUTES.JOB.ALL });
  searchQuery.value.title = title;
  getAllJobs();
};
const searchJob = (title: string) => {
  router.replace({ name: QH_ROUTES.JOB.ALL, query: { title } });
  searchQuery.value.title = title;
  getMatchedJobs();
};

const jobTypes = ref([
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Scientist',
  'DevOps Engineer',
  'Cloud Engineer',
  'Database Administrator',
  'Cybersecurity Specialist',
  'Network Engineer',
  'Machine Learning Engineer',
  'AI Researcher',
  'Mobile App Developer',
  'UI/UX Designer',
  'Product Manager',
  'IT Support Specialist',
  'Systems Administrator',
  'QA Engineer',
  'Blockchain Developer',
  'Site Reliability Engineer',
  'AR/VR Developer',
  'Embedded Systems Engineer',
  'Game Developer',
  'Technical Writer',
  'Business Analyst',
  'IT Project Manager',
  'Solutions Architect',
  'Software Tester',
  'Web Developer',
  'IoT Engineer',
]);
</script>

<style scoped></style>
