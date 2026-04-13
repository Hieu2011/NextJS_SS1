/**
 * ============================================================
 * FILE: components/AppMenu.tsx
 *
 * Component menu THỐNG NHẤT — đọc data từ menu-data.ts, render
 * khác nhau trên desktop vs mobile.
 *
 * EXPORTS:
 *   AppNavMenu     — desktop NavigationMenu (shadcn style)
 *   AppMobileMenu  — mobile accordion (dùng trong StoreHeader)
 *
 * CÁCH DÙNG:
 *   // Desktop (trong header)
 *   <AppNavMenu />
 *
 *   // Mobile (toggle bằng hamburger bên ngoài)
 *   <AppMobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
 *
 * TRƯỜNG HỢP SUBMENU:
 *   mega     → 2-panel (trái: cha, phải: con hiện khi hover)
 *   dropdown → danh sách đơn; nếu item.children tồn tại → section group
 *   link     → NavigationMenuLink thẳng, không dropdown
 * ============================================================
 */

'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'

import { useIsMobile } from '@/hooks/use-mobile'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { menuConfig, type MenuEntry, type NavItem } from '@/lib/data/menu-data'

// ── Shared item classname — icon + label 1 dòng ────────────
const ITEM =
  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm whitespace-nowrap transition-colors select-none'
const ITEM_HOVER = `${ITEM} hover:bg-accent hover:text-accent-foreground cursor-pointer`

// row item dùng trong panel desktop
const ROW =
  'group flex flex-row items-center gap-2 rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition-colors hover:bg-accent hover:text-accent-foreground'

