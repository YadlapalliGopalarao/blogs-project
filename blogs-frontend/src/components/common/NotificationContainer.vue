
<script setup lang="ts">
import { useNotification } from '../../composables/useNotification'

const { notifications, removeNotification } = useNotification()
</script>

<template>
  <div class="notification-container" aria-live="polite">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :class="`notification-${notification.type}`"
        role="status"
      >
        <div class="notification-content">
          <span class="notification-message">
            {{ notification.message }}
          </span>
        </div>

        <button
          class="notification-close"
          type="button"
          aria-label="Close notification"
          @click="removeNotification(notification.id)"
        >
          &times;
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notification-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  width: min(360px, calc(100vw - 32px));
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-left: 4px solid;
}

.notification-success {
  border-color: #16a34a;
}

.notification-error {
  border-color: #dc2626;
}

.notification-warning {
  border-color: #d97706;
}

.notification-info {
  border-color: #2563eb;
}

.notification-message {
  color: #1f2937;
  font-size: 14px;
  line-height: 1.5;
}

.notification-close {
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 23px;
  cursor: pointer;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.25s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-active {
  position: absolute;
  right: 0;
  width: 100%;
}
</style>
