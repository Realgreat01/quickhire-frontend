<template>
  <div
    id="contact"
    class="gap-small my-[10rem] flex flex-col items-center text-center"
  >
    <qh-section-title :has-both-ends="true">Contact&nbsp;Me</qh-section-title>
    <h1 class="qh-text-1 font-bold text-brand">Let's Connect !</h1>
    <p class="my-6 w-4/5 text-center text-dark">
      Let's connect and collaborate on your next project for a successful
      partnership!
    </p>

    <qh-button
      class="my-5 w-80 border border-brand !bg-transparent !text-brand hover:bg-brand-400"
      @click="SendMail"
      label="Say Hello !"
    />

    <div class="flex flex-wrap items-center justify-center">
      <div
        class="flex items-center gap-x-2"
        v-for="(contact, index) in contactInformation"
        :key="index"
      >
        <component :is="contact.icon" class="h-6 w-6 text-brand-600" />
        <p class="cursor-pointer pr-3" @click="contact.action">
          {{ contact.contact }}
        </p>
      </div>
    </div>
    <h2 class="my-5 mt-20 font-bold">
      <icons-logo />
    </h2>
    <qh-button class="w-96" @click="$router.push({ name: QH_ROUTES.HOME })">
      Join QuickHire</qh-button
    >
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { RiWhatsappFill } from 'vue-remix-icons';
import { useUserStore } from '~/store/user-store';
import { EnvelopeIcon } from '@heroicons/vue/24/outline';
import { QH_ROUTES } from '~/constants/routes';
const { publicUser: user } = storeToRefs(useUserStore());

const SendMail = () => (window.location.href = 'mailto:' + user.value?.email);

const contactInformation = ref([
  {
    icon: EnvelopeIcon,
    contact: user.value?.email,
    action: (): void => {
      window.location.href = 'mailto:' + user.value?.email;
    },
  },
]);
</script>

<style scoped></style>
