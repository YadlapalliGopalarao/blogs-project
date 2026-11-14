
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import { useBlogStore } from '../../modules/blog/stores/blogStore'
import { formatDate } from '../../utils/formatDate'
import BaseCard from '../../components/ui/BaseCard.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const blogStore = useBlogStore()

const {
  publicBlogs,
  loading,
  error,
  pagination,
  searchQuery,
} = storeToRefs(blogStore)

const searchInput = ref('')

onMounted(async () => {
  searchInput.value = searchQuery.value

  try {
    await blogStore.fetchPublicBlogs(1, searchQuery.value)
  } catch {
    // Error is handled by the store.
  }
})

// Search blogs
async function searchBlogs() {
  try {
    await blogStore.fetchPublicBlogs(
      1,
      searchInput.value.trim(),
    )
  } catch {
    // Error is handled by the store.
  }
}

// Clear search
async function clearSearch() {
  searchInput.value = ''

  try {
    await blogStore.fetchPublicBlogs(1, '')
  } catch {
    // Error is handled by the store.
  }
}

// Change pagination page
async function changePage(page: number) {
  if (
    !pagination.value ||
    page < 1 ||
    page > pagination.value.last_page ||
    page === pagination.value.current_page
  ) {
    return
  }

  try {
    await blogStore.fetchPublicBlogs(
      page,
      searchQuery.value,
    )
  } catch {
    // Error is handled by the store.
  }
}
</script>

<template>
  <div class="home-page">

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <span class="hero-badge">
            Welcome to BlogSpace
          </span>

          <h1>
            Share Your Ideas.
            <span>Inspire the World.</span>
          </h1>

          <p>
            Discover interesting stories, share your knowledge,
            and connect with people through the power of writing.
          </p>

          <div class="hero-actions">
            <RouterLink to="/register" class="primary-button">
              Start Writing
            </RouterLink>

            <a href="#latest-blogs" class="secondary-button">
              Explore Blogs
            </a>
          </div>
        </div>

        <div class="hero-decoration">
          <div class="decoration-card">
            <span class="decoration-icon">✍️</span>
            <h3>Your Story Matters</h3>
            <p>Write. Share. Inspire.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Introduction -->
    <section class="intro-section">
      <div class="section-heading">
        <span>ABOUT BLOGSPACE</span>
        <h2>A Community Built Around Ideas</h2>
        <p>
          Whether you are a beginner or an experienced writer,
          BlogSpace gives you a place to express your thoughts.
        </p>
      </div>
    </section>

    <!-- Latest Blogs -->
    <section id="latest-blogs" class="blogs-section">
      <div class="section-heading">
        <span>DISCOVER</span>
        <h2>Latest Stories</h2>
        <p>Explore the latest articles published by our community.</p>
      </div>

      <!-- Search Box -->
      <div class="blog-search">
        <form class="search-form" @submit.prevent="searchBlogs">
          <input
            v-model="searchInput"
            type="search"
            placeholder="Search blogs by title or description..."
            aria-label="Search blogs"
          />

          <button type="submit" :disabled="loading">
            Search
          </button>

          <button
            v-if="searchQuery"
            type="button"
            class="clear-search"
            :disabled="loading"
            @click="clearSearch"
          >
            Clear
          </button>
        </form>
      </div>

      <LoadingSpinner
        v-if="loading"
        size="large"
        label="Loading blogs..."
      />

      <div v-else-if="error" class="empty-state">
        <h3>Unable to load blogs</h3>
        <p>{{ error }}</p>

        <button @click="blogStore.fetchPublicBlogs()">
          Try Again
        </button>
      </div>

      <template v-else-if="publicBlogs.length">
        <div class="blog-grid">
          <BaseCard
            v-for="blog in publicBlogs"
            :key="blog.postid"
            hoverable
            padding="small"
          >
            <article class="blog-card">

              <div class="blog-image-placeholder">
                <img
                  v-if="blog.image_url"
                  :src="blog.image_url"
                  :alt="blog.title"
                  loading="lazy"
                />

                <span v-else>📝</span>
              </div>

              <div class="blog-card-content">
                <p class="blog-date">
                  {{ formatDate(blog.created_at) }}
                </p>

                <h3>{{ blog.title }}</h3>

                <p class="blog-description">
                  {{ blog.shortdesc }}
                </p>

                <RouterLink
                  :to="`/blogs/${blog.postid}`"
                  class="read-more"
                >
                  Read More →
                </RouterLink>
              </div>

            </article>
          </BaseCard>
        </div>

        <!-- Pagination -->
        <div
          v-if="pagination && pagination.last_page > 1"
          class="pagination"
        >
          <button
            class="pagination-button"
            :disabled="pagination.current_page === 1 || loading"
            @click="changePage(pagination.current_page - 1)"
          >
            ← Previous
          </button>

          <button
            v-for="page in pagination.last_page"
            :key="page"
            class="pagination-button page-number"
            :class="{ active: pagination.current_page === page }"
            :disabled="loading"
            @click="changePage(page)"
          >
            {{ page }}
          </button>

          <button
            class="pagination-button"
            :disabled="pagination.current_page === pagination.last_page || loading"
            @click="changePage(pagination.current_page + 1)"
          >
            Next →
          </button>
        </div>

        <p v-if="pagination" class="pagination-info">
          Showing {{ publicBlogs.length }} of {{ pagination.total }} blogs
        </p>
      </template>

      <!-- Empty Search Results -->
      <div v-else class="empty-state">
        <span>📚</span>

        <h3>
          {{ searchQuery ? 'No matching blogs found' : 'No blogs published yet' }}
        </h3>

        <p v-if="searchQuery">
          No blogs matched "{{ searchQuery }}". Try another keyword.
        </p>

        <p v-else>
          Be the first person to share a story!
        </p>

        <button
          v-if="searchQuery"
          @click="clearSearch"
        >
          Clear Search
        </button>

        <RouterLink
          v-else
          to="/register"
        >
          Create Your Account
        </RouterLink>
      </div>
    </section>

    <!-- Call To Action -->
    <section class="cta-section">
      <h2>Have a Story to Share?</h2>

      <p>
        Join BlogSpace and start publishing your ideas today.
      </p>

      <RouterLink to="/register">
        Join BlogSpace
      </RouterLink>
    </section>

  </div>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(120deg, #eef2ff, #f5f3ff);
  padding: 100px 24px;
}

