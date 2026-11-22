<script setup lang="ts">
const principles = [
  {
    icon: 'lucide:car-front',
    title: 'Escolha no seu ritmo',
    copy: 'Compare as categorias e leia as características de cada opção.'
  },
  {
    icon: 'lucide:calendar',
    title: 'Planeje o período',
    copy: 'Informe quando e onde deseja retirar e devolver o veículo.'
  },
  {
    icon: 'lucide:mail',
    title: 'Registre seu interesse',
    copy: 'Solicite um orçamento e guarde o protocolo para referência.'
  }
]
</script>

<template>
  <section class="site-container section-space">
    <p class="eyebrow">
      Sobre a proposta
    </p>
    <h1 class="page-title mt-3">
      Mais clareza para planejar sua locação.
    </h1>
    <p class="section-copy mt-5">
      Um espaço para conhecer veículos, comparar opções e organizar o próximo passo da sua viagem.
    </p>
    <div class="mt-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <img
        src="/images/about-photo.png"
        alt=""
        width="640"
        height="480"
        class="aspect-4/3 w-full rounded-3xl object-cover"
        loading="lazy"
        decoding="async"
      >
      <div class="min-w-0">
        <h2 class="section-title">
          Informações antes da decisão
        </h2>
        <p class="section-copy mt-5">
          Nosso fluxo permite explorar o catálogo e registrar uma solicitação com os dados necessários para um orçamento.
        </p>
        <p class="section-copy mt-4">
          O catálogo atual é demonstrativo. Imagens, características e valores precisam ser substituídos pelos dados da operação antes da oferta comercial.
        </p>
        <NuxtLink
          to="/vehicles"
          class="btn-primary mt-7"
        >Explorar veículos</NuxtLink>
      </div>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-3">
      <article
        v-for="item in principles"
        :key="item.title"
        class="min-w-0 rounded-2xl bg-surface p-6"
      >
        <Icon
          :size="32"
          :name="item.icon"
          class="size-8 text-primary"
          aria-hidden="true"
        />
        <h2 class="mt-5 text-xl font-bold">
          {{ item.title }}
        </h2>
        <p class="mt-3 leading-7 text-text-muted">
          {{ item.copy }}
        </p>
      </article>
    </div>
  </section>
</template>
