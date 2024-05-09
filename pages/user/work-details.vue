<template>
  <div>
    <qh-card class="flex flex-col gap-4">
      <div class="flex items-center gap-x-20">
        <h2 class="qh-text-3 w-60 font-medium">Experience Level</h2>
        <qh-input
          name="experience_level"
          type="select"
          class="w-64"
          label-name="label"
          :options="experienceLevels"
        />
      </div>
      <div class="flex items-center gap-x-20">
        <h2 class="qh-text-3 w-60 font-medium">Rate per Hour</h2>
        <qh-input name="experience_level" class="w-64" type="currency" />
      </div>

      <div class="flex items-center gap-x-20">
        <h2 class="qh-text-3 w-60 font-medium">Highest Education Level</h2>
        <qh-input
          name="experience_level"
          type="select"
          class="w-64"
          :options="educationLevels"
        />
      </div>

      <div class="flex items-center gap-x-20">
        <h2 class="qh-text-3 w-60 font-medium">Job Interests</h2>
        <qh-input
          name="experience_level"
          type="select"
          class="w-64 capitalize"
          placeholder="Remote"
          :options="['onsite', 'remote', 'hybrid']"
        />
      </div>

      <qh-button class="my-4 w-60 rounded-full !py-3">Save Changes</qh-button>
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
const { basicDetails: user } = storeToRefs(useUserStore());
const modalStore = useModalStore();

const experienceLevels = ref([
  { label: 'Entry Level', value: 'entry' },
  { label: 'Mid Level', value: 'mid' },
  { label: 'Senior Level', value: 'senior' },
]);
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
  highest_education_level: educationLevels.value[0],
  job_interest: 'mid',
});
</script>

<style scoped></style>
