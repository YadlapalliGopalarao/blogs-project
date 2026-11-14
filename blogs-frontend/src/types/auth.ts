
export interface User {
  id: number
  name: string
  email: string
  nickname?: string | null
  address?: string | null
  phone_no?: string | null
  created_at?: string
  updated_at?: string
}

// Login request
export interface LoginRequest {
  name: string
  password: string
}

// Registration request
export interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
  nickname: string
  address: string
  phone_no: string
}

// Login API response
export interface AuthResponse {
  message: string
  token: string
  token_type: string
  user: User
}

// Registration API response
export interface RegisterResponse {
  message: string
  data: {
    user_id: number
    name: string
    email: string
  }
}

// Profile API response
export interface ProfileResponse {
  message: string
  data: User
}

// General API message response
export interface ApiMessageResponse {
  message: string
}
