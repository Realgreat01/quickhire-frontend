<template>
  <div class="flex max-w-[90vw] flex-col p-4 md:p-10" id="related">
    <qh-section-title>Related Users</qh-section-title>
    <div class="" v-if="similarUsers && similarUsers.length > 0">
      <qh-slider>
        <qh-slide
          v-for="(user, index) in similarUsers"
          :key="user?._id"
          @click="
            router.push({
              name: QH_ROUTES.USER.PREVIEW,
              params: { username: user?.username },
            })
          "
          class="card !h-48 !w-80 gap-4 bg-white p-4"
        >
          <div class="flex items-center gap-4">
            <img
              class="block h-12 w-12 rounded-full border border-brand object-cover"
              :src="user?.profile_picture"
              :alt="user?.username"
            />

            <div class="">
              <h1 class="text-sm font-semibold capitalize">
                {{ user?.firstname }} {{ user?.lastname }}
              </h1>
              <h2 class="qh-text-5 lowercase text-brand">
                @{{ user?.username }}
              </h2>
              <h2 class="qh-text-5 font-medium text-success">
                .
                {{ user?.address.country }}
              </h2>
              <h1 class="qh-text-5 font-medium">
                {{ user?.skills?.stack ?? 'Software Developer' }}
              </h1>
            </div>
          </div>
          <h2 class="qh-text-4 my-4 text-xs">
            {{ qhHelpers.sliceWords(user?.summary ?? header, 50) }}
          </h2>
        </qh-slide>
      </qh-slider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
import { RiGithubLine, RiBox3Fill } from 'vue-remix-icons';
import { useUserStore } from '~/store/user-store';
// import { SplideSlide } from '@splidejs/vue-splide';
import { QH_ROUTES } from '~/constants/routes';
const router = useRouter();
const { similarUsers, allUsers } = storeToRefs(useUserStore());

const header = ref('A software engineer on QuickHire, Connect with me!');
</script>

<style scoped></style>
