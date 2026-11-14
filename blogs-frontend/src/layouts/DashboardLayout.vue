
<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'

import AppNavbar from '../components/common/AppNavbar.vue'
import AppFooter from '../components/common/AppFooter.vue'
import NotificationContainer from '../components/common/NotificationContainer.vue'
</script>

<template>
  <div class="dashboard-layout">
    <AppNavbar />

    <div class="dashboard-container">
      <aside class="dashboard-sidebar">
        <h3>Workspace</h3>

        <nav class="sidebar-navigation">
          <RouterLink to="/dashboard">
            <span>Dashboard</span>
          </RouterLink>

          <RouterLink to="/my-blogs">
            <span>My Blogs</span>
          </RouterLink>

          <RouterLink to="/blogs/create">
            <span>Create Blog</span>
          </RouterLink>

          <RouterLink to="/profile">
            <span>My Profile</span>
          </RouterLink>
        </nav>
      </aside>

      <main class="dashboard-main">
        <RouterView />
      </main>
    </div>

    <AppFooter />

    <NotificationContainer />
  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-container {
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

.dashboard-sidebar {
  width: 250px;
  flex-shrink: 0;
  padding: 30px 20px;
  background: #f9fafb;
  border-right: 1px solid #e5e7eb;
}

.dashboard-sidebar h3 {
  margin-bottom: 24px;
  color: #111827;
  font-size: 16px;
}

.sidebar-navigation {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-navigation a {
  padding: 12px 14px;
  border-radius: 8px;
  color: #4b5563;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.sidebar-navigation a:hover,
.sidebar-navigation a.router-link-active {
  background: #eef2ff;
  color: #4f46e5;
}

.dashboard-main {
  flex: 1;
  min-width: 0;
  padding: 32px;
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .dashboard-sidebar {
    width: 100%;
    padding: 16px;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }

  .sidebar-navigation {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .dashboard-main {
    padding: 20px 16px;
  }
}
</style>
