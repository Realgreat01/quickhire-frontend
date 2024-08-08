<template>
  <div class="flex max-w-[90vw] flex-col p-4 md:p-10" id="related">
    <qh-section-title>Related&nbsp;Users</qh-section-title>
    <div class="" v-if="similarUsers && similarUsers.length > 0">
      <Carousel v-bind="splide_option">
        <Slide
          v-for="(user, index) in similarUsers"
          :key="user?._id"
          @click="
            router.push({
              name: QH_ROUTES.USER.PREVIEW,
              params: { username: user?.username },
            })
          "
          class="!h-48 max-w-80"
        >
          <qh-card class="carousel__item w-full justify-start gap-4 border p-4">
            <div class="flex items-center justify-start gap-4">
              <img
                class="block h-12 w-12 rounded-full border border-brand object-cover"
                :src="user?.profile_picture"
                :alt="user?.username"
              />

              <div class="flex flex-col items-start justify-start">
                <h1 class="text-sm font-semibold capitalize">
                  {{ user?.firstname }} {{ user?.lastname }}
                </h1>
                <h2 class="qh-text-5 lowercase text-brand">
                  @{{ user?.username }}
                </h2>
                <h2 class="qh-text-5 font-medium text-success">
                  {{ user?.address.country }}
                </h2>
                <h1 class="qh-text-5 font-medium">
                  {{ user?.skills?.stack ?? 'Software Developer' }}
                </h1>
              </div>
            </div>
            <h2 class="qh-text-4 my-4 justify-start text-start text-xs">
              {{ qhHelpers.sliceWords(user?.summary ?? header, 50) }}
            </h2>
          </qh-card>
        </Slide>
        <template #addons>
          <Pagination />
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
import { RiGithubLine, RiBox3Fill } from 'vue-remix-icons';
import { useUserStore } from '~/store/user-store';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const splide_option = ref({
  wrapAround: true,
  autoplay: 1500,
  pauseAutoplayOnHover: true,
  itemsToShow: 1,
  settings: {
    snapAlign: 'start',
  },
  breakpoints: {
    500: {
      itemsToShow: 1,
    },
    1200: {
      itemsToShow: 4,
    },
  },
});
import { QH_ROUTES } from '~/constants/routes';
const router = useRouter();
const { similarUsers, allUsers } = storeToRefs(useUserStore());

const header = ref('A software engineer on QuickHire, Connect with me!');
</script>

<style scoped>
.carousel__slide {
  /* margin: 10px; */
  transform: scale(0.95);
}
.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}
</style>
