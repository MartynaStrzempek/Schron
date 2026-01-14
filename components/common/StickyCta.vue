<template>
  <div class="sticky-cta" aria-label="Szybkie akcje">
    <a class="sticky-cta__button" :href="`tel:${shelter.phone}`" aria-label="Zadzwoń">
      Zadzwoń
    </a>
    <NuxtLink class="sticky-cta__button sticky-cta__button--accent" to="/animals" aria-label="Adoptuj">
      Adoptuj
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getShelterInfo } from '~/repositories/shelter';

const { data } = await useAsyncData('shelter-info-cta', getShelterInfo);

const shelter = computed(() => ({
  phone: data.value?.phone ?? ''
}));
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.sticky-cta {
  &__button {
    flex: 1;
    text-align: center;
    padding: $spacing-12;
    border-radius: $radius-md;
    background: $color-primary;
    color: $color-white;
    font-weight: 600;

    &--accent {
      background: $color-accent;
    }
  }
}
</style>
