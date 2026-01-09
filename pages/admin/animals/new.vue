<template>
  <section class="admin-animal-form">
    <AnimalForm
      v-if="ready"
      :model-value="model"
      title="Dodaj zwierzę"
      submit-label="Zapisz"
      @submit="handleSubmit"
      @cancel="navigateTo('/admin/animals')"
    />
    <LoadingGrid v-else :items="1" :show-delayed="showDelayed" />
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

const model = ref<Animal>({
  id: '',
  name: '',
  type: 'pies',
  age: '',
  gender: 'samiec',
  size: 'średni',
  intakeDate: new Date().toISOString().slice(0, 10),
  status: 'do adopcji',
  urgent: false,
  description: '',
  images: []
})

const ready = computed(() => store.hydrated)
const loading = computed(() => !store.hydrated)
const { showDelayed } = useDelayedLoading(loading)

const handleSubmit = (animal: Animal) => {
  store.addAnimal({
    ...animal,
    id: `a-${Date.now()}`
  })
  navigateTo('/admin/animals')
}

onMounted(() => {
  store.initialize()
})
</script>
