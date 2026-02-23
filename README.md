                                                                                                                        
# TN Transit Pro
Smart Tamil Nadu Public Bus Tracking & AI Commute Insight Application



## Overview

TN Transit Pro is a lightweight Android application designed to provide intelligent commute insights for public bus travelers in Tamil Nadu.

Unlike traditional schedule apps, TN Transit Pro integrates AI-driven analysis to generate realistic commute insights based on:

- Traffic patterns
- Weather conditions
- Urban congestion
- Event-based delays

Built using React + TypeScript + Vite and deployed via Capacitor as a native Android APK.



## Key Features

- Route-based commute insights
- AI-powered delay prediction (Google Gemini API)
- Android native APK deployment
- Lightweight and fast loading
- Offline fallback handling
- Real-device testing and debugging



## Architecture

User Interface (React + TypeScript)
        ↓
Service Layer
        ↓
Gemini AI Engine
        ↓
Response Formatter
        ↓
Capacitor Android Runtime



## Project Structure

tn-transit-pro/
│
├── components/          UI components
├── services/            API & AI logic
├── android/             Capacitor Android project
├── App.tsx              Root component
├── vite.config.ts       Build configuration
├── capacitor.config.ts  Android configuration
└── package.json



## Technology Stack

Frontend      : React + TypeScript
Build Tool    : Vite
Mobile Wrapper: Capacitor
AI Engine     : Google Gemini
Android Build : Gradle
Debugging     : ADB Logcat



## Installation & Setup

1. Clone Repository

git clone https://github.com/YOUR_USERNAME/tn-transit-pro.git
cd tn-transit-pro

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a file named .env.local

VITE_GEMINI_API_KEY=your_api_key_here

4. Build Web App

npm run build

5. Sync Android

npx cap sync android

6. Build APK

cd android
./gradlew assembleDebug

APK Output Location:
android/app/build/outputs/apk/debug/app-debug.apk

7. Install on Device

adb install -r app/build/outputs/apk/debug/app-debug.apk


## Testing

- Real Android device testing
- WebView rendering validation
- API response parsing verification
- Offline fallback behavior
- Performance testing under low network



## Issues Resolved

- White screen issue (base path fix)
- Environment variable injection error
- API undefined in WebView
- Android asset path misconfiguration
- Gradle SDK license issue



## Performance Goals

- Load time under 2 seconds
- Minimal memory usage
- Lightweight bundle size
- Smooth Android WebView performance


## Security Notes

- API keys handled via environment variables
- No personal data stored locally
- Ethical AI usage only
- No user tracking



## Future Enhancements

- Offline cached route predictions
- Push notification alerts
- Route bookmarking
- Map integration
- Tamil language support
- Crowd density estimation



## License

MIT License


## Author

Arunachalam
Android & Linux Enthusiast
Smart Mobility & AI Application Developer


End of README
