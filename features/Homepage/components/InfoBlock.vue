<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section class="info-block">
    <div class="info-block__content">
      <h2 class="info-block__title">
        {{ title }}
      </h2>
      <p class="info-block__description">
        {{ description }}
      </p>
    </div>
  </section>
</template>
