<template>
  <qh-container class="qh-flex-center flex-col gap-10 md:block">
    <div class="mb-10">
      <img
        src="~/assets/svgs/question.svg"
        alt=""
        class="mx-auto h-48 text-center"
      />
      <h2 class="qh-text-1 text-center font-bold">{{ modalStore.title }}</h2>
      <p
        class="qh-text-3 mx-auto my-6 w-2/3 text-center"
        v-html="modalStore.message"
      ></p>

      <div class="qh-flex-center mt-4 w-full gap-8">
        <qh-button
          class="!h-12 max-w-48 !rounded-lg bg-error-100 !px-6 !text-error"
          variant="plain"
          @click="emit('cancelled')"
        >
          <RiCloseCircleFill class="h-8 w-8 fill-error" />
          <span class="">Cancel</span>
        </qh-button>

        <qh-button
          class="!h-12 max-w-48 !rounded-lg bg-brand-100 !px-6 !text-brand"
          variant="plain"
          @click="emit('continue')"
        >
          <RiCheckboxCircleFill class="h-8 w-8 fill-brand" />
          <span class="">Cancel</span>
        </qh-button>
      </div>
    </div>
  </qh-container>
</template>

<script setup lang="ts">
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'vue-remix-icons';
import { useModalStore } from '~/store/modal-store';

const emit = defineEmits(['continue', 'cancelled']);

const modalStore = useModalStore();
</script>
<style lang="scss" scoped>
.button {
  @apply mx-[2rem] block w-4/5 rounded-lg p-2 text-xl outline-none;
}
</style>
