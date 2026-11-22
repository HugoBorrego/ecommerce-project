<script setup lang="ts">
import { useCars } from '@features/Vehicles'

const { cars } = useCars()
const categories = computed(() => new Set(cars.value.map(car => car.type)).size)
</script>

<template>
  <section class="site-container pt-4 pb-6">
    <div class="grid gap-8 rounded-3xl bg-blue-50 p-7 sm:p-10 lg:grid-cols-2">
      <div>
        <p class="eyebrow">
          Um catálogo para explorar
        </p>
        <h2 class="section-title mt-3">
          Encontre a opção que combina com você.
        </h2>
        <p class="section-copy mt-4">
          Os dados deste catálogo são demonstrativos. Consulte as opções e use o formulário para registrar seu interesse.
        </p>
      </div>
      <dl class="grid grid-cols-2 items-center gap-4">
        <div class="rounded-2xl bg-white p-5 sm:p-6">
          <dt class="text-sm text-text-muted">
            Opções no catálogo
          </dt>
          <dd class="mt-3 text-4xl font-bold text-primary">
            {{ cars.length }}
          </dd>
        </div>
        <div class="rounded-2xl bg-white p-5 sm:p-6">
          <dt class="text-sm text-text-muted">
            Categorias
          </dt>
          <dd class="mt-3 text-4xl font-bold text-primary">
            {{ categories }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
