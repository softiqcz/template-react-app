export const SITE_URL = getSiteUrl()

export const SITE_NAME = 'SOFTIQ'
export const SITE_LOCALE = 'cs_CZ'
export const SITE_TITLE = 'SOFTIQ | Webové stránky, aplikace a automatizace'
export const SITE_DESCRIPTION =
  'Navrhuji a stavím rychlé webové stránky, podnikové aplikace, AI agenty a automatizace na míru pro firmy, které chtějí méně ruční práce a jasnější digitální provoz.'

export const SEO_KEYWORDS = [
  'webové stránky na míru',
  'tvorba webových stránek',
  'podnikové aplikace',
  'software na míru',
  'automatizace procesů',
  'AI agenti',
  'realitní weby',
  'Next.js vývoj',
  'SOFTIQ',
]

export const SEO_IMAGE = {
  url: '/images/softiq-landing-light.png',
  width: 1024,
  height: 1024,
  alt: 'SOFTIQ digitální rozhraní pro weby, aplikace a automatizace',
}

export const COMPANY_DETAILS = {
  name: 'SOFTIQ',
  legalName: 'Ing. Martin Švejda',
  email: 'info@softiq.cz',
  taxId: '21086231',
  address: {
    streetAddress: 'Janského 559/13',
    postalCode: '779 00',
    addressLocality: 'Olomouc - Povel',
    addressCountry: 'CZ',
  },
}

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    'https://softiq.cz'

  const normalizedUrl = configuredUrl.startsWith('http')
    ? configuredUrl
    : `https://${configuredUrl}`

  return normalizedUrl.replace(/\/$/, '')
}

export function getAbsoluteUrl(pathname = '/') {
  const normalizedPathname = pathname.startsWith('/')
    ? pathname
    : `/${pathname}`

  return `${SITE_URL}${normalizedPathname}`
}
