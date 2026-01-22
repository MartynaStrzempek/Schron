<template>
  <div class="admin-dashboard-page">
    <h2 class="section__title">Dashboard</h2>
    <div v-if="loading" class="dashboard">
      <n-skeleton height="120px" />
      <n-skeleton height="120px" />
      <n-skeleton height="120px" />
    </div>
    <div v-else class="dashboard">
      <n-card>
        <h3>Liczba zwierząt</h3>
        <p class="dashboard__value">{{ animals.length }}</p>
      </n-card>
      <n-card>
        <h3>Pilne przypadki</h3>
        <p class="dashboard__value">{{ urgentCount }}</p>
      </n-card>
      <n-card>
        <h3>Do adopcji</h3>
        <p class="dashboard__value">{{ toAdoptionCount }}</p>
      </n-card>
    </div>

    <div class="recent">
      <h3 class="section__title">Ostatnio dodane zwierzęta</h3>
      <div v-if="loading" class="recent__list">
        <n-skeleton v-for="item in 3" :key="item" height="80px" />
      </div>
      <div v-else-if="recentAnimals.length === 0" class="state">
        <n-empty description="Brak zwierząt w bazie" />
      </div>
      <div v-else class="recent__list">
        <n-card v-for="animal in recentAnimals" :key="animal.id">
          <div class="recent__item">
            <div>
              <strong>{{ animal.name }}</strong>
              <p class="recent__meta">{{ animal.type }} · {{ animal.status }}</p>
            </div>
            <n-tag v-if="animal.urgent" type="warning">Pilne</n-tag>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { NCard, NEmpty, NSkeleton, NTag } from 'naive-ui';
import { useAnimalsStore } from '~/store/animals';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
  title: 'Dashboard'
});

const store = useAnimalsStore();
const loading = ref(true);

onMounted(async () => {
  await store.init();
  loading.value = false;
});

const animals = computed(() => store.animals);
const urgentCount = computed(() => store.urgentAnimals.length);
const toAdoptionCount = computed(() => store.animals.filter((animal) => animal.status === 'do adopcji').length);
const recentAnimals = computed(() => [...store.animals].reverse().slice(0, 3));
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.dashboard {
  display: grid;
  gap: $spacing-16;
  margin-bottom: $spacing-32;

  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  &__value {
    font-size: 2rem;
    margin: $spacing-8 0 0;
  }
}

.recent {
  margin-top: $spacing-32;

  &__list {
    display: grid;
    gap: $spacing-12;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__meta {
    margin: 0;
    color: $color-gray-500;
  }
}

.state {
  margin-top: $spacing-16;

  &__loading {
    color: $color-gray-500;
  }
}
</style>
