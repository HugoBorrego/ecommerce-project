<script setup lang="ts">
useHead({
  titleTemplate: (title: string | undefined) =>
    title ? `${title} | Aluguel de Carros` : 'Aluguel de Carros'
})
const config = useRuntimeConfig()
const route = useRoute()
useHead(() => {
  if (!config.public.siteUrl) return {}
  const canonical = new URL(route.path, config.public.siteUrl).href
  return {
    link: [{ rel: 'canonical', href: canonical }],
    meta: [{ property: 'og:url', content: canonical }]
  }
})
useSeoMeta({
  ogLocale: 'pt_BR',
  ogSiteName: 'Aluguel de Carros',
  ogType: 'website',
  twitterCard: 'summary'
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
