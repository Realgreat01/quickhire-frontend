<template>
  <div class="mt-20 bg-brand-950 py-20 text-slate-400">
    <div>
      <h1 class="qh-text-1 mb-4 font-bold text-white">Join Our NewsLetter</h1>

      <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
        <form
          class="mt-10 grid w-full gap-4 p-2 md:w-[90%]"
          @submit.prevent="handleSubmit($event, subscribeToEmail)"
        >
          <Transition
            name="slideIn"
            appear
            mode="out-in"
            v-show="showOtherFields === true"
            enter-active-class="animate__animated animate__zoomIn"
            leave-active-class="animate__animated animate__zoomOut"
          >
            <div class="grid gap-4 duration-500 md:grid-cols-2">
              <qh-input
                name="firstname"
                label-class="!text-brand-200"
                :errors="errors"
                label="Firstname"
                v-model.trim="subscriber.firstname"
                :rules="ValidationRules.userDetails.firstname"
                required
              />
              <qh-input
                name="lastname"
                label-class="!text-brand-200"
                :errors="errors"
                label="Lastname"
                v-model.trim="subscriber.lastname"
                :rules="ValidationRules.userDetails.lastname"
                required
              />
            </div>
          </Transition>
          <div class="flex flex-col gap-1">
            <label
              for="email"
              class="font-medium text-brand-200"
              v-if="showOtherFields"
            >
              Email Address
              <span class="!font-normal text-error">*</span></label
            >
            <div
              class="mb-10 mt-0 flex h-12 items-center overflow-hidden rounded-xl bg-white"
            >
              <qh-input
                v-model="subscriber.email"
                label-class="!text-brand-200"
                name="email"
                type="email"
                hideErrorMessage
                :rules="ValidationRules.userDetails.email"
                @input="showOtherFields = true"
                class="w-full flex-1 rounded-none border-none focus:!ring-0 focus:!ring-transparent"
              />
              <qh-button
                label="Subscribe"
                class="h-14 md:!w-48"
                type="submit"
                :loading="isSubmitting"
                :disabled="Object.keys(errors).length !== 0 || isSubmitting"
              />
            </div>
          </div>
        </form>
      </VeeForm>
    </div>

    <icons-logo class="text-white" />
    <div class="grid gap-x-12 gap-y-6 md:grid-cols-[4fr,2fr,5fr,4fr]">
      <div class="">
        <p class="mt-4">
          QuickHire swiftly connects developers with top tech jobs, streamlining
          the hiring process with advanced matching technology. Whether you're
          advancing your career or seeking talent, QuickHire ensures a fast and
          precise recruitment experience.
        </p>
      </div>

      <!--  -->

      <div class="">
        <h2 class="qh-text-3 mb-2 font-semibold text-brand-200 md:mb-20">
          Quick Links
        </h2>
        <h2
          class="mb-2 cursor-pointer font-semibold"
          v-for="(link, index) in quickLinks"
          :key="index"
        >
          <a :href="link.id" class="">{{ link.title }}</a>
        </h2>
      </div>

      <!--  -->
      <div class="">
        <h2 class="qh-text-3 mb-3 font-semibold text-brand-200 md:mb-20">
          Contact Address
        </h2>
        <div class="flex flex-col">
          <div
            class="mb-4 flex items-center gap-x-6 fill-white"
            v-for="(contact, index) in contactInformation"
            :key="index"
          >
            <component :is="contact.icon" class="h-6 w-6" />
            <p class="cursor-pointer" @click="contact.action">
              {{ contact.contact }}
            </p>
          </div>

          <div
            class="mb-4 flex items-center gap-x-6 fill-white"
            v-for="(link, index) in socialLinks"
            :key="index"
          >
            <component :is="link.icon" class="h-6 w-6" />
            <a class="cursor-pointer" :href="link.link">
              {{ link.title }}
            </a>
          </div>
        </div>
      </div>

      <!--  -->

      <div class="">
        <h2 class="qh-text-3 mb-3 font-semibold text-brand-200 md:mb-20">
          Resources
        </h2>
        <div class="flex h-80 flex-col flex-wrap">
          <h2
            class="mb-4 cursor-pointer"
            v-for="(link, index) in othersLinks"
            :key="index"
          >
            <a :href="link.id" class="">{{ link.title }}</a>
          </h2>
        </div>
      </div>
    </div>
    <h2
      class="mx-auto mt-5 w-4/5 border-[1px] border-transparent border-t-[#455A64] pt-5 text-center md:mt-10 md:w-3/5 md:pt-10"
    >
      Project is liecenced under
      <a href="" class="link">MIT</a>
      and released in <span class="link">2024</span>
    </h2>
  </div>
