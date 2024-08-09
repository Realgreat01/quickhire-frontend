<template>
  <div class="flex md:gap-x-8">
    <div class="">
      <div class="flex flex-wrap gap-6 rounded" ref="draggable">
        <qh-card
          v-for="project in projects"
          :key="project._id"
          class="relative flex w-full flex-col justify-between gap-y-4 overflow-hidden rounded-2xl !p-0 shadow-xl"
        >
          <img
            v-if="!editting"
            :src="project.screenshot"
            alt=""
            class="h-60 bg-cover object-cover object-top"
          />
          <qh-edit-button
            class="text-dark"
            @click="updateProjectScreenshot(project._id)"
          />
          <div class="relative flex flex-col gap-y-4 p-4">
            <qh-edit-button
              class="text-dark"
              @click="editProject(project._id)"
            />
            <qh-delete-button
              class="top-12"
              @click="deleteUserProject(project._id)"
            />
            <div class="my-4 font-light text-dark">
              <RiBox3Fill class="icon h-10 w-10 fill-brand" />
              <h1 class="qh-text-2 font-bold text-secondary-500">
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
              <qh-button variant="light" class="!w-fit">
                <a :href="project.preview_url" class="flex gap-x-2">
                  <RiGlobalLine class="h-5 w-5 fill-brand" />
                  <span class="">Preview</span>
                </a></qh-button
              >
              <qh-button variant="light" class="!w-fit">
                <a :href="project.repository" class="flex gap-x-2">
                  <RiGithubFill class="h-5 w-5 fill-brand" />
                  <span class="">Repository</span>
                </a>
              </qh-button>
            </div>

            <div class="md:w-3/5" v-if="!editting">
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

            <div class="" v-if="!editting">
              <RiArticleFill class="icon h-6 w-6 fill-brand" />

              <p class="qh-test-3 font-semibold text-brand">Description</p>
              <h2 class="" v-html="project.description"></h2>

              <!-- <span v-html="project.projectDescription"></span> -->
            </div>

            <div class="" v-if="!editting">
              <RiLightbulbFlashFill class="icon h-6 w-6 fill-brand" />
              <p class="qh-test-3 font-semibold text-brand">Motivations</p>
              <h2 class="pr-6" v-html="project.motivations"></h2>
              <!-- <span v-html="project.projectLesson"></span> -->
            </div>
          </div>
        </qh-card>
      </div>
      <div class="mt-4 grid gap-4 gap-x-8 md:flex">
        <qh-button
          class="!h-12 !rounded-full duration-1000 md:!w-60"
          :class="editting ? '!bg-success-600' : ''"
          v-if="projects && projects.length > 0"
          :loading="updating"
        >
          <span class="w-full" @click="updateUserProject" v-if="editting"
            >Save Changes</span
          >
          <span class="w-full" v-else @click="startDrag">Edit Changes</span>
        </qh-button>

        <qh-button
          variant="outlined"
          class="!h-12 !rounded-full md:!w-60"
          @click="addProject"
          :disabled="updating"
        >
          <RiAddLine class="mr-4 h-6 w-6" />
          Add Projects</qh-button
        >
      </div>
    </div>
    <qh-empty-content
      v-if="!projects"
      message="You have not added your projects"
    />

    <qh-quick-ai />
  </div>
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
  RiAddLine,
} from 'vue-remix-icons';

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
const { projects, updating, Projects } = storeToRefs(useUserStore());
const uploadStore = useUploadStore();
const { deleteProject, updateUserDetails, getProjects } = useUserStore();
const modalStore = useModalStore();
const projectList = ref<any>(projects.value);
const draggable = ref<HTMLElement | undefined>();
const editting = ref(false);

const dragFunction = qhDraggable(draggable, ref(projectList.value).value);

const startDrag = () => {
  editting.value = true;
  projectList.value = Projects.value;
  dragFunction.start();
  qhToast.info({
    title: 'Edit Projects',
    message: 'Kindly drag your projects to reorder',
  });
};

const updateUserProject = async () => {
  editting.value = false;
  projectList.value = projects.value;
  dragFunction.pause();
  await updateUserDetails({ projects: projectList.value });
};

const editProject = (id: string) => {
  router.replace({ query: { edit: QH_ROUTES.USER.PROJECTS, id } });
};

const addProject = (id: string) => {
  router.replace({ query: { add: QH_ROUTES.USER.PROJECTS } });
};

const deleteUserProject = async (id: string) => {
  const result = await modalStore.openModal();
  if (result) {
    await deleteProject(id);
  }
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
onMounted(() => {
  dragFunction.destroy();
});

onUnmounted(() => {
  dragFunction.destroy();
});
</script>

<style scoped>
.icon {
  @apply mr-3 fill-brand text-brand;
}
</style>
