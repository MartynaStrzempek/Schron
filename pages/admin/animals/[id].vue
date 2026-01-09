<template>
  <section class="admin-animal-form">
    <LoadingGrid v-if="loading" :items="1" :show-delayed="showDelayed" />
    <AnimalForm
      v-else-if="animal"
      :model-value="animal"
      title="Edytuj zwierzę"
      submit-label="Zapisz zmiany"
      @submit="handleSubmit"
      @cancel="navigateTo('/admin/animals')"
    />
    <EmptyState
      v-else
      title="Nie znaleziono zwierzęcia"
      description="Wróć do listy i wybierz poprawny rekord."
      cta-label="Wróć do listy"
      @cta="navigateTo('/admin/animals')"
    />
  </section>
</template>

<script setup lang="ts">
import { useAdminAnimalsStore } from '~/stores/adminAnimals'
import type { Animal } from '~/types/animal'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const store = useAdminAnimalsStore()
const route = useRoute()

const loading = computed(() => !store.hydrated)
const { showDelayed } = useDelayedLoading(loading)

const animal = computed(() =>
  store.animals.find((item) => item.id === route.params.id)
)

const handleSubmit = (updated: Animal) => {
  store.updateAnimal(updated)
  navigateTo('/admin/animals')
}

onMounted(() => {
  store.initialize()
})
</script>
