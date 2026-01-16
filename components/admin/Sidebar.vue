<template>
  <aside class="sidebar" aria-label="Panel administracyjny">
    <div class="sidebar__brand">Panel admina</div>
    <nav class="sidebar__nav">
      <NuxtLink class="sidebar__link" to="/admin">Dashboard</NuxtLink>
      <NuxtLink class="sidebar__link" to="/admin/animals">Zwierzęta</NuxtLink>
      <NuxtLink class="sidebar__link" to="/">Strona publiczna</NuxtLink>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
//TODO: change root class for admin-sidebar
.sidebar {
  display: flex;
  flex-direction: column;
  gap: $spacing-24;

  &__brand {
    font-weight: 700;
    font-size: 1.1rem;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: $spacing-12;
  }

  &__link {
    padding: $spacing-8 $spacing-12;
    border-radius: $radius-sm;
    background: $color-gray-100;
    font-weight: 500;

    &.router-link-active {
      background: rgba($color-primary, 0.15);
      color: $color-primary-600;
    }
  }
}
</style>
