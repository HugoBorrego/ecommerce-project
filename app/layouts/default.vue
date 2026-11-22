<template>
  <div>
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-4"
    >
      Pular para o conteúdo
    </a>
    <Header />
    <main
      id="main-content"
      tabindex="-1"
      class="min-h-[60dvh]"
    >
      <slot />
    </main>
    <Footer />
  </div>
</template>
