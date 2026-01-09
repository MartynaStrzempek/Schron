<template>
  <section class="home-hero">
    <div class="home-hero__content">
      <p class="home-hero__eyebrow">Schronisko Przyjaciele Zwierząt</p>
      <h1 class="home-hero__title">Podaruj dom tym, którzy najbardziej go potrzebują.</h1>
      <p class="home-hero__subtitle">
        Pomagamy psom i kotom znaleźć bezpieczne miejsce. Sprawdź zwierzęta gotowe do adopcji.
      </p>
      <div class="home-hero__actions">
        <n-button type="primary" size="large" tag="a" href="/animals">Zobacz zwierzęta</n-button>
        <n-button size="large" tag="a" href="/contact">Kontakt</n-button>
      </div>
    </div>
    <div class="home-hero__image" aria-hidden="true">
      <img src="/images/animals/dog-1.svg" alt="" />
    </div>
  </section>

  <section class="home-featured" aria-labelledby="featured-title">
    <div class="home-featured__header">
      <h2 id="featured-title">Wyróżnione zwierzęta</h2>
      <n-button tertiary tag="a" href="/animals">Zobacz wszystkie</n-button>
    </div>

    <LoadingGrid v-if="pending" :show-delayed="showDelayed" />
    <ErrorState v-else-if="error" @retry="refresh" />
    <div v-else class="home-featured__grid">
      <AnimalCard v-for="animal in featured" :key="animal.id" :animal="animal" />
    </div>
  </section>

  <section class="home-cta" aria-labelledby="home-cta-title">
    <div class="home-cta__content">
      <h2 id="home-cta-title">Zadzwoń lub wypełnij ankietę adopcyjną</h2>
      <p>
        Jesteśmy dostępni codziennie. Odpowiemy na Twoje pytania i pomożemy w adopcji.
      </p>
      <div class="home-cta__actions">
        <n-button type="primary" tag="a" :href="`tel:${shelter.phone}`">Zadzwoń</n-button>
        <n-button tag="a" :href="shelter.adoptionFormUrl" target="_blank" rel="noreferrer">
          Ankieta adopcyjna
        </n-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getFeaturedAnimals, getShelterInfo } from '~/repositories/animalRepository'
import type { Animal } from '~/types/animal'

const { data, pending, error, refresh } = await useAsyncData('featured-animals', () => {
  return getFeaturedAnimals() as Animal[]
})

const featured = computed(() => data.value ?? [])
const shelter = getShelterInfo()
const { showDelayed } = useDelayedLoading(pending)

useHead({
  title: 'Strona główna',
  meta: [
    {
      name: 'description',
      content: 'Poznaj zwierzęta gotowe do adopcji i skontaktuj się z naszym schroniskiem.'
    }
  ]
})
</script>
