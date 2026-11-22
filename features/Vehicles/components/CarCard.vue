<script setup lang="ts">
import type { Car } from '../types/car'
import { formatDailyPrice } from '../domain/catalog'

const props = defineProps<Car>()
const specifications = computed(() => [
  { icon: 'lucide:settings-2', label: props.transmission },
  { icon: 'lucide:fuel', label: props.fuel },
  ...(props.airConditioning ? [{ icon: 'lucide:snowflake', label: 'Ar-condicionado' }] : [])
])
</script>

<template>
  <article class="flex min-w-0 flex-col rounded-5 border border-slate-200 bg-surface p-5 sm:p-6">
    <div class="aspect-3/2 overflow-hidden rounded-xl">
      <img
        :src="image"
        :alt="`${name} ${type}`"
        width="600"
        height="400"
        class="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      >
    </div>
    <div class="mt-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 class="font-heading text-2xl font-semibold">
          {{ name }}
        </h3>
        <p class="mt-1 text-text-muted">
          {{ type === 'Sport' ? 'Esportivo' : type }}
        </p>
      </div>
      <div>
        <p class="text-xl font-bold text-primary">
          {{ formatDailyPrice(price) }}
        </p>
        <p class="text-sm text-text-muted">
          diária ilustrativa
        </p>
      </div>
    </div>
    <ul class="my-6 grid gap-3 text-sm text-slate-700">
      <li
        v-for="spec in specifications"
        :key="spec.label"
        class="flex items-center gap-2"
      >
        <Icon
          :size="20"
          :name="spec.icon"
          class="size-5 shrink-0"
          aria-hidden="true"
        />
        {{ spec.label }}
      </li>
    </ul>
    <NuxtLink
      :to="`/vehicles/${id}`"
      :aria-label="`Ver detalhes de ${name} ${type}, veículo ${id}`"
      class="btn-primary mt-auto w-full"
    >
      Ver detalhes <Icon
        :size="16"
        name="lucide:arrow-right"
        class="size-4"
        aria-hidden="true"
      />
    </NuxtLink>
  </article>
</template>
