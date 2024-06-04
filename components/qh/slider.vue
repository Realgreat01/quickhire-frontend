<template>
  <Splide :options="splide_option"> <slot /> </Splide>
</template>

<script setup lang="ts">
import { Splide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

// import '@splidejs/vue-splide/css/core';

const splide_option = ref({
  gap: 8,
  type: 'loop',
  maxWidth: '95%',
  perpage: 3,
  rewind: true,
  responsive: true,
  pagination: false,
});
</script>
