<template>
  <div class="h-screen">
    <div class="relative grid gap-4 md:grid-cols-[1fr,4fr]">
      <LayoutsSidebar
        class="sticky bottom-0 top-0 hidden overflow-y-scroll border-r-2 border-dark-100 md:block"
      />
      <div class="sticky bottom-0 top-0">
        <LayoutsNavbar class="sticky top-0 z-10" />

        <NuxtPage class="scroll overflow-y-scroll bg-white p-3 md:p-4" />
      </div>
    </div>

    <forms-profile v-if="modalController.profile" @close="closeModal" />
    <forms-about v-if="modalController.about" @close="closeModal" />
    <forms-skills v-if="modalController.skills" @close="closeModal" />
    <forms-projects v-if="modalController.projects" @close="closeModal" />
    <forms-experience v-if="modalController.experience" @close="closeModal" />
    <forms-education v-if="modalController.education" @close="closeModal" />
    <forms-contact v-if="modalController.contact" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '~/store/user-store';
import { useJobStore } from '~/store/job-store';
import { useModalStore } from '~/store/modal-store';
import { QH_ROUTES } from '~/constants/routes';

const { getCurrentUser, getProjects, getExperiences, getEducation, getSkills } =
  useUserStore();

const { getAllJobs } = useJobStore();

const route = useRoute();
const router = useRouter();

const closeModal = () => {
  router.replace({});
};

const modalController = computed(() => {
  return {
    profile:
      route.query.add === QH_ROUTES.USER.DETAILS ||
      route.query.edit === QH_ROUTES.USER.DETAILS,
    about:
      route.query.add === QH_ROUTES.USER.ABOUT ||
      route.query.edit === QH_ROUTES.USER.ABOUT,
    skills:
      route.query.add === QH_ROUTES.USER.SKILLS ||
      route.query.edit === QH_ROUTES.USER.SKILLS,
    projects:
      route.query.add === QH_ROUTES.USER.PROJECTS ||
      route.query.edit === QH_ROUTES.USER.PROJECTS,
    experience:
      route.query.add === QH_ROUTES.USER.EXPERIENCE ||
      route.query.edit === QH_ROUTES.USER.EXPERIENCE,
    education:
      route.query.add === QH_ROUTES.USER.EDUCATION ||
      route.query.edit === QH_ROUTES.USER.EDUCATION,
    contact:
      route.query.add === QH_ROUTES.USER.CONTACT ||
      route.query.edit === QH_ROUTES.USER.CONTACT,
  };
});

onBeforeMount(() => {
  getCurrentUser();
  getProjects();
  getExperiences();
  getEducation();
  getAllJobs();
  getSkills();
});
</script>

<style scoped></style>
