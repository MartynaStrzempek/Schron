<template>
  <div class="empty-state" role="status">
    <h3 class="empty-state__title">{{ title }}</h3>
    <p class="empty-state__description">{{ description }}</p>
    <div v-if="ctaLabel" class="empty-state__actions">
      <n-button type="primary" @click="$emit('cta')">{{ ctaLabel }}</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ title: string; description: string; ctaLabel?: string }>(),
  {
    ctaLabel: undefined
  }
)

defineEmits<{ (e: 'cta'): void }>()
</script>
