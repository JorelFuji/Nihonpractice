# 🚀 Firebase Flutter Game Deployment Guide

## Overview
Deploy your bilingual Kanji Pong game to Firebase Hosting for web testing.

---

## 📋 Prerequisites

### **1. Firebase CLI Installation**

Check if Firebase CLI is installed:
```bash
firebase --version
```

If not installed, install it:
```bash
npm install -g firebase-tools
```

### **2. Firebase Login**

Login to Firebase:
```bash
firebase login
```

This will open a browser for authentication.

---

## 🔧 Step-by-Step Deployment

### **Step 1: Navigate to Flutter Project**

```bash
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon_quest_mobile
```

### **Step 2: Build Flutter Web App**

Build the Flutter app for web:
```bash
flutter build web --release
```

This creates optimized files in `build/web/` directory.

**Expected output:**
```
✓ Built build/web/main.dart.js
✓ Compiling lib/main.dart for the Web...
```

### **Step 3: Check Firebase Configuration**

Verify your `.firebaserc` file exists:
```bash
cat .firebaserc
```

Should show:
```json
{
  "projects": {
    "default": "nihonselfpacepractic"
  },
  "targets": {
    "nihonselfpacepractic": {
      "hosting": {
        "flutter": [
          "nihonselfpacepractic-flutter"
        ]
      }
    }
  }
}
```

### **Step 4: Verify firebase.json**

Check your `firebase.json`:
```bash
cat firebase.json
```

Should show:
```json
{
  "hosting": {
    "target": "flutter",
    "public": "build/web",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### **Step 5: Deploy to Firebase**

Deploy to the Flutter hosting target:
```bash
firebase deploy --only hosting:flutter
```

**Expected output:**
```
=== Deploying to 'nihonselfpacepractic'...

i  deploying hosting
i  hosting[nihonselfpacepractic-flutter]: beginning deploy...
i  hosting[nihonselfpacepractic-flutter]: found X files in build/web
✔  hosting[nihonselfpacepractic-flutter]: file upload complete
i  hosting[nihonselfpacepractic-flutter]: finalizing version...
✔  hosting[nihonselfpacepractic-flutter]: version finalized
i  hosting[nihonselfpacepractic-flutter]: releasing new version...
✔  hosting[nihonselfpacepractic-flutter]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/nihonselfpacepractic/overview
Hosting URL: https://nihonselfpacepractic-flutter.web.app
```

---

## 🌐 Access Your Deployed Game

### **Live URLs:**
- **Flutter Games:** https://nihonselfpacepractic-flutter.web.app
- **Main App:** https://nihonselfpacepractic.web.app

### **Test the Game:**
1. Open browser
2. Visit: https://nihonselfpacepractic-flutter.web.app
3. Navigate to Kanji Pong game
4. Test two-player functionality
5. Test language switching

---

## 🧪 Testing Checklist

### **Basic Functionality**
- [ ] Game loads without errors
- [ ] Both paddles respond to touch
- [ ] Ball bounces correctly
- [ ] Score updates properly
- [ ] Kanji displays with reading and meaning

### **Language Features**
- [ ] Hiragana mode works
- [ ] Katakana mode works
- [ ] English mode works
- [ ] Bilingual display shows both languages
- [ ] Language toggle updates all text

### **Two-Player Features**
- [ ] Player 1 (left side) controls blue paddle
- [ ] Player 2 (right side) controls red paddle
- [ ] Scores track independently
- [ ] Winner detection at 10 points
- [ ] Rematch button works

### **Performance**
- [ ] Game runs at 60 FPS
- [ ] No lag or stuttering
- [ ] Touch response is immediate
- [ ] Load time < 5 seconds

### **Mobile Testing**
- [ ] Works on mobile browsers
- [ ] Touch controls responsive
- [ ] UI scales properly
- [ ] No layout issues

---

## 🔍 Debugging

### **Check Browser Console**

Open Developer Tools (F12) and check for errors:
```javascript
// Look for:
- JavaScript errors
- Asset loading failures
- Network issues
```

### **Common Issues & Fixes**

#### **Issue 1: "Firebase command not found"**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Verify installation
firebase --version
```

