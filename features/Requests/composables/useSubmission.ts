import { ref } from 'vue'
import { submitRequest } from '../actions/submitRequest'
import type { SubmissionInput } from '../types/submission'

export function useSubmission() {
  const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle')
  const message = ref('')
  const receiptId = ref('')
  let requestId = ''

  async function submit(input: SubmissionInput) {
    if (status.value === 'pending' || status.value === 'success') return
    requestId ||= crypto.randomUUID()
    status.value = 'pending'
    message.value = ''
    try {
      const receipt = await submitRequest(input, requestId)
      receiptId.value = receipt.id
      message.value = receipt.message
      status.value = 'success'
    } catch (error) {
      const failure = error as { data?: { statusCode?: number, message?: string }, message?: string }
      message.value = failure.data?.message ?? (error instanceof Error && !failure.data ? error.message : 'Não foi possível enviar. Tente novamente.')
      if (message.value.includes('[POST]') || message.value.includes('fetch') || message.value.includes('timeout')) message.value = 'Não foi possível concluir o envio. Verifique sua conexão e tente novamente.'
      status.value = 'error'
    }
  }
  return { status, message, receiptId, submit }
}
