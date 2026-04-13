/**
 * ============================================================
 * FILE: components/ecommerce/Categories.tsx
 * LOẠI: Server Component
 * MỤC ĐÍCH: Grid hiển thị tất cả danh mục sản phẩm
 *           - Nhận categories từ props (fetched ở page.tsx)
 *           - Responsive grid: 2 cột mobile, 4 cột desktop
 *           - Hover animation trên ảnh
 *           - Link đến trang products filter theo category
 * ============================================================
 */

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/lib/api/types'

// ============================================================
// PROPS
// ============================================================
interface CategoriesProps {
  // Danh sách categories được fetch từ API và truyền xuống
  categories: Category[]
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section className='container py-16'>
      {/* Section Header */}
      <div className='mb-8 flex items-end justify-between'>
        <div>
          <p className='text-primary mb-1 text-sm font-medium'>Browse</p>
          <h2 className='text-3xl font-bold tracking-tight'>
            Shop by Category
          </h2>
        </div>
        <Link
          href='/products'
          className='text-primary flex items-center gap-1 text-sm font-medium hover:underline'
        >
          All categories
          <ArrowRight className='h-4 w-4' />
        </Link>
      </div>

      {/* Category Grid */}
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4'>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?categoryId=${category.id}`}
            className='group bg-muted relative overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'
          >
            {/* Category Image */}
            <div className='relative aspect-[4/3] overflow-hidden'>
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes='(max-width: 640px) 50vw, 25vw'
                className='object-cover transition-transform duration-300 group-hover:scale-110'
              />
              {/* Dark overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
            </div>

            {/* Category Info - overlay trên ảnh */}
            <div className='absolute right-0 bottom-0 left-0 p-4 text-white'>
              <h3 className='text-base font-bold sm:text-lg'>
                {category.name}
              </h3>
              <p className='text-xs text-white/80'>
                {category.productCount.toLocaleString()}+ products
              </p>
            </div>

            {/* Hover arrow */}
            <div className='absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100'>
              <ArrowRight className='h-4 w-4 text-white' />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
