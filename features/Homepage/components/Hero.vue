<script setup lang="ts">
import { useCars } from '@features/Vehicles'

const { cars } = useCars()
const selectedVehicle = ref('')
function explore() {
  return navigateTo(selectedVehicle.value ? `/vehicles/${selectedVehicle.value}#booking` : '/vehicles')
}
</script>

<template>
  <section class="site-container pt-6 md:pt-8">
    <div class="rounded-3xl bg-primary p-6 sm:p-10 lg:p-12">
      <div class="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12">
        <div class="min-w-0">
          <p class="text-sm font-semibold tracking-wide text-blue-100">
            Seu próximo destino começa aqui
          </p>
          <h1 class="mt-4 max-w-2xl font-heading text-4xl leading-[1.12] font-bold tracking-tight text-white sm:text-5xl xl:text-6xl">
            Mais liberdade para escolher seu caminho.
          </h1>
          <p class="mt-6 max-w-xl text-base leading-7 text-blue-50">
            Encontre um veículo para sua rotina ou próxima viagem. Compare as opções e solicite um orçamento para o período que você precisa.
          </p>
          <NuxtLink
            to="/vehicles"
            class="btn-accent mt-8"
          >Conhecer a frota <Icon
            :size="20"
            name="lucide:arrow-right"
            class="size-5"
            aria-hidden="true"
          /></NuxtLink>
        </div>
        <form
          class="min-w-0 rounded-2xl bg-white p-6 sm:p-8"
          aria-label="Escolher veículo para orçamento"
          @submit.prevent="explore"
        >
          <Icon
            :size="40"
            name="lucide:car-front"
            class="size-10 text-primary"
            aria-hidden="true"
          />
          <h2 class="mt-4 text-2xl font-bold">
            Qual é o seu próximo carro?
          </h2>
          <p class="mt-3 text-sm leading-6 text-text-muted">
            Escolha um veículo para consultar os detalhes e informar seu período de locação.
          </p>
          <label
            for="hero-vehicle"
            class="field-label mt-6"
          >Veículo</label>
          <select
            id="hero-vehicle"
            v-model="selectedVehicle"
            class="field"
            name="vehicle"
          >
            <option value="">
              Quero explorar todas as opções
            </option>
            <option
              v-for="car in cars"
              :key="car.id"
              :value="String(car.id)"
            >
              {{ car.name }} · {{ car.type }} · opção {{ car.id }}
            </option>
          </select>
          <button
            type="submit"
            class="btn-primary mt-5 w-full"
          >
            {{ selectedVehicle ? 'Consultar veículo' : 'Explorar veículos' }}
          </button>
          <p class="mt-4 text-xs leading-5 text-text-muted">
            A solicitação de orçamento não confirma uma reserva.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
