/**
 * ============================================================
 * FILE: components/ecommerce/StoreFooter.tsx
 * LOẠI: Server Component
 * MỤC ĐÍCH: Footer của trang e-commerce
 *           - Company info + social links
 *           - Quick links navigation
 *           - Customer service links
 *           - Contact information
 *           - Copyright + policy links
 * ============================================================
 */

import Link from 'next/link'
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShoppingBag
} from 'lucide-react'

// ============================================================
// FOOTER DATA
// ============================================================
const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' },
    { label: 'Affiliate Program', href: '/affiliate' }
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Track Order', href: '/track' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' }
  ]
}

const socialLinks = [
  {
    icon: Facebook,
    label: 'Facebook',
    href: '#',
    color: 'hover:text-blue-500'
  },
  { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-sky-400' },
  {
    icon: Instagram,
    label: 'Instagram',
    href: '#',
    color: 'hover:text-pink-500'
  },
  { icon: Youtube, label: 'Youtube', href: '#', color: 'hover:text-red-500' }
]

export default function StoreFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-muted/30 border-t'>
      {/* MAIN FOOTER */}
      <div className='container py-12'>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-5'>
          {/* Brand Column */}
          <div className='sm:col-span-2'>
            {/* Logo */}
            <Link href='/home' className='mb-4 flex items-center gap-2'>
              <ShoppingBag className='text-primary h-6 w-6' />
              <span className='text-xl font-bold'>
                Hiệu<span className='text-primary'>Shop</span>
              </span>
            </Link>

            <p className='text-muted-foreground mb-6 max-w-xs text-sm leading-relaxed'>
              Your trusted online shopping destination. We offer thousands of
              quality products at competitive prices with fast shipping and easy
              returns.
            </p>

            {/* Social Links */}
            <div className='flex gap-3'>
              {socialLinks.map(({ icon: Icon, label, href, color }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`bg-background text-muted-foreground flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${color}`}
                >
                  <Icon className='h-4 w-4' />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='mb-4 text-sm font-bold tracking-wider uppercase'>
              Company
            </h3>
            <ul className='space-y-2.5'>
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className='mb-4 text-sm font-bold tracking-wider uppercase'>
              Support
            </h3>
            <ul className='space-y-2.5'>
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='mb-4 text-sm font-bold tracking-wider uppercase'>
              Contact
            </h3>
            <ul className='space-y-3'>
              <li className='text-muted-foreground flex items-start gap-2.5 text-sm'>
                <MapPin className='text-primary mt-0.5 h-4 w-4 shrink-0' />
                <span>123 Commerce Street, Ho Chi Minh City, Vietnam</span>
              </li>
              <li className='text-muted-foreground flex items-center gap-2.5 text-sm'>
                <Phone className='text-primary h-4 w-4 shrink-0' />
                <Link href='tel:+8428123456' className='hover:text-foreground'>
                  +84 28 1234 5678
                </Link>
              </li>
              <li className='text-muted-foreground flex items-center gap-2.5 text-sm'>
                <Mail className='text-primary h-4 w-4 shrink-0' />
                <Link
                  href='mailto:support@hieushop.com'
                  className='hover:text-foreground'
                >
                  support@hieushop.com
                </Link>
              </li>
              <li className='text-muted-foreground flex items-center gap-2.5 text-sm'>
                <Clock className='text-primary h-4 w-4 shrink-0' />
                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className='border-t'>
        <div className='container flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-muted-foreground text-sm'>
            © {currentYear} HiệuShop. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className='flex flex-wrap gap-4'>
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-muted-foreground hover:text-foreground text-xs transition-colors'
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Payment methods */}
          <div className='flex items-center gap-2'>
            <span className='text-muted-foreground text-xs'>We accept:</span>
            {['VISA', 'MC', 'PayPal', 'MoMo'].map((method) => (
              <span
                key={method}
                className='bg-background text-muted-foreground rounded border px-2 py-0.5 text-xs font-medium'
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
