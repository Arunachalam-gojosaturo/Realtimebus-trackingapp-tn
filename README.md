                                                                                                 
# 🚍 TN Transit Pro
### Intelligent Tamil Nadu Bus Tracking & AI Commute Insight System

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Android-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Build-Vite-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Mobile-Capacitor-purple?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-ff69b4?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge"/>
</p>

---

## 📌 Overview

**TN Transit Pro** is a lightweight Android application that provides AI-powered commute insights for Tamil Nadu public bus travelers.

Unlike static timetable apps, TN Transit Pro integrates intelligent prediction using real-world traffic patterns, weather conditions, and urban congestion signals.

Built using:

- ⚛ React + TypeScript
- ⚡ Vite
- 📱 Capacitor (Android Runtime)
- 🤖 Google Gemini AI

---

## 📖 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Android Build](#-android-build)
- [Testing](#-testing)
- [Screenshots](#-screenshots)
- [Performance](#-performance)
- [Security](#-security)
- [Future Roadmap](#-future-roadmap)
- [Author](#-author)

---

# 🚀 Features

- 🚍 Route-based commute insights
- 🤖 AI-powered delay predictions
- 📱 Android native APK deployment
- ⚡ Lightweight and fast loading
- 🌐 Offline fallback support
- 🧪 Real device tested

---

# 🏗 Architecture

```text
User Interface (React + TypeScript)
        ↓
Service Layer
        ↓
Gemini AI Engine
        ↓
Response Formatter
        ↓
Capacitor Android Runtime


tn-transit-pro/
│
├── components/          # UI Components
├── services/            # AI & API logic
├── android/             # Native Android project
├── App.tsx
├── vite.config.ts
├── capacitor.config.ts
└── package.json
```

⚙ Installation
1️⃣ Clone Repository
```text
git clone https://github.com/Arunachalam-gojosaturo/tn-transit-pro.git
cd tn-transit-pro
```
2️⃣ Install Dependencies
```text
npm install
```
3️⃣ Configure Environment Variables

Create a file named .env.local

VITE_GEMINI_API_KEY=your_api_key_here
📦 Build Web Version
```text
npm run build
```
📱 Android Build
Sync Capacitor
```text
npx cap sync android
Build APK
cd android
./gradlew assembleDebug
```

APK Output Location:
```text
android/app/build/outputs/apk/debug/app-debug.apk
Install on Device
adb install -r app/build/outputs/apk/debug/app-debug.apk
```
🧪 Testing

✔ Physical Android device tested
✔ WebView rendering validated
✔ API response parsing verified
✔ Offline fallback handling
✔ ADB logcat debugging
