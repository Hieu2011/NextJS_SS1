/**
 * ============================================================
 * FILE: app/home/layout.tsx
 * LOẠI: Server Component (Layout)
 * MỤC ĐÍCH: Layout riêng cho store routes (/home, /products)
 *           Không có AppSidebar/Navbar (những thứ đó chỉ có
 *           trong app/(admin)/layout.tsx).
 *           Toaster đã có trong app/layout.tsx (root).
 * ============================================================
 */

export default function StoreLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
