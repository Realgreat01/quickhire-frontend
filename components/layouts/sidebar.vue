<template>
  <div
    class="sticky bottom-0 top-0 flex h-screen flex-col items-center justify-center gap-2 bg-white px-2"
  >
    <qh-card
      class="font-poppins relative my-4 flex h-60 w-full flex-col items-center justify-center border-2 !border-dark-50"
    >
      <qh-edit-button class="text-dark" @click="editProfile" />
      <img
        class="m-2 block h-32 w-32 rounded-full border border-brand"
        :src="user?.profile_picture"
        alt=""
      />
      <h1 class="qh-text-4 w-full text-center font-semibold capitalize">
        {{ fullname }}
      </h1>
      <h1 class="text-center text-xs text-brand">@{{ user?.username }}</h1>
      <h1 class="qh-text-5 text-center font-medium">
        {{ skills?.stack }}
      </h1>
    </qh-card>

    <RouterLink
      :to="{ name: nav.route }"
      class="router flex w-52 cursor-pointer p-1 py-[6px] pl-4 font-bold hover:scale-[1.025]"
      v-for="nav in UserNavigations"
      :class="
        currentRoute.name === nav.route || currentRoute.path.includes(nav.route)
          ? nav.class
          : 'text-dark-400'
      "
      :key="nav.route"
    >
      <component :is="nav.icon" class="mr-3 h-5 w-5 rounded" />
      <h1 class="qh-text-4 font-normal">
        {{ nav.title }}
      </h1>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { UserNavigations } from './user-navigations';
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/user-store';
import { RouterLink, useRouter } from 'vue-router';
import { QH_ROUTES } from '~/constants/routes';

const currentRoute = useRoute();
const router = useRouter();
const { fullname, user, skills } = storeToRefs(useUserStore());
const editProfile = () => {
  return router.replace({ query: { edit: QH_ROUTES.USER.PROFILE } });
};
</script>

<style scoped lang="scss">
// .router {
//   @apply text-dark-400;
//   svg {
//     @apply bg-dark-100;
//   }
// }

// .router-link-exact-active {
//   @apply rounded-lg border text-brand-600;
//   svg {
//     @apply bg-brand-100;
//   }
// }
</style>
