<template>
  <div class="mt-20 bg-brand-950 py-20 text-slate-400">
    <div>
      <h1 class="qh-text-1 mb-4 font-bold text-white">Join Our NewsLetter</h1>
      <div
        class="mb-10 flex h-12 items-center overflow-hidden rounded-xl bg-white md:w-[90%]"
      >
        <qh-input
          v-model="user_email"
          label=""
          name="email"
          class="w-full flex-1 rounded-none border-none"
        />
        <qh-button label="Subscribe" class="h-14 md:!w-48" />
      </div>
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
        <div class="flex flex-col-reverse">
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
const user_email = ref('');
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

const quickLinks = ref([
  { title: 'About Us', id: '#about-us' },
  { title: 'How it Works', id: '#how-it-works' },
  { title: 'Testimonials', id: '#testimonials' },
  { title: 'Faqs', id: '#faqs' },
  { title: 'Contact', id: '#contact' },
]);
const othersLinks = ref([
  { title: 'Latest Jobs', id: '#about-us' },
  { title: 'Blog', id: '#how-it-works' },
  { title: 'Academy', id: '#testimonials' },
  { title: 'Resume Tips', id: '#faqs' },
  { title: 'Hiring', id: '#contact' },
  { title: 'Info', id: '#about-us' },
  { title: 'Libraries', id: '#how-it-works' },
  { title: 'Videos', id: '#testimonials' },
  { title: 'Support', id: '#faqs' },
  { title: 'Hiring Tips', id: '#contact' },
  { title: 'Latest Tech News', id: '#about-us' },
  { title: 'Social Media', id: '#how-it-works' },
  { title: 'Academy', id: '#testimonials' },
  { title: 'Internation transactions', id: '#faqs' },
  { title: 'AI integration', id: '#contact' },
]);

const socialLinks = shallowRef([
  { icon: RiInstagramFill, link: '' },
  { icon: RiFacebookCircleFill, link: '' },
  { icon: RiTwitterFill, link: '' },
  { icon: RiLinkedinBoxFill, link: '' },
]);

const contactInformation = shallowRef([
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
  {
    icon: RiMailLine,
    contact: 'support@quickhire.com',
    action: (): void => {
      window.location.href = 'mailto:' + 'support@quickhire.com';
    },
  },
  {
    icon: RiMapPinLine,
    contact: '17, Ugbowo Benin City, Edo State, Nigeria',
    class: 'fill-white',
    action: (): void => {
      window.location.href =
        'https://www.google.com/maps/search/' +
        encodeURIComponent('6391 Elgin St. Celina, Delaware 10299');
    },
  },
]);
</script>

<style lang="scss">
.link {
  @apply font-semibold text-brand-100;
}
</style>
