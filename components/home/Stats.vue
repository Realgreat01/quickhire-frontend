<template>
  <div class="py-20">
    <h1 class="qh-text-1 mb-3 mt-10 md:mb-5">Operational Insights</h1>
    <div class="mx-auto grid grid-cols-2 gap-2 md:grid-cols-4">
      <qh-card
        class="rounded !border-none !border-dark-600 bg-brand-500 p-4 !shadow-none md:p-10 dark:!bg-brand-100"
        v-for="(stat, index) in stats"
        :key="index"
        :class="null"
      >
        <h1 class="qh-text-3 text-warn-500">
          {{ stat.title }}
        </h1>
        <h1 class="qh-text-1 font-bold text-brand-200">{{ stat?.count }}+</h1>
      </qh-card>
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
