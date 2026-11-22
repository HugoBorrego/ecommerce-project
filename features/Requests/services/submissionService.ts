import type { SubmissionInput, SubmissionReceipt } from '../types/submission'

export function postSubmission(input: SubmissionInput, requestId: string) {
  return $fetch<SubmissionReceipt>('/api/requests', {
    method: 'POST',
    body: input,
    headers: { 'Idempotency-Key': requestId },
    timeout: 15000,
    retry: 0
  })
}
