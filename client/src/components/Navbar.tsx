'use client'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Settings, User } from 'lucide-react'
import Link from 'next/link'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ModeToggle } from './mode-toggle'
import { UserMenu } from '@/components/UserMenu'

const Navbar = () => {
  const { setTheme } = useTheme()
  // const { toggleSidebar } = useSidebar()
  return (
    <nav className='flex items-center justify-between border-b p-4'>
      <div className='flex items-center gap-4'>
        <SidebarTrigger />
        <Link
          href='/'
          className='hover:text-primary font-semibold transition-colors'
        >
          Dashboard
        </Link>
      </div>

      <div className='flex items-center gap-2'>
        {/* Sử dụng ModeToggle component đã có */}
        <ModeToggle />

        {/* User Menu - Vẫn cần client vì có interactions */}
        <UserMenu />
      </div>
    </nav>
  )
}
export default Navbar
