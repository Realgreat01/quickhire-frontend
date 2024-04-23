<template>
  <div class="flex flex-wrap gap-6 rounded">
    <div class="flex flex-wrap gap-6 rounded">
      <div
        class="flex h-40 w-2/3 flex-col justify-between rounded bg-brand-100 px-12 py-8"
        :class="index % 2 === 0 ? '' : 'justify-self-end'"
        v-for="(education, index) in educations"
        :key="index"
      >
        <h2 class="qh-text-3 font-semibold">{{ education.institution }}</h2>
        <h2 class="qh-text font-medium">{{ education.course }}</h2>
        <h2 class="text-brand-text text-sm font-thin">
          <span class="">{{ formatDate(education.entryDate) }}</span>
          -
          <span class="">{{ formatDate(education.graduationDate) }}</span>
        </h2>
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
  name: QH_CONSTANTS.EDUCATION,
});

useHead({
  title: 'QuickHire - Projects',
});

const { formatDate, formatISODate } = useDate();

const { educations } = storeToRefs(useUserStore());
</script>

<style scoped></style>
