export default defineNuxtConfig({
  ssr: true,
  css: ['~/assets/scss/main.scss'],
  modules: ['@pinia/nuxt'],
  app: {
    head: {
      titleTemplate: '%s · Schronisko Nadzieja',
      meta: [
        { name: 'description', content: 'Schronisko dla zwierząt z misją adopcji i wsparcia.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },
  build: {
    transpile: ['naive-ui']
  }
});
