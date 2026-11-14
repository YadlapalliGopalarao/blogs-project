
<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    size?: 'small' | 'medium' | 'large'
  }>(),
  {
    title: 'Dialog',
    size: 'medium',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

function closeModal() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-overlay"
        @click.self="closeModal"
        @keydown.esc="closeModal"
      >
        <section
          class="modal-content"
          :class="`modal-${size}`"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
        >
          <header class="modal-header">
            <h2>{{ title }}</h2>

            <button
              type="button"
              class="close-button"
              aria-label="Close modal"
              @click="closeModal"
            >
              &times;
            </button>
          </header>

          <div class="modal-body">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(3px);
}

.modal-content {
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.modal-small {
  max-width: 400px;
}

.modal-medium {
  max-width: 600px;
}

.modal-large {
  max-width: 850px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 19px;
  color: #111827;
}

.close-button {
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 28px;
  cursor: pointer;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
