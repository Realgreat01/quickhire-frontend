<template>
  <div>
    <qh-card class="flex flex-col gap-4 md:w-4/5">
      <div class="flex items-center justify-between gap-x-10">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Experience Level</h2>
        <qh-input
          name="experience_level"
          placeholder="Mid Level"
          type="select"
          class="!w-40 md:!w-64"
          label-name="label"
          :options="experienceLevels"
          v-model="workDetails.experience_level"
        />
      </div>
      <div class="flex items-center justify-between gap-x-10">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Availability</h2>
        <qh-input
          name="availability"
          placeholder="Immediately"
          type="select"
          class="w-30 capitalize md:w-64"
          :options="availability"
          v-model="workDetails.availability"
        />
      </div>
      <div class="flex items-center justify-between gap-x-10">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Rate per Hour</h2>
        <qh-input
          name="experience_level"
          placeholder="$50"
          class="!w-40 md:!w-64"
          type="currency"
          v-model="workDetails.rate"
        />
      </div>

      <div class="flex items-center justify-between gap-x-10">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">
          Highest Education Level
        </h2>
        <qh-input
          name="highest_education_level"
          placeholder="Bachelors"
          type="select"
          class="!w-40 md:!w-64"
          :options="educationLevels"
          v-model="workDetails.highest_education_level"
        />
      </div>

      <div class="flex items-center justify-between gap-x-10">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Job Interests</h2>
        <qh-input
          name="experience_level"
          type="select"
          placeholder="Remote"
          class="w-30 capitalize md:w-64"
          :options="['onsite', 'remote', 'hybrid']"
          v-model="workDetails.job_interest"
        />
      </div>

      <qh-button class="my-4 rounded-full !py-3 md:w-60" disabled
        >Save Changes</qh-button
      >
    </qh-card>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightCircleIcon } from '@heroicons/vue/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { RiWebhookFill, RiGithubFill, RiGlobalLine } from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';
import { useModalStore } from '~/store/modal-store';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.WORK_DETAILS,
});

useHead({
  title: 'QuickHire - Work Details',
});
const { user } = storeToRefs(useUserStore());
const modalStore = useModalStore();

const experienceLevels = ref([
  { label: 'Entry Level', value: 'entry' },
  { label: 'Mid Level', value: 'mid' },
  { label: 'Senior Level', value: 'senior' },
]);
const availability = [
  'immediately',
  '1 Week',
  '2 Weeks',
  '1 Month',
  'Not Available',
];
const educationLevels = ref([
  'Bachelors',
  'Masters',
  'Doctorate',
  'Elementary',
  'Diploma',
  'High School',
  'Certificate',
  'Associate Degree',
  'Professional Training',
]);

const workDetails = ref({
  experience_level: experienceLevels.value[0],
  rate: 10,
  availability: 'immediately',
  highest_education_level: educationLevels.value[0],
  job_interest: 'mid',
});
</script>

<style scoped></style>
