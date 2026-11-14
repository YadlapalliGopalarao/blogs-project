
import type { Router } from 'vue-router'

export function setupRouterGuards(router: Router) {
  router.beforeEach((to) => {
    const token = localStorage.getItem('token')

    const isAuthenticated = Boolean(token)

    const requiresAuth = to.matched.some(
      (record) => record.meta.requiresAuth
    )

    const isGuestRoute = ['login', 'register'].includes(
      to.name as string
    )

    // Protect dashboard routes
    if (requiresAuth && !isAuthenticated) {
      return {
        name: 'login',
        query: { redirect: to.fullPath },
      }
    }

    // Redirect authenticated users away from guest pages
    if (isGuestRoute && isAuthenticated) {
      return { name: 'dashboard' }
    }

    return true
  })
}
