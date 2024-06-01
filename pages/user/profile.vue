<template>
  <div class="bg-white">
    <div class="mx-auto bg-white">
      <div
        class="mb-10 flex flex-col-reverse items-center justify-center rounded-2xl bg-brand-100 p-6 md:flex-row md:justify-between"
      >
        <div class="qh-flex-center flex-col md:block">
          <h1
            class="qh-text-1 text-stroke font-geologica font-bold capitalize text-brand"
          >
            {{ fullname }}
          </h1>
          <h1 class="qh-text-4 font-medium capitalize">
            {{ user?.header_bio }}
          </h1>

          <qh-resume-button
            :username="user?.username ?? ''"
            class="qh-text-4 my-4 h-8 w-40 rounded-full md:mt-10 md:h-12 md:w-80"
          />
        </div>
        <div class="relative block" v-if="user?.profile_picture">
          <img
            :src="user?.profile_picture"
            alt=""
            class="block h-36 max-w-36 rounded-[50%] border-4 border-brand"
          />
          <qh-edit-button
            @click="uploadProfilePicture"
            class="right-1 top-1 rounded-lg bg-brand fill-white p-1 text-white"
          />
          <!-- class="!left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 transform text-brand" -->
        </div>
      </div>

      <div class="my-20 grid gap-6 md:grid-cols-[3fr,2fr]">
        <div class="relative w-full">
          <h2
            class="font-geologica text-stroke qh-text-2 relative my-4 flex items-center gap-x-12 font-bold uppercase text-brand md:p-6"
          >
            ABOUT ME
            <qh-edit-button
              class="relative !top-0 text-dark"
              @click="editAbout"
            />
          </h2>
          <qh-card class="qh-text-4">
            <p v-html="user?.about_me" v-if="user?.about_me"></p>
            <qh-empty-content
              v-else
              message="You have not added your about information"
            />
          </qh-card>
        </div>

        <!-- 2 -->
        <div class="h-full w-full">
          <h2
            class="font-geologica text-stroke qh-text-2 relative my-4 flex w-full gap-x-12 font-bold uppercase text-brand md:p-6"
          >
            <h2 class="">SKILLS</h2>
            <qh-edit-button
              class="relative !top-0 text-dark"
              @click="editSkills"
            />
          </h2>

          <div class="flex w-full flex-col justify-between gap-y-4 md:gap-x-10">
            <qh-card class="!w-full">
              <h1 class="my-2 font-bold text-success-500">Top Skills</h1>
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
              <h1 class="my-2 font-bold text-success-500">
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

            <qh-card>
              <h1 class="my-2 font-bold text-success-500">
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
import { useUploadStore } from '~/store/upload-store';
import { UPDATE_USER_PROFILE_PICTURE } from '~/services/user.service';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.PROFILE,
});

useHead({
  title: 'QuickHire - Profile',
});

const router = useRouter();
const uploadStore = useUploadStore();
const { fullname, skills, user } = storeToRefs(useUserStore());
const { getCurrentUser } = useUserStore();

const editAbout = () => {
  router.replace({ query: { edit: QH_ROUTES.USER.ABOUT } });
};

const editSkills = () => {
  router.replace({ query: { edit: QH_ROUTES.USER.SKILLS } });
};

const uploadProfilePicture = async () => {
  try {
    const result = await uploadStore.openModal();
    if (result) {
      const formData = new FormData();
      formData.append('profile_picture', result[0]);
      const res = await UPDATE_USER_PROFILE_PICTURE(formData);
      if (res.success) {
        getCurrentUser();
        qhToast.success('update successful');
        uploadStore.uploadComplete();
      } else {
        qhToast.error('picture update failed');
        uploadStore.uploadFailed();
        uploadProfilePicture();
      }
    }
  } catch (error) {
    console.log('user upload cancelled');
  }
};
</script>

<style scoped></style>
