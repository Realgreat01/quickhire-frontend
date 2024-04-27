<template>
  <div class="relative h-96 w-full bg-success">
    <qh-button @mouse-enter="handleMouseEnter" @mouse-leave="handleMouseLeave"
      >tools
    </qh-button>

    {{ showTooltip }}
    <span
      v-if="showTooltip"
      class="tooltip whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-white"
      >dhsdsbhsdbhs</span
    >
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

interface DevIcon {
  name: string;
  icons: string;
}

// defineProps({
//   icon: {
//     type: Object as PropType<DevIcon>,
//     required: true,
//   },
// });

const props = defineProps({
  text: String, // Text to be displayed in the tooltip
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
