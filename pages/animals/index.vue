<template>
  <div class="page__container">
    <h1 class="page__title">Zwierzęta do adopcji</h1>
    <div class="filters">
      <n-input v-model:value="filters.search" placeholder="Szukaj po imieniu" clearable />
      <n-select v-model:value="filters.type" :options="typeOptions" clearable placeholder="Typ" />
      <n-select v-model:value="filters.age" :options="ageOptions" clearable placeholder="Wiek" />
      <n-select v-model:value="filters.gender" :options="genderOptions" clearable placeholder="Płeć" />
      <n-select v-model:value="filters.size" :options="sizeOptions" clearable placeholder="Wielkość" />
      <n-button secondary @click="resetFilters">Wyczyść filtry</n-button>
    </div>

    <div v-if="pending" class="card-grid">
      <n-skeleton v-for="item in 6" :key="item" height="240px" />
      <p v-if="showLoadingText" class="state__loading">Ładowanie...</p>
    </div>
    <div v-else-if="error" class="state">
      <n-alert type="error" title="Błąd">
        Nie udało się pobrać listy. Spróbuj ponownie.
      </n-alert>
      <n-button @click="refresh">Spróbuj ponownie</n-button>
    </div>
    <div v-else-if="filteredAnimals.length === 0" class="state">
      <n-empty description="Brak wyników">
        <template #extra>
          <n-button @click="resetFilters">Wyczyść filtry</n-button>
        </template>
      </n-empty>
    </div>
    <div v-else class="card-grid">
      <AnimalCard v-for="animal in pagedAnimals" :key="animal.id" :animal="animal" />
    </div>

    <div v-if="!pending && filteredAnimals.length > pageSize" class="pagination">
      <n-pagination v-model:page="page" :page-size="pageSize" :item-count="filteredAnimals.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { NAlert, NButton, NEmpty, NInput, NPagination, NSelect, NSkeleton } from 'naive-ui';
import AnimalCard from '~/components/cards/AnimalCard.vue';
import { getAnimals } from '~/repositories/animals';

const { data, pending, error, refresh } = await useAsyncData('animals-list', getAnimals);
const showLoadingText = ref(false);

const filters = reactive({
  search: '',
  type: null as string | null,
  age: null as string | null,
  gender: null as string | null,
  size: null as string | null
});

const typeOptions = [
  { label: 'Pies', value: 'pies' },
  { label: 'Kot', value: 'kot' }
];
const ageOptions = [
  { label: 'Młody', value: 'młody' },
  { label: 'Dorosły', value: 'dorosły' },
  { label: 'Senior', value: 'senior' }
];
const genderOptions = [
  { label: 'Samiec', value: 'samiec' },
  { label: 'Samica', value: 'samica' }
];
const sizeOptions = [
  { label: 'Mała', value: 'mała' },
  { label: 'Średnia', value: 'średnia' },
  { label: 'Duża', value: 'duża' }
];

const page = ref(1);
const pageSize = 6;

const filteredAnimals = computed(() => {
  const list = data.value ?? [];
  return list.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type ? animal.type === filters.type : true;
    const matchesAge = filters.age ? animal.age === filters.age : true;
    const matchesGender = filters.gender ? animal.gender === filters.gender : true;
    const matchesSize = filters.size ? animal.size === filters.size : true;
    return matchesSearch && matchesType && matchesAge && matchesGender && matchesSize;
  });
});

const pagedAnimals = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filteredAnimals.value.slice(start, start + pageSize);
});

const resetFilters = () => {
  filters.search = '';
  filters.type = null;
  filters.age = null;
  filters.gender = null;
  filters.size = null;
};

watch(
  () => ({ ...filters }),
  () => {
    page.value = 1;
  }
);

watch(
  pending,
  (value) => {
    if (value) {
      showLoadingText.value = false;
      setTimeout(() => {
        if (pending.value) showLoadingText.value = true;
      }, 800);
    } else {
      showLoadingText.value = false;
    }
  },
  { immediate: true }
);

useHead({
  title: 'Lista zwierząt',
  meta: [
    {
      name: 'description',
      content: 'Poznaj zwierzęta czekające na adopcję i znajdź nowego przyjaciela.'
    }
  ]
});
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.filters {
  display: grid;
  gap: $spacing-12;
  margin-bottom: $spacing-24;

  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.card-grid {
  display: grid;
  gap: $spacing-24;

  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.pagination {
  margin-top: $spacing-24;
  display: flex;
  justify-content: center;
}

.state {
  display: flex;
  flex-direction: column;
  gap: $spacing-16;
  align-items: flex-start;

  &__loading {
    color: $color-gray-500;
  }
}
</style>