#### **Issue 2: "Build failed"**
```bash
# Clean Flutter build
flutter clean
flutter pub get
flutter build web --release
```

#### **Issue 3: "Deployment failed"**
```bash
# Re-login to Firebase
firebase logout
firebase login

# Try deploying again
firebase deploy --only hosting:flutter
```

#### **Issue 4: "Old version showing"**
```bash
# Hard refresh browser
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# Or clear cache
# Chrome: Settings → Privacy → Clear browsing data
```

#### **Issue 5: "Game not loading"**
```bash
# Check Firebase hosting status
firebase hosting:channel:list

# View deployment logs
firebase hosting:channel:deploy preview
```

---

## 📊 Firebase Console

### **View Deployment Details**

1. Go to: https://console.firebase.google.com/project/nihonselfpacepractic
2. Click **Hosting** in left menu
3. See deployment history
4. View traffic analytics

### **Monitor Performance**

1. Click **Performance** tab
2. View load times
3. Check user metrics
4. Analyze bottlenecks

### **Check Analytics**

1. Click **Analytics** tab
2. View active users
3. See engagement metrics
4. Track game sessions

---

## 🔄 Update Deployment

### **Quick Update Process**

When you make changes:

```bash
# 1. Navigate to project
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon_quest_mobile

# 2. Rebuild
flutter build web --release

# 3. Deploy
firebase deploy --only hosting:flutter

# 4. Test
# Visit: https://nihonselfpacepractic-flutter.web.app
```

### **Preview Before Deploy**

Test changes before going live:

```bash
# Create preview channel
firebase hosting:channel:deploy preview

# Test at preview URL
# https://nihonselfpacepractic-flutter--preview-xxxxx.web.app

# If good, deploy to production
firebase deploy --only hosting:flutter
```

---

## 🎯 Complete Deployment Script

Create a deployment script for easy updates:

### **File: `deploy.sh`**

```bash
#!/bin/bash

echo "🚀 Starting Flutter Game Deployment..."

# Navigate to project
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon_quest_mobile

# Clean build
echo "🧹 Cleaning previous build..."
flutter clean

# Get dependencies
echo "📦 Getting dependencies..."
flutter pub get

# Build for web
echo "🔨 Building Flutter web app..."
flutter build web --release

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Firebase
    echo "🚀 Deploying to Firebase..."
    firebase deploy --only hosting:flutter
    
    if [ $? -eq 0 ]; then
        echo "✅ Deployment successful!"
        echo "🌐 Live at: https://nihonselfpacepractic-flutter.web.app"
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
```

### **Make it executable:**

```bash
chmod +x deploy.sh
```

### **Run deployment:**

```bash
./deploy.sh
```

---

## 📱 Test on Different Devices

### **Desktop Testing**
```bash
# Chrome
open -a "Google Chrome" https://nihonselfpacepractic-flutter.web.app

# Safari
open -a Safari https://nihonselfpacepractic-flutter.web.app

# Firefox
open -a Firefox https://nihonselfpacepractic-flutter.web.app
```

### **Mobile Testing**

1. **iPhone/iPad:**
   - Open Safari
   - Visit: https://nihonselfpacepractic-flutter.web.app
   - Test touch controls

2. **Android:**
   - Open Chrome
   - Visit: https://nihonselfpacepractic-flutter.web.app
   - Test touch controls

3. **Responsive Testing:**
   - Open Chrome DevTools (F12)
   - Click device toolbar icon
   - Test different screen sizes

---

## 🔐 Security & Performance

### **Enable HTTPS**
Firebase automatically provides HTTPS. Verify:
```
✅ https://nihonselfpacepractic-flutter.web.app
❌ http://nihonselfpacepractic-flutter.web.app (redirects to HTTPS)
```

### **Enable Compression**

Update `firebase.json`:
```json
{
  "hosting": {
    "target": "flutter",
    "public": "build/web",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

---

## 📈 Analytics Setup

### **Track Game Events**

Add Firebase Analytics to track gameplay:

```dart
import 'package:firebase_analytics/firebase_analytics.dart';

