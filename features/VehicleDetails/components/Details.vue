<script setup lang="ts">
import { useCars, CarCard, formatDailyPrice } from '@features/Vehicles'
import BookingForm from './BookingForm.vue'

const props = defineProps<{ id: number }>()
const { cars, getCarById } = useCars()
const car = computed(() => getCarById(props.id))
const relatedCars = computed(() => cars.value.filter(item => item.id !== props.id).slice(0, 3))
</script>

<template>
  <section
    v-if="car"
    class="site-container section-space"
  >
    <nav
      aria-label="Trilha de navegação"
      class="flex flex-wrap gap-2 text-sm text-text-muted"
    >
      <NuxtLink
        to="/"
        class="rounded hover:underline"
      >Início</NuxtLink><span aria-hidden="true">/</span>
      <NuxtLink
        to="/vehicles"
        class="rounded hover:underline"
      >Veículos</NuxtLink><span aria-hidden="true">/</span>
      <span aria-current="page">{{ car.name }} {{ car.type }}</span>
    </nav>
    <div class="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
      <div class="min-w-0 rounded-3xl bg-surface p-5">
        <img
          :src="car.image"
          :alt="`${car.name} ${car.type}`"
          width="720"
          height="540"
          class="aspect-4/3 w-full object-contain"
          fetchpriority="high"
        >
      </div>
      <div class="min-w-0">
        <p class="eyebrow">
          Conheça esta opção
        </p>
        <h1 class="page-title mt-3">
          {{ car.name }}
        </h1>
        <p class="mt-2 text-xl text-text-muted">
          {{ car.type === 'Sport' ? 'Esportivo' : car.type }}
        </p>
        <p class="section-copy mt-5">
          Confira as características do veículo e informe o período desejado para solicitar um orçamento.
        </p>
        <ul class="mt-6 grid gap-3 text-slate-700">
          <li class="flex items-center gap-3">
            <Icon
              :size="20"
              name="lucide:settings-2"
              class="size-5 text-primary"
              aria-hidden="true"
            />{{ car.transmission }}
          </li>
          <li class="flex items-center gap-3">
            <Icon
              :size="20"
              name="lucide:fuel"
              class="size-5 text-primary"
              aria-hidden="true"
            />{{ car.fuel }}
          </li>
          <li
            v-if="car.airConditioning"
            class="flex items-center gap-3"
          >
            <Icon
              :size="20"
              name="lucide:snowflake"
              class="size-5 text-primary"
              aria-hidden="true"
            />Ar-condicionado
          </li>
        </ul>
        <div class="mt-8 rounded-2xl border border-slate-200 p-5 sm:p-6">
          <p class="text-3xl font-bold text-primary">
            {{ formatDailyPrice(car.price) }} <span class="text-sm font-normal text-text-muted">/ diária ilustrativa</span>
          </p>
          <p class="mt-3 text-sm leading-6 text-text-muted">
            Catálogo demonstrativo. Valor final, condições e disponibilidade precisam de confirmação.
          </p>
          <a
            href="#booking"
            class="btn-accent mt-5 w-full"
          >Solicitar orçamento</a>
        </div>
      </div>
    </div>
    <BookingForm
      :key="car.id"
      :car="car"
      class="mt-12 md:mt-16"
    />
    <div class="mt-12 md:mt-16">
      <h2 class="section-title">
        Explore outras opções
      </h2>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <CarCard
          v-for="related in relatedCars"
          :key="related.id"
          v-bind="related"
        />
      </div>
    </div>
  </section>
</template>
