/**
 * ============================================================
 * FILE: lib/api/client.ts
 * MỤC ĐÍCH: HTTP Client tập trung xử lý tất cả API calls.
 *           - Tự động handle error và success
 *           - Show toast notifications qua sonner
 *           - Wrap request/response theo chuẩn backend
 *           - Khi đổi API thật chỉ cần thay BASE_URL
 * ============================================================
 */

import { toast } from 'sonner'
import { ApiResponse, ApiRequest } from './types'

// ============================================================
// API CLIENT CLASS
// Sử dụng class để dễ config và test
// ============================================================
class ApiClient {
  private baseURL: string

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseURL = baseURL
  }

  // ----------------------------------------------------------
  // PRIVATE: Core request handler - xử lý tất cả HTTP calls
  // - Tự động parse JSON response
  // - Đọc cấu trúc ApiResponse từ backend
  // - Show toast error nếu IsError = true
  // - Show toast success nếu method không phải GET
  // ----------------------------------------------------------
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          // TODO: Thêm Authorization header khi có auth
          // 'Authorization': `Bearer ${getToken()}`,
          ...options.headers
        }
      })

      // Parse JSON response
      const data: ApiResponse<T> = await response.json()

      // ---- BACKEND TRẢ VỀ LỖI (IsError = true) ----
      if (data.IsError) {
        // Show error toast với message từ backend
        toast.error(data.Message || 'An error occurred', {
          description: data.MessageDetail || undefined
        })
        throw new Error(data.MessageDetail || data.Message)
      }

      // ---- THÀNH CÔNG - Show success toast (không hiện với GET) ----
      if (options.method && options.method !== 'GET' && data.Message !== 'OK') {
        toast.success(data.Message || 'Success')
      }

      return data
    } catch (error) {
      // ---- LỖI KẾT NỐI MẠNG (không phải lỗi từ backend) ----
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error('Network Error', {
          description:
            'Cannot connect to server. Please check your internet connection.'
        })
      }

      // Re-throw để component có thể handle tiếp nếu cần
      throw error
    }
  }

  // ----------------------------------------------------------
  // GET - Lấy dữ liệu
  // Không show success toast
  // ----------------------------------------------------------
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET'
      // next: { revalidate: 60 } // Cache 60s - uncomment khi cần
    })
  }

  // ----------------------------------------------------------
  // POST - Tạo mới dữ liệu
  // Body luôn được wrap trong { data: ... } theo chuẩn backend
  // ----------------------------------------------------------
  async post<T, D = unknown>(
    endpoint: string,
    data: D
  ): Promise<ApiResponse<T>> {
    // Wrap data theo chuẩn ApiRequest
    const requestBody: ApiRequest<D> = { data }

    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(requestBody)
    })
  }

  // ----------------------------------------------------------
  // PUT - Cập nhật dữ liệu
  // ----------------------------------------------------------
  async put<T, D = unknown>(
    endpoint: string,
    data: D
  ): Promise<ApiResponse<T>> {
    const requestBody: ApiRequest<D> = { data }

    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(requestBody)
    })
  }

  // ----------------------------------------------------------
  // DELETE - Xóa dữ liệu
  // ----------------------------------------------------------
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE'
    })
  }

  // ----------------------------------------------------------
  // PATCH - Cập nhật một phần dữ liệu
  // ----------------------------------------------------------
  async patch<T, D = unknown>(
    endpoint: string,
    data: D
  ): Promise<ApiResponse<T>> {
    const requestBody: ApiRequest<D> = { data }

    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(requestBody)
    })
  }
}

// ============================================================
// EXPORT SINGLETON INSTANCE
// Dùng chung 1 instance trên toàn app để tránh duplicate
// ============================================================
export const apiClient = new ApiClient()

// Export class để có thể tạo instance khác nếu cần
export default ApiClient
