<template>
  <div
    class="flex h-screen w-full flex-col items-center justify-start bg-white text-brand"
  >
    <div class="mb-32 w-full items-start justify-self-start p-8 md:mb-0">
      <icons-logo class="text-brand" />
    </div>
    <div class="qh-flex-center flex-col text-center" v-if="NotFoundError">
      <img src="./assets/svgs/404-error.svg" alt="" class="w-80 md:-mt-10" />
      <h1 class="qh-text-1 font-geologica">Page Not Found!</h1>
    </div>
    <div class="qh-flex-center flex-col text-center" v-else>
      <img
        src="./assets/svgs/error-occured.svg"
        alt=""
        class="w-80 md:-mt-10"
      />
      <h1 class="qh-text-1 font-geologica">Oops!, An Error Occured</h1>
    </div>
    <router-link :to="{ name: QH_ROUTES.USER.INDEX }" class="">
      <qh-button
        class="apply-button my-6 w-96 gap-x-6 rounded-full border border-brand bg-transparent px-10 font-medium !text-brand"
      >
        <ArrowLeftCircleIcon class="apply-icon h-8 w-8" />
        <span class="">Back to Dashboard</span>
      </qh-button>
    </router-link>
  </div>
</template>

<script setup>
import { ArrowLeftCircleIcon } from '@heroicons/vue/24/outline';
import { QH_ROUTES } from './constants/routes';

const error = useError();
const NotFoundError = ref(error.value.statusCode === 404);
onMounted(() => console.log({ error }));
</script>
