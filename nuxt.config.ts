// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui'],

  devtools: {
    enabled: true
  },

  components: [
    {
      path: fileURLToPath(new URL('./components/', import.meta.url)),
      pathPrefix: false
    }
  ],

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    storageKey: 'nuxt-color-mode-light'
  },

  alias: {
    '@features': fileURLToPath(new URL('./features/', import.meta.url)),
    '@components': fileURLToPath(new URL('./components/', import.meta.url))
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
