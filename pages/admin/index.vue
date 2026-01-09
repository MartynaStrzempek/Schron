<template>
  <section class="admin-dashboard">
    <div class="admin-dashboard__cards">
      <n-card>
        <p class="admin-dashboard__label">Liczba zwierząt</p>
        <h2 class="admin-dashboard__value">{{ stats.total }}</h2>
      </n-card>
      <n-card>
        <p class="admin-dashboard__label">Pilne przypadki</p>
        <h2 class="admin-dashboard__value">{{ stats.urgent }}</h2>
      </n-card>
    </div>

    <n-card class="admin-dashboard__recent">
      <div class="admin-dashboard__header">
        <h2>Ostatnio dodane</h2>
        <n-button type="primary" tag="a" href="/admin/animals/new">Dodaj zwierzę</n-button>
      </div>

      <LoadingGrid v-if="loading" :items="3" :show-delayed="showDelayed" />
      <div v-else class="admin-dashboard__list">
        <div v-for="animal in recentAnimals" :key="animal.id" class="admin-dashboard__item">
          <img :src="animal.images[0]" :alt="animal.name" />
          <div>
            <h3>{{ animal.name }}</h3>
            <p>{{ animal.type }} • {{ animal.age }}</p>
          </div>
          <n-tag v-if="animal.urgent" type="error">Pilne</n-tag>
        </div>
        <EmptyState
          v-if="!recentAnimals.length"
          title="Brak zwierząt w bazie"
          description="Dodaj pierwsze zwierzę, aby rozpocząć pracę."
          cta-label="Dodaj zwierzę"
          @cta="navigateTo('/admin/animals/new')"
        />
      </div>
    </n-card>
  </section>
</template>

<script setup lang="ts">
import { useAdminAnimalsStore } from '~/stores/adminAnimals'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const store = useAdminAnimalsStore()

const loading = computed(() => !store.hydrated)
const { showDelayed } = useDelayedLoading(loading)

const stats = computed(() => ({
  total: store.animals.length,
  urgent: store.urgentAnimals.length
}))

const recentAnimals = computed(() => store.animals.slice(0, 3))

onMounted(() => {
  store.initialize()
})
</script>
