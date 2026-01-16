<template>
  <div class="admin__topbar">
    <div class="topbar">
      <button
        v-if="showMobileToggle"
        class="topbar__menu"
        type="button"
        aria-label="Otwórz menu"
        @click="openDrawer?.()"
      >
        ☰
      </button>
      <h1 class="topbar__title">{{ title }}</h1>
    </div>
    <div class="topbar__actions">
      <n-button v-if="showBack" secondary @click="navigateBack">Wróć</n-button>
      <n-button v-if="showLogout" tertiary @click="logout">Wyloguj</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NButton } from 'naive-ui';
//TODO: change root class for admin-topbar
const props = defineProps<{ title: string; showBack?: boolean }>();
const openDrawer = inject<() => void>('openAdminDrawer');
const route = useRoute();
const router = useRouter();

const showMobileToggle = computed(() => route.path !== '/admin/login');
const showLogout = computed(() => route.path !== '/admin/login');

const navigateBack = () => {
  router.back();
};

const logout = () => {
  const authCookie = useCookie('admin_auth');
  authCookie.value = null;
  router.push('/admin/login');
};
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.admin {
    &__topbar {
      padding: $spacing-16 $spacing-24;
      background: $color-white;
      border-bottom: 1px solid $color-gray-200;
      display: flex;
      align-items: center;
      justify-content: space-between;
  }
}

.topbar {
  display: flex;
  align-items: center;
  gap: $spacing-12;

  &__title {
    margin: 0;
    font-size: 1.25rem;
  }

  &__menu {
    border: 1px solid $color-gray-200;
    background: $color-white;
    padding: $spacing-8 $spacing-12;
    border-radius: $radius-sm;

    @media (min-width: $breakpoint-tablet) {
      display: none;
    }
  }

  &__actions {
    display: flex;
    gap: $spacing-8;
  }
}
</style>
