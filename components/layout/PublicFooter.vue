<template>
  <footer class="footer">
    <div class="footer__container">
      <div>
        <h3 class="footer__title">Schronisko Nadzieja</h3>
        <p class="footer__text">{{ shelter.address }}</p>
        <p class="footer__text">{{ shelter.openingHours }}</p>
      </div>
      <div>
        <p class="footer__text">
          Telefon: <a :href="`tel:${shelter.phone}`">{{ shelter.phone }}</a>
        </p>
        <p class="footer__text">
          Email: <a :href="`mailto:${shelter.email}`">{{ shelter.email }}</a>
        </p>
      </div>
      <div>
        <NuxtLink class="footer__link" to="/animals">Zobacz zwierzęta</NuxtLink>
        <NuxtLink class="footer__link" to="/contact">Kontakt</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getShelterInfo, type ShelterInfo } from '~/repositories/shelter';
//TODO: change root class for public-footer
const { data } = await useAsyncData('shelter-info', getShelterInfo);

const shelter = computed<ShelterInfo>(() => ({
  name: data.value?.name ?? 'Schronisko Nadzieja',
  phone: data.value?.phone ?? '',
  email: data.value?.email ?? '',
  address: data.value?.address ?? '',
  openingHours: data.value?.openingHours ?? '',
  adoptionFormUrl: data.value?.adoptionFormUrl ?? '',
  mapEmbedUrl: data.value?.mapEmbedUrl ?? ''
}));
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.footer {
  background: $color-white;
  border-top: 1px solid $color-gray-200;
  padding: $spacing-32 $spacing-16;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    gap: $spacing-24;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__title {
    margin: 0 0 $spacing-8;
  }

  &__text {
    margin: 0 0 $spacing-8;
    color: $color-gray-500;
  }

  &__link {
    display: block;
    margin-bottom: $spacing-8;
    font-weight: 600;
  }
}
</style>
