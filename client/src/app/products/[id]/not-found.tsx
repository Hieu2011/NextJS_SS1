/**
 * ============================================================
 * FILE: app/products/[id]/not-found.tsx
 * MỤC ĐÍCH: UI khi product ID không tồn tại
 *           Hiển thị khi `notFound()` được gọi trong page.tsx
 * ============================================================
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PackageSearch, ShoppingBag } from 'lucide-react'

export default function ProductNotFound() {
  return (
    <div className='bg-background flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='w-full max-w-md text-center'>
        <div className='mb-6 flex justify-center'>
          <div className='bg-muted rounded-full p-6'>
            <PackageSearch className='text-muted-foreground h-14 w-14' />
          </div>
        </div>

        <h1 className='mb-3 text-3xl font-bold'>Product Not Found</h1>
        <p className='text-muted-foreground mb-8'>
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed from our store.
        </p>

        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button asChild>
            <Link href='/home'>
              <ShoppingBag className='mr-2 h-4 w-4' />
              Continue Shopping
            </Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/home#categories'>Browse Categories</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
