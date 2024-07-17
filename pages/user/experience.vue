<template>
  <div class="">
    <div class="flex flex-col gap-6 rounded" ref="draggable">
      <qh-card
        v-for="experience in experiences"
        :key="experience._id"
        class="relative flex w-full flex-col justify-between gap-2 rounded-2xl p-4 shadow-xl md:w-4/5"
      >
        <qh-edit-button
          class="text-dark"
          @click="editExperience(experience._id)"
        />
        <qh-delete-button
          class="top-12"
          @click="deleteUserExperience(experience._id)"
        />
        <div class="">
          <RiBuildingFill class="icon h-6 w-6" />
          <h1 class="qh-text-3 font-bold text-secondary-500">
            {{ experience.company }}
          </h1>
        </div>

        <div class="flex">
          <RiToolsFill class="icon h-6 w-6" />
          <h1 class="font-medium text-brand">{{ experience.role }}</h1>
        </div>

        <div class="flex">
          <RiMapPinFill class="icon h-6 w-6" />
          <h1 class="font-medium text-brand">
            {{ experience.company_location }}
          </h1>
        </div>

        <div class="flex">
          <RiGlobeFill class="icon h-6 w-6" />
          <h1 class="font-medium capitalize text-brand">
            {{ experience.location_type }}
          </h1>
        </div>

        <div class="flex">
          <RiBriefcaseFill class="icon h-6 w-6" />
          <h1 class="font-medium text-brand">{{ experience.job_type }}</h1>
        </div>

        <div class="flex">
          <RiCalendar2Fill class="icon h-6 w-6" />
          <h1 class="text-sm font-medium text-brand">
            <span class="">{{ qhDates.shortDate(experience.start_date) }}</span>
            -
            <span class="">{{ qhDates.shortDate(experience.end_date) }}</span>
          </h1>
        </div>

        <div class="">
          <RiFileListFill class="icon h-6 w-6" />

          <h2 class="" v-html="experience.contributions"></h2>
          <!-- <span class="block" v-html="experience.contributions"></span> -->
        </div>
      </qh-card>
    </div>
    <qh-button
      class="my-4 hidden rounded-full !py-3 md:w-60"
      @click="updateExperience"
      v-if="experienceList.length > 0"
      :loading="updating"
      >Save Changes</qh-button
    >
    <qh-empty-content
      v-if="experienceList.length <= 0"
      message="You have not added your work experience"
    />
  </div>
</template>

<script setup lang="ts">
import {
  RiBuildingFill,
  RiToolsFill,
  RiMapPinFill,
  RiGlobeFill,
  RiCalendar2Fill,
  RiFileListFill,
} from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { useUserStore } from '~/store/user-store';
import { useModalStore } from '~/store/modal-store';
import { storeToRefs } from 'pinia';
import { QH_ROUTES } from '~/constants/routes';
import { RiBriefcaseFill } from 'vue-remix-icons';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.EXPERIENCE,
});

useHead({
  title: 'QuickHire - Experience',
});

const router = useRouter();
const { experiences, updating } = storeToRefs(useUserStore());
const { deleteExperience, updateUserDetails } = useUserStore();
const modalStore = useModalStore();

const draggable = ref();
const experienceList = ref<any>(experiences.value);

// qhDraggable(draggable, experienceList.value);

const editExperience = (id: string) => {
  router.replace({ query: { edit: QH_ROUTES.USER.EXPERIENCE, id } });
};

const deleteUserExperience = async (id: string) => {
  const result = await modalStore.openModal();
  if (result) {
    await deleteExperience(id);
  }
};

const updateExperience = async () => {
  await updateUserDetails({ experience: experienceList.value });
};
</script>

<style scoped>
.icon {
  @apply mr-3 fill-brand-500;
}
</style>
