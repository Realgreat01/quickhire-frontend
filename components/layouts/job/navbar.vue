<template>
  <div class="flex flex-col justify-center gap-1 bg-white py-2">
    <div class="mx-2 flex items-center justify-between px-4">
      <h1
        class="qh-text-1 font-geologica flex w-fit items-center justify-center gap-x-6 font-bold text-success-600"
      >
        <span class="font-bebas block text-success">JOB BOARD</span>
        <qh-button
          class="h-10 rounded-2xl !bg-transparent !px-0 !py-0"
          v-if="$route.name !== QH_ROUTES.JOB.ALL"
          ><RouterLink
            :to="{ name: QH_ROUTES.JOB.ALL }"
            class="flex gap-x-1 rounded-2xl border border-brand px-4 py-1"
          >
            <ArrowLeftCircleIcon class="h-5 w-5 text-brand" />
            <p class="font-poppins qh-text-4 font-normal text-dark">All Jobs</p>
          </RouterLink></qh-button
        >
      </h1>
    </div>

    <div
      class="mx-auto grid w-full grid-cols-2 items-center gap-x-2 justify-self-end border-b-4 border-brand-100 bg-white p-2 px-4 md:flex"
    >
      <qh-input
        name="key"
        type="select"
        class="qh-text-4 qh-full-width capitalize placeholder:text-xs md:min-w-40"
        placeholder="Software"
        :options="jobQuery"
        taggable
        tagPlaceholder="Search"
        v-model="searchQuery.title"
        @update:modelValue="searchJob"
      />
      <qh-input
        name="job_location_type"
        type="select"
        v-model="searchQuery.location"
        class="qh-text-4 capitalize placeholder:text-xs md:min-w-40"
        placeholder="Onsite"
        :options="jobLocationTypes"
        clearable
      />
      <qh-input
        name="job_type"
        type="select"
        v-model="searchQuery.type"
        placeholder="Full-Time"
        class="qh-text-4 capitalize md:min-w-40"
        :options="jobTypes"
        clearable
      />
      <qh-input
        name="experience_level"
        type="select"
        placeholder="Mid Level"
        class="capitalize md:min-w-40"
        tagPlaceholder="Search"
        v-model="searchQuery.level"
        :options="experienceLevels"
        clearable
      />
      <qh-button
        class="qh-flex-center hidden h-[42px] md:flex md:min-w-40"
        label="Search"
        @click="searchJob"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftCircleIcon, ArrowRightIcon } from '@heroicons/vue/24/solid';
import { QH_ROUTES } from '~/constants/routes';
import { useJobStore } from '~/store/job-store';
import { jobQuery } from './job-types';

const { searchQuery } = storeToRefs(useJobStore());
const { getAllJobs, getMatchedJobs } = useJobStore();
const searchItem = ref('');
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

const route = useRoute();
const router = useRouter();

const searchJob = () => {
  router.replace({ name: QH_ROUTES.JOB.ALL, query: searchQuery.value });
  getMatchedJobs();
};

const getAllJob = () => {
  router.replace({ name: QH_ROUTES.JOB.ALL });
  searchQuery.value.title = '';
  getAllJobs();
};
</script>

<style lang="scss" scoped></style>
