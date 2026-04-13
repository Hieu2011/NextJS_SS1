/**
 * ============================================================
 * FILE: components/ecommerce/AddToCartButton.tsx
 * LOẠI: Client Component ('use client')
 * MỤC ĐÍCH: Button "Add to Cart" dùng trong trang product detail
 *           - Có quantity selector (+/-)
 *           - Loading state khi đang gọi API
 *           - Hiển thị trạng thái out of stock
 *           - Toast notification tự động từ endpoints.ts
 * ============================================================
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Loader2, Plus, Minus } from 'lucide-react'
import { cartApi } from '@/lib/api/endpoints'
import type { Product } from '@/lib/api/types'

// ============================================================
// PROPS
// ============================================================
interface AddToCartButtonProps {
  product: Product
  className?: string // CSS class override
}

export default function AddToCartButton({
  product,
  className = ''
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1) // Số lượng muốn mua
  const [isLoading, setIsLoading] = useState(false) // Loading state

  // ----------------------------------------------------------
  // HANDLER: Tăng số lượng (không vượt quá tồn kho)
  // ----------------------------------------------------------
  const increaseQty = () => {
    if (quantity < product.stockQuantity) {
      setQuantity((q) => q + 1)
    }
  }

  // ----------------------------------------------------------
  // HANDLER: Giảm số lượng (không nhỏ hơn 1)
  // ----------------------------------------------------------
  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1)
    }
  }

  // ----------------------------------------------------------
  // HANDLER: Gọi API thêm vào giỏ hàng
  // Toast notification được xử lý bên trong cartApi.addItem()
  // ----------------------------------------------------------
  const handleAddToCart = async () => {
    if (isLoading || !product.inStock) return

    setIsLoading(true)
    try {
      await cartApi.addItem({ productId: product.id, quantity })
    } finally {
      setIsLoading(false)
    }
  }

  // ---- TRƯỜNG HỢP OUT OF STOCK ----
  if (!product.inStock) {
    return (
      <Button
        disabled
        size='lg'
        className={`w-full ${className}`}
        variant='secondary'
      >
        <ShoppingCart className='mr-2 h-5 w-5' />
        Out of Stock
      </Button>
    )
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* QUANTITY SELECTOR */}
      <div className='flex items-center gap-3'>
        <span className='text-muted-foreground text-sm font-medium'>
          Quantity:
        </span>
        <div className='flex items-center rounded-lg border'>
          <Button
            variant='ghost'
            size='icon'
            className='h-10 w-10 rounded-r-none'
            onClick={decreaseQty}
            disabled={quantity <= 1 || isLoading}
            aria-label='Decrease quantity'
          >
            <Minus className='h-4 w-4' />
          </Button>

          {/* Số lượng hiện tại */}
          <span className='flex h-10 w-12 items-center justify-center text-sm font-semibold'>
            {quantity}
          </span>

          <Button
            variant='ghost'
            size='icon'
            className='h-10 w-10 rounded-l-none'
            onClick={increaseQty}
            disabled={quantity >= product.stockQuantity || isLoading}
            aria-label='Increase quantity'
          >
            <Plus className='h-4 w-4' />
          </Button>
        </div>

        {/* Hiển thị tồn kho thấp */}
        {product.stockQuantity <= 10 && (
          <span className='text-xs font-medium text-orange-500'>
            Only {product.stockQuantity} left
          </span>
        )}
      </div>

      {/* ADD TO CART BUTTON */}
      <Button
        onClick={handleAddToCart}
        disabled={isLoading}
        size='lg'
        className='w-full gap-2'
      >
        {isLoading ? (
          <>
            <Loader2 className='h-5 w-5 animate-spin' />
            Adding to Cart...
          </>
        ) : (
          <>
            <ShoppingCart className='h-5 w-5' />
            Add to Cart — ${(product.price * quantity).toFixed(2)}
          </>
        )}
      </Button>

      {/* BUY NOW BUTTON */}
      <Button
        variant='outline'
        size='lg'
        className='w-full'
        disabled={isLoading}
        onClick={() => {
          // TODO: Implement buy now flow
          handleAddToCart()
        }}
      >
        Buy Now
      </Button>
    </div>
  )
}
