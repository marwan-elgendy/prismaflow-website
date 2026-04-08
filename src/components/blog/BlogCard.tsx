'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { formatDate } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface Post {
  title: { en?: string; ar?: string }
  slug: string
  excerpt?: { en?: string; ar?: string }
  publishedAt?: string
  categories?: string[]
  readTime?: number
}

interface BlogCardProps {
  post: Post
  locale: string
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const isAr = locale === 'ar'
  const title = (isAr ? post.title.ar : post.title.en) || ''
  const excerpt = (isAr ? post.excerpt?.ar : post.excerpt?.en) || ''
  const date = post.publishedAt ? formatDate(post.publishedAt, locale) : ''
  const category = post.categories?.[0] || ''
  const cardRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!cardRef.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(cardRef.current, { opacity: 1, y: 0 })
      return
    }

    gsap.from(cardRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 90%',
        once: true,
      },
    })
  }, { scope: cardRef })

  const handleMouseEnter = () => {
    if (!cardRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.to(cardRef.current, {
      scale: 1.02,
      boxShadow: '0 0 20px rgba(0, 163, 204, 0.12)',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: 'none',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article
        ref={cardRef}
        className="p-6 border border-[#1A1A1A] bg-transparent transition-colors duration-300 group-hover:border-[#00A3CC] flex flex-col gap-3"
      >
        {/* Category */}
        {category && (
          <span
            className="text-[#00A3CC] text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {category}
          </span>
        )}

        {/* Title */}
        <h3
          className="font-bold text-white text-xl leading-snug line-clamp-2"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p
            className="text-[#888888] text-sm leading-relaxed line-clamp-2 flex-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {excerpt}
          </p>
        )}

        {/* Date */}
        {date && (
          <time
            className="text-[#555555] text-xs block mt-auto"
            style={{ fontFamily: 'var(--font-body)' }}
            dateTime={post.publishedAt}
          >
            {date}
          </time>
        )}
      </article>
    </Link>
  )
}
