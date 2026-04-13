/**
 * ============================================================
 * FILE: lib/api/types.ts
 * MỤC ĐÍCH: Định nghĩa tất cả TypeScript interfaces/types
 *           dùng chung toàn bộ ứng dụng
 * ============================================================
 */

// ============================================================
// BASE API RESPONSE - Cấu trúc response chung từ backend
// Backend luôn trả về cấu trúc này
// ============================================================
export interface ApiResponse<T = unknown> {
  IsError: boolean // true nếu có lỗi, false nếu thành công
  StatusID: number // HTTP status code (200, 400, 404, 500...)
  Message: string // Thông báo ngắn gọn ("OK", "NOT_FOUND", ...)
  MessageDetail: string // Chi tiết lỗi (dành cho developer)
  ResultObject: T | null // Dữ liệu trả về - generic type T
}

// ============================================================
// BASE API REQUEST - Cấu trúc request gửi lên backend
// Luôn wrap data trong object hoặc List<T>
// ============================================================
export interface ApiRequest<T = unknown> {
  data: T // Dữ liệu gửi lên - có thể là object hoặc list
}

// ============================================================
// PRODUCT - Model sản phẩm
// ============================================================
export interface Product {
  id: number
  name: string // Tên sản phẩm
  description: string // Mô tả chi tiết (HTML)
  shortDescription: string // Mô tả ngắn (dùng cho card preview)
  price: number // Giá hiện tại (đã giảm)
  originalPrice: number // Giá gốc (để tính % discount)
  discount: number // % giảm giá (ví dụ: 20 = 20%)
  rating: number // Điểm đánh giá trung bình (0.0 - 5.0)
  reviews: number // Tổng số lượng reviews
  images: string[] // Mảng URL ảnh (ảnh đầu là ảnh chính)
  category: string // Tên category (string)
  categoryId: number // FK - liên kết với Category.id
  inStock: boolean // Còn hàng?
  stockQuantity: number // Số lượng tồn kho
  brand: string // Thương hiệu
  sku: string // Stock Keeping Unit - mã quản lý kho
  tags: string[] // Tags dùng cho search/filter
  specifications: Record<string, string> // Thông số kỹ thuật (key-value)
  isNew: boolean // Sản phẩm mới? (hiển thị badge "NEW")
  isFeatured: boolean // Sản phẩm nổi bật? (hiển thị ở home)
  createdAt: string // ISO date string
}

// ============================================================
// CATEGORY - Model danh mục sản phẩm
// ============================================================
export interface Category {
  id: number
  name: string // Tên category (ví dụ: "Electronics")
  slug: string // URL-friendly (ví dụ: "electronics")
  description: string // Mô tả category
  image: string // URL ảnh đại diện
  productCount: number // Số sản phẩm trong category
  parentId: number | null // FK - category cha (null nếu là root)
}

// ============================================================
// CART - Model giỏ hàng
// ============================================================
export interface CartItem {
  productId: number // FK - liên kết Product
  quantity: number // Số lượng muốn mua
  product?: Product // Product details (join khi cần hiển thị)
}

export interface Cart {
  items: CartItem[] // Danh sách sản phẩm trong giỏ
  total: number // Tổng tiền
  itemCount: number // Tổng số items (sum của tất cả quantity)
}

// ============================================================
// PAGINATION - Model phân trang
// ============================================================
export interface PaginationRequest {
  page: number // Trang hiện tại (bắt đầu từ 1)
  pageSize: number // Số items mỗi trang
  search?: string // Từ khóa tìm kiếm (optional)
  sortBy?: string // Field để sort (optional)
  sortOrder?: 'asc' | 'desc' // Hướng sort (optional)
  categoryId?: number // Filter theo category (optional)
}

export interface PaginatedResponse<T> {
  items: T[] // Dữ liệu trang hiện tại
  total: number // Tổng số records
  page: number // Trang hiện tại
  pageSize: number // Số items mỗi trang
  totalPages: number // Tổng số trang
}

// ============================================================
// NEWSLETTER - Model đăng ký newsletter
// ============================================================
export interface NewsletterRequest {
  email: string // Email đăng ký
}

// ============================================================
// ADD TO CART REQUEST
// ============================================================
export interface AddToCartRequest {
  productId: number
  quantity: number
}
