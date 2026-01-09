<template>
  <footer class="public-footer">
    <div class="public-footer__inner">
      <div class="public-footer__brand">
        <h2 class="public-footer__title">Schronisko Przyjaciele Zwierząt</h2>
        <p class="public-footer__text">
          Działamy lokalnie, by łączyć zwierzęta z kochającymi rodzinami.
        </p>
      </div>
      <div class="public-footer__contact">
        <p class="public-footer__text">Telefon: <a :href="`tel:${shelter.phone}`">{{ shelter.phone }}</a></p>
        <p class="public-footer__text">Email: <a :href="`mailto:${shelter.email}`">{{ shelter.email }}</a></p>
        <p class="public-footer__text">Adres: {{ shelter.address }}</p>
      </div>
    </div>
    <div class="public-footer__bottom">© 2024 Schronisko Przyjaciele Zwierząt</div>
  </footer>
</template>

<script setup lang="ts">
import { getShelterInfo } from '~/repositories/animalRepository'

const shelter = getShelterInfo()
</script>
