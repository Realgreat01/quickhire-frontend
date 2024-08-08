<template>
  <div
    class="sticky bottom-0 top-0 flex h-screen flex-col items-center justify-center gap-2 bg-white px-2"
  >
    <qh-card
      class="font-poppins relative my-4 flex h-80 w-full flex-col items-center justify-center border-2 !border-dark-50"
    >
      <qh-edit-button class="text-dark" @click="editProfile" />
      <div class="relative block" v-if="user?.profile_picture">
        <img
          :src="user?.profile_picture"
          alt=""
          class="block h-36 max-w-36 rounded-[50%] border-4 border-brand"
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
      <h1 class="text-center text-xs text-brand">@{{ user?.username }}</h1>
      <h1 class="qh-text-5 text-center font-medium">
        {{ skills?.stack }}
      </h1>
      <!-- v-show="actionButtonPages.includes(currentRoute.name as string)" 
       <qh-button
        class="h-8 md:w-28"
        @click="
          () => router.replace({ query: { add: currentRoute.meta.name } })
        "
      >
        <RiAddCircleLine class="h-6 w-6 rounded fill-white" />
        <h1 class="qh-text-4 font-normal"></h1>
      </qh-button> -->

      <!--  -->

      <qh-button
        @click="previewprofile"
        class="my-2 mb-4 flex h-8 items-center gap-x-4 rounded-full border border-brand !bg-transparent !text-brand"
      >
        <h1 class="qh-text-4 font-medium">Portfolio</h1>
        <RiExternalLinkLine class="h-6 w-6 rounded fill-brand" />
      </qh-button>
      <qh-resume-button
        :username="user?.username ?? ''"
        class="qh-text-4 h-10 w-fit rounded-full px-8"
      />
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
