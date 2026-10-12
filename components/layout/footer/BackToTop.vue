<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isVisible = ref(false)
const scrollThreshold = 200

function handleScroll() {
  isVisible.value = window.scrollY > scrollThreshold
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button
    v-show="isVisible"
    type="button"
    class="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary-dark hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    aria-label="Voltar ao topo"
    title="Voltar ao topo"
    @click="scrollToTop"
  >
    <UIcon
      name="lucide:arrow-up"
      class="h-6 w-6 text-white"
    />
  </button>
</template>
