<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, type GlobalThemeOverrides } from 'naive-ui';
// TODO: move requests to server side
// TODO: implement lazy loading for images
// TODO: implement infinite scroll
// TODO: use constants for that object
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2F855A',
    primaryColorHover: '#276749',
    primaryColorPressed: '#22543D',
    borderRadius: '12px',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
  }
};
</script>
