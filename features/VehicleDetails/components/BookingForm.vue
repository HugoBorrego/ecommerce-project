<script setup lang="ts">
import type { Car } from '@features/Vehicles'
import { useSubmission, SubmissionFeedback, todayInBrazil } from '@features/Requests'
import type { QuoteInput } from '@features/Requests'

const props = defineProps<{ car: Car }>()
const form = reactive<Omit<QuoteInput, 'kind' | 'vehicleId'>>({ name: '', email: '', rentalPlace: '', returnPlace: '', rentalDate: '', returnDate: '', consent: false })
const today = ref('')
onMounted(() => {
  today.value = todayInBrazil()
})
const { status, message, receiptId, submit } = useSubmission()
</script>

<template>
  <section
    id="booking"
    class="rounded-3xl bg-blue-50 p-6 sm:p-8 lg:p-10"
  >
    <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div class="min-w-0">
        <p class="eyebrow">
          Planeje sua locação
        </p>
        <h2 class="section-title mt-3">
          Solicite um orçamento
        </h2>
        <p class="section-copy mt-4">
          Informe seus dados e o período desejado para {{ props.car.name }} {{ props.car.type }}.
        </p>
        <p class="mt-4 text-sm leading-6 text-text-muted">
          O envio registra seu interesse. A reserva, a disponibilidade e o valor final precisam de confirmação posterior.
        </p>
      </div>
      <form
        class="min-w-0 rounded-2xl bg-white p-5 sm:p-6"
        aria-label="Solicitação de orçamento"
        :aria-busy="status === 'pending'"
        @submit.prevent="submit({ ...form, kind: 'quote', vehicleId: props.car.id })"
      >
        <fieldset
          :disabled="status === 'pending' || status === 'success'"
          class="grid min-w-0 gap-5 sm:grid-cols-2"
        >
          <legend class="sr-only">
            Dados para orçamento de {{ props.car.name }}
          </legend>
          <div class="sm:col-span-2">
            <label
              for="quote-name"
              class="field-label"
            >Seu nome</label>
            <input
              id="quote-name"
              v-model="form.name"
              class="field"
              name="name"
              autocomplete="name"
              required
              minlength="2"
              maxlength="100"
            >
          </div>
          <div class="sm:col-span-2">
            <label
              for="quote-email"
              class="field-label"
            >E-mail</label>
            <input
              id="quote-email"
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
              for="quote-rental-place"
              class="field-label"
            >Local de retirada</label>
            <input
              id="quote-rental-place"
              v-model="form.rentalPlace"
              class="field"
              name="rentalPlace"
              placeholder="Cidade ou unidade desejada"
              required
              minlength="2"
              maxlength="120"
            >
          </div>
          <div>
            <label
              for="quote-return-place"
              class="field-label"
            >Local de devolução</label>
            <input
              id="quote-return-place"
              v-model="form.returnPlace"
              class="field"
              name="returnPlace"
              placeholder="Cidade ou unidade desejada"
              required
              minlength="2"
              maxlength="120"
            >
          </div>
          <div>
            <label
              for="quote-rental-date"
              class="field-label"
            >Data de retirada</label>
            <input
              id="quote-rental-date"
              v-model="form.rentalDate"
              class="field"
              name="rentalDate"
              type="date"
              :min="today"
              required
            >
          </div>
          <div>
            <label
              for="quote-return-date"
              class="field-label"
            >Data de devolução</label>
            <input
              id="quote-return-date"
              v-model="form.returnDate"
              class="field"
              name="returnDate"
              type="date"
              :min="form.rentalDate || today"
              required
            >
          </div>
          <label class="flex items-start gap-2 text-sm leading-6 text-text-muted sm:col-span-2">
            <input
              v-model="form.consent"
              type="checkbox"
              required
              class="mt-1 size-4 shrink-0 accent-primary"
            >
            <span>Li as <NuxtLink
              to="/privacy"
              class="rounded underline"
            >informações de privacidade</NuxtLink> e autorizo o uso destes dados para esta solicitação.</span>
          </label>
          <button
            type="submit"
            class="btn-primary sm:col-span-2"
          >
            {{ status === 'pending' ? 'Registrando…' : status === 'success' ? 'Solicitação registrada' : 'Solicitar orçamento' }}
          </button>
        </fieldset>
        <SubmissionFeedback
          :status="status"
          :message="message"
          :receipt-id="receiptId"
        />
      </form>
    </div>
  </section>
</template>
