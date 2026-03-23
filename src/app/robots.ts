import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/studio', '/api/'] },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    sitemap: 'https://prismaflow.net/sitemap.xml',
    host: 'https://prismaflow.net',
  }
}
