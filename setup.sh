#!/bin/bash

# Weather-AI Dashboard Setup Script
# This script automates the initial setup process

echo "🚀 Weather-AI Dashboard Setup"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your Weather-AI API key!"
    echo "   VITE_WEATHER_AI_API_KEY=wai_your_api_key_here"
    echo ""
    read -p "Press Enter after you've added your API key to .env..."
else
    echo "✅ .env file already exists"
fi

# Check if API key is set
if grep -q "wai_your_api_key_here" .env; then
    echo "⚠️  Warning: API key not configured in .env"
    echo "   Please replace 'wai_your_api_key_here' with your actual API key"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
echo "   This may take a few minutes..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Ensure your API key is set in .env"
    echo "2. Run 'npm run dev' to start the development server"
    echo "3. Open http://localhost:5173 in your browser"
    echo ""
    echo "For deployment instructions, see DEPLOYMENT.md"
    echo ""
else
    echo ""
    echo "❌ Installation failed. Please check the error messages above."
    echo ""
    echo "Common solutions:"
    echo "1. Clear npm cache: npm cache clean --force"
    echo "2. Delete node_modules: rm -rf node_modules package-lock.json"
    echo "3. Try again: npm install"
    echo ""
    exit 1
fi
