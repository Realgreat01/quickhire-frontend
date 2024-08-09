<template>
  <div class="relative flex flex-col">
    <div class="h-7 w-7 fill-brand" @click="toggleDropdown" ref="icon">
      <slot name="icon">
        <RiMenu4Fill class="h-7 w-7 fill-[inherit] stroke-1"
      /></slot>
    </div>

    <Transition
      name="custom-classes"
      :duration="500"
      appear
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <qh-card
        :class="Class"
        class="absolute right-2 top-10 max-w-[80vw] bg-white !p-0"
        v-if="showDropdown"
        ref="dropdown"
      >
        <slot :toggleDropdown :closeDropdown> </slot>
      </qh-card>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { RiMenu4Fill } from 'vue-remix-icons';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  Class: String,
  deactivateClick: Boolean,
});
const icon = ref();

let showDropdown = ref(false);
const dropDropdown = () => {
  if (!props.deactivateClick) {
    showDropdown.value = false;
  }
};

const closeDropdown = () => {
  showDropdown.value = false;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const dropdown = ref();

onClickOutside(dropdown, dropDropdown, {
  ignore: [icon],
});
</script>

<style scoped></style>
