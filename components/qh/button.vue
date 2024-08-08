<template>
  <button
    v-if="loading"
    class="flex min-h-8 min-w-[180px] cursor-not-allowed items-center justify-center rounded bg-brand bg-opacity-50 px-4 py-4 text-[#fff]"
    :class="class"
    v-bind="$attrs"
  >
    <icons-loading class="" />
  </button>

  <button
    v-else-if="disabled"
    class="flex min-h-8 cursor-not-allowed items-center justify-center rounded bg-brand px-4 py-2 font-semibold text-[#fff] opacity-50"
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
    class="flex min-h-8 items-center justify-center rounded bg-brand px-4 py-2 font-semibold text-[#fff]"
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
