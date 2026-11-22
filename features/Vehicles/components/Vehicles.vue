<script setup lang="ts">
import { filterCars, normalizeCategory } from '../domain/catalog'
import { useCars } from '../composables/useCars'
import CarCard from './CarCard.vue'

const route = useRoute()
const { cars } = useCars()
const categories = computed(() => ['', ...new Set(cars.value.map(car => car.type.toLowerCase()))])
const activeType = computed(() => normalizeCategory(route.query.type))
const filteredCars = computed(() => filterCars(activeType.value))
const categoryLabels: Record<string, string> = { '': 'Todos', 'sedan': 'Sedan', 'sport': 'Esportivo', 'suv': 'SUV' }

function selectCategory(type: string) {
  return navigateTo({ path: '/vehicles', query: { ...route.query, type: type || undefined } })
}
</script>

<template>
  <section class="site-container section-space">
    <p class="eyebrow">
      Encontre seu próximo caminho
    </p>
    <h1 class="page-title mt-3">
      Nossa frota
    </h1>
    <p class="section-copy mt-4">
      Compare as categorias e conheça os detalhes de cada veículo antes de solicitar seu orçamento.
    </p>
    <p class="mt-3 text-sm text-text-muted">
      Catálogo demonstrativo. Imagens e valores são ilustrativos; condições e disponibilidade precisam de confirmação.
    </p>
    <div
      class="mt-8 flex flex-wrap gap-3"
      role="group"
      aria-label="Filtrar por categoria"
    >
      <button
        v-for="type in categories"
        :key="type"
        type="button"
        :aria-pressed="activeType === type"
        class="min-h-11 rounded-full px-5 font-semibold transition-colors"
        :class="activeType === type ? 'bg-primary text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'"
        @click="selectCategory(type)"
      >
        {{ categoryLabels[type] }}
      </button>
    </div>
    <p
      class="mt-6 text-sm text-text-muted"
      role="status"
    >
      {{ filteredCars.length }} {{ filteredCars.length === 1 ? 'veículo encontrado' : 'veículos encontrados' }}
    </p>
    <div
      v-if="filteredCars.length"
      class="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >
      <CarCard
        v-for="car in filteredCars"
        :key="car.id"
        v-bind="car"
      />
    </div>
    <div
      v-else
      class="mt-6 rounded-5 bg-surface p-8"
    >
      <h2 class="text-xl font-semibold">
        Nenhum veículo nesta categoria
      </h2>
      <p class="mt-2 text-text-muted">
        Escolha outra categoria para continuar sua busca.
      </p>
      <button
        type="button"
        class="btn-primary mt-5"
        @click="selectCategory('')"
      >
        Ver todos os veículos
      </button>
    </div>
  </section>
</template>
