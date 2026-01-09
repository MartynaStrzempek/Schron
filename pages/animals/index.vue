<template>
  <section class="animals-hero">
    <h1>Lista zwierząt</h1>
    <p>Znajdź przyjaciela na całe życie. Użyj filtrów, aby zawęzić wyniki.</p>
  </section>

  <section class="animals-filters" aria-label="Filtry">
    <n-input
      v-model:value="search"
      clearable
      placeholder="Szukaj po imieniu"
      aria-label="Szukaj po imieniu"
    />
    <n-select v-model:value="filters.type" :options="typeOptions" placeholder="Typ" />
    <n-select v-model:value="filters.gender" :options="genderOptions" placeholder="Płeć" />
    <n-select v-model:value="filters.size" :options="sizeOptions" placeholder="Wielkość" />
    <n-select v-model:value="filters.age" :options="ageOptions" placeholder="Wiek" />
    <n-button tertiary @click="resetFilters">Wyczyść filtry</n-button>
  </section>

  <LoadingGrid v-if="pending" :show-delayed="showDelayed" />
  <ErrorState v-else-if="error" @retry="refresh" />

  <section v-else class="animals-grid" aria-live="polite">
    <template v-if="pagedAnimals.length">
      <AnimalCard v-for="animal in pagedAnimals" :key="animal.id" :animal="animal" />
    </template>
    <EmptyState
      v-else
      title="Brak wyników"
      description="Nie znaleźliśmy zwierząt spełniających kryteria. Spróbuj zmienić filtry."
      cta-label="Wyczyść filtry"
      @cta="resetFilters"
    />
  </section>

  <div v-if="totalPages > 1" class="animals-pagination">
    <n-pagination v-model:page="page" :page-count="totalPages" />
  </div>
</template>

<script setup lang="ts">
import { getAnimals } from '~/repositories/animalRepository'
import type { Animal } from '~/types/animal'

const { data, pending, error, refresh } = await useAsyncData('animals-list', () => {
  return getAnimals() as Animal[]
})

const animals = computed(() => data.value ?? [])
const search = ref('')
const page = ref(1)
const pageSize = 6

const filters = reactive({
  type: null as string | null,
  gender: null as string | null,
  size: null as string | null,
  age: null as string | null
})

const buildOptions = (values: string[]) =>
  values.map((value) => ({ label: value, value }))

const typeOptions = buildOptions(['pies', 'kot'])
const genderOptions = buildOptions(['samiec', 'samica'])
const sizeOptions = buildOptions(['mały', 'średni', 'duży'])
const ageOptions = computed(() => buildOptions([...new Set(animals.value.map((a) => a.age))]))

const filtered = computed(() => {
  return animals.value.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesType = !filters.type || animal.type === filters.type
    const matchesGender = !filters.gender || animal.gender === filters.gender
    const matchesSize = !filters.size || animal.size === filters.size
    const matchesAge = !filters.age || animal.age === filters.age
    return matchesSearch && matchesType && matchesGender && matchesSize && matchesAge
  })
})

const totalPages = computed(() => Math.ceil(filtered.value.length / pageSize))

const pagedAnimals = computed(() => {
  const start = (page.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})

watch(
  [search, filters],
  () => {
    page.value = 1
  },
  { deep: true }
)

const resetFilters = () => {
  search.value = ''
  filters.type = null
  filters.gender = null
  filters.size = null
  filters.age = null
}

const { showDelayed } = useDelayedLoading(pending)

useHead({
  title: 'Zwierzęta',
  meta: [
    {
      name: 'description',
      content: 'Poznaj psy i koty dostępne do adopcji. Użyj filtrów, aby znaleźć idealnego przyjaciela.'
    }
  ]
})
</script>
