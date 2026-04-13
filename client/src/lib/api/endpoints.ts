/**
 * ============================================================
 * FILE: lib/api/endpoints.ts
 * MỤC ĐÍCH: Định nghĩa tất cả API endpoints (gọi lên backend).
 *           HIỆN TẠI: Dùng mock data để simulate API calls.
 *           TƯƠNG LAI: Thay bằng apiClient.get/post/put/delete
 *           thực sự khi tích hợp backend - chỉ sửa file này!
 * ============================================================
 */

import { toast } from 'sonner'
import type {
  ApiResponse,
  Product,
  Category,
  CartItem,
  AddToCartRequest,
  NewsletterRequest,
  PaginationRequest,
  PaginatedResponse
} from './types'
import { mockProducts, mockCategories } from '@/lib/data/mock-data'

// ============================================================
// HELPER: Simulate API network delay (giả lập độ trễ mạng)
// Khi dùng API thật, xóa dòng này đi
// ============================================================
const simulateDelay = (ms: number = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms))

// ============================================================
// HELPER: Tạo success response theo chuẩn backend
// ============================================================
const successResponse = <T>(data: T): ApiResponse<T> => ({
  IsError: false,
  StatusID: 200,
  Message: 'OK',
  MessageDetail: '',
  ResultObject: data
})

// ============================================================
// HELPER: Tạo error response theo chuẩn backend
// ============================================================
const errorResponse = <T>(
  message: string,
  detail: string = '',
  statusId: number = 400
): ApiResponse<T> => ({
  IsError: true,
  StatusID: statusId,
  Message: message,
  MessageDetail: detail,
  ResultObject: null
})

// ============================================================
// PRODUCT API - Tất cả operations liên quan đến Product
// ============================================================
export const productApi = {
  // ----------------------------------------------------------
  // Lấy tất cả sản phẩm
  // TODO: Thay bằng: return apiClient.get<Product[]>('/api/products')
  // ----------------------------------------------------------
  getAll: async (): Promise<ApiResponse<Product[]>> => {
    await simulateDelay()
    return successResponse(mockProducts)
  },

  // ----------------------------------------------------------
  // Lấy sản phẩm theo ID
  // TODO: Thay bằng: return apiClient.get<Product>(`/api/products/${id}`)
  // ----------------------------------------------------------
  getById: async (id: number): Promise<ApiResponse<Product>> => {
    await simulateDelay()

    const product = mockProducts.find((p) => p.id === id)
    if (!product) {
      const res = errorResponse<Product>(
        'Product not found',
        `Product with ID ${id} does not exist`,
        404
      )
      toast.error(res.Message, { description: res.MessageDetail })
      return res
    }

    return successResponse(product)
  },

  // ----------------------------------------------------------
  // Lấy sản phẩm nổi bật (isFeatured = true)
  // TODO: Thay bằng: return apiClient.get<Product[]>('/api/products/featured')
  // ----------------------------------------------------------
  getFeatured: async (): Promise<ApiResponse<Product[]>> => {
    await simulateDelay()
    const featured = mockProducts.filter((p) => p.isFeatured)
    return successResponse(featured)
  },

  // ----------------------------------------------------------
  // Lấy sản phẩm theo category
  // TODO: Thay bằng: return apiClient.get<Product[]>(`/api/products?categoryId=${categoryId}`)
  // ----------------------------------------------------------
  getByCategory: async (
    categoryId: number
  ): Promise<ApiResponse<Product[]>> => {
    await simulateDelay()
    const products = mockProducts.filter((p) => p.categoryId === categoryId)
    return successResponse(products)
  },

  // ----------------------------------------------------------
  // Tìm kiếm sản phẩm có phân trang
  // TODO: Thay bằng: return apiClient.post<PaginatedResponse<Product>>('/api/products/search', request)
  // ----------------------------------------------------------
  search: async (
    request: PaginationRequest
  ): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    await simulateDelay(400)

    let filtered = [...mockProducts]

    // Filter theo search query
    if (request.search) {
      const query = request.search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      )
    }

    // Filter theo category
    if (request.categoryId) {
      filtered = filtered.filter((p) => p.categoryId === request.categoryId)
    }

    // Sort
    if (request.sortBy === 'price') {
      filtered.sort((a, b) =>
        request.sortOrder === 'desc' ? b.price - a.price : a.price - b.price
      )
    } else if (request.sortBy === 'rating') {
      filtered.sort((a, b) =>
        request.sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating
      )
    } else if (request.sortBy === 'newest') {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    // Pagination
    const page = request.page || 1
    const pageSize = request.pageSize || 12
    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const items = filtered.slice((page - 1) * pageSize, page * pageSize)

    return successResponse({ items, total, page, pageSize, totalPages })
  }
}

