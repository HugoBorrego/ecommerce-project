<script setup lang="ts">
const features = [
  {
    icon: 'lucide:map-pin',
    title: 'Escolha com clareza',
    description: 'Explore as categorias e encontre uma opção para sua rotina ou viagem.'
  },
  {
    icon: 'lucide:car',
    title: 'Compare as opções',
    description: 'Consulte características e detalhes antes de escolher o veículo.'
  },
  {
    icon: 'lucide:wallet',
    title: 'Planeje seu orçamento',
    description: 'Informe o período desejado para solicitar as condições da locação.'
  }
]
</script>

<template>
  <section class="site-container">
    <div class="grid grid-cols-1 items-center gap-8 py-15 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="feature in features"
        :key="feature.title"
      >
        <Icon
          :size="40"
          :name="feature.icon"
          class="h-10 w-10 text-primary"
        />
        <h2 class="mt-4 font-heading text-2xl font-semibold text-black">
          {{ feature.title }}
        </h2>
        <p class="mt-2 text-base font-normal leading-6 text-black">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </section>
</template>
