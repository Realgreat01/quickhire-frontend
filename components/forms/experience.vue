<template>
  <qh-container @close="$emit('close')" title="Experience">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-4 w-full"
        @submit.prevent="handleSubmit($event, submitExperience)"
      >
        <div class="grid grid-cols-2 gap-4">
          <qh-input
            v-for="(experience, index) in experienceList"
            :key="index"
            v-model="experienceDetail[experience.name]"
            v-bind="experience"
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

const experienceList = ref([
  {
    label: 'Company Name',
    type: 'text',
    name: 'company',
    class: 'qh-full-width',
    rules: ValidationRules.experience.company,
    required: true,
  },
  {
    label: 'Role / Position',
    type: 'text',
    name: 'role',
    class: 'qh-full-width',
    rules: ValidationRules.experience.role,
    hint: 'e.g  Frontend Developer',
    required: true,
  },
  {
    label: 'Start Date',
    type: 'date',
    name: 'startDate',
    required: true,
  },
  {
    label: 'End Date',
    type: 'date',
    name: 'endDate',
    hint: 'Leave blank if you still work there ',
  },
  {
    label: 'Contributions',
    name: 'contributions',
    hint: 'Your contributions to the team, kindly separate each with a paragraph',
    type: 'editor',
    rules: ValidationRules.experience.contributions,
    class: 'qh-full-width',
    required: true,
  },
]);

const experienceDetail = ref<Experience | any>({
  startDate: '',
  endDate: null,
  role: '',
});

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
