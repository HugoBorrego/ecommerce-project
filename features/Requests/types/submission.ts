export interface ContactInput {
  kind: 'contact'
  name: string
  email: string
  subject: string
  message: string
  consent: boolean
}

export interface QuoteInput {
  kind: 'quote'
  vehicleId: number
  name: string
  email: string
  rentalPlace: string
  returnPlace: string
  rentalDate: string
  returnDate: string
  consent: boolean
}

export interface NewsletterInput {
  kind: 'newsletter'
  email: string
  consent: boolean
}

export type SubmissionInput = ContactInput | QuoteInput | NewsletterInput

export interface SubmissionReceipt {
  id: string
  message: string
}
