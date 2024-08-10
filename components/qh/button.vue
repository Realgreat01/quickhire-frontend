<template>
  <button
    v-if="loading"
    :class="[variant]"
    class="cursor-not-allowed opacity-50"
    v-bind="$attrs"
  >
    <icons-loading />
  </button>

  <button
    v-else-if="disabled"
    :class="[variant]"
    class="cursor-not-allowed opacity-50"
    v-bind="$attrs"
  >
    <slot v-if="$slots.default"></slot>
    <template v-else-if="label">{{ label }}</template>
    <template v-else-if="type.toLowerCase() === 'submit'">Submit</template>
    <template v-else>Custome Button</template>
  </button>

  <button v-else @click="$emit('click')" :class="[variant]" class="">
    <slot v-if="$slots.default"></slot>
    <template v-else-if="label">{{ label }}</template>
    <template v-else-if="type.toLowerCase() === 'submit'">Submit</template>
    <template v-else>Custome Button</template>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, default: null },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  variant: {
    type: String as PropType<
      | 'brand'
      | 'ring'
      | 'outlined'
      | 'plain'
      | 'inverse'
      | 'light'
      | 'success'
      | 'error'
      | 'admin'
    >,
    default: 'brand',
  },
});

defineEmits(['click']);
</script>

<style>
.brand {
  @apply qh-button bg-brand text-white;
}

.outlined {
  @apply qh-button border border-brand text-brand;
}

.plain {
  @apply qh-button text-brand;
}

.inverse {
  @apply qh-button border bg-white text-brand;
}

.light {
  @apply qh-button bg-dark-100 text-brand-700;
}

.success {
  @apply qh-button bg-success-600 text-white;
}

.error {
  @apply qh-button bg-error-500 text-white;
}

.admin {
  @apply qh-button bg-orange-500 font-medium text-white;
}

.qh-button {
  @apply flex h-8 w-[inherit] items-center justify-center  gap-x-2 rounded-full px-4 font-semibold;
}
</style>
