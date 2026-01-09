<template>
  <header class="public-header">
    <div class="public-header__inner">
      <NuxtLink to="/" class="public-header__brand">Schronisko</NuxtLink>
      <nav class="public-header__nav" aria-label="Główna nawigacja">
        <NuxtLink to="/" class="public-header__link">Strona główna</NuxtLink>
        <NuxtLink to="/animals" class="public-header__link">Zwierzęta</NuxtLink>
        <NuxtLink to="/contact" class="public-header__link">Kontakt</NuxtLink>
      </nav>
      <div class="public-header__actions">
        <n-button type="primary" size="large" tag="a" href="/animals">
          Adoptuj
        </n-button>
        <n-button
          class="public-header__menu"
          quaternary
          aria-label="Otwórz menu"
          @click="showDrawer = true"
        >
          ☰
        </n-button>
      </div>
    </div>
    <n-drawer v-model:show="showDrawer" placement="right" class="public-header__drawer">
      <n-drawer-content title="Menu">
        <nav class="public-header__drawer-nav" aria-label="Menu mobilne">
          <NuxtLink to="/" class="public-header__drawer-link" @click="showDrawer = false">
            Strona główna
          </NuxtLink>
          <NuxtLink
            to="/animals"
            class="public-header__drawer-link"
            @click="showDrawer = false"
          >
            Zwierzęta
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="public-header__drawer-link"
            @click="showDrawer = false"
          >
            Kontakt
          </NuxtLink>
        </nav>
      </n-drawer-content>
    </n-drawer>
  </header>
</template>

<script setup lang="ts">
const showDrawer = ref(false)
</script>
