<template>
  <div
    class="sticky bottom-0 top-0 flex h-screen flex-col items-center justify-center gap-2 bg-white px-2"
  >
    <qh-card
      class="font-poppins relative my-4 flex max-h-80 w-full flex-col items-center justify-center border-2 !border-dark-50 bg-white"
    >
      <qh-edit-button class="text-dark" @click="editProfile" />
      <div class="relative block" v-if="user?.profile_picture">
        <img
          :src="user?.profile_picture"
          alt=""
          class="block h-28 w-28 rounded-[50%] border-4 border-brand"
        />
        <qh-edit-button
          @click="uploadProfilePicture"
          class="right-1 top-1 rounded-lg bg-brand fill-white p-1 text-white"
        />
        <!-- class="!left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 transform text-brand" -->
      </div>
      <h1 class="qh-text-4 w-full text-center font-semibold capitalize">
        {{ fullname }}
      </h1>
      <h1 class="text-center text-xs text-secondary-500">
        @{{ user?.username }}
      </h1>
      <h1 class="qh-text-5 text-center font-medium">
        {{ skills?.stack }}
      </h1>

      <qh-button
        @click="previewprofile"
        variant="outlined"
        class="my-2 h-8 items-center gap-x-4 border border-brand"
      >
        <h1 class="qh-text-4 font-medium">Portfolio</h1>
        <arrow-top-right-on-square-icon class="h-5 w-5 rounded text-brand" />
      </qh-button>

      <qh-resume-button
        :username="user?.username ?? ''"
        class="qh-text-4 h-8 w-max rounded-full !border-white px-8"
      />
    </qh-card>

    <RouterLink
      :to="{ name: nav.route }"
      class="router flex w-full cursor-pointer p-1 py-[6px] pl-4 font-bold hover:scale-[1.025]"
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
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline';
import { useUserStore } from '~/store/user-store';
import { RouterLink, useRouter } from 'vue-router';
import { QH_ROUTES } from '~/constants/routes';
import { RiExternalLinkLine } from 'vue-remix-icons';
import { useUploadStore } from '~/store/upload-store';
import { UPDATE_USER_PROFILE_PICTURE } from '~/services/user.service';

const currentRoute = useRoute();
const uploadStore = useUploadStore();
const router = useRouter();
const { fullname, user, skills } = storeToRefs(useUserStore());
const { getCurrentUser } = useUserStore();
const editProfile = () => {
  return router.replace({ query: { edit: QH_ROUTES.USER.PROFILE } });
};

const previewprofile = () => {
  router.replace({
    name: QH_ROUTES.USER.PREVIEW,
    params: { username: user.value?.username },
  });
};

const uploadProfilePicture = async () => {
  try {
    const result = await uploadStore.openModal();
    if (result) {
      const formData = new FormData();
      formData.append('profile_picture', result[0]);
      const res = await UPDATE_USER_PROFILE_PICTURE(formData);
      if (res.success) {
        getCurrentUser();
        qhToast.success('update successful');
        uploadStore.uploadComplete();
      } else {
        qhToast.error('picture update failed');
        uploadStore.uploadFailed();
        uploadProfilePicture();
      }
    }
  } catch (error) {
    console.log('user upload cancelled');
  }
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
