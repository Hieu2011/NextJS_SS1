/**
 * ============================================================
 * FILE: app/products/[id]/page.tsx
 * LOẠI: Server Component (async)
 * MỤC ĐÍCH: Product Detail Page
 *           - Dynamic route: /products/1, /products/2, etc.
 *           - Fetch product bằng ID từ URL params ở server
 *           - Image gallery (main + thumbnails)
 *           - Tabs: Description / Specs / Reviews
 *           - AddToCartButton (Client Component)
 *           - Related products
 *
 * ROUTE: /products/[id]
 * ============================================================
 */

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import StoreHeader from '@/components/ecommerce/StoreHeader'
import StoreFooter from '@/components/ecommerce/StoreFooter'
import FeaturedProducts from '@/components/ecommerce/FeaturedProducts'
import AddToCartButton from '@/components/ecommerce/AddToCartButton'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { productApi } from '@/lib/api/endpoints'
import {
  Star,
  StarHalf,
  ChevronRight,
  Shield,
  Truck,
  RefreshCw,
  Package
} from 'lucide-react'

// ============================================================
// PAGE PROPS - Next.js inject params từ dynamic segment [id]
// ============================================================
interface ProductPageProps {
  params: Promise<{ id: string }> // Next.js 15+: params là Promise
}

