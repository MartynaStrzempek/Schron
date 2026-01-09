<template>
  <div class="public-layout">
    <PublicHeader />
    <main class="public-layout__content">
      <slot />
    </main>
    <PublicFooter />
    <StickyCta v-if="showSticky" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const showSticky = computed(() => !route.path.startsWith('/admin'))
</script>
