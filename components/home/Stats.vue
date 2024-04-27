<template>
  <div class="">
    <h1 class="qh-text-1 mb-3 mt-20 md:m-5">Operational Insights</h1>
    <div class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6">
      <div
        class="rounded bg-white p-4 text-brand md:p-10"
        v-for="(stat, index) in stats"
        :key="index"
      >
        <h1 class="qh-text-4">{{ stat.title }}</h1>
        <h1 class="qh-text-2 font-bold">{{ formatNumber(stat.count) }}+</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { formatNumber } = useCurrency();

defineProps({ Class: String });

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
