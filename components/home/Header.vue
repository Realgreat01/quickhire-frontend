<template>
  <div
    class="sticky top-0 z-[99] flex w-full items-center justify-between bg-white"
  >
    <icons-logo class="text-brand" />
    <div class="qh-flex-center hidden">
      <a
        :href="nav.link"
        class="qh-text-4 flex items-center rounded-full !bg-transparent px-4 py-1 !text-brand duration-200 hover:!bg-brand-500 hover:!fill-brand-50 hover:!text-white"
        v-for="(nav, index) in headerNavigations"
        :key="index"
      >
        <component :is="nav.icon" class="mr-2 h-6 w-6"></component>
        <span class="qh-text-4"> {{ nav.title }}</span></a
      >
    </div>
    <div class="hidden gap-x-4 md:flex" v-if="isLoggedIn">
      <RouterLink :to="{ name: QH_ROUTES.USER.PROFILE }">
        <qh-button
          class="h-10 w-60 rounded-full font-medium"
          label="Dashboard"
        />
      </RouterLink>
    </div>
    <div class="hidden gap-x-4 md:flex" v-else>
      <RouterLink :to="{ name: QH_ROUTES.USER.LOGIN }">
        <qh-button class="h-10 w-60 rounded-full font-medium" label="Login" />
      </RouterLink>
      <RouterLink :to="{ name: QH_ROUTES.USER.REGISTER }">
        <qh-button
          label="Create&nbsp;Account"
          class="h-10 w-60 rounded-full border border-brand bg-transparent font-medium !text-brand"
        />
      </RouterLink>
    </div>

    <qh-dropdown class="block md:hidden">
      <div class="!min-w-[400px]">
        <div class="mb-8 flex flex-col gap-y-4">
          <a
            :href="nav.link"
            @click="qhDropdown.close"
            class="mr-4 flex !bg-transparent !font-medium !text-brand-400 hover:!fill-brand-400 hover:!text-brand-400"
            v-for="(nav, index) in headerNavigations"
            :key="index"
          >
            <component :is="nav.icon" class="mr-4 h-6 w-6"></component>
            <span class=""> {{ nav.title }}</span></a
          >
        </div>

        <div class="flex w-full flex-col gap-4">
          <RouterLink :to="{ name: QH_ROUTES.USER.LOGIN }">
            <qh-button
              class="mx-4 h-10 !w-[60%] rounded-full font-medium"
              label="Login"
              @click="qhDropdown.close"
            />
          </RouterLink>
          <RouterLink :to="{ name: QH_ROUTES.USER.REGISTER }">
            <qh-button
              @click="qhDropdown.close"
              label="Create Account"
              class="mx-4 h-10 !w-[60%] rounded-full border border-brand bg-transparent font-medium !text-brand"
            />
          </RouterLink>
        </div>
      </div>
    </qh-dropdown>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';

defineProps({ Class: String });
import {
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  ChatBubbleLeftIcon,
  StarIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline';
import QH_CONSTANTS from '~/constants';

const headerNavigations = ref([
  { link: '#features', title: 'Features', icon: StarIcon },
  { link: '#insights', title: 'Insights', icon: ChartBarIcon },
  { link: '#latest-jobs', title: 'Latest Jobs', icon: BriefcaseIcon },
  { link: '#testimonials', title: 'Testimonials', icon: ChatBubbleLeftIcon },
  { link: '#faqs', title: 'Faqs', icon: QuestionMarkCircleIcon },
]);

const isLoggedIn = computed(() => qhSecuredLS.get(QH_CONSTANTS.AUTH_TOKEN));
</script>

<style scoped></style>