</template>

<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate';
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiTwitterFill,
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
  RiWhatsappLine,
} from 'vue-remix-icons';

import { SUBSCRIBE_TO_EMAIL } from '~/services/utils.service';

defineProps({ Class: String });

const showOtherFields = ref(false);
const subscriber = ref<any>({
  email: '',
  firstname: '',
  lastname: '',
});

const subscribeToEmail = async (field: any) => {
  const res = await SUBSCRIBE_TO_EMAIL(subscriber.value);
  if (res) {
    qhToast.success('email subscription successful');
    showOtherFields.value = false;
    subscriber.value = {
      email: '',
      firstname: '',
      lastname: '',
    };
  }
};

const quickLinks = ref([
  { title: 'About Us', id: '#about-us' },
  { title: 'How it Works', id: '#how-it-works' },
  { title: 'Testimonials', id: '#testimonials' },
  { title: 'Faqs', id: '#faqs' },
  { title: 'Contact', id: '#contact' },
]);
const othersLinks = ref([
  { title: 'Latest Jobs', id: '' },
  { title: 'Blog', id: '' },
  { title: 'Academy', id: '' },
  { title: 'Resume Tips', id: '' },
  { title: 'Hiring', id: '' },
  { title: 'Info', id: '' },
  { title: 'Libraries', id: '' },
  { title: 'Videos', id: '' },
  { title: 'Support', id: '' },
  { title: 'Hiring Tips', id: '' },
  { title: 'Latest Tech News', id: '' },
  { title: 'Social Media', id: '' },
  { title: 'Academy', id: '' },
  { title: 'AI integration', id: '' },
]);

const socialLinks = shallowRef([
  {
    icon: RiTwitterFill,
    link: 'https://x.com/quickhire_jobs',
    title: 'X Formerly(Twitter)',
  },
  {
    icon: RiLinkedinBoxFill,
    link: 'https://www.linkedin.com/company/quickhire',
    title: 'LinkedIn',
  },
  { icon: RiInstagramFill, link: '', title: 'Instagram' },
  { icon: RiFacebookCircleFill, link: '', title: 'Facebook' },
]);

const contactInformation = shallowRef([
  {
    icon: RiMapPinLine,
    contact: 'Ugbowo Benin City, Edo State, Nigeria',
    class: 'fill-white',
    action: (): void => {
      window.location.href =
        'https://www.google.com/maps/search/' +
        encodeURIComponent('Ugbowo Benin City, Edo State, Nigeria');
    },
  },
  {
    icon: RiMailLine,
    contact: 'support@quickhire.com',
    action: (): void => {
      window.location.href = 'mailto:' + 'support@quickhire.com';
    },
  },
  {
    icon: RiWhatsappLine,
    contact: '+2347062215229',
    action: (): void => {
      window.location.href = 'https://wa.me/+2347062215229';
    },
  },
  {
    icon: RiPhoneLine,
    contact: '+2347062215229',
    action: (): void => {
      window.location.href = 'tel:' + '+2347062215229';
    },
  },
]);
</script>

<style lang="scss">
.link {
  @apply font-semibold text-brand-100;
}

input:focus {
  @apply ring-0 ring-transparent;
}
</style>
