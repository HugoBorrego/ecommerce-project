<script setup lang="ts">
import { useRoute } from 'nuxt/app';
import { ref } from 'vue';

const route = useRoute();
const isMenuOpen = ref(false);

const navItems = [
  { label: "Home", to: "/" },
  { label: "Veículos", to: "/vehicles" },
  { label: "Sobre Nós", to: "/about" },
  { label: "Contato", to: "/contact" },
];

function isActive(to: string) {
  if (to === "/") {
    return route.path === "/";
  }
  return route.path === to || route.path.startsWith(`${to}/`);
}
</script>

<template>
  <header
    class="mx-auto flex max-w-360 items-center justify-between px-6 py-6 md:px-12 lg:px-16"
  >
    <NuxtLink to="/" class="flex items-center gap-2">
      <img src="/images/car_logo.svg" alt="Logo" class="h-10 w-10 lg:h-12 lg:w-12 text-black" />
      <span class="text-base font-bold">Aluguel de Carros</span>
    </NuxtLink>

    <nav aria-label="Navegação principal" class="hidden items-center lg:flex">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="h-7.5 px-3 py-1 text-lg transition-colors"
        :class="
          isActive(item.to)
            ? 'font-bold text-black underline'
            : 'font-medium text-black hover:text-black/70 hover:underline'
        "
      >
        {{ item.label }}
      </NuxtLink>
    </nav>

    <button
      type="button"
      class="lg:hidden"
      :aria-expanded="isMenuOpen"
      aria-label="Abrir menu de navegação"
      @click="isMenuOpen = !isMenuOpen"
    >
      <UIcon name="lucide:menu" class="h-7 w-7 text-black" />
    </button>

    <div class="flex items-center gap-3">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
      >
        UT
      </div>
      <div class="hidden flex-col items-start lg:flex">
        <span class="text-xs font-normal">Perfil</span>
        <span class="text-xs font-bold">Usuário Teste</span>
      </div>
    </div>
  </header>

  <nav
    v-if="isMenuOpen"
    aria-label="Menu de navegação"
    class="flex max-w-360 flex-col px-6 pb-4 lg:hidden"
  >
    <NuxtLink
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      class="py-2 text-lg"
      :class="
        isActive(item.to) ? 'font-bold text-black' : 'font-medium text-black'
      "
      @click="isMenuOpen = false"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>
