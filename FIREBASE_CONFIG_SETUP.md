# 🔥 Firebase Configuration Setup Guide

## **NihonSelfPacePractice Project**

**Last Updated:** June 29, 2026

---

## 📋 **PROJECT OVERVIEW**

### **Firebase Project Details**

| Field | Value |
|-------|-------|
| **Project Name** | NihonSelfPacePractice |
| **Project ID** | `nihonselfpacepractic` |
| **Project Number** | `319096782095` |
| **Auth Domain** | `nihonselfpacepractic.firebaseapp.com` |
| **Storage Bucket** | `nihonselfpacepractic.firebasestorage.app` |

---

## 🌐 **WEB APP CONFIGURATION**

### **Firebase Web Config**

```javascript
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "nihonselfpacepractic.firebaseapp.com",
  projectId: "nihonselfpacepractic",
  storageBucket: "nihonselfpacepractic.firebasestorage.app",
  messagingSenderId: "319096782095",
  appId: "1:319096782095:web:4eb19452c95a823eab527a",
  measurementId: "G-WWWT98XTT0"
};
```

**Web App ID:** `1:319096782095:web:4eb19452c95a823eab527a`

---

## 🍎 **iOS APP CONFIGURATION**

### **iOS App Details**

| Field | Value |
|-------|-------|
| **App Nickname** | Nihon Pace iOS |
| **Bundle ID** | `com.jarrel.nihonselfpace` |
| **App ID** | `1:319096782095:ios:b973a0a7b464950eab527a` |
| **Encoded App ID** | `app-1-319096782095-ios-b973a0a7b464950eab527a` |

---

## 📱 **CURRENT STATUS IN CODEBASE**

### ✅ **1. nihon-quest-fullstack (React Web App)**

**Location:** `@/Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend/src/config/firebaseConfig.ts`

**Status:** ✅ **CORRECT - Already Updated**

```typescript
import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "nihonselfpacepractic.firebaseapp.com",
  projectId: "nihonselfpacepractic",
  storageBucket: "nihonselfpacepractic.firebasestorage.app",
  messagingSenderId: "319096782095",
  appId: "1:319096782095:web:4eb19452c95a823eab527a",
  measurementId: "G-WWWT98XTT0"
};

const app = initializeApp(firebaseConfig);

let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export { app, analytics };
```

**Hosting URL:** https://nihonselfpacepractic.web.app/

---

### ⚠️ **2. nihon_quest_mobile (Flutter App)**

**Status:** ⚠️ **NEEDS FIREBASE SETUP**

**Current:** No Firebase configuration files detected

**Required Actions:**

#### **A. Install FlutterFire CLI**

```bash
# Install FlutterFire CLI globally
dart pub global activate flutterfire_cli
```

#### **B. Configure Firebase for Flutter**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile

# Configure Firebase (this will create firebase_options.dart)
flutterfire configure --project=nihonselfpacepractic
```

This will:
- ✅ Generate `lib/firebase_options.dart`
- ✅ Create platform-specific config files
- ✅ Link your Flutter app to Firebase project

#### **C. Add Firebase Dependencies**

Update `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # Firebase Core (required)
  firebase_core: ^3.8.1
  
  # Firebase Services (as needed)
  cloud_firestore: ^5.5.0
  firebase_auth: ^5.3.3
  firebase_analytics: ^11.5.0
  firebase_storage: ^12.5.0
