<script setup lang="ts">
import { useCars, CarCard } from '@features/Vehicles'

const { cars } = useCars()
</script>

<template>
  <section class="site-container">
    <div class="py-15">
      <div class="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        <h2 class="section-title max-w-2xl">
          Encontre o carro para o seu caminho
        </h2>
        <NuxtLink
          to="/vehicles"
          class="inline-flex shrink-0 items-center gap-2 rounded text-base font-semibold text-primary"
        >
          Ver toda a frota
          <Icon
            :size="24"
            name="lucide:arrow-right"
            class="h-6 w-6"
          />
        </NuxtLink>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <CarCard
          v-for="car in cars"
          :key="car.id"
          v-bind="car"
        />
      </div>
    </div>
  </section>
</template>
