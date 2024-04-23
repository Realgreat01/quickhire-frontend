<template>
  <div class="flex flex-wrap gap-6 rounded">
    <div class="flex flex-wrap gap-6 rounded">
      <div
        v-for="(experience, index) in experiences"
        :key="index"
        class="flex w-80 flex-col justify-between gap-y-2 rounded-2xl bg-brand-50 p-4 shadow-xl"
      >
        <div class="flex flex-col text-sm font-light text-dark">
          <h2 class="qh-text-4">Company:</h2>
          <h1 class="text-lg font-bold text-brand">{{ experience.company }}</h1>

          <h2 class="qh-text-4 mt-3">Role:</h2>
          <h1 class="font-bold text-brand">{{ experience.role }}</h1>

          <h2 class="qh-text-4 mt-3">Duration:</h2>
          <h1 class="text-sm font-bold text-brand">
            <span class="">{{ formatDate(experience.startDate) }}</span>
            -
            <span class="">{{ formatDate(experience.endDate) }}</span>
          </h1>

          <h2 class="qh-text-4 mt-3">Contributions:</h2>
          <span class="block" v-html="experience.contributions"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RiWebhookFill, RiGithubFill, RiGlobalLine } from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { useUserStore } from '~/store/user-store';
const { formatDate, getOrdinalDate, getReadableDate } = useDate();
import { storeToRefs } from 'pinia';
definePageMeta({
  layout: 'users',
  middleware: 'auth',
  name: QH_CONSTANTS.EXPERIENCE,
});

useHead({
  title: 'QuickHire - Projects',
});

const { experiences } = storeToRefs(useUserStore());
</script>

<style scoped></style>
