'use client'

import Link from 'next/link'
import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = (homepageContent as any)?.ctaTitle || 'Ready to Plan Your Next Step?'
  const description = (homepageContent as any)?.ctaDescription?.processed || ''
  const primaryLabel = (homepageContent as any)?.ctaPrimary || 'Contact Us'
  const secondaryLabel = (homepageContent as any)?.ctaSecondary || 'Learn More'

  return (
    <section className="relative py-24 overflow-hidden bg-primary-900">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-300/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">{title}</h2>
        {description ? (
          <div className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">Connect with our team to get tailored support and clear next steps.</p>
        )}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/contact" className="px-10 py-4 bg-white text-primary-900 rounded-full hover:bg-primary-50 transition-all duration-200 font-bold text-lg shadow-lg">
            {primaryLabel}
          </Link>
          <Link href="/about" className="px-10 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-200 font-bold text-lg">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
