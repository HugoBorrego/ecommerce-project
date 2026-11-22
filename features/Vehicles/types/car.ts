export type CarCategory = 'Sedan' | 'Sport' | 'SUV'

export interface Car {
  readonly id: number
  readonly name: string
  readonly type: CarCategory
  readonly price: number
  readonly transmission: string
  readonly fuel: string
  readonly image: string
  readonly airConditioning: boolean
}
