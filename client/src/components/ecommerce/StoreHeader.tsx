/**
 * ============================================================
 * FILE: components/ecommerce/StoreHeader.tsx
 * LOẠI: Client Component ('use client')
 * MỤC ĐÍCH: Header cho trang thương mại điện tử
 *           - Logo + Navigation menu
 *           - Search button
 *           - Wishlist / Cart (với badge số lượng)
 *           - User account menu
 *           - Sticky top + backdrop blur effect
 * ============================================================
 */

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ShoppingBag
} from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { AppNavMenu, AppMobileMenu } from '@/components/AppMenu'

export default function StoreHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartItemCount = 3

  return (
    <header className='bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container'>
        {/* ---- TOP BAR ---- */}
        <div className='flex h-16 items-center justify-between gap-4'>
          {/* LOGO */}
          <Link href='/home' className='flex shrink-0 items-center gap-2'>
            <ShoppingBag className='text-primary h-6 w-6' />
            <span className='text-xl font-bold tracking-tight'>
              Hiếu<span className='text-primary'>Shop</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className='hidden md:flex'>
            <AppNavMenu />
          </nav>

          {/* ACTION BUTTONS */}
          <div className='flex items-center gap-1'>
            {/* Search */}
            <Button variant='ghost' size='icon' aria-label='Search'>
              <Search className='h-5 w-5' />
            </Button>

            {/* Wishlist */}
            <Button
              variant='ghost'
              size='icon'
              className='hidden sm:flex'
              aria-label='Wishlist'
            >
              <Heart className='h-5 w-5' />
            </Button>

            {/* Cart - với badge số lượng */}
            <Button
              variant='ghost'
              size='icon'
              className='relative'
              aria-label={`Cart (${cartItemCount} items)`}
            >
              <ShoppingCart className='h-5 w-5' />
              {cartItemCount > 0 && (
                <span className='absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white'>
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Button>

            {/* User Account */}
            <Button
              variant='ghost'
              size='icon'
              className='hidden sm:flex'
              aria-label='Account'
            >
              <User className='h-5 w-5' />
            </Button>

            {/* Dark Mode Toggle */}
            <ModeToggle />

            {/* Mobile Menu Toggle */}
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label='Toggle menu'
            >
              {mobileOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
          </div>
        </div>

        {/* ---- MOBILE NAVIGATION ---- */}
        <div className='md:hidden'>
          <AppMobileMenu
            isOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
        </div>
      </div>
    </header>
  )
}
