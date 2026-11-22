<script setup lang="ts">
import { useSubmission, SubmissionFeedback } from '@features/Requests'
import type { ContactInput } from '@features/Requests'

const form = reactive<Omit<ContactInput, 'kind'>>({ name: '', email: '', subject: '', message: '', consent: false })
const { status, message, receiptId, submit } = useSubmission()
</script>

<template>
  <section class="site-container section-space">
    <p class="eyebrow">
      Vamos conversar
    </p>
    <h1 class="page-title mt-3">
      Entre em contato
    </h1>
    <p class="section-copy mt-4">
      Envie suas dúvidas sobre veículos ou sobre sua solicitação de orçamento.
    </p>
    <div class="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <form
        class="min-w-0 rounded-3xl border border-slate-200 p-6 sm:p-8"
        aria-label="Enviar mensagem"
        :aria-busy="status === 'pending'"
        @submit.prevent="submit({ ...form, kind: 'contact' })"
      >
        <h2 class="text-2xl font-bold">
          Sua mensagem
        </h2>
        <p class="mt-2 text-sm leading-6 text-text-muted">
          Todos os campos são obrigatórios.
        </p>
        <fieldset
          :disabled="status === 'pending' || status === 'success'"
          class="mt-6 min-w-0 space-y-5"
        >
          <div>
            <label
              for="contact-name"
              class="field-label"
            >
              Nome
            </label>
            <input
              id="contact-name"
              v-model="form.name"
              class="field"
              name="name"
              autocomplete="name"
              required
              minlength="2"
              maxlength="100"
            >
          </div>
          <div>
            <label
              for="contact-email"
              class="field-label"
            >E-mail</label>
            <input
              id="contact-email"
              v-model="form.email"
              class="field"
              type="email"
              name="email"
              autocomplete="email"
              required
              maxlength="254"
            >
          </div>
          <div>
            <label
              for="contact-subject"
              class="field-label"
            >Assunto</label>
            <input
              id="contact-subject"
              v-model="form.subject"
              class="field"
              name="subject"
              required
              minlength="3"
              maxlength="120"
            >
          </div>
          <div>
            <label
              for="contact-message"
              class="field-label"
            >Mensagem</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              class="field resize-y"
              name="message"
              rows="5"
              required
              minlength="10"
              maxlength="3000"
            />
          </div>
          <label class="flex items-start gap-2 text-sm leading-6 text-text-muted">
            <input
              v-model="form.consent"
              type="checkbox"
              required
              class="mt-1 size-4 shrink-0 accent-primary"
            >
            <span>Li as <NuxtLink
              to="/privacy"
              class="rounded underline"
            >informações de privacidade</NuxtLink> e autorizo o uso destes dados para esta mensagem.</span>
          </label>
          <button
            type="submit"
            class="btn-primary w-full"
          >
            {{ status === 'pending' ? 'Registrando…' : status === 'success' ? 'Mensagem registrada' : 'Enviar mensagem' }}
          </button>
        </fieldset>
        <SubmissionFeedback
          :status="status"
          :message="message"
          :receipt-id="receiptId"
        />
      </form>
      <aside class="min-w-0 rounded-3xl bg-primary p-7 text-white sm:p-8">
        <Icon
          :size="48"
          name="lucide:mail"
          class="size-12"
          aria-hidden="true"
        />
        <h2 class="mt-6 text-2xl font-bold">
          Como podemos ajudar?
        </h2>
        <p class="mt-4 leading-7 text-blue-50">
          Sua mensagem será registrada com um protocolo. Informe um e-mail válido para permitir um contato posterior.
        </p>
        <p class="mt-4 leading-7 text-blue-50">
          Para consultar um veículo específico, você também pode usar o formulário de orçamento na página de detalhes.
        </p>
        <NuxtLink
          to="/faq"
          class="mt-6 inline-flex rounded font-semibold text-white underline underline-offset-4"
        >Consultar dúvidas frequentes</NuxtLink>
      </aside>
    </div>
  </section>
</template>
