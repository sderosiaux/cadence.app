/*
 * Cadence - Premium Marketing Homepage
 * 
 * To integrate into Next.js App Router:
 * 1. Install dependencies: npm install framer-motion lucide-react
 * 2. Copy this component to your project
 * 3. Import and use in app/page.tsx: import HomePage from './HomePage'
 * 
 * Assumes Tailwind CSS is configured with dark mode support
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Sun,
  Moon,
  MapPin,
  Users,
  Calendar,
  Repeat,
  Shield,
  Eye,
  Heart,
  Zap,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Check,
  Globe,
  Gauge
} from 'lucide-react';

// Brand constants
const BRAND = 'Cadence';
const ACCENT = '#4ADE80'; // Mint green

// Copy constants
const COPY = {
  hero: {
    headline: 'A private, vetted, sports-first network for founders and operators.',
    subheadline: 'Meet elite peers in your city and keep the relationship alive. Invite-only. Free to start.',
    valuePromise: 'Elite peers, zero noise—train together and stay connected.'
  },
  ctas: {
    primary: 'Request an Invite',
    secondary: 'How it works',
    refer: 'Refer a peer'
  },
  howItWorks: [
    {
      title: 'Discover',
      subtitle: 'City-level',
      description: 'See vetted members in your area (London & NYC first), filtered by sport, pace/level, and availability.'
    },
    {
      title: 'Match',
      subtitle: '1:1 or triads',
      description: 'We propose highly compatible partners; you choose. No big groups.'
    },
    {
      title: 'Schedule cleanly',
      subtitle: 'One-tap sync',
      description: 'One-tap time/place, calendar sync, WhatsApp/iMessage bridge.'
    },
    {
      title: 'Keep-alive',
      subtitle: 'Smart nudges',
      description: '"Set next rep," smart nudges at 7/14/30 days, and light notes to remember what matters.'
    }
  ],
  valuePillars: [
    {
      title: 'Elite peer discovery',
      description: 'Right people, right now, near you.',
      icon: Users
    },
    {
      title: 'Frictionless scheduling',
      description: 'Propose, confirm, on the calendar—done.',
      icon: Calendar
    },
    {
      title: 'Relationship OS',
      description: 'Nudges and notes that make depth effortless.',
      icon: Heart
    },
    {
      title: 'Integrity by design',
      description: 'Reliability affects matching; your inviter is accountable too.',
      icon: Shield
    },
    {
      title: 'Privacy-first',
      description: 'City-level by default; precise location only after acceptance.',
      icon: Eye
    },
    {
      title: 'Free to start',
      description: 'We optimize for performance and excellent relationships, not paywalls.',
      icon: Zap
    }
  ],
  sports: ['Running', 'Tennis', 'Strength Pods', 'Cycling'],
  cities: ['London', 'New York City'],
  faqs: [
    {
      question: 'Is it free?',
      answer: 'Yes—free to start while we optimize for quality and performance.'
    },
    {
      question: 'Who gets in?',
      answer: 'Founders, C-level, senior operators, and investors with a clear sport habit.'
    },
    {
      question: 'Why 1:1s and triads?',
      answer: 'Faster intimacy, better conversations, easier logistics.'
    },
    {
      question: 'How private is it?',
      answer: 'City-level by default; precise location shared only after both sides accept.'
    },
    {
      question: 'Do you need my Strava?',
      answer: 'Optional. We may derive badges (never store raw health data).'
    },
    {
      question: 'What happens if someone flakes?',
      answer: 'Reliability affects matching; the inviter\'s sponsor score is impacted too.'
    },
    {
      question: 'What cities?',
      answer: 'London and NYC first; more as reliability stays ≥85%.'
    },
    {
      question: 'Do you run public events?',
      answer: 'No—curated sessions only. No feed, no likes.'
    }
  ],
  footer: {
    tagline: 'No feed. No noise. Just elite peers, real sessions, and relationships that last.'
  }
};

// SEO Meta (commented for integration)
const SEO_META = `
  <title>${BRAND} - ${COPY.hero.valuePromise}</title>
  <meta name="description" content="${COPY.hero.headline}" />
  <meta name="canonical" href="https://cadence.app" />
  <meta property="og:title" content="${BRAND} - ${COPY.hero.valuePromise}" />
  <meta property="og:description" content="${COPY.hero.headline}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://cadence.app" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${BRAND} - ${COPY.hero.valuePromise}" />
  <meta name="twitter:description" content="${COPY.hero.headline}" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "${BRAND}",
    "description": "${COPY.hero.headline}",
    "url": "https://cadence.app"
  }
  </script>
`;

// Internal Components
const Page: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] text-[#F5F5F7] font-[ui-sans-serif,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Inter','Segoe_UI',Roboto,Helvetica,Arial,sans-serif] ${className}`}>
    {children}
  </div>
);

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <section className={`py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto ${className}`}>
    {children}
  </div>
);

const Headline: React.FC<{ children: React.ReactNode; className?: string; level?: 1 | 2 | 3 }> = ({ 
  children, 
  className = '', 
  level = 1 
}) => {
  const baseClasses = 'font-semibold tracking-tight';
  const sizes = {
    1: 'text-4xl sm:text-5xl lg:text-7xl leading-tight',
    2: 'text-3xl sm:text-4xl lg:text-5xl leading-tight',
    3: 'text-2xl sm:text-3xl lg:text-4xl leading-tight'
  };
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag className={`${baseClasses} ${sizes[level]} ${className}`}>
      {children}
    </Tag>
  );
};

const Subcopy: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-lg sm:text-xl text-[#F5F5F7]/80 leading-relaxed ${className}`}>
    {children}
  </p>
);

const CTA: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'solid' | 'ghost';
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'solid', className = '', onClick }) => {
  const baseClasses = 'inline-flex items-center px-8 py-4 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]';
  const variants = {
    solid: 'bg-[#4ADE80] text-[#0A0A0A] hover:bg-[#4ADE80]/90 hover:-translate-y-0.5',
    ghost: 'border border-[#F5F5F7]/20 text-[#F5F5F7] hover:border-[#4ADE80] hover:-translate-y-0.5'
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const Card: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  hoverable?: boolean;
}> = ({ children, className = '', hoverable = true }) => (
  <div className={`
    bg-[#F5F5F7]/[0.02] border border-[#F5F5F7]/[0.08] rounded-2xl backdrop-blur-sm p-8
    ${hoverable ? 'hover:-translate-y-1 hover:border-[#4ADE80]/30 transition-all duration-200' : ''}
    ${className}
  `}>
    {children}
  </div>
);

const Pill: React.FC<{ 
  children: React.ReactNode; 
  active?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({ children, active = false, onClick, className = '' }) => (
  <button 
    className={`
      inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
      ${active 
        ? 'bg-[#4ADE80] text-[#0A0A0A]' 
        : 'bg-[#F5F5F7]/[0.05] text-[#F5F5F7]/80 hover:bg-[#F5F5F7]/[0.1]'
      }
      focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]
      ${className}
    `}
    onClick={onClick}
  >
    {children}
  </button>
);

const AccentBadge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 ${className}`}>
    {children}
  </span>
);

const Feature: React.FC<{ 
  icon: React.ComponentType<any>; 
  title: string; 
  description: string;
  className?: string;
}> = ({ icon: Icon, title, description, className = '' }) => (
  <motion.div 
    className={`group ${className}`}
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
  >
    <Card hoverable={true}>
      <Icon className="w-8 h-8 text-[#4ADE80] mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[#F5F5F7]/70">{description}</p>
    </Card>
  </motion.div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="border-b border-[#F5F5F7]/10"
      initial={false}
    >
      <button
        className="flex items-center justify-between w-full py-6 text-left focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#0A0A0A] rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#4ADE80]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#F5F5F7]/60" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[#F5F5F7]/80">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a 
    href={href} 
    className="text-[#F5F5F7]/60 hover:text-[#F5F5F7] transition-colors duration-200"
  >
    {children}
  </a>
);

// Map SVG Component
const MapGlyph: React.FC<{ activeCity?: string }> = ({ activeCity }) => (
  <svg width="200" height="120" viewBox="0 0 200 120" className="opacity-60">
    <defs>
      <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#4ADE80', stopOpacity: 0.3 }} />
        <stop offset="100%" style={{ stopColor: '#4ADE80', stopOpacity: 0.1 }} />
      </linearGradient>
    </defs>
    {/* Connection path */}
    <path 
      d="M30 60 Q100 30 170 60" 
      stroke="url(#pathGradient)" 
      strokeWidth="1" 
      fill="none" 
      strokeDasharray="4,4"
    />
    {/* London dot */}
    <circle 
      cx="30" 
      cy="60" 
      r={activeCity === 'London' ? "6" : "4"} 
      fill={activeCity === 'London' ? '#4ADE80' : '#F5F5F7'} 
      className="transition-all duration-200"
    />
    {/* NYC dot */}
    <circle 
      cx="170" 
      cy="60" 
      r={activeCity === 'New York City' ? "6" : "4"} 
      fill={activeCity === 'New York City' ? '#4ADE80' : '#F5F5F7'} 
      className="transition-all duration-200"
    />
    {/* City labels */}
    <text x="30" y="80" textAnchor="middle" className="text-xs fill-current text-[#F5F5F7]/60">London</text>
    <text x="170" y="80" textAnchor="middle" className="text-xs fill-current text-[#F5F5F7]/60">NYC</text>
  </svg>
);

