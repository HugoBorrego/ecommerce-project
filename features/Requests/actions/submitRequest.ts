import { validateSubmission } from '../domain/validation'
import { postSubmission } from '../services/submissionService'
import type { SubmissionInput } from '../types/submission'

export function submitRequest(input: SubmissionInput, requestId: string) {
  return postSubmission(validateSubmission(input), requestId)
}
