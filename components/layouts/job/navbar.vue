<template>
  <div
    class="flex flex-col justify-center gap-1 border-b-4 border-brand-100 bg-white md:h-[160px]"
  >
    <div class="mx-2 flex items-center justify-between px-4">
      <h1
        class="qh-text-1 font-geologica flex w-fit items-center justify-center gap-x-6 font-bold text-success-600"
      >
        <span class="font-bebas block text-success">JOB BOARD</span>
        <qh-button
          class="h-10 rounded-2xl !bg-transparent !px-0 !py-0"
          v-if="$route.name !== QH_ROUTES.JOB.ALL"
        >
          <RouterLink
            :to="{ name: QH_ROUTES.JOB.ALL }"
            class="flex gap-x-1 rounded-2xl border border-brand px-4 py-1"
          >
            <ArrowLeftCircleIcon class="h-5 w-5 text-brand" />
            <p class="font-poppins qh-text-4 font-normal text-dark">All Jobs</p>
          </RouterLink>
        </qh-button>
      </h1>
      <div class="qh-flex-center flex-col">
        <div
          class="qh-flex-center h-10 w-10 overflow-hidden rounded-full border-2 border-brand md:h-14 md:w-14"
        >
          <img
            :src="user?.profile_picture"
            @click="router.push({ name: QH_ROUTES.USER.PROFILE })"
            alt="profile picture"
            class="h-full w-full"
            v-if="isLoggedIn"
          />
          <RiHomeFill
            class="h-8 w-8 fill-brand"
            v-else
            @click="router.replace({ name: QH_ROUTES.USER.LOGIN })"
          />
        </div>
        <h2 class="text-sm font-medium">
          {{ isLoggedIn && user ? 'Profile' : 'Sign In' }}
        </h2>
      </div>
      <qh-dropdown class="z-10 md:hidden" :deactivateClick="true">
        <template #icon>
          <div class="qh-flex-center flex-col">
            <RiFilter3Line class="h-5 w-10 stroke-0 text-brand" />
            <span class="text-[10px]">Filter</span>
          </div>
        </template>
        <template v-slot="{ toggleDropdown }">
          <qh-card class="flex flex-col !gap-4"
            ><qh-input
              name="job_location_type"
              type="select"
              v-model="searchQuery.location"
              class="qh-text-4 w-64 capitalize placeholder:text-xs"
              placeholder="Onsite"
              :options="jobLocationTypes"
              clearable />
            <qh-input
              name="job_type"
              type="select"
              v-model="searchQuery.type"
              placeholder="Full-Time"
              class="qh-text-4 w-64 capitalize placeholder:text-xs"
              :options="jobTypes"
              clearable />
            <qh-input
              name="experience_level"
              type="select"
              placeholder="Mid Level"
              class="qh-text-4 w-64 capitalize placeholder:text-xs"
              tagPlaceholder="Search"
              v-model="searchQuery.level"
              :options="experienceLevels"
              clearable />
            <qh-button
              class="qh-flex-center !h-[42px] !rounded-lg"
              label="Search"
              @click="[searchJob, toggleDropdown()]" /></qh-card
        ></template>
      </qh-dropdown>
    </div>
    <qh-input
      name="key"
      type="select"
      class="qh-text-4 capitalize placeholder:text-xs md:hidden"
      placeholder="Software"
      :options="jobQuery"
      taggable
      tagPlaceholder="Search"
      v-model="searchQuery.title"
      @update:modelValue="searchJob"
    />
    <div
      class="mx-auto hidden w-full grid-cols-2 items-center gap-x-2 justify-self-end p-2 px-4 md:flex"
    >
      <qh-input
        name="key"
        type="select"
        class="qh-text-4 qh-full-width flex-1 capitalize placeholder:text-xs md:min-w-40"
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
        class="capitalize md:min-w-32"
        placeholder="Onsite"
        :options="jobLocationTypes"
        clearable
      />
      <qh-input
        name="job_type"
        type="select"
        v-model="searchQuery.type"
        placeholder="Full-Time"
        class="capitalize md:min-w-32"
        :options="jobTypes"
        clearable
      />
      <qh-input
        name="experience_level"
        type="select"
        placeholder="Mid Level"
        class="capitalize md:min-w-32"
        tagPlaceholder="Search"
        v-model="searchQuery.level"
        :options="experienceLevels"
        clearable
      />
      <qh-button
        class="qh-flex-center hidden !h-[42px] !w-fit !rounded-lg"
        label="Search"
        @click="searchJob"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftCircleIcon, ArrowRightIcon } from '@heroicons/vue/24/solid';
import { QH_ROUTES } from '~/constants/routes';
import QH_CONSTANTS from '~/constants';
import { useJobStore } from '~/store/job-store';
import { jobQuery } from './job-types';
import { useUserStore } from '~/store/user-store';
import { RiEqualizerLine, RiHomeFill, RiFilter3Line } from 'vue-remix-icons';

const { user } = storeToRefs(useUserStore());
const { searchQuery } = storeToRefs(useJobStore());
const { getAllJobs, getMatchedJobs } = useJobStore();
const isLoggedIn = ref(false);
const checkLoggedInStatus = () => {
  if (qhSecuredLS.get(QH_CONSTANTS.AUTH_TOKEN)) isLoggedIn.value = true;
  else isLoggedIn.value = false;
};
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

onMounted(() => {
  checkLoggedInStatus();
});
onUpdated(() => {
  checkLoggedInStatus();
});
</script>

<style lang="scss" scoped></style>
