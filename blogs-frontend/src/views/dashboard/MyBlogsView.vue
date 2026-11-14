
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import { useAuthStore } from '../../modules/auth/stores/authStore'
import { useBlogStore } from '../../modules/blog/stores/blogStore'
import { useNotification } from '../../composables/useNotification'
import { formatDate } from '../../utils/formatDate'

import BaseCard from '../../components/ui/BaseCard.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const authStore = useAuthStore()
const blogStore = useBlogStore()
const notification = useNotification()

const { user } = storeToRefs(authStore)
const { myBlogs, loading, error } = storeToRefs(blogStore)

const deletingBlogId = ref<number | null>(null)

async function loadBlogs() {
  try {
    await blogStore.fetchMyBlogs()
  } catch {
    // Error is handled by the store.
  }
}

async function handleDelete(id: number) {
  if (deletingBlogId.value !== null) return

  const confirmed = window.confirm(
    'Are you sure you want to delete this blog? This action cannot be undone.',
  )

  if (!confirmed) return

  deletingBlogId.value = id

  try {
    await blogStore.removeBlog(id)
    notification.success('Blog deleted successfully.')
  } catch {
    notification.error('Unable to delete this blog.')
  } finally {
    deletingBlogId.value = null
  }
}

onMounted(() => {
  loadBlogs()
})
</script>

<template>
  <div class="dashboard-page">

    <!-- Welcome Section -->
    <section class="welcome-section">
      <div>
        <span class="welcome-label">YOUR WORKSPACE</span>

        <h1>
          Welcome back, {{ user?.name || 'Writer' }}!
        </h1>

        <p>
          Manage your stories and keep sharing your ideas with the world.
        </p>
      </div>

      <RouterLink to="/blogs/create" class="create-button">
        + Create New Blog
      </RouterLink>
    </section>

    <!-- Statistics -->
    <section class="stats-grid">

      <BaseCard padding="medium">
        <div class="stat-card">
          <div class="stat-icon purple">📝</div>
          <div>
            <p>Total Blogs</p>
            <h2>{{ myBlogs.length }}</h2>
          </div>
        </div>
      </BaseCard>

      <BaseCard padding="medium">
        <div class="stat-card">
          <div class="stat-icon blue">👤</div>
          <div>
            <p>Account</p>
            <h2 class="account-status">Active</h2>
          </div>
        </div>
      </BaseCard>

    </section>

    <!-- Quick Actions -->
    <section class="quick-actions">
      <h2>Quick Actions</h2>

      <div class="actions-grid">
        <RouterLink to="/blogs/create" class="action-card">
          <span>✍️</span>
          <div>
            <h3>Write a Blog</h3>
            <p>Publish a new story.</p>
          </div>
          <span class="action-arrow">→</span>
        </RouterLink>

        <RouterLink to="/my-blogs" class="action-card">
          <span>📚</span>
          <div>
            <h3>Manage Blogs</h3>
            <p>View and manage your posts.</p>
          </div>
          <span class="action-arrow">→</span>
        </RouterLink>

        <RouterLink to="/profile" class="action-card">
          <span>⚙️</span>
          <div>
            <h3>My Profile</h3>
            <p>View your account details.</p>
          </div>
          <span class="action-arrow">→</span>
        </RouterLink>
      </div>
    </section>

    <!-- Recent Blogs -->
    <section class="recent-section">

      <div class="section-header">
        <div>
          <h2>My Recent Blogs</h2>
          <p>Your latest published stories.</p>
        </div>

        <RouterLink to="/my-blogs" class="view-all">
          View All →
        </RouterLink>
      </div>

      <LoadingSpinner
        v-if="loading"
        label="Loading your blogs..."
      />

      <div v-else-if="error" class="empty-state">
        <p>{{ error }}</p>
        <button @click="loadBlogs">
          Try Again
        </button>
      </div>

      <div v-else-if="myBlogs.length" class="recent-blog-list">

        <BaseCard
          v-for="blog in myBlogs.slice(0, 5)"
          :key="blog.postid"
          padding="medium"
        >
          <article class="recent-blog">

            <!-- Blog Image -->
            <div class="recent-blog-image">
              <img
                v-if="blog.image_url"
                :src="blog.image_url"
                :alt="blog.title"
                loading="lazy"
              />

              <span v-else>📝</span>
            </div>

            <!-- Blog Information -->
            <div class="recent-blog-info">
              <span class="blog-date">
                {{ formatDate(blog.created_at) }}
              </span>

              <h3>{{ blog.title }}</h3>

              <p>{{ blog.shortdesc }}</p>

              <!-- Actions -->
              <div class="blog-actions">

                <RouterLink
                  :to="`/blogs/${blog.postid}`"
                  class="view-link"
                >
                  View
                </RouterLink>

                <RouterLink
                  :to="`/blogs/${blog.postid}/edit`"
                  class="edit-link"
                >
                  Edit
                </RouterLink>

                <button
                  type="button"
                  class="delete-button"
                  :disabled="deletingBlogId !== null"
                  @click="handleDelete(blog.postid)"
                >
                  {{
                    deletingBlogId === blog.postid
                      ? 'Deleting...'
                      : 'Delete'
                  }}
                </button>

              </div>
            </div>

          </article>
        </BaseCard>

      </div>

      <div v-else class="empty-state">
        <span>📝</span>
        <h3>You haven't created any blogs yet.</h3>
        <p>Start sharing your first story today.</p>

        <RouterLink to="/blogs/create">
          Create Your First Blog
        </RouterLink>
      </div>

    </section>

  </div>
