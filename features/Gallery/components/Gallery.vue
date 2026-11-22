<script setup lang="ts">
import { useCars } from '@features/Vehicles'

const { cars } = useCars()
</script>

<template>
  <section class="site-container section-space">
    <p class="eyebrow">
      Conheça as opções
    </p>
    <h1 class="page-title mt-3">
      Galeria de veículos
    </h1>
    <p class="section-copy mt-4">
      Uma visão das opções do catálogo. As imagens atuais são ilustrativas.
    </p>
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="car in cars"
        :key="car.id"
        :to="`/vehicles/${car.id}`"
        class="group min-w-0 rounded-2xl border border-slate-200 p-5 hover:border-primary"
      >
        <img
          :src="car.image"
          :alt="`${car.name} ${car.type}`"
          width="600"
          height="400"
          class="aspect-3/2 w-full object-contain"
          loading="lazy"
          decoding="async"
        >
        <h2 class="mt-4 flex flex-wrap items-center justify-between gap-3 text-lg font-semibold">{{ car.name }} · {{ car.type }}<Icon
          :size="20"
          name="lucide:arrow-right"
          class="size-5 text-primary"
          aria-hidden="true"
        /></h2>
        <p class="mt-1 text-sm text-text-muted">Conhecer veículo {{ car.id }}</p>
      </NuxtLink>
    </div>
  </section>
</template>
