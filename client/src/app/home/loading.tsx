/**
 * ============================================================
 * FILE: app/home/loading.tsx
 * LOẠI: Server Component
 * MỤC ĐÍCH: UI hiển thị trong khi page.tsx đang fetch data
 *           Next.js tự động wrap page trong <Suspense> và
 *           show file này làm fallback.
 *
 * SỬ DỤNG: shadcn/ui Skeleton component
 *           Tái tạo layout của trang thật để tránh layout shift
 * ============================================================
 */

import { Skeleton } from '@/components/ui/skeleton'
import { ShoppingBag } from 'lucide-react'

export default function HomeLoading() {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* ---- HEADER SKELETON ---- */}
      <header className='bg-background sticky top-0 z-50 w-full border-b'>
        <div className='container flex h-16 items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <ShoppingBag className='text-muted-foreground/30 h-6 w-6' />
            <Skeleton className='h-6 w-28' />
          </div>
          {/* Nav links */}
          <div className='hidden gap-2 md:flex'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-8 w-20 rounded-md' />
            ))}
          </div>
          {/* Actions */}
          <div className='flex gap-2'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className='h-9 w-9 rounded-md' />
            ))}
          </div>
        </div>
      </header>

      <main className='flex-1'>
        {/* ---- HERO SKELETON ---- */}
        <section className='bg-gradient-to-br from-violet-200/50 to-pink-200/50 py-24'>
          <div className='container'>
            <div className='flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
              <div className='max-w-2xl space-y-5'>
                <Skeleton className='h-5 w-48 rounded-full' />
                <Skeleton className='h-14 w-full' />
                <Skeleton className='h-14 w-4/5' />
                <Skeleton className='h-6 w-3/5' />
                <div className='flex gap-4'>
                  <Skeleton className='h-12 w-36 rounded-md' />
                  <Skeleton className='h-12 w-36 rounded-md' />
                </div>
              </div>
              {/* Stats cards */}
              <div className='grid grid-cols-2 gap-4 lg:w-80'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className='h-20 rounded-xl' />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---- CATEGORIES SKELETON ---- */}
        <section className='container py-16'>
          <div className='mb-8'>
            <Skeleton className='mb-2 h-4 w-20' />
            <Skeleton className='h-9 w-52' />
          </div>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='aspect-[4/3] rounded-2xl' />
              </div>
            ))}
          </div>
        </section>

        {/* ---- FEATURED PRODUCTS SKELETON ---- */}
        <section className='bg-muted/30 py-16'>
          <div className='container'>
            <div className='mb-8'>
              <Skeleton className='mb-2 h-4 w-24' />
              <Skeleton className='h-9 w-52' />
            </div>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className='bg-background overflow-hidden rounded-2xl border'
                >
                  {/* Image */}
                  <Skeleton className='aspect-square' />
                  {/* Info */}
                  <div className='space-y-2.5 p-4'>
                    <Skeleton className='h-3.5 w-20' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-3/4' />
                    <div className='flex gap-0.5'>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Skeleton key={j} className='h-3.5 w-3.5 rounded-sm' />
                      ))}
                    </div>
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

        {/* ---- NEWSLETTER SKELETON ---- */}
        <section className='bg-primary/10 py-16'>
          <div className='container'>
            <div className='flex flex-col items-center gap-6 lg:flex-row lg:justify-between'>
              <div className='max-w-lg space-y-3'>
                <Skeleton className='h-5 w-32' />
                <Skeleton className='h-9 w-72' />
                <Skeleton className='h-5 w-96' />
              </div>
              <div className='flex w-full max-w-md gap-2'>
                <Skeleton className='h-10 flex-1 rounded-md' />
                <Skeleton className='h-10 w-28 rounded-md' />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---- FOOTER SKELETON ---- */}
      <footer className='bg-muted/30 border-t'>
        <div className='container py-12'>
          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-5'>
            <div className='space-y-4 sm:col-span-2'>
              <Skeleton className='h-7 w-32' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-5/6' />
              <Skeleton className='h-4 w-4/6' />
              <div className='flex gap-3'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className='h-9 w-9 rounded-full' />
                ))}
              </div>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='space-y-4'>
                <Skeleton className='h-4 w-24' />
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className='h-4 w-28' />
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
