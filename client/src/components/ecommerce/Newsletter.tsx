/**
 * ============================================================
 * FILE: components/ecommerce/Newsletter.tsx
 * LOẠI: Client Component ('use client')
 * MỤC ĐÍCH: Form đăng ký nhận newsletter qua email
 *           - Validate email format trước khi submit
 *           - Loading state khi gọi API
 *           - Toast success/error từ newsletterApi
 *           - Reset form sau khi đăng ký thành công
 * ============================================================
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Loader2, CheckCircle } from 'lucide-react'
import { newsletterApi } from '@/lib/api/endpoints'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // ----------------------------------------------------------
  // HANDLER: Submit form đăng ký newsletter
  // ----------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || isLoading) return

    setIsLoading(true)
    try {
      const response = await newsletterApi.subscribe({ email })

      if (!response.IsError) {
        setIsSuccess(true)
        setEmail('')
        // Reset success state sau 5 giây
        setTimeout(() => setIsSuccess(false), 5000)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='bg-primary text-primary-foreground py-16'>
      <div className='container'>
        <div className='flex flex-col items-center gap-8 lg:flex-row lg:justify-between'>
          {/* TEXT */}
          <div className='max-w-lg text-center lg:text-left'>
            <div className='mb-2 flex items-center justify-center gap-2 lg:justify-start'>
              <Mail className='h-6 w-6' />
              <span className='text-sm font-semibold tracking-widest uppercase opacity-80'>
                Newsletter
              </span>
            </div>
            <h2 className='mb-3 text-3xl font-bold'>
              Get Exclusive Deals & Updates
            </h2>
            <p className='opacity-80'>
              Subscribe to our newsletter and be the first to know about new
              products, special offers, and seasonal sales. No spam, unsubscribe
              anytime.
            </p>
          </div>

          {/* FORM */}
          <div className='w-full max-w-md'>
            {isSuccess ? (
              // Success state
              <div className='flex flex-col items-center gap-3 rounded-2xl bg-white/10 p-6 text-center backdrop-blur'>
                <CheckCircle className='h-10 w-10 text-green-300' />
                <p className='text-lg font-semibold'>You&apos;re subscribed!</p>
                <p className='text-sm opacity-80'>
                  Thank you for subscribing. Check your inbox for a confirmation
                  email.
                </p>
              </div>
            ) : (
              // Form
              <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <div className='flex gap-2'>
                  <Input
                    type='email'
                    placeholder='Enter your email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className='flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-white/50'
                  />
                  <Button
                    type='submit'
                    disabled={isLoading || !email}
                    className='text-primary shrink-0 bg-white font-semibold hover:bg-white/90'
                  >
                    {isLoading ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                </div>
                <p className='text-xs opacity-60'>
                  By subscribing, you agree to our Privacy Policy. We&apos;ll
                  never share your email with anyone else.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
