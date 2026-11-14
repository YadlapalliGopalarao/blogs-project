
<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'small' | 'medium' | 'large'
    label?: string
  }>(),
  {
    size: 'medium',
    label: 'Loading...',
  },
)
</script>

<template>
  <div
    class="loading-container"
    role="status"
    aria-live="polite"
  >
    <div
      class="spinner"
      :class="`spinner-${size}`"
      aria-hidden="true"
    ></div>

    <span class="loading-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
}

.spinner {
  border: 3px solid #e5e7eb;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner-small {
  width: 20px;
  height: 20px;
}

.spinner-medium {
  width: 36px;
  height: 36px;
}

.spinner-large {
  width: 52px;
  height: 52px;
}

.loading-label {
  color: #6b7280;
  font-size: 14px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
