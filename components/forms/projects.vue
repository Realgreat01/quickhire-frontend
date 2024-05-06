<template>
  <qh-container @close="$emit('close')" title="Projects">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-4 w-full p-2"
        @submit.prevent="handleSubmit($event, submitProject)"
      >
        <div class="grid grid-cols-2 gap-4">
          <qh-input
            label="Title"
            name="title"
            class="qh-full-width"
            :required="true"
            :rules="ValidationRules.project.title"
            :errors="errors"
            v-model="project.title"
          />

          <qh-input
            label="Preview URL"
            name="preview_url"
            :required="true"
            :rules="ValidationRules.project.previewURL"
            :errors="errors"
            v-model="project.preview_url"
          />

          <qh-input
            label="Repository URL"
            name="repository"
            :required="true"
            :rules="ValidationRules.project.repositoryURL"
            :errors="errors"
            v-model="project.repository"
          />

          <qh-input
            label="tools"
            name="tools_used"
            type="select"
            class="qh-full-width"
            :clearable="false"
            :multiple="true"
            labelName="name"
            noDataMessage="No other skills"
            hint="The stacks used in this project, use the support menu if a stack is not listed to suggest them to us."
            :options="skillIcons"
            :required="true"
            v-model="project.tools_used"
          />
          <qh-input
            label="Description"
            name="description"
            type="editor"
            class="qh-full-width"
            :required="true"
            hint="Describe what your project does, the problem it solves."
            v-model="project.description"
          />
          <qh-input
            label="Motivations"
            name="motivations"
            type="editor"
            class="qh-full-width"
            :required="true"
            hint="Describe challenges faced and how you overcome them. The lessons learnt and the motivations and other factors surrounding the project that you wish to share."
            v-model="project.motivations"
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
import { skillIcons } from '~/constants/skill';

import type { Projects } from '~/types/user';
import { ADD_USER_PROJECTS } from '~/services/user.service';

import { useUserStore } from '~/store/user-store';

const { getProjects } = useUserStore();
const emit = defineEmits(['close']);

const project: Projects | any = ref({
  title: '',
  tools_used: [],
  description: '',
  motivations: '',
});

const submitProject = async (field: any) => {
  const response = await ADD_USER_PROJECTS({
    ...field,
    tools_used: project.value.tools_used,
    description: project.value.description,
    motivations: project.value.motivations,
  });

  if (response.success) {
    qhToast.success('Project submitted successfully');
    await getProjects();
    qhCloseModal();
  } else qhToast.error(response.message);
};
</script>
