<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number } }>()
const notFound = computed(() => props.error.statusCode === 404)
useHead({
  htmlAttrs: { lang: 'pt-BR' },
  title: () =>
    notFound.value
      ? 'Página não encontrada | Aluguel de Carros'
      : 'Não foi possível abrir a página | Aluguel de Carros'
})
</script>

<template>
  <main
    class="site-container flex min-h-screen flex-col items-start justify-center py-12"
  >
    <p class="eyebrow">
      {{ error.statusCode ?? 500 }}
    </p>
    <h1 class="page-title mt-3">
      {{
        notFound
          ? 'Página não encontrada'
          : 'Não foi possível abrir esta página'
      }}
    </h1>
    <p class="section-copy mt-5">
      {{
        notFound
          ? 'O endereço ou veículo que você procura não está disponível.'
          : 'Tente novamente em alguns instantes.'
      }}
    </p>
    <button
      type="button"
      class="btn-primary mt-8"
      @click="clearError({ redirect: '/vehicles' })"
    >
      Voltar para a frota
    </button>
  </main>
</template>
