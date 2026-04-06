import { MetadataRoute } from 'next'
import { staticPosts } from '@/data/static-posts'

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
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticRouteConfig.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }))
  )

  const postEntries: MetadataRoute.Sitemap = staticPosts.flatMap((post) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  return [...staticEntries, ...postEntries]
}
