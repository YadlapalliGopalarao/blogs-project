
import { createRouter, createWebHistory } from 'vue-router'

import { setupRouterGuards } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // Scroll to the top whenever navigating to a new page
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },

  routes: [
    // Public pages
    {
      path: '/',
      component: () => import('../layouts/PublicLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/public/HomeView.vue'),
        },
        {
          path: 'blogs/:id',
          name: 'blog-details',
          component: () => import('../views/public/BlogDetailsView.vue'),
        },
      ],
    },

    // Authentication pages
    {
      path: '/auth',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/public/LoginView.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/public/RegisterView.vue'),
        },
      ],
    },

    // Dashboard pages
    {
      path: '/app',
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/dashboard/DashboardView.vue'),
        },
        {
          path: '/my-blogs',
          name: 'my-blogs',
          component: () => import('../views/dashboard/MyBlogsView.vue'),
        },
        {
          path: '/blogs/create',
          name: 'create-blog',
          component: () => import('../views/dashboard/CreateBlogView.vue'),
        },
        {
          path: '/blogs/:id/edit',
          name: 'edit-blog',
          component: () => import('../views/dashboard/EditBlogView.vue'),
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/dashboard/ProfileView.vue'),
        },
      ],
    },

    // Error pages
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/errors/UnauthorizedView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/errors/NotFoundView.vue'),
    },
  ],
})

setupRouterGuards(router)

export default router
