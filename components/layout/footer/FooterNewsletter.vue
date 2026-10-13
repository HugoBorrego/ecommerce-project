<script setup lang="ts">
import { ref } from 'vue'

const email = ref<string>('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const message = ref<string>('')

async function handleSubmit() {
  if (!email.value || !email.value.includes('@')) {
    status.value = 'error'
    message.value = 'Por favor, insira um e-mail válido'
    return
  }

  status.value = 'loading'
  message.value = ''

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  status.value = 'success'
  message.value = 'Obrigado por assinar! Em breve você receberá nossas ofertas.'
  email.value = ''

  setTimeout(() => {
    status.value = 'idle'
    message.value = ''
  }, 5000)
}
</script>

<template>
  <div class="space-y-4">
    <h3 class="font-heading text-sm font-semibold text-gray-900 uppercase tracking-wider">
      Newsletter
    </h3>
    <p class="font-body text-sm text-gray-600">
      Receba ofertas exclusivas e novidades direto no seu e-mail.
    </p>

    <form
      class="space-y-3"
      aria-label="Inscrição na newsletter"
      @submit.prevent="handleSubmit"
    >
      <div class="flex flex-col sm:flex-row gap-2">
        <label
          for="footer-email"
          class="sr-only"
        >E-mail</label>
        <input
          id="footer-email"
          v-model="email"
          type="email"
          placeholder="seu@email.com"
          :disabled="status === 'loading' || status === 'success'"
          class="flex-1 h-11 px-4 rounded-lg border border-gray-300 bg-white text-sm font-body text-gray-900 transition-all disabled:cursor-not-allowed"
          aria-describedby="footer-email-message"
        >
        <button
          type="submit"
          :disabled="status === 'loading' || status === 'success' || !email"
          class="h-11 px-6 rounded-lg bg-primary text-white text-sm font-semibold font-body transition-all hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span
            v-if="status === 'loading'"
            class="flex items-center gap-2"
          >
            <UIcon
              name="lucide:loader-2"
              class="h-4 w-4 animate-spin"
            />
            <span>Inscrito...</span>
          </span>
          <span v-else-if="status === 'success'">
            <UIcon
              name="lucide:check"
              class="h-4 w-4"
            /> Inscrito
          </span>
          <span v-else>Inscrever</span>
        </button>
      </div>

      <p
        v-if="message"
        id="footer-email-message"
        :class="[
          'font-body text-xs transition-colors',
          status === 'success' ? 'text-green-600' : 'text-red-600'
        ]"
        role="alert"
        aria-live="polite"
      >
        {{ message }}
      </p>

      <p class="font-body text-xs text-gray-500">
        Não enviamos spam. Seu e-mail está seguro conosco.
        <NuxtLink
          to="/privacy"
          class="underline hover:text-primary"
        >Política de privacidade</NuxtLink>
      </p>
    </form>
  </div>
</template>
