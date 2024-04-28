<template>
  <div>
    <RouterLink :to="QH_ROUTES.JOB.ALL">
      <qh-button
        class="apply-button my-6 min-w-[40%] max-w-96 gap-x-6 rounded-full border border-brand bg-transparent font-medium !text-brand"
      >
        <span class="">See all Jobs</span>
        <ArrowRightCircleIcon
          class="apply-icon h-5 w-5 text-brand duration-500"
        />
      </qh-button>
    </RouterLink>
    <div class="flex flex-wrap gap-6 rounded">
      <div class="flex flex-wrap gap-6 rounded">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="bg-brand-background w flex w-80 flex-col justify-between gap-y-2 rounded-2xl bg-brand-50 p-4 shadow-xl"
        >
          <div class="flex flex-col gap-y-4 text-sm font-light text-dark">
            <h2 class="text-lg font-bold text-brand">
              {{ project.projectName }}
            </h2>
            <h2 class="">
              <p class="qh-test-3 font-semibold text-brand-800">Description</p>
              {{ project.projectDescription }}
            </h2>
            <h2 class="">
              <p class="qh-test-3 font-semibold text-brand-800">Lesson</p>
              {{ project.projectLesson }}
            </h2>
            <h2 class="">
              <p class="qh-test-3 font-semibold text-brand-800">Tools Used</p>
              <div class="flex flex-wrap gap-2">
                <qh-button
                  :label="tool.name"
                  class="border !border-brand-600 !bg-transparent !text-brand-600"
                  v-for="(tool, index) in project.projectTools"
                  :key="index"
                />
              </div>
            </h2>
          </div>
          <div class="flex justify-between">
            <a :href="project.githubRepo">
              <RiGlobalLine class="h-7 w-7 fill-brand" />
            </a>
            <a :href="project.previewLink">
              <RiGithubFill class="h-7 w-7 fill-brand" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightCircleIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { RiWebhookFill, RiGithubFill, RiGlobalLine } from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';

definePageMeta({
  layout: 'users',
  middleware: 'auth',
  name: QH_CONSTANTS.JOBS,
});

useHead({
  title: 'QuickHire - Projects',
});

const { projects } = storeToRefs(useUserStore());
</script>

<style scoped></style>
