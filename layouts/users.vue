<template>
  <div class="">
    <div class="relative grid grid-cols-[1fr,4fr]">
      <LayoutsSidebar class="sticky bottom-0 top-0 overflow-y-scroll" />
      <div class="sticky bottom-0 top-0">
        <LayoutsNavbar class="sticky top-0 z-10" />
        <NuxtPage class="h-[80%] overflow-y-scroll" />
      </div>
    </div>
    <forms-profile
      v-if="route.query.add === QH_CONSTANTS.DETAILS"
      @close="closeModal"
    />
    <forms-projects
      v-if="route.query.add === QH_CONSTANTS.PROJECTS"
      @close="closeModal"
    />
    <forms-experience
      v-if="route.query.add === QH_CONSTANTS.EXPERIENCE"
      @close="closeModal"
    />
    <forms-education
      v-if="route.query.add === QH_CONSTANTS.EDUCATION"
      @close="closeModal"
    />
    <forms-contact
      v-if="route.query.add === QH_CONSTANTS.CONTACT"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '~/store/user-store';

import QH_CONSTANTS from '~/constants';

const { getBasicDetails, getProjects, getExperiences } = useUserStore();

const route = useRoute();
const router = useRouter();

const closeModal = () => {
  router.replace({});
};

onBeforeMount(() => {
  getBasicDetails();
  getProjects();
  getExperiences();
});
</script>

<style scoped></style>
