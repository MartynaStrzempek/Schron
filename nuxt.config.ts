export default defineNuxtConfig({
  ssr: true,
  css: ['~/assets/scss/main.scss', '~/assets/css/fonts.css'],
  modules: ['@pinia/nuxt', 'nuxtjs-naive-ui'],
  build: {
    transpile: ['naive-ui', 'vueuc']
  },
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'vueuc']
    }
  },
  app: {
    head: {
      titleTemplate: '%s · Schronisko Nadzieja',
      meta: [
        { name: 'description', content: 'Schronisko dla zwierząt z misją adopcji i wsparcia.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/Inter/inter-latin-ext-400-normal.woff2",
          crossorigin: "anonymous"
        }
      ]
    }
  },
  routeRules: {
    "/_nuxt/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    "/images/**": {
      headers: {
        "Cache-Control": "public, max-age=2592000, stale-while-revalidate=300"
      }
    },
    "/fonts/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
  }
});
