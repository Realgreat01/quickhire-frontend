<template>
  <qh-container @close="$emit('close')" title="Experience">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-4 w-full"
        @submit.prevent="handleSubmit($event, createNewJob)"
      >
        <div class="grid grid-cols-2 gap-4">
          <qh-input
            label="Title"
            type="text"
            name="job_title"
            class="qh-full-width"
            v-model="jobDetail.job_title"
            :rules="ValidationRules.experience.role"
            placeholder="Frontend Developer"
            required
          />
          <qh-input
            label="Type"
            type="select"
            name=""
            class="qh-full-width"
            :options="jobTypes"
            placeholder="Full-Time"
            v-model="jobDetail.job_type"
            :rules="ValidationRules.experience.company"
            required
          />

          <qh-input
            label="Location"
            type="select"
            name="job_location_type"
            placeholder="Remote"
            :options="locationTypes"
            v-model="jobDetail.job_location_type"
            required
          />

          <qh-input
            label="Salary"
            type="currency"
            name="salary"
            placeholder="$50,000"
            :rules="ValidationRules.experience.company"
            required
          />

          <qh-input
            label="Closure Date"
            type="date"
            name="application_ends"
            v-model="jobDetail.application_ends"
            :placeholder="qhDates.formatDate(new Date('12 04 2020'))"
            required
          />

          <qh-input
            label="Job Duration"
            type="date"
            name="job_duration"
            v-model="jobDetail.job_duration"
            placeholder="6 Months"
            hint="Duration of job "
          />

          <qh-input
            label="Description"
            name="job_description"
            type="editor"
            v-model="jobDetail.job_description"
            hint="Your contributions to the team, kindly separate each with a paragraph"
            :rules="ValidationRules.experience.contributions"
            class="qh-full-width"
            required
          />
        </div>
        <qh-button
          type="submit"
          class="mt-4 h-10 w-full p-1"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>
  </qh-container>
</template>

<script setup lang="ts">
import type { Experience } from '~/types';
import { Form as VeeForm } from 'vee-validate';

import { CREATE_NEW_JOB } from '~/services/job';

const experienceDetail = ref<Experience | any>({});

const jobDetail = ref<any>({
  job_description: '',
  job_duration: '',
  job_type: '',
  job_location_type: '',
  job_title: '',
});

const jobTypes = ref([
  'Full-Time',
  'Part-Time',
  'Freelance',
  'Contract',
  'Internship',
]);
const locationTypes = ref(['Onsite', 'Remote', 'Hybrid']);

const createNewJob = async (field: any) => {
  const response = await CREATE_NEW_JOB({
    ...field,
    ...jobDetail.value,
  });
  if (response.success) {
    qhToast.success('Job posted successfully!');
    qhCloseModal();
  } else qhToast.error(response.message);
};
</script>
