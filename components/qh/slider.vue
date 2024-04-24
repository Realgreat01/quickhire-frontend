<template>
  <div>
    <Splide :options="{ rewind: true }" aria-label="My Favorite Images">
      <SplideSlide>
        <qh-cards />
      </SplideSlide>
      <SplideSlide>
        <qh-cards />
      </SplideSlide>
    </Splide>

    <Splide ref="SplideComponent" :options="splide_option" class="flex w-full">
      <SplideSlide @click="" class="gap-x-2 rounded-lg bg-gray-200 p-2 text-sm">
        <div class="flex items-baseline gap-x-2 capitalize">
          <qh-cards />
        </div>
        <qh-cards />
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
// Default theme

import '@splidejs/vue-splide/css';

// // or other themes
// import '@splidejs/vue-splide/css/skyblue';
// import '@splidejs/vue-splide/css/sea-green';

// or only core styles
import '@splidejs/vue-splide/css/core';

const splide_option = ref({
  fixedWidth: '80px',
  fixedHeight: '70px',
  width: '100%',
  gap: 8,
  tag: 'section',
  rewind: false,
  pagination: false,
  isNavigation: true,

  focus: 'center',
});

const SplideComponent = ref(null);
</script>
