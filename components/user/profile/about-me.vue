<template>
  <div class="relative grid w-full gap-2">
    <h2
      class="font-geologica text-stroke qh-text-2 relative flex items-center gap-x-12 pl-0 font-bold uppercase text-brand"
    >
      ABOUT ME
      <qh-edit-button class="relative !top-0 text-dark" @click="editAbout" />
    </h2>
    <qh-card class="qh-text-4 my-2 grid gap-2">
      <h2 class="qh-text-3 font-bold text-brand">Summary</h2>
      <p v-html="user?.summary" v-if="user?.summary"></p>
      <qh-empty-content
        v-else
        message="You have not added your about profile summary"
      />
    </qh-card>
    <qh-card class="qh-text-4 my-2 grid gap-2">
      <h2 class="qh-text-3 font-bold text-brand">Core Skills</h2>
      <p v-html="user?.profile_headline" v-if="user?.profile_headline"></p>
      <qh-empty-content
        v-else
        message="You have not added your about profile headline / core skills"
      />
    </qh-card>
    <qh-card class="qh-text-4 grid gap-2">
      <h2 class="qh-text-3 font-bold text-brand">About</h2>
      <p v-html="user?.about_me" v-if="user?.about_me"></p>
      <qh-empty-content
        v-else
        message="You have not added your about information"
      />
    </qh-card>
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
</script>

<style scoped></style>
