<template>
  <div>
    <div class="admin-actions">
      <h2 class="section__title">Zarządzanie zwierzętami</h2>
      <n-button type="primary" @click="navigateTo('/admin/animals/new')">Dodaj zwierzę</n-button>
    </div>

    <div v-if="loading" class="admin-list">
      <n-skeleton v-for="item in 4" :key="item" height="140px" />
      <p v-if="showLoadingText" class="state__loading">Ładowanie...</p>
    </div>
    <div v-else-if="animals.length === 0" class="state">
      <n-empty description="Brak zwierząt w bazie">
        <template #extra>
          <n-button type="primary" @click="navigateTo('/admin/animals/new')">Dodaj zwierzę</n-button>
        </template>
      </n-empty>
    </div>
    <div v-else class="admin-list">
      <n-card v-for="animal in animals" :key="animal.id" class="admin-card">
        <div class="admin-card__content">
          <img :src="animal.photos[0]" :alt="animal.name" class="admin-card__image" />
          <div class="admin-card__details">
            <h3>{{ animal.name }}</h3>
            <p class="admin-card__meta">{{ animal.type }} · {{ animal.status }}</p>
            <n-tag v-if="animal.urgent" type="warning">Pilne</n-tag>
          </div>
          <div class="admin-card__actions">
            <n-button size="small" secondary @click="toggleUrgent(animal.id)">
              {{ animal.urgent ? 'Usuń pilne' : 'Oznacz pilne' }}
            </n-button>
            <n-button size="small" @click="navigateTo(`/admin/animals/${animal.id}/edit`)">Edytuj</n-button>
            <n-button size="small" type="error" secondary @click="removeAnimal(animal.id)">Usuń</n-button>
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { NButton, NCard, NEmpty, NSkeleton, NTag } from 'naive-ui';
import { useAnimalsStore } from '~/store/animals';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
  title: 'Zwierzęta'
});

const store = useAnimalsStore();
const loading = ref(true);
const showLoadingText = ref(false);

onMounted(async () => {
  await store.init();
  loading.value = false;
});

watch(
  loading,
  (value) => {
    if (value) {
      showLoadingText.value = false;
      setTimeout(() => {
        if (loading.value) showLoadingText.value = true;
      }, 800);
    } else {
      showLoadingText.value = false;
    }
  },
  { immediate: true }
);

const animals = computed(() => store.animals);

const removeAnimal = (id: string) => {
  store.removeAnimal(id);
};

const toggleUrgent = (id: string) => {
  store.toggleUrgent(id);
};
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.admin-actions {
  display: flex;
  flex-direction: column;
  gap: $spacing-12;
  margin-bottom: $spacing-24;

  @media (min-width: $breakpoint-tablet) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.admin-list {
  display: grid;
  gap: $spacing-16;
}

.admin-card {
  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-16;

    @media (min-width: $breakpoint-tablet) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: $radius-md;
  }

  &__meta {
    margin: $spacing-4 0 $spacing-8;
    color: $color-gray-500;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-8;
  }
}

.state__loading {
  color: $color-gray-500;
}
</style>
