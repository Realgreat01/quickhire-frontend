<template>
  <div class="h-screen">
    <div class="relative grid md:grid-cols-[1fr,4fr]">
      <LayoutsJobSidebar
        class="sticky bottom-0 top-0 hidden overflow-y-scroll border-r-2 border-dark-100 md:block"
      />
      <div class="sticky bottom-0 top-0">
        <LayoutsJobNavbar class="sticky top-0 z-10" />
        <NuxtPage class="scroll overflow-y-scroll bg-white pb-4 pl-2 md:p-4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
