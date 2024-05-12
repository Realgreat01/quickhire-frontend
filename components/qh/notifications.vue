<template>
  <div
    class="scroll bg-brand-dark relative mx-auto h-[460px] w-full overflow-scroll"
  >
    <h1 class="qh-text-2 sticky top-0 bg-white p-4 font-bold text-brand">
      Notifications
    </h1>
    <div class="">
      <div
        v-if="Notifications.length !== 0"
        class="mb-2 flex h-fit w-full flex-col rounded-lg"
      >
        <div
          v-for="notification in notifications"
          @click="notification.is_read = true"
          class="notification qh-text-5 flex w-full cursor-pointer items-start gap-4 rounded-lg p-2 duration-500"
        >
          <div class="m-2 mx-4 w-full">
            <div class="flex gap-x-1">
              <h2
                class="qh-text-4 font-bold text-brand"
                :class="{ 'text-success': notification.is_read }"
              >
                {{ notification.title }}
              </h2>
            </div>
            <p class="w-[90%] truncate text-dark-400 duration-500">
              {{ notification.message }}
              <!-- {{ qhHelpers.sliceWords(notification.message, 50) }} -->
            </p>
          </div>
        </div>
      </div>
      <div
        v-else
        class="top-1/3 mx-auto mt-20 flex h-fit w-full flex-col items-center justify-center"
      >
        <icons-logo class="text-brand" disabled />

        <h2 class="my-8 w-2/3 text-center text-2xl text-dark-600">
          No chats yet! <br />
          <br />
          <span class="text-lg"
            >Start the buzz by creating a new chat with the button below</span
          >
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Notifications from '~/data/notifications.json';
import { useModalStore } from '~/store/modal-store';
const notifications = ref(Notifications);
</script>

<style lang="scss" scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notification {
  &:hover {
    @apply bg-brand-100;
    .truncate {
      white-space: wrap;
      text-overflow: none;
    }
  }
}
</style>
