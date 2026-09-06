<script setup lang="ts">
const navigation = [
  { label: 'Início', to: '/' },
  { label: 'Produtos', to: '/produtos' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/contato' }
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-gray-200 bg-gray-50">
    <div class="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3">
      <div>
        <NuxtLink
          to="/"
          class="text-lg font-bold"
        >
          Ecommerce
        </NuxtLink>
        <p class="mt-2 text-sm text-gray-600">
          Loja de produtos com uma experiência direta e organizada.
        </p>
      </div>
      <nav
        aria-label="Links do rodapé"
        class="flex flex-col gap-2"
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
      <div />
    </div>
    <div class="mx-auto max-w-7xl border-t border-gray-200 px-4 py-4 text-sm text-gray-500">
      © {{ currentYear }} Ecommerce
    </div>
  </footer>
</template>
