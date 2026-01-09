import {
  create,
  NButton,
  NCard,
  NConfigProvider,
  NDivider,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NInput,
  NInputNumber,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NModal,
  NPagination,
  NSelect,
  NSkeleton,
  NTag,
  NAlert,
  NDrawer,
  NDrawerContent,
  NDialogProvider,
  NMessageProvider
} from 'naive-ui'

export default defineNuxtPlugin((nuxtApp) => {
  const naive = create({
    components: [
      NButton,
      NCard,
      NConfigProvider,
      NDivider,
      NForm,
      NFormItem,
      NGrid,
      NGridItem,
      NInput,
      NInputNumber,
      NLayout,
      NLayoutContent,
      NLayoutHeader,
      NLayoutSider,
      NMenu,
      NModal,
      NPagination,
      NSelect,
      NSkeleton,
      NTag,
      NAlert,
      NDrawer,
      NDrawerContent,
      NDialogProvider,
      NMessageProvider
    ]
  })

  nuxtApp.vueApp.use(naive)
})
