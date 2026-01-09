<template>
  <div class="error-page">
    <n-card class="error-page__card">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <n-button type="primary" tag="a" href="/">Wróć na stronę główną</n-button>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { NuxtError } from '#app'

const props = defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

const title = computed(() => {
  if (props.error.statusCode === 404) return 'Nie znaleziono'
  if (props.error.statusCode === 401 || props.error.statusCode === 403)
    return 'Brak uprawnień'
  return 'Wystąpił błąd'
})

const description = computed(() => {
  if (props.error.statusCode === 404) return 'Sprawdź adres lub wróć na stronę główną.'
  if (props.error.statusCode === 401 || props.error.statusCode === 403)
    return 'Nie masz dostępu do tej strony. Zaloguj się ponownie.'
  return 'Coś poszło nie tak. Spróbuj ponownie za chwilę.'
})
</script>
