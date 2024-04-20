<template>
  <div class="flex flex-wrap gap-6 rounded">
    <div class="m-4 flex flex-wrap gap-6 rounded">
      <div
        v-for="(experience, index) in experiences"
        :key="index"
        class="flex h-fit w-80 flex-col gap-y-2 rounded-2xl bg-brand-50 p-4 shadow-xl"
      >
        <h1 class="text-lg font-bold text-brand">{{ experience.company }}</h1>
        <h1 class="font-bold text-brand">{{ experience.role }}</h1>
        <h1 class="text-sm font-bold text-brand">
          <span class="">{{
            new Date(experience.startDate).toDateString()
          }}</span>
          -
          <span class="">{{
            new Date(experience.endDate).toDateString()
          }}</span>
        </h1>

        <h2 class="font-bold text-brand">Contributions</h2>
        <div
          v-for="(contribution, index) in experience.contributions"
          :key="index"
          class="flex gap-x-2"
        >
          <span
            class="block h-7 w-7 items-center justify-center rounded-[50%] bg-brand p-2 text-sm"
            >{{ index + 1 }}</span
          >
          <span class="block"> {{ contribution }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RiWebhookFill, RiGithubFill, RiGlobalLine } from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { useUserStore } from '~/store/user-store';

definePageMeta({
  layout: 'users',
  middleware: 'auth',
  name: QH_CONSTANTS.EXPERIENCE,
});

useHead({
  title: 'QuickHire - Projects',
});

const { experiences } = useUserStore();
</script>

<style scoped></style>
