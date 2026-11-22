<script setup lang="ts">
import { VehicleDetails } from '@features/VehicleDetails'
import { getCarById, parseCarId } from '@features/Vehicles'

definePageMeta({
  validate: (route) => {
    const id = parseCarId(route.params.id)
    return id !== null && getCarById(id) !== null
  }
})

const route = useRoute()
const carId = computed(() => Number(route.params.id))
const car = computed(() => getCarById(carId.value))

useSeoMeta({
  title: () => `${car.value?.name ?? 'Veículo'} ${car.value?.type ?? ''}`,
  description: () =>
    `Conheça os detalhes de ${car.value?.name ?? 'um veículo'} e solicite um orçamento para o seu período de locação.`
})
</script>

<template>
  <VehicleDetails :id="carId" />
</template>
