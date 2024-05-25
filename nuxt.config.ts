// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg', href: '/quickhire-logo.svg' }],
    },
  },
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

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'notivue/nuxt',
    'nuxt-pdfmake',
    'nuxt-aos',
  ],

  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_API_URL,
      SECURE_SL: process.env.NUXT_SECURE_LS,
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  notivue: {
    position: 'bottom-right',
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
