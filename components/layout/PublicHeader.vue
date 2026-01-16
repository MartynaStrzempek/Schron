<template>
   //TODO: change root class for public-header
  <header class="header">
    <div class="header__container">
      <NuxtLink to="/" class="header__logo" aria-label="Schronisko Nadzieja">
        <span class="header__logo-mark">🐾</span>
        Schronisko Nadzieja
      </NuxtLink>
      <nav class="header__nav" aria-label="Nawigacja główna">
        <NuxtLink class="header__link" to="/animals">Zwierzęta</NuxtLink>
        <NuxtLink class="header__link" to="/contact">Kontakt</NuxtLink>
        <NuxtLink class="header__link header__link--cta" to="/animals">Adoptuj</NuxtLink>
      </nav>
      <button class="header__burger" type="button" @click="isOpen = !isOpen" aria-label="Otwórz menu">
        ☰
      </button>
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="header__drawer">
        <NuxtLink class="header__drawer-link" to="/animals" @click="isOpen = false">Zwierzęta</NuxtLink>
        <NuxtLink class="header__drawer-link" to="/contact" @click="isOpen = false">Kontakt</NuxtLink>
        <NuxtLink class="header__drawer-link header__drawer-link--cta" to="/animals" @click="isOpen = false">
          Adoptuj
        </NuxtLink>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.header {
  position: sticky;
  top: 0;
  z-index: $z-header;
  background: linear-gradient(90deg, rgba($color-primary, 0.08) 0%, rgba($color-primary, 0.04) 50%, $color-white 100%);
  border-bottom: 1px solid rgba($color-primary, 0.1);

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: $spacing-16;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-16;
  }

  &__logo {
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: $spacing-8;
  }

  &__logo-mark {
    font-size: 1.4rem;
  }

  &__nav {
    display: none;
    gap: $spacing-16;
    align-items: center;

    @media (min-width: $breakpoint-tablet) {
      display: flex;
    }
  }

  &__link {
    color: $color-gray-700;
    font-weight: 500;
    transition: color $transition-base;

    &:hover,
    &:focus-visible {
      color: $color-primary;
    }

    &--cta {
      padding: $spacing-8 $spacing-16;
      border-radius: $radius-md;
      background: $color-accent;
      color: $color-white;

      @media (min-width: $breakpoint-tablet) {
        transition: transform $transition-base, box-shadow $transition-base;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(17, 24, 39, 0.15);
        }
      }
    }
  }

  &__burger {
    border: 1px solid $color-gray-200;
    background: $color-white;
    padding: $spacing-8 $spacing-12;
    border-radius: $radius-sm;
    font-size: 1.2rem;

    @media (min-width: $breakpoint-tablet) {
      display: none;
    }
  }

  &__drawer {
    display: flex;
    flex-direction: column;
    gap: $spacing-8;
    padding: $spacing-16;
    background: $color-white;
    border-top: 1px solid $color-gray-200;
  }

  &__drawer-link {
    padding: $spacing-12;
    border-radius: $radius-sm;
    background: $color-gray-100;

    &--cta {
      background: $color-accent;
      color: $color-white;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-base;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
