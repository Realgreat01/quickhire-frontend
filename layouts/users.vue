<template>
  <div class="h-screen">
    <div class="relative grid gap-4 md:grid-cols-[1fr,4fr]">
      <LayoutsSidebar
        class="sticky bottom-0 top-0 hidden overflow-y-scroll border-r-2 border-dark-100 md:block"
      />
      <div class="sticky bottom-0 top-0">
        <LayoutsNavbar class="sticky top-0 z-10" />

        <NuxtPage class="scroll overflow-y-scroll pb-4 pl-2 md:p-4" />
      </div>
    </div>

    <forms-profile v-if="modalController.profile" @close="closeModal" />
    <forms-address v-if="modalController.address" @close="closeModal" />
    <forms-about v-if="modalController.about" @close="closeModal" />
    <forms-skills v-if="modalController.skills" @close="closeModal" />
    <forms-projects v-if="modalController.projects" @close="closeModal" />
    <forms-experience v-if="modalController.experience" @close="closeModal" />
    <forms-education v-if="modalController.education" @close="closeModal" />
    <forms-social-links
      v-if="modalController.socialLinks"
      @close="closeModal"
    />
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

const { getAllJobs, getAppliedJobs, getJobRecommendations } = useJobStore();

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
    address:
      route.query.add === QH_ROUTES.USER.ADDRESS ||
      route.query.edit === QH_ROUTES.USER.ADDRESS,
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
    socialLinks:
      route.query.add === QH_ROUTES.USER.SOCIAL_LINKS ||
      route.query.edit === QH_ROUTES.USER.SOCIAL_LINKS,
  };
});

onBeforeMount(async () => {
  await getCurrentUser();
  await getProjects();
  await getExperiences();
  await getEducation();
  await getAllJobs();
  await getSkills();
  await getAppliedJobs();
  await getJobRecommendations();
});
</script>

<style scoped></style>
