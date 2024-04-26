<template>
  <div
    class="my-20 grid w-full items-center justify-between gap-x-10 md:grid-cols-2"
  >
    <div class="order-2 flex flex-col gap-y-4 md:order-1">
      <h1 class="qh-text-1 ml-1">
        A Quick way to
        <span class="text-brand"
          >Hire <br class="hidden md:block" />Developers</span
        >
        <br class="block md:hidden" />
        and
        <span class="text-brand">Get Hired</span>
      </h1>

      <p class="qh-text-normal w-[90%] md:w-full">
        Escape the hurdles of job search and hiring challenges, lets make the
        process seamless for you !
      </p>

      <div class="flex justify-between md:justify-start md:gap-x-8">
        <qh-button class="h-10 w-48 rounded-full font-medium md:h-12 md:w-48"
          >Get Started
        </qh-button>
        <qh-button
          class="h-10 w-48 rounded-full border border-brand bg-transparent font-medium !text-brand md:h-12 md:w-48"
        >
          Latest Jobs
        </qh-button>
      </div>
    </div>
    <div
      class="order-1 mx-auto mb-4 flex w-full items-center justify-center md:order-2"
    >
      <icons-landing-page class="" />
      <!-- <img src="~~/assets/images/office-image.jpg" alt="" class="" /> -->
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
