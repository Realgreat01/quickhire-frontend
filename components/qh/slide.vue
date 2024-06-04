<template>
  <SplideSlide class="">
    <slot />
  </SplideSlide>
</template>

<script setup lang="ts">
import { SplideSlide } from '@splidejs/vue-splide';
defineProps({ Class: String });
</script>
