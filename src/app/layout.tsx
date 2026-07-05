import './globals.css'
import 'swiper/css'
import 'swiper/css/pagination'
import type { Metadata, Viewport } from 'next'

import { CookieBanner } from '@/components/layout/cookie/CookieBanner'
import { Footer } from '@/components/layout/base/Footer'
import { InitialLoadingGate } from '@/components/sections/InitialLoadingGate'
import { Navbar } from '@/components/layout/base/Navbar'
import { SettingsMenuOffcanvas } from '@/components/layout/settings/SettingsMenuOffcanvas'
import {
  COMPANY_DETAILS,
  SEO_IMAGE,
  SEO_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  getAbsoluteUrl,
} from '@/constants/seo'
import { AppProviders } from '@/providers/AppProviders'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      legalName: COMPANY_DETAILS.legalName,
      url: SITE_URL,
      email: COMPANY_DETAILS.email,
      taxID: COMPANY_DETAILS.taxId,
      image: getAbsoluteUrl(SEO_IMAGE.url),
      logo: getAbsoluteUrl('/images/logos/SOFTIQ_web_apps.svg'),
      address: {
        '@type': 'PostalAddress',
        ...COMPANY_DETAILS.address,
      },
      areaServed: ['CZ', 'EU'],
      priceRange: '10000 CZK - 35000 CZK',
      serviceType: [
        'Webové stránky na míru',
        'Podnikové aplikace',
        'AI agenti',
        'Automatizace procesů',
        'Realitní weby',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'cs-CZ',
      publisher: {
        '@id': `${SITE_URL}/#business`,
      },
      description: SITE_DESCRIPTION,
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  manifest: '/manifest.json',
  applicationName: SITE_NAME,
  keywords: SEO_KEYWORDS,
  authors: [{ name: COMPANY_DETAILS.legalName, url: SITE_URL }],
  creator: COMPANY_DETAILS.legalName,
  publisher: SITE_NAME,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    url: '/',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SEO_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SEO_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/images/logos/SOFTIQ_web_apps.svg',
    shortcut: '/images/logos/SOFTIQ_web_apps.svg',
    apple: '/images/logos/SOFTIQ_web_apps.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light dark',
}

function serializeStructuredData(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="cs">
      <body>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(structuredData),
          }}
      />
      <AppProviders>
        <InitialLoadingGate>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <CookieBanner />
            <SettingsMenuOffcanvas />
          </div>
        </InitialLoadingGate>
      </AppProviders>
      </body>
      </html>
  )
}
