<template>
  <div class="admin-layout">
    <AdminSidebar :open="isDrawerOpen" @close="isDrawerOpen = false" />
    <div class="admin-layout__content">
      <AdminTopbar @toggle-menu="isDrawerOpen = true" />
      <main class="admin-layout__main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const isDrawerOpen = ref(false)
</script>
