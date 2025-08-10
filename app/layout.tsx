import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cadence.app'),
  title: {
    default: 'Cadence - Elite peers, zero noise',
    template: '%s | Cadence'
  },
  description: 'A private, vetted, sports-first network for founders and operators.',
  keywords: ['founders', 'operators', 'sports', 'networking', 'elite', 'private', 'vetted'],
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
    title: 'Cadence - Elite peers, zero noise',
    description: 'A private, vetted, sports-first network for founders and operators.',
    siteName: 'Cadence',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cadence - Elite peers, zero noise',
    description: 'A private, vetted, sports-first network for founders and operators.',
    creator: '@cadence_app',
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
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}