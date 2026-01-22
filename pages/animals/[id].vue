<template>
  <div class="page animal-page">
    <div class="page__container">
      <n-button class="page__back" secondary @click="navigateTo('/animals')">
        Wróć do listy
      </n-button>

      <div v-if="pending" class="page__loader">
        <n-skeleton height="320px" />
        <n-skeleton text :repeat="4" />
      </div>

      <div v-else-if="error" class="page__error">
        <n-alert type="error" title="Błąd">Nie udało się pobrać danych.</n-alert>
        <n-button class="page__retry" @click="refresh">Spróbuj ponownie</n-button>
      </div>

      <div v-else class="animal-details">
        <div class="animal-details__gallery">
          <img
            v-for="(photo, index) in animal.photos"
            :key="photo"
            :src="photo"
            :alt="`${animal.name} ${index + 1}`"
            class="animal-details__photo"
          />
        </div>

        <div class="animal-details__info">
          <h1 class="animal-details__title">{{ animal.name }}</h1>

          <div class="animal-details__tags">
            <n-tag type="success">{{ animal.status }}</n-tag>
            <n-tag v-if="animal.urgent" type="warning">Pilne</n-tag>
          </div>

          <p class="animal-details__description">{{ animal.description }}</p>

          <ul class="animal-details__list">
            <li class="animal-details__item"><strong>Wiek:</strong> {{ animal.age }}</li>
            <li class="animal-details__item"><strong>Płeć:</strong> {{ animal.gender }}</li>
            <li class="animal-details__item"><strong>Wielkość:</strong> {{ animal.size }}</li>
            <li class="animal-details__item"><strong>Data przyjęcia:</strong> {{ animal.intakeDate }}</li>
            <li class="animal-details__item"><strong>Czas w schronisku:</strong> {{ timeInShelter }}</li>
          </ul>

          <div class="animal-details__actions">
            <n-button type="primary" :href="`tel:${shelter.phone}`" tag="a">
              Zadzwoń
            </n-button>
            <n-button
              secondary
              :href="shelter.adoptionFormUrl"
              tag="a"
              target="_blank"
              rel="noopener"
            >
              Ankieta adopcyjna
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { NAlert, NButton, NSkeleton, NTag } from 'naive-ui';
import { getAnimalById } from '~/repositories/animals';
import { getShelterInfo } from '~/repositories/shelter';

const route = useRoute();

const { data, pending, error, refresh } = await useAsyncData(`animal-${route.params.id}`, () =>
  getAnimalById(String(route.params.id))
);

if (!data.value && !pending.value) {
  throw createError({ statusCode: 404, statusMessage: 'Nie znaleziono zwierzęcia' });
}

const animal = computed(() => data.value!);

const { data: shelterData } = await useAsyncData('shelter-detail', getShelterInfo);
const shelter = computed(() => ({
  phone: shelterData.value?.phone ?? '',
  adoptionFormUrl: shelterData.value?.adoptionFormUrl ?? '#'
}));

const timeInShelter = computed(() => {
  const intakeDate = new Date(animal.value.intakeDate);
  const nowDate = new Date();
  const daysSinceIntakeToNow = Math.floor((nowDate.getTime() - intakeDate.getTime()) / (1000 * 60 * 60 * 24));
  return `${daysSinceIntakeToNow} dni`;
});

useHead({
  title: animal.value?.name ?? '',
  meta: [
    {
      name: 'description',
      content: animal.value?.description ?? 'Poznaj podopiecznego schroniska.'
    }
  ]
});
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.page {
  &__error {
    display: flex;
    flex-direction: column;
    gap: $spacing-16;
    margin-top: $spacing-24;
  }
}
.animal-details {
  margin-top: $spacing-24;
  display: grid;
  gap: $spacing-32;

  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: 1.2fr 1fr;
  }

  &__gallery {
    display: grid;
    gap: $spacing-16;

    img {
      border-radius: $radius-lg;
      box-shadow: $shadow-sm;
    }
  }

  &__title {
    margin: 0 0 $spacing-12;
  }

  &__tags {
    display: flex;
    gap: $spacing-8;
    margin-bottom: $spacing-16;
  }

  &__description {
    color: $color-gray-500;
  }

  &__list {
    padding-left: $spacing-16;
  }

  &__actions {
    display: flex;
    gap: $spacing-12;
    margin-top: $spacing-16;
    flex-wrap: wrap;
  }
}
</style>
