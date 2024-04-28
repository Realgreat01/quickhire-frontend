<template>
  <div class="relative">
    <!-- <button>{{ icon.name }}</button> -->
    <img :src="`/dev-icon/${icon.icon}.svg`" alt="" class="h-6 w-6" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

interface DevIcon {
  name: string;
  icon: string;
}

defineProps({
  icon: {
    type: Object as PropType<DevIcon>,
    required: true,
  },
});

const showTooltip = ref(false);

const handleMouseEnter = () => {
  showTooltip.value = true;
};

const handleMouseLeave = () => {
  showTooltip.value = false;
};
</script>

<style scoped>
.tooltip {
  top: calc(100% + 0.5rem); /* Position below the hovered element */
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */
}
</style>
