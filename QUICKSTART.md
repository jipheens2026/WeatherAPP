# 🚀 Quick Start Guide - Weather-AI Dashboard

## ⏱️ 5-Minute Setup

### Step 1: Get Your API Key (2 minutes)
1. Visit [weather-ai.co](https://weather-ai.co)
2. Sign up for a free account
3. Go to Dashboard → API Keys
4. Generate a new key (starts with `wai_`)
5. **Copy the key** (shown only once!)

### Step 2: Configure Environment (30 seconds)
```bash
# Copy the example file
cp .env.example .env

# Edit .env and paste your API key
# VITE_WEATHER_AI_API_KEY=wai_paste_your_key_here
```

### Step 3: Install & Run (2 minutes)
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

---

## 🎯 First Steps in the App

### Try Weather Intelligence
1. Click **"Nairobi"** button (or any city)
2. See current weather + AI summary
3. Scroll down for 7-day forecast charts

### Try Tree Analysis
1. Click **"🌳 Tree Analysis"** tab
2. Upload a farm/aerial photo (try Google Earth screenshot)
3. Add optional farm details
4. Click **"Analyze Trees"**
5. View AI-powered tree count & health assessment

---

## 📦 What's Included

```
✅ Weather search by city or coordinates
✅ AI-powered weather summaries (Gemini)
✅ 7-day forecasts with interactive charts
✅ Tree counting from aerial images
✅ Canopy health analysis
✅ Agricultural recommendations
✅ Responsive design (mobile-friendly)
✅ Production-ready deployment configs
```

---

## 🚢 Deploy in 5 Minutes

### Netlify (Easiest)
```bash
# Build the project
npm run build

# Deploy with Netlify CLI
npx netlify-cli deploy --prod --dir=dist
```

When prompted, add environment variable:
- Name: `VITE_WEATHER_AI_API_KEY`
- Value: Your API key

**Your app is live!** 🎉

---

## 🔧 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### API key not working
- Check `.env` file exists in project root
- Verify key starts with `wai_`
- Restart dev server after changing `.env`
- Ensure no spaces around `=` in `.env`

### Port 5173 already in use
```bash
# Kill the process
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### Charts not displaying
```bash
# Recharts might need reinstall
npm install recharts --force
```

---

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guides
- Check [Weather-AI API Docs](https://weather-ai.co/docs)

---

## 💡 Pro Tips

1. **Test with real coordinates**: Use your current location (Google "my coordinates")
2. **Try different image types**: Drone photos, Google Earth screenshots, satellite imagery
3. **Mobile testing**: Open on phone using your local network IP
4. **Custom branding**: Update colors in [tailwind.config.js](tailwind.config.js)

---

## 🆘 Need Help?

- **API Issues**: Check Weather-AI dashboard for quota/limits
- **Build Errors**: Ensure Node.js 18+ installed (`node --version`)
- **Deployment**: See detailed guides in [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Ready to submit?** See the email template in [DEPLOYMENT.md](DEPLOYMENT.md)!
