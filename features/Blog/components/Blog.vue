<script setup lang="ts">
const guides = [
  {
    icon: 'lucide:car-front',
    title: 'Como escolher seu veículo',
    copy: 'Comece pela categoria e pelo espaço de que você precisa. Consulte as características do carro e confirme capacidade e condições antes de fechar a locação.'
  },
  {
    icon: 'lucide:calendar',
    title: 'Organize as datas',
    copy: 'Defina o período de retirada e devolução e os locais desejados. Ao solicitar o orçamento, use datas futuras e confira todos os campos.'
  },
  {
    icon: 'lucide:wallet',
    title: 'Compare as condições',
    copy: 'Peça a composição do valor final e esclareça quilometragem, coberturas e regras de devolução. Os valores deste catálogo são ilustrativos.'
  }
]
</script>

<template>
  <section class="site-container section-space">
    <p class="eyebrow">
      Antes de pegar a estrada
    </p>
    <h1 class="page-title mt-3">
      Guia de locação
    </h1>
    <p class="section-copy mt-4">
      Pontos para considerar ao comparar opções e preparar sua solicitação de orçamento.
    </p>
    <div class="mt-10 grid gap-6 md:grid-cols-3">
      <article
        v-for="guide in guides"
        :key="guide.title"
        class="min-w-0 rounded-3xl bg-surface p-6 sm:p-8"
      >
        <Icon
          :size="36"
          :name="guide.icon"
          class="size-9 text-primary"
          aria-hidden="true"
        />
        <h2 class="mt-5 text-2xl font-bold">
          {{ guide.title }}
        </h2>
        <p class="mt-4 leading-7 text-text-muted">
          {{ guide.copy }}
        </p>
      </article>
    </div>
    <NuxtLink
      to="/faq"
      class="btn-primary mt-8"
    >Consultar dúvidas frequentes</NuxtLink>
  </section>
</template>
