
import { defineStore } from 'pinia'

import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
} from '../services/authService'

import type {
  User,
  LoginRequest,
  RegisterRequest,
} from '../../../types/auth'

import { STORAGE_KEYS } from '../../../utils/constants'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(
      localStorage.getItem(STORAGE_KEYS.USER) || 'null',
    ) as User | null,

    token: localStorage.getItem(STORAGE_KEYS.TOKEN),

    isAuthenticated: Boolean(
      localStorage.getItem(STORAGE_KEYS.TOKEN),
    ),

    loading: false,
  }),

  actions: {
    // Login
    async login(data: LoginRequest) {
      this.loading = true

      try {
        const response = await loginUser(data)

        this.token = response.token
        this.user = response.user
        this.isAuthenticated = true

        localStorage.setItem(STORAGE_KEYS.TOKEN, response.token)
        localStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify(response.user),
        )

        return response
      } finally {
        this.loading = false
      }
    },

    // Register
    async register(data: RegisterRequest) {
      this.loading = true

      try {
        return await registerUser(data)
      } finally {
        this.loading = false
      }
    },

    // Fetch authenticated user
    async fetchProfile() {
      this.loading = true

      try {
        const user = await getUserProfile()

        this.user = user

        localStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify(user),
        )

        return user
      } finally {
        this.loading = false
      }
    },

    // Logout
    async logout() {
      this.loading = true

      try {
        await logoutUser()
      } finally {
        this.user = null
        this.token = null
        this.isAuthenticated = false

        localStorage.removeItem(STORAGE_KEYS.TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)

        this.loading = false
      }
    },
  },
})
