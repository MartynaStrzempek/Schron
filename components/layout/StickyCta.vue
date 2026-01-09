<template>
  <div class="sticky-cta" aria-label="Szybkie akcje">
    <a class="sticky-cta__button" :href="`tel:${shelter.phone}`" aria-label="Zadzwoń">
      Zadzwoń
    </a>
    <NuxtLink class="sticky-cta__button sticky-cta__button--primary" to="/animals">
      Adoptuj
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { getShelterInfo } from '~/repositories/animalRepository'

const shelter = getShelterInfo()
</script>