class GameAnalytics {
  static final FirebaseAnalytics _analytics = FirebaseAnalytics.instance;

  static Future<void> logGameStart() async {
    await _analytics.logEvent(
      name: 'game_start',
      parameters: {
        'game_type': 'kanji_pong',
        'timestamp': DateTime.now().toIso8601String(),
      },
    );
  }

  static Future<void> logGameEnd(int player1Score, int player2Score, int winner) async {
    await _analytics.logEvent(
      name: 'game_end',
      parameters: {
        'player1_score': player1Score,
        'player2_score': player2Score,
        'winner': winner,
        'duration': 'calculated_duration',
      },
    );
  }

  static Future<void> logLanguageChange(String language) async {
    await _analytics.logEvent(
      name: 'language_change',
      parameters: {
        'language': language,
      },
    );
  }
}
```

Add to `pubspec.yaml`:
```yaml
dependencies:
  firebase_analytics: ^11.3.3
```

---

## 🎮 Testing URLs

### **Main Hosting (React App)**
```
https://nihonselfpacepractic.web.app
```

### **Flutter Games Hosting**
```
https://nihonselfpacepractic-flutter.web.app
```

### **Firebase Console**
```
https://console.firebase.google.com/project/nihonselfpacepractic
```

---

## 📝 Deployment Checklist

### **Before Deployment:**
- [ ] Code is tested locally
- [ ] All features work
- [ ] No console errors
- [ ] Build completes successfully
- [ ] Firebase CLI is installed
- [ ] Logged into Firebase

### **During Deployment:**
- [ ] Run `flutter clean`
- [ ] Run `flutter pub get`
- [ ] Run `flutter build web --release`
- [ ] Run `firebase deploy --only hosting:flutter`
- [ ] Check deployment success message

### **After Deployment:**
- [ ] Visit live URL
- [ ] Test all features
- [ ] Check on mobile
- [ ] Verify language switching
- [ ] Test two-player mode
- [ ] Check performance
- [ ] Monitor analytics

---

## 🚨 Rollback Deployment

If something goes wrong, rollback to previous version:

```bash
# List deployment history
firebase hosting:channel:list

# Rollback to previous version
firebase hosting:rollback

# Or deploy specific version
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID DEST_SITE_ID:DEST_CHANNEL_ID
```

---

## 💡 Pro Tips

### **1. Use Preview Channels**
```bash
# Deploy to preview first
firebase hosting:channel:deploy preview

# Test thoroughly
# Then deploy to production
firebase deploy --only hosting:flutter
```

### **2. Automate with GitHub Actions**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: subosito/flutter-action@v2
      - run: flutter pub get
      - run: flutter build web --release
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: nihonselfpacepractic
```

### **3. Monitor Performance**
```bash
# Install Firebase Performance Monitoring
flutter pub add firebase_performance

# Track custom traces
final trace = FirebasePerformance.instance.newTrace('game_load');
await trace.start();
// ... game loading code ...
await trace.stop();
```

---

## 📞 Support & Resources

### **Firebase Documentation**
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Flutter Web](https://docs.flutter.dev/platform-integration/web)
- [Firebase CLI](https://firebase.google.com/docs/cli)

### **Troubleshooting**
- [Firebase Status](https://status.firebase.google.com/)
- [Flutter Issues](https://github.com/flutter/flutter/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase-hosting)

---

## ✅ Quick Command Reference

```bash
# Build
flutter build web --release

# Deploy
firebase deploy --only hosting:flutter

# Preview
firebase hosting:channel:deploy preview

# Rollback
firebase hosting:rollback

# View logs
firebase hosting:channel:list

# Login
firebase login

# Logout
firebase logout

# Check status
firebase projects:list
```

---

## 🎊 Success!

Your game is now live at:
**https://nihonselfpacepractic-flutter.web.app**

Share with friends and start testing! 🎮🚀

---

**© 2026 Osaka Oaks LLC** - Service-Disabled Veteran-Owned Small Business (SDVOSB)
