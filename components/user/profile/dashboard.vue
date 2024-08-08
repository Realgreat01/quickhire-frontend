<template>
  <qh-card class="relative grid w-full gap-2 rounded-xl">
    <h2 class="qh-text-2 mb-5 font-bold text-brand">Application Progress</h2>
    <div class="flex gap-x-12">
      <qh-circle-progress-bar
        :value="Number(data.value)"
        v-for="data in jobData"
      >
        <div class="qh-flex-center flex-col">
          <h2 class="text-lg">{{ data.title }}</h2>
          <h2 class="text-2xl font-bold">{{ data.data }}</h2>
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
