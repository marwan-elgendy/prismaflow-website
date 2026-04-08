'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import BlogCard from '@/components/blog/BlogCard'
import { staticPosts } from '@/data/static-posts'

const CATEGORIES_EN = ['All', 'Neuromarketing', 'Case Studies', 'Strategy', 'Copywriting', 'Branding']
const CATEGORIES_AR = ['الكل', 'التسويق العصبي', 'دراسات الحالة', 'استراتيجية', 'كتابة إعلانية', 'علامة تجارية']

const CATEGORY_MAP_EN: Record<string, string> = {
  'All': '',
  'Neuromarketing': 'neuromarketing',
  'Case Studies': 'case studies',
  'Strategy': 'strategy',
  'Copywriting': 'copywriting',
  'Branding': 'branding',
}
const CATEGORY_MAP_AR: Record<string, string> = {
  'الكل': '',
  'التسويق العصبي': 'neuromarketing',
  'دراسات الحالة': 'case studies',
  'استراتيجية': 'strategy',
  'كتابة إعلانية': 'copywriting',
  'علامة تجارية': 'branding',
}

const SIDEBAR_POPULAR_EN = [
  'The Neuroscience of Buying: Why Your Customers Don\'t Know Why They Buy',
  '340% in 90 Days: How We Rebuilt a Failing Funnel Using Only Psychology',
  'Loss Aversion: The Most Powerful Conversion Weapon You\'re Not Using',
]
const SIDEBAR_POPULAR_AR = [
  'علم الأعصاب والشراء: لماذا لا يعرف عملاؤك سبب شرائهم؟',
  '٣٤٠٪ في ٩٠ يوماً: كيف أعدنا بناء قمع مبيعات فاشل',
  'النفور من الخسارة: أقوى سلاح تحويل لا تستخدمه',
]

export default function BlogPage() {
  const params = useParams<{ locale: string }>()
  const locale = params.locale ?? 'en'
  const isAr = locale === 'ar'
  const dir = isAr ? 'rtl' : 'ltr'

  const categories = isAr ? CATEGORIES_AR : CATEGORIES_EN
  const categoryMap = isAr ? CATEGORY_MAP_AR : CATEGORY_MAP_EN
  const popularTitles = isAr ? SIDEBAR_POPULAR_AR : SIDEBAR_POPULAR_EN

  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filterKey = categoryMap[activeCategory]
  const filtered = filterKey
    ? staticPosts.filter((p) => p.categories.includes(filterKey))
    : staticPosts

  return (
    <main dir={dir} className="pt-20 bg-[#0A0A0A] min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <h1
          className="font-black text-white leading-[0.9] tracking-[-0.03em] mb-4"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
          }}
        >
          {isAr ? 'ملاحظات المختبر.' : 'The Lab Notes.'}
        </h1>
        <p
          className="text-[#888888] text-xl max-w-xl"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {isAr
            ? 'علم الأعصاب، وعلم النفس، وفن الإقناع.'
            : 'Neuroscience, psychology, and the art of persuasion.'}
        </p>
      </section>

      {/* ── FILTER BAR ───────────────────────────────────────── */}
      <div className="px-6 md:px-16 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 text-xs uppercase tracking-widest transition-all duration-200 border"
              style={{
                fontFamily: 'var(--font-mono)',
                color: activeCategory === cat ? '#0A0A0A' : '#555555',
                backgroundColor: activeCategory === cat ? '#00A3CC' : 'transparent',
                borderColor: activeCategory === cat ? '#00A3CC' : '#333333',
                borderRadius: 0,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT — grid + sidebar ────────────────────── */}
      <div className="px-6 md:px-16 max-w-7xl mx-auto pb-32">
        <div className="grid lg:grid-cols-[1fr_280px] gap-16">

          {/* Blog grid */}
          <div>
            <div className="h-px bg-[#1A1A1A] mb-12" />
            {filtered.length === 0 ? (
              <p
                className="text-[#555555] py-12"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {isAr ? 'لا توجد مقالات في هذه الفئة.' : 'No posts in this category.'}
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post) => (
                  <BlogCard key={post.slug} post={post} locale={locale} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-12">

              {/* Popular this month */}
              <div>
                <span
                  className="block text-[#00A3CC] text-xs uppercase tracking-widest mb-6"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {isAr ? 'الأكثر قراءة' : 'Popular This Month'}
                </span>
                <ul className="space-y-4">
                  {popularTitles.map((title, i) => (
                    <li key={i}>
                      <p
                        className="text-[#888888] text-sm leading-snug line-clamp-2 hover:text-white transition-colors duration-200 cursor-default"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {title}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="border border-[#1A1A1A] p-6">
                <span
                  className="block text-[#00A3CC] text-xs uppercase tracking-widest mb-4"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {isAr ? 'النشرة البريدية' : 'Newsletter'}
                </span>
                <p
                  className="text-[#888888] text-sm mb-5 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {isAr
                    ? 'رؤى التسويق العصبي مباشرة إلى بريدك.'
                    : 'Neuromarketing insights delivered to your inbox.'}
                </p>
                {subscribed ? (
                  <p
                    className="text-[#00A3CC] text-sm"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {isAr ? 'شكراً لاشتراكك.' : 'You\'re subscribed.'}
                  </p>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (email) setSubscribed(true)
                    }}
                    className="flex flex-col gap-3"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder={isAr ? 'بريدك الإلكتروني' : 'your@email.com'}
                      className="w-full bg-[#111111] border border-[#333333] text-white px-4 py-3 text-sm outline-none focus:border-[#00A3CC] transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-body)', borderRadius: 0 }}
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#00A3CC] text-[#0A0A0A] px-4 py-3 text-xs font-bold uppercase tracking-widest transition-opacity duration-200 hover:opacity-90"
                      style={{ fontFamily: 'var(--font-mono)', borderRadius: 0 }}
                    >
                      {isAr ? 'اشترك' : 'Subscribe'}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
