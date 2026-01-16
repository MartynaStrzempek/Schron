<template>
  <n-card class="animal-card" :title="animal.name" :segmented="{ content: true }">
    <template #cover>
      <img :src="animal.photos[0]" :alt="animal.name" class="animal-card__image" />
    </template>
    <div class="animal-card__meta">
      <n-tag type="success" size="small">{{ animal.status }}</n-tag>
      <n-tag v-if="animal.urgent" type="warning" size="small">Pilne</n-tag>
    </div>
    <p class="animal-card__description">{{ animal.description }}</p>
    <div class="animal-card__details">
      <span>{{ animal.age }}</span>
      <span>•</span>
      <span>{{ animal.gender }}</span>
      <span>•</span>
      <span>{{ animal.size }}</span>
    </div>
    <template #footer>
      <NuxtLink class="animal-card__link" :to="`/animals/${animal.id}`">Poznaj {{ animal.name }}</NuxtLink>
    </template>
  </n-card>
</template>
// TODO: display status only for admin
<script setup lang="ts">
import { NCard, NTag } from 'naive-ui';
import type { Animal } from '~/types/animal';

defineProps<{ animal: Animal }>();
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.animal-card {
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  transition: transform $transition-base, box-shadow $transition-base;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(17, 24, 39, 0.12);
  }

  &__image {
    width: 100%;
    height: 220px;
    object-fit: cover;
  }

  &__meta {
    display: flex;
    gap: $spacing-8;
    margin-bottom: $spacing-8;
  }

  &__description {
    margin: 0 0 $spacing-8;
    color: $color-gray-500;
  }

  &__details {
    display: flex;
    gap: $spacing-8;
    color: $color-gray-700;
    font-size: 0.9rem;
  }

  &__link {
    color: $color-primary;
    font-weight: 600;
  }
}
</style>
