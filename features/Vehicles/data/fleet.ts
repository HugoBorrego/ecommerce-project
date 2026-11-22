import type { Car } from '../types/car'

// Catálogo demonstrativo. Substituir pelos dados reais antes de operar a locadora.
export const fleet: readonly Car[] = Object.freeze([
  { id: 1, name: 'Mercedes', type: 'Sedan', price: 25, transmission: 'Automático', fuel: 'Gasolina', image: '/images/fleet-car-1.png', airConditioning: true },
  { id: 2, name: 'Mercedes', type: 'Sport', price: 50, transmission: 'Automático', fuel: 'Gasolina', image: '/images/fleet-car-2.png', airConditioning: true },
  { id: 3, name: 'Mercedes', type: 'Sedan', price: 45, transmission: 'Automático', fuel: 'Gasolina', image: '/images/fleet-car-3.png', airConditioning: true },
  { id: 4, name: 'Porsche', type: 'SUV', price: 40, transmission: 'Automático', fuel: 'Gasolina', image: '/images/fleet-car-4.png', airConditioning: true },
  { id: 5, name: 'Toyota', type: 'Sedan', price: 35, transmission: 'Automático', fuel: 'Gasolina', image: '/images/fleet-car-5.png', airConditioning: true },
  { id: 6, name: 'Porsche', type: 'SUV', price: 50, transmission: 'Automático', fuel: 'Gasolina', image: '/images/fleet-car-6.png', airConditioning: true }
].map(car => Object.freeze(car)) as Car[])
