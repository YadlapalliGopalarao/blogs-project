
import { ref } from 'vue'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface Notification {
  id: number
  message: string
  type: NotificationType
}

const notifications = ref<Notification[]>([])

let notificationId = 0

export function useNotification() {
  function showNotification(
    message: string,
    type: NotificationType = 'success',
  ) {
    const id = ++notificationId

    notifications.value.push({
      id,
      message,
      type,
    })

    setTimeout(() => {
      removeNotification(id)
    }, 4000)
  }

  function removeNotification(id: number) {
    notifications.value = notifications.value.filter(
      (notification) => notification.id !== id,
    )
  }

  function success(message: string) {
    showNotification(message, 'success')
  }

  function error(message: string) {
    showNotification(message, 'error')
  }

  function warning(message: string) {
    showNotification(message, 'warning')
  }

  function info(message: string) {
    showNotification(message, 'info')
  }

  return {
    notifications,
    showNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
  }
}
