
import { defineStore } from 'pinia'

import {
  getPublicBlogs,
  getPublicBlogById,
  getBlogById,
  getMyBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../services/blogService'

import type {
  Blog,
  PublicBlog,
  MyBlog,
  CreateBlogRequest,
  UpdateBlogRequest,
  PaginationMeta,
} from '../../../types/blog'

interface BlogState {
  publicBlogs: PublicBlog[]
  myBlogs: MyBlog[]
  currentBlog: Blog | null

  pagination: PaginationMeta | null
  searchQuery: string

  loading: boolean
  error: string | null
}

export const useBlogStore = defineStore('blog', {
  state: (): BlogState => ({
    publicBlogs: [],
    myBlogs: [],
    currentBlog: null,

    pagination: null,
    searchQuery: '',

    loading: false,
    error: null,
  }),

  actions: {
    // Fetch public blogs with pagination and search
    async fetchPublicBlogs(page = 1, search?: string) {
      this.loading = true
      this.error = null

      const searchTerm = search ?? this.searchQuery
      this.searchQuery = searchTerm

      try {
        const response = await getPublicBlogs(page, searchTerm)

        this.publicBlogs = response.blogs
        this.pagination = response.pagination ?? null

        return response
      } catch (error) {
        this.error = 'Unable to fetch public blogs.'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Fetch a single public blog without authentication
    async fetchPublicBlogById(id: number) {
      this.loading = true
      this.error = null

      try {
        const response = await getPublicBlogById(id)

        this.currentBlog = response.blog

        return response.blog
      } catch (error) {
        this.error = 'Unable to fetch public blog details.'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Fetch a single authenticated user's blog
    async fetchBlogById(id: number) {
      this.loading = true
      this.error = null

      try {
        const response = await getBlogById(id)

        this.currentBlog = response.blog

        return response.blog
      } catch (error) {
        this.error = 'Unable to fetch blog details.'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Fetch user's blogs
    async fetchMyBlogs() {
      this.loading = true
      this.error = null

      try {
        const response = await getMyBlogs()

        this.myBlogs = response.blogs
        this.pagination = null

        return response
      } catch (error) {
        this.error = 'Unable to fetch your blogs.'
        throw error
      } finally {
        this.loading = false
      }
    },

    
    async addBlog(data: CreateBlogRequest) {
      this.loading = true
      this.error = null

      try {
        return await createBlog(data)
      } catch (error) {
        this.error = 'Unable to create blog.'
        throw error
      } finally {
        this.loading = false
      }
    },



    // Update blog
    async editBlog(id: number, data: UpdateBlogRequest) {
      this.loading = true
      this.error = null

      try {
        return await updateBlog(id, data)
      } catch (error) {
        this.error = 'Unable to update blog.'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Delete blog
    async removeBlog(id: number) {
      this.loading = true
      this.error = null

      try {
        const response = await deleteBlog(id)

        this.myBlogs = this.myBlogs.filter(
          (blog) => blog.postid !== id,
        )

        return response
      } catch (error) {
        this.error = 'Unable to delete blog.'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Clear selected blog
    clearCurrentBlog() {
      this.currentBlog = null
    },
  },
})
