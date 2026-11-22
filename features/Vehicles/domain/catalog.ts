import { fleet } from '../data/fleet.ts'

export function getCarById(id: number) {
  return fleet.find(car => car.id === id) ?? null
}

export function parseCarId(value: unknown): number | null {
  if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value)) return null
  const id = Number(value)
  return Number.isSafeInteger(id) ? id : null
}

export function normalizeCategory(value: unknown) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

export function filterCars(category: unknown) {
  const normalized = normalizeCategory(category)
  return normalized ? fleet.filter(car => car.type.toLowerCase() === normalized) : fleet
}

export function formatDailyPrice(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}
