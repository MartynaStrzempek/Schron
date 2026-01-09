import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  modules: ['@pinia/nuxt'],
  css: ['~/assets/scss/main.scss'],
  build: {
    transpile: ['naive-ui', 'vueuc']
  },
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'vueuc']
    },
    optimizeDeps: {
      include: ['naive-ui', 'vueuc']
    }
  },
  app: {
    head: {
      titleTemplate: '%s · Schronisko Przyjaciele Zwierząt',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Schronisko Przyjaciele Zwierząt – pomagamy znaleźć domy dla psów i kotów.'
        }
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
    }
  },
  components: [{ path: '~/components', pathPrefix: false }],
  runtimeConfig: {
    public: {
      siteUrl: ''
    }
  }
})
