import { MenuV2 } from '@/components/MenuV2'
import { NavigationMenuDemo } from '@/components/NavigationMenuDemo'

const HomePage = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Header - Sticky top */}
      <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
        <div className='container flex h-16 items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <span className='text-xl font-bold'>ShopName</span>
          </div>

          {/* Navigation Menu */}
          <nav className='hidden md:flex'>
            <NavigationMenuDemo />
          </nav>

          {/* Actions: Search, Cart, User */}
          <div className='flex items-center gap-4'>
            {/* Search button */}
            <button className='hover:bg-accent rounded-md p-2'>🔍</button>
            {/* Cart */}
            <button className='hover:bg-accent relative rounded-md p-2'>
              🛒
              <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                3
              </span>
            </button>
            {/* User */}
            <button className='hover:bg-accent rounded-md p-2'>👤</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1'>
        {/* Hero Section / Banner */}
        <section className='bg-gradient-to-r from-purple-500 to-pink-500 py-20'>
          <div className='container'>
            <div className='max-w-2xl text-white'>
              <h1 className='mb-4 text-5xl font-bold'>Summer Sale 2024</h1>
              <p className='mb-6 text-xl'>Up to 50% off on selected items</p>
              <button className='rounded-lg bg-white px-8 py-3 font-semibold text-purple-600 transition-transform hover:scale-105'>
                Shop Now
              </button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className='container py-16'>
          <h2 className='mb-8 text-3xl font-bold'>Shop by Category</h2>
          <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {/* Category Card */}
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className='group cursor-pointer overflow-hidden rounded-lg border transition-shadow hover:shadow-lg'
              >
                <div className='aspect-square bg-gray-200'>
                  <img
                    src={`https://via.placeholder.com/300`}
                    alt='Category'
                    className='h-full w-full object-cover transition-transform group-hover:scale-110'
                  />
                </div>
                <div className='p-4'>
                  <h3 className='font-semibold'>Category {item}</h3>
                  <p className='text-muted-foreground text-sm'>100+ products</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className='bg-muted/30 py-16'>
          <div className='container'>
            <div className='mb-8 flex items-center justify-between'>
              <h2 className='text-3xl font-bold'>Featured Products</h2>
              <button className='text-primary hover:underline'>
                View All →
              </button>
            </div>
            <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {/* Product Card */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className='group bg-background overflow-hidden rounded-lg border transition-shadow hover:shadow-lg'
                >
                  {/* Product Image */}
                  <div className='relative aspect-square overflow-hidden bg-gray-200'>
                    <img
                      src={`https://via.placeholder.com/300`}
                      alt='Product'
                      className='h-full w-full object-cover transition-transform group-hover:scale-110'
                    />
                    {/* Badges */}
                    <div className='absolute top-2 left-2 flex flex-col gap-2'>
                      <span className='rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white'>
                        -20%
                      </span>
                      <span className='rounded-md bg-green-500 px-2 py-1 text-xs font-semibold text-white'>
                        NEW
                      </span>
                    </div>
                    {/* Quick Actions */}
                    <div className='absolute top-2 right-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100'>
                      <button className='rounded-full bg-white p-2 shadow-md hover:bg-gray-100'>
                        ❤️
                      </button>
                      <button className='rounded-full bg-white p-2 shadow-md hover:bg-gray-100'>
                        👁️
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className='p-4'>
                    <h3 className='mb-2 line-clamp-2 font-semibold'>
                      Product Name {item}
                    </h3>
                    <div className='mb-2 flex items-center gap-1 text-sm'>
                      <span className='text-yellow-500'>⭐⭐⭐⭐⭐</span>
                      <span className='text-muted-foreground'>(45)</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <span className='text-xl font-bold'>$99.99</span>
                        <span className='text-muted-foreground text-sm line-through'>
                          $129.99
                        </span>
                      </div>
                      <button className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1 text-sm font-semibold'>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className='bg-primary text-primary-foreground py-16'>
          <div className='container text-center'>
            <h2 className='mb-4 text-3xl font-bold'>Subscribe to Newsletter</h2>
            <p className='mb-6 text-lg'>
              Get latest updates and exclusive offers
            </p>
            <div className='mx-auto flex max-w-md gap-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='text-foreground flex-1 rounded-md px-4 py-3'
              />
              <button className='bg-background text-foreground hover:bg-background/90 rounded-md px-6 py-3 font-semibold'>
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='bg-muted/30 border-t'>
        <div className='container py-12'>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {/* Company Info */}
            <div>
              <h3 className='mb-4 text-lg font-bold'>ShopName</h3>
              <p className='text-muted-foreground mb-4 text-sm'>
                Your trusted online shopping destination
              </p>
              <div className='flex gap-4'>
                <button className='hover:text-primary'>📘</button>
                <button className='hover:text-primary'>🐦</button>
                <button className='hover:text-primary'>📷</button>
                <button className='hover:text-primary'>▶️</button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className='mb-4 text-lg font-bold'>Quick Links</h3>
              <ul className='text-muted-foreground space-y-2 text-sm'>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    About Us
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Contact
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    FAQ
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className='mb-4 text-lg font-bold'>Customer Service</h3>
              <ul className='text-muted-foreground space-y-2 text-sm'>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Returns
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Track Order
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className='mb-4 text-lg font-bold'>Contact Us</h3>
              <ul className='text-muted-foreground space-y-2 text-sm'>
                <li>📍 123 Street, City, Country</li>
                <li>📞 +1 234 567 890</li>
                <li>✉️ support@shopname.com</li>
                <li>⏰ Mon-Fri: 9AM - 6PM</li>
              </ul>
            </div>
          </div>

          <div className='text-muted-foreground mt-8 border-t pt-8 text-center text-sm'>
            <p>© 2024 ShopName. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
