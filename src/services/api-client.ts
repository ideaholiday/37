import { config } from '@/config'

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public traceId?: string,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string>
  requiresAuth?: boolean
}

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  setToken(token: string | null) {
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, requiresAuth = false, ...fetchOptions } = options

    let url = `${this.baseUrl}${endpoint}`
    
    if (params) {
      const searchParams = new URLSearchParams(params)
      url += `?${searchParams.toString()}`
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...((fetchOptions.headers as Record<string, string>) || {}),
    }

    if (requiresAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new ApiError(
          response.status,
          data.message || 'An error occurred',
          data.traceId,
          data.errors
        )
      }

      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(500, 'Network error occurred')
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient(config.apiBaseUrl)
