# Cadence Homepage - Implementation Debug Log

## Component Architecture

### Core Design Principles
- **Apple-style minimalism**: Generous whitespace, large typography, quiet luxury aesthetic
- **Single file architecture**: Everything contained in one 2,000+ line TSX file for easy deployment
- **Performance-first**: Inline SVGs, no external images, optimized animations
- **Accessibility-compliant**: WCAG AA+ with proper ARIA, keyboard navigation, focus styles

### Brand System
```typescript
const BRAND = 'Cadence';
const ACCENT = '#4ADE80'; // Mint green - easily changeable
```

### Color Palette
- Background: `#0A0A0A` (near-black with subtle noise potential)
- Foreground: `#F5F5F7` (soft white)
- Accent: `#4ADE80` (mint) or `#7C3AED` (violet) - configurable
- Glass effects: `rgba(255,255,255,0.08)` borders with backdrop-blur

### Typography Stack
```css
font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif
```

## Component Library

### Internal Components Built
1. **Page** - Root container with theme support
2. **Section** - Standard vertical rhythm (py-24)
3. **Container** - Max-width constraint (max-w-7xl)
4. **Headline** - Responsive typography (levels 1-3)
5. **Subcopy** - Secondary text styling
6. **CTA** - Button variants (solid/ghost)
7. **Card** - Glassy containers with hover effects
8. **Pill** - Interactive badges and filters
9. **AccentBadge** - Small status indicators
10. **Feature** - Icon + title + description layout
11. **FAQItem** - Accordion with smooth animations
12. **FooterLink** - Styled footer navigation

## Section-by-Section Implementation

### 1. Header/Navigation
- **Sticky positioning** with glassy backdrop
- **Mobile-responsive** hamburger menu
- **Theme toggle** (Sun/Moon icons)
- **Focus management** for accessibility
- **Brand wordmark** with proper hierarchy

### 2. Hero Section
- **Large-scale typography** (text-4xl → text-7xl)
- **City selector pills** with active states
- **Animated map motif** (MapGlyph SVG)
- **Dual CTAs** (primary solid, secondary ghost)
- **AccentBadge** status indicators

### 3. Trust Preview
- **Minimal social proof** without fake logos
- **Professional badge styling**
- **Centered layout** with proper spacing

### 4. How It Works (4-Step Process)
- **Numbered cards** with consistent styling
- **Grid layout** (1→2→4 columns responsive)
- **Staggered animations** (100ms delay increments)
- **Step indicators** with accent backgrounds

### 5. Value Pillars (3x2 Grid)
- **Icon integration** from lucide-react
- **Hover animations** (translateY + border accent)
- **Feature component** reusability
- **Responsive grid** with proper breakpoints

### 6. Sports & Formats
- **Interactive pills** for sports selection
- **Checkmarks and X marks** for format clarity
- **Grid split layout** (sports vs formats)
- **Future-proofing** with "more coming" messaging

### 7. Integrity & Vetting
- **Split section design** (policy points + visual)
- **Custom SponsorScore gauge** (SVG animation)
- **Icon-text combinations** with proper alignment
- **Trust-building** through transparency

### 8. City-Level Discovery
- **Privacy messaging** prominence
- **Map integration** with city toggles
- **Card-based** information hierarchy
- **Status badges** for city availability

### 9. Invite Form Module
- **Real-time validation** with visual feedback
- **Form state management** with React hooks
- **Accessibility labels** and error states
- **Console logging** for API integration readiness
- **Privacy notice** with subtle styling

### 10. FAQ Accordion
- **Smooth animations** with framer-motion
- **Proper ARIA** expanded/collapsed states
- **Icon state changes** (ChevronUp/Down)
- **Content overflow** handling

### 11. Final CTA
- **Conversion-focused** messaging
- **Large-scale** call-to-action button
- **Clean background** to reduce distractions

### 12. Footer
- **Three-column grid** responsive layout
- **Brand reinforcement** with tagline
- **Proper link hierarchy** and hover states
- **City toggles** for consistency

## Advanced Features

### Form Validation System
```typescript
useEffect(() => {
  const { email, fullName, linkedInUrl, city } = formData;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const nameValid = fullName.trim().length > 0;
  const linkedInValid = linkedInUrl.includes('linkedin.com');
  const cityValid = city.length > 0;
  
  setIsFormValid(emailValid && nameValid && linkedInValid && cityValid);
}, [formData]);
```

### Custom SVG Components

#### MapGlyph Animation
- **Two city dots** (London, NYC)
- **Connecting path** with gradient and dash array
- **Dynamic highlighting** based on selected city
- **Smooth transitions** with CSS classes

#### SponsorScore Gauge
- **Circular progress** indicator (85% fill)
- **SVG gradient** definitions
- **Smooth animation** with CSS transitions
- **Centered percentage** display

### Motion & Interaction Design

#### Framer Motion Patterns
```typescript
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
```

#### Hover Effects
- **translateY(-2px)** for card lifting
- **Border color transitions** to accent
- **Smooth duration** (200ms standard)
- **Focus ring** management for accessibility

### Responsive Breakpoints
- **Mobile**: Default (360px+)
- **SM**: 640px (sm:)
- **MD**: 768px (md:)
- **LG**: 1024px (lg:)
- **Max width**: 1440px (max-w-7xl)

### Performance Optimizations
- **Inline SVGs** instead of image files
- **CSS gradients** for visual effects
- **Minimal JavaScript** bundle size
- **Efficient re-renders** with proper React patterns
- **Lazy animation** triggers on scroll

### Accessibility Features
- **Semantic HTML** structure
- **ARIA labels** for interactive elements
- **Focus management** with visible rings
- **Color contrast** WCAG AA+ compliance
- **Keyboard navigation** support
- **Screen reader** friendly content

### SEO Preparation
```typescript
const SEO_META = `
  <title>${BRAND} - ${COPY.hero.valuePromise}</title>
  <meta name="description" content="${COPY.hero.headline}" />
  <meta property="og:title" content="${BRAND} - ${COPY.hero.valuePromise}" />
  // ... additional meta tags
`;
```

## Integration Notes

### Next.js App Router Setup
1. Install dependencies: `npm install framer-motion lucide-react`
2. Copy HomePage.tsx to project
3. Import in app/page.tsx: `import HomePage from './HomePage'`
4. Ensure Tailwind configured with dark mode

### Customization Points
- **Brand name**: Change `BRAND` constant
- **Accent color**: Modify `ACCENT` constant  
- **Copy**: Update `COPY` object properties
- **Cities**: Modify `COPY.cities` array
- **Sports**: Update `COPY.sports` array

### API Integration Ready
- Form submission console logs JSON
- Validation state management in place
- Error handling structure prepared
- Success/loading states can be added

## Known Considerations

### Browser Support
- **Modern browsers** (ES6+ features)
- **Framer Motion** requires JavaScript
- **CSS Grid** and **Flexbox** dependencies
- **Backdrop-blur** may need fallbacks

### Performance Targets
- **Lighthouse 95+** across all metrics
- **First Contentful Paint** < 1.2s
- **Cumulative Layout Shift** < 0.1
- **Time to Interactive** < 3.5s

### Future Enhancements
- **Storybook** integration for component library
- **Jest/Testing Library** for unit tests
- **Playwright** for E2E testing
- **Bundle analysis** for size optimization