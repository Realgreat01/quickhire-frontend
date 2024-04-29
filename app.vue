<template>
  <div class="">
    <Notivue v-slot="item">
      <Notification :item="item" />
      <NotificationProgress :item="item" />
    </Notivue>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import 'notivue/notification-progress.css';
import { Notivue, Notification, NotificationProgress } from 'notivue';

import { useJobStore } from '~/store/job-store';

const { getAllJobs } = useJobStore();
onMounted(() => {
  if (process.client) {
    getAllJobs();
  }
});
</script>
