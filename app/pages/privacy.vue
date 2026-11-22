<script setup lang="ts">
useSeoMeta({
  title: 'Privacidade',
  description:
    'Saiba quais dados são registrados pelos formulários e como eles são usados.'
})
</script>

<template>
  <section class="site-container section-space">
    <h1 class="page-title">
      Informações de privacidade
    </h1>
    <div class="mt-8 max-w-3xl space-y-8 leading-7 text-text-muted">
      <section>
        <h2 class="mb-3 text-xl font-bold text-slate-900">
          Dados dos formulários
        </h2>
        <p>
          Ao enviar uma mensagem, registramos nome, e-mail, assunto e conteúdo.
          No orçamento, também registramos o veículo, locais e datas desejadas.
          Na newsletter, registramos o e-mail e a autorização para receber
          novidades.
        </p>
      </section>
      <section>
        <h2 class="mb-3 text-xl font-bold text-slate-900">
          Finalidade e armazenamento
        </h2>
        <p>
          Os dados são usados para tratar a solicitação ou registrar o interesse
          em novidades. Cada envio recebe um protocolo e é armazenado no
          servidor. O site não realiza pagamentos nem confirma reservas
          automaticamente.
        </p>
      </section>
      <section>
        <h2 class="mb-3 text-xl font-bold text-slate-900">
          Contato sobre seus dados
        </h2>
        <p>
          Para solicitar esclarecimentos, correção ou remoção de um registro,
          use o formulário de contato e informe o protocolo. Evite enviar
          documentos, dados bancários ou outras informações sensíveis pelos
          formulários.
        </p>
        <NuxtLink
          to="/contact"
          class="mt-4 inline-flex rounded font-semibold text-primary hover:text-primary-dark hover:underline"
        >
          Abrir formulário de contato
        </NuxtLink>
      </section>
    </div>
  </section>
</template>
