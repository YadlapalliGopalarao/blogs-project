
import api from '../../../services/api'

import type {
  BlogDetailsResponse,
  CreateBlogRequest,
  CreateBlogResponse,
  UpdateBlogRequest,
  UpdateBlogResponse,
  DeleteBlogResponse,
  PaginatedBlogs,
  MyBlogsResponse,
} from '../../../types/blog'

import { API_ENDPOINTS } from '../../../utils/constants'

// Fetch public blogs with pagination and search
export const getPublicBlogs = async (
  page = 1,
  search = '',
) => {
  const response = await api.get<PaginatedBlogs>(
    API_ENDPOINTS.PUBLIC_BLOGS,
    {
      params: {
        page,
        search: search || undefined,
      },
    },
  )

  return response.data
}

// Fetch a single public blog without authentication
export const getPublicBlogById = async (id: number) => {
  const response = await api.get<BlogDetailsResponse>(
    `${API_ENDPOINTS.PUBLIC_BLOGS}/${id}`,
  )

  return response.data
}

// Fetch a single authenticated user's blog
export const getBlogById = async (id: number) => {
  const response = await api.get<BlogDetailsResponse>(
    `${API_ENDPOINTS.BLOGS}/${id}`,
  )

  return response.data
}

// Fetch logged-in user's blogs
export const getMyBlogs = async () => {
  const response = await api.get<MyBlogsResponse>(
    API_ENDPOINTS.MY_BLOGS,
  )

  return response.data
}


export const createBlog = async (data: CreateBlogRequest) => {
  const formData = new FormData()

  formData.append('title', data.title)
  formData.append('shortdesc', data.shortdesc)
  formData.append('longpara', data.longpara)

  data.keywords.forEach((keyword) => {
    formData.append('keywords[]', keyword)
  })

  if (data.image) {
    formData.append('image', data.image)
  }

  const response = await api.post<CreateBlogResponse>(
    API_ENDPOINTS.CREATE_BLOG,
    formData,
  )

  return response.data
}




// Update a blog
export const updateBlog = async (
  id: number,
  data: UpdateBlogRequest,
) => {
  const formData = new FormData()

  if (data.title !== undefined) {
    formData.append('title', data.title)
  }

  if (data.shortdesc !== undefined) {
    formData.append('shortdesc', data.shortdesc)
  }

  if (data.longpara !== undefined) {
    formData.append('longpara', data.longpara)
  }

  if (data.keywords !== undefined) {
    data.keywords.forEach((keyword) => {
      formData.append('keywords[]', keyword)
    })
  }

  if (data.image) {
    formData.append('image', data.image)
  }

  formData.append('_method', 'PUT')

  const response = await api.post<UpdateBlogResponse>(
    `${API_ENDPOINTS.BLOGS}/${id}`,
    formData,
  )

  return response.data
}

// Delete a blog
export const deleteBlog = async (id: number) => {
  const response = await api.delete<DeleteBlogResponse>(
    `${API_ENDPOINTS.BLOGS}/${id}`,
  )

  return response.data
}
