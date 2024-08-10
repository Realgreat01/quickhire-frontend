<template>
  <div
    class="mt-16 flex min-h-screen flex-col-reverse items-center justify-end bg-white p-4 text-dark md:mt-0 md:grid md:grid-cols-[5fr,3fr] md:px-10"
  >
    <div class="flex flex-col justify-center text-dark" id="home">
      <h1 class="">
        <p class="my-5 text-2xl md:text-3xl">Hi, I'm</p>
        <p class="mb-4 text-3xl font-bold text-brand md:text-6xl">
          {{ user?.firstname }} {{ user?.lastname }}
        </p>
      </h1>
      <h2 class="text-xl font-semibold text-brand-800">
        {{ user?.skills?.stack }}
      </h2>
      <p class="font-light md:w-4/5">
        {{ user?.header_bio }}
      </p>

      <div class="qh-text-3 mt-10 flex gap-x-2 md:w-2/3">
        <qh-resume-button class="!h-12 w-full" :username="user?.username ?? ''"
          >Resume</qh-resume-button
        >
        <qh-button variant="outlined" class="!h-12">Hire&nbsp;Me</qh-button>
      </div>
    </div>

    <div class="flex items-start justify-start">
      <img
        :src="user?.profile_picture"
        alt=""
        class="mx-auto my-auto block h-80 w-80 rounded-full object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
const { publicUser: user } = storeToRefs(useUserStore());
</script>

<style scoped></style>
