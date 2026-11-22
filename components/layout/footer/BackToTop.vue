<script setup lang="ts">
const isVisible = ref(false)
function handleScroll() {
  isVisible.value = window.scrollY > 300
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  document.getElementById('main-content')?.focus({ preventScroll: true })
}
onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <button
    v-show="isVisible"
    type="button"
    class="fixed right-5 bottom-5 z-40 flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark"
    aria-label="Voltar ao topo"
    @click="scrollToTop"
  >
    <Icon
      :size="24"
      name="lucide:arrow-up"
      class="size-6"
      aria-hidden="true"
    />
  </button>
</template>
