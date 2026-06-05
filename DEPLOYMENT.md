# Weather-AI Dashboard - Deployment Guide

## 🚀 Quick Deployment Instructions

### Prerequisites
- GitHub account
- Weather-AI API key from [weather-ai.co](https://weather-ai.co)
- Choose a hosting platform: Netlify (recommended) or Vercel

---

## Option 1: Deploy to Netlify (Recommended)

### Method A: GitHub Integration (Easiest)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Weather-AI Dashboard"
   git branch -M main
   git remote add origin https://github.com/yourusername/weather-ai-dashboard.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   
3. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Show advanced" → "Add environment variable"
   - Add: `VITE_WEATHER_AI_API_KEY` = `wai_your_actual_key`

4. **Deploy**:
   - Click "Deploy site"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://random-name.netlify.app`

5. **Custom Domain (Optional)**:
   - Go to "Domain settings"
   - Add your custom domain or change the Netlify subdomain

### Method B: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Or deploy directly
npm run build
netlify deploy --prod --dir=dist
```

When prompted, add environment variable:
```
VITE_WEATHER_AI_API_KEY=wai_your_actual_key
```

---

## Option 2: Deploy to Vercel

### Method A: GitHub Integration

1. **Push to GitHub** (same as Netlify above)

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add Environment Variable:
     - Name: `VITE_WEATHER_AI_API_KEY`
     - Value: `wai_your_actual_key`

4. **Deploy**:
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Method B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Add environment variable through Vercel dashboard after deployment.

---

## Option 3: Other Platforms

### GitHub Pages (Static Hosting)

1. **Update `vite.config.js`**:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/weather-ai-dashboard/', // your repo name
   })
   ```

2. **Deploy**:
   ```bash
   npm run build
   git subtree push --prefix dist origin gh-pages
   ```

### Railway

1. Create account at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add environment variable `VITE_WEATHER_AI_API_KEY`
4. Railway auto-detects Vite and deploys

### Render

1. Create account at [render.com](https://render.com)
2. New Static Site → Connect repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable

---

## 🔐 Environment Variables Setup

All platforms require this environment variable:

| Variable Name | Value |
|--------------|-------|
| `VITE_WEATHER_AI_API_KEY` | `wai_your_actual_api_key_here` |

⚠️ **Important**: 
- NEVER commit `.env` file to GitHub
- Set variables through platform dashboard
- Redeploy after adding variables

---

## ✅ Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] Weather search works with pre-configured cities
- [ ] Custom coordinate search functions
- [ ] AI weather summaries appear
- [ ] Charts render correctly
- [ ] Tree analysis upload works
- [ ] Images display in tree analysis results
- [ ] Mobile responsiveness verified
- [ ] Browser console shows no errors
- [ ] API key is NOT visible in network requests (check DevTools)

---

## 🔍 Troubleshooting

### "API key undefined" error
- Environment variable not set correctly
- Vite requires `VITE_` prefix
- Redeploy after adding variable

### Charts not rendering
- Ensure Recharts installed: `npm install recharts`
- Check browser console for errors

### Image upload fails (Tree Analysis)
- Check API key has proper permissions
- Verify image is under 20MB
- Ensure format is JPEG, PNG, or WEBP

### 404 on page refresh
- Netlify/Vercel handle this automatically
- For other platforms, configure SPA redirects

---

## 📊 Performance Tips

- Enable Gzip/Brotli compression (automatic on Netlify/Vercel)
- Use Netlify/Vercel's CDN for faster global access
- Monitor Core Web Vitals in platform dashboard
- Consider adding analytics (Netlify Analytics or Vercel Analytics)

---

## 🔄 Continuous Deployment

Once connected via GitHub:
1. Make changes locally
2. Commit and push to main branch
3. Platform auto-builds and deploys
4. Live site updates in 2-3 minutes

---

## 📧 Submission Email Template

```
Subject: Technical Challenge Submission - Weather-AI Dashboard

Hi Claire,

I've completed the Weather-AI integration challenge. Here are the deliverables:

**GitHub Repository**: https://github.com/yourusername/weather-ai-dashboard
**Live Deployment**: https://your-app.netlify.app

**Key Features Implemented**:
- Real-time weather data with AI-powered summaries (Gemini)
- Interactive 7-day forecasts with temperature and precipitation charts
- Tree canopy analysis with computer vision and health assessment
- Responsive design with modern UI/UX
- Production-ready deployment configuration

**Tech Stack**: React 18, Vite, Tailwind CSS, Recharts, Axios

The README includes complete setup instructions, architecture details, and deployment guides.

Looking forward to discussing the implementation.

Best regards,
Jipheens Wahome
```

---

**Need Help?** Check the main README.md for detailed documentation.
