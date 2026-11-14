
<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { validateImage } from '../../utils/validators'

const props = defineProps<{
  modelValue: File | null
  existingImage?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [file: File | null]
  'remove-existing': []
}>()

const previewUrl = ref<string | null>(null)
const errorMessage = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const existingImageRemoved = ref(false)

function updatePreview(file: File | null) {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }

  if (file) {
    previewUrl.value = URL.createObjectURL(file)
  }
}

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] || null

  errorMessage.value = ''

  if (!file) return

  const validationError = validateImage(file)

  if (validationError) {
    errorMessage.value = validationError
    input.value = ''
    emit('update:modelValue', null)
    updatePreview(null)
    return
  }

  existingImageRemoved.value = false
  emit('update:modelValue', file)
  updatePreview(file)
}

function removeImage() {
  emit('update:modelValue', null)
  updatePreview(null)
  errorMessage.value = ''

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function removeExistingImage() {
  existingImageRemoved.value = true
  emit('remove-existing')
}

watch(
  () => props.modelValue,
  (file) => {
    if (!file) updatePreview(null)
  },
)

watch(
  () => props.existingImage,
  () => {
    existingImageRemoved.value = false
  },
)

onBeforeUnmount(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})
</script>

<template>
  <div class="upload-container">
    <label class="upload-label">
      Blog Image
    </label>

    <div class="upload-box">
      <input
        id="blog-image-input"
        ref="fileInput"
        type="file"
        accept=".png,.jpg,.jpeg,image/png,image/jpeg"
        @change="handleFileChange"
      />

      <label for="blog-image-input" class="upload-button">
        Choose Image
      </label>

      <p class="upload-hint">
        PNG, JPG or JPEG. Maximum size: 5 MB.
      </p>
    </div>

    <div
      v-if="previewUrl || (existingImage && !existingImageRemoved)"
      class="image-preview"
    >
      <img
        :src="previewUrl || existingImage || ''"
        alt="Blog image preview"
      />

      <button
        type="button"
        class="remove-button"
        @click="previewUrl ? removeImage() : removeExistingImage()"
      >
        Remove Image
      </button>
    </div>

    <p v-if="errorMessage" class="error-message" role="alert">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.upload-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.upload-box {
  padding: 24px;
  text-align: center;
  border: 2px dashed #c7d2fe;
  border-radius: 10px;
  background: #f8faff;
}

.upload-box input {
  display: none;
}

.upload-button {
  display: inline-block;
  padding: 10px 18px;
  background: #4f46e5;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.upload-button:hover {
  background: #4338ca;
}

.upload-hint {
  margin-top: 10px;
  color: #6b7280;
  font-size: 12px;
}

.image-preview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.image-preview img {
  width: 100%;
  max-width: 320px;
  max-height: 220px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.remove-button {
  padding: 7px 12px;
  border: none;
  border-radius: 6px;
  background: #fee2e2;
  color: #b91c1c;
  cursor: pointer;
}

.remove-button:hover {
  background: #fecaca;
}

.error-message {
  color: #dc2626;
  font-size: 13px;
}
</style>
