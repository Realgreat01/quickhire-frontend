<template>
  <Carousel :items-to-show="5"> <slot /></Carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const splide_option = ref({
  itemsToShow: 5,
  // gap: 8,
  // type: 'loop',
  // maxWidth: '95%',
  // perpage: 3,
  // rewind: true,
  // // responsive: true,
  // pagination: false,
});
</script>
