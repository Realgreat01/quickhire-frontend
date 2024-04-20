<template>
  <div class="">
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import {
  Notivue,
  Notification,
  pastelTheme,
  materialTheme,
  darkTheme,
  slateTheme,
} from 'notivue';
</script>
