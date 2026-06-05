@echo off
REM Weather-AI Dashboard Setup Script for Windows
REM This script automates the initial setup process

echo.
echo ========================================
echo   Weather-AI Dashboard Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js 18+ from: https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js version:
node --version
echo [OK] npm version:
npm --version
echo.

REM Check if .env file exists
if not exist .env (
    echo [SETUP] Creating .env file from template...
    copy .env.example .env
    echo.
    echo [IMPORTANT] Please edit .env and add your Weather-AI API key!
    echo             VITE_WEATHER_AI_API_KEY=wai_your_api_key_here
    echo.
    pause
) else (
    echo [OK] .env file already exists
)

REM Check if API key is configured
findstr /C:"wai_your_api_key_here" .env >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [WARNING] API key not configured in .env
    echo           Please replace 'wai_your_api_key_here' with your actual API key
    echo.
)

REM Install dependencies
echo [INSTALL] Installing dependencies...
echo           This may take a few minutes...
echo.

npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   Setup Complete!
    echo ========================================
    echo.
    echo Next steps:
    echo 1. Ensure your API key is set in .env
    echo 2. Run 'npm run dev' to start the development server
    echo 3. Open http://localhost:5173 in your browser
    echo.
    echo For deployment instructions, see DEPLOYMENT.md
    echo.
) else (
    echo.
    echo [ERROR] Installation failed!
    echo.
    echo Common solutions:
    echo 1. Clear npm cache: npm cache clean --force
    echo 2. Delete node_modules folder and package-lock.json
    echo 3. Try again: npm install
    echo.
    pause
    exit /b 1
)

pause
