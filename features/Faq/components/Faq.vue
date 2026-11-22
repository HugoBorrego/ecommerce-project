<script setup lang="ts">
const faqs = [
  {
    question: 'Como solicito um orçamento?',
    answer: 'Escolha um veículo na frota, abra os detalhes e preencha o formulário com seu nome, e-mail, locais e datas. Depois do registro, guarde o protocolo apresentado.'
  },
  {
    question: 'O envio confirma uma reserva?',
    answer: 'Não. O formulário registra uma solicitação de orçamento. Disponibilidade, valor final e condições de locação ainda precisam ser confirmados.'
  },
  {
    question: 'Os preços apresentados são definitivos?',
    answer: 'Não. O catálogo atual é demonstrativo e os valores são ilustrativos. O preço final depende da confirmação das condições da locação.'
  },
  {
    question: 'Quais documentos serão necessários?',
    answer: 'As exigências dependem das condições da operação. Solicite a lista de documentos, as regras para o condutor e as condições de pagamento antes de concluir a contratação.'
  },
  {
    question: 'Como envio outra dúvida?',
    answer: 'Use o formulário da página de contato. Informe um e-mail válido e guarde o protocolo da mensagem.'
  }
]
</script>

<template>
  <section class="site-container section-space">
    <p class="eyebrow">
      Podemos ajudar?
    </p>
    <h1 class="page-title mt-3">
      Dúvidas frequentes
    </h1>
    <p class="section-copy mt-4">
      Entenda como explorar o catálogo e registrar seu interesse.
    </p>
    <div class="mt-10 max-w-3xl space-y-4">
      <details
        v-for="faq in faqs"
        :key="faq.question"
        class="group rounded-2xl border border-slate-200 p-5 sm:p-6"
      >
        <summary class="flex items-center justify-between gap-4 rounded text-lg font-semibold">
          {{ faq.question }}<span
            aria-hidden="true"
            class="shrink-0 text-primary group-open:rotate-45"
          >+</span>
        </summary>
        <p class="mt-4 leading-7 text-text-muted">
          {{ faq.answer }}
        </p>
      </details>
    </div>
    <NuxtLink
      to="/contact"
      class="btn-primary mt-8"
    >Enviar uma mensagem</NuxtLink>
  </section>
</template>
