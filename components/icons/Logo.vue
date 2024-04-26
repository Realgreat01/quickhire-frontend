<template>
  <div
    :class="Class"
    class="qh-text-1 flex items-center justify-start gap-x-0 rounded p-2 !normal-case"
  >
    <icons-logo-svg :class="Class" class="m-0 p-0" />
    <p class="font-geologica select-none !font-semibold" :class="textClass">
      uickHire
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({ Class: String, textClass: String });
</script>

<style scoped></style>
