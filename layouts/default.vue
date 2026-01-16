<template>
  <div class="layout">
    <Header />
    <main class="layout__main">
      <slot />
    </main>
    <Footer />
    <StickyCta />
  </div>
</template>
// TODO: add new page: adopted animals
<script setup lang="ts">
import Header from '~/components/common/Header.vue';
import Footer from '~/components/common/Footer.vue';
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
