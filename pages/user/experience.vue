<template>
  <div class="flex flex-wrap gap-6 rounded">
    <qh-card
      v-for="(experience, index) in experiences"
      :key="index"
      class="relative flex w-full flex-col justify-between gap-2 rounded-2xl p-4 shadow-xl md:w-4/5"
    >
      <qh-edit-button class="text-dark" />
      <qh-delete-button
        class="top-12"
        @click="deleteUserExperience(experience._id)"
      />
      <div class="">
        <RiBuildingFill class="icon h-6 w-6" />
        <h1 class="qh-text-2 font-bold text-secondary-600">
          {{ experience.company }}
        </h1>
      </div>

      <div class="flex">
        <RiMapPinFill class="icon h-6 w-6" />
        <h1 class="font-medium text-brand">
          {{ experience.company_location }}
        </h1>
      </div>

      <div class="flex">
        <RiGlobeFill class="icon h-6 w-6" />
        <h1 class="font-medium capitalize text-brand">
          {{ experience.location_type }}
        </h1>
      </div>

      <div class="flex">
        <RiToolsFill class="icon h-6 w-6" />
        <h1 class="font-medium text-brand">{{ experience.role }}</h1>
      </div>

      <div class="flex">
        <RiBriefcaseFill class="icon h-6 w-6" />
        <h1 class="font-medium text-brand">{{ experience.job_type }}</h1>
      </div>

      <div class="flex">
        <RiCalendar2Fill class="icon h-6 w-6" />
        <h1 class="text-sm font-medium text-brand">
          <span class="">{{ qhDates.shortDate(experience.start_date) }}</span>
          -
          <span class="">{{ qhDates.shortDate(experience.end_date) }}</span>
        </h1>
      </div>

      <div class="">
        <RiFileListFill class="icon h-6 w-6" />

        <h2 class="" v-html="experience.contributions"></h2>
        <!-- <span class="block" v-html="experience.contributions"></span> -->
      </div>
    </qh-card>
  </div>
</template>

<script setup lang="ts">
import {
  RiBuildingFill,
  RiToolsFill,
  RiWebhookFill,
  RiMapPinFill,
  RiGlobeFill,
  RiGithubFill,
  RiCalendar2Fill,
  RiFileListFill,
  RiGlobalLine,
} from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { useUserStore } from '~/store/user-store';
import { useModalStore } from '~/store/modal-store';

import { storeToRefs } from 'pinia';
import { QH_ROUTES } from '~/constants/routes';
import { RiBriefcaseFill } from 'vue-remix-icons';
definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.EXPERIENCE,
});

useHead({
  title: 'QuickHire - Experience',
});

const { experiences } = storeToRefs(useUserStore());
const { deleteExperience } = useUserStore();
const modalStore = useModalStore();

const deleteUserExperience = async (id: string) => {
  const result = await modalStore.openModal();
  if (result) {
    await deleteExperience(id);
  }
};
</script>

<style scoped>
.icon {
  @apply mr-3 fill-brand-500;
}
</style>
