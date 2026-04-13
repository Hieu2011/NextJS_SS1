/**
 * ============================================================
 * FILE: components/ecommerce/FeaturedProducts.tsx
 * LOẠI: Server Component
 * MỤC ĐÍCH: Section hiển thị sản phẩm nổi bật ở home page
 *           - Nhận products từ props (fetched ở page.tsx)
 *           - Responsive grid
 *           - Mỗi item dùng ProductCard (Client Component)
 *           - Link "View All" đến trang products
 * ============================================================
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/api/types'

// ============================================================
// PROPS
// ============================================================
interface FeaturedProductsProps {
  products: Product[] // Danh sách sản phẩm nổi bật từ API
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className='bg-muted/30 py-16'>
      <div className='container'>
        {/* Section Header */}
        <div className='mb-8 flex items-end justify-between'>
          <div>
            <p className='text-primary mb-1 text-sm font-medium'>Don't miss</p>
            <h2 className='text-3xl font-bold tracking-tight'>
              Featured Products
            </h2>
          </div>
          <Link
            href='/products'
            className='text-primary flex items-center gap-1 text-sm font-medium hover:underline'
          >
            View all
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className='flex h-48 items-center justify-center rounded-2xl border border-dashed'>
            <p className='text-muted-foreground'>No products found</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map((product) => (
              // ProductCard là Client Component - nhận product object
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
