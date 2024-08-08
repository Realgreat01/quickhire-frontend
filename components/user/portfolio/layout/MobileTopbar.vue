<template>
  <div class="fixed top-0 z-[100] h-fit w-full bg-white">
    <div
      v-if="!showModal"
      class="px-thin py-small z-50 flex h-12 w-full items-center justify-between overflow-hidden duration-[1500ms]"
    >
      <icons-logo class="text-brand" />
      <RiMenu3Fill class="h-8 w-8 text-brand" @click="showModal = !showModal" />
    </div>

    <div
      class="px-thin fixed top-0 z-[100] flex h-screen w-full justify-end overflow-hidden bg-white"
      v-else
    >
      <div class="w-full overflow-x-hidden duration-500">
        <div class="mb-4 flex h-20 w-full items-center justify-between">
          <icons-logo class="text-brand" />
          <RiCloseFill
            class="h-10 w-10 text-brand duration-500"
            @click="showModal = false"
          />
        </div>
        <div class="qh-text-2 my-6 flex flex-col gap-y-4 px-6 text-brand">
          <a
            @click="showModal = false"
            class="hover:font-bold hover:text-brand"
            v-for="(route, index) in NavActions"
            :href="route.route"
            :key="index"
          >
            {{ route.title }}
          </a>
        </div>
        <div class="mt-10 flex items-center justify-center gap-6 md:flex-col">
          <a
            :href="link.link"
            class="rounded-full text-brand hover:bg-brand-50 hover:text-brand-900"
            v-for="(link, index) in socialMediaLinks"
            :key="index"
            target="_blank"
          >
            <component
              :is="link.icon"
              class="h-10 w-10"
              :class="link.class"
            ></component>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, ref, watchEffect } from 'vue';
import {
  RiGithubFill,
  RiLinkedinFill,
  RiLinkedinBoxFill,
  RiMenu3Fill,
  RiTwitterXFill,
  RiTwitterXLine,
  RiCloseFill,
  RiInstagramFill,
} from 'vue-remix-icons';
import { useUserStore } from '~/store/user-store';
const { publicUser: user } = storeToRefs(useUserStore());
const showModal = ref(false);
const NavActions = ref([
  { title: 'About', route: '#about' },
  { title: 'Experience', route: '#experience' },
  { title: 'Projects', route: '#projects' },
  { title: 'Contact', route: '#contact' },
]);
const socialMediaLinks = shallowRef([
  {
    icon: RiGithubFill,
    link: user?.value?.social_media?.github ?? '',
    class: 'text-dark-800',
  },
  {
    icon: RiTwitterXLine,
    link: user?.value?.social_media?.twitter ?? '',
    class: 'text-dark-800',
  },
  {
    icon: RiLinkedinBoxFill,
    link: user?.value?.social_media?.linkedin ?? '',
    class: 'text-brand-400',
  },
  {
    icon: RiInstagramFill,
    link: user?.value?.social_media?.instagram ?? '',
    class: '',
  },
]);
watchEffect(() => {
  if (showModal.value === true) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'auto';
});
</script>

<style scoped lang="scss"></style>
