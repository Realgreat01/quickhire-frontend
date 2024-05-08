<template>
  <qh-container @close="$emit('close')" title="Experience">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-4 w-full"
        @submit.prevent="handleSubmit($event, submitExperience)"
      >
        <div class="grid grid-cols-2 gap-4">
          <qh-input
            label="Role / Position"
            type="text"
            name="role"
            class="qh-full-width"
            v-model="experience.role"
            :rules="ValidationRules.experience.role"
            placeholder="Frontend Developer"
            required
          />
          <qh-input
            label="Company Name"
            type="text"
            name="company"
            class="qh-full-width"
            placeholder="Flutterwave"
            v-model="experience.company"
            :rules="ValidationRules.experience.company"
            required
          />
          <qh-input
            label="Company Location"
            type="text"
            name="company_location"
            class="qh-full-width"
            placeholder="Lagos, Nigeria"
            v-model="experience.company_location"
            :rules="ValidationRules.experience.company_location"
            required
          />

          <qh-input
            label="Job Location Type"
            type="select"
            name="role"
            class="capitalize"
            placeholder="Remote"
            :options="['onsite', 'remote', 'hybrid']"
            v-model="experience.location_type"
            required
          />
          <qh-input
            label="Job Type"
            type="select"
            name="job_type"
            class="capitalize"
            :options="[
              'Full-Time',
              'Part-Time',
              'Temporary',
              'Contract',
              'Internship',
            ]"
            placeholder="Full-Time"
            v-model="experience.job_type"
            :rules="ValidationRules.experience.role"
            hint="e.g. Frontend Developer"
            required
          />

          <qh-input
            label="Start Date"
            type="date"
            name="start_date"
            :placeholder="qhDates.formatDate(new Date('12 04 2020'))"
            v-model="experience.start_date"
            required
          />

          <qh-input
            label="End Date"
            type="date"
            name="endDate"
            v-model="experience.end_date"
            v-model:checkbox="checkBox"
            checkboxText="Do you still work there ?"
            :disabled="checkBox"
            hasCheckbox
            :placeholder="qhDates.formatDate(new Date())"
          />

          <qh-input
            label="Contributions"
            name="contributions"
            type="editor"
            hint="Your contributions to the team, kindly separate each with a paragraph"
            v-model="experience.contributions"
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
import { ADD_USER_EXPERIENCE } from '~/services/user.service';
import type { Experience } from '~/types/user';
import { Form as VeeForm } from 'vee-validate';

import { useUserStore } from '~/store/user-store';
import Education from './education.vue';

const { getExperiences } = useUserStore();

const checkBox = ref();

const experience = ref<Experience | any>({
  company: '',
  company_location: '',
  contributions: '',
  start_date: '',
  end_date: null,
  role: '',
});

const submitExperience = async (field: any) => {
  const data = {
    ...experience.value,
    end_date: checkBox.value ? null : experience.value.end_date,
  };
  const response = await ADD_USER_EXPERIENCE(data);
  if (response.success) {
    qhToast.success('Education added successfully');
    await getExperiences();
    qhCloseModal();
  } else qhToast.error(response.message);
};
</script>
