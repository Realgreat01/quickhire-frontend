<template>
  <div class="relative flex flex-col" ref="dropdown">
    <div class="h-6 w-6 fill-brand stroke-brand" @click="qhDropdown.toggle()">
      <slot name="icon"> <RiMenu4Fill class="fill-[inherit]" /></slot>
    </div>

    <Transition
      name="custom-classes"
      :duration="500"
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <qh-card
        class="absolute right-2 top-10 max-w-[80vw] bg-white"
        v-if="qhDropdown.show"
      >
        <slot> </slot>
      </qh-card>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { RiMenu4Fill } from 'vue-remix-icons';
import { onClickOutside } from '@vueuse/core';

const dropdown = ref();

onClickOutside(dropdown, qhDropdown.close);
</script>

<style scoped></style>
