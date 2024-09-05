<template>
  <div class="relative grid h-screen overflow-auto md:grid-cols-[3fr,2fr]">
    <div
      class="qh-flex-center bg-brand-90 sticky bottom-0 top-0 hidden h-screen w-full md:flex"
    >
      <icons-logo class="fixed left-4 top-4 text-brand" />
      <img
        src="~/assets/svgs/auth.svg"
        alt=""
        class="qh-flex-center mt-20 block h-full"
      />
    </div>

    <div class="qh-flex-center relative h-full flex-col shadow">
      <div
        class="qh-flex-center z-10 my-10 flex h-[15vh] w-full flex-col gap-2 bg-white p-5"
      >
        <qh-button
          variant="plain"
          @click="goBack"
          class="absolute left-5 top-5 mb-5 !w-fit !gap-x-4 border md:hidden"
        >
          <RiArrowLeftLine class="h-6 w-6" />
          <span class="">{{ backButtonText }}</span>
        </qh-button>
        <img
          src="/quickhire-logo.svg"
          alt=""
          class="mx-auto mb-4 block h-10 w-10 object-contain md:hidden"
        />
        <h1 class="qh-text-1 mt-0 text-center font-bold text-brand-600">
          {{ $route.meta.title }}
        </h1>
        <h1 class="qh-text-4 text-center font-medium text-brand-800">
          {{ $route.meta.pageHint }}
        </h1>
      </div>
      <qh-card
        class="scroll m-1 mt-2 max-h-[70vh] min-h-[200px] w-[96%] overflow-y-scroll bg-white p-3 pt-5 md:p-4"
      >
        <NuxtPage />
      </qh-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RiArrowLeftLine } from 'vue-remix-icons';
import { QH_ROUTES } from '~/constants/routes';

const router = useRouter();
const route = useRoute();
const fromRoutePath = ref<any>(QH_ROUTES.HOME);
const backButtonText = ref('Go Back');

const goBack = () => router.push({ name: fromRoutePath.value });

watch(
  () => route.name,
  (to, from) => {
    if (from === QH_ROUTES.HOME || undefined) {
      backButtonText.value = 'Go Home';
      fromRoutePath.value = QH_ROUTES.HOME;
    } else if (from === QH_ROUTES.USER.LOGIN || QH_ROUTES.COMPANY.LOGIN) {
      backButtonText.value = 'Go Home';
      fromRoutePath.value = QH_ROUTES.HOME;
    } else {
      fromRoutePath.value = from;
      backButtonText.value = 'Go Back';
    }
  },
  { deep: true },
);
</script>

<style scoped></style>
