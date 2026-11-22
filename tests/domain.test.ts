import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getCarById, parseCarId, filterCars } from '../features/Vehicles/domain/catalog.ts'
import { validateSubmission, validateRentalDates, todayInBrazil } from '../features/Requests/domain/validation.ts'

test('IDs aceitam apenas inteiros positivos existentes no catálogo', () => {
  for (const value of ['abc', '1e0', '1.0', '-1', '0', ['1'], '9007199254740992']) assert.equal(parseCarId(value), null)
  assert.equal(parseCarId('1'), 1)
  assert.equal(getCarById(999), null)
})

test('filtro normaliza a categoria e mantém estado vazio para categoria ausente', () => {
  assert.equal(filterCars(' SUV ').length, 2)
  assert.equal(filterCars('').length, 6)
  assert.equal(filterCars('pickup').length, 0)
})

test('catálogo não pode ser alterado acidentalmente', () => {
  const car = getCarById(1)!
  assert.equal(Object.isFrozen(car), true)
  assert.throws(() => Object.assign(car, { price: 0 }), TypeError)
})

test('datas rejeitam calendário inválido, passado e período invertido', () => {
  assert.throws(() => validateRentalDates('2030-02-30', '2030-03-02', '2030-01-01'))
  assert.throws(() => validateRentalDates('2030-01-01', '2030-01-03', '2030-01-02'))
  assert.throws(() => validateRentalDates('2030-01-02', '2030-01-02', '2030-01-01'))
  assert.doesNotThrow(() => validateRentalDates('2030-01-02', '2030-01-03', '2030-01-01'))
  assert.equal(todayInBrazil(new Date('2030-01-02T01:00:00Z')), '2030-01-01')
})

test('validação de entrada normaliza campos e rejeita consentimento ausente', () => {
  assert.deepEqual(validateSubmission({ kind: 'newsletter', email: ' TEST@example.com ', consent: true, price: 0 }), { kind: 'newsletter', email: 'test@example.com', consent: true })
  assert.throws(() => validateSubmission({ kind: 'newsletter', email: 'test@example.com', consent: false }))
  assert.throws(() => validateSubmission({ kind: 'newsletter', email: 'invalido', consent: true }))
  assert.throws(() => validateSubmission({ kind: 'contact', name: 'Ana', email: 'test@example.com', consent: true, subject: 'Oi', message: 'x' }))
})
