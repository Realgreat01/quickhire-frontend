<template>
  <div class="">
    <div class="flex flex-col gap-6 rounded" ref="draggable">
      <qh-card
        class="relative flex h-fit w-full cursor-pointer flex-col items-start justify-between rounded px-4 py-6 md:w-2/3 md:px-12 md:py-8"
        :class="index % 2 === 0 ? '' : 'justify-self-end'"
        v-for="(education, index) in educationList"
        :key="index"
      >
        <qh-edit-button
          class="text-dark"
          @click="editEducation(education._id)"
        />
        <qh-delete-button
          class="top-12"
          @click="deleteUserEducation(education._id)"
        />
        <div class="flex">
          <RiSchoolFill class="icon !h-6 !w-6" />
          <h2 class="qh-text-2 font-semibold">{{ education.institution }}</h2>
        </div>

        <div class="flex">
          <RiGraduationCapFill class="icon !h-6 !w-6" />
          <h2 class="qh-text-4 font-semibold">{{ education.type }}</h2>
        </div>

        <div class="flex">
          <RiBookFill class="icon !h-6 !w-6" />
          <h2 class="qh-text-4 font-medium">{{ education.course }}</h2>
        </div>

        <div class="flex" v-if="education.school_website">
          <RiGlobalFill class="icon !h-6 !w-6" />
          <h2 class="qh-text-4">{{ education.school_website }}</h2>
        </div>

        <div class="flex">
          <RiCalendarFill class="icon !h-6 !w-6" />
          <h2 class="qh-text-4">
            <span class="">{{ qhDates.shortDate(education.entry_date) }}</span>
            -
            <span class="">{{
              qhDates.shortDate(education.graduation_date)
            }}</span>
          </h2>
        </div>

        <div class="flex">
          <RiArticleFill class="icon !h-6 !w-6" />
          <h2 class="qh-text-4 w-fit" v-html="education.description"></h2>
        </div>
      </qh-card>
    </div>
    <qh-empty-content
      message="You have not added your education History"
      v-if="educationList.length <= 0"
    />

    <qh-button
      class="my-4 rounded-full !py-3 md:w-60"
      @click="updateUserEducation"
      v-if="educationList == educations"
      :loading="updating"
      >Save Changes</qh-button
    >
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  RiArticleFill,
  RiGlobalFill,
  RiSchoolFill,
  RiGraduationCapFill,
  RiCalendarFill,
  RiBookFill,
} from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';
import { useModalStore } from '~/store/modal-store';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.EDUCATION,
});

useHead({
  title: 'QuickHire - Education',
});

const { educations, updating } = storeToRefs(useUserStore());
const { deleteEducation, updateUserDetails } = useUserStore();

const educationList = ref<any>(educations.value);
const draggable = ref<HTMLElement | undefined>();

const modalStore = useModalStore();
const router = useRouter();

qhDraggable(draggable, educationList.value);

const editEducation = (id: string) => {
  router.replace({ query: { edit: QH_ROUTES.USER.EDUCATION, id } });
};

async function deleteUserEducation(id: string) {
  const result = await modalStore.openModal();
  if (result) {
    await deleteEducation(id);
  }
}

const updateUserEducation = async () => {
  await updateUserDetails({ education: educationList.value });
};

watch(educations, (education) => (educationList.value = education));
</script>

<style scoped>
.icon {
  @apply mr-3 fill-brand text-brand;
}
</style>
