<template>
  <div class="mb-4 flex h-40 flex-col justify-between gap-1 bg-brand-100 p-0">
    <div class="mx-2 flex items-center justify-between md:mx-6">
      <h1
        class="qh-text-1 font-bebas flex w-fit items-center justify-center gap-x-6 p-4 font-bold text-success-600"
      >
        <span class="block">JOB BOARD</span>
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
      class="mx-auto flex w-full items-center gap-x-2 justify-self-end border-b border-brand-300 bg-white p-2"
    >
      <qh-input
        name="title"
        type="search"
        class="flex-1 capitalize"
        v-model="searchQuery.title"
        placeholder="frontend developer"
      />
      <qh-input
        name="job_location_type"
        type="select"
        v-model="searchQuery.location"
        class="min-w-40 capitalize"
        placeholder="Onsite"
        :options="jobLocationTypes"
        clearable
      />
      <qh-input
        name="job_type"
        type="select"
        v-model="searchQuery.type"
        placeholder="Full-Time"
        class="min-w-40 capitalize"
        :options="jobTypes"
        clearable
      />
      <qh-input
        name="experience_level"
        type="select"
        placeholder="Mid Level"
        class="min-w-40 capitalize"
        v-model="searchQuery.level"
        :options="experienceLevels"
        clearable
      />
      <qh-button class="h-[42px] min-w-40" label="Search" @click="searchJob" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftCircleIcon } from '@heroicons/vue/24/solid';
import { QH_ROUTES } from '~/constants/routes';
import { useJobStore } from '~/store/job-store';

const { searchQuery } = storeToRefs(useJobStore());
const { getAllJobs, getMatchedJobs } = useJobStore();
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
onMounted(() => {
  searchQuery.value = {
    title: '',
    location: '',
    type: '',
    level: '',
  };
});

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

<style lang="scss" scoped></style>
