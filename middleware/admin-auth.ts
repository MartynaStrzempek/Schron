export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin/login') return;

  const authCookie = useCookie('admin_auth');
  if (!authCookie.value) {
    return navigateTo('/admin/login');
  }
});
