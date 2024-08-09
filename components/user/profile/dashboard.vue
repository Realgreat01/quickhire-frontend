<template>
  <qh-card class="relative grid w-full gap-2 rounded-xl">
    <h2 class="qh-text-2 mb-5 font-bold text-brand">Application Progress</h2>
    <div class="flex gap-x-4 md:gap-x-12">
      <qh-circle-progress-bar
        :value="Number(data.value)"
        v-for="data in jobData"
        class="hidden md:block"
      >
        <div class="qh-flex-center flex-col p-4">
          <h2 class="text-lg">{{ data.title }}</h2>
          <h2 class="text-2xl font-bold">{{ data.data }}</h2>
        </div>
      </qh-circle-progress-bar>
      <qh-circle-progress-bar
        :value="Number(data.value)"
        v-for="data in jobData"
        :size="400"
        :strokeWidth="20"
        class="md:hidden"
      >
        <div class="qh-flex-center flex-col p-4">
          <h2 class="text-[10px]">{{ data.title }}</h2>
          <h2 class="font-bold">{{ data.data }}</h2>
        </div>
      </qh-circle-progress-bar>
    </div>
  </qh-card>
</template>

<script setup lang="ts">
import { useJobStore } from '~/store/job-store';

const { jobData } = storeToRefs(useJobStore());
</script>

<style scoped></style>
