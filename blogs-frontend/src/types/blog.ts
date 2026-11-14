
// Blog information
export interface Blog {
  postid: number
  title: string
  shortdesc: string
  longpara?: string
  keywords?: string[]
  viewcount?: number
  image_url?: string | null
  userid?: number
  author?: string
  created_at?: string
  updated_at?: string

  user?: {
    id: number
    name: string
  }

  details?: {
    longpara?: string
    keywords?: string[]
    image?: string | null
    viewcount?: number
  }
}

// Public blog displayed on homepage
export interface PublicBlog extends Blog {
  author: string
  image_url: string | null
}

// Authenticated user's blog listing
export interface MyBlog extends Blog {
  image_url: string | null
}

// Pagination information
export interface PaginationMeta {
  current_page: number
  last_page: number
  total: number
  per_page: number
}

// Public blogs API response
export interface PaginatedBlogs {
  message: string
  blogs: PublicBlog[]
  pagination?: PaginationMeta
}

// My blogs API response
export interface MyBlogsResponse {
  message: string
  blogs: MyBlog[]
}

// Single blog details API response
export interface BlogDetailsResponse {
  message: string
  blog: Blog | null
}

// Create blog request
export interface CreateBlogRequest {
  title: string
  shortdesc: string
  longpara: string
  keywords: string[]
  image?: File | null
}

// Update blog request
export interface UpdateBlogRequest {
  title?: string
  shortdesc?: string
  longpara?: string
  keywords?: string[]
  image?: File | null
}

// Create blog response
export interface CreateBlogResponse {
  message: string
  blog: Blog
  image_url: string | null
}

// Update blog response
export interface UpdateBlogResponse {
  message: string
  blog: Blog
}

// Delete blog response
export interface DeleteBlogResponse {
  message: string
  postid: number
}
