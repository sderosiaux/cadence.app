/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Performance optimizations
  swcMinify: true,
  compress: true,

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Note: headers, rewrites, and redirects are disabled for static export

  // Bundle analyzer (enabled with ANALYZE=true)
  webpack: (config, { dev, isServer }) => {
    // Bundle analyzer
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      );
    }

    // Optimize for production (removed framer-motion alias as it causes issues)

    return config;
  },

  // Environment variables for build optimization
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
  },

  // Output configuration for GitHub Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],


  // React strict mode
  reactStrictMode: true,

  // Power optimizations for Vercel
  poweredByHeader: false,
  generateEtags: false,

  // Asset prefix for CDN (uncomment if using CDN)
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.cadence.app' : '',
};

module.exports = nextConfig;