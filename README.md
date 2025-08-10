# Cadence - Premium Marketing Homepage

A premium, Apple-style marketing homepage for Cadence - the private, vetted, sports-first network for founders and operators.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+
- Next.js 14+ project with Tailwind CSS

### Installation

1. **Install dependencies:**
   ```bash
   npm install framer-motion lucide-react
   ```

2. **Copy the component:**
   Copy `HomePage.tsx` to your Next.js project

3. **Use in your app:**
   ```typescript
   // app/page.tsx (App Router)
   import HomePage from './HomePage'
   
   export default function Page() {
     return <HomePage />
   }
   ```

### Tailwind Configuration

Ensure your `tailwind.config.js` includes:

```javascript
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ... rest of config
}
```

## 🎨 Features

### Premium Design
- **Apple-style aesthetic** with generous whitespace and large typography
- **Mint green accent** (#4ADE80) easily customizable
- **Dark theme** with light mode support
- **Glassy card effects** with subtle borders and backdrop blur
- **Smooth micro-interactions** throughout

### Fully Responsive
- **Mobile-first** design (360px → 1440px+)
- **Tablet and desktop** optimized layouts
- **Touch-friendly** interactions
- **Progressive enhancement**

### Accessibility First
- **WCAG AA+** compliant
- **Keyboard navigation** support
- **Screen reader** friendly
- **High color contrast** ratios
- **Focus management** with visible indicators

### Performance Optimized
- **Single file** component architecture
- **Inline SVGs** (no external images)
- **Optimized animations** with framer-motion
- **Lighthouse 95+** targets across all metrics

## 📖 Component Structure

### Main Sections (in order)
1. **Header/Navigation** - Sticky glassy nav with theme toggle
2. **Hero** - Large headlines, CTAs, city selector with map
3. **Trust Preview** - Social proof badges
4. **How it Works** - 4-step process with animations
5. **Value Pillars** - 3x2 grid with hover effects
6. **Sports & Formats** - Interactive pills and feature lists
7. **Integrity & Vetting** - Trust-building with animated gauge
8. **City Discovery** - Privacy-focused location messaging
9. **Invite Form** - Validated form with real-time feedback
10. **FAQ** - Smooth accordion interactions
11. **Final CTA** - Conversion-focused section
12. **Footer** - Clean three-column layout

### Internal Components
- `Page`, `Section`, `Container` - Layout primitives
- `Headline`, `Subcopy` - Typography components  
- `CTA`, `Pill`, `AccentBadge` - Interactive elements
- `Card`, `Feature` - Content containers
- `FAQItem`, `FooterLink` - Specialized components

## 🛠️ Customization

### Brand Configuration
```typescript
// Easy customization points in HomePage.tsx
const BRAND = 'Cadence'; // Change brand name
const ACCENT = '#4ADE80'; // Change accent color (mint green)
```

### Copy Management
All text content is stored in the `COPY` constant object:
```typescript
const COPY = {
  hero: {
    headline: 'Your headline here...',
    subheadline: 'Your subheadline here...'
  },
  // ... all other copy
}
```

### Cities & Sports
```typescript
cities: ['London', 'New York City'], // Add more cities
sports: ['Running', 'Tennis', 'Strength Pods', 'Cycling'] // Add more sports
```

## 🔗 API Integration

### Form Submission
The invite form currently logs to console. Replace with your API:

```typescript
const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (isFormValid) {
    // Replace with your API call
    fetch('/api/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
  }
};
```

## 🎭 Animations

### Framer Motion Patterns
- **Fade in up** on scroll reveal
- **Hover lifts** on interactive cards
- **Smooth transitions** (200ms standard)
- **Staggered animations** for lists

### Custom SVG Animations
- **MapGlyph** - Animated city connections
- **SponsorScore** - Circular progress gauge
- **Icon transitions** throughout

## 🧪 Testing & Quality

### Recommended Testing
```bash
# Type checking
npm run typecheck

# Linting  
npm run lint

# Build verification
npm run build
```

### Performance Targets
- **Lighthouse Performance**: 95+
- **First Contentful Paint**: < 1.2s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

### Browser Support
- **Modern browsers** (Chrome 90+, Firefox 90+, Safari 14+)
- **ES6+ features** required
- **CSS Grid & Flexbox** dependencies

## 📱 Mobile Experience

### Touch Interactions
- **Large tap targets** (44px minimum)
- **Swipe-friendly** carousel elements
- **Mobile-optimized** form inputs
- **Gesture-aware** animations

### Mobile Menu
- **Slide-out navigation** on mobile
- **Touch-friendly** close behavior
- **Proper z-index** stacking

## 🔒 Security & Privacy

### Form Security
- **Client-side validation** only (server validation required)
- **No sensitive data** stored in component state
- **Privacy notice** included in form

### Content Security
- **No external resources** loaded
- **Inline SVGs** only
- **Safe HTML** rendering

## 🚢 Deployment

### GitHub Pages (Automatic) ⭐
This repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to `main`.

**Setup:**
1. Go to your repository **Settings > Pages**
2. Set **Source** to "GitHub Actions"  
3. Push to `main` branch - deployment happens automatically!
4. Your site will be available at: `https://yourusername.github.io/repository-name`

The workflow automatically:
- Builds the Next.js app for static export
- Runs all quality checks (TypeScript, ESLint)
- Deploys to GitHub Pages
- Zero configuration needed!

### Next.js App Router
```typescript
// app/page.tsx
import HomePage from '../components/HomePage'

export const metadata = {
  title: 'Cadence - Elite peers, zero noise',
  description: 'A private, vetted, sports-first network for founders and operators.'
}

export default function Page() {
  return <HomePage />
}
```

### Vercel
```bash
npm install -g vercel
vercel
```

### Other Platforms
```bash
npm run build
# Upload the ./out folder to your hosting provider
```

## 🔧 Troubleshooting

### Common Issues

**Tailwind classes not applying:**
- Ensure component path in `tailwind.config.js` content array
- Verify dark mode configuration

**Animations not working:**
- Check framer-motion installation: `npm install framer-motion`
- Verify React version compatibility (18+)

**Icons not displaying:**
- Check lucide-react installation: `npm install lucide-react`
- Verify import paths

### Development Mode
```bash
npm run dev
```
Component will be available with hot reloading and error overlay.

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

This component was built as a complete, production-ready solution. For customization:

1. **Fork** the component
2. **Modify** constants and styling
3. **Test** across devices and browsers
4. **Deploy** with your changes

Built with ❤️ using React, TypeScript, Tailwind CSS, and Framer Motion.