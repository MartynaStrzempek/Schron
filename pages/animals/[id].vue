<template>
  <section v-if="pending" class="animal-detail">
    <LoadingGrid :items="1" :show-delayed="showDelayed" />
  </section>

  <section v-else-if="error" class="animal-detail">
    <ErrorState @retry="refresh" />
  </section>

  <section v-else class="animal-detail">
    <div v-if="animal" class="animal-detail__content">
      <div class="animal-detail__gallery">
        <img
          v-for="(image, index) in animal.images"
          :key="image"
          :src="image"
          :alt="`Zdjęcie ${animal.name} ${index + 1}`"
        />
      </div>
      <div class="animal-detail__info">
        <div class="animal-detail__header">
          <h1>{{ animal.name }}</h1>
          <n-tag :type="statusType" class="animal-detail__status">{{ animal.status }}</n-tag>
        </div>
        <p class="animal-detail__description">{{ animal.description }}</p>
        <ul class="animal-detail__meta">
          <li><strong>Wiek:</strong> {{ animal.age }}</li>
          <li><strong>Płeć:</strong> {{ animal.gender }}</li>
          <li><strong>Wielkość:</strong> {{ animal.size }}</li>
          <li><strong>Data przyjęcia:</strong> {{ formattedDate }}</li>
        </ul>
        <div class="animal-detail__cta">
          <n-button type="primary" tag="a" :href="`tel:${shelter.phone}`">Zadzwoń</n-button>
          <n-button tag="a" :href="shelter.adoptionFormUrl" target="_blank" rel="noreferrer">
            Ankieta adopcyjna
          </n-button>
        </div>
      </div>
    </div>
    <EmptyState
      v-else
      title="Nie znaleziono zwierzęcia"
      description="Sprawdź listę zwierząt dostępnych do adopcji."
      cta-label="Zobacz zwierzęta"
      @cta="navigateTo('/animals')"
    />
  </section>
</template>

<script setup lang="ts">
import { getAnimalById, getShelterInfo } from '~/repositories/animalRepository'
import type { Animal } from '~/types/animal'

const route = useRoute()

const { data, pending, error, refresh } = await useAsyncData(
  `animal-${route.params.id}`,
  () => getAnimalById(route.params.id as string) as Animal | undefined
)

const animal = computed(() => data.value)
const shelter = getShelterInfo()
const { showDelayed } = useDelayedLoading(pending)

const statusType = computed(() => {
  switch (animal.value?.status) {
    case 'do adopcji':
      return 'success'
    case 'w trakcie':
      return 'warning'
    case 'po adopcji':
      return 'default'
    default:
      return 'default'
  }
})

const formattedDate = computed(() => {
  if (!animal.value) return ''
  return new Intl.DateTimeFormat('pl-PL').format(new Date(animal.value.intakeDate))
})

useHead(() => ({
  title: animal.value ? animal.value.name : 'Zwierzę',
  meta: [
    {
      name: 'description',
      content: animal.value
        ? `Poznaj ${animal.value.name} – ${animal.value.description}`
        : 'Szczegóły zwierzęcia dostępnego do adopcji.'
    }
  ]
}))
</script>
