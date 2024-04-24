<template>
  <div class="">
    <h1 class="qh-text-1">Checks</h1>
    <div class="grid grid-cols-3 gap-6">
      <div
        class="rounded-xl border border-brand bg-dark-50 p-10 text-brand"
        v-for="(stat, index) in stats"
        :key="index"
      >
        <h1 class="qh-text-4">{{ stat.title }}</h1>
        <h1 class="qh-text-1">{{ formatNumber(stat.count) }}+</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { formatNumber } = useCurrency();
const stats = ref([
  {
    title: 'Developers',
    count: 8452,
  },
  {
    title: 'Jobs',
    count: 451,
  },
  {
    title: 'Companies',
    count: 106,
  },
  {
    title: 'Hired Talent',
    count: 874,
  },
  {
    title: 'Active Applications',
    count: 3200,
  },
  {
    title: 'Interviews This Month',
    count: 540,
  },
]);
</script>

<style scoped></style>
