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
import copyData from '../copy/home.en-US.json';

// Helper function for asset paths on GitHub Pages
const getAssetPath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/cadence.app' : '';
  return `${basePath}${path}`;
};
import {
  Menu,
  X,
  MapPin,
  Users,
  Calendar,
  Shield,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Check
} from 'lucide-react';

// Brand constants
const BRAND = 'Cadence';

// Use copy from JSON file
const COPY = copyData;

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


// Main HomePage Component
const HomePage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('london');
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
      trackEvent('form_submitted', {
        city: formData.city,
        has_invite_code: Boolean(formData.inviteCode),
        form_location: 'homepage'
      });
      console.log('Form submitted:', formData);
      // API integration would go here
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const fadeInUpTransition = { duration: 0.6 };

  // Analytics tracking functions
  const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
    // In production, this would connect to your analytics service (Google Analytics, Mixpanel, etc.)
    if (typeof window !== 'undefined') {
      console.log('Analytics Event:', eventName, properties);
      // Example for Google Analytics 4:
      // gtag('event', eventName, properties);
      // Example for Mixpanel:
      // mixpanel.track(eventName, properties);
    }
  };

  const trackCTAClick = (location: string, city?: string) => {
    trackEvent('cta_clicked', {
      location,
      city,
      page: 'homepage'
    });
  };

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cadence",
    "description": COPY.seo.description,
    "url": "https://cadence.app",
    "logo": "https://cadence.app/favicon.svg",
    "sameAs": [
      "https://twitter.com/cadence_app"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@cadence.app",
      "contactType": "customer service"
    },
    "areaServed": [
      {
        "@type": "Place",
        "name": "London, United Kingdom"
      },
      {
        "@type": "Place", 
        "name": "New York, United States"
      }
    ],
    "makesOffer": {
      "@type": "Offer",
      "name": "Private Sports Networking",
      "description": "Invite-only sports-led matches for founders and executives",
      "category": "Professional Networking"
    }
  };

  return (
    <Page>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                href="#trust" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium"
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                Trust
              </motion.a>
              <motion.a 
                href="#faq" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium"
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                FAQ
              </motion.a>
              <CTA 
                variant="solid" 
                className="text-sm px-6 py-2"
                onClick={() => {
                  trackCTAClick('header');
                  document.getElementById('invite-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
Request an Invite
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
                  <a href="#trust" className="block text-gray-600 hover:text-gray-900 transition-colors">
                    Trust
                  </a>
                  <a href="#faq" className="block text-gray-600 hover:text-gray-900 transition-colors">
                    FAQ
                  </a>
                  <CTA 
                    variant="solid" 
                    className="w-full justify-center"
                    onClick={() => document.getElementById('invite-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
    Request an Invite
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
                <p className="text-lg text-gray-600">{COPY.hero.proof}</p>
              </div>
              
              {/* Hero headline - bigger and bolder */}
              <Headline className="mb-16">
                {COPY.hero.h1}
              </Headline>
              
              {/* Subheadline with more breathing room */}
              <Subcopy className="mb-12 max-w-4xl mx-auto">
                {COPY.hero.subhead}
              </Subcopy>

              {/* Emotional line */}
              <div className="mb-20 max-w-4xl mx-auto">
                <p className="text-lg text-gray-600 leading-relaxed italic">
                  {COPY.hero.emotionalLine}
                </p>
              </div>

              {/* CTAs with city-specific options */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                <CTA 
                  variant="solid"
                  onClick={() => {
                    trackCTAClick('hero', 'London');
                    const form = document.getElementById('invite-form');
                    const citySelect = document.querySelector('select[name="city"]') as HTMLSelectElement;
                    if (form && citySelect) {
                      citySelect.value = 'London';
                      form.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {COPY.hero.ctaPrimaryLondon}
                </CTA>
                <CTA 
                  variant="solid"
                  onClick={() => {
                    trackCTAClick('hero', 'New York');
                    const form = document.getElementById('invite-form');
                    const citySelect = document.querySelector('select[name="city"]') as HTMLSelectElement;
                    if (form && citySelect) {
                      citySelect.value = 'New York';
                      form.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {COPY.hero.ctaPrimaryNY}
                </CTA>
              </div>
              
              <div className="flex justify-center mb-8">
                <CTA 
                  variant="ghost"
                  onClick={() => {
                    trackEvent('how_it_works_clicked', { location: 'hero' });
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {COPY.hero.ctaSecondary}
                </CTA>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Who We Serve Section */}
      <Section className="py-24">
        <Container>
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">{COPY.who.title}</Headline>
            <Subcopy className="mb-12 max-w-4xl mx-auto text-lg">
              {COPY.who.body}
            </Subcopy>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COPY.who.bullets.map((bullet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 bg-gray-50 rounded-2xl"
                >
                  <p className="text-lg font-medium">{bullet}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* The Problem & Promise */}
      <Section className="py-24 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={fadeInUpTransition}
            >
              <Headline level={2} className="mb-8">{COPY.problem.title}</Headline>
              <Subcopy className="text-lg">
                {COPY.problem.body}
              </Subcopy>
            </motion.div>
            
            <motion.div 
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUpTransition, delay: 0.2 }}
            >
              <Headline level={2} className="mb-8">{COPY.promise.title}</Headline>
              <Subcopy className="text-lg">
                {COPY.promise.body}
              </Subcopy>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Why This Wins */}
      <Section className="py-32">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">{COPY.why.title}</Headline>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COPY.why.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 font-bold text-lg mb-6">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 tracking-tight">{item.headline}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.copy}</p>
                </Card>
              </motion.div>
            ))}
          </div>
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
                src={getAssetPath('/london.png')}
                alt="Elite founders training together in London"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
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
            <Headline level={2} className="mb-8">{COPY.how.title}</Headline>
            <Subcopy className="max-w-3xl mx-auto text-lg mb-4">
              {COPY.how.lead}
            </Subcopy>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">{COPY.how.note}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {COPY.how.steps.map((step, index) => (
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
                  <p className="text-lg font-medium leading-relaxed">{step}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Product Pillars */}
      <Section className="py-32">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">{COPY.pillars.title}</Headline>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {COPY.pillars.items.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8">
                  <h3 className="text-xl font-bold mb-4 tracking-tight">{pillar.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{pillar.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Matching System */}
      <Section className="py-32 bg-gray-50">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">{COPY.matching.title}</Headline>
            <Subcopy className="max-w-4xl mx-auto text-lg mb-8">
              {COPY.matching.body}
            </Subcopy>
            <p className="text-gray-600 italic">{COPY.matching.note}</p>
          </motion.div>
        </Container>
      </Section>

      {/* Rituals */}
      <Section className="py-32">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">{COPY.rituals.title}</Headline>
            <Subcopy className="max-w-4xl mx-auto text-lg mb-8">
              {COPY.rituals.body}
            </Subcopy>
            <p className="text-gray-600 mb-8">{COPY.rituals.note}</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="flex gap-2 bg-gray-100 p-2 rounded-full">
                <Pill 
                  active={selectedCity === 'london'}
                  onClick={() => setSelectedCity('london')}
                >
                  London
                </Pill>
                <Pill 
                  active={selectedCity === 'ny'}
                  onClick={() => setSelectedCity('ny')}
                >
                  New York
                </Pill>
              </div>
            </div>
            
            <Card className="p-12">
              <div className="space-y-4">
                {selectedCity === 'london' 
                  ? COPY.rituals.tabs.london.list.map((ritual, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center p-4 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Calendar className="w-5 h-5 text-green-600 mr-4" />
                        <span className="text-lg">{ritual}</span>
                      </motion.div>
                    ))
                  : COPY.rituals.tabs.ny.list.map((ritual, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center p-4 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Calendar className="w-5 h-5 text-green-600 mr-4" />
                        <span className="text-lg">{ritual}</span>
                      </motion.div>
                    ))
                }
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Quiet Signals */}
      <Section className="py-32 bg-gray-50">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">{COPY.signals.title}</Headline>
            <Subcopy className="max-w-4xl mx-auto text-lg mb-8">
              {COPY.signals.intro}
            </Subcopy>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {COPY.signals.items.map((signal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8">
                  <h3 className="text-xl font-bold mb-4 tracking-tight">{signal.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{signal.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-sm text-gray-600 font-medium">{COPY.signals.note}</p>
          </div>
        </Container>
      </Section>

      {/* Member Kit */}
      <Section className="py-32">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">{COPY.kit.title}</Headline>
            <Subcopy className="max-w-4xl mx-auto text-lg mb-12">
              {COPY.kit.body}
            </Subcopy>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-12">
              <div className="space-y-6">
                {COPY.kit.list.map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-600 rounded-full mr-4 flex-shrink-0"></div>
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <CTA 
                  variant="solid"
                  onClick={() => {
                    trackEvent('order_kit_click', { location: 'member_kit' });
                    // Kit ordering functionality would go here
                  }}
                >
                  {COPY.kit.cta}
                </CTA>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Trust and Rules */}
      <Section id="trust" className="py-32 bg-gray-50">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">{COPY.trust.title}</Headline>
            <Subcopy className="max-w-4xl mx-auto text-lg mb-8">
              {COPY.trust.intro}
            </Subcopy>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {COPY.trust.bullets.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                      <p className="text-lg leading-relaxed">{rule}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Cities and Plans */}
      <Section className="py-32">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">{COPY.cities.title}</Headline>
            <Subcopy className="max-w-4xl mx-auto text-lg mb-8">
              {COPY.cities.intro}
            </Subcopy>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {COPY.cities.cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 text-center">
                  <MapPin className="w-12 h-12 text-green-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">{card.city}</h3>
                  <p className="text-xl text-green-600 font-semibold mb-2">{card.price}</p>
                  <p className="text-gray-600">{card.note}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">{COPY.cities.microcopy}</p>
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
                src={getAssetPath('/nyc.png')}
                alt="Weekly tennis sessions with NYC founders"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
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

      {/* For Funds */}
      <Section className="py-32 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
            <motion.div 
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={fadeInUpTransition}
            >
              <Headline level={2} className="mb-8">{COPY.funds.title}</Headline>
              <Subcopy className="mb-12 text-lg leading-relaxed">
                {COPY.funds.body}
              </Subcopy>
              <CTA 
                variant="solid"
                onClick={() => {
                  trackEvent('partner_cta_click', { location: 'funds_section' });
                  // Partner form would go here
                }}
              >
                {COPY.funds.cta}
              </CTA>
            </motion.div>
            
            <div className="flex justify-center">
              <Card className="p-12 max-w-md">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 tracking-tight">Fund partnerships</h3>
                  <p className="text-gray-600">Private blocks for portfolio companies</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span>GP and partner access</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span>Portfolio founder matches</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span>Custom fund branding</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Social Proof */}
      <Section className="py-32">
        <Container>
          <motion.div 
            className="text-center mb-20"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUpTransition}
          >
            <Headline level={2} className="mb-8">{COPY.proof.title}</Headline>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {COPY.proof.quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8">
                  <p className="text-lg italic leading-relaxed mb-6">"{quote}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                    <div className="text-sm text-gray-600">Member</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>


      {/* Invite Form */}
      <Section id="invite-form" className="py-32">
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
                      name="city"
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    >
                        <option value="London" className="bg-white">London</option>
                        <option value="New York" className="bg-white">New York</option>
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
    Request an Invite
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </CTA>
                  <CTA variant="ghost" className="flex-1 justify-center">
                    {COPY.finalCta.ctaRefer}
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
            {COPY.faq.qa.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.q}
                answer={faq.a}
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
              {COPY.finalCta.title}
            </Headline>
            <Subcopy className="mb-16 text-lg">
              {COPY.finalCta.body}
            </Subcopy>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <CTA 
                variant="solid" 
                className="text-lg px-16 py-5"
                onClick={() => {
                  trackCTAClick('final_cta', 'London');
                  const form = document.getElementById('invite-form');
                  const citySelect = document.querySelector('select[name="city"]') as HTMLSelectElement;
                  if (form && citySelect) {
                    citySelect.value = 'London';
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {COPY.finalCta.ctaLondon}
                <ArrowRight className="ml-3 w-5 h-5" />
              </CTA>
              <CTA 
                variant="solid" 
                className="text-lg px-16 py-5"
                onClick={() => {
                  trackCTAClick('final_cta', 'New York');
                  const form = document.getElementById('invite-form');
                  const citySelect = document.querySelector('select[name="city"]') as HTMLSelectElement;
                  if (form && citySelect) {
                    citySelect.value = 'New York';
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {COPY.finalCta.ctaNY}
                <ArrowRight className="ml-3 w-5 h-5" />
              </CTA>
            </div>
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
                  {COPY.footer.contact}
                </p>
                <div className="flex space-x-4">
                  <Pill active={false}>London</Pill>
                  <Pill active={false}>New York</Pill>
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="font-bold text-lg mb-6 tracking-tight">Product</h3>
                <div className="space-y-4">
                  <div><FooterLink href="#how-it-works">How it works</FooterLink></div>
                  <div><FooterLink href="#trust">Trust</FooterLink></div>
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