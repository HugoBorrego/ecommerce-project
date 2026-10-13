<script setup lang="ts">
import FooterNewsletter from "./FooterNewsletter.vue";
import FooterNavGrid from "./FooterNavGrid.vue";
import BackToTop from "./BackToTop.vue";
</script>

<template>
  <footer class="bg-gray-50 border-t border-gray-200 mt-8" role="contentinfo">
    <div class="mx-auto max-w-360 p-6 py-12 md:px-12 lg:px-16">
      <div class="mt-6 grid gap-10 md:grid-cols-12">
        <div class="md:col-span-8">
          <FooterNavGrid />
        </div>
        <div class="md:col-span-4">
          <FooterNewsletter />
        </div>
      </div>
    </div>

    <BackToTop />
  </footer>
</template>
