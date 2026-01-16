<template>
  <div class="admin__layout">
    <Sidebar v-if="!isLogin" class="admin__sidebar admin__sidebar--desktop" />
    <div class="admin__content">
      <Topbar :title="pageTitle" :show-back="showBack" />
      <div class="page__container">
        <slot />
      </div>
    </div>
    <n-drawer v-model:show="drawerOpen" placement="left" :width="240" :auto-focus="false">
      <Sidebar class="admin__sidebar" />
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { NDrawer } from 'naive-ui';
import Sidebar from '~/components/admin/Sidebar.vue';
import Topbar from '~/components/admin/Topbar.vue';

const route = useRoute();
const drawerOpen = ref(false);

const isLogin = computed(() => route.path === '/admin/login');
const pageTitle = computed(() =>
  route.meta.title ? String(route.meta.title) : 'Panel administracyjny'
);
const showBack = computed(() => route.path.includes('/admin/animals'));

watch(
  () => route.path,
  () => {
    drawerOpen.value = false;
  }
);

provide('openAdminDrawer', () => {
  drawerOpen.value = true;
});
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
  
.admin {
  &__layout {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: 240px 1fr;
    }
  }

  &__sidebar {
    background: $color-white;
    border-right: 1px solid $color-gray-200;
    padding: $spacing-24 $spacing-16;
    height: 100%;
  }

  &__sidebar--desktop {
    display: none;

    @media (min-width: $breakpoint-tablet) {
      display: block;
    }
  }

  &__content {
    background: $color-gray-50;
    min-height: 100vh;
  }
}
</style>