```

#### **D. Initialize Firebase in App**

Update `lib/main.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  runApp(const NihonQuestApp());
}
```

**Hosting URL:** https://nihonselfpacepractic-flutter.web.app/

---

### ❓ **3. nihongo-quest-app**

**Status:** ❓ **NO FIREBASE CONFIG DETECTED**

**Location:** `/Users/m1876041/Documents/Github/NihonSelfPace/nihongo-quest-app/frontend/`

**Required Actions:**

If this project needs Firebase:

1. **Install Firebase**
   ```bash
   cd /Users/m1876041/Documents/Github/NihonSelfPace/nihongo-quest-app/frontend
   npm install firebase
   ```

2. **Create Config File**
   ```bash
   mkdir -p src/config
   touch src/config/firebaseConfig.ts
   ```

3. **Add Configuration**
   ```typescript
   import { initializeApp } from "firebase/app";
   import { getAnalytics } from "firebase/analytics";
   import { getAuth } from "firebase/auth";
   import { getFirestore } from "firebase/firestore";
   
   const firebaseConfig = {
     apiKey: "YOUR_FIREBASE_API_KEY_HERE",
     authDomain: "nihonselfpacepractic.firebaseapp.com",
     projectId: "nihonselfpacepractic",
     storageBucket: "nihonselfpacepractic.firebasestorage.app",
     messagingSenderId: "319096782095",
     appId: "1:319096782095:web:4eb19452c95a823eab527a",
     measurementId: "G-WWWT98XTT0"
   };
   
   const app = initializeApp(firebaseConfig);
   const analytics = getAnalytics(app);
   const auth = getAuth(app);
   const db = getFirestore(app);
   
   export { app, analytics, auth, db };
   ```

---

### 📱 **4. iOS App Configuration**

**Location:** `@/Users/m1876041/Documents/Github/NihonSelfPace/GoogleService-Info.plist`

**Status:** ⚠️ **NEEDS API KEY UPDATE**

**Current API Key:** `AIzaSyDkdC_5EVO0Jc7rvz6DryZl72_lHNn4r5g` (OLD)

**Required API Key:** Download fresh `GoogleService-Info.plist` from Firebase Console

**Steps to Update:**

1. **Download from Firebase Console**
   - Go to: https://console.firebase.google.com/project/nihonselfpacepractic/settings/general
   - Scroll to "Your apps" section
   - Click on "Nihon Pace iOS" app
   - Click "Download GoogleService-Info.plist"

2. **Replace Files**
   ```bash
   # For standalone iOS app
   cp ~/Downloads/GoogleService-Info.plist /Users/m1876041/Documents/Github/NihonSelfPace/
   
   # For Flutter iOS app (if exists)
   cp ~/Downloads/GoogleService-Info.plist /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile/ios/Runner/
   ```

3. **Verify in Xcode**
   - Open Xcode project
   - Ensure `GoogleService-Info.plist` is in project navigator
   - Check "Target Membership" is enabled

---

## 🔧 **STEP-BY-STEP SETUP GUIDE**

### **Priority 1: Flutter App (nihon_quest_mobile)**

```bash
# 1. Navigate to Flutter project
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile

# 2. Install FlutterFire CLI (if not already installed)
dart pub global activate flutterfire_cli

# 3. Configure Firebase
flutterfire configure --project=nihonselfpacepractic

# 4. Install dependencies
flutter pub get

# 5. Test the app
flutter run -d chrome
```

---

### **Priority 2: iOS App Configuration**

```bash
# 1. Download GoogleService-Info.plist from Firebase Console
# Go to: https://console.firebase.google.com/project/nihonselfpacepractic/settings/general

# 2. Copy to iOS project
cp ~/Downloads/GoogleService-Info.plist /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile/ios/Runner/

# 3. Open in Xcode and verify
open /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile/ios/Runner.xcworkspace
```

---

### **Priority 3: Verify Web App (Already Done)**

```bash
# Navigate to web app
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend

# Verify config is correct
cat src/config/firebaseConfig.ts

# Build and deploy
npm run build
firebase deploy --only hosting
```

---

## 📦 **FIREBASE SERVICES TO ENABLE**

### **In Firebase Console:**

1. **Authentication**
   - Go to: https://console.firebase.google.com/project/nihonselfpacepractic/authentication
   - Enable sign-in methods:
     - ✅ Email/Password
     - ✅ Google
     - ✅ Anonymous (for testing)

2. **Firestore Database**
   - Go to: https://console.firebase.google.com/project/nihonselfpacepractic/firestore
   - Create database in production mode
   - Set up security rules

3. **Storage**
   - Go to: https://console.firebase.google.com/project/nihonselfpacepractic/storage
   - Enable Cloud Storage
   - Set up security rules

4. **Analytics**
   - Already enabled with `measurementId: "G-WWWT98XTT0"`
   - View at: https://console.firebase.google.com/project/nihonselfpacepractic/analytics

---

## 🔐 **SECURITY RULES**

### **Firestore Rules** (Development)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### **Storage Rules** (Development)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🧪 **TESTING FIREBASE CONNECTION**

### **Test Web App**

```typescript
// Create test file: src/testFirebase.ts
import { app, db } from './config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

