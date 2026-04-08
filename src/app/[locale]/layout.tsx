import type { Metadata } from 'next'
import { Space_Grotesk, Cairo, JetBrains_Mono, Inter, Bebas_Neue } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GrainOverlay from '@/components/effects/GrainOverlay'
import CursorFollower from '@/components/ui/CursorFollower'
import ScrollProgress from '@/components/ui/ScrollProgress'
import '../globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk-var',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo-var',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-var',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter-var',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue-var',
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
      className={`${spaceGrotesk.variable} ${cairo.variable} ${inter.variable} ${jetbrainsMono.variable} ${bebasNeue.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <ScrollProgress />
          <GrainOverlay />
          <CursorFollower />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
