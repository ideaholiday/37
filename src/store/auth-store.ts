import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthState } from '@/types/user'
import { apiClient } from '@/services/api-client'

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>
  loginWithOTP: (phone: string, otp: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      login: async (email: string, password: string) => {
        set({ loading: true })
        try {
          const response = await apiClient.post<{ user: User; token: string }>(
            '/auth/login',
            { email, password }
          )
          apiClient.setToken(response.token)
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            loading: false,
          })
        } catch (error) {
          set({ loading: false })
          throw error
        }
      },

      loginWithOTP: async (phone: string, otp: string) => {
        set({ loading: true })
        try {
          const response = await apiClient.post<{ user: User; token: string }>(
            '/auth/login-otp',
            { phone, otp }
          )
          apiClient.setToken(response.token)
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            loading: false,
          })
        } catch (error) {
          set({ loading: false })
          throw error
        }
      },

      logout: () => {
        apiClient.setToken(null)
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      setUser: (user) => set({ user }),
      setToken: (token) => {
        apiClient.setToken(token)
        set({ token, isAuthenticated: !!token })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
