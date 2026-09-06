<script setup lang="ts">
import {
  HomepageBanner
} from '@features/Homepage'
</script>

<template>
  <div>
    <HomepageBanner />
    <HomepageHeader />
    <main>
      <HomepageHero />
      <HomepagePreview />
      <HomepageInfoBlock
        title="Compra com mais clareza"
        description="Encontre produtos relevantes em uma experiência direta e organizada."
      />
    </main>
  </div>
</template>
