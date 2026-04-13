/**
 * ============================================================
 * FILE: app/home/page.tsx
 * LOẠI: Server Component (async)
 * MỤC ĐÍCH: Home page của trang e-commerce
 *           - Fetch data từ API ở server (SEO friendly)
 *           - Truyền data xuống các child components qua props
 *           - Next.js auto show loading.tsx trong khi fetch
 *           - Next.js auto show error.tsx nếu fetch thất bại
 * ============================================================
 */

import StoreHeader from '@/components/ecommerce/StoreHeader'
import Hero from '@/components/ecommerce/Hero'
import Categories from '@/components/ecommerce/Categories'
import FeaturedProducts from '@/components/ecommerce/FeaturedProducts'
import Newsletter from '@/components/ecommerce/Newsletter'
import StoreFooter from '@/components/ecommerce/StoreFooter'
import { productApi, categoryApi } from '@/lib/api/endpoints'

export default async function HomePage() {
  // Fetch parallel - tổng thời gian = max(thời gian fetch products, categories)
  const [productsResponse, categoriesResponse] = await Promise.all([
    productApi.getFeatured(),
    categoryApi.getAll()
  ])

  const products = productsResponse.ResultObject ?? []
  const categories = categoriesResponse.ResultObject ?? []

  return (
    <div className='flex min-h-screen flex-col'>
      <StoreHeader />
      <main className='flex-1'>
        <Hero />
        <Categories categories={categories} />
        <FeaturedProducts products={products} />
        <Newsletter />
      </main>
      <StoreFooter />
    </div>
  )
}
