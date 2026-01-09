<template>
  <header class="admin-topbar">
    <div class="admin-topbar__left">
      <n-button
        class="admin-topbar__menu"
        quaternary
        aria-label="Otwórz menu"
        @click="$emit('toggle-menu')"
      >
        ☰
      </n-button>
      <h1 class="admin-topbar__title">{{ title }}</h1>
    </div>
    <div class="admin-topbar__actions">
      <n-button tertiary @click="logout">Wyloguj</n-button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'toggle-menu'): void }>()

const route = useRoute()

const title = computed(() => {
  if (route.path.startsWith('/admin/animals')) return 'Zarządzanie zwierzętami'
  return 'Dashboard'
})

const logout = () => {
  const adminSession = useCookie('admin_session')
  adminSession.value = null
  if (process.client) {
    window.localStorage.removeItem('schron_admin_animals')
  }
  navigateTo('/admin/login')
}
</script>
