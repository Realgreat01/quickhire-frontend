<template>
  <div class="dark:bg-white dark:text-dark-800">
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
      @cancelled="modalStore.cancel"
      @close="showModal = false"
    />
    <qh-dropzone
      v-if="uploadStore.showModal"
      @upload="uploadStore.upload()"
      @cancelled="uploadStore.cancel"
      @close="uploadStore.showModal = false"
    />
  </div>
</template>
<script setup lang="ts">
import 'notivue/notification-progress.css';
import { Notivue, Notification, NotificationProgress } from 'notivue';
import { useModalStore } from '~/store/modal-store';
import { useJobStore } from '~/store/job-store';
import { useUserStore } from '~/store/user-store';
import { useUploadStore } from '~/store/upload-store';
import ApiService from './services/api-service.service';

const { showModal } = storeToRefs(useModalStore());
const modalStore = useModalStore();
const uploadStore = useUploadStore();

const { getAllJobs } = useJobStore();
const { getAllUsers } = useUserStore();

onMounted(async () => {
  if (process.client) {
    await getAllJobs();
    await getAllUsers();
  }

  setInterval(async () => {
    await ApiService.pingServer();
  }, 60000);
});
</script>
