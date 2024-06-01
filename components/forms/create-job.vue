<template>
  <qh-container @close="$emit('close')" title="Job">
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
            :rules="ValidationRules.job.title"
            placeholder="Frontend Developer"
            required
          />
          <qh-input
            label="Type"
            type="select"
            name="type"
            class="qh-full-width"
            :options="jobTypes"
            placeholder="Full-Time"
            v-model="jobDetail.job_type"
            required
          />

          <qh-input
            label="Location"
            type="select"
            name="job_location_type"
            placeholder="Remote"
            class="capitalize"
            :options="locationTypes"
            v-model="jobDetail.job_location_type"
            required
          />

          <div class="grid grid-cols-2 items-end">
            <qh-input
              label="Salary"
              type="currency"
              name="salary_value"
              placeholder="50000"
              v-model="jobDetail.salary.value"
              :rules="ValidationRules.job.salaryValue"
              required
            />
            <qh-input
              name="currency"
              type="select"
              label=""
              v-model="jobDetail.salary.currency"
              disabled
              value="NGN"
              :options="['USD']"
            />
          </div>

          <div class="grid grid-cols-2 items-end">
            <qh-input
              label="Job Duration"
              type="number"
              name="job_duration"
              v-model="jobDetail.job_duration.value"
              :rules="ValidationRules.job.durationValue"
              placeholder="6 Months"
            />
            <qh-input
              name="val"
              label=""
              type="select"
              v-model="jobDetail.job_duration.date"
              class="capitalize"
              :options="['week', 'month', 'year']"
            />
          </div>

          <qh-input
            name="experience_level"
            placeholder="Mid Level"
            type="select"
            label="Experience Level"
            class="!w-40 capitalize md:!w-64"
            label-name="label"
            :options="experienceLevels"
            v-model="jobDetail.experience_level"
          />

          <qh-input
            label="Required Skills"
            type="select"
            name="programming_languages"
            placeholder="JavaScript"
            label-name="name"
            no-data-message="Kindly suggest such skill to us!"
            multiple
            class="qh-full-width w-full capitalize"
            :options="skillIcons"
            v-model="jobDetail.required_skills"
          />
          <qh-input
            label="Closure Date"
            type="date"
            name="application_ends"
            class="qh-full-width w-full capitalize"
            v-model="jobDetail.application_ends"
            :placeholder="qhDates.formatDate(new Date('12 04 2020'))"
            required
          />
          <qh-input
            label="Description"
            name="job_description"
            type="editor"
            v-model="jobDetail.job_description"
            hint="Your contributions to the team, kindly separate each with a paragraph"
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
import type { Experience } from '~/types/user';
import { Form as VeeForm } from 'vee-validate';

import { CREATE_NEW_JOB } from '~/services/job.service';
import { skillIcons } from '~/constants/skill';
import { useJobStore } from '~/store/job-store';
const { similarJobs } = storeToRefs(useJobStore());
const { getCompanyJobs } = useJobStore();

const jobDetail = ref<any>({
  job_title: '',
  job_description: '',
  job_duration: {
    date: 'month',
    value: 6,
  },
  salary: {
    value: 1000,
    currency: 'USD',
  },
  application_ends: null,
  job_type: 'Full-Time',
  job_location_type: 'remote',
  experience_level: null,
  required_skills: [],
});

const jobTypes = ref([
  'Full-Time',
  'Part-Time',
  'Freelance',
  'Contract',
  'Internship',
]);
const experienceLevels = ref([
  { label: 'Internships', value: 'internship' },
  { label: 'Entry Level / Graduate', value: 'entry' },
  { label: 'Junior Level ', value: 'junior' },
  { label: 'Mid Level', value: 'mid' },
  { label: 'Senior Level', value: 'senior' },
  { label: 'Expert Level', value: 'expert' },
]);
const locationTypes = ref(['Onsite', 'Remote', 'Hybrid']);

const createNewJob = async (field: any) => {
  const response = await CREATE_NEW_JOB({
    ...jobDetail.value,
    experience_level: jobDetail.value.experience_level.value,
  });
  if (response.success) {
    qhToast.success('Job posted successfully!');
    getCompanyJobs();
    qhCloseModal();
  } else qhToast.error(response.message);
};

//  applicants: Applicant[];
// job_title: string;
// job_description: string;
// job_type: JobType;
// posted_on: Date;
// application_ends?: Date | null;
// job_duration: JobDuration;
// job_location_type: JobLocationType;
// salary: Salary;
// job_status: 'open' | 'closed' | 'paused';
// experience_level: 'entry' | 'mid' | 'senior';
// required_skills: Skills[];
</script>