.hero-container {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  align-items: center;
  gap: 50px;
}

.hero-badge {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 30px;
  background: #e0e7ff;
  color: #4338ca;
  font-size: 13px;
  font-weight: 700;
}

.hero-content h1 {
  margin-top: 24px;
  color: #111827;
  font-size: clamp(38px, 5vw, 60px);
  font-weight: 800;
  line-height: 1.15;
}

.hero-content h1 span {
  display: block;
  color: #4f46e5;
}

.hero-content > p {
  max-width: 550px;
  margin-top: 22px;
  color: #6b7280;
  font-size: 17px;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 30px;
}

.primary-button,
.secondary-button {
  padding: 13px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.primary-button {
  background: #4f46e5;
  color: white;
}

.primary-button:hover {
  background: #4338ca;
}

.secondary-button {
  border: 1px solid #c7d2fe;
  color: #4338ca;
  background: white;
}

.hero-decoration {
  display: flex;
  justify-content: center;
}

.decoration-card {
  width: 280px;
  padding: 45px 25px;
  text-align: center;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(79, 70, 229, 0.12);
  transform: rotate(3deg);
}

.decoration-icon {
  font-size: 65px;
}

.decoration-card h3 {
  margin-top: 20px;
  color: #111827;
  font-size: 21px;
}

.decoration-card p {
  margin-top: 10px;
  color: #6b7280;
}

.intro-section,
.blogs-section {
  max-width: 1200px;
  margin: auto;
  padding: 50px 24px;
}

.section-heading {
  max-width: 650px;
  margin: 0 auto 40px;
  text-align: center;
}

.section-heading > span {
  color: #4f46e5;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
}

.section-heading h2 {
  margin-top: 12px;
  color: #111827;
  font-size: 34px;
}

.section-heading p {
  margin-top: 12px;
  color: #6b7280;
  line-height: 1.7;
}

/* Search */
.blog-search {
  max-width: 650px;
  margin: 0 auto 35px;
}

.search-form {
  display: flex;
  gap: 10px;
}

.search-form input {
  flex: 1;
  min-width: 0;
  padding: 13px 15px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font: inherit;
  outline: none;
}

.search-form input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.search-form button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.search-form button:hover:not(:disabled) {
  background: #4338ca;
}

.search-form button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.search-form .clear-search {
  background: #e5e7eb;
  color: #374151;
}

.search-form .clear-search:hover:not(:disabled) {
  background: #d1d5db;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.blog-card {
  overflow: hidden;
}

.blog-image-placeholder {
  height: 190px;
  display: grid;
  place-items: center;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 55px;
  border-radius: 9px;
  overflow: hidden;
}

.blog-image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.blog-card-content {
  padding: 16px 8px 8px;
}

.blog-date {
  color: #9ca3af;
  font-size: 12px;
}

.blog-card-content h3 {
  margin-top: 10px;
  color: #111827;
  font-size: 19px;
}

.blog-description {
  display: -webkit-box;
  margin-top: 10px;
  overflow: hidden;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.7;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
   line-clamp: 2;
}

.read-more {
  display: inline-block;
  margin-top: 18px;
  color: #4f46e5;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 40px;
}

.pagination-button {
  min-width: 40px;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.pagination-button:hover:not(:disabled) {
  border-color: #4f46e5;
  color: #4f46e5;
}

.pagination-button.active {
  background: #4f46e5;
  border-color: #4f46e5;
  color: white;
}

.pagination-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.pagination-info {
  margin-top: 16px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
}

.empty-state {
  padding: 45px 20px;
  text-align: center;
  color: #6b7280;
}

.empty-state > span {
  font-size: 45px;
}

.empty-state h3 {
  margin-top: 12px;
  color: #111827;
}

.empty-state p {
  margin-top: 8px;
}

.empty-state button,
.empty-state a {
  display: inline-block;
  margin-top: 18px;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.cta-section {
  padding: 70px 24px;
  text-align: center;
  background: #111827;
  color: white;
}

.cta-section h2 {
  font-size: 32px;
}

.cta-section p {
  margin-top: 12px;
  color: #d1d5db;
}

.cta-section a {
  display: inline-block;
  margin-top: 25px;
  padding: 13px 22px;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 850px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content > p {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .blog-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 550px) {
  .hero-section {
    padding: 65px 20px;
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }

  .section-heading h2 {
    font-size: 27px;
  }

  .pagination-button {
    padding: 9px 11px;
  }

  .search-form {
    flex-wrap: wrap;
  }

  .search-form input {
    flex-basis: 100%;
  }

  .search-form button {
    flex: 1;
  }
}
</style>
