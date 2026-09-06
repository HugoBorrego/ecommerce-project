<script setup lang="ts">
const navigation = [
  { label: 'Início', to: '/' },
  { label: 'Produtos', to: '/produtos' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/contato' }
]
</script>

<template>
  <header class="border-b border-gray-200 bg-white">
    <div class="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 py-4">
      <NuxtLink
        to="/"
        class="justify-self-start text-xl font-bold"
      >
        Ecommerce
      </NuxtLink>
      <nav
        aria-label="Navegação principal"
        class="flex items-center gap-6"
      >
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="text-sm text-gray-600 transition hover:text-gray-900"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <span class="w-28" />
    </div>
  </header>
</template>
