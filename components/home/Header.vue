<template>
  <div class="flex w-full items-center justify-between">
    <div class="qh-container">logo Here</div>
    <div class="flex">
      <!-- <qh-button
        class="!bg-transparent !text-brand hover:!bg-brand hover:!text-white"
        v-for="(nav, index) in headerNavigations"
        :key="index">
        {{ nav.title }}
        <component :is="nav.icon"></component>
      </qh-button> -->
    </div>
    <RouterLink :to="ROUTES.LOGIN">
      <qh-button label="Login" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ROUTES } from '~/constants/routes';

// const headerNavigations = ref([
//   { title: 'About', icon: null },
//   { title: 'How it Works', icon: null },
//   { title: 'Testimonials', icon: null },
//   { title: 'Terms and Conditions', icon: null },
// ]);
</script>

<style scoped></style>
