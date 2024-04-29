<template>
  <div class="h-screen">
    <div class="relative grid gap-4 md:grid-cols-[1fr,4fr]">
      <LayoutsSidebar
        class="sticky bottom-0 top-0 hidden overflow-y-scroll md:block"
      />
      <div class="sticky bottom-0 top-0">
        <LayoutsNavbar class="sticky top-0 z-10" />

        <NuxtPage
          class="scroll overflow-y-scroll bg-dark-50 md:bg-white md:p-4"
        />
      </div>
    </div>
    <forms-profile v-if="modalController.profile" @close="closeModal" />
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
import { QH_ROUTES } from '~/constants/routes';

const { getBasicDetails, getProjects, getExperiences, getEducation } =
  useUserStore();
const { getAllJobs } = useJobStore();

const route = useRoute();
const router = useRouter();

const closeModal = () => {
  router.replace({});
};

const modalController = computed(() => {
  return {
    profile: route.query.add === QH_ROUTES.USER.DETAILS,
    projects: route.query.add === QH_ROUTES.USER.PROJECTS,
    experience: route.query.add === QH_ROUTES.USER.EXPERIENCE,
    education: route.query.add === QH_ROUTES.USER.EDUCATION,
    contact: route.query.add === QH_ROUTES.USER.CONTACT,
  };
});

onBeforeMount(() => {
  getBasicDetails();
  getProjects();
  getExperiences();
  getEducation();
  getAllJobs();
});
</script>

<style scoped></style>
