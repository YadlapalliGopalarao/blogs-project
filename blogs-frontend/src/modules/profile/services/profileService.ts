
import api from '../../../services/api'

import type {
  User,
  ProfileResponse,
} from '../../../types/auth'

import { API_ENDPOINTS } from '../../../utils/constants'

// Fetch user profile
export const getProfile = async (): Promise<User> => {
  const response = await api.get<ProfileResponse>(
    API_ENDPOINTS.PROFILE,
  )

  return response.data.data
}

// Update user profile
export const updateProfile = async (
  data: Partial<Pick<User, 'name' | 'email'>>,
): Promise<User> => {
  const response = await api.put<ProfileResponse>(
    API_ENDPOINTS.PROFILE,
    data,
  )

  return response.data.data
}
