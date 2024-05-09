<template>
  <div class="bg-white">
    <div class="mx-auto bg-white p-5 md:w-[90%]">
      <div class="flex items-start justify-between">
        <div class="">
          <h1
            class="qh-text-1 text-stroke font-geologica font-bold capitalize text-brand"
          >
            {{ fullname }}
          </h1>
          <h1 class="qh-text-4 font-medium capitalize">
            {{ user?.header_bio }}
          </h1>
          <!-- <qh-button
            class="qh-text-4 my-4 h-8 w-40 rounded-full md:h-12 md:w-80"
            @click="generatePDFTemplate"
            label="Download Resume"
          /> -->
          <qh-resume-button
            class="qh-text-4 my-4 h-8 w-40 rounded-full md:h-12 md:w-80"
          />
        </div>
        <div class="relative block">
          <img
            :src="user?.profile_picture"
            alt=""
            class="block w-36 rounded-[50%] border-4 border-brand"
          />
          <qh-edit-button
            class="!left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 transform text-brand"
          />
        </div>
      </div>

      <div class="relative">
        <h2
          class="font-geologica text-stroke qh-text-2 relative flex items-center gap-x-12 font-bold uppercase text-brand"
        >
          ABOUT ME
          <qh-edit-button
            class="relative !top-0 text-dark"
            @click="editAbout"
          />
        </h2>
        <p class="" v-html="user?.about_me"></p>
      </div>

      <!-- 2 -->
      <div class="mt-8 w-full">
        <h2
          class="font-geologica text-stroke qh-text-2 relative mb-2 flex w-fit gap-x-12 font-bold uppercase text-brand"
        >
          <h2 class="">SKILLS</h2>
          <qh-edit-button
            class="relative !top-0 text-dark"
            @click="editSkills"
          />
        </h2>

        <div class="grid gap-x-10 gap-y-4 md:grid-cols-1">
          <div>
            <qh-card class="relative">
              <h1 class="my-2 font-bold text-error-400">Top Skills</h1>
              <div class="flex flex-wrap">
                <qh-devicon
                  v-for="(skill, index) in skills?.top_skills"
                  :key="index"
                  :icon="skill"
                  class="colored p-2 text-3xl"
                />
              </div>
            </qh-card>
            <qh-card class="relative my-4 p-4">
              <h1 class="my-2 font-bold text-error-400">
                Programming Languages
              </h1>
              <div class="flex flex-wrap">
                <qh-devicon
                  v-for="(language, index) in skills?.programming_languages"
                  :key="index"
                  :icon="language"
                  class="colored p-2 text-3xl"
                ></qh-devicon>
              </div>
            </qh-card>

            <qh-card class="relative p-4">
              <h1 class="my-2 font-bold text-error-400">
                Framworks and Technologies
              </h1>
              <div class="flex flex-wrap">
                <qh-devicon
                  v-for="(framework, index) in skills?.frameworks"
                  :key="index"
                  :icon="framework"
                  class="colored p-2 text-3xl"
                ></qh-devicon>
              </div>
            </qh-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';
import { generatePDFTemplate } from '~/utils/pdf/generators/';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.PROFILE,
});

useHead({
  title: 'QuickHire - Profile',
});

const router = useRouter();

const { fullname, skills, user } = storeToRefs(useUserStore());

const editAbout = () => {
  router.replace({ query: { edit: QH_ROUTES.USER.ABOUT } });
};

const editSkills = () => {
  router.replace({ query: { edit: QH_ROUTES.USER.SKILLS } });
};
</script>

<style scoped></style>
