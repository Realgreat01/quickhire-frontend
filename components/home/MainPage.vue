<template>
  <div
    class="my-20 grid w-full items-start justify-between gap-x-10 md:grid-cols-2"
  >
    <div class="flex h-[60%] flex-col justify-around gap-y-4">
      <h1 class="ml-1">
        <h1 class="my-4 block text-5xl font-semibold text-brand md:text-7xl">
          The World Best
          <span class="text-secondary-600">Developers</span> Centered Hiring
          <span class="text-secondary-600">Platform</span>!
        </h1>
        <h2 class="qh-text-2 font-semibold">
          Connect with Top Developers or
          <span class="block-text-brand">Land Your Dream Job</span>
        </h2>
      </h1>

      <p class="qh-text-normal w-[90%] md:w-full">
        Escape the hurdles of job search and hiring challenges, lets make the
        process seamless for you!
      </p>

      <div class="flex justify-between md:justify-start md:gap-x-8">
        <qh-button class="h-10 w-48 rounded-full font-medium md:h-12 md:w-56">
          <router-link :to="{ name: QH_ROUTES.USER.REGISTER }">
            Get Started
          </router-link>
        </qh-button>
        <qh-button
          class="h-10 w-48 rounded-full border border-brand bg-transparent font-medium !text-brand md:h-12 md:w-56"
        >
          <router-link to="#latest-jobs"> Latest Jobs</router-link>
        </qh-button>
      </div>
    </div>
    <div
      class="order-1 mx-auto mb-4 flex w-full items-center justify-center md:order-2"
    >
      <icons-landing-page-2 class="" />
      <!-- <img src="~~/assets/images/office-image.jpg" alt="" class="" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
</script>

<style scoped></style>
