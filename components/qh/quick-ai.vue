<template>
  <div class="">
    <qh-card
      class="qh-flex-center hidden !max-h-[520px] min-h-[400px] min-w-[400px] flex-col md:flex"
    >
      <h2 class="qh-text-2 my-3 text-center font-bold">
        Quick AI Suggestions!
      </h2>
      <div class="my-[100px] place-items-center text-center text-lg">
        Coming Soon!
      </div>
    </qh-card>

    <qh-button
      variant="inverse"
      class="fixed bottom-4 right-4 !h-12 !w-40 !px-6 md:!hidden"
    >
      <RiSparkling2Fill class="h-6 w-6" />
      Quick AI
    </qh-button>
  </div>
</template>

<script setup lang="ts">
import { RiSparkling2Fill } from 'vue-remix-icons';
</script>

<style scoped></style>