async function testFirebaseConnection() {
  try {
    console.log('Firebase App Name:', app.name);
    console.log('Firebase Project ID:', app.options.projectId);
    
    // Test Firestore write
    const testDoc = await addDoc(collection(db, 'test'), {
      message: 'Hello Firebase!',
      timestamp: new Date()
    });
    
    console.log('Test document created:', testDoc.id);
    console.log('✅ Firebase is working!');
  } catch (error) {
    console.error('❌ Firebase error:', error);
  }
}

testFirebaseConnection();
```

### **Test Flutter App**

```dart
// Create test file: lib/test_firebase.dart
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'firebase_options.dart';

Future<void> testFirebase() async {
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  print('✅ Firebase initialized');
  print('Project ID: ${Firebase.app().options.projectId}');
  
  // Test Firestore
  final db = FirebaseFirestore.instance;
  await db.collection('test').add({
    'message': 'Hello from Flutter!',
    'timestamp': FieldValue.serverTimestamp(),
  });
  
  print('✅ Firestore write successful');
}
```

---

## 📚 **USEFUL LINKS**

### **Firebase Console**
- **Project Overview:** https://console.firebase.google.com/project/nihonselfpacepractic/overview
- **Authentication:** https://console.firebase.google.com/project/nihonselfpacepractic/authentication
- **Firestore:** https://console.firebase.google.com/project/nihonselfpacepractic/firestore
- **Storage:** https://console.firebase.google.com/project/nihonselfpacepractic/storage
- **Analytics:** https://console.firebase.google.com/project/nihonselfpacepractic/analytics
- **Hosting:** https://console.firebase.google.com/project/nihonselfpacepractic/hosting

### **Live Apps**
- **Web App:** https://nihonselfpacepractic.web.app/
- **Flutter App:** https://nihonselfpacepractic-flutter.web.app/

### **Documentation**
- **Firebase Web Setup:** https://firebase.google.com/docs/web/setup
- **FlutterFire Setup:** https://firebase.flutter.dev/docs/overview
- **Firebase iOS Setup:** https://firebase.google.com/docs/ios/setup

---

## ✅ **CHECKLIST**

### **Web App (nihon-quest-fullstack)**
- [x] Firebase config updated
- [x] Services initialized (Auth, Firestore, Analytics)
- [x] Deployed to hosting
- [ ] Test authentication
- [ ] Test Firestore operations
- [ ] Verify analytics tracking

### **Flutter App (nihon_quest_mobile)**
- [ ] Install FlutterFire CLI
- [ ] Run `flutterfire configure`
- [ ] Generate firebase_options.dart
- [ ] Add Firebase dependencies
- [ ] Initialize Firebase in main.dart
- [ ] Test on web
- [ ] Test on iOS (if applicable)
- [ ] Deploy to Firebase Hosting

### **iOS App**
- [ ] Download fresh GoogleService-Info.plist
- [ ] Add to Xcode project
- [ ] Verify target membership
- [ ] Test on simulator/device

### **nihongo-quest-app (if needed)**
- [ ] Install Firebase SDK
- [ ] Create firebaseConfig.ts
- [ ] Initialize Firebase services
- [ ] Test connection

---

## 🚨 **IMPORTANT NOTES**

1. **API Keys are Public**
   - Firebase API keys for web are meant to be public
   - Security is handled by Firebase Security Rules
   - Never put service account keys in client code

2. **Different Platforms Use Different Config Files**
   - Web: JavaScript config object
   - iOS: GoogleService-Info.plist
   - Android: google-services.json
   - Flutter: firebase_options.dart (auto-generated)

3. **Always Use Environment Variables for Secrets**
   - Backend API keys
   - Service account credentials
   - Database passwords

4. **Security Rules are Critical**
   - Always set up proper Firestore rules
   - Test rules before going to production
   - Never leave rules wide open in production

---

## 📞 **SUPPORT**

If you encounter issues:

1. **Check Firebase Status:** https://status.firebase.google.com/
2. **FlutterFire Docs:** https://firebase.flutter.dev/
3. **Firebase Support:** https://firebase.google.com/support

---

**Last Updated:** June 29, 2026  
**Project:** NihonSelfPacePractice  
**Firebase Project ID:** nihonselfpacepractic
