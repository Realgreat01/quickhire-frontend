<template>
  <div class="font-poppins w-full bg-white">
    <qh-button
      v-if="currentUser"
      @click="editProfile"
      class="fixed left-4 top-4 z-50 flex h-10 gap-x-4 rounded-lg !font-medium"
      ><span class="">Edit Profile</span> <PencilSquareIcon class="h-6 w-6" />
    </qh-button>
    <user-layout-mobile-topbar class="block md:hidden" />
    <div class="flex w-full flex-col md:flex-row">
      <!-- <user-layout-left-sidebar
        class="sticky bottom-0 top-0 hidden h-screen w-[10%] md:block"
      /> -->
      <div class="h-fit w-full flex-1 border-y-transparent">
        <user-public-landing />
        <user-public-about />
        <user-public-experience />
        <user-public-education />
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
import { PencilSquareIcon } from '@heroicons/vue/24/solid';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';

const route = useRoute();
const router = useRouter();
const { getPublicUser } = useUserStore();
const { user } = storeToRefs(useUserStore());

definePageMeta({
  name: QH_ROUTES.USER.PREVIEW,
});
useHead({
  title: `QuickHire - ${capitalizeFirstLetter(route.params.username)}`,
});

const editProfile = () => {
  router.replace({
    name: QH_ROUTES.USER.PROFILE,
  });
};

function capitalizeFirstLetter(text: string | string[]) {
  if (text.length === 0) return ''; // Return an empty string if text is empty
  if (typeof text === 'string')
    return text.charAt(0).toUpperCase() + text.slice(1);
}

onBeforeMount(async () => {
  if (typeof route.params.username === 'string')
    await getPublicUser(route.params.username);
});

const currentUser = computed(
  () => user.value?.username === (route.params.username as string),
);
</script>

<style scoped></style>
