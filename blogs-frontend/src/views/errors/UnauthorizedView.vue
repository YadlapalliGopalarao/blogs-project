
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <span class="error-code">401</span>

      <h1>Authentication Required</h1>

      <p>
        You need to sign in to access this page.
        Please log in to continue.
      </p>

      <div class="error-actions">
        <RouterLink to="/login" class="primary-link">
          Sign In
        </RouterLink>

        <RouterLink to="/" class="secondary-link">
          Back to Home
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 75vh;
  display: grid;
  place-items: center;
  padding: 30px 20px;
}

.error-content {
  max-width: 500px;
  text-align: center;
}

.error-code {
  color: #4f46e5;
  font-size: 90px;
  font-weight: 900;
  line-height: 1;
}

.error-content h1 {
  margin-top: 20px;
  color: #111827;
  font-size: 28px;
  font-weight: 800;
}

.error-content p {
  margin-top: 12px;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.7;
}

.error-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.primary-link,
.secondary-link {
  display: inline-block;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: 0.2s ease;
}

.primary-link {
  background: #4f46e5;
  color: white;
}

.primary-link:hover {
  background: #4338ca;
}

.secondary-link {
  border: 1px solid #d1d5db;
  color: #374151;
}

.secondary-link:hover {
  background: #f3f4f6;
}
</style>
