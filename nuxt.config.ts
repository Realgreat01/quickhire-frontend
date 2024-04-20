// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/styles/main.scss',
    '~/assets/styles/tailwind.scss',
    'notivue/notification.css',
    'notivue/animations.css',
  ],

  build: {
    transpile: ['vue-remix-icons'],
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
