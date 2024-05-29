<template>
  <qh-container @close="$emit('close')" title="Projects">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-4 w-full p-2"
        @submit.prevent="handleSubmit($event, submitProject)"
      >
        <div class="grids flex grid-cols-2 flex-col gap-4">
          <qh-input
            label="Title"
            name="title"
            placeholder="Calculator App"
            class="qh-full-width"
            :required="true"
            :rules="ValidationRules.project.title"
            :errors="errors"
            v-model="project.title"
          />

          <qh-input
            label="Role"
            name="role"
            class="qh-full-width"
            :required="true"
            :rules="ValidationRules.project.role"
            :errors="errors"
            placeholder="owner"
            hint="Your role in the project e.g owner, participant, etc."
            v-model="project.role"
          />

          <qh-input
            label="Status"
            name="status"
            type="select"
            class="capitalize"
            :options="['completed', 'in progress', 'on hold']"
            v-model="project.status"
          />
          <qh-input
            label="Project Type"
            name="status"
            type="select"
            class="capitalize"
            :options="['commercial', 'academic', 'personal', 'open source']"
            v-model="project.project_type"
          />

          <qh-input
            label="Preview URL"
            name="preview_url"
            :required="true"
            hint="can be same as repository url"
            :rules="ValidationRules.project.previewURL"
            :errors="errors"
            v-model="project.preview_url"
          />

          <qh-input
            label="Repository URL"
            name="repository"
            :required="true"
            hint="only public repository should be added."
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
import { skillIcons } from '~/constants/skill';
import type { Projects } from '~/types/user';
import { ADD_USER_PROJECTS, EDIT_USER_PROJECTS } from '~/services/user.service';
import { useUserStore } from '~/store/user-store';

const emit = defineEmits(['close']);
const { getProjects } = useUserStore();
const { projects } = storeToRefs(useUserStore());
const route = useRoute();

const project: Projects | any = ref({
  title: '',
  role: '',
  status: '',
  project_type: '',
  description: '',
  motivations: '',
  tools_used: [],
});

// const submitProject = async (field: any) => {
//   const response = await ADD_USER_PROJECTS(project.value);

//   if (response.success) {
//     qhToast.success('Project submitted successfully');
//     await getProjects();
//     qhCloseModal();
//   } else qhToast.error(response.message);
// };

const submitProject = async (field: any) => {
  if (route.query.id && route.query.edit) {
    // Edit Project
    const response = await EDIT_USER_PROJECTS(
      project.value,
      route.query.id as string,
    );
    if (response.success) {
      qhToast.success('Project updated successfully');
    } else qhToast.error(response.message);
  } else {
    // Add New Project
    const response = await ADD_USER_PROJECTS(project.value);
    if (response.success) {
      qhToast.success('Project added successfully');
    } else qhToast.error(response.message);
  }
  await getProjects();
  qhCloseModal();
};

onMounted(() => {
  if (route.query.edit && route.query.id) {
    project.value = projects.value?.find(
      (project) => project._id === route.query.id,
    );
  }
});
</script>
