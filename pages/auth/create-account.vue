<template>
  <div>
    <auth-create-account />
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';

definePageMeta({ name: QH_ROUTES.USER.REGISTER });
</script>
