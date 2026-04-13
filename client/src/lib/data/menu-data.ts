/**
 * ============================================================
 * FILE: lib/data/menu-data.ts
 *
 * NGUỒN DỮ LIỆU DUY NHẤT cho toàn bộ navigation menu.
 * Component AppMenu.tsx đọc từ đây — chỉ sửa 1 chỗ này
 * là cả desktop (dropdown) lẫn mobile (accordion) tự cập nhật.
 *
 * KIẾN TRÚC TYPE:
 *   NavItem     — node đệ quy, hỗ trợ nest không giới hạn
 *   MenuEntry   — top-level entry (link | dropdown | mega)
 *   menuConfig  — mảng export chính, AppMenu đọc vào đây
 * ============================================================
 */

import {
  type LucideProps,
  BookOpen,
  Bike,
  Baby,
  Camera,
  ChevronRight,
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  Code2,
  Dumbbell,
  FileText,
  Flower2,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  MessageCircle,
  Monitor,
  Puzzle,
  Rss,
  Settings2,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sofa,
  Tent,
  Tv,
  UtensilsCrossed,
  Watch,
  Waves,
  Youtube,
  PenOff
} from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

// ── Kiểu icon dùng chung ──────────────────────────────────────
export type NavIcon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>

// ── NavItem: node đệ quy, hỗ trợ nest không giới hạn ─────────
export interface NavItem {
  label: string
  href?: string // bỏ qua nếu chỉ là tiêu đề nhóm
  icon?: NavIcon
  description?: string // hiển thị dưới label (desktop dropdown)
  badge?: string // "New" | "Hot" | số lượng,...
  children?: NavItem[] // submenu — đệ quy
}

// ── MenuEntry: top-level entry trong thanh nav ────────────────
export type MenuEntry =
  /** Đường link đơn, không dropdown */
  | { type: 'link'; label: string; href: string; icon?: NavIcon }

  /** Dropdown đơn: icon + label (+ optional description) */
  | { type: 'dropdown'; label: string; items: NavItem[]; icon?: NavIcon }

  /**
   * Mega menu: cột trái = danh sách cha → hover → cột phải = children
   * Thêm allHref/allLabel để render link "Xem tất cả"
   */
  | {
      type: 'mega'
      label: string
      items: NavItem[] // mỗi item.children là panel phải
      allHref?: string
      allLabel?: string
      leftLabel?: string // tiêu đề cột trái (mặc định = label)
    }

