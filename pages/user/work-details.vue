<template>
  <div>
    <qh-card class="flex flex-col gap-4 md:w-4/5">
      <div class="flex items-center justify-between gap-x-10">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Experience Level</h2>
        <qh-input
          name="experience_level"
          placeholder="Mid Level"
          type="select"
          class="!w-40 capitalize md:!w-64"
          label-name="label"
          :options="experienceLevels"
          v-model="workDetails.experience_level"
        />
      </div>
      <div class="flex items-center justify-between gap-x-10">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">
          Years of Experience
        </h2>
        <qh-input
          name="years_of_experience"
          placeholder="3 years"
          type="number"
          class="!w-40 capitalize md:!w-64"
          v-model="workDetails.years_of_experience"
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
          button-text="USD"
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

      <qh-button
        class="my-4 rounded-full !py-3 md:w-60"
        @click="updateUserWorkDetails"
        >Save Changes</qh-button
      >
    </qh-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
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
const { updateUserDetails } = useUserStore();
const modalStore = useModalStore();

const experienceLevels = ref([
  { label: 'Internships', value: 'internship' },
  { label: 'Entry Level / Graduate', value: 'entry' },
  { label: 'Junior Level ', value: 'junior' },
  { label: 'Mid Level', value: 'mid' },
  { label: 'Senior Level', value: 'senior' },
  { label: 'Expert Level', value: 'expert' },
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
  experience_level: experienceLevels.value.find(
    (exp) => exp.value === user.value?.experience_level,
  ),
  rate: user.value?.rate,
  availability: user.value?.availability,
  highest_education_level: user.value?.highest_education_level,
  job_interest: user.value?.job_interest,
  years_of_experience: user.value?.years_of_experience,
});

const updateUserWorkDetails = async () => {
  await updateUserDetails({
    ...workDetails.value,
    experience_level: workDetails.value.experience_level?.value,
  });
};
</script>

<style scoped></style>
