<template>
  <div class="h-screen">
    <div class="relative grid gap-4 md:grid-cols-[1fr,4fr]">
      <LayoutsSidebar
        class="sticky bottom-0 top-0 hidden overflow-y-scroll md:block"
      />
      <div class="sticky bottom-0 top-0">
        <LayoutsNavbar class="sticky top-0 z-10" />

        <NuxtPage class="scroll overflow-y-scroll bg-white p-4" />
      </div>
    </div>
    <forms-profile v-if="modalController.profile" @close="closeModal" />
    <forms-projects v-if="modalController.projects" @close="closeModal" />
    <forms-experience v-if="modalController.experience" @close="closeModal" />
    <forms-education v-if="modalController.education" @close="closeModal" />
    <forms-contact v-if="modalController.contact" @close="closeModal" />
    <qh-modal
      v-if="showModal"
      @continue="modalStore.continue"
      @cancel="modalStore.cancel"
      @close="showModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import QH_CONSTANTS from '~/constants';

import { useUserStore } from '~/store/user-store';
import { useModalStore } from '~/store/modal-store';
import { storeToRefs } from 'pinia';
import { useJobStore } from '~/store/job-store';
const { getBasicDetails, getProjects, getExperiences, getEducation } =
  useUserStore();
const { getAllJobs } = useJobStore();
const { showModal } = storeToRefs(useModalStore());
const modalStore = useModalStore();

const route = useRoute();
const router = useRouter();

const closeModal = () => {
  router.replace({});
};

const modalController = computed(() => {
  return {
    profile: route.query.add === QH_CONSTANTS.DETAILS,
    projects: route.query.add === QH_CONSTANTS.PROJECTS,
    experience: route.query.add === QH_CONSTANTS.EXPERIENCE,
    education: route.query.add === QH_CONSTANTS.EDUCATION,
    contact: route.query.add === QH_CONSTANTS.CONTACT,
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
