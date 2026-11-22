<script setup lang="ts">
import { Vehicles } from '@features/Vehicles'

useSeoMeta({
  title: 'Nossa frota',
  description:
    'Compare as categorias, consulte os detalhes dos veículos e solicite seu orçamento.',
  ogTitle: 'Nossa frota | Aluguel de Carros',
  ogDescription:
    'Compare as categorias, consulte os detalhes dos veículos e solicite seu orçamento.'
})
</script>

<template>
  <Vehicles />
</template>
