<template>
  <div class="mb-4 mt-10 flex items-center">
    <div v-if="hasBothEnds" class="h-4 w-4 rounded-full bg-brand"></div>
    <div
      v-if="hasBothEnds"
      class="h-[1px] w-[4rem] bg-brand md:w-[10rem]"
    ></div>

    <qh-button
      class="qh-text-3 h-10 w-40 rounded border border-brand !bg-transparent !text-brand md:w-[20rem]"
    >
      <slot>Contact&nbsp;Me</slot>
    </qh-button>

    <div
      class="h-[1px] w-[4rem] bg-brand md:w-[10rem]"
      v-if="hasBothEnds"
    ></div>
    <div class="h-[1px] w-[8rem] bg-brand md:w-[10rem]" v-else></div>
    <div class="h-4 w-4 rounded-full bg-brand"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  hasBothEnds: {
    type: Boolean,
    default: false,
  },
});
</script>
