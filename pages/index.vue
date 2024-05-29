<template>
  <div class="">
    <home-header class="px-3 md:px-3" id="home-header" />
    <home-main-page class="px-3 md:px-10" id="main" />
    <home-features class="px-3 md:px-10" id="features" />
    <home-stats class="px-3 md:px-10" id="insights" />
    <home-current-listings class="px-3 md:px-10" id="latest-jobs" />
    <home-testimonials class="px-3 md:px-10" id="testimonials" />
    <!-- <home-campaign class="px-3 md:px-10" id="about" />  -->
    <home-footer class="px-3 md:px-10" id="footer" />
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import { useUtilsStore } from '~/store/utils-store';

definePageMeta({
  name: QH_ROUTES.HOME,
});

useHead({
  title: 'QuickHire - Home',
});

const { getOperationalInsights } = useUtilsStore();

onMounted(async () => {
  await getOperationalInsights();
});
</script>

<style lang="scss" scoped></style>
