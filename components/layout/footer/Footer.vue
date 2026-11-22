<script setup lang="ts">
import FooterNewsletter from './FooterNewsletter.vue'
import FooterNavGrid from './FooterNavGrid.vue'
import BackToTop from './BackToTop.vue'
</script>

<template>
  <footer class="mt-12 border-t border-slate-200 bg-surface">
    <div class="site-container py-12">
      <div class="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
        <FooterNavGrid />
        <FooterNewsletter />
      </div>
      <div class="mt-10 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-text-muted">
        <p>Aluguel de Carros · Planeje sua próxima viagem.</p>
        <NuxtLink
          to="/privacy"
          class="rounded underline underline-offset-4"
        >Privacidade</NuxtLink>
      </div>
    </div>
    <BackToTop />
  </footer>
</template>
