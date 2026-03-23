import type { Metadata } from 'next'
import { Space_Grotesk, Cairo } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import NeuralBackgroundClient from '@/components/effects/NeuralBackgroundClient'
import '../globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: {
      template: '%s | PrismaFlow',
      default:
        locale === 'ar'
          ? 'PrismaFlow — وكالة التسويق العصبي'
          : 'PrismaFlow — Neuromarketing Agency',
    },
    description:
      locale === 'ar'
        ? 'نستخدم علم الأعصاب وعلم النفس لهندسة الرغبة وتحويل علامتك التجارية إلى ضرورة لا تُقاوم.'
        : 'We use neuroscience and psychology to engineer desire, turning your brand into an irresistible necessity.',
    metadataBase: new URL('https://prismaflow.net'),
    openGraph: {
      siteName: 'PrismaFlow',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
    alternates: {
      canonical: `https://prismaflow.net/${locale}`,
      languages: {
        'en': 'https://prismaflow.net/en',
        'ar': 'https://prismaflow.net/ar',
        'x-default': 'https://prismaflow.net/en',
      },
    },
    other: {
      'theme-color': '#0D0D10',
      'color-scheme': 'dark',
      'format-detection': 'telephone=no',
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${spaceGrotesk.variable} ${cairo.variable}`}
    >
      <body className="bg-[color:var(--color-bg)] text-[color:var(--color-white)] min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <NeuralBackgroundClient />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
