<template>
  <div
    class="grid w-full items-start justify-between gap-x-10 py-10 lg:min-h-screen lg:grid-cols-1 lg:items-center lg:justify-center"
  >
    <div class="qh-flex-center flex w-full flex-col gap-y-4">
      <h1 class="ml-1 flex justify-center text-center">
        <h1
          class="font-geologica md:w-[65 %] my-4 block text-center text-3xl font-bold text-brand md:text-6xl"
        >
          Find The Best
          <span class="text-success-600">Developers</span>
          Job
          <!-- <span class="text-success-600">For You</span> ! -->
        </h1>
        <h2 class="qh-text-2 mx-2 text-center font-semibold">
          Connect with Top Developers or
          <span class="block-text-brand">Land Your Dream Job</span>
        </h2>
      </h1>
      <p class="qh-text-normal w-[96%] text-center md:w-full">
        Escape the hurdles of job search and hiring challenges, lets make the
        process seamless for you!
      </p>

      <div class="mt-5">
        <div
          class="mx-auto flex h-12 items-center justify-between overflow-hidden rounded-full border pl-5 md:h-14 md:pl-10 lg:w-[580px]"
        >
          <input
            v-model="searchQuery.title"
            class="max-w-64 !rounded-full border-none focus:outline-none md:max-w-72"
            placeholder="Search for jobs"
          />
          <span
            class="qh-flex-center h-full w-14 bg-brand md:w-20"
            @click="searchJob"
          >
            <MagnifyingGlassIcon class="h-5 w-5 text-dark-50" />
          </span>
        </div>
        <div
          class="mx-auto my-4 flex max-w-[80vw] flex-wrap justify-center gap-x-4"
        >
          <qh-input
            name="job_location_type"
            type="select"
            v-model="searchQuery.location"
            class="md:min-w-40"
            placeholder="Onsite"
            :options="jobLocationTypes"
            clearable
          />
          <qh-input
            name="job_type"
            type="select"
            v-model="searchQuery.type"
            placeholder="Full-Time"
            class="capitalize md:min-w-40"
            :options="jobTypes"
            clearable
          />
          <qh-input
            name="experience_level"
            type="select"
            placeholder="Mid Level"
            class="capitalize md:min-w-40"
            v-model="searchQuery.level"
            :options="experienceLevels"
            clearable
          />
        </div>
      </div>

      <div
        class="flex flex-col justify-between gap-x-8 gap-y-4 md:flex-row md:justify-start"
      >
        <qh-button class="!h-14 !w-80 font-medium md:!h-12 md:!w-72">
          <router-link :to="{ name: QH_ROUTES.USER.REGISTER }">
            Get Started
          </router-link>
        </qh-button>
        <qh-button
          variant="outlined"
          class="!h-14 !w-80 font-medium md:!h-12 md:!w-72"
        >
          <router-link :to="{ name: QH_ROUTES.COMPANY.LOGIN }">
            For Business</router-link
          >
        </qh-button>
      </div>
    </div>
    <div
      class="order-1 mx-auto mb-4 hidden w-full items-center justify-center md:order-2"
    >
      <!-- <icons-landing-page-2 class="" /> -->
      <img src="~/assets/images/home.png" alt="" class="h-[400px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { useJobStore } from '~/store/job-store';
import { jobQuery } from '~/components/layouts/job/job-types';

const { searchQuery } = storeToRefs(useJobStore());
const { getAllJobs, getMatchedJobs } = useJobStore();
const router = useRouter();
const jobLocationTypes = ref(['remote', 'onsite', 'hybrid']);
const jobTypes = ref([
  'Full-Time',
  'Part-Time',
  'Contract',
  'Internship',
  'Voluntary',
]);
const experienceLevels = ref([
  'internship',
  'entry',
  'junior',
  'mid',
  'senior',
  'expert',
]);

const searchJob = () => {
  router.replace({ name: QH_ROUTES.JOB.ALL, query: searchQuery.value });
  if (
    searchQuery.value.title === '' &&
    searchQuery.value.location === '' &&
    searchQuery.value.type === '' &&
    searchQuery.value.level === ''
  ) {
    getAllJobs();
  } else getMatchedJobs();
};
</script>

<style scoped></style>
