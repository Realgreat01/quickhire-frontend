<template>
  <qh-container @close="$emit('close')" title="education">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-4 w-full"
        @submit.prevent="handleSubmit($event, submitEducation)"
      >
        <div class="grid grid-cols-1 md:grid-cols-2">
          <qh-input
            v-for="(education, index) in educationList"
            :key="index"
            v-bind="education"
            v-model="educationDetail[education.name]"
            class="block w-full rounded bg-transparent p-2 text-white"
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
import {
  ADD_USER_EDUCATION,
  GET_USER_EDUCATION,
} from '~/services/user.service';
import { Form as VeeForm } from 'vee-validate';
import { ValidationRules } from '~/constants/validation-rules';
import type { Education } from '~/types';

const emit = defineEmits(['close']);

const educationList = ref([
  {
    label: 'Institution Name',
    name: 'institution',
    class: 'md:col-span-2',
    required: true,
    rules: ValidationRules.education.institutionName,
  },
  {
    label: 'Course of Study',
    name: 'course',
    type: 'text',
    class: 'md:col-span-2',
    required: true,
    rules: ValidationRules.education.courseOfStudy,
  },
  {
    label: 'Degree Type',
    name: 'E.g Bachelors',

    type: 'text',
    required: true,
    rules: ValidationRules.education.courseOfStudy,
  },
  {
    label: 'School Website',
    name: 'E.g Bachelors',
    type: 'text',
    rules: ValidationRules.education.courseOfStudy,
  },

  {
    label: 'Entry Date',
    name: 'entryDate',
    type: 'date',
    required: true,
    rules: ValidationRules.education.entryDate,
  },
  {
    label: 'Graduation Date',
    name: 'graduationDate',
    type: 'date',
    required: true,
    hint: 'Expected graduation date',
    rules: ValidationRules.education.graduationDate,
  },

  {
    label: 'Description',
    name: 'description',
    type: 'editor',
    class: 'md:col-span-2',
    rules: ValidationRules.education.courseOfStudy,
  },
]);
const educationDetail = ref<Education | any>({
  entryDate: '',
  graduationDate: '',
});

const submitEducation = async (field: any) => {
  console.log(field);
  const response = await ADD_USER_EDUCATION({
    ...field,
    entryDate: educationDetail.value.entryDate,
    graduationDate: educationDetail.value.graduationDate,
  });
  if (response.success) {
    qhToast.success('Education added successfully');
    await GET_USER_EDUCATION();
    qhCloseModal();
  } else qhToast.error(response.message);
};
</script>
