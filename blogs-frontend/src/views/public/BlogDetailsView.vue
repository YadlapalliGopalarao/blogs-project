
<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, RouterLink } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

import { useBlogStore } from '../../modules/blog/stores/blogStore'
import { formatDate } from '../../utils/formatDate'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const route = useRoute()
const blogStore = useBlogStore()

const { currentBlog, loading, error } = storeToRefs(blogStore)

// Convert Markdown content into safe HTML
const renderedContent = computed(() => {
  const content = currentBlog.value?.longpara ?? ''

  const html = marked.parse(content, { async: false })

  return DOMPurify.sanitize(html)
})

async function loadBlog() {
  const id = Number(route.params.id)

  blogStore.clearCurrentBlog()

  if (!Number.isInteger(id) || id <= 0) {
    return
  }

  try {
    await blogStore.fetchPublicBlogById(id)
  } catch {
    // Error is handled by the store.
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
  <div class="blog-details-page">

    <!-- Loading -->
    <LoadingSpinner
      v-if="loading"
      size="large"
      label="Loading blog..."
    />

    <!-- Error -->
    <div v-else-if="error" class="message-state">
      <div class="message-icon">!</div>
      <h2>Unable to load this blog</h2>
      <p>{{ error }}</p>
      <RouterLink to="/">Back to Home</RouterLink>
    </div>

    <!-- Blog Details -->
    <article v-else-if="currentBlog" class="article-container">

      <RouterLink to="/" class="back-link">
        ← Back to all blogs
      </RouterLink>

      <!-- Article Header -->
      <header class="article-header">
        <p class="article-date">
          Published {{ formatDate(currentBlog.created_at) }}
        </p>

        <h1>{{ currentBlog.title }}</h1>

        <p class="article-description">
          {{ currentBlog.shortdesc }}
        </p>

        <div v-if="currentBlog.author" class="author">
          <div class="author-avatar">
            {{ currentBlog.author.charAt(0).toUpperCase() }}
          </div>

          <span>
            Written by <strong>{{ currentBlog.author }}</strong>
          </span>
        </div>
      </header>

      <!-- Featured Image -->
      <div v-if="currentBlog.image_url" class="article-image">
        <img
          :src="currentBlog.image_url"
          :alt="currentBlog.title"
          loading="lazy"
        />
      </div>

      <!-- Article Content -->
      <div
        class="article-content"
        v-html="renderedContent"
      ></div>

      <!-- Keywords -->
      <div
        v-if="currentBlog.keywords?.length"
        class="article-keywords"
      >
        <span
          v-for="keyword in currentBlog.keywords"
          :key="keyword"
          class="keyword"
        >
          #{{ keyword }}
        </span>
      </div>

    </article>

    <!-- Not Found / Invalid ID -->
    <div v-else class="message-state">
      <div class="message-icon">?</div>
      <h2>Blog not found</h2>
      <p>This blog may have been removed or is unavailable.</p>

      <RouterLink to="/">
        Back to Home
      </RouterLink>
    </div>

  </div>
</template>

<style scoped>
.blog-details-page {
  min-height: 70vh;
  padding: 60px 24px 90px;
  background: #ffffff;
}

.article-container {
  max-width: 850px;
  margin: auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 35px;
  color: #4f46e5;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #3730a3;
}

.article-header {
  margin-bottom: 35px;
}

.article-date {
  color: #9ca3af;
  font-size: 14px;
}

.article-header h1 {
  margin-top: 18px;
  color: #111827;
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.2;
  font-weight: 800;
  overflow-wrap: anywhere;
}

.article-description {
  margin-top: 18px;
  color: #6b7280;
  font-size: 18px;
  line-height: 1.8;
}

.author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
  color: #6b7280;
  font-size: 14px;
}

.author strong {
  color: #111827;
}

.author-avatar {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #e0e7ff;
  color: #4338ca;
  font-weight: 800;
}

.article-image {
  width: 100%;
  max-height: 450px;
  overflow: hidden;
  border-radius: 16px;
  background: #eef2ff;
}

.article-image img {
  display: block;
  width: 100%;
  max-height: 450px;
  object-fit: cover;
}

/* Markdown Article Content */
.article-content {
  padding: 35px 0;
  color: #374151;
  font-size: 17px;
  line-height: 1.9;
  overflow-wrap: anywhere;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  color: #111827;
  font-weight: 800;
  line-height: 1.4;
}

.article-content :deep(h1) {
  font-size: 30px;
  margin: 30px 0 15px;
}

.article-content :deep(h2) {
  font-size: 25px;
  margin: 28px 0 12px;
}

.article-content :deep(h3) {
  font-size: 20px;
  margin: 22px 0 10px;
}

.article-content :deep(p) {
  margin: 0 0 18px;
}

.article-content :deep(strong) {
  color: #111827;
  font-weight: 700;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  padding-left: 28px;
  margin: 12px 0 22px;
}

.article-content :deep(li) {
  margin-bottom: 8px;
  padding-left: 4px;
}

.article-content :deep(a) {
  color: #4f46e5;
  text-decoration: underline;
}

.article-content :deep(blockquote) {
  margin: 20px 0;
  padding: 12px 20px;
  border-left: 4px solid #6366f1;
  background: #f5f3ff;
  color: #4b5563;
}

.article-content :deep(code) {
  padding: 3px 6px;
  border-radius: 4px;
  background: #f3f4f6;
  font-size: 0.9em;
}

.article-content :deep(pre) {
  overflow-x: auto;
  padding: 18px;
  border-radius: 10px;
  background: #111827;
  color: #f9fafb;
}

.article-content :deep(pre code) {
  padding: 0;
  background: transparent;
  color: inherit;
}

.article-content :deep(hr) {
  margin: 25px 0;
  border: 0;
  border-top: 1px solid #e5e7eb;
}

.article-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.keyword {
  padding: 7px 13px;
  border-radius: 20px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 13px;
  font-weight: 600;
}

.message-state {
  max-width: 600px;
  margin: 80px auto;
  text-align: center;
  color: #6b7280;
}

.message-icon {
  width: 55px;
  height: 55px;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 25px;
  font-weight: 800;
}

.message-state h2 {
  color: #111827;
}

.message-state p {
  margin-top: 12px;
}

.message-state a {
  display: inline-block;
  margin-top: 20px;
  color: #4f46e5;
  font-weight: 700;
  text-decoration: none;
}

.message-state a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .blog-details-page {
    padding: 35px 18px 60px;
  }

  .article-header h1 {
    font-size: 32px;
  }

  .article-description {
    font-size: 16px;
  }

  .article-content {
    font-size: 16px;
    line-height: 1.8;
  }

  .article-image {
    border-radius: 10px;
  }
}
</style>
