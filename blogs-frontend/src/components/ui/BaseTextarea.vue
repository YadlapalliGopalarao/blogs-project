
<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    placeholder?: string
    rows?: number
    error?: string
    required?: boolean
    disabled?: boolean
    maxlength?: number
    name?: string
  }>(),
  {
    label: '',
    placeholder: '',
    rows: 4,
    error: '',
    required: false,
    disabled: false,
    maxlength: undefined,
    name: '',
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
      class="textarea-label"
    >
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>

    <textarea
      :id="name || undefined"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :required="required"
      :disabled="disabled"
      :maxlength="maxlength"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="error && name ? `${name}-error` : undefined"
      :class="['base-textarea', { 'textarea-error': error }]"
      @input="
        emit(
          'update:modelValue',
          ($event.target as HTMLTextAreaElement).value,
        )
      "
    ></textarea>

    <span
      v-if="error"
      :id="name ? `${name}-error` : undefined"
      class="error-message"
      role="alert"
    >
      {{ error }}
    </span>

    <span v-if="maxlength" class="character-count">
      {{ modelValue.length }} / {{ maxlength }} characters
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

.textarea-label {
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}

.required-mark {
  color: #dc2626;
}

.base-textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #111827;
  background: #fff;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.base-textarea:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
}

.base-textarea:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.textarea-error {
  border-color: #dc2626;
}

.error-message {
  color: #dc2626;
  font-size: 12px;
}

.character-count {
  color: #6b7280;
  font-size: 12px;
  text-align: right;
}
</style>
