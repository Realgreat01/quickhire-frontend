<template>
  <div class="w-full bg-white p-[8rem]">
    <div class="grid grid-cols-[4fr,1fr,5fr,4fr] gap-x-[12.7rem]">
      <div class="">
        <LogoPlain />
        <p class="mt-10">
          Swifia enables you to transfer money in large quantities to multiple
          recipients at once, making it the perfect choice for businesses and
          individuals who need to make bulk payments.
        </p>
      </div>

      <!--  -->
      <div class="">
        <h2 class="mb-10 font-semibold text-brand-900">Quick Links</h2>
        <h2
          class="cursor-pointer text-[1.4rem]"
          v-for="(link, index) in quickLinks"
          :key="index"
        >
          <a :href="link.id" class="">{{ link.title }}</a>
        </h2>
      </div>

      <!--  -->
      <div class="">
        <h2 class="mb-10 font-semibold text-brand-900">
          Subscribe To Our News Letter
        </h2>
        <p class="mb-8">
          Join our mailing list and receive regular updates on exclusive offers,
          new features, and industry insights.
        </p>
        <form
          class="flex h-[5rem] items-center justify-between rounded-[5rem] bg-[#F5F6FA] p-4"
          @submit.prevent=""
        >
          <input
            type="email"
            class="block h-[4.2rem] w-1/2 rounded-[5rem] border-none bg-transparent text-[1.6rem] focus:border-none focus:ring-transparent"
            placeholder="Enter email"
          />
          <button
            type="submit"
            class="flex h-[4rem] w-[12.8rem] items-center justify-center rounded-[5rem] bg-brand-900 font-bold text-white"
          >
            Submit
          </button>
        </form>
      </div>

      <!--  -->
      <div class="">
        <h2 class="font-semibold text-brand-900">Get Social</h2>
        <p class="my-10">
          Engage with our community, share your thoughts, and get the latest
          updates instantly.
        </p>
        <div class="flex gap-x-[2rem]">
          <a href="" class="" v-for="(link, index) in socialLinks" :key="index">
            <component :is="link.icon" class="h-[3rem] w-[3rem]" />
          </a>
        </div>
      </div>
    </div>

    <h2 class="mt-[4rem] text-center">
      Swifia &copy; {{ new Date().getFullYear() }} . All Rights Reserved.
    </h2>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiTwitterFill,
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
</script>

<style scoped></style>
