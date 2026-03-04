'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { Menu, X, Flower2 } from 'lucide-react'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Classes', href: '/classes' },
  { name: 'Instructors', href: '/instructors' },
  { name: 'Retreats', href: '/retreats' },
  { name: 'About', href: '/about' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bannerHeight, setBannerHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    const banner = document.querySelector('[class*="bg-amber-500"]')
    if (banner) {
      setBannerHeight(banner.getBoundingClientRect().height)
      const observer = new MutationObserver(() => {
        if (!document.querySelector('[class*="bg-amber-500"]')) setBannerHeight(0)
      })
      observer.observe(document.body, { childList: true, subtree: true })
      return () => {
        observer.disconnect()
        window.removeEventListener('scroll', handleScroll)
      }
    }
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getActiveTab = () => {
    if (pathname === '/') return 'Home'
    for (const item of navigationItems) {
      if (item.href !== '/' && pathname.startsWith(item.href)) return item.name
    }
    return null
  }
  const activeTab = getActiveTab()

  return (
    <header className={clsx('fixed w-full z-50 transition-all duration-300', scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-md')} style={{ top: bannerHeight + 'px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center">
              <Flower2 className="w-5 h-5 text-accent-300" />
            </div>
            <span className="text-lg font-display font-bold text-primary-900 hidden sm:block">Serenity Yoga</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link key={item.name} href={item.href} className={clsx('px-4 py-2 rounded-full text-sm font-medium transition-colors', activeTab === item.name ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:text-primary-800 hover:bg-primary-50')}>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/contact" className="hidden sm:inline-flex items-center bg-primary-600 text-white px-5 py-2 rounded-full hover:bg-primary-700 transition-colors duration-200 font-semibold text-sm">
              Join Class
            </Link>
            <button type="button" className="lg:hidden inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-primary-800 hover:bg-primary-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 py-4 bg-white/95 backdrop-blur-md rounded-b-2xl">
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className={clsx('px-4 py-3 rounded-full text-sm font-medium transition-colors', activeTab === item.name ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:text-primary-800 hover:bg-primary-50')}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
