<template>
  <div class="w-screen">
    <div class="w-screen" v-if="gettingUser"></div>

    <div
      class="mb-32 w-full items-start justify-self-start p-8 md:mb-0"
      v-if="userNotFound"
    >
      <icons-logo class="text-brand" />
      <div class="qh-flex-center h-[80vh] flex-col text-center">
        <img src="~/assets/svgs/404-error.svg" alt="" class="w-80 md:-mt-10" />
        <h1 class="qh-text-1 font-geologica text-brand-700">User Not Found!</h1>
        <form
          @submit.prevent="searchUser"
          class="mt-8 flex w-80 items-end justify-between gap-1 md:w-[600px]"
        >
          <qh-input
            name="user"
            class="h-full flex-1"
            v-model="username"
            label="Search for Other Users"
          />
          <qh-button label="Search" class="h-11 px-12" type="submit" />
        </form>
      </div>
    </div>

    <div class="font-poppins w-full bg-white" v-else>
      <qh-button
        v-if="currentUser"
        @click="editProfile"
        class="fixed left-4 top-16 z-50 flex h-10 gap-x-4 rounded-lg !font-medium md:top-4"
        ><span class="">Edit Profile</span>
        <PencilSquareIcon class="h-6 w-6" />
      </qh-button>
      <user-layout-mobile-topbar class="block md:hidden" />
      <div class="flex w-full flex-col md:flex-row">
        <!-- <user-layout-left-sidebar
        class="sticky bottom-0 top-0 hidden h-screen w-[10%] md:block"
      /> -->
        <div class="h-fit flex-1 border-y-transparent">
          <user-public-landing />
          <user-public-about />
          <user-public-experience />
          <user-public-education />
          <user-public-projects />
          <user-public-similar-users />
          <user-public-contact />
        </div>
        <user-layout-right-sidebar
          class="sticky bottom-0 top-0 hidden h-screen !w-[10%] md:flex"
        />
      </div>
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
const { user, similarUsers } = storeToRefs(useUserStore());

definePageMeta({
  name: QH_ROUTES.USER.PREVIEW,
});

useHead({
  title: `QuickHire - ${qhHelpers.capitalizeWords(route.params.username as string)}`,
});

const gettingUser = ref(true);
const userNotFound = ref(false);
const username = ref<string>(route.params.username.toString());

const editProfile = () => {
  router.replace({
    name: QH_ROUTES.USER.PROFILE,
  });
};

onBeforeMount(async () => {
  gettingUser.value = true;
  if (typeof route.params.username === 'string') {
    const res = await getPublicUser(route.params.username);
    if (res.status === 404) {
      userNotFound.value = true;
    }
    gettingUser.value = false;
  }
});

const searchUser = async () => {
  gettingUser.value = true;
  const res = await getPublicUser(username.value);
  if (res.status === 404) {
    userNotFound.value = true;
  }
  gettingUser.value = false;
  router.replace({
    name: QH_ROUTES.USER.PREVIEW,
    params: { username: username.value },
  });
};

const currentUser = computed(
  () => user.value?.username === (route.params.username as string),
);
</script>

<style scoped></style>
