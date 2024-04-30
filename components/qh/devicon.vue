<template>
  <div class="tooltip relative m-2">
    <img :src="`/dev-icon/${icon.icon}.svg`" alt="" class="h-6 w-6" />
    <span class="tooltiptext qh-text-4 bg-brand text-white">{{
      icon.name
    }}</span>
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
</script>

<style scoped>
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.tooltip .tooltiptext {
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
}
.tooltip .tooltiptext::after {
  content: ' ';
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #023696 transparent transparent transparent;
}
.tooltip .tooltiptext {
  opacity: 0;
  transition: opacity 1s;
}

.tooltip:hover .tooltiptext {
  opacity: 1;
}
</style>
