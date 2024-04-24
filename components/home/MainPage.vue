<template>
  <div
    class="mt-20 grid w-full grid-cols-2 items-center justify-between gap-x-10"
  >
    <div class="flex flex-col gap-y-4">
      <h1 class="qh-text-1 !font-black">
        A Quick way to <span class="text-brand">Hire <br />Developers</span> and
        <span class="text-brand">Get Hired</span>
      </h1>

      <p class="qh-text-normal">
        Escape the hurdles of job search and hiring challenges, lets make the
        process seamless for you !
      </p>

      <div class="flex gap-x-8">
        <qh-button class="h-12 w-48 rounded-full font-medium"
          >Get Started
        </qh-button>
        <qh-button
          class="h-12 w-48 rounded-full border border-brand bg-transparent font-medium !text-brand"
        >
          Testimonials
        </qh-button>
      </div>
    </div>
    <div class="">
      <icons-landing-page />
      <!-- <img src="~~/assets/images/office-image.jpg" alt="" class="" /> -->
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
