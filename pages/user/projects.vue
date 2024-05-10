<template>
  <div class="">
    <div class="flex flex-wrap gap-6 rounded">
      <qh-card
        v-for="(project, index) in projects"
        :key="index"
        class="relative flex w-full flex-col justify-between gap-y-4 rounded-2xl p-4 shadow-xl md:w-4/5"
      >
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
      </qh-card>
    </div>
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
} from 'vue-remix-icons';
import { skillIcons } from '~/constants/skill';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';
import { useModalStore } from '~/store/modal-store';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.PROJECTS,
});

useHead({
  title: 'QuickHire - Projects',
});

const router = useRouter();
const { projects } = storeToRefs(useUserStore());
const { deleteProject } = useUserStore();
const modalStore = useModalStore();

const editProject = (id: string) => {
  router.replace({ query: { edit: QH_ROUTES.USER.PROJECTS, id } });
};

const deleteUserProject = async (id: string) => {
  const result = await modalStore.openModal();
  if (result) {
    await deleteProject(id);
  }
};
</script>

<style scoped>
.icon {
  @apply mr-3 fill-brand text-brand;
}
</style>
