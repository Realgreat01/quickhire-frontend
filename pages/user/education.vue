<template>
  <div class="grid w-full gap-4 md:flex">
    <div class="flex-1">
      <div class="flex flex-col gap-6 rounded" ref="draggable">
        <qh-card
          class="relative flex h-fit w-full cursor-pointer flex-col items-start justify-between rounded px-4 duration-500 md:px-12 md:py-8"
          :class="index % 2 === 0 ? '' : 'justify-self-end'"
          v-for="(education, index) in educations"
          :key="education._id"
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
            <a
              :href="education.school_website"
              target="_blank"
              class="qh-text-4 text-brand"
            >
              {{ qhHelpers.formatWebsiteName(education.school_website) }}
            </a>
          </div>

          <div class="flex">
            <RiCalendarFill class="icon !h-6 !w-6" />
            <h2 class="qh-text-4">
              <span class="">{{
                qhDates.shortDate(education.entry_date)
              }}</span>
              -
              <span class="">{{
                qhDates.shortDate(education.graduation_date)
              }}</span>
            </h2>
          </div>

          <div class="flex" v-if="!editting">
            <RiArticleFill class="icon !h-6 !w-6" />
            <h2 class="qh-text-4 w-fit" v-html="education.description"></h2>
          </div>
        </qh-card>
      </div>

      <div class="mt-4 grid gap-4 gap-x-8 md:flex" v-if="educations">
        <qh-button
          class="!h-12 !rounded-full duration-500 md:!w-60"
          :class="editting ? '!bg-success-600' : ''"
          v-if="educations && educations.length > 0"
          :loading="updating"
        >
          <span class="w-full" @click="updateUserEducation" v-if="editting"
            >Save Changes</span
          >
          <span class="w-full" v-else @click="startDrag">Edit Changes</span>
        </qh-button>

        <qh-button
          variant="outlined"
          class="!h-12 !rounded-full md:!w-60"
          @click="addEducation"
          :disabled="updating"
        >
          <RiAddLine class="mr-4 h-6 w-6" />
          Add Education</qh-button
        >
      </div>
      <qh-card class="grid place-items-center gap-4" v-if="!educations">
        <qh-empty-content message="You have not added your education History" />
        <qh-button
          variant="outlined"
          class="!h-12 !rounded-full md:!w-60"
          @click="addEducation"
          :disabled="updating"
        >
          <RiAddLine class="mr-4 h-6 w-6" />
          Add Education</qh-button
        >
      </qh-card>
    </div>

    <qh-quick-ai />
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
  RiAddLine,
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

const { educations, Educations, updating } = storeToRefs(useUserStore());
const { deleteEducation, updateUserDetails } = useUserStore();

const educationList = ref<any>(educations.value);
const draggable = ref<HTMLElement | undefined>();
const editting = ref(false);
const modalStore = useModalStore();
const router = useRouter();

const dragFunction = qhDraggable(draggable, ref(educationList.value).value);

const startDrag = () => {
  editting.value = true;
  educationList.value = Educations.value;
  dragFunction.start();
  qhToast.info({
    title: 'Edit Education',
    message: 'Kindly drag your education to reorder',
  });
};

const updateUserEducation = async () => {
  editting.value = false;
  educationList.value = educations.value;
  dragFunction.pause();
  await updateUserDetails({ education: educationList.value });
};

const addEducation = (id: string) => {
  router.replace({ query: { add: QH_ROUTES.USER.EDUCATION } });
};
const editEducation = (id: string) => {
  router.replace({ query: { edit: QH_ROUTES.USER.EDUCATION, id } });
};

async function deleteUserEducation(id: string) {
  const result = await modalStore.openModal();
  if (result) {
    await deleteEducation(id);
  }
}

onMounted(() => {
  dragFunction.destroy();
});

onUnmounted(() => {
  dragFunction.destroy();
});
</script>

<style scoped>
.icon {
  @apply mr-3 fill-brand text-brand;
}
</style>
