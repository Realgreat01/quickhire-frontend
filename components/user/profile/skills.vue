<template>
  <div class="relative grid w-full gap-2">
    <h2
      class="font-geologica text-stroke qh-text-2 relative flex items-center gap-x-12 pl-0 font-bold uppercase text-brand"
    >
      <h2 class="">SKILLS</h2>
      <qh-edit-button class="relative !top-0 text-dark" @click="editSkills" />
    </h2>

    <div class="flex w-full flex-col justify-between gap-y-4 md:gap-x-10">
      <qh-card class="!w-full">
        <h1 class="my-2 font-bold text-secondary-500">Top Skills</h1>
        <div class="flex w-full flex-wrap">
          <qh-devicon
            v-for="(skill, index) in skills?.top_skills"
            :key="index"
            :icon="skill"
            class="colored p-2 text-3xl"
          />
        </div>
      </qh-card>
      <qh-card>
        <h1 class="my-2 font-bold text-secondary-500">Programming Languages</h1>
        <div class="flex flex-wrap">
          <qh-devicon
            v-for="(language, index) in skills?.programming_languages"
            :key="index"
            :icon="language"
            class="colored p-2 text-3xl"
          ></qh-devicon>
        </div>
      </qh-card>

      <qh-card>
        <h1 class="my-2 font-bold text-secondary-500">
          Framworks and Technologies
        </h1>
        <div class="flex flex-wrap">
          <qh-devicon
            v-for="(framework, index) in frameworksAndTechnologies"
            :key="index"
            :icon="framework"
            class="colored p-2 text-3xl"
          ></qh-devicon>
        </div>
      </qh-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';
import { useUploadStore } from '~/store/upload-store';
const router = useRouter();
const { fullname, skills, user } = storeToRefs(useUserStore());
const { getCurrentUser } = useUserStore();

const editAbout = () => {
  router.replace({ query: { edit: QH_ROUTES.USER.ABOUT } });
};

const editSkills = () => {
  router.replace({ query: { edit: QH_ROUTES.USER.SKILLS } });
};

const frameworksAndTechnologies = computed(() =>
  qhHelpers.removeDuplicates(
    skills.value?.frameworks.concat(skills.value.technologies),
  ),
);
</script>

<style scoped></style>
