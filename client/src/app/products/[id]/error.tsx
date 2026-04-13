/**
 * ============================================================
 * FILE: app/products/[id]/error.tsx
 * LOẠI: Client Component (BẮT BUỘC 'use client')
 * MỤC ĐÍCH: Error boundary cho product detail page
 * ============================================================
 */

'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PackageX, RefreshCw, ShoppingBag } from 'lucide-react'

interface ProductErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ProductError({ error, reset }: ProductErrorProps) {
  useEffect(() => {
    console.error('[Product Detail Error]:', error)
  }, [error])

  return (
    <div className='bg-background flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='w-full max-w-md text-center'>
        <div className='mb-6 flex justify-center'>
          <div className='rounded-full bg-orange-100 p-6 dark:bg-orange-900/20'>
            <PackageX className='h-14 w-14 text-orange-500' />
          </div>
        </div>

        <h1 className='mb-3 text-3xl font-bold'>Product Not Available</h1>
        <p className='text-muted-foreground mb-8'>
          We couldn&apos;t load this product. It may have been removed or there
          was a temporary issue.
        </p>

        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button onClick={reset} className='gap-2'>
            <RefreshCw className='h-4 w-4' />
            Try Again
          </Button>
          <Button variant='outline' asChild>
            <Link href='/home' className='gap-2'>
              <ShoppingBag className='h-4 w-4' />
              Continue Shopping
            </Link>
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className='bg-muted mt-8 rounded-xl border p-4 text-left'>
            <summary className='text-muted-foreground cursor-pointer text-sm font-semibold'>
              Developer Info
            </summary>
            <div className='mt-2 space-y-1'>
              <p className='text-sm text-red-500'>{error.message}</p>
              {error.digest && (
                <p className='text-muted-foreground font-mono text-xs'>
                  Digest: {error.digest}
                </p>
              )}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
