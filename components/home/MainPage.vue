<template>
  <div
    class="my-5 grid w-full items-start justify-between gap-x-10 md:grid-cols-1"
  >
    <div class="qh-flex-center flex w-full flex-col gap-y-4">
      <h1 class="ml-1 flex justify-center text-center">
        <h1
          class="font-geologica my-4 block text-center text-4xl font-bold text-brand md:text-8xl"
        >
          The World Best
          <span class="text-secondary-500">Developers</span>
          Centered Hiring
          <span class="text-secondary-500">Platform </span> !
        </h1>
        <h2 class="qh-text-2 mx-2 text-center font-semibold">
          Connect with Top Developers or
          <span class="block-text-brand">Land Your Dream Job</span>
        </h2>
      </h1>

      <p class="qh-text-normal w-[96%] text-center md:w-full">
        Escape the hurdles of job search and hiring challenges, lets make the
        process seamless for you!
      </p>

      <div
        class="flex flex-col justify-between gap-x-8 gap-y-4 md:flex-row md:justify-start"
      >
        <qh-button class="h-10 w-80 rounded-full font-medium md:h-12 md:w-72">
          <router-link :to="{ name: QH_ROUTES.USER.REGISTER }">
            Get Started
          </router-link>
        </qh-button>
        <qh-button
          class="h-10 w-80 rounded-full border border-brand bg-transparent font-medium !text-brand md:h-12 md:w-72"
        >
          <router-link :to="{ name: QH_ROUTES.COMPANY.LOGIN }">
            For Business</router-link
          >
        </qh-button>
      </div>
    </div>
    <div
      class="order-1 mx-auto mb-4 hidden w-full items-center justify-center md:order-2"
    >
      <!-- <icons-landing-page-2 class="" /> -->
      <img src="~/assets/images/home.png" alt="" class="h-[400px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
</script>

<style scoped></style>
