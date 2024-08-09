<template>
  <div class="relative flex flex-col">
    <div
      class="h-6 w-6 fill-brand stroke-brand"
      @click="toggleDropdown"
      ref="dropdown"
    >
      <slot name="icon"> <RiMenu4Fill class="fill-[inherit]" /></slot>
    </div>

    <Transition
      name="custom-classes"
      :duration="500"
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <qh-card
        :class="Class"
        class="absolute right-2 top-10 max-w-[80vw] bg-white !p-0"
        v-if="showDropdown"
      >
        <slot :toggleDropdown> </slot>
      </qh-card>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { RiMenu4Fill } from 'vue-remix-icons';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({ Class: String, deactivateClick: Boolean });

let showDropdown = ref(false);
const closeDropdown = () => {
  if (!props.deactivateClick) {
    showDropdown.value = false;
  }
};
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const dropdown = ref();

onClickOutside(dropdown, closeDropdown);
</script>

<style scoped></style>
