'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ChevronLeft, ChevronRight, Tag } from 'lucide-react'

// ── Cấu hình thời gian — chỉnh 1 chỗ này để đồng bộ toàn bộ ─
const SLIDE_DURATION = 4000 // ms
const SLIDE_DURATION_S = `${SLIDE_DURATION / 1000}s`

// ── Danh sách slide — đổi src thành ảnh thực của bạn ─────────
const SLIDES = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=80',
    alt: 'Summer Sale Electronics',
    badge: 'Summer Sale 2024 — Up to 50% OFF',
    heading: (
      <>
        Shop the Latest <span className='text-yellow-300'>Trends</span>
        <br />
        at Best Prices
      </>
    ),
    sub: 'Discover thousands of products across all categories. Free shipping on orders over $50.',
    cta: { label: 'Shop Now', href: '/products' },
    ctaAlt: { label: 'View Sale Items', href: '/products?sale=true' }
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80',
    alt: 'Fashion Collection',
    badge: 'New Arrivals — Spring 2024',
    heading: (
      <>
        Fresh Styles for <span className='text-emerald-300'>Every Season</span>
        <br />
        at Unbeatable Prices
      </>
    ),
    sub: 'Explore the latest fashion trends for men, women & kids. New collection drops every week.',
    cta: { label: 'Explore Fashion', href: '/products?category=fashion' },
    ctaAlt: { label: 'New Arrivals', href: '/products?new=true' }
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80',
    alt: 'Electronics Deals',
    badge: 'Tech Deals — Limited Time',
    heading: (
      <>
        Top Tech at <span className='text-sky-300'>Lowest Prices</span>
        <br />
        Guaranteed
      </>
    ),
    sub: 'Phones, laptops, TVs and more. Price-match guarantee on all electronics.',
    cta: { label: 'Shop Electronics', href: '/products?category=electronics' },
    ctaAlt: { label: "Today's Deals", href: '/products?deals=true' }
  }
]

export default function Hero() {
  const [current, setCurrent] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const total = SLIDES.length

  // Auto-slide mỗi 5s, dừng khi hover
  React.useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [paused, total])

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  const slide = SLIDES[current]

  return (
    <section
      className='relative h-[520px] overflow-hidden md:h-[580px] lg:h-[640px]'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slides ── */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          {/* key thay đổi khi slide này trở thành active → remount → restart Ken Burns */}
          <div
            key={i === current ? `kb-${current}` : i}
            className='absolute inset-0 animate-[kenburns_1s_ease-out_forwards]'
            style={{ animationDuration: SLIDE_DURATION_S }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes='100vw'
              className='object-cover'
            />
          </div>
          {/* Dark overlay để text dễ đọc */}
          <div className='absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent' />
        </div>
      ))}

      {/* ── Content overlay ── */}
      <div className='relative flex h-full items-center'>
        <div className='container'>
          {/* key={current} → remount mỗi lần đổi slide → restart animation */}
          <div key={current} className='max-w-2xl text-white'>
            <Badge className='mb-4 inline-flex animate-[slideUpFade_0.5s_ease_forwards] border-white/30 bg-white/20 text-white opacity-0 backdrop-blur hover:bg-white/30'>
              <Tag className='mr-1.5 h-3 w-3' />
              {slide.badge}
            </Badge>

            <h1 className='mb-4 animate-[slideUpFade_0.5s_0.1s_ease_forwards] text-4xl leading-tight font-extrabold tracking-tight opacity-0 sm:text-5xl lg:text-6xl'>
              {slide.heading}
            </h1>

            <p className='mb-8 max-w-xl animate-[slideUpFade_0.5s_0.2s_ease_forwards] text-lg text-white/80 opacity-0 sm:text-xl'>
              {slide.sub}
            </p>

            <div className='flex animate-[slideUpFade_0.5s_0.3s_ease_forwards] flex-wrap gap-4 opacity-0'>
              <Button
                asChild
                size='lg'
                className='bg-white font-semibold text-gray-900 hover:bg-white/90'
              >
                <Link href={slide.cta.href}>
                  {slide.cta.label}
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button
                asChild
                size='lg'
                variant='outline'
                className='border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20'
              >
                <Link href={slide.ctaAlt.href}>{slide.ctaAlt.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        onClick={prev}
        aria-label='Previous slide'
        className='absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50'
      >
        <ChevronLeft className='h-5 w-5' />
      </button>
      <button
        onClick={next}
        aria-label='Next slide'
        className='absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50'
      >
        <ChevronRight className='h-5 w-5' />
      </button>

      {/* ── Dot indicators ── */}
      <div className='absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2'>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* ── Progress bar ── */}
      {!paused && (
        <div
          key={current}
          className='absolute bottom-0 left-0 h-0.5 animate-[progress_1s_linear_forwards] bg-white/70'
          style={{ animationDuration: SLIDE_DURATION_S }}
        />
      )}
    </section>
  )
}
