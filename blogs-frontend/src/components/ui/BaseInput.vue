
<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    type?: string
    placeholder?: string
    error?: string
    name?: string
    required?: boolean
    disabled?: boolean
  }>(),
  {
    label: '',
    type: 'text',
    placeholder: '',
    error: '',
    name: '',
    required: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="form-group">
    <label
      v-if="label"
      :for="name || undefined"
      class="input-label"
    >
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>

    <input
      :id="name || undefined"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="error && name ? `${name}-error` : undefined"
      :class="['base-input', { 'input-error': error }]"
      @input="
        emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value,
        )
      "
    />

    <span
      v-if="error"
      :id="name ? `${name}-error` : undefined"
      class="input-error-message"
      role="alert"
    >
      {{ error }}
    </span>
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
}

.input-label {
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}

.required-mark {
  color: #dc2626;
}

.base-input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  color: #111827;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.base-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
}

.base-input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.input-error {
  border-color: #dc2626;
}

.input-error-message {
  color: #dc2626;
  font-size: 12px;
}
</style>
