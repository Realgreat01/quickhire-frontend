<template>
  <div
    class="sticky top-0 z-[99] flex w-full items-center justify-between bg-dark-50"
  >
    <icons-logo class="text-brand" />
    <div class="qh-flex-center gap-x-4">
      <a
        :href="nav.link"
        class="flex !bg-transparent !font-medium !text-brand hover:!fill-brand-400 hover:!font-semibold hover:!text-brand-400"
        v-for="(nav, index) in headerNavigations"
        :key="index"
      >
        <component :is="nav.icon" class="mr-1 h-6 w-6"></component>
        <span class=""> {{ nav.title }}</span></a
      >
    </div>
    <div class="flex gap-x-4">
      <RouterLink :to="QH_ROUTES.LOGIN">
        <qh-button class="h-10 w-36 rounded-full font-medium" label="Login" />
      </RouterLink>
      <RouterLink :to="QH_ROUTES.REGISTER">
        <qh-button
          label="Create Account"
          class="h-10 w-36 rounded-full border border-brand bg-transparent font-medium !text-brand"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';

import {
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  ChatBubbleLeftIcon,
  StarIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/24/outline';

const headerNavigations = ref([
  { link: '#features', title: 'Features', icon: StarIcon },
  { link: '#insights', title: 'Insights', icon: ArrowTrendingUpIcon },
  { link: '#latest-jobs', title: 'Latest Jobs', icon: BriefcaseIcon },
  { link: '#testimonials', title: 'Testimonials', icon: ChatBubbleLeftIcon },
  { link: '#faqs', title: 'Faqs', icon: QuestionMarkCircleIcon },
]);
</script>

<style scoped></style>
