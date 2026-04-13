/**
 * ============================================================
 * FILE: app/products/[id]/loading.tsx
 * LOẠI: Server Component
 * MỤC ĐÍCH: Skeleton loading UI cho product detail page
 * ============================================================
 */

import { Skeleton } from '@/components/ui/skeleton'
import { ShoppingBag } from 'lucide-react'

export default function ProductDetailLoading() {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Header skeleton */}
      <header className='bg-background sticky top-0 z-50 w-full border-b'>
        <div className='container flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <ShoppingBag className='text-muted-foreground/30 h-6 w-6' />
            <Skeleton className='h-6 w-28' />
          </div>
          <div className='hidden gap-2 md:flex'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-8 w-20 rounded-md' />
            ))}
          </div>
          <div className='flex gap-2'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className='h-9 w-9 rounded-md' />
            ))}
          </div>
        </div>
      </header>

      <main className='flex-1'>
        {/* Breadcrumb */}
        <div className='border-b'>
          <div className='container py-3'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-12' />
              <Skeleton className='h-3 w-3' />
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-3 w-3' />
              <Skeleton className='h-4 w-40' />
            </div>
          </div>
        </div>

        {/* Product info */}
        <section className='container py-10'>
          <div className='grid gap-10 lg:grid-cols-2'>
            {/* Image gallery */}
            <div className='space-y-3'>
              <Skeleton className='aspect-square rounded-2xl' />
              <div className='flex gap-2'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className='h-20 w-20 rounded-lg' />
                ))}
              </div>
            </div>

            {/* Product details */}
            <div className='space-y-5'>
              {/* Badges */}
              <div className='flex gap-2'>
                <Skeleton className='h-6 w-20 rounded-full' />
                <Skeleton className='h-6 w-24 rounded-full' />
              </div>

              {/* Name */}
              <div className='space-y-2'>
                <Skeleton className='h-9 w-full' />
                <Skeleton className='h-9 w-3/4' />
              </div>

              {/* Rating */}
              <div className='flex items-center gap-3'>
                <div className='flex gap-1'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className='h-4 w-4' />
                  ))}
                </div>
                <Skeleton className='h-4 w-8' />
                <Skeleton className='h-4 w-28' />
              </div>

              <Skeleton className='h-px w-full' />

              {/* Price */}
              <div className='flex items-baseline gap-3'>
                <Skeleton className='h-10 w-32' />
                <Skeleton className='h-7 w-24' />
                <Skeleton className='h-6 w-20 rounded-full' />
              </div>

              {/* Description */}
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-4/5' />
              </div>

              <Skeleton className='h-px w-full' />

              {/* AddToCart skeleton */}
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-10 w-32 rounded-md' />
                  <Skeleton className='h-10 flex-1 rounded-md' />
                </div>
                <Skeleton className='h-10 w-full rounded-md' />
              </div>

              <Skeleton className='h-px w-full' />

              {/* Trust badges */}
              <div className='grid grid-cols-2 gap-3'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className='h-16 rounded-xl' />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className='border-t'>
          <div className='container py-10'>
            <div className='mb-6 flex gap-2'>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className='h-9 w-28 rounded-md' />
              ))}
            </div>
            <div className='max-w-xl space-y-3'>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className='h-4 w-full' />
              ))}
              <Skeleton className='h-4 w-3/4' />
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className='bg-muted/30 py-12'>
          <div className='container'>
            <Skeleton className='mb-6 h-8 w-48' />
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className='bg-background overflow-hidden rounded-2xl border'
                >
                  <Skeleton className='aspect-square' />
                  <div className='space-y-2 p-4'>
                    <Skeleton className='h-3.5 w-20' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-3/4' />
                    <div className='flex items-center justify-between pt-1'>
                      <Skeleton className='h-6 w-20' />
                      <Skeleton className='h-6 w-16' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer skeleton */}
      <footer className='bg-muted/30 border-t'>
        <div className='container py-12'>
          <Skeleton className='mx-auto h-4 w-full max-w-xs' />
        </div>
      </footer>
    </div>
  )
}
