<template>
  <button
    @click="$emit('click')"
    class="flex items-center justify-center rounded bg-brand px-4 py-1 text-white"
    :class="class"
    v-bind="$attrs"
  >
    <slot v-if="$slots.default"></slot>
    <template v-else-if="label">{{ label }}</template>
  </button>
</template>

<script setup lang="ts">
defineProps({
  class: { type: String },
  label: { type: String, default: null, required: true },
});
defineEmits(['click']);
</script>

<style scoped></style>
