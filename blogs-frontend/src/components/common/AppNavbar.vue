
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../../modules/auth/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(
  () => authStore.isAuthenticated,
)

async function handleLogout() {
  try {
    await authStore.logout()
  } finally {
    router.push('/login')
  }
}
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">
      <RouterLink to="/" class="brand">
        <span class="brand-icon">B</span>
        <span>BlogSpace</span>
      </RouterLink>

      <nav class="nav-links">
        <RouterLink to="/" class="nav-link">
          Home
        </RouterLink>

        <template v-if="isAuthenticated">
          <RouterLink to="/dashboard" class="nav-link">
            Dashboard
          </RouterLink>

          <RouterLink to="/my-blogs" class="nav-link">
            My Blogs
          </RouterLink>

          <RouterLink to="/profile" class="nav-link">
            Profile
          </RouterLink>

          <button
            type="button"
            class="logout-button"
            @click="handleLogout"
          >
            Logout
          </button>
        </template>

        <template v-else>
          <RouterLink to="/login" class="nav-link">
            Login
          </RouterLink>

          <RouterLink to="/register" class="register-button">
            Get Started
          </RouterLink>
        </template>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.navbar-container {
  max-width: 1200px;
  min-height: 72px;
  margin: auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #111827;
  font-size: 21px;
  font-weight: 800;
  text-decoration: none;
}

.brand-icon {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #4f46e5;
  color: white;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  color: #4b5563;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #4f46e5;
}

.register-button,
.logout-button {
  padding: 10px 17px;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.register-button:hover,
.logout-button:hover {
  background: #4338ca;
}

@media (max-width: 650px) {
  .navbar-container {
    padding: 12px 16px;
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-links {
    width: 100%;
    gap: 16px;
    flex-wrap: wrap;
  }
}
</style>