// ============================================================
// DESKTOP — NavigationMenu (shadcn)
// ============================================================
export function AppNavMenu() {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className='flex-wrap'>
        {menuConfig.map((entry) => (
          <DesktopEntry key={entry.label} entry={entry} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

// ── Desktop: dispatch theo entry.type ────────────────────────
function DesktopEntry({ entry }: { entry: MenuEntry }) {
  // ── plain link ──
  if (entry.type === 'link') {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href={entry.href}>{entry.label}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  // ── mega menu — hover trái → panel phải hiện sub-items ──
  if (entry.type === 'mega') {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{entry.label}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <MegaPanel entry={entry} />
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  // ── dropdown (flat hoặc grouped) ──
  if (entry.type === 'dropdown') {
    const isGrouped = entry.items.some((i) => !i.href && i.children)
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{entry.label}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className='w-52 p-1.5'>
            {isGrouped
              ? entry.items.map((group) => (
                  <div key={group.label} className='mb-1 last:mb-0'>
                    {/* group header */}
                    <div className='text-muted-foreground mb-0.5 flex items-center gap-1.5 px-3 py-1'>
                      {group.icon && (
                        <group.icon className='h-3 w-3 shrink-0' />
                      )}
                      <span className='text-[10px] font-semibold tracking-widest uppercase'>
                        {group.label}
                      </span>
                    </div>
                    {/* group items */}
                    {group.children?.map((item) => (
                      <NavigationMenuLink key={item.label} asChild>
                        <Link href={item.href ?? '#'} className={ROW}>
                          {item.icon && (
                            <item.icon className='text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-colors' />
                          )}
                          <span className='whitespace-nowrap'>
                            {item.label}
                          </span>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                ))
              : entry.items.map((item) => {
                  const isColorClass = item.description?.startsWith('text-')
                  return (
                    <NavigationMenuLink key={item.label} asChild>
                      <Link href={item.href ?? '#'} className={ROW}>
                        {item.icon && (
                          <item.icon
                            className={`h-4 w-4 shrink-0 transition-colors ${
                              isColorClass
                                ? item.description
                                : 'text-muted-foreground group-hover:text-primary'
                            }`}
                          />
                        )}
                        <span className='whitespace-nowrap'>{item.label}</span>
                        {item.badge && (
                          <span className='bg-primary/10 text-primary ml-auto rounded px-1.5 py-0.5 text-[10px] font-semibold'>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </NavigationMenuLink>
                  )
                })}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return null
}

// ── MegaPanel — 2 panel: trái hover → phải hiện sub-items ───
function MegaPanel({ entry }: { entry: Extract<MenuEntry, { type: 'mega' }> }) {
  const [activeLabel, setActiveLabel] = React.useState<string | null>(null)
  const activeCat = entry.items.find((c) => c.label === activeLabel) ?? null
  // Lọc bỏ "All X" khỏi danh sách sub-items
  const subItems =
    activeCat?.children?.filter((c) => !c.label.startsWith('All ')) ?? []
  const allLink = activeCat?.children?.find((c) => c.label.startsWith('All '))

  return (
    <div className='flex' onMouseLeave={() => setActiveLabel(null)}>
      {/* Panel trái — danh sách categories */}
      <div className='w-44 shrink-0 border-r p-1.5'>
        <p className='text-muted-foreground mb-1 px-3 py-1 text-[10px] font-semibold tracking-widest uppercase'>
          {entry.leftLabel ?? entry.label}
        </p>
        {entry.items.map((cat) => {
          const CatIcon = cat.icon
          const active = cat.label === activeLabel
          return (
            <button
              key={cat.label}
              onMouseEnter={() => setActiveLabel(cat.label)}
              className={`group flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${
                active
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent/60'
              }`}
            >
              {CatIcon && (
                <CatIcon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
              )}
              <span className='flex-1 text-left font-medium'>{cat.label}</span>
              <ChevronRight
                className={`h-3 w-3 shrink-0 transition-opacity ${
                  active && cat.children?.length
                    ? 'text-primary opacity-100'
                    : 'opacity-0'
                }`}
              />
            </button>
          )
        })}
        {/* All products link */}
        {entry.allHref && (
          <div className='mt-1 border-t pt-1'>
            <NavigationMenuLink asChild>
              <Link
                href={entry.allHref}
                className='text-primary flex flex-row items-center gap-1 px-3 py-1 text-xs font-medium hover:underline'
              >
                <span>{entry.allLabel ?? 'View all'}</span>
                <ChevronRight className='h-3 w-3 shrink-0' />
              </Link>
            </NavigationMenuLink>
          </div>
        )}
      </div>

      {/* Panel phải — chỉ hiện khi category đang hover CÓ children */}
      {activeCat && (subItems.length > 0 || allLink) && (
        <div className='w-48 p-1.5'>
          <p className='text-muted-foreground mb-1 px-3 py-1 text-[10px] font-semibold tracking-widest uppercase'>
            {activeCat.label}
          </p>
          {subItems.map((child) => (
            <NavigationMenuLink key={child.label} asChild>
              <Link href={child.href ?? '#'} className={ROW}>
                {child.icon && (
                  <child.icon className='text-muted-foreground group-hover:text-primary h-3.5 w-3.5 shrink-0 transition-colors' />
                )}
                <span className='whitespace-nowrap'>{child.label}</span>
              </Link>
            </NavigationMenuLink>
          ))}
          {allLink && (
            <NavigationMenuLink asChild>
              <Link
                href={allLink.href ?? '#'}
                className='text-primary mt-1 flex flex-row items-center gap-1 border-t px-3 pt-1.5 text-xs font-medium hover:underline'
              >
                <span>{allLink.label}</span>
                <ChevronRight className='h-3 w-3 shrink-0' />
              </Link>
            </NavigationMenuLink>
          )}
        </div>
      )}
    </div>
  )
}

// ── NavListItem — giống ListItem trong NavigationMenuDemo ─────
function NavListItem({
  title,
  children,
  href,
  icon: Icon,
  iconColor,
  badge,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & {
  href: string
  title: string
  icon?: NavItem['icon']
  iconColor?: string
  badge?: string
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className='hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none'
        >
          <div className='flex items-center gap-2'>
            {Icon && (
              <Icon
                className={`h-4 w-4 shrink-0 transition-colors ${
                  iconColor ?? 'text-muted-foreground group-hover:text-primary'
                }`}
              />
            )}
            <span className='text-sm leading-none font-medium'>{title}</span>
            {badge && (
              <span className='bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[10px] font-semibold'>
                {badge}
              </span>
            )}
          </div>
          {children && (
            <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

// ============================================================
// MOBILE — Accordion menu
// ============================================================
interface AppMobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function AppMobileMenu({ isOpen, onClose }: AppMobileMenuProps) {
  const [openSection, setOpenSection] = React.useState<string | null>(null)
  const [openGroup, setOpenGroup] = React.useState<string | null>(null)

  const toggle = (
    label: string,
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => setter((prev) => (prev === label ? null : label))

  if (!isOpen) return null

  return (
    <div className='border-t'>
      {/* backdrop tap to close */}
      <nav className='py-1'>
        {menuConfig.map((entry) => {
          // ── plain link ──
          if (entry.type === 'link') {
            return (
              <Link
                key={entry.label}
                href={entry.href}
                onClick={onClose}
                className={`${ITEM_HOVER} px-3 font-medium`}
              >
                {entry.icon && (
                  <entry.icon className='text-muted-foreground h-4 w-4 shrink-0' />
                )}
                {entry.label}
              </Link>
            )
          }

          // ── mega: flat list of top-level categories ──
          if (entry.type === 'mega') {
            const isOpen = openSection === entry.label
            return (
              <div key={entry.label}>
                <button
                  onClick={() => toggle(entry.label, setOpenSection)}
                  className={`${ITEM_HOVER} justify-between px-3 font-medium`}
                >
                  <span>{entry.label}</span>
                  <ChevronDown
                    className={`text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className='ml-3 border-l pb-1 pl-3'>
                    {entry.items.map((cat) => {
                      const CatIcon = cat.icon
                      const catOpen = openGroup === cat.label
                      return (
                        <div key={cat.label}>
                          {/* Category cha có thể click để toggle sub */}
                          <button
                            onClick={() => toggle(cat.label, setOpenGroup)}
                            className={`${ITEM_HOVER} justify-between`}
                          >
                            <div className='flex min-w-0 items-center gap-2'>
                              {CatIcon && (
                                <CatIcon className='text-muted-foreground h-3.5 w-3.5 shrink-0' />
                              )}
                              <span className='min-w-0 truncate text-sm font-medium'>
                                {cat.label}
                              </span>
                            </div>
                            {cat.children && (
                              <ChevronDown
                                className={`text-muted-foreground h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`}
                              />
                            )}
                          </button>
                          {/* Sub-items */}
                          {catOpen && cat.children && (
                            <div className='ml-3 border-l pb-0.5 pl-3'>
                              {cat.children.map((child) => {
                                const ChildIcon = child.icon
                                return (
                                  <Link
                                    key={child.label}
                                    href={child.href ?? '#'}
                                    onClick={onClose}
                                    className={`${ITEM_HOVER} text-muted-foreground`}
                                  >
                                    {ChildIcon && (
                                      <ChildIcon className='h-3.5 w-3.5 shrink-0' />
                                    )}
                                    <span className='min-w-0 truncate'>
                                      {child.label}
                                    </span>
                                  </Link>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                    {/* All link */}
                    {entry.allHref && (
                      <Link
                        href={entry.allHref}
                        onClick={onClose}
                        className='text-primary flex items-center gap-1 px-2 py-1.5 text-xs font-medium hover:underline'
                      >
                        {entry.allLabel ?? 'View all'}{' '}
                        <ChevronRight className='h-3 w-3 shrink-0' />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )
          }

          // ── dropdown: flat hoặc grouped ──
          if (entry.type === 'dropdown') {
            const isOpen = openSection === entry.label
            const isGrouped = entry.items.some((i) => !i.href && i.children)
            return (
              <div key={entry.label}>
                <button
                  onClick={() => toggle(entry.label, setOpenSection)}
                  className={`${ITEM_HOVER} justify-between px-3 font-medium`}
                >
                  <span>{entry.label}</span>
                  <ChevronDown
                    className={`text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className='ml-3 border-l pb-1 pl-3'>
                    {isGrouped
                      ? /* Nhóm: section header + children */
                        entry.items.map((group) => {
                          const GroupIcon = group.icon
                          return (
                            <div key={group.label} className='mb-1'>
                              <div className='text-muted-foreground flex items-center gap-1.5 px-2 py-1'>
                                {GroupIcon && (
                                  <GroupIcon className='h-3 w-3 shrink-0' />
                                )}
                                <span className='text-[10px] font-semibold tracking-widest uppercase'>
                                  {group.label}
                                </span>
                              </div>
                              {group.children?.map((item) => {
                                const Icon = item.icon
                                return (
                                  <Link
                                    key={item.label}
                                    href={item.href ?? '#'}
                                    onClick={onClose}
                                    className={`${ITEM_HOVER} text-muted-foreground`}
                                  >
                                    {Icon && (
                                      <Icon className='h-3.5 w-3.5 shrink-0' />
                                    )}
                                    <span className='min-w-0 truncate'>
                                      {item.label}
                                    </span>
                                  </Link>
                                )
                              })}
                            </div>
                          )
                        })
                      : /* Flat */
                        entry.items.map((item) => {
                          const Icon = item.icon
                          const isColorClass =
                            item.description?.startsWith('text-')
                          return (
                            <Link
                              key={item.label}
                              href={item.href ?? '#'}
                              onClick={onClose}
                              className={`${ITEM_HOVER} text-muted-foreground`}
                            >
                              {Icon && (
                                <Icon
                                  className={`h-4 w-4 shrink-0 ${isColorClass ? item.description : ''}`}
                                />
                              )}
                              <span className='min-w-0 truncate'>
                                {item.label}
                              </span>
                            </Link>
                          )
                        })}
                  </div>
                )}
              </div>
            )
          }

          return null
        })}
      </nav>
    </div>
  )
}
