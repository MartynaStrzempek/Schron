export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin/login') return

  const adminSession = useCookie('admin_session')

  if (!adminSession.value) {
    return navigateTo('/admin/login')
  }
})