// ============================================================
// MENU CONFIG — sửa ở đây để cập nhật toàn bộ app
// ============================================================
export const menuConfig: MenuEntry[] = [
  // ── 1. PRODUCTS (mega menu 2-panel) ──────────────────────
  {
    type: 'mega',
    label: 'Products',
    leftLabel: 'Categories',
    allLabel: 'All products',
    allHref: '/home',
    items: [
      {
        label: 'Electronics',
        href: '/category/electronics',
        icon: Monitor,
        description: 'Phones, laptops, TV & more',
        children: [
          {
            label: 'Smartphones',
            href: '/products/smartphones',
            icon: Smartphone
          },
          { label: 'Laptops & PCs', href: '/products/laptops', icon: Monitor },
          { label: 'TV & Display', href: '/products/tv', icon: Tv },
          { label: 'Cameras', href: '/products/cameras', icon: Camera },
          { label: 'Wearables', href: '/products/wearables', icon: Watch },
          {
            label: 'All Electronics',
            href: '/category/electronics',
            icon: ChevronRight
          }
        ]
      },
      {
        label: 'Fashion',
        href: '/category/fashion',
        icon: Shirt,
        description: "Men's, Women's, Kids & accessories"
      },
      {
        label: 'Home & Garden',
        href: '/category/home-garden',
        icon: Sofa,
        description: 'Furniture, kitchen, garden & decor',
        children: [
          { label: 'Furniture', href: '/products/furniture', icon: Sofa },
          {
            label: 'Kitchen & Dining',
            href: '/products/kitchen',
            icon: UtensilsCrossed
          },
          {
            label: 'Garden & Outdoor',
            href: '/products/garden',
            icon: Flower2
          },
          { label: 'Bedding & Bath', href: '/products/bedding', icon: Waves },
          { label: 'Home Decor', href: '/products/decor', icon: Flower2 },
          { label: 'All Home', href: '/category/home', icon: ChevronRight }
        ]
      },
      {
        label: 'Sports',
        href: '/category/sports',
        icon: Bike,
        description: 'Fitness, cycling, outdoor & team sports',
        children: [
          { label: 'Outdoor & Camping', href: '/products/outdoor', icon: Tent },
          { label: 'Fitness & Gym', href: '/products/fitness', icon: Dumbbell },
          { label: 'Cycling', href: '/products/cycling', icon: Bike },
          {
            label: 'Water Sports',
            href: '/products/water-sports',
            icon: Waves
          },
          {
            label: 'Team Sports',
            href: '/products/team-sports',
            icon: CircleIcon
          },
          { label: 'All Sports', href: '/category/sports', icon: ChevronRight }
        ]
      }
    ]
  },

  // ── 2. SOLUTIONS (dropdown đơn, có description) ──────────
  {
    type: 'dropdown',
    label: 'Solutions',
    items: [
      {
        label: 'E-commerce Store',
        href: '/solutions/ecommerce',
        icon: ShoppingBag,
        description: 'Build & manage your online store.'
      },
      {
        label: 'Dashboard',
        href: '/solutions/dashboard',
        icon: LayoutDashboard,
        description: 'Analytics and insights.'
      },
      {
        label: 'Marketing',
        href: '/solutions/marketing',
        icon: Megaphone,
        description: 'Campaigns, email & social.'
      },
      {
        label: 'Integrations',
        href: '/solutions/integrations',
        icon: Puzzle,
        description: 'Connect your favourite tools.'
      },
      {
        label: 'Security',
        href: '/solutions/security',
        icon: ShieldCheck,
        description: 'Protect data & manage access.'
      },
      {
        label: 'Developer API',
        href: '/solutions/api',
        icon: Code2,
        description: 'REST & GraphQL APIs.'
      },
      {
        label: 'Configuration',
        href: '/solutions/config',
        icon: Settings2,
        description: 'Settings, themes & preferences.'
      },
      {
        label: 'Documentation',
        href: '/docs',
        icon: BookOpen,
        description: 'Guides, tutorials & API ref.'
      }
    ]
  },

  // ── 3. RESOURCES (dropdown với nested groups) ────────────
  {
    type: 'dropdown',
    label: 'Resources',
    items: [
      // group: Learn
      {
        label: 'Learn',
        icon: GraduationCap,
        children: [
          { label: 'Documentation', href: '/docs', icon: FileText },
          { label: 'Tutorials', href: '/tutorials', icon: GraduationCap },
          { label: 'Blog', href: '/blog', icon: Rss }
        ]
      },
      // group: Community
      {
        label: 'Community',
        icon: MessageCircle,
        children: [
          { label: 'Forum', href: '/forum', icon: MessageCircle },
          { label: 'Discord', href: '/discord', icon: MessageCircle },
          { label: 'GitHub', href: '/github', icon: Code2 }
        ]
      },
      // group: Media
      {
        label: 'Media',
        icon: Youtube,
        children: [
          { label: 'YouTube Channel', href: '/youtube', icon: Youtube },
          { label: 'Podcast', href: '/podcast', icon: Rss },
          { label: 'Newsletter', href: '/newsletter', icon: MessageCircle }
        ]
      }
    ]
  },

  // ── 4. DOCS (plain link) ──────────────────────────────────
  { type: 'link', label: 'Docs', href: '/docs', icon: BookOpen },

  // ── 5. STATUS (dropdown đơn, có màu icon) ────────────────
  {
    type: 'dropdown',
    label: 'Status',
    items: [
      {
        label: 'All Systems Operational',
        href: '#',
        icon: CircleCheckIcon,
        description: 'text-emerald-500'
      },
      {
        label: 'Incident History',
        href: '#',
        icon: CircleHelpIcon,
        description: 'text-yellow-500'
      },
      { label: 'Subscribe to Updates', href: '#', icon: CircleIcon }
    ]
  },
  {
    type: 'dropdown',
    label: 'Blog',
    items: [
      {
        label: 'About Us',
        href: '#',
        icon: Watch,
        description: 'text-emerald-500'
      }
    ]
  }
]

// ── Các link type='link' dùng cho mobile direct links ────────
export const mobileDirectLinks = menuConfig
  .filter((e): e is Extract<MenuEntry, { type: 'link' }> => e.type === 'link')
  .map((e) => ({ label: e.label, href: e.href }))
