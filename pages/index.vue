<template>
  <div>
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

    <section class="page__container">
      <div class="section__header">
        <h2 class="section__title">Wyróżnione zwierzęta</h2>
        <p class="section__subtitle">Poznaj podopiecznych, którzy pilnie szukają domu.</p>
      </div>
      <div v-if="pending" class="card-grid">
        <n-skeleton v-for="item in 3" :key="item" height="260px" />
        <p v-if="showLoadingText" class="state__loading">Ładowanie...</p>
      </div>
      <div v-else-if="error" class="state">
        <n-alert type="error" title="Błąd">
          Nie udało się pobrać zwierząt. Spróbuj ponownie.
        </n-alert>
        <n-button @click="refresh">Spróbuj ponownie</n-button>
      </div>
      <div v-else-if="featuredAnimals.length === 0" class="state">
        <n-empty description="Brak wyróżnionych zwierząt" />
      </div>
      <div v-else class="card-grid">
        <AnimalCard v-for="animal in featuredAnimals" :key="animal.id" :animal="animal" />
      </div>
    </section>

    <section class="info">
      <div class="info__content">
        <h2 class="section__title">Dlaczego warto adoptować?</h2>
        <p class="section__subtitle">
          Adoptując, dajesz szansę na nowe życie i wspierasz lokalne działania NGO.
        </p>
        <ul class="info__list">
          <li>Pełne wsparcie behawioralne i adopcyjne.</li>
          <li>Zweryfikowane zdrowie i opieka weterynaryjna.</li>
          <li>Możliwość kontaktu z opiekunem po adopcji.</li>
        </ul>
      </div>
      <div class="info__cta">
        <n-card>
          <h3>Masz pytania?</h3>
          <p>Zadzwoń do nas lub wypełnij formularz kontaktowy.</p>
          <n-button type="primary" @click="navigateTo('/contact')">Kontakt</n-button>
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

const { data, pending, error, refresh } = await useAsyncData('home-animals', getAnimals);
const showLoadingText = ref(false);

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
  gap: $spacing-8;
  padding: $spacing-10 $spacing-4;
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
    margin: 0 0 $spacing-4;
  }

  &__text {
    color: $color-gray-500;
    margin-bottom: $spacing-6;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-3;
  }

  &__image img {
    border-radius: $radius-lg;
    box-shadow: $shadow-md;
  }
}

.card-grid {
  display: grid;
  gap: $spacing-6;

  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.info {
  display: grid;
  gap: $spacing-8;
  max-width: 1200px;
  margin: 0 auto $spacing-12;
  padding: 0 $spacing-4;

  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: 2fr 1fr;
  }

  &__list {
    padding-left: $spacing-4;
  }
}

.state {
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
  align-items: flex-start;

  &__loading {
    color: $color-gray-500;
  }
}
</style>
