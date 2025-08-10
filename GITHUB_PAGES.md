# GitHub Pages Deployment Guide

This repository is configured for automatic deployment to GitHub Pages using GitHub Actions.

## ⚡ Quick Setup

1. **Fork or clone** this repository to your GitHub account

2. **Enable GitHub Pages:**
   - Go to repository **Settings** > **Pages**
   - Set **Source** to "GitHub Actions"
   - Click **Save**

3. **Push to main branch:**
   ```bash
   git push origin main
   ```

4. **Wait for deployment:**
   - Check **Actions** tab to see deployment progress
   - Your site will be live at: `https://yourusername.github.io/cadence.app`

## 🔄 How It Works

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

### On every push to `main`:
1. **Installs dependencies** with npm
2. **Runs quality checks:**
   - TypeScript type checking
   - ESLint code quality
3. **Builds the app** for static export
4. **Deploys to GitHub Pages**

### Build Configuration:
- **Next.js** configured for static export (`output: 'export'`)
- **Images** set to unoptimized for static hosting
- **Trailing slashes** enabled for better GitHub Pages compatibility

## 📁 Output Structure

The build creates a static `./out` folder with:
```
out/
├── index.html           # Homepage
├── _next/              # Next.js assets
│   ├── static/         # Static assets
│   └── webpack-runtime.js
├── 404.html            # Custom 404 page
└── robots.txt          # SEO robots file
```

## 🚀 Custom Domain (Optional)

To use a custom domain:

1. **Add CNAME file:**
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **Configure DNS:**
   - Add CNAME record: `yourdomain.com` → `yourusername.github.io`

3. **Update repository settings:**
   - Go to **Settings** > **Pages**
   - Add your custom domain
   - Enable "Enforce HTTPS"

## 🔧 Troubleshooting

### Deployment Fails
- Check **Actions** tab for error details
- Common issues:
  - Node.js version mismatch (workflow uses Node 18)
  - TypeScript errors preventing build
  - Missing dependencies

### Site Not Loading
- Ensure GitHub Pages is enabled in repository settings
- Check that deployment succeeded in Actions tab
- Try hard refresh (Ctrl+F5) to bypass browser cache

### Build Issues
Run locally to debug:
```bash
npm install
npm run build
```

### Permission Issues
- Ensure repository has **Actions** enabled
- Check that **Pages** deployment is allowed in organization settings

## 📝 Configuration Files

### `.github/workflows/deploy.yml`
GitHub Actions workflow that handles the deployment process.

### `next.config.js`
Configured with:
- `output: 'export'` for static generation
- `trailingSlash: true` for GitHub Pages compatibility
- `images: { unoptimized: true }` for static hosting

### `package.json`
Includes build scripts optimized for static export.

## 🎯 Performance

The deployed site achieves:
- **~42kB** homepage bundle
- **Static** pre-rendered content
- **Optimized** for fast loading
- **SEO-ready** with proper meta tags

## 🔒 Security Notes

For static hosting, some features are disabled:
- Server-side headers
- API routes
- Dynamic rewrites/redirects

The site remains secure through:
- Static asset hosting
- No server-side vulnerabilities
- Content Security through GitHub's infrastructure

## 📊 Monitoring

Monitor your deployment:
- **Actions tab:** Build and deployment status
- **Environments:** View deployment history
- **Pages settings:** Domain and SSL status

Your Cadence homepage is now ready for the world! 🚀