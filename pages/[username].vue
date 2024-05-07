<template>
  <div class="font-poppins w-full bg-white">
    <user-layout-mobile-topbar class="block md:hidden" />
    <div class="flex w-full flex-col md:flex-row">
      <user-layout-left-sidebar
        class="sticky bottom-0 top-0 hidden h-screen w-[10%] md:block"
      />
      <div
        class="h-fit w-full flex-1 border border-x-dark-500 border-y-transparent px-6 md:px-12"
      >
        <user-public-landing />
        <user-public-about />
        <user-public-experience />
        <user-public-projects />
        <user-public-contact />
      </div>
      <user-layout-right-sidebar
        class="sticky bottom-0 top-0 hidden h-screen w-[10%] md:flex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';
const route = useRoute();
const { getPublicUser } = useUserStore();

definePageMeta({
  name: QH_ROUTES.USER.PREVIEW,
});
useHead({
  title: `QuickHire - ${capitalizeFirstLetter(route.params.username)}`,
});

function capitalizeFirstLetter(text: string | string[]) {
  if (text.length === 0) return ''; // Return an empty string if text is empty
  if (typeof text === 'string')
    return text.charAt(0).toUpperCase() + text.slice(1);
}

onBeforeMount(async () => {
  if (typeof route.params.username === 'string')
    await getPublicUser(route.params.username);
});
</script>

<style scoped></style>
