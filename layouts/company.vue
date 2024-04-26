<template>
  <div class="h-screen">
    <div class="relative grid grid-cols-[1fr,4fr]">
      <layouts-company-sidebar
        class="scroll sticky bottom-0 top-0 overflow-y-scroll"
      />
      <div class="sticky bottom-0 top-0">
        <layouts-company-navbar class="sticky top-0 z-10" />
        <NuxtPage class="scroll overflow-y-scroll p-4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCompanyStore } from '~/store/company-store';
const { getCurrentCompany } = useCompanyStore();

onMounted(() => {
  getCurrentCompany();
});
</script>

<style scoped></style>
