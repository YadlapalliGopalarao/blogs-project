
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useBlogStore } from '../../modules/blog/stores/blogStore'
import { useApiError } from '../../composables/useApiError'
import { useNotification } from '../../composables/useNotification'

import BaseInput from '../../components/ui/BaseInput.vue'
import BaseTextarea from '../../components/ui/BaseTextarea.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseImageUpload from '../../components/ui/BaseImageUpload.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()

const blogStore = useBlogStore()
const notification = useNotification()

const { errorMessage, handleError, clearErrors, getFieldError } = useApiError()

const image = ref<File | null>(null)
const existingImage = ref<string | null>(null)
const keywordInput = ref('')
const isSubmitting = ref(false)

const form = reactive({
  title: '',
  shortdesc: '',
  longpara: '',
  keywords: [] as string[],
})

const blogId = ref(Number(route.params.id))

async function loadBlog() {
  const id = Number(route.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    notification.error('Invalid blog ID.')
    await router.push('/my-blogs')
    return
  }

  blogId.value = id
  blogStore.clearCurrentBlog()
  image.value = null
  existingImage.value = null
  keywordInput.value = ''
  clearErrors()

  try {
    const blog = await blogStore.fetchBlogById(id)

    if (!blog) {
      notification.error('Blog not found.')
      await router.push('/my-blogs')
      return
    }

    form.title = blog.title
    form.shortdesc = blog.shortdesc
    form.longpara = blog.longpara || ''
    form.keywords = Array.isArray(blog.keywords)
      ? [...blog.keywords]
      : []

    existingImage.value = blog.image_url || null
  } catch {
    notification.error('Unable to load the blog.')
  }
}

// Add keyword
function addKeyword() {
  if (isSubmitting.value) return

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
  if (isSubmitting.value) return

  form.keywords = form.keywords.filter(
    (item) => item !== keyword,
  )
}

// Update blog
async function handleUpdateBlog() {
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
    await blogStore.editBlog(blogId.value, {
      title,
      shortdesc,
      longpara,
      keywords: form.keywords,
      image: image.value,
    })

    notification.success('Blog updated successfully.')

    await router.push('/my-blogs')
  } catch (error) {
    handleError(error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(loadBlog)

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      loadBlog()
    }
  },
)
</script>

<template>
  <div class="edit-blog-page">

    <div class="page-header">
      <span class="page-label">CONTENT MANAGEMENT</span>
      <h1>Edit Blog</h1>
      <p>Make changes to your existing blog post.</p>
    </div>

    <LoadingSpinner
      v-if="blogStore.loading && !blogStore.currentBlog"
      size="large"
      label="Loading blog details..."
    />

    <form
      v-else-if="blogStore.currentBlog"
      class="blog-form"
      @submit.prevent="handleUpdateBlog"
    >

      <div v-if="errorMessage" class="error-alert">
        {{ errorMessage }}
      </div>

      <!-- Blog Information -->
      <section class="form-section">
        <h2>Blog Information</h2>

        <BaseInput
          v-model="form.title"
          label="Blog Title"
          placeholder="Enter blog title"
          required
          :error="getFieldError('title')"
        />

        <BaseTextarea
          v-model="form.shortdesc"
          label="Short Description"
          placeholder="Enter a short description"
          :rows="3"
          :maxlength="255"
          required
          :error="getFieldError('shortdesc')"
        />
      </section>

      <!-- Blog Content -->
      <section class="form-section">
        <h2>Blog Content</h2>

        <BaseTextarea
          v-model="form.longpara"
          label="Full Content"
          placeholder="Write your blog content..."
          :rows="12"
          required
          :error="getFieldError('longpara')"
        />
      </section>

      <!-- Keywords -->
      <section class="form-section">
        <h2>Keywords</h2>

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

      <!-- Image -->
      <section class="form-section">
        <h2>Featured Image</h2>

        <BaseImageUpload
          v-model="image"
          :existing-image="existingImage"
        />

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
          {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
        </BaseButton>
      </div>

    </form>

    <div v-else-if="!blogStore.loading" class="empty-state">
      <h2>Blog unavailable</h2>
      <p>We couldn't find this blog.</p>

      <BaseButton @click="router.push('/my-blogs')">
        Back to My Blogs
      </BaseButton>
    </div>

  </div>
</template>

<style scoped>
.edit-blog-page {
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
}

.blog-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 25px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
}

.form-section h2 {
  color: #111827;
  font-size: 18px;
  font-weight: 800;
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
  padding: 13px 15px;
  border: 1px solid #fecaca;
  border-radius: 8px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-bottom: 30px;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #6b7280;
}

.empty-state h2 {
  color: #111827;
}

.empty-state p {
  margin: 12px 0 20px;
}

@media (max-width: 600px) {
  .form-section {
    padding: 18px;
  }

  .form-actions {
    flex-direction: column-reverse;
  }
}
</style>
