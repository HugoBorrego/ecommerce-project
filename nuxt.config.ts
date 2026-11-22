// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { fleet } from './features/Vehicles/data/fleet'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/icon'],

  components: [
    {
      path: fileURLToPath(new URL('./components/', import.meta.url)),
      pathPrefix: false
    }
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      meta: [{ name: 'theme-color', content: '#2563eb' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/images/car_logo.svg' }]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    requestsDir: '.data/requests',
    public: { siteUrl: '' }
  },

  alias: {
    '@features': fileURLToPath(new URL('./features/', import.meta.url))
  },

  routeRules: {
    '/': { prerender: true },
    // A listagem usa SSR para que os filtros da URL já estejam corretos no HTML.
    '/vehicles': { prerender: false },
    ...Object.fromEntries(fleet.map(car => [`/vehicles/${car.id}`, { prerender: true }])),
    '/about': { prerender: true },
    '/contact': { prerender: true },
    '/gallery': { prerender: true },
    '/blog': { prerender: true },
    '/faq': { prerender: true },
    '/privacy': { prerender: true },
    '/api/**': { prerender: false, headers: { 'Cache-Control': 'no-store' } }
  },

  compatibilityDate: '2026-06-30',

  vite: {
    plugins: [tailwindcss()]
  },

  typescript: {
    strict: true,
    tsConfig: { vueCompilerOptions: { strictTemplates: true } }
  },
  debug: false,

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    clientBundle: {
      icons: [
        'lucide:arrow-up',
        'lucide:x',
        'lucide:arrow-right',
        'lucide:calendar',
        'lucide:car',
        'lucide:car-front',
        'lucide:fuel',
        'lucide:mail',
        'lucide:map-pin',
        'lucide:menu',
        'lucide:settings-2',
        'lucide:snowflake',
        'lucide:wallet'
      ]
    }
  }
})
