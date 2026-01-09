<template>
  <div class="error-state" role="alert">
    <h3 class="error-state__title">{{ title }}</h3>
    <p class="error-state__description">{{ description }}</p>
    <div class="error-state__actions">
      <n-button type="primary" @click="$emit('retry')">Spróbuj ponownie</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ title: string; description: string }>(),
  {
    title: 'Wystąpił błąd',
    description: 'Nie udało się pobrać danych. Spróbuj ponownie.'
  }
)

defineEmits<{ (e: 'retry'): void }>()
</script>
