import { getClient } from '@/lib/drupal-client'
import HomepageRenderer from './components/HomepageRenderer'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { checkConfiguration } from '../lib/config-check'
import { GET_HOMEPAGE_DATA } from '@/lib/queries'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600
export const dynamic = 'force-dynamic'



export async function generateMetadata(): Promise<Metadata> {
  const title = 'Serenity Yoga Studio'
  const description = 'A welcoming sanctuary for mind, body, and spirit. Explore yoga classes, meet our instructors, and discover transformative retreats at Serenity Yoga Studio.'

  return {
    title,
    description,
    keywords: ['yoga studio', 'yoga classes', 'vinyasa flow', 'restorative yoga', 'yoga retreats', 'wellness', 'meditation'],
    openGraph: {
      title: `${title} - Find Your Inner Peace`,
      description,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Find Your Inner Peace`,
      description,
    },
  }
}

export default async function Home() {
  // Check if the app is properly configured
  const configStatus = checkConfiguration()

  if (!configStatus.isConfigured) {
    return <SetupGuide missingVars={configStatus.missingVars} />
  }

  try {
    const client = getClient()

    // Try raw query for homepage data first (more reliable)
    const data = await client.raw(GET_HOMEPAGE_DATA)
    const homepageContent = data?.nodeHomepages?.nodes?.[0] || null

    // If no homepage content, try getEntryByPath as fallback
    if (!homepageContent) {
      const entityContent = await client.getEntryByPath('/homepage') as any
      if (entityContent) {
        return <HomepageRenderer homepageContent={entityContent} />
      }

      const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
      return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
    }

    return <HomepageRenderer homepageContent={homepageContent} />
  } catch (error) {
    console.error('Error fetching homepage:', error)
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }
}
