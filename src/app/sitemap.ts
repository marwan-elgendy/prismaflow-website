import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { allPostsQuery } from '@/lib/queries'

const BASE_URL = 'https://prismaflow.net'
const locales = ['en', 'ar']
const staticRoutes = ['', '/about', '/services', '/blog', '/apply']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch(allPostsQuery).catch(() => [])

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  const postEntries: MetadataRoute.Sitemap = (posts ?? []).flatMap(
    (post: { slug: string; publishedAt?: string }) =>
      locales.map((locale) => ({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  )

  return [...staticEntries, ...postEntries]
}
