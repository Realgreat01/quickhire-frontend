<template>
  <div class="flex flex-wrap gap-6 rounded">
    <div class="flex flex-wrap gap-6 rounded">
      <qh-card
        v-for="(experience, index) in experiences"
        :key="index"
        class="flex flex-col justify-between gap-4 rounded-2xl p-4 shadow-xl md:w-4/5"
      >
        <div class="">
          <RiBuildingFill class="icon h-6 w-6" />
          <h1 class="qh-text-2 font-bold text-brand">
            {{ experience.company }}
          </h1>
        </div>

        <div class="flex">
          <RiMapPinFill class="icon h-6 w-6" />
          <h1 class="font-bold text-brand">Nigeria</h1>
        </div>
        <div class="flex">
          <RiGlobeFill class="icon h-6 w-6" />
          <h1 class="font-bold text-brand">Remote</h1>
        </div>
        <div class="flex">
          <RiToolsFill class="icon h-6 w-6" />
          <h1 class="font-bold text-brand">{{ experience.role }}</h1>
        </div>

        <div class="flex">
          <RiCalendar2Fill class="icon h-6 w-6" />
          <h1 class="text-sm font-bold text-brand">
            <span class="">{{ formatDate(experience.startDate) }}</span>
            -
            <span class="">{{ formatDate(experience.endDate) }}</span>
          </h1>
        </div>

        <div class="">
          <RiFileListFill class="icon h-6 w-6" />

          <h2 class="" v-html="experience.contributions"></h2>
          <!-- <span class="block" v-html="experience.contributions"></span> -->
        </div>
      </qh-card>
    </div>
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
const { formatDate, getOrdinalDate, getReadableDate } = useDate();
import { storeToRefs } from 'pinia';
import { QH_ROUTES } from '~/constants/routes';
definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.EXPERIENCE,
});

useHead({
  title: 'QuickHire - Projects',
});

const { experiences } = storeToRefs(useUserStore());
</script>

<style scoped>
.icon {
  @apply mr-3 fill-brand-500;
}
</style>
