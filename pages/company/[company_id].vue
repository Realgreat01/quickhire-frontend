<template>
  <div>
    {{ $route.params.company_id }}
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';

const route = useRoute();
definePageMeta({
  name: QH_ROUTES.COMPANY.PUBLIC,
});

useHead({
  title: `QuickHire - ${route.params.company_id}`,
});
</script>

<style scoped></style>
