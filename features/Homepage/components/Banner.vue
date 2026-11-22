<template>
  <section class="site-container section-space">
    <div class="grid items-center gap-8 rounded-3xl bg-slate-950 p-7 text-white sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:p-12">
      <div class="min-w-0">
        <h2 class="section-title max-w-2xl">
          Vamos planejar sua próxima viagem?
        </h2>
        <p class="mt-4 max-w-xl leading-7 text-slate-300">
          Conheça a frota ou envie suas dúvidas antes de solicitar um orçamento.
        </p>
      </div>
      <NuxtLink
        to="/contact"
        class="btn-accent"
      >Fale com a gente <Icon
        :size="16"
        name="lucide:arrow-right"
        class="size-4"
        aria-hidden="true"
      /></NuxtLink>
    </div>
  </section>
</template>
