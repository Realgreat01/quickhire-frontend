<template>
  <div class="h-screen">
    <div class="relative grid md:grid-cols-[3fr,2fr]">
      <div
        class="qh-flex-center bg-brand-90 sticky top-0 hidden h-screen w-full md:flex"
      >
        <img src="~/assets/svgs/auth.svg" alt="" class="block h-full w-full" />
      </div>

      <div class="qh-flex-center relative h-screen flex-col gap-4 shadow">
        <div class="z-10 flex h-[20vh] w-full flex-col bg-white p-5">
          <icons-logo class="self-start text-brand" />
          <h1 class="qh-text-2 my-5 text-center font-bold text-brand-700">
            {{ $route.meta.title }}
          </h1>
        </div>
        <qh-card
          class="scroll m-1 mt-5 h-fit max-h-[70vh] w-[96%] overflow-y-scroll bg-white p-3 pt-5 md:p-4"
        >
          <NuxtPage />
        </qh-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
