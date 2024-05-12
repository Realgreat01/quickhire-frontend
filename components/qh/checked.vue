<template>
  <div class="relative flex h-10 w-28 items-center rounded-full bg-dark-100">
    <RiCheckboxCircleFill
      class="absolute right-0 h-10 w-10 fill-success"
      v-if="value"
    />
    <RiIndeterminateCircleFill
      class="absolute left-0 h-10 w-10 fill-dark"
      v-else
    />
  </div>
</template>

<script setup lang="ts">
defineProps({ value: Boolean });
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleFill,
  RiIndeterminateCircleFill,
} from 'vue-remix-icons';
</script>
