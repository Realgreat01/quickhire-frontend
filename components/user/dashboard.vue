<template>
  <div class="mx-auto bg-white p-5 md:w-[90%]">
    <!--  -->
    <div class="flex items-start justify-between">
      <div class="">
        <h1
          class="qh-text-2 text-stroke font-geologica font-bold capitalize text-brand"
        >
          {{ fullname }}
        </h1>
        <h1 class="qh-text-4 font-medium capitalize">
          {{ stacks?.stack }}
        </h1>
      </div>
      <qh-button
        class="qh-text-4 my-4 h-8 w-40 rounded-full md:h-12 md:w-80"
        @click="generatePDFTemplate"
        >Download Resume</qh-button
      >
    </div>
    <div class="block">
      <img
        :src="basicDetails?.profile_picture"
        alt=""
        class="block w-36 rounded-[50%] border-4 border-brand"
      />
    </div>
  </div>

  <div class="">
    <h2
      class="font-geologica text-stroke qh-text-2 font-bold uppercase text-brand"
    >
      ABOUT ME
    </h2>
    <p class="">
      With three years of professional experience in full-stack development, I
      specialize in creating dynamic and scalable web applications using Node.js
      and Vue.js. My expertise lies in efficiently building server-side
      applications with Node.js and designing responsive front-end user
      interfaces with Vue.js.
      <br />
      <br />
      Throughout my career, I have contributed to various projects that required
      a deep understanding of both front-end and back-end technologies, ensuring
      seamless integration and functionality. My approach to software
      development is rooted in best practices for code quality, security, and
      performance optimization.
      <br />
      <br />
      I am adept at working within agile environments, collaborating closely
      with team members to drive projects from conception to deployment,
      consistently meeting deadlines and exceeding client expectations. My
      passion for technology and commitment to continuous learning have equipped
      me with the tools to adapt and excel in the ever-evolving landscape of web
      development.
    </p>
  </div>

  <!--  -->
  <div class="mt-8 w-full">
    <h2
      class="font-geologica text-stroke qh-text-2 mb-2 font-bold uppercase text-brand"
    >
      STACKS
    </h2>
    <div class="grid gap-x-10 gap-y-4 md:grid-cols-1">
      <div>
        <qh-card class="my-2">
          <h1 class="my-2 font-bold text-error-600">Top Skills</h1>
          <div class="flex flex-wrap">
            <qh-devicon
              v-for="(skill, index) in stacks?.top_skills"
              :key="index"
              :icon="skill"
              class="colored p-2 text-3xl"
            />
          </div>
        </qh-card>
        <qh-card class="p-4">
          <h1 class="my-2 font-bold text-error-600">Programming Languages</h1>
          <div class="flex flex-wrap">
            <qh-devicon
              v-for="(language, index) in stacks?.programming_languages"
              :key="index"
              :icon="language"
              class="colored p-2 text-3xl"
            ></qh-devicon>
          </div>
        </qh-card>

        <qh-card class="p-4">
          <h1 class="my-2 font-bold text-error-600">
            Framworks and Technologies
          </h1>
          <div class="flex flex-wrap">
            <qh-devicon
              v-for="(framework, index) in stacks?.frameworks"
              :key="index"
              :icon="framework"
              class="colored p-2 text-3xl"
            ></qh-devicon>
          </div>
        </qh-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
import { generatePDFTemplate } from '~/utils/pdf/generators/';

const { fullname, stacks, basicDetails } = storeToRefs(useUserStore());
</script>

<style scoped></style>
