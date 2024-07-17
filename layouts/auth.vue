<template>
  <div class="relative grid h-screen overflow-auto md:grid-cols-[3fr,2fr]">
    <div
      class="qh-flex-center bg-brand-90 sticky bottom-0 top-0 hidden h-screen w-full md:flex"
    >
      <icons-logo class="fixed left-4 top-4 text-brand" />
      <img
        src="~/assets/svgs/auth.svg"
        alt=""
        class="block h-screen w-full pt-20"
      />
    </div>

    <div class="qh-flex-center relative h-full flex-col shadow">
      <div class="z-10 my-5 flex h-[15vh] w-full flex-col gap-5 bg-white p-5">
        <h1 class="qh-text-1 mt-0 text-center font-bold text-brand-600">
          {{ $route.meta.title }}
        </h1>
        <h1 class="qh-text-4 text-center font-medium text-brand-800">
          {{ $route.meta.pageHint }}
        </h1>
      </div>
      <qh-card
        class="scroll m-1 mt-5 max-h-[70vh] min-h-[200px] w-[96%] overflow-y-scroll bg-white p-3 pt-5 md:p-4"
      >
        <NuxtPage />
      </qh-card>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
