/**
 * ============================================================
 * FILE: app/home/error.tsx
 * LOẠI: Client Component (BẮT BUỘC 'use client')
 * MỤC ĐÍCH: Error boundary UI khi page.tsx throw error
 *           Next.js tự động wrap page trong ErrorBoundary
 *           và show file này khi có uncaught error.
 *
 * PROPS:
 *   - error: Error object với message và optional digest
 *   - reset: Function để retry (re-execute page)
 *
 * LƯU Ý: File này KHÔNG áp dụng cho lỗi trong layout.tsx
 *         Chỉ catch error trong page.tsx và child components
 * ============================================================
 */

'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

// ============================================================
// PROPS - được Next.js tự động inject
// ============================================================
interface HomeErrorProps {
  error: Error & { digest?: string } // Error từ page.tsx
  reset: () => void // Retry function - re-render page
}

export default function HomeError({ error, reset }: HomeErrorProps) {
  // Log error để debug (production nên log lên service như Sentry)
  useEffect(() => {
    console.error('[Home Page Error]:', error)
  }, [error])

  return (
    <div className='bg-background flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='w-full max-w-md text-center'>
        {/* Error Icon */}
        <div className='mb-6 flex justify-center'>
          <div className='rounded-full bg-red-100 p-6 dark:bg-red-900/20'>
            <AlertCircle className='h-14 w-14 text-red-500' />
          </div>
        </div>

        {/* Error Message */}
        <h1 className='mb-3 text-3xl font-bold'>Oops! Something went wrong</h1>
        <p className='text-muted-foreground mb-8'>
          We encountered an error while loading the store. This might be a
          temporary issue. Please try again.
        </p>

        {/* Action Buttons */}
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          {/* Retry button - gọi reset() để re-render page */}
          <Button onClick={reset} className='gap-2'>
            <RefreshCw className='h-4 w-4' />
            Try Again
          </Button>

          {/* Go home button */}
          <Button variant='outline' asChild>
            <Link href='/' className='gap-2'>
              <Home className='h-4 w-4' />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Error details - chỉ show ở development */}
        {process.env.NODE_ENV === 'development' && (
          <details className='bg-muted mt-8 rounded-xl border p-4 text-left'>
            <summary className='text-muted-foreground cursor-pointer text-sm font-semibold'>
              Developer Info (dev only)
            </summary>
            <div className='mt-3 space-y-2'>
              {/* Error message */}
              <div>
                <p className='text-muted-foreground text-xs font-medium'>
                  Message:
                </p>
                <p className='text-sm text-red-500'>{error.message}</p>
              </div>
              {/* Error digest (server-side error ID) */}
              {error.digest && (
                <div>
                  <p className='text-muted-foreground text-xs font-medium'>
                    Digest:
                  </p>
                  <p className='font-mono text-xs'>{error.digest}</p>
                </div>
              )}
              {/* Stack trace */}
              {error.stack && (
                <div>
                  <p className='text-muted-foreground text-xs font-medium'>
                    Stack:
                  </p>
                  <pre className='bg-background text-muted-foreground mt-1 max-h-48 overflow-auto rounded p-2 text-xs'>
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