</template>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 35px;
}

.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.welcome-label {
  color: #4f46e5;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
}

.welcome-section h1 {
  margin-top: 10px;
  color: #111827;
  font-size: 30px;
  font-weight: 800;
}

.welcome-section p {
  margin-top: 8px;
  color: #6b7280;
  line-height: 1.6;
}

.create-button {
  padding: 13px 20px;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.create-button:hover {
  background: #4338ca;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 18px;
}

.stat-icon {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-size: 24px;
}

.purple {
  background: #ede9fe;
}

.blue {
  background: #dbeafe;
}

.stat-card p {
  color: #6b7280;
  font-size: 13px;
}

.stat-card h2 {
  margin-top: 5px;
  color: #111827;
  font-size: 25px;
}

.account-status {
  color: #059669 !important;
  font-size: 20px !important;
}

.quick-actions h2,
.recent-section h2 {
  color: #111827;
  font-size: 21px;
  font-weight: 800;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
  margin-top: 18px;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: inherit;
  text-decoration: none;
  transition: 0.2s ease;
}

.action-card:hover {
  border-color: #a5b4fc;
  transform: translateY(-3px);
}

.action-card > span:first-child {
  font-size: 27px;
}

.action-card h3 {
  color: #111827;
  font-size: 14px;
}

.action-card p {
  margin-top: 5px;
  color: #6b7280;
  font-size: 12px;
}

.action-arrow {
  margin-left: auto;
  color: #4f46e5;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 18px;
}

.section-header p {
  margin-top: 6px;
  color: #6b7280;
  font-size: 13px;
}

.view-all {
  color: #4f46e5;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.recent-blog-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recent-blog {
  display: flex;
  align-items: center;
  gap: 22px;
}

.recent-blog-image {
  width: 145px;
  min-width: 145px;
  height: 115px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 9px;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 35px;
}

.recent-blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recent-blog-info {
  flex: 1;
  min-width: 0;
}

.blog-date {
  color: #9ca3af;
  font-size: 12px;
}

.recent-blog-info h3 {
  margin-top: 7px;
  color: #111827;
  font-size: 17px;
}

.recent-blog-info > p {
  margin-top: 7px;
  color: #6b7280;
  font-size: 13px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.blog-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 14px;
}

.blog-actions a,
.delete-button {
  padding: 0;
  border: none;
  background: none;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.view-link {
  color: #6b7280;
}

.edit-link {
  color: #4f46e5;
}

.delete-button {
  color: #dc2626;
}

.delete-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-state {
  padding: 35px 20px;
  border: 1px dashed #d1d5db;
  border-radius: 12px;
  text-align: center;
  color: #6b7280;
}

.empty-state > span {
  font-size: 35px;
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
  margin-top: 16px;
  padding: 10px 16px;
  border: none;
  border-radius: 7px;
  background: #4f46e5;
  color: white;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 900px) {
  .actions-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .welcome-section h1 {
    font-size: 24px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .recent-blog {
    align-items: flex-start;
    flex-direction: column;
  }

  .recent-blog-image {
    width: 100%;
    height: 180px;
  }
}
</style>
