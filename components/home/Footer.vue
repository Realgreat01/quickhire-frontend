<template>
  <div class="mt-10 bg-brand-800 py-20 text-dark-50">
    <h1 class="qh-text-2 ml-28 font-bold">Join Our NewsLetter</h1>
    <div
      class="qh-flex-center mx-auto w-4/5 items-center justify-between rounded-xl border border-dark-100 bg-white"
    >
      <qh-input
        v-model="user_email"
        label=""
        name="email"
        class="w-full rounded-none border-none"
      />
      <qh-button label="Subscribe" class="h-12 w-80" />
    </div>
    <div class="grid grid-cols-[4fr,1fr,5fr,4fr] gap-x-12">
      <div class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="40"
          viewBox="0 0 120 40"
        >
          <!-- Background Rectangle -->
          <rect width="120" height="40" fill="#5b67ca" />
          <!-- Text for the logo -->
          <text
            x="10"
            y="25"
            font-family="Arial, sans-serif"
            font-size="20"
            fill="#ffffff"
          >
            QuickHire
          </text>
          <!-- Lightning Bolt Icon to symbolize quickness -->
          <polygon
            points="60,10 65,20 60,20 70,30 65,30 75,10"
            fill="#ffd700"
          />
        </svg>

        <p class="mt-10">
          QuickHire swiftly connects developers with top tech jobs, streamlining
          the hiring process with advanced matching technology. Whether you're
          advancing your career or seeking talent, QuickHire ensures a fast and
          precise recruitment experience.
        </p>
      </div>
      <div class="">
        <h2 class="mb-10 font-semibold text-brand-900">Quick Links</h2>
        <h2
          class="cursor-pointer"
          v-for="(link, index) in quickLinks"
          :key="index"
        >
          <a :href="link.id" class="">{{ link.title }}</a>
        </h2>
      </div>
      <div class="mt-4 flex flex-col-reverse">
        <div
          class="mt-4 flex items-center gap-x-6 fill-white"
          v-for="(contact, index) in contactInformation"
          :key="index"
        >
          <component :is="contact.icon" class="h-6 w-6" />
          <p class="cursor-pointer" @click="contact.action">
            {{ contact.contact }}
          </p>
        </div>
      </div>
      <qh-button />
    </div>
    <h2
      class="mx-auto mt-5 w-4/5 border-[1px] border-transparent border-t-[#455A64] pt-5 text-center md:mt-10 md:w-3/5 md:pt-10"
    >
      Project is liecenced under
      <a href="" class="link">MIT</a>
      and released in <span class="link">2022</span>
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

const socialLinks = shallowRef([
  { icon: RiInstagramFill, link: '' },
  { icon: RiFacebookCircleFill, link: '' },
  { icon: RiTwitterFill, link: '' },
  { icon: RiLinkedinBoxFill, link: '' },
]);

const contactInformation = shallowRef([
  {
    icon: RiWhatsappLine,
    contact: '+2348979573756',
    class: 'fill-white',
    action: (): void => {
      window.location.href = 'https://wa.me/+2348979573756';
    },
  },
  {
    icon: RiPhoneLine,
    contact: '+2348979573756',
    class: 'fill-white',
    action: (): void => {
      window.location.href = 'tel:' + '+2348979573756';
    },
  },
  {
    icon: RiMailLine,
    contact: 'support@swifia.com',
    class: 'text-white',
    action: (): void => {
      window.location.href = 'mailto:' + 'support@swifia.com';
    },
  },
  {
    icon: RiMapPinLine,
    contact: '6391 Elgin St. Celina, Delaware 10299',
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
  @apply font-semibold text-brand;
}
</style>
