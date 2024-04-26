<template>
  <div></div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

interface DevIcon {
  name: string;
  icons: string;
}

defineProps({
  icon: {
    type: Object as PropType<DevIcon>,
    required: true,
  },
});
</script>

<style scoped></style>
