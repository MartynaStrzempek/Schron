<template>
  <div>
    <n-layout-sider class="admin-sidebar" bordered collapse-mode="width" :collapsed-width="0">
      <div class="admin-sidebar__brand">Panel admina</div>
      <n-menu :options="menuOptions" :value="active" class="admin-sidebar__menu" />
    </n-layout-sider>
    <n-drawer v-model:show="drawerOpen" placement="left" class="admin-sidebar__drawer" @after-leave="emit('close')">
      <n-drawer-content title="Panel admina">
        <n-menu :options="menuOptions" :value="active" class="admin-sidebar__menu" />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { MenuOption } from 'naive-ui'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const route = useRoute()

const menuOptions: MenuOption[] = [
  {
    label: () => h(NuxtLink, { to: '/admin' }, { default: () => 'Dashboard' }),
    key: '/admin'
  },
  {
    label: () => h(NuxtLink, { to: '/admin/animals' }, { default: () => 'Zwierzęta' }),
    key: '/admin/animals'
  }
]

const active = computed(() =>
  route.path.startsWith('/admin/animals') ? '/admin/animals' : '/admin'
)

const drawerOpen = computed({
  get: () => props.open,
  set: (value) => {
    if (!value) emit('close')
  }
})
</script>