// Sponsor Score Visual
const SponsorScore: React.FC = () => (
  <div className="flex items-center space-x-4">
    <div className="relative w-24 h-24">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#4ADE80', stopOpacity: 0.2 }} />
            <stop offset="70%" style={{ stopColor: '#4ADE80', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4ADE80', stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="#F5F5F7"
          strokeOpacity="0.1"
          strokeWidth="6"
          fill="none"
        />
        {/* Progress circle (85% fill) */}
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="url(#scoreGradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="251.2"
          strokeDashoffset="37.7"
          transform="rotate(-90 48 48)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-semibold text-[#4ADE80]">85%</span>
      </div>
    </div>
    <div>
      <div className="text-sm font-medium">Sponsor Score</div>
      <div className="text-xs text-[#F5F5F7]/60 mt-1">Network reliability</div>
    </div>
  </div>
);

// Main HomePage Component
const HomePage: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [selectedCity, setSelectedCity] = useState('London');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    linkedInUrl: '',
    inviteCode: '',
    city: 'London'
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Form validation
  useEffect(() => {
    const { email, fullName, linkedInUrl, city } = formData;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const nameValid = fullName.trim().length > 0;
    const linkedInValid = linkedInUrl.includes('linkedin.com');
    const cityValid = city.length > 0;
    
    setIsFormValid(emailValid && nameValid && linkedInValid && cityValid);
  }, [formData]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Form submitted:', formData);
      // API integration would go here
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <Page className={isDark ? 'dark' : ''}>
      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#F5F5F7]/[0.08]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="text-2xl font-bold tracking-tight">{BRAND}</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-[#F5F5F7]/80 hover:text-[#F5F5F7] transition-colors">
                How it works
              </a>
              <a href="#sports" className="text-[#F5F5F7]/80 hover:text-[#F5F5F7] transition-colors">
                Sports
              </a>
              <a href="#integrity" className="text-[#F5F5F7]/80 hover:text-[#F5F5F7] transition-colors">
                Integrity
              </a>
              <a href="#faq" className="text-[#F5F5F7]/80 hover:text-[#F5F5F7] transition-colors">
                FAQ
              </a>
              <CTA variant="solid" className="text-sm px-6 py-2">
                {COPY.ctas.primary}
              </CTA>
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full bg-[#F5F5F7]/[0.05] hover:bg-[#F5F5F7]/[0.1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-[#F5F5F7]/[0.05] hover:bg-[#F5F5F7]/[0.1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </Container>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#F5F5F7]/[0.08] bg-[#0A0A0A]"
            >
              <Container>
                <div className="py-4 space-y-4">
                  <a href="#how-it-works" className="block text-[#F5F5F7]/80 hover:text-[#F5F5F7] transition-colors">
                    How it works
                  </a>
                  <a href="#sports" className="block text-[#F5F5F7]/80 hover:text-[#F5F5F7] transition-colors">
                    Sports
                  </a>
                  <a href="#integrity" className="block text-[#F5F5F7]/80 hover:text-[#F5F5F7] transition-colors">
                    Integrity
                  </a>
                  <a href="#faq" className="block text-[#F5F5F7]/80 hover:text-[#F5F5F7] transition-colors">
                    FAQ
                  </a>
                  <CTA variant="solid" className="w-full justify-center">
                    {COPY.ctas.primary}
                  </CTA>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <Section className="pt-40 pb-24">
        <Container>
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <AccentBadge>Invite-only</AccentBadge>
              <AccentBadge>Free to start</AccentBadge>
            </div>
            
            <Headline className="mb-8 max-w-5xl mx-auto">
              {COPY.hero.headline}
            </Headline>
            
            <Subcopy className="mb-12 max-w-3xl mx-auto">
              {COPY.hero.subheadline}
            </Subcopy>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <CTA variant="solid" className="w-full sm:w-auto">
                {COPY.ctas.primary}
                <ArrowRight className="ml-2 w-4 h-4" />
              </CTA>
              <CTA variant="ghost" className="w-full sm:w-auto">
                {COPY.ctas.secondary}
              </CTA>
            </div>

            {/* City Selector */}
            <div className="flex flex-col items-center space-y-6">
              <div className="flex flex-wrap justify-center gap-3">
                {COPY.cities.map((city) => (
                  <Pill
                    key={city}
                    active={selectedCity === city}
                    onClick={() => setSelectedCity(city)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {city}
                  </Pill>
                ))}
              </div>
              
              {/* Map Visual */}
              <MapGlyph activeCity={selectedCity} />
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Trust Preview */}
      <Section className="py-16 border-y border-[#F5F5F7]/[0.05]">
        <Container>
          <motion.div 
            className="text-center"
            {...fadeInUp}
          >
            <Subcopy className="mb-8">Built for founders, operators, and investors who train.</Subcopy>
            <div className="flex flex-wrap justify-center gap-4">
              <AccentBadge>Founders</AccentBadge>
              <AccentBadge>C-level</AccentBadge>
              <AccentBadge>Senior Operators</AccentBadge>
              <AccentBadge>Investors</AccentBadge>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works">
        <Container>
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <Headline level={2} className="mb-6">How it works</Headline>
            <Subcopy className="max-w-2xl mx-auto">
              Four simple steps to connect with elite peers and build lasting relationships.
            </Subcopy>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COPY.howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#4ADE80] text-[#0A0A0A] font-bold text-lg mb-6">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <div className="text-sm text-[#4ADE80] mb-4">{step.subtitle}</div>
                  <p className="text-[#F5F5F7]/70">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Value Pillars */}
      <Section>
        <Container>
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <Headline level={2} className="mb-6">Built different</Headline>
            <Subcopy className="max-w-2xl mx-auto">
              Every detail designed to foster genuine connections and eliminate noise.
            </Subcopy>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COPY.valuePillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Feature 
                  icon={pillar.icon}
                  title={pillar.title}
                  description={pillar.description}
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Sports & Formats */}
      <Section id="sports" className="bg-[#F5F5F7]/[0.01]">
        <Container>
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <Headline level={2} className="mb-6">Sports & formats</Headline>
            <Subcopy className="max-w-2xl mx-auto">
              Start with what you love. Build from there.
            </Subcopy>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              {/* Sports */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Sports (V1)</h3>
                <div className="flex flex-wrap gap-3">
                  {COPY.sports.map((sport) => (
                    <Pill key={sport} active={true}>
                      {sport}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Formats */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Formats</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-[#4ADE80] mr-3" />
                    <span><strong>1:1</strong> by default</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-[#4ADE80] mr-3" />
                    <span><strong>Triads</strong> for high conversation density</span>
                  </div>
                  <div className="flex items-center text-[#F5F5F7]/60">
                    <X className="w-5 h-5 mr-3" />
                    <span>No large groups</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <AccentBadge>More sports coming as we scale</AccentBadge>
            </div>
          </div>
        </Container>
      </Section>

      {/* Integrity & Vetting */}
      <Section id="integrity">
        <Container>
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <Headline level={2} className="mb-6">Integrity by design</Headline>
            <Subcopy className="max-w-2xl mx-auto">
              Quality through accountability. Every member matters.
            </Subcopy>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Policy Points */}
            <div className="space-y-6">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-[#4ADE80] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Reliability scoring</h3>
                  <p className="text-[#F5F5F7]/70">System-only score influences future matches</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="w-6 h-6 text-[#4ADE80] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Sponsor accountability</h3>
                  <p className="text-[#F5F5F7]/70">No-shows affect your inviter's reputation</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Check className="w-6 h-6 text-[#4ADE80] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Full verification</h3>
                  <p className="text-[#F5F5F7]/70">Invite + vouch + LinkedIn + real name</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Eye className="w-6 h-6 text-[#4ADE80] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Safety first</h3>
                  <p className="text-[#F5F5F7]/70">Double opt-in confirmations, gentle cooldowns</p>
                </div>
              </div>
            </div>

            {/* Sponsor Score Visual */}
            <div className="flex justify-center">
              <Card className="max-w-sm">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Network Health</h3>
                  <p className="text-sm text-[#F5F5F7]/70">Current reliability across all members</p>
                </div>
                <div className="flex justify-center">
                  <SponsorScore />
                </div>
                <div className="mt-6 text-center">
                  <AccentBadge>Target: ≥85%</AccentBadge>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* City-level Discovery */}
      <Section className="bg-[#F5F5F7]/[0.01]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Headline level={2} className="mb-6">City-level discovery</Headline>
              <Subcopy className="mb-8">
                See vetted members in your area. No precise location until you both accept a session.
              </Subcopy>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {COPY.cities.map((city) => (
                  <Pill key={city} active={city === selectedCity}>
                    <Globe className="w-4 h-4 mr-2" />
                    {city}
                  </Pill>
                ))}
              </div>
              
              <AccentBadge>Privacy-first by default</AccentBadge>
            </motion.div>

            <div className="flex justify-center">
              <Card className="max-w-md">
                <div className="text-center mb-6">
                  <MapPin className="w-8 h-8 text-[#4ADE80] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Launch Cities</h3>
                  <p className="text-sm text-[#F5F5F7]/70">Available now</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>London</span>
                    <AccentBadge>Active</AccentBadge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>New York City</span>
                    <AccentBadge>Active</AccentBadge>
                  </div>
                  <div className="flex items-center justify-between text-[#F5F5F7]/60">
                    <span>More cities</span>
                    <span className="text-xs">Coming soon</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Invite Form */}
      <Section>
        <Container>
          <motion.div 
            className="max-w-2xl mx-auto"
            {...fadeInUp}
          >
            <div className="text-center mb-12">
              <Headline level={2} className="mb-6">Request an invite</Headline>
              <Subcopy>
                Join elite peers in your city. Invite-only, free to start.
              </Subcopy>
            </div>

            <Card>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-[#F5F5F7]/[0.05] border border-[#F5F5F7]/[0.1] rounded-lg text-[#F5F5F7] placeholder-[#F5F5F7]/50 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-[#F5F5F7]/[0.05] border border-[#F5F5F7]/[0.1] rounded-lg text-[#F5F5F7] placeholder-[#F5F5F7]/50 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    LinkedIn URL *
                  </label>
                  <input
                    type="url"
                    required
                    className="w-full px-4 py-3 bg-[#F5F5F7]/[0.05] border border-[#F5F5F7]/[0.1] rounded-lg text-[#F5F5F7] placeholder-[#F5F5F7]/50 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedInUrl}
                    onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-[#F5F5F7]/[0.05] border border-[#F5F5F7]/[0.1] rounded-lg text-[#F5F5F7] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    >
                      {COPY.cities.map((city) => (
                        <option key={city} value={city} className="bg-[#0A0A0A]">
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Invite Code
                      <span className="text-[#F5F5F7]/50 ml-1">(optional)</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-[#F5F5F7]/[0.05] border border-[#F5F5F7]/[0.1] rounded-lg text-[#F5F5F7] placeholder-[#F5F5F7]/50 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                      placeholder="Invite code"
                      value={formData.inviteCode}
                      onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="text-xs text-[#F5F5F7]/60 p-4 bg-[#F5F5F7]/[0.02] rounded-lg">
                  By submitting, you agree to our verification process. We'll never share your data.
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <CTA
                    variant="solid"
                    className={`flex-1 justify-center ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={isFormValid ? undefined : (e) => e.preventDefault()}
                  >
                    {COPY.ctas.primary}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </CTA>
                  <CTA variant="ghost" className="flex-1 justify-center">
                    {COPY.ctas.refer}
                  </CTA>
                </div>
              </form>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-[#F5F5F7]/[0.01]">
        <Container>
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <Headline level={2} className="mb-6">Questions</Headline>
            <Subcopy className="max-w-2xl mx-auto">
              Everything you need to know about joining and using Cadence.
            </Subcopy>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {COPY.faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section>
        <Container>
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            {...fadeInUp}
          >
            <Headline level={2} className="mb-8">
              Ready to train with elite peers?
            </Headline>
            <Subcopy className="mb-12">
              Join the private network for founders and operators who take their sport seriously.
            </Subcopy>
            <CTA variant="solid" className="text-lg px-12 py-4">
              {COPY.ctas.primary}
              <ArrowRight className="ml-3 w-5 h-5" />
            </CTA>
          </motion.div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t border-[#F5F5F7]/[0.05] bg-[#F5F5F7]/[0.01]">
        <Section className="py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Brand */}
              <div>
                <div className="text-2xl font-bold mb-4">{BRAND}</div>
                <p className="text-[#F5F5F7]/60 mb-6">
                  {COPY.footer.tagline}
                </p>
                <div className="flex space-x-4">
                  {COPY.cities.map((city) => (
                    <Pill key={city} active={false}>
                      {city}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <div className="space-y-3">
                  <div><FooterLink href="#how-it-works">How it works</FooterLink></div>
                  <div><FooterLink href="#sports">Sports</FooterLink></div>
                  <div><FooterLink href="#integrity">Integrity</FooterLink></div>
                  <div><FooterLink href="#faq">FAQ</FooterLink></div>
                </div>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <div className="space-y-3">
                  <div><FooterLink href="/privacy">Privacy</FooterLink></div>
                  <div><FooterLink href="/terms">Terms</FooterLink></div>
                  <div><FooterLink href="/contact">Contact</FooterLink></div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#F5F5F7]/[0.05] text-center text-[#F5F5F7]/60">
              <p>&copy; 2024 {BRAND}. All rights reserved.</p>
            </div>
          </Container>
        </Section>
      </footer>
    </Page>
  );
};

export default HomePage;