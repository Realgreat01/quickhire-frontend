<template>
  <div class="flex flex-col p-4 md:p-10" id="projects">
    <qh-section-title>Projects</qh-section-title>
    <div class="gap-small grid flex-wrap gap-4 md:grid-cols-3">
      <qh-card
        class="flex min-h-[30rem] w-full cursor-pointer flex-col overflow-y-hidden rounded-lg bg-white !p-0 shadow-sm hover:bg-slate-50"
        v-for="(project, index) in user?.projects"
        :key="index"
      >
        <img
          src="~/assets/images/office-image.jpg"
          alt=""
          class="mb-4 h-40 w-full object-cover"
        />
        <div class="p-6">
          <div class="qh-text-4 flex w-full items-center justify-between">
            <RiBox3Fill class="h-10 w-10 text-brand" />
            <div class="flex gap-x-4">
              <a :href="project.repository" class="" target="_blank">
                <RiGithubLine
                  class="h-6 w-6 cursor-pointer fill-brand hover:scale-[1.2] hover:text-brand-400"
                />
              </a>
              <a :href="project.preview_url" class="" target="_blank">
                <ArrowTopRightOnSquareIcon
                  class="h-6 w-6 cursor-pointer fill-brand hover:scale-[1.2] hover:text-brand-400"
                />
              </a>
            </div>
          </div>

          <h1 class="qh-text-2 my-4 font-semibold text-brand">
            {{ project.title }}
          </h1>
          <h1
            class="qh-text-4 mb-4 text-dark"
            v-html="project.description"
          ></h1>
          <h2 class="mt-auto font-medium text-error-600">Tools Used</h2>
          <div class="flex flex-wrap items-center gap-4 self-start">
            <qh-devicon
              class=""
              v-for="tool in project.tools_used"
              :key="tool.icon"
              :icon="tool"
              hide-tooltip
            >
            </qh-devicon>
          </div>
        </div>
      </qh-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
import { RiGithubLine, RiBox3Fill } from 'vue-remix-icons';
import { useUserStore } from '~/store/user-store';
const { publicUser: user } = storeToRefs(useUserStore());
</script>

<style scoped></style>
