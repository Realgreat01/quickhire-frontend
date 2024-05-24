<template>
  <button
    v-if="loading"
    @click="$emit('click')"
    class="flex cursor-not-allowed items-center justify-center rounded bg-brand bg-opacity-50 px-4 py-4 text-white"
    :class="class"
    v-bind="$attrs"
  >
    <icons-loading class="" />
  </button>
  <button
    v-else-if="disabled"
    @click="$emit('click')"
    class="flex cursor-not-allowed items-center justify-center rounded bg-brand px-4 py-4 font-semibold text-white opacity-50"
    :class="class"
    v-bind="$attrs"
  >
    <slot v-if="$slots.default"></slot>
    <template v-else-if="label">{{ label }}</template>
    <template v-else-if="type.toLowerCase() === 'submit'">Submit</template>
    <template v-else>Custome Button</template>
  </button>

  <button
    v-else
    @click="$emit('click')"
    class="flex items-center justify-center rounded bg-brand px-4 py-4 font-semibold text-white"
    :class="class"
    v-bind="$attrs"
  >
    <slot v-if="$slots.default"></slot>
    <template v-else-if="label">{{ label }}</template>
    <template v-else-if="type.toLowerCase() === 'submit'">Submit</template>
    <template v-else>Custome Button</template>
  </button>
</template>

<script setup lang="ts">
defineProps({
  class: { type: String },
  label: { type: String, default: null },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
});
defineEmits(['click']);
</script>

<style scoped></style>
