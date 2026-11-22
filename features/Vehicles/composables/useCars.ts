import { computed } from 'vue'
import { fleet } from '../data/fleet'
import { getCarById } from '../domain/catalog'

export function useCars() {
  return { cars: computed(() => fleet), getCarById }
}
