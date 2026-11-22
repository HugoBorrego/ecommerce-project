<script setup lang="ts">
import { useSubmission, SubmissionFeedback } from '@features/Requests'

const email = ref('')
const consent = ref(false)
const { status, message, receiptId, submit } = useSubmission()
</script>

<template>
  <div class="min-w-0">
    <h2 class="text-sm font-bold">
      Novidades no seu e-mail
    </h2>
    <p class="mt-4 text-sm leading-6 text-text-muted">
      Cadastre seu interesse para receber novidades da locadora.
    </p>
    <form
      class="mt-4"
      aria-label="Inscrição na newsletter"
      :aria-busy="status === 'pending'"
      @submit.prevent="submit({ kind: 'newsletter', email, consent })"
    >
      <fieldset
        :disabled="status === 'pending' || status === 'success'"
        class="min-w-0 space-y-3"
      >
        <label
          for="newsletter-email"
          class="field-label"
        >E-mail</label>
        <div class="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto]">
          <input
            id="newsletter-email"
            v-model="email"
            type="email"
            name="email"
            required
            maxlength="254"
            autocomplete="email"
            class="field"
            placeholder="seu@email.com"
          >
          <button
            type="submit"
            class="btn-primary"
          >
            {{ status === 'pending' ? 'Enviando…' : status === 'success' ? 'Inscrição registrada' : 'Inscrever' }}
          </button>
        </div>
        <label class="flex items-start gap-2 text-sm leading-6 text-text-muted">
          <input
            v-model="consent"
            type="checkbox"
            required
            class="mt-1 size-4 shrink-0 accent-primary"
          >
          <span>Quero receber novidades por e-mail e li as <NuxtLink
            to="/privacy"
            class="rounded underline"
          >informações de privacidade</NuxtLink>.</span>
        </label>
      </fieldset>
      <SubmissionFeedback
        :status="status"
        :message="message"
        :receipt-id="receiptId"
      />
    </form>
  </div>
</template>
