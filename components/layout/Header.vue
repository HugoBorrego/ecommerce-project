<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')
const navItems = [
  { label: 'Início', to: '/' },
  { label: 'Veículos', to: '/vehicles' },
  { label: 'Sobre nós', to: '/about' },
  { label: 'Dúvidas', to: '/faq' },
  { label: 'Contato', to: '/contact' }
]
const isActive = (to: string) => to === '/' ? route.path === '/' : route.path === to || route.path.startsWith(`${to}/`)
watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})
function closeMenu() {
  isMenuOpen.value = false
  menuButton.value?.focus()
}
</script>

<template>
  <header
    class="border-b border-slate-100 bg-white"
    @keydown.esc="closeMenu"
  >
    <div class="site-container flex min-h-22 items-center justify-between gap-4 py-4">
      <NuxtLink
        to="/"
        class="flex min-w-0 items-center gap-2 rounded-lg"
        aria-label="Aluguel de Carros — página inicial"
      >
        <img
          src="/images/car_logo.svg"
          alt=""
          width="40"
          height="40"
          class="size-9 shrink-0 sm:size-10"
        >
        <span class="text-sm font-bold sm:text-base">Aluguel de Carros</span>
      </NuxtLink>
      <nav
        aria-label="Navegação principal"
        class="hidden items-center gap-6 lg:flex"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :aria-current="isActive(item.to) ? 'page' : undefined"
          class="rounded py-2 text-sm hover:text-primary"
          :class="isActive(item.to) ? 'font-bold text-primary' : 'font-medium text-slate-700'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <NuxtLink
        to="/vehicles"
        class="btn-primary hidden sm:inline-flex"
      >Explorar frota</NuxtLink>
      <button
        ref="menuButton"
        type="button"
        class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface lg:hidden"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-navigation"
        :aria-label="isMenuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="isMenuOpen = !isMenuOpen"
      >
        <Icon
          :size="24"
          :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'"
          class="size-6"
          aria-hidden="true"
        />
      </button>
    </div>
    <nav
      v-show="isMenuOpen"
      id="mobile-navigation"
      aria-label="Navegação móvel"
      class="site-container pb-5 lg:hidden"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :aria-current="isActive(item.to) ? 'page' : undefined"
        class="block rounded-lg px-3 py-3 hover:bg-surface"
        :class="isActive(item.to) ? 'font-bold text-primary' : 'text-slate-700'"
        @click="isMenuOpen = false"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