// ============================================================
// HELPER: Render star rating
// ============================================================
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating) // 4 full stars if 4.5
  const hasHalf = rating % 1 >= 0.5 // true if 4.5

  return (
    <div className='flex items-center gap-0.5'>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return (
            <Star key={i} className='h-4 w-4 fill-yellow-400 text-yellow-400' />
          )
        } else if (i === fullStars && hasHalf) {
          return (
            <StarHalf
              key={i}
              className='h-4 w-4 fill-yellow-400 text-yellow-400'
            />
          )
        } else {
          return (
            <Star
              key={i}
              className='fill-muted text-muted-foreground/30 h-4 w-4'
            />
          )
        }
      })}
    </div>
  )
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default async function ProductDetailPage({ params }: ProductPageProps) {
  // Next.js 15+: await params trước khi dùng
  const { id } = await params

  // Fetch product + related products song song
  const [productResponse, relatedResponse] = await Promise.all([
    productApi.getById(Number(id)), // Convert string URL param to number
    productApi.getFeatured() // Related products = featured products (could filter by category)
  ])

  // Nếu product không tồn tại → 404
  if (productResponse.IsError || !productResponse.ResultObject) {
    notFound()
  }

  const product = productResponse.ResultObject
  // Related = tất cả sản phẩm trừ sản phẩm hiện tại, max 4
  const relatedProducts = (relatedResponse.ResultObject ?? [])
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <div className='flex min-h-screen flex-col'>
      <StoreHeader />

      <main className='flex-1'>
        {/* ---- BREADCRUMB ---- */}
        <div className='border-b'>
          <div className='container py-3'>
            <nav
              aria-label='breadcrumb'
              className='text-muted-foreground flex items-center gap-1 text-sm'
            >
              <Link
                href='/home'
                className='hover:text-foreground transition-colors'
              >
                Home
              </Link>
              <ChevronRight className='h-3.5 w-3.5' />
              <span className='hover:text-foreground cursor-pointer transition-colors'>
                {product.category}
              </span>
              <ChevronRight className='h-3.5 w-3.5' />
              <span className='text-foreground line-clamp-1 max-w-[200px]'>
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* ---- PRODUCT INFO SECTION ---- */}
        <section className='container py-10'>
          <div className='grid gap-10 lg:grid-cols-2'>
            {/* ---- LEFT: IMAGE GALLERY ---- */}
            <div className='space-y-3'>
              {/* Main image */}
              <div className='bg-muted relative aspect-square overflow-hidden rounded-2xl border'>
                <Image
                  src={product.images[0] || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className='object-cover'
                  priority
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
                {/* Badges overlay */}
                <div className='absolute top-3 left-3 flex flex-col gap-2'>
                  {product.isNew && (
                    <Badge className='bg-emerald-500 hover:bg-emerald-500'>
                      NEW
                    </Badge>
                  )}
                  {product.discount > 0 && (
                    <Badge variant='destructive'>-{product.discount}%</Badge>
                  )}
                  {product.stockQuantity === 0 && (
                    <Badge variant='secondary'>Sold Out</Badge>
                  )}
                </div>
              </div>

              {/* Thumbnail row */}
              {product.images.length > 1 && (
                <div className='flex gap-2 overflow-x-auto pb-1'>
                  {product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className='hover:border-primary relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 border-transparent transition-colors'
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        fill
                        className='object-cover'
                        sizes='80px'
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ---- RIGHT: PRODUCT DETAILS ---- */}
            <div className='space-y-5'>
              {/* Brand + Category */}
              <div className='flex items-center gap-2'>
                <Badge variant='outline'>{product.brand}</Badge>
                <Badge variant='outline' className='text-muted-foreground'>
                  {product.category}
                </Badge>
              </div>

              {/* Product Name */}
              <h1 className='text-3xl leading-tight font-bold'>
                {product.name}
              </h1>

              {/* Rating */}
              <div className='flex items-center gap-3'>
                <StarRating rating={product.rating} />
                <span className='text-sm font-medium'>
                  {product.rating.toFixed(1)}
                </span>
                <span className='text-muted-foreground text-sm'>
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              <Separator />

              {/* Price */}
              <div className='flex items-baseline gap-3'>
                <span className='text-4xl font-bold'>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className='text-muted-foreground text-xl line-through'>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discount > 0 && (
                  <Badge variant='destructive' className='text-sm'>
                    Save {product.discount}%
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className='text-muted-foreground leading-relaxed'>
                {product.description}
              </p>

              {/* SKU */}
              <p className='text-muted-foreground text-xs'>
                SKU: <span className='font-mono'>{product.sku}</span>
              </p>

              <Separator />

              {/* Add to Cart - CLIENT COMPONENT */}
              <AddToCartButton product={product} />

              <Separator />

              {/* Trust badges */}
              <div className='grid grid-cols-2 gap-3'>
                {[
                  {
                    icon: Truck,
                    title: 'Free Shipping',
                    desc: 'On orders over $50'
                  },
                  {
                    icon: RefreshCw,
                    title: '30-Day Returns',
                    desc: 'Hassle free returns'
                  },
                  {
                    icon: Shield,
                    title: 'Secure Payment',
                    desc: 'SSL encrypted checkout'
                  },
                  {
                    icon: Package,
                    title: 'In Stock',
                    desc: `${product.stockQuantity} available`
                  }
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className='flex items-start gap-2 rounded-xl border p-3'
                  >
                    <Icon className='text-primary mt-0.5 h-4 w-4 shrink-0' />
                    <div>
                      <p className='text-xs font-semibold'>{title}</p>
                      <p className='text-muted-foreground text-xs'>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  <span className='text-muted-foreground text-xs font-medium'>
                    Tags:
                  </span>
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant='secondary' className='text-xs'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ---- TABS: Description / Specs / Reviews ---- */}
        <section className='border-t'>
          <div className='container py-10'>
            <Tabs defaultValue='description'>
              <TabsList className='mb-6'>
                <TabsTrigger value='description'>Description</TabsTrigger>
                <TabsTrigger value='specs'>Specifications</TabsTrigger>
                <TabsTrigger value='reviews'>
                  Reviews ({product.reviews})
                </TabsTrigger>
              </TabsList>

              {/* Description Tab */}
              <TabsContent value='description' className='space-y-4'>
                <p className='text-muted-foreground leading-relaxed'>
                  {product.description}
                </p>
                <p className='text-muted-foreground leading-relaxed'>
                  Whether you are a professional or a casual enthusiast, the{' '}
                  <strong>{product.name}</strong> delivers exceptional quality
                  and performance. Designed with premium materials and
                  cutting-edge technology, this product offers an unparalleled
                  user experience.
                </p>
              </TabsContent>

              {/* Specs Tab */}
              <TabsContent value='specs'>
                <div className='max-w-xl'>
                  <table className='w-full text-sm'>
                    <tbody>
                      {product.specifications ? (
                        Object.entries(product.specifications).map(
                          ([key, val]) => (
                            <tr key={key} className='border-b'>
                              <td className='text-muted-foreground w-40 py-3 pr-6 font-medium capitalize'>
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </td>
                              <td className='py-3'>{String(val)}</td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td className='text-muted-foreground py-3'>
                            No specifications available.
                          </td>
                        </tr>
                      )}
                      {/* Always show Brand + Category */}
                      <tr className='border-b'>
                        <td className='text-muted-foreground w-40 py-3 pr-6 font-medium'>
                          Brand
                        </td>
                        <td className='py-3'>{product.brand}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='text-muted-foreground w-40 py-3 pr-6 font-medium'>
                          Category
                        </td>
                        <td className='py-3'>{product.category}</td>
                      </tr>
                      <tr>
                        <td className='text-muted-foreground w-40 py-3 pr-6 font-medium'>
                          SKU
                        </td>
                        <td className='py-3 font-mono'>{product.sku}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value='reviews'>
                <div className='space-y-6'>
                  {/* Aggregate rating */}
                  <div className='bg-muted/30 flex items-center gap-6 rounded-2xl border p-6'>
                    <div className='text-center'>
                      <div className='text-6xl font-bold'>
                        {product.rating.toFixed(1)}
                      </div>
                      <StarRating rating={product.rating} />
                      <p className='text-muted-foreground mt-1 text-sm'>
                        {product.reviews.toLocaleString()} reviews
                      </p>
                    </div>
                    <Separator orientation='vertical' className='h-20' />
                    {/* Rating bars */}
                    <div className='flex-1 space-y-2'>
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div
                          key={star}
                          className='flex items-center gap-3 text-sm'
                        >
                          <span className='text-muted-foreground w-3'>
                            {star}
                          </span>
                          <Star className='h-3.5 w-3.5 fill-yellow-400 text-yellow-400' />
                          <div className='bg-muted relative h-2 flex-1 overflow-hidden rounded-full'>
                            <div
                              className='absolute inset-y-0 left-0 rounded-full bg-yellow-400'
                              style={{
                                width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Placeholder reviews */}
                  <p className='text-muted-foreground text-sm'>
                    Reviews are loading from our API...
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* ---- RELATED PRODUCTS ---- */}
        {relatedProducts.length > 0 && (
          <section className='bg-muted/30 py-12'>
            <div className='container'>
              <h2 className='mb-6 text-2xl font-bold'>You May Also Like</h2>
              <Suspense
                fallback={
                  <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className='aspect-square rounded-2xl' />
                    ))}
                  </div>
                }
              >
                <FeaturedProducts products={relatedProducts} />
              </Suspense>
            </div>
          </section>
        )}
      </main>

      <StoreFooter />
    </div>
  )
}
