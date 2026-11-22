import type { SubmissionInput } from '../types/submission'

export function todayInBrazil(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now)
  const part = (type: string) => parts.find(item => item.type === type)?.value
  return `${part('year')}-${part('month')}-${part('day')}`
}

export function isCalendarDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function validateRentalDates(start: string, end: string, today = todayInBrazil()) {
  if (!isCalendarDate(start) || !isCalendarDate(end)) throw new Error('Informe datas válidas para retirada e devolução.')
  if (start < today) throw new Error('A retirada não pode ser em uma data passada.')
  if (end <= start) throw new Error('A devolução deve ser posterior à retirada.')
}

function text(value: unknown, label: string, min: number, max: number) {
  if (typeof value !== 'string') throw new Error(`Preencha ${label}.`)
  const result = value.trim()
  if (result.length < min || result.length > max) throw new Error(`${label} deve ter entre ${min} e ${max} caracteres.`)
  return result
}

export function validateSubmission(value: unknown): SubmissionInput {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Solicitação inválida.')
  const input = value as Record<string, unknown>
  const email = text(input.email, 'o e-mail', 5, 254).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Informe um e-mail válido.')
  if (input.consent !== true) throw new Error('Confirme a leitura das informações de privacidade.')
  if (input.kind === 'newsletter') return { kind: 'newsletter', email, consent: true }
  const name = text(input.name, 'o nome', 2, 100)
  if (input.kind === 'contact') {
    return { kind: 'contact', name, email, consent: true, subject: text(input.subject, 'o assunto', 3, 120), message: text(input.message, 'a mensagem', 10, 3000) }
  }
  if (input.kind === 'quote') {
    if (!Number.isSafeInteger(input.vehicleId) || Number(input.vehicleId) <= 0) throw new Error('Selecione um veículo válido.')
    const rentalDate = text(input.rentalDate, 'a data de retirada', 10, 10)
    const returnDate = text(input.returnDate, 'a data de devolução', 10, 10)
    validateRentalDates(rentalDate, returnDate)
    return { kind: 'quote', name, email, consent: true, vehicleId: Number(input.vehicleId), rentalDate, returnDate, rentalPlace: text(input.rentalPlace, 'o local de retirada', 2, 120), returnPlace: text(input.returnPlace, 'o local de devolução', 2, 120) }
  }
  throw new Error('Tipo de solicitação inválido.')
}
