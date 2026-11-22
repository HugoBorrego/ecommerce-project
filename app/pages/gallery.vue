<script setup lang="ts">
import { GalleryPage } from '@features/Gallery'

useSeoMeta({
  title: 'Galeria',
  description:
    'Explore as imagens ilustrativas dos veículos disponíveis no catálogo.',
  ogTitle: 'Galeria | Aluguel de Carros',
  ogDescription:
    'Explore as imagens ilustrativas dos veículos disponíveis no catálogo.'
})
</script>

<template>
  <GalleryPage />
</template>
