
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useBlogStore } from '../../modules/blog/stores/blogStore'
import { useApiError } from '../../composables/useApiError'
import { useNotification } from '../../composables/useNotification'

import BaseInput from '../../components/ui/BaseInput.vue'
import BaseTextarea from '../../components/ui/BaseTextarea.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseImageUpload from '../../components/ui/BaseImageUpload.vue'

const router = useRouter()
const blogStore = useBlogStore()

const {
  errorMessage,
  handleError,
  clearErrors,
  getFieldError,
} = useApiError()

const notification = useNotification()

const image = ref<File | null>(null)
const keywordInput = ref('')
const isSubmitting = ref(false)

const form = reactive({
  title: '',
  shortdesc: '',
  longpara: '',
  keywords: [] as string[],
})

// Add keyword
function addKeyword() {
  const keyword = keywordInput.value.trim()

  if (!keyword) {
    notification.warning('Please enter a keyword.')
    return
  }

  const alreadyExists = form.keywords.some(
    (item) => item.toLowerCase() === keyword.toLowerCase(),
  )

  if (alreadyExists) {
    notification.warning('This keyword has already been added.')
    return
  }

  form.keywords.push(keyword)
  keywordInput.value = ''
}

// Remove keyword
function removeKeyword(keyword: string) {
  form.keywords = form.keywords.filter(
    (item) => item !== keyword,
  )
}

// Create blog
async function handleCreateBlog() {
  if (isSubmitting.value) return

  clearErrors()

  const title = form.title.trim()
  const shortdesc = form.shortdesc.trim()
  const longpara = form.longpara.trim()

  if (!title || !shortdesc || !longpara) {
    notification.warning('Please complete all required fields.')
    return
  }

  if (title.length > 255) {
    notification.warning('Blog title cannot exceed 255 characters.')
    return
  }

  if (shortdesc.length > 255) {
    notification.warning('Short description cannot exceed 255 characters.')
    return
  }

  isSubmitting.value = true

  try {
    await blogStore.addBlog({
      title,
      shortdesc,
      longpara,
      keywords: form.keywords,
      image: image.value,
    })

    notification.success('Your blog has been published successfully.')

    await router.push('/my-blogs')
  } catch (error) {
    handleError(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="create-blog-page">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <span class="page-label">CONTENT CREATION</span>
        <h1>Create New Blog</h1>
        <p>Share your thoughts and ideas with the BlogSpace community.</p>
      </div>
    </div>

    <form class="blog-form" @submit.prevent="handleCreateBlog">

      <!-- API Error -->
      <div v-if="errorMessage" class="error-alert">
        <strong>Something went wrong</strong>
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Blog Information -->
      <section class="form-section">
        <h2>Blog Information</h2>

        <p class="section-description">
          Start with a clear title and an engaging introduction.
        </p>

        <BaseInput
          v-model="form.title"
          label="Blog Title"
          placeholder="Enter an interesting blog title"
          required
          :error="getFieldError('title')"
        />

        <BaseTextarea
          v-model="form.shortdesc"
          label="Short Description"
          placeholder="Write a short introduction about your blog..."
          :rows="3"
          :maxlength="255"
          required
          :error="getFieldError('shortdesc')"
        />
      </section>

      <!-- Full Content -->
      <section class="form-section">
        <h2>Blog Content</h2>

        <p class="section-description">
          Write the complete content of your article.
        </p>

        <BaseTextarea
          v-model="form.longpara"
          label="Full Content"
          placeholder="Start writing your story here..."
          :rows="12"
          required
          :error="getFieldError('longpara')"
        />
      </section>

      <!-- Keywords -->
      <section class="form-section">
        <h2>Keywords</h2>

        <p class="section-description">
          Add relevant keywords to help readers discover your blog.
        </p>

        <div class="keyword-input">
          <input
            v-model="keywordInput"
            type="text"
            placeholder="Enter a keyword"
            :disabled="isSubmitting"
            @keydown.enter.prevent="addKeyword"
          />

          <BaseButton
            type="button"
            variant="outline"
            :disabled="isSubmitting"
            @click="addKeyword"
          >
            Add
          </BaseButton>
        </div>

        <div v-if="form.keywords.length" class="keyword-list">
          <span
            v-for="keyword in form.keywords"
            :key="keyword"
            class="keyword"
          >
            {{ keyword }}

            <button
              type="button"
              aria-label="Remove keyword"
              :disabled="isSubmitting"
              @click="removeKeyword(keyword)"
            >
              ×
            </button>
          </span>
        </div>

        <p v-if="getFieldError('keywords')" class="field-error">
          {{ getFieldError('keywords') }}
        </p>
      </section>

      <!-- Featured Image -->
      <section class="form-section">
        <h2>Featured Image</h2>

        <p class="section-description">
          Upload an image to make your blog more attractive.
        </p>

        <BaseImageUpload v-model="image" />

        <p v-if="getFieldError('image')" class="field-error">
          {{ getFieldError('image') }}
        </p>
      </section>

      <!-- Actions -->
      <div class="form-actions">
        <BaseButton
          type="button"
          variant="outline"
          :disabled="isSubmitting"
          @click="router.push('/my-blogs')"
        >
          Cancel
        </BaseButton>

        <BaseButton
          type="submit"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Publishing...' : 'Publish Blog' }}
        </BaseButton>
      </div>

    </form>
  </div>
</template>

<style scoped>
.create-blog-page {
  max-width: 950px;
  margin: auto;
}

.page-header {
  margin-bottom: 28px;
}

.page-label {
  color: #4f46e5;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
}

.page-header h1 {
  margin-top: 9px;
  color: #111827;
  font-size: 30px;
  font-weight: 800;
}

.page-header p {
  margin-top: 8px;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.blog-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.form-section {
  padding: 25px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section h2 {
  color: #111827;
  font-size: 18px;
  font-weight: 800;
}

.section-description {
  margin-top: -13px;
  color: #6b7280;
  font-size: 13px;
  line-height: 1.6;
}

.keyword-input {
  display: flex;
  gap: 10px;
}

.keyword-input input {
  flex: 1;
  min-width: 0;
  padding: 11px 13px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
}

.keyword-input input:focus {
  border-color: #4f46e5;
}

.keyword-input input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.keyword-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.keyword {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border-radius: 20px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 13px;
  font-weight: 600;
}

.keyword button {
  border: none;
  background: transparent;
  color: #4338ca;
  font-size: 17px;
  cursor: pointer;
}

.keyword button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.field-error {
  color: #dc2626;
  font-size: 13px;
}

.error-alert {
  padding: 14px 16px;
  border: 1px solid #fecaca;
  border-radius: 8px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 14px;
}

.error-alert p {
  margin-top: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-bottom: 30px;
}

@media (max-width: 600px) {
  .form-section {
    padding: 18px;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .keyword-input {
    align-items: stretch;
  }
}
</style>
