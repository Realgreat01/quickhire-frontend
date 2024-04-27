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
            v-model="experienceDetail.role"
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
            v-model="experienceDetail.company"
            :rules="ValidationRules.experience.company"
            required
          />
          <qh-input
            label="Company Location"
            type="text"
            name="company_location"
            class="qh-full-width"
            placeholder="Lagos, Nigeria"
            v-model="experienceDetail.company"
            :rules="ValidationRules.experience.company"
            required
          />

          <qh-input
            label="Job Location Type"
            type="select"
            name="role"
            class="qh-full-width"
            placeholder="Remote"
            :options="locationTypes"
            v-model="experienceDetail.role"
            required
          />
          <qh-input
            label="Job Type"
            type="select"
            name="role"
            class="qh-full-width"
            :options="jobTypes"
            placeholder="Full-Time"
            v-model="experienceDetail.role"
            :rules="ValidationRules.experience.role"
            hint="e.g. Frontend Developer"
            required
          />

          <qh-input
            label="Start Date"
            type="date"
            name="startDate"
            :placeholder="qhDates.formatDate(new Date('12 04 2020'))"
            v-model="experienceDetail.startDate"
            required
          />

          <qh-input
            label="End Date"
            type="date"
            name="endDate"
            v-model="experienceDetail.endDate"
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
            v-model="experienceDetail.contributions"
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
import { ADD_USER_EXPERIENCE } from '~/services/user.service';
import type { Experience } from '~/types';
import { Form as VeeForm } from 'vee-validate';
import { ValidationRules } from '~/constants/validation-rules';

import { useUserStore } from '~/store/user-store';

const { getExperiences } = useUserStore();

const checkBox = ref();

const experienceDetail = ref<Experience | any>({
  startDate: '',
  endDate: null,
  role: '',
});
const buttonClick = () => console.log('button is clicked');
const jobTypes = ref([
  'Full-Time',
  'Part-Time',
  'Self Employed',
  'Freelance',
  'Contract',
  'Internship',
  'Voluntary',
]);
const locationTypes = ref(['Onsite', 'Remote', 'Hybrid']);

const submitExperience = async (field: any) => {
  const response = await ADD_USER_EXPERIENCE({
    ...field,
    startDate: experienceDetail.value.startDate,
    endDate: experienceDetail.value.endDate,
    contributions: experienceDetail.value.contributions,
  });
  if (response.success) {
    qhToast.success('Education added successfully');
    await getExperiences();
    qhCloseModal();
  } else qhToast.error(response.message);
};
</script>
