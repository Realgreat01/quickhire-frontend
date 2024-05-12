<template>
  <div class="flex w-full flex-col gap-4 p-4">
    <div class="">
      <qh-input name="searched_word" placeholder="find talents" />
    </div>
    <div
      class="grid w-full grid-cols-[0.5fr,3fr,2fr,2fr,1.5fr] gap-4 rounded-lg bg-dark-50 p-6"
      v-for="user in allUsers"
    >
      <img :src="user?.profile_picture" alt="" class="h-10 w-10 rounded-full" />
      <div class="">
        <h1 class="qh-text-3 capitalize">
          {{ user?.firstname + ' ' + user?.lastname }}
        </h1>
        <h2 class="qh-text-4 font-semibold capitalize">
          {{ user?.skills?.stack ?? 'developer' }} /
          {{ user?.experience_level }} Level
        </h2>
        <h2 class="qh-text-4">
          {{ user?.address?.country }}
        </h2>
      </div>

      <div class="flex w-fit flex-col gap-4 capitalize">
        <qh-button
          class="qh-text-4 flex h-4 items-center gap-x-2 rounded-full !bg-success-100 px-4 text-xs font-semibold !text-success-500"
        >
          <RiCashLine class="h-4 w-4" />
          {{ qhNumbers.formatCurrency(user?.rate) }} /
          <span class="">hour</span>
        </qh-button>
        <qh-button
          class="qh-text-4 flex h-4 items-center gap-x-2 rounded-full !bg-brand-100 px-4 text-xs font-semibold capitalize !text-brand-500"
        >
          <RiHomeOfficeLine class="h-4 w-4" />
          {{ user?.job_interest }}
        </qh-button>
      </div>
      <div class="flex w-fit flex-col gap-4">
        <qh-resume-button
          :user="user"
          class="qh-text-4 !h-10 !rounded-full !px-6 !py-2 !text-sm !font-medium"
        />
        <div class="flex">
          <qh-devicon v-for="icon in user?.skills?.top_skills" :icon="icon" />
        </div>
      </div>
      <div class="">
        <qh-button
          label="Portfolio"
          @click="
            router.push({
              name: QH_ROUTES.USER.PREVIEW,
              params: { username: user?.username },
            })
          "
          class="h-8 w-full rounded-full !bg-brand-100 !text-brand"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';
import { RiCashLine, RiHomeOfficeLine } from 'vue-remix-icons';

definePageMeta({
  layout: 'company',
  middleware: ['auth', 'company'],
  name: QH_ROUTES.COMPANY.TALENTS,
});

useHead({
  title: 'QuickHire - Talents',
});

const router = useRouter();

const { allUsers } = storeToRefs(useUserStore());
</script>

<style scoped></style>
