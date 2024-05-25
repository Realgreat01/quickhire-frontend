<template>
  <qh-container class="">
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
        <div
          class="flex w-48 items-center justify-center rounded-lg border bg-error-100 px-4 py-2"
          @click="$emit('cancelled')"
        >
          <RiCloseCircleFill class="h-8 w-8 fill-error" />
          <qh-button class="!bg-transparent !px-2 !text-error" label="Cancel" />
        </div>

        <div
          class="flex w-48 items-center justify-center gap-x-1 rounded-lg border bg-brand-100 px-4 py-2"
          @click="emits('continue')"
        >
          <RiCheckboxCircleFill class="h-8 w-8 fill-brand" />
          <qh-button
            class="bg-transparent !px-2 !text-brand"
            label="Continue"
          />
        </div>
      </div>
    </div>
  </qh-container>
</template>

<script setup lang="ts">
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'vue-remix-icons';
import { useModalStore } from '~/store/modal-store';

const emits = defineEmits(['continue', 'cancelled']);

const modalStore = useModalStore();
</script>
<style lang="scss" scoped>
.button {
  @apply mx-[2rem] block w-4/5 rounded-lg p-2 text-xl outline-none;
}
</style>
