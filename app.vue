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
import {
  Notivue,
  Notification,
  NotificationProgress,
  pastelTheme,
  materialTheme,
  darkTheme,
  slateTheme,
} from 'notivue';
</script>
