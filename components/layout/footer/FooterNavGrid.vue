<script setup lang="ts">
interface NavColumn {
  title: string;
  links: { label: string; to: string }[];
}

const columns: NavColumn[] = [
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nós", to: "/about" },
      { label: "Contato", to: "/contact" },
      { label: "Carreiras", to: "/careers" },
      { label: "Imprensa", to: "/press" },
      { label: "Sustentabilidade", to: "/sustainability" },
    ],
  },
  {
    title: "Veículos",
    links: [
      { label: "Sedan", to: "/vehicles?type=sedan" },
      { label: "SUV", to: "/vehicles?type=suv" },
      { label: "Pickup", to: "/vehicles?type=pickup" },
      { label: "Minivan", to: "/vehicles?type=minivan" },
      { label: "Conversível", to: "/vehicles?type=convertible" },
      { label: "Elétricos", to: "/vehicles?type=electric" },
    ],
  },
  {
    title: "Localizações",
    links: [
      { label: "São Paulo", to: "/locations/sao-paulo" },
      { label: "Rio de Janeiro", to: "/locations/rio-de-janeiro" },
      { label: "Belo Horizonte", to: "/locations/belo-horizonte" },
      { label: "Brasília", to: "/locations/brasilia" },
      { label: "Porto Alegre", to: "/locations/porto-alegre" },
      { label: "Todas as Cidades", to: "/locations" },
    ],
  },
];
</script>

<template>
  <nav
    aria-label="Navegação do rodapé"
    class="grid grid-cols-2 gap-8 md:grid-cols-4"
  >
    <div v-for="column in columns" :key="column.title" class="space-y-4">
      <h3
        class="font-heading text-sm font-semibold text-gray-900 uppercase tracking-wider"
      >
        {{ column.title }}
      </h3>
      <ul class="space-y-3" role="list">
        <li v-for="link in column.links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="font-body text-sm text-gray-600 transition-colors hover:text-primary hover:underline focus:outline-none rounded"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
