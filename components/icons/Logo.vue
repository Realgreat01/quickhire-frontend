<template>
  <RouterLink
    :to="{ name: QH_ROUTES.HOME }"
    :class="Class"
    class="qh-text-1 flex select-none items-center justify-start gap-x-0 rounded p-2 !normal-case"
  >
    <img
      src="~/assets/svgs/quickhire-logo.svg"
      class="h-7 w-7 md:h-10 md:w-10"
    />
    <span class="font-geologica select-none text-xl md:text-4xl" :class="Class"
      >uickHire</span
    >
  </RouterLink>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';

defineProps({ Class: String, textClass: String });
</script>

<style scoped></style>
