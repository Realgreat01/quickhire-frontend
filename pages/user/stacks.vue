<template>
  <div class="flex flex-wrap gap-6 rounded">
    <div class="flex flex-wrap gap-6 rounded">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="bg-brand-background w flex w-80 flex-col justify-between gap-y-2 rounded-2xl bg-brand-50 p-4 shadow-xl"
      >
        <div class="flex flex-col gap-y-4 text-sm font-light text-dark">
          <h2 class="text-lg font-bold text-brand">
            {{ project.title }}
          </h2>
          <h2 class="">
            <p class="qh-test-3 font-semibold text-brand-800">Description</p>
            {{ project.description }}
          </h2>
          <h2 class="">
            <p class="qh-test-3 font-semibold text-brand-800">Lesson</p>
            {{ project.motivations }}
          </h2>
          <h2 class="">
            <p class="qh-test-3 font-semibold text-brand-800">Tools Used</p>
            <div class="flex flex-wrap gap-2">
              <qh-button
                :label="tool.name"
                class="border !border-brand-600 !bg-transparent !text-brand-600"
                v-for="tool in project.tools_used"
                :key="tool.name"
              />
            </div>
          </h2>
        </div>
        <div class="flex justify-between">
          <a :href="project.preview_url">
            <RiGlobalLine class="h-7 w-7 fill-brand" />
          </a>
          <a :href="project.repository">
            <RiGithubFill class="h-7 w-7 fill-brand" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RiWebhookFill, RiGithubFill, RiGlobalLine } from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.STACKS,
});

useHead({
  title: 'QuickHire - Projects',
});

const { projects } = storeToRefs(useUserStore());
</script>

<style scoped></style>
