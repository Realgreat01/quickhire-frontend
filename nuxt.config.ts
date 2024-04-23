// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: [
    '~/assets/styles/main.scss',
    '~/assets/styles/tailwind.scss',
    'notivue/notification.css',
    'notivue/animations.css',
    '@vuepic/vue-datepicker/dist/main.css',
  ],

  build: {
    transpile: ['vue-remix-icons', '@vuepic/vue-datepicker'],
  },

  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'notivue/nuxt'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  notivue: {
    position: 'top-right',
    limit: 4,
    enqueue: true,
    avoidDuplicates: true,
    notifications: {
      global: {
        duration: 3000,
      },
    },
    animations: {
      enter: 'pop-in',
      leave: 'pop-out',
      clearAll: 'fade',
    },
    transition: 'transform 200ms ease-in-out',
  },
});
