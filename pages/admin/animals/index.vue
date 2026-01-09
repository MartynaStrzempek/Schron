<template>
  <section class="admin-animals">
    <div class="admin-animals__header">
      <div>
        <h1>Zarządzanie zwierzętami</h1>
        <p>Edytuj profile, aktualizuj statusy i oznacz pilne przypadki.</p>
      </div>
      <n-button type="primary" tag="a" href="/admin/animals/new">Dodaj zwierzę</n-button>
    </div>

    <LoadingGrid v-if="loading" :items="4" :show-delayed="showDelayed" />

    <div v-else class="admin-animals__list">
      <EmptyState
        v-if="!store.animals.length"
        title="Brak zwierząt w bazie"
        description="Dodaj pierwsze zwierzę, aby rozpocząć pracę."
        cta-label="Dodaj zwierzę"
        @cta="navigateTo('/admin/animals/new')"
      />
      <n-card v-for="animal in store.animals" :key="animal.id" class="admin-animals__card">
        <div class="admin-animals__card-content">
          <img :src="animal.images[0]" :alt="animal.name" />
          <div class="admin-animals__info">
            <h2>{{ animal.name }}</h2>
            <p>{{ animal.type }} • {{ animal.age }} • {{ animal.status }}</p>
          </div>
          <div class="admin-animals__actions">
            <n-button secondary @click="store.toggleUrgent(animal.id)">
              {{ animal.urgent ? 'Usuń pilne' : 'Oznacz pilne' }}
            </n-button>
            <n-button tertiary tag="a" :href="`/admin/animals/${animal.id}`">Edytuj</n-button>
            <n-button type="error" ghost @click="confirmRemove(animal.id)">Usuń</n-button>
          </div>
        </div>
      </n-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDialog } from 'naive-ui'
import { useAdminAnimalsStore } from '~/stores/adminAnimals'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const store = useAdminAnimalsStore()
const dialog = useDialog()

const loading = computed(() => !store.hydrated)
const { showDelayed } = useDelayedLoading(loading)

const confirmRemove = (id: string) => {
  dialog.warning({
    title: 'Usuń zwierzę',
    content: 'Czy na pewno chcesz usunąć zwierzę z bazy?',
    positiveText: 'Usuń',
    negativeText: 'Anuluj',
    onPositiveClick: () => store.removeAnimal(id)
  })
}

onMounted(() => {
  store.initialize()
})
</script>
