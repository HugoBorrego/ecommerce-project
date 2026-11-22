<script setup lang="ts">
const columns = [
  {
    title: 'Conheça',
    links: [
      { label: 'Sobre nós', to: '/about' },
      { label: 'Contato', to: '/contact' },
      { label: 'Dúvidas frequentes', to: '/faq' }
    ]
  },
  {
    title: 'Veículos',
    links: [
      { label: 'Toda a frota', to: '/vehicles' },
      { label: 'Sedan', to: '/vehicles?type=sedan' },
      { label: 'SUV', to: '/vehicles?type=suv' },
      { label: 'Esportivo', to: '/vehicles?type=sport' }
    ]
  },
  {
    title: 'Explore',
    links: [
      { label: 'Guia de locação', to: '/blog' },
      { label: 'Galeria', to: '/gallery' },
      { label: 'Privacidade', to: '/privacy' }
    ]
  }
]
</script>

<template>
  <nav
    aria-label="Navegação do rodapé"
    class="grid min-w-0 grid-cols-2 gap-8 sm:grid-cols-3"
  >
    <div
      v-for="column in columns"
      :key="column.title"
    >
      <h2 class="text-sm font-bold">
        {{ column.title }}
      </h2>
      <ul class="mt-4 space-y-3">
        <li
          v-for="link in column.links"
          :key="link.to"
        >
          <NuxtLink
            :to="link.to"
            class="rounded text-sm text-text-muted underline-offset-4 hover:text-primary hover:underline"
          >{{ link.label }}</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
