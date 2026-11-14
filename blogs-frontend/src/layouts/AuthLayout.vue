
<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'

import NotificationContainer from '../components/common/NotificationContainer.vue'
</script>

<template>
  <div class="auth-layout">
    <div class="auth-brand">
      <RouterLink to="/" class="brand">
        <span class="brand-icon">B</span>
        BlogSpace
      </RouterLink>

      <p>Share your thoughts with the world.</p>
    </div>

    <main class="auth-main">
      <RouterView />
    </main>

    <footer class="auth-footer">
      © {{ new Date().getFullYear() }} BlogSpace. All rights reserved.
    </footer>

    <NotificationContainer />
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, #eef2ff, #f8fafc, #f5f3ff);
}

.auth-brand {
  margin-bottom: 30px;
  text-align: center;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #111827;
  font-size: 26px;
  font-weight: 800;
  text-decoration: none;
}

.brand-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #4f46e5;
  color: white;
}

.auth-brand p {
  margin-top: 10px;
  color: #6b7280;
  font-size: 14px;
}

.auth-main {
  width: 100%;
  max-width: 460px;
}

.auth-footer {
  margin-top: 30px;
  color: #9ca3af;
  font-size: 12px;
  text-align: center;
}
</style>
