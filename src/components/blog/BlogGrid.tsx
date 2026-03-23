import BlogCard from './BlogCard'

interface Post {
  title: { en?: string; ar?: string }
  slug: string
  excerpt?: { en?: string; ar?: string }
  mainImage?: { asset?: { url?: string }; alt?: { en?: string; ar?: string } }
  publishedAt?: string
  author?: { en?: string; ar?: string }
  categories?: string[]
}

export default function BlogGrid({ posts, locale }: { posts: Post[]; locale: string }) {
  if (!posts.length) {
    return (
      <p className="text-center text-[color:var(--color-gray-400)] py-20">
        {locale === 'ar' ? 'لا توجد مقالات بعد.' : 'No posts yet.'}
      </p>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} locale={locale} />
      ))}
    </div>
  )
}
