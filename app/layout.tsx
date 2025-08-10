import type { Metadata } from 'next';
import './globals.css';
import copyData from '../copy/home.en-US.json';

export const metadata: Metadata = {
  metadataBase: new URL('https://cadence.app'),
  title: {
    default: copyData.seo.title,
    template: '%s | Cadence'
  },
  description: copyData.seo.description,
  keywords: ['founders', 'operators', 'sports', 'networking', 'elite', 'private', 'vetted', 'london', 'new york', 'venture-backed', 'investors', 'training'],
  authors: [{ name: 'Cadence Team' }],
  creator: 'Cadence',
  publisher: 'Cadence',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cadence.app',
    title: copyData.seo.title,
    description: copyData.seo.description,
    siteName: 'Cadence',
    images: [
      {
        url: '/london.png',
        width: 1536,
        height: 1024,
        alt: 'Elite founders training together in London',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: copyData.seo.title,
    description: copyData.seo.description,
    creator: '@cadence_app',
    images: ['/london.png'],
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}