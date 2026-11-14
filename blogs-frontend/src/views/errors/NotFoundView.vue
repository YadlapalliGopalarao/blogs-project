
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <span class="error-code">404</span>

      <h1>Page Not Found</h1>

      <p>
        Sorry! The page you're looking for doesn't exist
        or may have been moved.
      </p>

      <div class="actions">
        <RouterLink to="/" class="home-button">
          Back to Home
        </RouterLink>

        <RouterLink to="/dashboard" class="dashboard-button">
          Go to Dashboard
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 75vh;
  display: grid;
  place-items: center;
  padding: 30px 20px;
}

.not-found-content {
  max-width: 500px;
  text-align: center;
}

.error-code {
  color: #4f46e5;
  font-size: 100px;
  font-weight: 900;
  line-height: 1;
}

.not-found-content h1 {
  margin-top: 20px;
  color: #111827;
  font-size: 30px;
  font-weight: 800;
}

.not-found-content p {
  margin-top: 12px;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.7;
}

.actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.home-button,
.dashboard-button {
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: 0.2s ease;
}

.home-button {
  background: #4f46e5;
  color: white;
}

.home-button:hover {
  background: #4338ca;
}

.dashboard-button {
  border: 1px solid #d1d5db;
  color: #374151;
}

.dashboard-button:hover {
  background: #f3f4f6;
}
</style>
