<template>
  <n-card class="animal-card" :title="animal.name" content-style="padding: 0;">
    <div class="animal-card__media">
      <img :src="animal.images[0]" :alt="`Zdjęcie ${animal.name}`" class="animal-card__image" />
      <n-tag v-if="animal.urgent" type="error" class="animal-card__tag">Pilne</n-tag>
    </div>
    <div class="animal-card__content">
      <div class="animal-card__meta">
        <span>{{ animal.type }}</span>
        <span>•</span>
        <span>{{ animal.age }}</span>
      </div>
      <p class="animal-card__description">{{ animal.description }}</p>
      <div class="animal-card__actions">
        <n-button type="primary" tag="a" :href="`/animals/${animal.id}`">Poznaj</n-button>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import type { Animal } from '~/types/animal'

defineProps<{ animal: Animal }>()
</script>
