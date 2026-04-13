/**
 * ============================================================
 * FILE: lib/data/mock-data.ts
 * MỤC ĐÍCH: Chứa dữ liệu giả lập (mock) cho products và
 *           categories. Khi tích hợp API thật, chỉ cần thay
 *           đổi endpoints.ts - không cần chỉnh file này.
 * ============================================================
 */

import { Product, Category } from '@/lib/api/types'

// ============================================================
// MOCK CATEGORIES - 4 danh mục chính
// ============================================================
export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets, smartphones, laptops and electronics',
    image:
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80',
    productCount: 150,
    parentId: null
  },
  {
    id: 2,
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing, shoes and accessories for everyone',
    image:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
    productCount: 200,
    parentId: null
  },
  {
    id: 3,
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Furniture, decor and everything for your home',
    image:
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80',
    productCount: 120,
    parentId: null
  },
  {
    id: 4,
    name: 'Sports',
    slug: 'sports',
    description: 'Sports equipment, activewear and outdoor gear',
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
    productCount: 80,
    parentId: null
  }
]

// ============================================================
// MOCK PRODUCTS - 8 sản phẩm mẫu với đầy đủ thông tin
// ============================================================
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones Pro Max',
    description:
      "Experience premium sound quality with our flagship wireless headphones. Featuring active noise cancellation technology that blocks up to 95% of ambient noise. The 40mm custom drivers deliver rich, detailed audio across all frequencies. With 40-hour battery life and quick charge support (10 mins = 3 hours playback), you'll never run out of music. The premium memory foam ear cushions and adjustable headband ensure all-day comfort.",
    shortDescription:
      'Premium wireless headphones with Active Noise Cancellation',
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.8,
    reviews: 234,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80'
    ],
    category: 'Electronics',
    categoryId: 1,
    inStock: true,
    stockQuantity: 45,
    brand: 'TechPro',
    sku: 'WH-PRO-001',
    tags: ['wireless', 'bluetooth', 'headphones', 'audio', 'anc'],
    specifications: {
      'Battery Life': '40 hours',
      'Charging Time': '2 hours',
      'Quick Charge': '10 min = 3 hours',
      'Bluetooth Version': '5.3',
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      Impedance: '32 Ohm',
      Weight: '250g',
      Colors: 'Black, Silver, Midnight Blue'
    },
    isNew: true,
    isFeatured: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Smart Watch Ultra Series 9',
    description:
      'Stay at the peak of health and connectivity with our most advanced smartwatch. The always-on Retina display adapts to ambient light with up to 2000 nits brightness. Advanced health monitoring includes continuous heart rate, blood oxygen, ECG, and crash detection. Built-in GPS provides precise route tracking for runs, cycling, and hikes. Water resistant to 100m depth, perfect for swimming and diving.',
    shortDescription:
      'Advanced health & fitness smartwatch with blood oxygen monitoring',
    price: 449.99,
    originalPrice: 549.99,
    discount: 18,
    rating: 4.6,
    reviews: 189,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'
    ],
    category: 'Electronics',
    categoryId: 1,
    inStock: true,
    stockQuantity: 32,
    brand: 'SmartTech',
    sku: 'SW-ULTRA-9',
    tags: ['smartwatch', 'fitness', 'wearable', 'health', 'gps'],
    specifications: {
      Display: '1.9" AMOLED Always-On Retina',
      'Battery Life': '7 days (18 hours with AOD)',
      'Water Resistance': '100m WR',
      'Health Sensors': 'HR, SpO2, ECG, Temperature',
      GPS: 'Built-in L1/L5 Dual-frequency',
      'Crash Detection': 'Yes',
      Compatibility: 'iOS 16+, Android 10+'
    },
    isNew: true,
    isFeatured: true,
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 3,
    name: 'Full-Grain Leather Backpack Executive',
    description:
      'Handcrafted from premium full-grain Italian leather, this executive backpack combines timeless style with modern functionality. The padded laptop compartment fits up to 15.6" laptops with dedicated sleeve protection. Multiple organizer pockets keep your essentials within reach. Reinforced stitching and solid brass hardware ensure this bag will last for decades. The ergonomic back panel with airflow channels makes it comfortable even during long commutes.',
    shortDescription:
      'Full-grain Italian leather laptop backpack with brass hardware',
    price: 189.99,
    originalPrice: 249.99,
    discount: 24,
    rating: 4.7,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80'
    ],
    category: 'Fashion',
    categoryId: 2,
    inStock: true,
    stockQuantity: 28,
    brand: 'UrbanStyle',
    sku: 'BP-LEATHER-EXE',
    tags: ['backpack', 'leather', 'laptop bag', 'travel', 'executive'],
    specifications: {
      Material: 'Full-Grain Italian Leather',
      'Laptop Compartment': 'Up to 15.6"',
      'Main Pocket': '30L capacity',
      Dimensions: '45 x 30 x 15 cm',
      Weight: '1.2kg',
      Hardware: 'Solid Brass',
      Colors: 'Cognac Brown, Jet Black, Vintage Tan'
    },
    isNew: false,
    isFeatured: true,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 4,
    name: '4K QLED Smart TV 55" Gaming Edition',
    description:
      'Immerse yourself in next-generation entertainment with our 4K QLED Smart TV. Quantum Dot technology delivers 100% DCI-P3 color coverage with over 1 billion colors. The 120Hz native refresh rate with Variable Refresh Rate (VRR) support eliminates screen tearing for buttery-smooth gaming. Four HDMI 2.1 ports support 4K@120fps from PS5, Xbox Series X, and gaming PCs. Dolby Atmos and DTS:X audio processing creates a three-dimensional sound stage.',
    shortDescription:
      '55" QLED 4K Smart TV with 120Hz & Dolby Atmos - Perfect for gaming',
    price: 799.99,
    originalPrice: 999.99,
    discount: 20,
    rating: 4.9,
    reviews: 312,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
      'https://images.unsplash.com/photo-1593359863503-f598870750a4?w=800&q=80'
    ],
    category: 'Electronics',
    categoryId: 1,
    inStock: true,
    stockQuantity: 15,
    brand: 'VisionMax',
    sku: 'TV-55-QLED-G',
    tags: ['tv', '4k', 'qled', 'gaming', 'smart tv', 'dolby'],
    specifications: {
      'Screen Size': '55 inches',
      'Panel Type': 'QLED (Quantum Dot)',
      Resolution: '4K UHD (3840 x 2160)',
      'Refresh Rate': '120Hz Native',
      HDR: 'Quantum HDR 32x, Dolby Vision IQ',
      'HDMI Ports': '4x HDMI 2.1',
      'USB Ports': '3x USB 3.0',
      Audio: '70W 2.2.2ch, Dolby Atmos, DTS:X',
      'Smart Platform': 'Tizen OS 7.0'
    },
    isNew: true,
    isFeatured: true,
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 5,
    name: 'Air Zoom Pro Running Shoes',
    description:
      'Engineered for elite performance, these running shoes feature our latest Air Zoom cushioning system for maximum energy return. The breathable Flyknit upper wraps your foot in a seamless, sock-like fit that adapts to foot shape. The carbon fiber plate in the midsole provides powerful propulsion at toe-off, making them ideal for marathon racing and tempo training sessions. The durable rubber outsole with deep flex grooves provides enhanced grip on both wet and dry surfaces.',
    shortDescription:
      'Carbon-plated marathon racing shoes with Air Zoom cushioning',
    price: 179.99,
    originalPrice: 219.99,
    discount: 18,
    rating: 4.5,
    reviews: 98,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80'
    ],
    category: 'Sports',
    categoryId: 4,
    inStock: true,
    stockQuantity: 67,
    brand: 'SportMax',
    sku: 'SHOES-AIR-PRO',
    tags: ['shoes', 'running', 'marathon', 'carbon', 'racing'],
    specifications: {
      'Upper Material': 'Flyknit + Breathable Mesh',
      Midsole: 'Dual-density Air Zoom foam',
      Plate: 'Full-length Carbon Fiber',
      Outsole: 'Durable Rubber with Flex Grooves',
      'Stack Height': '39.5mm heel / 31.5mm toe',
      Drop: '8mm',
      Weight: '249g (US 10)',
      Sizes: 'US 6 - 15 (Half sizes available)',
      Colors: 'Black/White, Volt Green, University Red'
    },
    isNew: false,
    isFeatured: false,
    createdAt: '2024-01-05T10:00:00Z'
  },
  {
    id: 6,
    name: 'ErgoMax Pro Office Chair',
    description:
      'Designed with NASA-inspired ergonomics research, the ErgoMax Pro provides unparalleled support for 8+ hour work sessions. The adaptive lumbar support automatically adjusts to your spine curvature as you move. The 4D armrests adjust in height, width, depth, and angle to perfectly position your arms. Breathable 3D mesh back prevents heat buildup, while the seat slide function accommodates different leg lengths. BIFMA certified for 300 lbs capacity.',
    shortDescription:
      'NASA-inspired ergonomic chair with adaptive lumbar & 4D armrests',
    price: 449.99,
    originalPrice: 599.99,
    discount: 25,
    rating: 4.7,
    reviews: 145,
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80'
    ],
    category: 'Home & Garden',
    categoryId: 3,
    inStock: true,
    stockQuantity: 23,
    brand: 'ComfortPro',
    sku: 'CHAIR-ERGOMAX-PRO',
    tags: ['chair', 'office', 'ergonomic', 'work from home', 'lumbar'],
    specifications: {
      'Weight Capacity': '300 lbs (BIFMA Certified)',
      'Seat Height': 'Adjustable 17" - 21"',
      'Back Height': 'Adjustable 18" - 22"',
      'Lumbar Support': 'Adaptive (auto-adjusting)',
      Armrests: '4D (height/width/depth/angle)',
      'Back Material': '3D Breathable Mesh',
      'Seat Material': 'High-density foam with mesh',
      Base: 'Aluminum 5-star base',
      Warranty: '10 years parts, 5 years labor'
    },
    isNew: false,
    isFeatured: true,
    createdAt: '2024-01-12T10:00:00Z'
  },
  {
    id: 7,
    name: 'Pro Gaming Mouse X900 Wireless RGB',
    description:
      "Built for competitive gaming, the X900 features our HERO 25K sensor—the world's most precise gaming sensor with zero acceleration, filtering, or smoothing. The ultra-lightweight design at 63g won't fatigue your hand during marathon gaming sessions. The LIGHTSPEED wireless technology provides sub-1ms response rate, faster than most wired mice. Six programmable buttons with onboard memory can store up to 5 profiles for different games and applications.",
    shortDescription:
      'Ultra-lightweight wireless gaming mouse with HERO 25K sensor',
    price: 149.99,
    originalPrice: 179.99,
    discount: 17,
    rating: 4.8,
    reviews: 412,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80'
    ],
    category: 'Electronics',
    categoryId: 1,
    inStock: true,
    stockQuantity: 89,
    brand: 'GameTech',
    sku: 'MOUSE-X900-WL',
    tags: ['mouse', 'gaming', 'wireless', 'rgb', 'esports'],
    specifications: {
      Sensor: 'HERO 25K (100 - 25600 DPI)',
      Wireless: 'LIGHTSPEED 2.4GHz (<1ms)',
      Weight: '63g (without cable)',
      'Battery Life': '70 hours (RGB off)',
      Buttons: '6 programmable',
      'Click Consistency': 'Rated 100M clicks',
      'Onboard Memory': '5 profiles',
      RGB: 'LIGHTSYNC per-zone RGB'
    },
    isNew: true,
    isFeatured: false,
    createdAt: '2024-02-05T10:00:00Z'
  },
  {
    id: 8,
    name: 'Premium Cork Yoga Mat Eco Pro',
    description:
      'Made from sustainably harvested natural cork and natural rubber, this mat is the eco-conscious choice for serious practitioners. The natural antimicrobial properties of cork prevent bacteria and odor buildup. The unique texture gets grippier when wet, making it perfect for hot yoga. The 6mm thickness provides optimal cushioning for joints while maintaining stability. Includes a matching cork yoga block and a recycled cotton carrying strap.',
    shortDescription:
      'Natural cork yoga mat - non-slip, antimicrobial, eco-friendly',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.6,
    reviews: 267,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'
    ],
    category: 'Sports',
    categoryId: 4,
    inStock: true,
    stockQuantity: 124,
    brand: 'EcoFit',
    sku: 'MAT-CORK-YOGI',
    tags: ['yoga', 'cork', 'eco-friendly', 'non-slip', 'hot yoga'],
    specifications: {
      'Top Layer': 'Natural Cork (Sustainably harvested)',
      'Base Layer': 'Natural Rubber (Tree-tapped)',
      Thickness: '6mm',
      Dimensions: '183 x 68 cm (Extra wide)',
      Weight: '2.0kg',
      Features: 'Antimicrobial, Gets grippier when wet',
      Includes: 'Cork block + Recycled cotton strap',
      Certifications: 'OEKO-TEX Standard 100'
    },
    isNew: false,
    isFeatured: false,
    createdAt: '2024-01-08T10:00:00Z'
  }
]
