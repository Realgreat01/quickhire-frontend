<template>
  <div class="">
    <Notivue v-slot="item">
      <Notification :item="item" />
      <NotificationProgress :item="item" />
    </Notivue>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <qh-modal
      v-if="showModal"
      @continue="modalStore.continue"
      @cancel="modalStore.cancel"
      @close="showModal = false"
    />
  </div>
</template>
<script setup lang="ts">
import 'notivue/notification-progress.css';
import { Notivue, Notification, NotificationProgress } from 'notivue';
import { useModalStore } from '~/store/modal-store';
import { useJobStore } from '~/store/job-store';

const { showModal } = storeToRefs(useModalStore());
const modalStore = useModalStore();
const { getAllJobs } = useJobStore();
onMounted(() => {
  if (process.client) {
    getAllJobs();
  }
});
</script>
