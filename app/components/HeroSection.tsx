'use client'

import Link from 'next/link'
import { DrupalHomepage } from '@/lib/types'

interface HeroSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const title = (homepageContent as any)?.heroTitle || (homepageContent as any)?.title || 'Rooted in Community'
  const subtitle = (homepageContent as any)?.heroSubtitle || 'Thoughtful experiences inspired by people, place, and purpose.'
  const description = (homepageContent as any)?.heroDescription?.processed || ''

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80&fit=crop)' }}
      />
      <div className="absolute inset-0 bg-primary-950/55" />

      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" className="fill-stone-50" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-32">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium">Welcoming guests year-round</span>
        </div>

        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light">
            {subtitle}
          </p>
        )}

        {description && (
          <div className="text-lg text-white/80 max-w-2xl mx-auto mb-10" dangerouslySetInnerHTML={{ __html: description }} />
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 rounded-full hover:bg-white/30 transition-all duration-200 font-semibold text-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
