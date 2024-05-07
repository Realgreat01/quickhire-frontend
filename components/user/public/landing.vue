<template>
  <div class="flex h-screen flex-col justify-center text-dark" id="home">
    <h1 class="">
      <p class="my-5 text-4xl">Hi, I'm</p>
      <p class="block text-5xl font-bold text-brand md:text-6xl">
        {{ user?.firstname ?? 'Lorem' }} {{ user?.lastname ?? 'Ipsum' }}
      </p>
    </h1>
    <h2 class="text-2xl font-semibold text-brand-800">
      {{ user?.skills?.stack }}
    </h2>
    <p class="my-10 font-light md:w-4/5">
      {{ user?.header_bio }}
    </p>

    <div class="qh-text-3 grid grid-cols-2 gap-x-4 md:w-2/3">
      <qh-button
        class="border-[1.5px] duration-500 hover:bg-brand-400 hover:font-medium"
        >Resume</qh-button
      >
      <qh-button
        class="border-[1.5px] border-brand-400 !bg-transparent !text-brand duration-500 hover:!bg-brand-400 hover:font-medium hover:!text-brand-50"
        >Hire&nbsp;Me</qh-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
const { publicUser: user } = storeToRefs(useUserStore());
</script>

<style scoped></style>
