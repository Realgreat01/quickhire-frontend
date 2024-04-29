<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in" appear>
      <div
        @click.self="closeModal"
        class="fixed left-0 top-0 z-[100] flex h-screen w-full flex-col items-center justify-center bg-[#00000080] bg-opacity-70"
      >
        <Transition
          name="slideIn"
          appear
          mode="out-in"
          enter-active-class="animate__animated animate__zoomIn"
          leave-active-class="animate__animated animate__zoomOut"
        >
          <div
            class="scroll modal-content relative rounded-lg bg-white px-4 pb-4"
            :class="class"
          >
            <div
              class="sticky top-0 z-50 flex w-full items-center justify-center border-b bg-white pb-2 pt-4"
            >
              <h2
                class="qh-text-2 ml-4 mt-4 w-fit justify-self-center text-center font-black capitalize text-brand"
                v-if="title"
              >
                {{ title }}
              </h2>

              <RiCloseFill
                class="absolute right-0 top-0 m-4 block h-8 w-8 cursor-pointer justify-self-end text-brand"
                @click="closeModal"
              />
            </div>
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { RiCloseFill } from 'vue-remix-icons';

const emits = defineEmits(['close']);
const props = defineProps({ class: String, title: String });
const closeModal = () => {
  emits('close');
};

onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = 'visible';
});
</script>

<style scoped>
.modal-content {
  max-height: 96%;
  width: 50vw;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 700px) {
  .modal-content {
    width: 95% !important;
    max-width: none;
  }
}
</style>
