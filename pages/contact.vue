<template>
  <div class="page__container contact">
    <div>
      <h1 class="page__title">Kontakt</h1>
      <div class="contact__details">
        <p><strong>Telefon:</strong> <a :href="`tel:${shelter.phone}`">{{ shelter.phone }}</a></p>
        <p><strong>Email:</strong> <a :href="`mailto:${shelter.email}`">{{ shelter.email }}</a></p>
        <p><strong>Adres:</strong> {{ shelter.address }}</p>
        <p><strong>Godziny otwarcia:</strong> {{ shelter.openingHours }}</p>
      </div>
      <ContactForm />
    </div>
    <div class="contact__map">
      <iframe
        :src="shelter.mapEmbedUrl"
        loading="lazy"
        title="Mapa schroniska"
        aria-label="Mapa schroniska"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ContactForm from '~/components/forms/ContactForm.vue';
import { getShelterInfo } from '~/repositories/shelter';

const { data } = await useAsyncData('shelter-contact', getShelterInfo);

const shelter = computed(() => ({
  phone: data.value?.phone ?? '',
  email: data.value?.email ?? '',
  address: data.value?.address ?? '',
  openingHours: data.value?.openingHours ?? '',
  mapEmbedUrl: data.value?.mapEmbedUrl ?? ''
}));

useHead({
  title: 'Kontakt',
  meta: [
    {
      name: 'description',
      content: 'Skontaktuj się z nami telefonicznie lub przez formularz kontaktowy.'
    }
  ]
});
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.contact {
  display: grid;
  gap: $spacing-32;

  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: 1.1fr 0.9fr;
  }

  &__details {
    margin-bottom: $spacing-24;
    color: $color-gray-500;
  }

  &__map iframe {
    width: 100%;
    height: 420px;
    border: 0;
    border-radius: $radius-lg;
    box-shadow: $shadow-sm;
  }
}
</style>
