<template>
  <div></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';

definePageMeta({
  layout: 'users',
});

useHead({
  title: 'QuickHire - Account',
});

const show = ref(true);
const options = [
  { label: 'Option #1', value: 'option_1' },
  { label: 'Option #2', value: 'option_2' },
  { label: 'Option #3', value: 'option_3' },
];
onMounted(() => navigateTo(QH_ROUTES.USER.PROFILE));
</script>

<style lang="scss" scoped></style>
