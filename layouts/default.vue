<template>
  <div class="layout">
    <PublicHeader />
    <main class="layout__main">
      <slot />
    </main>
    <PublicFooter />
    <StickyCta />
  </div>
</template>
// TODO: add new page: adopted animals
<script setup lang="ts">
import PublicHeader from '~/components/layout/PublicHeader.vue';
import PublicFooter from '~/components/layout/PublicFooter.vue';
import StickyCta from '~/components/common/StickyCta.vue';
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: $color-gray-50;

  &__main {
    flex: 1;
  }
}
</style>
