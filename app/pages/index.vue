<script setup lang="ts">
import {
  HomepageAbout,
  HomepageBanner,
  HomepageFeatures,
  HomepageHero,
  HomepagePreview,
  HomepageStats
} from '@features/Homepage'

useSeoMeta({
  title: 'Início',
  description:
    'Explore o catálogo de veículos, compare as categorias e solicite um orçamento para sua próxima locação.',
  ogTitle: 'Início | Aluguel de Carros',
  ogDescription:
    'Explore o catálogo de veículos, compare as categorias e solicite um orçamento para sua próxima locação.'
})
</script>

<template>
  <div>
    <HomepageHero />
    <HomepageFeatures />
    <HomepageAbout />
    <HomepagePreview />
    <HomepageStats />
    <HomepageBanner />
  </div>
</template>
