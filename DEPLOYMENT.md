# 🚀 Deployment Guide - Habit Streak App

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

3. **Your site will be live in 2 minutes!**

### Option 2: Netlify

1. **Build locally first**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop your `dist` folder
   - Or connect GitHub for auto-deployments

### Option 3: GitHub Pages

1. **Add deployment scripts to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/habit-streak-app",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build locally
npm run preview
```

## Environment Variables

If you add backend functionality later, you can add environment variables:

```bash
# .env.local
VITE_API_URL=https://your-api.com
VITE_APP_NAME=Habit Streak
```

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records

## Troubleshooting

### Build Errors
- Check that all dependencies are installed: `npm install`
- Verify TypeScript compilation: `npm run build`
- Check for linting errors: `npm run lint`

### Routing Issues
- Ensure your hosting provider supports SPA routing
- Vercel and Netlify handle this automatically
- For GitHub Pages, you may need a 404.html redirect

### Performance
- Your app is already optimized with Vite
- Images are automatically optimized
- Code splitting is handled automatically

## Next Steps

1. **Choose Vercel** for the easiest deployment
2. **Push your code** to GitHub
3. **Connect to Vercel** and deploy
4. **Share your live URL** with users!

Your app is ready to go live! 🎉 