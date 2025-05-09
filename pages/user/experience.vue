<template>
  <div class="grid w-full gap-4 gap-x-8 lg:flex">
    <div class="w-full">
      <div class="flex w-full flex-col gap-6 rounded" ref="draggable">
        <qh-card
          v-for="experience in experiences"
          :key="experience._id"
          :class="{ 'cursor-pointer': editting }"
          class="relative flex w-full flex-col justify-between gap-2 rounded-2xl bg-white p-4 text-sm shadow-xl"
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
            <h1 class="qh-text-3 font-bold text-brand-500">
              {{ experience.company }}
            </h1>
          </div>

          <div class="flex items-center">
            <RiUser2Fill class="mr-2 h-6 w-6" />
            <h1 class="qh-text-4 font-semibold">{{ experience.role }}</h1>
          </div>

          <div class="flex flex-wrap gap-2">
            <qh-button class="!w-fit !px-3 !text-black" variant="inverse">
              <RiGlobalFill class="h-4 w-4 !text-black" />
              <nuxt-link
                :to="experience.company_website"
                external
                target="_blank"
                class="qh-text-5 font-medium"
              >
                {{ qhHelpers.formatWebsiteName(experience.company_website) }}
              </nuxt-link>
            </qh-button>
            <qh-button class="!w-fit !px-3 !text-black" variant="inverse">
              <RiMapPinFill class="h-4 w-4 !text-black" />
              <h1 class="qh-text-5 font-medium capitalize">
                {{ experience.company_location }}
              </h1>
            </qh-button>

            <qh-button class="!w-fit !px-3 !text-black" variant="inverse">
              <RiGlobeFill class="h-4 w-4" />
              <h1 class="qh-text-5 font-medium capitalize">
                {{ experience.location_type }}
              </h1>
            </qh-button>

            <qh-button class="!w-fit !px-3 !text-black" variant="inverse">
              <RiBriefcaseFill class="h-4 w-4" />
              <h1 class="qh-text-5 font-medium capitalize">
                {{ experience.job_type }}
              </h1>
            </qh-button>
          </div>
          <div class="flex">
            <RiCalendar2Fill class="mr-3 h-4 w-4" />
            <h1 class="qh-text-5 font-medium">
              <span class="">{{
                qhDates.resumeDate(experience.start_date)
              }}</span>
              -
              <span class="">{{
                qhDates.resumeDate(experience.end_date)
              }}</span>
            </h1>
          </div>
          <Transition name="fade" mode="out-in">
            <div class="" v-if="!editting">
              <RiFileListFill class="icon h-6 w-6" />
              <h2 class="qh-text-4" v-html="experience.contributions"></h2>
              <!-- <span class="block" v-html="experience.contributions"></span> -->
            </div>
          </Transition>
        </qh-card>
      </div>
      <div
        class="mt-4 grid w-full gap-4 gap-x-8 md:flex"
        v-if="qhHelpers.isObjectTruthy(experiences as object)"
      >
        <qh-button
          class="!h-12 !rounded-full duration-500 md:!w-60"
          :class="editting ? '!bg-success-600' : ''"
          v-if="experiences && experiences.length > 0"
          :loading="updating"
        >
          <span class="w-full" @click="updateExperience" v-if="editting"
            >Save Changes</span
          >
          <span class="w-full" v-else @click="startDrag">Edit Changes</span>
        </qh-button>

        <qh-button
          variant="outlined"
          class="!h-12 !rounded-full md:!w-60"
          @click="addExperience"
          :disabled="updating"
        >
          <RiAddLine class="mr-4 h-6 w-6" />
          Add Exprience</qh-button
        >
      </div>
      <qh-card v-else class="grid w-full place-items-center gap-4">
        <qh-empty-content message="You have not added your work experience" />
        <qh-button
          variant="outlined"
          class="!h-12 !rounded-full md:!w-60"
          @click="addExperience"
          :disabled="updating"
        >
          <RiAddLine class="mr-4 h-6 w-6" />
          Add Exprience</qh-button
        >
      </qh-card>
    </div>
    <qh-quick-ai />
  </div>
</template>

<script setup lang="ts">
import {
  RiBuildingFill,
  RiToolsFill,
  RiMapPinFill,
  RiGlobeFill,
  RiCalendar2Fill,
  RiAddLine,
  RiFileListFill,
  RiGlobalFill,
  RiUser2Fill,
  RiBriefcaseFill,
} from 'vue-remix-icons';

import QH_CONSTANTS from '~/constants';
import { useUserStore } from '~/store/user-store';
import { useModalStore } from '~/store/modal-store';
import { storeToRefs } from 'pinia';
import { QH_ROUTES } from '~/constants/routes';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.EXPERIENCE,
});

useHead({
  title: 'QuickHire - Experience',
});

const router = useRouter();
const { experiences, updating, Experiences } = storeToRefs(useUserStore());
const { deleteExperience, updateUserDetails } = useUserStore();
const modalStore = useModalStore();

const experienceList = ref<any>(experiences.value);

const draggable = ref<HTMLElement | undefined>();
const editting = ref(false);
const dragFunction = qhDraggable(draggable, ref(experienceList.value).value);

const startDrag = () => {
  editting.value = true;
  experienceList.value = Experiences.value;
  dragFunction.start();
  qhToast.info({
    title: 'Edit Experience',
    message: 'Kindly drag your experience to reorder',
  });
};

const updateExperience = async () => {
  editting.value = false;
  experienceList.value = experiences.value;
  dragFunction.pause();
  await updateUserDetails({ experience: experienceList.value });
};

const editExperience = (id: string) => {
  router.replace({ query: { edit: QH_ROUTES.USER.EXPERIENCE, id } });
};

const addExperience = (id: string) => {
  router.replace({ query: { add: QH_ROUTES.USER.EXPERIENCE } });
};

const deleteUserExperience = async (id: string) => {
  const result = await modalStore.openModal();
  if (result) {
    await deleteExperience(id);
  }
};
onMounted(() => {
  dragFunction.destroy();
});
onUnmounted(() => {
  dragFunction.destroy();
});
</script>

<style scoped>
.icon {
  @apply mr-3 fill-brand-500;
}
</style>
