
export const APP_CONFIG = {
  name: 'BlogSpace',
  description: 'Share your thoughts with the world.',
  version: '1.0.0',
}

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
}


export const API_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  PROFILE: '/profile',

  PUBLIC_BLOGS: '/public-blogs',
  MY_BLOGS: '/my-blogs',

  BLOGS: '/blogs',
  CREATE_BLOG: '/blogs/create',
}


export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
}

export const IMAGE_CONFIG = {
  MAX_SIZE_MB: 5,
  ALLOWED_TYPES: ['image/png', 'image/jpeg'],
  ALLOWED_EXTENSIONS: ['.png', '.jpg', '.jpeg'],
}

export const ROUTE_NAMES = {
  HOME: 'home',
  LOGIN: 'login',
  REGISTER: 'register',
  DASHBOARD: 'dashboard',
  MY_BLOGS: 'my-blogs',
  CREATE_BLOG: 'create-blog',
  PROFILE: 'profile',
}
