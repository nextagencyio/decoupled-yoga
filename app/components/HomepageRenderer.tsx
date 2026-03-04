'use client'

import Link from 'next/link'
import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'
import { Sparkles, Flower2, Sun } from 'lucide-react'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
}

const highlights = [
  { icon: Sparkles, title: 'Mindful Practice', description: 'Classes designed to restore calm, focus, and steady energy.' },
  { icon: Flower2, title: 'Expert Guides', description: 'Supportive instructors for beginners through advanced students.' },
  { icon: Sun, title: 'Retreat Experiences', description: 'Immersive retreats that deepen practice and renewal.' },
]

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>
      <ErrorBoundary>
        <StatsSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">Practice With Purpose</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A welcoming sanctuary for mind, body, and spirit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-stone-50 rounded-2xl p-8 border border-stone-200">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-700" />
                  </div>
                  <h3 className="font-display text-xl text-primary-900 font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      <footer className="bg-primary-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-display font-bold text-accent-400 mb-4">Serenity Yoga Studio</h3>
              <p className="text-gray-400 mb-4">Guiding you toward balance, strength, and inner calm.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/classes" className="hover:text-accent-400 transition-colors">Classes</Link></li>
                <li><Link href="/instructors" className="hover:text-accent-400 transition-colors">Instructors</Link></li>
                <li><Link href="/retreats" className="hover:text-accent-400 transition-colors">Retreats</Link></li>
                <li><Link href="/about" className="hover:text-accent-400 transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>742 Lotus Lane</li>
                <li>Mill Valley, CA 94941</li>
                <li>hello@serenityyoga.com</li>
                <li>(415) 555-9272</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-900 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Serenity Yoga Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
