<template>
  <qh-container @close="$emit('close')">
    <vee-form>
      <VeeForm class="mx-auto mt-10 w-full p-2" @submit.prevent="submitProject">
        <div class="grid grid-cols-2 gap-4">
          <qh-input
            v-for="(project, index) in projects"
            :key="index"
            class="mt-2"
            type="text"
            v-bind="project"
            v-model="projectDetails[project.name]"
            label-class="text-brand-900  !font-bold "
          />
        </div>

        <qh-button
          type="submit"
          label="Submit"
          class="mt-4 h-10 w-full p-1"
          @click="
            push.success({
              message: 'Your message has been successfully.',
            })
          "
        />
      </VeeForm>
    </vee-form>
  </qh-container>
</template>

<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate';

import type { Projects } from '~/types';

const emit = defineEmits(['close']);

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const projectDetails: Projects | any = ref({});

const projects = ref([
  {
    label: 'Title',
    name: 'projectName',
    class: 'qh-full-width',
    as: 'input',
  },
  {
    label: 'Preview URL',
    name: 'previewLink',
    as: 'input',
  },
  {
    label: 'Repository URL',
    name: 'githubRepo',
    as: 'input',
  },
  {
    label: 'Description',
    name: 'projectDescription',
    as: 'textarea',
  },
  {
    label: 'Motivations',
    name: 'projectLesson',
    as: 'textarea',
  },
]);

const submitProject = async () => {};
</script>
