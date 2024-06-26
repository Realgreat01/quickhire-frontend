<template>
  <div class="flex flex-wrap gap-6 rounded" ref="draggable">
    <qh-card
      v-for="project in projects"
      :key="project._id"
      class="relative flex w-full flex-col justify-between gap-y-4 overflow-hidden rounded-2xl !p-0 shadow-xl md:w-4/5"
    >
      <img
        :src="project.screenshot"
        alt=""
        class="h-60 bg-cover object-cover object-top"
      />
      <qh-edit-button
        class="text-dark"
        @click="updateProjectScreenshot(project._id)"
      />
      <div class="relative flex flex-col gap-y-4 p-4">
        <qh-edit-button class="text-dark" @click="editProject(project._id)" />
        <qh-delete-button
          class="top-12"
          @click="deleteUserProject(project._id)"
        />
        <div class="my-4 font-light text-dark">
          <RiBox3Fill class="icon h-10 w-10 fill-brand" />
          <h1 class="qh-text-2 font-bold text-success-500">
            {{ project.title }}
          </h1>
        </div>

        <div class="flex">
          <RiBuilding2Fill class="icon h-6 w-6" />
          <h1 class="font-semibold capitalize text-brand">
            {{ project.status }}
          </h1>
        </div>

        <div class="flex">
          <RiUser2Fill class="icon h-6 w-6" />
          <h1 class="font-semibold capitalize text-brand">
            {{ project.role }}
          </h1>
        </div>

        <div class="flex w-fit justify-start gap-4 md:flex-row md:gap-x-10">
          <a
            :href="project.preview_url"
            class="flex h-8 w-fit items-center justify-start gap-x-2 rounded-full bg-brand-50 px-5 !text-brand"
          >
            <RiGlobalLine class="h-7 w-7 fill-brand" />
            <span class="">Preview</span>
          </a>
          <a
            :href="project.repository"
            class="flex h-8 w-fit items-center justify-start gap-x-2 rounded-full bg-brand-50 px-5 !text-brand"
          >
            <RiGithubFill class="h-7 w-7 fill-brand" />
            <span class="">Repository</span>
          </a>
        </div>

        <div class="md:w-3/5">
          <RiToolsFill class="icon h-6 w-6 fill-brand" />
          <p class="qh-test-3 font-semibold text-brand">Tools Used</p>
          <div class="flex flex-wrap gap-2">
            <qh-devicon
              :icon="tool"
              v-for="(tool, index) in project.tools_used"
              :key="index"
              class="colored text-2xl"
            ></qh-devicon>
          </div>
        </div>

        <div class="">
          <RiArticleFill class="icon h-6 w-6 fill-brand" />

          <p class="qh-test-3 font-semibold text-brand">Description</p>
          <h2 class="" v-html="project.description"></h2>

          <!-- <span v-html="project.projectDescription"></span> -->
        </div>

        <div class="">
          <RiLightbulbFlashFill class="icon h-6 w-6 fill-brand" />
          <p class="qh-test-3 font-semibold text-brand">Motivations</p>
          <h2 class="pr-6" v-html="project.motivations"></h2>
          <!-- <span v-html="project.projectLesson"></span> -->
        </div>
      </div>
    </qh-card>
  </div>
  <qh-button
    class="my-4 hidden rounded-full !py-3 md:w-60"
    @click="updateUserProject"
    v-if="projectList.length > 0"
    :loading="updating"
    >Save Changes</qh-button
  >
  <qh-empty-content
    v-if="!projects || projects.length <= 0"
    message="You have not added your projects"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  RiBox3Fill,
  RiGithubFill,
  RiGlobalLine,
  RiToolsFill,
  RiLightbulbFlashFill,
  RiArticleFill,
  RiUser2Fill,
  RiBuilding2Fill,
} from 'vue-remix-icons';

import { skillIcons } from '~/constants/skill';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';
import { useModalStore } from '~/store/modal-store';
import { UPDATE_PROJECT_SCREENSHOT } from '~/services/user.service';
import { useUploadStore } from '~/store/upload-store';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.PROJECTS,
});

useHead({
  title: 'QuickHire - Projects',
});

const router = useRouter();
const { projects, updating } = storeToRefs(useUserStore());
const uploadStore = useUploadStore();
const { deleteProject, updateUserDetails, getProjects } = useUserStore();
const modalStore = useModalStore();
const draggable = ref();
const projectList = ref<any>(projects.value);
// qhDraggable(draggable, projectList.value);

const editProject = (id: string) => {
  router.replace({ query: { edit: QH_ROUTES.USER.PROJECTS, id } });
};

const deleteUserProject = async (id: string) => {
  const result = await modalStore.openModal();
  if (result) {
    await deleteProject(id);
  }
};
const updateUserProject = async (id: string) => {
  await updateUserDetails({ projects: projectList.value });
};

const updateProjectScreenshot = async (id: string) => {
  try {
    const result = await uploadStore.openModal();
    if (result) {
      const formData = new FormData();
      formData.append('screenshot', result[0]);
      const res = await UPDATE_PROJECT_SCREENSHOT(id, formData);
      if (res.success) {
        getProjects();
        qhToast.success('update successful');
        uploadStore.uploadComplete();
      } else {
        qhToast.error('picture update failed');
        uploadStore.uploadFailed();
        updateProjectScreenshot(id);
      }
    }
  } catch (error) {
    console.log('user upload cancelled');
  }
};

watch(projects, (project) => (projectList.value = project));
</script>

<style scoped>
.icon {
  @apply mr-3 fill-brand text-brand;
}
</style>
