<template>
  <div class="">
    <h1 class="qh-text-1 mb-3 mt-10 md:mb-5">Operational Insights</h1>
    <div
      class="mx-auto grid grid-cols-2 gap-2 md:w-4/5 md:grid-cols-2 md:gap-6"
    >
      <div
        class="rounded border p-4 text-brand shadow md:p-10"
        v-for="(stat, index) in stats"
        :key="index"
        :class="stat?.class"
      >
        <h1 class="qh-text-4">{{ stat.title }}</h1>
        <h1 class="qh-text-2 font-bold">{{ stat?.count }}+</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUtilsStore } from '~/store/utils-store';
defineProps({ Class: String });
const { insights } = storeToRefs(useUtilsStore());
const stats = computed(() => [
  {
    title: 'Developers',
    count: insights.value?.users,
    class: 'bg-brand-100',
  },
  {
    title: 'Jobs',
    count: insights.value?.jobs,
    class: 'bg-purple-100',
  },
  {
    title: 'Companies',
    count: insights.value?.companies,
    class: 'bg-error-100',
  },
  // {
  //   title: 'Hired Talent',
  //   count: 874,
  // },
  {
    title: 'Active Applications',
    count: insights.value?.active_applications,
    class: 'bg-success-100',
  },
  // {
  //   title: 'Interviews This Month',
  //   count: 540,
  // },
]);
</script>

<style scoped></style>
