
<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger' | 'outline'
    size?: 'small' | 'medium' | 'large'
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean
    disabled?: boolean
    fullWidth?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'medium',
    type: 'button',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
)
</script>

<template>
  <button
    :type="type"
    class="base-button"
    :class="[
      `button-${variant}`,
      `button-${size}`,
      { 'button-full-width': fullWidth },
    ]"
    :disabled="disabled || loading"
  >
      <span
    v-if="loading"
    class="button-spinner"
    aria-hidden="true"
  ></span>

    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button-primary {
  background: #4f46e5;
  color: white;
}

.button-primary:hover:not(:disabled) {
  background: #4338ca;
}

.button-secondary {
  background: #e5e7eb;
  color: #1f2937;
}

.button-secondary:hover:not(:disabled) {
  background: #d1d5db;
}

.button-danger {
  background: #dc2626;
  color: white;
}

.button-danger:hover:not(:disabled) {
  background: #b91c1c;
}

.button-outline {
  background: transparent;
  color: #4f46e5;
  border-color: #4f46e5;
}

.button-outline:hover:not(:disabled) {
  background: #eef2ff;
}

.button-small {
  padding: 7px 12px;
  font-size: 13px;
}

.button-medium {
  padding: 10px 18px;
  font-size: 14px;
}

.button-large {
  padding: 13px 24px;
  font-size: 16px;
}

.button-full-width {
  width: 100%;
}

.button-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