// ============================================================
// CATEGORY API - Tất cả operations liên quan đến Category
// ============================================================
export const categoryApi = {
  // ----------------------------------------------------------
  // Lấy tất cả categories
  // TODO: Thay bằng: return apiClient.get<Category[]>('/api/categories')
  // ----------------------------------------------------------
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    await simulateDelay(400)
    return successResponse(mockCategories)
  },

  // ----------------------------------------------------------
  // Lấy category theo ID
  // TODO: Thay bằng: return apiClient.get<Category>(`/api/categories/${id}`)
  // ----------------------------------------------------------
  getById: async (id: number): Promise<ApiResponse<Category>> => {
    await simulateDelay()
    const category = mockCategories.find((c) => c.id === id)

    if (!category) {
      const res = errorResponse<Category>(
        'Category not found',
        `Category with ID ${id} does not exist`,
        404
      )
      toast.error(res.Message, { description: res.MessageDetail })
      return res
    }

    return successResponse(category)
  }
}

// ============================================================
// CART API - Quản lý giỏ hàng
// ============================================================
export const cartApi = {
  // ----------------------------------------------------------
  // Thêm sản phẩm vào giỏ hàng
  // TODO: Thay bằng: return apiClient.post<CartItem>('/api/cart/add', request)
  // ----------------------------------------------------------
  addItem: async (
    request: AddToCartRequest
  ): Promise<ApiResponse<CartItem>> => {
    await simulateDelay(500)

    const product = mockProducts.find((p) => p.id === request.productId)

    // Validate: product tồn tại không?
    if (!product) {
      const res = errorResponse<CartItem>('Product not found', '', 404)
      toast.error(res.Message)
      return res
    }

    // Validate: còn hàng không?
    if (!product.inStock) {
      const res = errorResponse<CartItem>(
        'Out of stock',
        `${product.name} is currently out of stock`,
        400
      )
      toast.error(res.Message, { description: res.MessageDetail })
      return res
    }

    // Validate: số lượng yêu cầu <= tồn kho?
    if (request.quantity > product.stockQuantity) {
      const res = errorResponse<CartItem>(
        'Insufficient stock',
        `Only ${product.stockQuantity} items available`,
        400
      )
      toast.error(res.Message, { description: res.MessageDetail })
      return res
    }

    // Thành công - toast đã được show trong client.ts
    const cartItem: CartItem = {
      productId: request.productId,
      quantity: request.quantity,
      product
    }

    toast.success('Added to cart!', {
      description: `${product.name} × ${request.quantity}`
    })

    return successResponse(cartItem)
  }
}

// ============================================================
// NEWSLETTER API - Đăng ký nhận newsletter
// ============================================================
export const newsletterApi = {
  // ----------------------------------------------------------
  // Đăng ký email nhận newsletter
  // TODO: Thay bằng: return apiClient.post<boolean>('/api/newsletter/subscribe', request)
  // ----------------------------------------------------------
  subscribe: async (
    request: NewsletterRequest
  ): Promise<ApiResponse<boolean>> => {
    await simulateDelay(800)

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(request.email)) {
      const res = errorResponse<boolean>(
        'Invalid email',
        'Please enter a valid email address'
      )
      toast.error(res.Message, { description: res.MessageDetail })
      return res
    }

    toast.success('Successfully subscribed!', {
      description: `Welcome! ${request.email} will receive our latest updates.`
    })

    return {
      IsError: false,
      StatusID: 200,
      Message: 'Subscribed successfully!',
      MessageDetail: '',
      ResultObject: true
    }
  }
}
