<template>
  <div class="flex w-full items-center justify-between">
    <icons-logo class="text-brand" />
    <div class="flex">
      <qh-button
        class="!bg-transparent !font-medium !text-brand hover:!font-semibold hover:!text-brand-400"
        v-for="(nav, index) in headerNavigations"
        :key="index"
      >
        {{ nav.title }}
        <component :is="nav.icon"></component>
      </qh-button>
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

const headerNavigations = ref([
  { title: 'About', icon: null },
  { title: 'Features', icon: null },
  { title: 'How it works', icon: null },
  { title: 'Faqs', icon: null },
  { title: 'Terms and Conditions', icon: null },
]);
</script>

<style scoped></style>
