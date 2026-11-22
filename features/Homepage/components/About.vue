<template>
  <section class="site-container section-space">
    <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <div class="min-w-0 overflow-hidden rounded-3xl bg-surface">
        <img
          src="/images/about-photo.png"
          alt=""
          width="640"
          height="480"
          class="aspect-4/3 w-full object-cover"
          loading="lazy"
          decoding="async"
        >
      </div>
      <div class="min-w-0">
        <p class="eyebrow">
          Escolha com tranquilidade
        </p>
        <h2 class="section-title mt-3">
          Uma viagem começa com boas escolhas.
        </h2>
        <p class="section-copy mt-5">
          Reunimos as informações que você precisa para comparar as opções e planejar sua locação com clareza.
        </p>
        <ol class="mt-7 space-y-5">
          <li
            v-for="(step, i) in ['Explore as categorias de veículos.', 'Compare os detalhes e valores ilustrativos.', 'Informe o período e solicite seu orçamento.']"
            :key="step"
            class="flex items-start gap-3"
          >
            <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-primary">{{ i + 1 }}</span>
            <span class="pt-1 leading-6">{{ step }}</span>
          </li>
        </ol>
        <NuxtLink
          to="/about"
          class="mt-7 inline-flex items-center gap-2 rounded font-semibold text-primary"
        >Conheça a proposta <Icon
          :size="16"
          name="lucide:arrow-right"
          class="size-4"
          aria-hidden="true"
        /></NuxtLink>
      </div>
    </div>
  </section>
</template>
