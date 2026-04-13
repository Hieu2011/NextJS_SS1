/**
 * ============================================================
 * FILE: components/ecommerce/ProductCard.tsx
 * LOẠI: Client Component ('use client')
 * MỤC ĐÍCH: Card hiển thị thông tin 1 sản phẩm
 *           - Ảnh với các badges (NEW, SALE, %)
 *           - Quick action buttons (wishlist, quick view)
 *           - Thông tin: tên, rating, giá
 *           - Button "Add to Cart" inline
 *           - Link đến trang chi tiết sản phẩm
 * ============================================================
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Eye, Star, ShoppingCart, Loader2 } from 'lucide-react'
import { cartApi } from '@/lib/api/endpoints'
import type { Product } from '@/lib/api/types'

// ============================================================
// PROPS
// ============================================================
interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // State loading cho nút Add to Cart
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  // State wishlist (local - TODO: kết nối global state)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // ----------------------------------------------------------
  // HANDLER: Thêm vào giỏ hàng
  // - Show loading state trong khi gọi API
  // - Toast success/error được xử lý trong endpoints.ts
  // ----------------------------------------------------------
  const handleAddToCart = async (e: React.MouseEvent) => {
    // Ngăn link click event lan bubble lên
    e.preventDefault()
    e.stopPropagation()

    if (isAddingToCart) return

    setIsAddingToCart(true)
    try {
      await cartApi.addItem({ productId: product.id, quantity: 1 })
    } finally {
      setIsAddingToCart(false)
    }
  }

  // ----------------------------------------------------------
  // HANDLER: Toggle wishlist
  // ----------------------------------------------------------
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className='group bg-background flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl'
    >
      {/* ---- PRODUCT IMAGE ---- */}
      <div className='bg-muted relative aspect-square overflow-hidden'>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
          className='object-cover transition-transform duration-300 group-hover:scale-105'
        />

        {/* BADGES - góc trái trên */}
        <div className='absolute top-3 left-3 flex flex-col gap-1.5'>
          {product.isNew && (
            <Badge className='bg-green-500 text-white shadow-md'>NEW</Badge>
          )}
          {product.discount > 0 && (
            <Badge className='bg-red-500 text-white shadow-md'>
              -{product.discount}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant='secondary' className='shadow-md'>
              Sold Out
            </Badge>
          )}
        </div>

        {/* QUICK ACTIONS - góc phải trên, hiện khi hover */}
        <div className='absolute top-3 right-3 flex translate-x-2 flex-col gap-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100'>
          {/* Wishlist button */}
          <Button
            size='icon'
            variant='secondary'
            className='h-9 w-9 rounded-full shadow-md backdrop-blur-sm'
            onClick={handleWishlist}
            aria-label={
              isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
            }
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isWishlisted ? 'fill-red-500 text-red-500' : ''
              }`}
            />
          </Button>

          {/* Quick view button */}
          <Button
            size='icon'
            variant='secondary'
            className='h-9 w-9 rounded-full shadow-md backdrop-blur-sm'
            aria-label='Quick view'
            onClick={(e) => e.preventDefault()}
          >
            <Eye className='h-4 w-4' />
          </Button>
        </div>

        {/* ADD TO CART overlay - hiện ở bottom khi hover */}
        <div className='absolute right-0 bottom-0 left-0 translate-y-full opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100'>
          <Button
            className='h-10 w-full rounded-none rounded-b-none'
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            size='sm'
          >
            {isAddingToCart ? (
              <>
                <Loader2 className='mr-2 h-3.5 w-3.5 animate-spin' />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className='mr-2 h-3.5 w-3.5' />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ---- PRODUCT INFO ---- */}
      <div className='flex flex-1 flex-col gap-2 p-4'>
        {/* Brand */}
        <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
          {product.brand}
        </p>

        {/* Product Name */}
        <h3 className='group-hover:text-primary line-clamp-2 text-sm leading-snug font-semibold transition-colors'>
          {product.name}
        </h3>

        {/* Rating */}
        <div className='flex items-center gap-1.5'>
          <div className='flex'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : i < product.rating
                      ? 'fill-yellow-200 text-yellow-400'
                      : 'fill-muted text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className='text-muted-foreground text-xs'>
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className='mt-auto flex items-center justify-between'>
          <div className='flex items-baseline gap-2'>
            <span className='text-lg font-bold'>
              ${product.price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className='text-muted-foreground text-sm line-through'>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock indicator */}
          {product.stockQuantity <= 10 && product.inStock && (
            <span className='text-xs font-medium text-orange-500'>
              Only {product.stockQuantity} left!
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
