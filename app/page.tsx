import HomePage from '../components/HomePage';

export const metadata = {
  title: 'Cadence - Elite peers, zero noise—train together and stay connected',
  description: 'A private, vetted, sports-first network for founders and operators. Meet elite peers in your city and keep the relationship alive. Invite-only. Free to start.',
  keywords: 'founders, operators, sports, networking, elite, private, vetted, training, fitness',
  openGraph: {
    title: 'Cadence - Elite peers, zero noise',
    description: 'A private, vetted, sports-first network for founders and operators.',
    url: 'https://cadence.app',
    siteName: 'Cadence',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cadence - Elite peers, zero noise',
    description: 'A private, vetted, sports-first network for founders and operators.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Page() {
  return <HomePage />;
}