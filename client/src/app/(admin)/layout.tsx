/**
 * ============================================================
 * FILE: app/(admin)/layout.tsx
 * ROUTE GROUP: (admin) - không ảnh hưởng đến URL
 * MỤC ĐÍCH: Layout với AppSidebar + Navbar cho Admin/Dashboard
 *           Routes trong (admin): /, /settings, /analytics...
 *           Store routes (/home, /products) KHÔNG áp dụng layout này
 * ============================================================
 */

import AppSidebar from '@/components/AppSidebar'
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className='w-full'>
        <Navbar />
        <div className='px-4'>{children}</div>
      </main>
    </SidebarProvider>
  )
}
