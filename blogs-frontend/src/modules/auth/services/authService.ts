
import api from '../../../services/api'

import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RegisterResponse,
  User,
  ApiMessageResponse,
  ProfileResponse,
} from '../../../types/auth'

import { API_ENDPOINTS } from '../../../utils/constants'

// Register a new user
export const registerUser = async (data: RegisterRequest) => {
  const response = await api.post<RegisterResponse>(
    API_ENDPOINTS.REGISTER,
    data,
  )

  return response.data
}

// Login user
export const loginUser = async (data: LoginRequest) => {
  const response = await api.post<AuthResponse>(
    API_ENDPOINTS.LOGIN,
    data,
  )

  return response.data
}

// Logout user
export const logoutUser = async () => {
  const response = await api.post<ApiMessageResponse>(
    API_ENDPOINTS.LOGOUT,
  )

  return response.data
}

// Retrieve authenticated user's profile
export const getUserProfile = async (): Promise<User> => {
  const response = await api.get<ProfileResponse>(
    API_ENDPOINTS.PROFILE,
  )

  return response.data.data
}
