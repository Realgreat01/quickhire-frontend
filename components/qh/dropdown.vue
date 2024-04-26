<template>
  <div class="relative flex flex-col">
    <div
      class="h-6 w-6 fill-brand stroke-brand"
      @click="showDropDown = !showDropDown"
    >
      <slot name="icon"> <RiMenu4Fill class="fill-[inherit]" /></slot>
    </div>

    <qh-card
      class="absolute right-2 top-10 max-w-48 bg-white"
      v-if="showDropDown"
    >
      <slot></slot>
    </qh-card>
  </div>
</template>

<script setup lang="ts">
import { RiMenu4Line, RiMenu4Fill } from 'vue-remix-icons';

const showDropDown = ref(true);
</script>

<style scoped></style>
