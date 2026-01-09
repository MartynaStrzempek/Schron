<template>
  <div class="page__container error">
    <h1 class="error__title">{{ title }}</h1>
    <p class="error__text">{{ message }}</p>
    <n-button type="primary" @click="handleError">Wróć na stronę główną</n-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NButton } from 'naive-ui';

const error = useError();

const title = computed(() => {
  if (error.value?.statusCode === 404) return 'Nie znaleziono';
  if (error.value?.statusCode === 401 || error.value?.statusCode === 403) return 'Brak uprawnień';
  return 'Coś poszło nie tak';
});

const message = computed(() => {
  if (error.value?.statusCode === 404) return 'Nie znaleziono wskazanej strony.';
  if (error.value?.statusCode === 401 || error.value?.statusCode === 403)
    return 'Nie masz dostępu do tego zasobu. Zaloguj się ponownie.';
  return 'Wystąpił błąd. Spróbuj ponownie później.';
});

const handleError = () => {
  clearError({ redirect: '/' });
};
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.error {
  text-align: center;
  padding: $spacing-12 $spacing-4;

  &__title {
    font-size: 2.4rem;
    margin-bottom: $spacing-4;
  }

  &__text {
    color: $color-gray-500;
    margin-bottom: $spacing-6;
  }
}
</style>
