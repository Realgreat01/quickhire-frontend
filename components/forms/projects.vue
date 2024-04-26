<template>
  <qh-container @close="$emit('close')" title="Projects">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-4 w-full p-2"
        @submit.prevent="handleSubmit($event, submitProject)"
      >
        <div class="grid grid-cols-2 gap-4">
          <qh-input
            v-for="(project, index) in projects"
            :key="index"
            :errors="errors"
            v-bind="project"
            v-model="projectDetails[project.name]"
          />
        </div>

        <qh-button
          type="submit"
          class="mt-4 w-full"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>
  </qh-container>
</template>

<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate';
import { ValidationRules } from '~/constants/validation-rules';
import { allTools } from '~/constants/skills';

import type { Projects } from '~/types';
import { ADD_USER_PROJECTS } from '~/services/user.service';

import { useUserStore } from '~/store/user-store';

const { getProjects } = useUserStore();
const emit = defineEmits(['close']);

const projectDetails: Projects | any = ref({
  projectTools: [],
  projectDescription: '',
  projectLesson: '',
});

const projects = ref([
  {
    label: 'Title',
    name: 'projectName',
    class: 'qh-full-width',
    required: true,
    rules: ValidationRules.project.title,
    as: 'input',
  },
  {
    label: 'Preview URL',
    name: 'previewLink',
    required: true,
    rules: ValidationRules.project.previewURL,
    as: 'input',
  },
  {
    label: 'Repository URL',
    name: 'githubRepo',
    required: true,
    rules: ValidationRules.project.repositoryURL,
    as: 'input',
  },
  {
    label: 'tools',
    name: 'projectTools',
    type: 'select',
    class: 'qh-full-width',
    required: true,
    clearable: false,
    multiple: true,
    labelName: 'name',
    noDataMessage: 'No other skills',
    hint: 'The stacks used in this project, use the support menu if a stack is not listed to suggest them to us.',
    options: allTools.value,
  },
  {
    label: 'Description',
    name: 'projectDescription',
    type: 'editor',
    required: true,
    hint: 'Describe what your project does, the problem it solves.',
    class: 'qh-full-width',
  },
  {
    label: 'Motivations',
    name: 'projectLesson',
    type: 'editor',
    hint: 'Describe challenges faced and how you overcome them. The lessons learnt and the motivations and other factors surrounding the project that you wish to share.',
    class: 'qh-full-width',
  },
]);

const submitProject = async (field: any) => {
  const response = await ADD_USER_PROJECTS({
    ...field,
    projectTools: projectDetails.value.projectTools,
    projectDescription: projectDetails.value.projectDescription,
    projectLesson: projectDetails.value.projectLesson,
  });

  if (response.success) {
    qhToast.success('Project submitted successfully');
    await getProjects();
    qhCloseModal();
  } else qhToast.error(response.message);
};
</script>
