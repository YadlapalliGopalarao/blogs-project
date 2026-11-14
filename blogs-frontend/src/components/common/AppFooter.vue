
<script setup lang="ts">
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-main">
        <div class="footer-brand">
          <RouterLink to="/" class="brand">
            <span class="brand-icon">B</span>
            BlogSpace
          </RouterLink>

          <p>
            A place to share your thoughts, stories,
            knowledge and creativity with the world.
          </p>
        </div>

        <div class="footer-links">
          <h3>Explore</h3>

          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
        </div>

        <div class="footer-links">
          <h3>Account</h3>

          <RouterLink to="/dashboard">Dashboard</RouterLink>
          <RouterLink to="/my-blogs">My Blogs</RouterLink>
          <RouterLink to="/profile">Profile</RouterLink>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          © {{ currentYear }} BlogSpace. All rights reserved.
        </p>

        <p>Built with Vue.js and Laravel.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: auto;
  background: #111827;
  color: #d1d5db;
}

.footer-container {
  max-width: 1200px;
  margin: auto;
  padding: 48px 24px 20px;
}

.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 36px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: white;
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

.footer-brand p {
  max-width: 340px;
  margin-top: 16px;
  color: #9ca3af;
  font-size: 14px;
  line-height: 1.8;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.footer-links h3 {
  margin-bottom: 6px;
  color: white;
  font-size: 15px;
}

.footer-links a {
  color: #9ca3af;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: white;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid #374151;
  color: #9ca3af;
  font-size: 13px;
}

@media (max-width: 650px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }

  .footer-bottom {
    flex-direction: column;
  }
}
</style>
