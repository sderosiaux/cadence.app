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
  MapPin,
  Users,
  Calendar,
  Shield,
  Eye,
  Heart,
  Zap,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Check,
  Globe
} from 'lucide-react';

// Brand constants
const BRAND = 'Cadence';

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

// SEO Meta tags are now handled in app/layout.tsx and app/page.tsx

// Internal Components
const Page: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`min-h-screen bg-white text-gray-900 font-[ui-sans-serif,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Inter','Segoe_UI',Roboto,Helvetica,Arial,sans-serif] ${className}`}>
    {children}
  </div>
);

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => (
  <section id={id} className={`py-32 lg:py-48 px-4 sm:px-6 lg:px-8 ${className}`}>
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
  const baseClasses = 'font-bold tracking-tight text-black';
  const sizes = {
    1: 'text-5xl sm:text-6xl lg:text-8xl leading-[0.9]',
    2: 'text-4xl sm:text-5xl lg:text-6xl leading-[0.95]',
    3: 'text-3xl sm:text-4xl lg:text-5xl leading-tight'
  };
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag className={`${baseClasses} ${sizes[level]} ${className}`}>
      {children}
    </Tag>
  );
};

const Subcopy: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-xl sm:text-2xl lg:text-3xl text-gray-500 leading-relaxed font-normal ${className}`}>
    {children}
  </p>
);

const CTA: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'solid' | 'ghost';
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ children, variant = 'solid', className = '', onClick }) => {
  const baseClasses = 'inline-flex items-center px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4 transform-gpu';
  const variants = {
    solid: 'bg-black text-white hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] active:shadow-sm',
    ghost: 'text-black hover:bg-gray-50 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]'
  };
  
  return (
    <motion.button 
      className={`${baseClasses} ${variants[variant]} ${className}`} 
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  );
};

const Card: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  hoverable?: boolean;
}> = ({ children, className = '', hoverable = true }) => (
  <motion.div 
    className={`
      p-12 rounded-3xl bg-white shadow-sm
      ${hoverable ? 'hover:bg-gray-50/50 transition-all duration-300 cursor-pointer' : ''}
      ${className}
    `}
    whileHover={hoverable ? { y: -2, scale: 1.01, boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)' } : {}}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
  >
    {children}
  </motion.div>
);

const Pill: React.FC<{ 
  children: React.ReactNode; 
  active?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({ children, active = false, onClick, className = '' }) => (
  <button 
    className={`
      inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300
      ${active 
        ? 'bg-black text-white scale-[1.05]' 
        : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:scale-[1.02]'
      }
      focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
      ${className}
    `}
    onClick={onClick}
  >
    {children}
  </button>
);

// Removed AccentBadge component - replaced with simple text in Apple-style redesign

const Feature: React.FC<{ 
  icon: React.ComponentType<{ className?: string }>; 
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
      <p className="text-gray-600">{description}</p>
    </Card>
  </motion.div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="border-b border-gray-200"
      initial={false}
    >
      <button
        className="flex items-center justify-between w-full py-6 text-left focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#4ADE80]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
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
            <div className="pb-6 text-gray-600">
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
    className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
  >
    {children}
  </a>
);

// Cadence Brand Icon Component
const CadenceIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = '', 
  size = 32 
}) => (
  <motion.svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    className={`${className}`}
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
  >
    <defs>
      <linearGradient id="cadenceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#1f2937' }} />
        <stop offset="100%" style={{ stopColor: '#374151' }} />
      </linearGradient>
    </defs>
    {/* Rhythm bars representing cadence/beat */}
    <rect x="4" y="12" width="3" height="8" rx="1.5" fill="url(#cadenceGradient)" />
    <rect x="9" y="8" width="3" height="16" rx="1.5" fill="url(#cadenceGradient)" />
    <rect x="14" y="4" width="3" height="24" rx="1.5" fill="url(#cadenceGradient)" />
    <rect x="19" y="10" width="3" height="12" rx="1.5" fill="url(#cadenceGradient)" />
    <rect x="24" y="6" width="3" height="20" rx="1.5" fill="url(#cadenceGradient)" />
    {/* Connection arc */}
    <path 
      d="M6 16 Q16 6 26 16" 
      stroke="#4ADE80" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
      opacity="0.6"
    />
  </motion.svg>
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
          stroke="#e5e7eb"
          strokeOpacity="1"
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
      <div className="text-xs text-gray-500 mt-1">Network reliability</div>
    </div>
  </div>
);

// Main HomePage Component
const HomePage: React.FC = () => {
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
    animate: { opacity: 1, y: 0 }
  };

  const fadeInUpTransition = { duration: 0.6 };

  return (
    <Page>
      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <CadenceIcon size={32} />
              <div className="text-2xl font-bold tracking-tight">{BRAND}</div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.a 
                href="#how-it-works" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium"
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                How it works
              </motion.a>
              <motion.a 
                href="#sports" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium"
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                Sports
              </motion.a>
              <motion.a 
                href="#integrity" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium"
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                Integrity
              </motion.a>
              <motion.a 
                href="#faq" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium"
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                FAQ
              </motion.a>
              <CTA variant="solid" className="text-sm px-6 py-2">
                {COPY.ctas.primary}
              </CTA>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-white"
                aria-label="Toggle menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
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
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <Container>
                <div className="py-4 space-y-4">
                  <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900 transition-colors">
                    How it works
                  </a>
                  <a href="#sports" className="block text-gray-600 hover:text-gray-900 transition-colors">
                    Sports
                  </a>
                  <a href="#integrity" className="block text-gray-600 hover:text-gray-900 transition-colors">
                    Integrity
                  </a>
                  <a href="#faq" className="block text-gray-600 hover:text-gray-900 transition-colors">
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
      <Section className="pt-48 pb-32">
        <Container>
          <motion.div 
            className="text-center max-w-6xl mx-auto"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={fadeInUpTransition}
          >
            <div className="space-y-12">
              {/* Subtle intro text */}
              <div className="text-center mb-8">
                <p className="text-lg text-gray-600">Invite-only • Free to start</p>
              </div>
              
              {/* Hero headline - bigger and bolder */}
              <Headline className="mb-16">
                {COPY.hero.headline}
              </Headline>
              
              {/* Subheadline with more breathing room */}
              <Subcopy className="mb-20 max-w-4xl mx-auto">
                {COPY.hero.subheadline}
              </Subcopy>

              {/* CTAs with more space */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                <CTA variant="solid">
                  {COPY.ctas.primary}
                </CTA>
                <CTA variant="ghost">
                  {COPY.ctas.secondary}
                </CTA>
              </div>

              {/* City selector - cleaner presentation */}
              <div className="space-y-12">
                <div className="flex justify-center gap-6">
                  {COPY.cities.map((city) => (
                    <Pill
                      key={city}
                      active={selectedCity === city}
                      onClick={() => setSelectedCity(city)}
                    >
                      {city}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Hero Training Image */}
      <Section className="py-16">
        <Container>
          <motion.div 
            className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[3/2] max-w-6xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero training image */}
            <div className="absolute inset-0">
              <img 
                src="/london.png" 
                alt="Elite founders training together in London"
                className="w-full h-full object-contain"
              />
              {/* Elegant overlay with content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                <div className="w-full p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">Elite founders training together</h3>
                  <p className="text-white/90 text-lg">London • Boxing session with tech executives</p>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Trust Preview - Apple-style clean */}
      <Section className="py-24">
        <Container>
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Subcopy className="text-xl">Built for founders, operators, and investors who train.</Subcopy>
          </motion.div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works" className="py-32">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">How it works</Headline>
            <Subcopy className="max-w-3xl mx-auto text-lg">
              Connect with your peers in four simple steps.
            </Subcopy>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {COPY.howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black text-white font-bold text-xl mb-6">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{step.title}</h3>
                  <div className="text-sm text-[#4ADE80] font-medium mb-4">{step.subtitle}</div>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Value Pillars */}
      <Section className="py-32">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">Built different</Headline>
            <Subcopy className="max-w-3xl mx-auto text-lg">
              Every detail designed to foster genuine connections.
            </Subcopy>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
      <Section id="sports" className="py-32 bg-gray-50">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">Start with what you love</Headline>
            <Subcopy className="max-w-3xl mx-auto text-lg">
              Train in the sports you're passionate about, in formats that work.
            </Subcopy>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
              {/* Sports */}
              <div>
                <h3 className="text-2xl font-bold mb-8 tracking-tight">Sports (V1)</h3>
                <div className="flex flex-wrap gap-4">
                  {COPY.sports.map((sport) => (
                    <Pill key={sport} active={true}>
                      {sport}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Formats */}
              <div>
                <h3 className="text-2xl font-bold mb-8 tracking-tight">Formats</h3>
                <div className="space-y-5">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-[#4ADE80] mr-4" />
                    <span className="text-lg"><strong>1:1</strong> by default</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-[#4ADE80] mr-4" />
                    <span className="text-lg"><strong>Triads</strong> for high conversation density</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <X className="w-5 h-5 mr-4" />
                    <span className="text-lg">No large groups</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-8">
              <p className="text-gray-500 text-sm">More sports coming as we scale</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Network in Action Image */}
      <Section className="py-16">
        <Container>
          <motion.div 
            className="relative rounded-3xl overflow-hidden bg-gray-200 aspect-[3/2] max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Network training image */}
            <div className="absolute inset-0">
              <img 
                src="/nyc.png" 
                alt="Weekly tennis sessions with NYC founders"
                className="w-full h-full object-contain"
              />
              {/* Elegant overlay with content and metrics */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="w-full p-8">
                  <div className="flex items-end justify-between text-white">
                    <div>
                      <h3 className="text-xl font-bold mb-2 tracking-tight">Weekly tennis sessions</h3>
                      <p className="text-white/90">NYC founders staying connected through sport</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/70 mb-1">Reliability Score</p>
                      <p className="text-2xl font-bold text-green-400">94%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Integrity & Vetting */}
      <Section id="integrity" className="py-32">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">Quality through accountability</Headline>
            <Subcopy className="max-w-3xl mx-auto text-lg">
              Every member's reliability shapes the entire network.
            </Subcopy>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Policy Points */}
            <div className="space-y-8">
              <div className="flex items-start">
                <Shield className="w-7 h-7 text-[#4ADE80] mr-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-3 tracking-tight">Reliability scoring</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">System-only score influences future matches</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="w-7 h-7 text-[#4ADE80] mr-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-3 tracking-tight">Sponsor accountability</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">No-shows affect your inviter's reputation</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Check className="w-7 h-7 text-[#4ADE80] mr-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-3 tracking-tight">Full verification</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">Invite + vouch + LinkedIn + real name</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Eye className="w-7 h-7 text-[#4ADE80] mr-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-3 tracking-tight">Safety first</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">Double opt-in confirmations, gentle cooldowns</p>
                </div>
              </div>
            </div>

            {/* Sponsor Score Visual */}
            <div className="flex justify-center">
              <Card className="max-w-sm p-10">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-3 tracking-tight">Network Health</h3>
                  <p className="text-gray-600">Current reliability across all members</p>
                </div>
                <div className="flex justify-center">
                  <SponsorScore />
                </div>
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 font-medium">Target: ≥85%</p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* City-level Discovery */}
      <Section className="py-32 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={fadeInUpTransition}
            >
              <Headline level={2} className="mb-8">Find your people</Headline>
              <Subcopy className="mb-10 text-lg leading-relaxed">
                See vetted members in your city. Privacy-first until you're both ready to train.
              </Subcopy>
              
              <div className="flex flex-wrap gap-4 mb-10">
                {COPY.cities.map((city) => (
                  <Pill key={city} active={city === selectedCity}>
                    <Globe className="w-4 h-4 mr-2" />
                    {city}
                  </Pill>
                ))}
              </div>
              
              <div className="mt-8">
                <p className="text-sm text-gray-600 font-medium">Privacy-first by default</p>
              </div>
            </motion.div>

            <div className="flex justify-center">
              <Card className="max-w-md p-8">
                <div className="text-center mb-8">
                  <MapPin className="w-10 h-10 text-[#4ADE80] mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-3 tracking-tight">Launch Cities</h3>
                  <p className="text-gray-600">Available now</p>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span>London</span>
                    <span className="text-sm text-green-600 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>New York City</span>
                    <span className="text-sm text-green-600 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
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
      <Section className="py-32">
        <Container>
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <div className="text-center mb-16">
              <Headline level={2} className="mb-8">Request an invite</Headline>
              <Subcopy className="text-lg">
                Join elite peers in your city. Invite-only, free to start.
              </Subcopy>
            </div>

            <Card className="p-12">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
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
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
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
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    >
                      {COPY.cities.map((city) => (
                        <option key={city} value={city} className="bg-white">
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
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                      placeholder="Invite code"
                      value={formData.inviteCode}
                      onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="text-xs text-gray-600 p-4 bg-gray-50 rounded-lg">
                  By submitting, you agree to our verification process. We'll never share your data.
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <CTA
                    variant="solid"
                    className={`flex-1 justify-center ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
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
      <Section id="faq" className="py-32 bg-gray-50">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">Questions</Headline>
            <Subcopy className="max-w-3xl mx-auto text-lg">
              Everything you need to know about joining and using Cadence.
            </Subcopy>
          </motion.div>

          <div className="max-w-4xl mx-auto">
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
      <Section className="py-32">
        <Container>
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-10">
              Ready to train with elite peers?
            </Headline>
            <Subcopy className="mb-16 text-lg">
              Join the private network for founders and operators who take their sport seriously.
            </Subcopy>
            <CTA variant="solid" className="text-lg px-16 py-5">
              {COPY.ctas.primary}
              <ArrowRight className="ml-3 w-5 h-5" />
            </CTA>
          </motion.div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <Section className="py-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <CadenceIcon size={36} />
                  <div className="text-3xl font-bold tracking-tight">{BRAND}</div>
                </div>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
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
                <h3 className="font-bold text-lg mb-6 tracking-tight">Product</h3>
                <div className="space-y-4">
                  <div><FooterLink href="#how-it-works">How it works</FooterLink></div>
                  <div><FooterLink href="#sports">Sports</FooterLink></div>
                  <div><FooterLink href="#integrity">Integrity</FooterLink></div>
                  <div><FooterLink href="#faq">FAQ</FooterLink></div>
                </div>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-bold text-lg mb-6 tracking-tight">Legal</h3>
                <div className="space-y-4">
                  <div><FooterLink href="/privacy">Privacy</FooterLink></div>
                  <div><FooterLink href="/terms">Terms</FooterLink></div>
                  <div><FooterLink href="/contact">Contact</FooterLink></div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-gray-200 text-center text-gray-500">
              <p className="text-lg">&copy; 2024 {BRAND}. All rights reserved.</p>
            </div>
          </Container>
        </Section>
      </footer>
    </Page>
  );
};

export default HomePage;