<template>
  <div class="page home-page">
    <section class="hero">
      <div class="hero__content">
        <p class="hero__eyebrow">Razem pomagamy zwierzętom</p>
        <h1 class="hero__title">Znajdź nowego przyjaciela w Schronisku Nadzieja</h1>
        <p class="hero__text">
          Zapewniamy bezpieczny dom tymczasowy, opiekę i wsparcie adopcyjne. Pomóż nam zmieniać
          historie zwierząt.
        </p>
        <div class="hero__actions">
          <n-button type="primary" size="large" @click="navigateTo('/animals')">Adoptuj</n-button>
          <n-button size="large" secondary @click="navigateTo('/animals')">Zobacz zwierzęta</n-button>
          <n-button size="large" tertiary @click="navigateTo('/contact')">Kontakt</n-button>
        </div>
      </div>
      <div class="hero__image">
        <img src="https://placehold.co/600x480?text=Schronisko" alt="Adopcja zwierząt" />
      </div>
    </section>

    <section class="page__container featured-animals">
      <div class="featured-animals__header">
        <h2 class="featured-animals__title">Wyróżnione zwierzęta</h2>
        <p class="featured-animals__subtitle">Poznaj podopiecznych, którzy pilnie szukają domu.</p>
      </div>

      <div v-if="pending" class="featured-animals__grid">
        <n-skeleton v-for="item in 3" :key="item" height="260px" />
      </div>

      <div v-else-if="error" class="featured-animals__error-message">
        <n-alert type="error" title="Błąd">
          Nie udało się pobrać zwierząt. Spróbuj ponownie.
        </n-alert>
        <n-button class="featured-animals__retry" @click="refresh">Spróbuj ponownie</n-button>
      </div>

      <div v-else-if="featuredAnimals.length === 0" class="featured-animals__empty-result-message">
        <n-empty description="Brak wyróżnionych zwierząt" />
      </div>

      <div v-else class="featured-animals__grid">
        <AnimalCard
          v-for="animal in featuredAnimals"
          :key="animal.id"
          :animal="animal"
          class="featured-animals__card"
        />
      </div>
    </section>

    <section class="page__container adoption-info">
      <div class="adoption-info__content">
        <h2 class="adoption-info__title">Dlaczego warto adoptować?</h2>
        <p class="adoption-info__subtitle">
          Adoptując, dajesz szansę na nowe życie i wspierasz lokalne działania NGO.
        </p>

        <ul class="adoption-info__list">
          <li class="adoption-info__item">Pełne wsparcie behawioralne i adopcyjne.</li>
          <li class="adoption-info__item">Zweryfikowane zdrowie i opieka weterynaryjna.</li>
          <li class="adoption-info__item">Możliwość kontaktu z opiekunem po adopcji.</li>
        </ul>
      </div>

      <div class="adoption-info__cta">
        <n-card class="adoption-info__card">
          <h3 class="adoption-info__card-title">Masz pytania?</h3>
          <p class="adoption-info__card-text">Zadzwoń do nas lub wypełnij formularz kontaktowy.</p>
          <n-button class="adoption-info__button" type="primary" @click="navigateTo('/contact')">
            Kontakt
          </n-button>
        </n-card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NAlert, NButton, NCard, NEmpty, NSkeleton } from 'naive-ui';
import AnimalCard from '~/components/cards/AnimalCard.vue';
import { getAnimals } from '~/repositories/animals';

// TODO: should not get data, should use action getAnimals from store
const { data, pending, error, refresh } = await useAsyncData('home-animals', getAnimals);

const featuredAnimals = computed(() => (data.value ?? []).filter((animal) => animal.featured).slice(0, 3));

useHead({
  title: 'Strona główna',
  meta: [
    {
      name: 'description',
      content: 'Schronisko dla zwierząt z misją adopcji i wsparcia. Poznaj naszych podopiecznych.'
    }
  ]
});
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.hero {
  display: grid;
  gap: $spacing-32;
  padding: $spacing-40 $spacing-16;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
  }

  &__eyebrow {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: $color-primary;
    font-weight: 600;
  }

  &__title {
    font-size: 2.5rem;
    margin: 0 0 $spacing-16;
  }

  &__text {
    color: $color-gray-500;
    margin-bottom: $spacing-24;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-12;
  }

  &__image img {
    border-radius: $radius-lg;
    box-shadow: $shadow-md;
  }
}

.featured-animals {
  &__grid {
    display: grid;
    gap: $spacing-24;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &__error-message,
  &__empty-result-message {
    display: flex;
    flex-direction: column;
    gap: $spacing-16;
    align-items: flex-start;

    &__loading {
      color: $color-gray-500;
    }
  }
}

.adoption-info {
  display: grid;
  gap: $spacing-32;

  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: 2fr 1fr;
  }

  &__list {
    padding-left: $spacing-16;
  }
}
</style>
