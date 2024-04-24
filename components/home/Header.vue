<template>
  <div class="flex w-full items-center justify-between">
    <div class="qh-container">logo Here</div>
    <div class="flex">
      <qh-input
        label=""
        name=""
        placeholder="Search for jobs or talents"
        class="h-10 w-80 pl-8 placeholder:!font-light"
      />
      <qh-button
        class="!bg-transparent !font-medium !text-brand hover:!font-semibold hover:!text-brand-400"
        v-for="(nav, index) in headerNavigations"
        :key="index"
      >
        {{ nav.title }}
        <component :is="nav.icon"></component>
      </qh-button>
    </div>
    <RouterLink :to="QH_ROUTES.LOGIN">
      <qh-button label="Login" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';

const headerNavigations = ref([
  { title: 'About', icon: null },
  { title: 'Features', icon: null },
  { title: 'How it works', icon: null },
  { title: 'Faqs', icon: null },
  { title: 'Terms and Conditions', icon: null },
]);
</script>

<style scoped></style>
