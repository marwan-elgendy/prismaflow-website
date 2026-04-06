import { MetadataRoute } from 'next'

const BASE_URL = 'https://prismaflow.net'
const locales = ['en', 'ar']

const staticRouteConfig: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'daily' },
  { path: '/apply', priority: 0.7, changeFrequency: 'monthly' },
]

const now = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    staticRouteConfig.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }))
  )
}
