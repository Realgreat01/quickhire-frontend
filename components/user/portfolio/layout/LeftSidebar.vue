<template>
  <div class="border border-none border-r-brand-50">
    <div class="gap-medium flex h-full items-center justify-center md:flex-col">
      <a
        :href="link.link"
        class="link h-medium w-medium flex items-center justify-center rounded-full text-brand hover:bg-brand-50 hover:text-brand-900"
        v-for="(link, index) in socialMediaLinks"
        :key="index"
        target="_blank"
      >
        <component :is="link.icon" class="h-12 w-12 fill-brand"></component>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { RiTwitterFill } from 'vue-remix-icons';

const socialMediaLinks = shallowRef([
  {
    icon: RiTwitterFill,
    link: 'https://github.com/Realgreat01',
  },
  {
    icon: RiTwitterFill,
    link: 'https://x.com/SRealgreat',
  },
  {
    icon: RiTwitterFill,
    link: 'https://www.linkedin.com/in/samsonrealgreat/',
  },
  {
    icon: RiTwitterFill,
    link: 'https://www.instagram.com/srealgreat',
  },
]);
</script>

<style scoped></style>
