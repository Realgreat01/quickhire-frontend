<template>
  <div
    class="scroll bg-brand-dark relative mx-auto h-[460px] w-full overflow-scroll"
  >
    <h1
      class="qh-text-2 sticky top-0 z-10 flex items-center gap-x-2 bg-white p-4 font-bold text-brand"
    >
      <RiArrowLeftCircleFill
        class="h-6 text-brand"
        v-if="showChats"
        @click="showChats = false"
      />
      <h2 class="">Messages</h2>

      <h2 class="text-secondary" v-if="showChats">- {{ receiver }}</h2>
    </h1>
    <div class="">
      <div
        v-if="chatHistory.length !== 0 && !showChats"
        class="mb-2 flex h-fit w-full flex-col rounded-lg"
      >
        <div
          v-for="user in chatHistory"
          @click="
            () => {
              receiver = user.firstname;
              showChats = true;
            }
          "
          class="qh-text-5 flex w-full cursor-pointer items-start gap-4 !p-2"
        >
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            class="block h-10 w-10 rounded-full bg-white"
            alt=""
          />
          <div class="mx-4h m-2">
            <div class="flex gap-x-1">
              <h2 class="qh-text-4 font-bold text-brand">
                {{ user.firstname }} {{ user.lastname }}
              </h2>
              <h2 class="text-slate-400">@{{ user.username }}</h2>
            </div>
            <p class="text-dark-400">
              {{ qhHelpers.sliceWords(user.last_message, 50) }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="qh-text-4 relative flex flex-col font-medium"
        v-else-if="showChats && chatHistory.length !== 0"
      >
        <h2
          v-for="message in messages"
          class="my-2 w-3/4 rounded-lg bg-dark-100 p-3 text-dark"
          :class="{
            'self-end justify-self-end  bg-success-200 text-right':
              message.sender === 'Bob',
          }"
        >
          <span class="">{{ message.message }}</span>
          <span class="qh-text-5 block text-dark-300">{{
            format(message.timestamp)
          }}</span>
        </h2>
        <qh-input
          @button-click="addToMessage"
          name="message"
          @keyup.enter="addToMessage"
          v-model="message"
          class="sticky bottom-0 w-full pt-4"
          button-text="Send"
        ></qh-input>
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
import { RiArrowLeftCircleFill, RiArrowLeftFill } from 'vue-remix-icons';
import chatHistory from '~/data/chats.json';
import Messages from '~/data/messages.json';
import { format } from 'timeago.js';
import { useModalStore } from '~/store/modal-store';
const messages = ref(Messages);
const receiver = ref('Alice');
const showChats = ref(false);
const message = ref('');
const addToMessage = () => {
  messages.value.push({
    sender: 'Bob',
    receiver: 'Alice',
    message: message.value,
    timestamp: new Date().toDateString(),
  });
  message.value = '';
};
</script>

<style lang="scss" scoped></style>
