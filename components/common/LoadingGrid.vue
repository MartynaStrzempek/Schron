<template>
  <div class="loading-grid" aria-live="polite">
    <div class="loading-grid__items">
      <n-skeleton v-for="item in items" :key="item" height="280px" width="100%" />
    </div>
    <p v-if="showDelayed" class="loading-grid__text">Ładowanie...</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ items?: number; showDelayed?: boolean }>(),
  {
    items: 6,
    showDelayed: false
  }
)

const items = computed(() => Array.from({ length: props.items }, (_, i) => i))
</script>
