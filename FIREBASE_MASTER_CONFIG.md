# 🔥 FIREBASE MASTER CONFIGURATION
## **NihonSelfPacePractice Project - Complete Reference**

**Last Updated:** June 29, 2026

---

## 📊 **PROJECT IDENTIFIERS**

```yaml
Project Name:       NihonSelfPacePractice
Project ID:         nihonselfpacepractic
Project Number:     319096782095
```

### **Web App**
```yaml
App Nickname:       Nihon Pace Web
Web App ID:         1:319096782095:web:4eb19452c95a823eab527a
```

### **iOS App**
```yaml
App Nickname:       Nihon Pace iOS
Bundle ID:          com.jarrel.nihonselfpace
App ID:             1:319096782095:ios:b973a0a7b464950eab527a
Encoded App ID:     app-1-319096782095-ios-b973a0a7b464950eab527a
```

---

## 🔗 **FIREBASE CONSOLE LINKS**

### **Main Console**
- **Project Dashboard:** https://console.firebase.google.com/project/nihonselfpacepractic/overview
- **Project Settings:** https://console.firebase.google.com/project/nihonselfpacepractic/settings/general

### **Authentication**
- **Auth Console:** https://console.firebase.google.com/project/nihonselfpacepractic/authentication
- **Users:** https://console.firebase.google.com/project/nihonselfpacepractic/authentication/users
- **Sign-in Methods:** https://console.firebase.google.com/project/nihonselfpacepractic/authentication/providers

### **Firestore Database**
- **Firestore Console:** https://console.firebase.google.com/project/nihonselfpacepractic/firestore
- **Data:** https://console.firebase.google.com/project/nihonselfpacepractic/firestore/data
- **Rules:** https://console.firebase.google.com/project/nihonselfpacepractic/firestore/rules
- **Indexes:** https://console.firebase.google.com/project/nihonselfpacepractic/firestore/indexes

### **Cloud Storage**
- **Storage Console:** https://console.firebase.google.com/project/nihonselfpacepractic/storage
- **Files:** https://console.firebase.google.com/project/nihonselfpacepractic/storage/nihonselfpacepractic.firebasestorage.app/files
- **Rules:** https://console.firebase.google.com/project/nihonselfpacepractic/storage/nihonselfpacepractic.firebasestorage.app/rules

### **Hosting**
- **Hosting Console:** https://console.firebase.google.com/project/nihonselfpacepractic/hosting
- **Main Site:** https://console.firebase.google.com/project/nihonselfpacepractic/hosting/sites
- **Deployment History:** https://console.firebase.google.com/project/nihonselfpacepractic/hosting/sites/nihonselfpacepractic/deploys

### **Analytics**
- **Analytics Console:** https://console.firebase.google.com/project/nihonselfpacepractic/analytics
- **Events:** https://console.firebase.google.com/project/nihonselfpacepractic/analytics/app/web:4eb19452c95a823eab527a/events
- **Measurement ID:** `G-WWWT98XTT0`

### **Cloud Functions** (if needed)
- **Functions Console:** https://console.firebase.google.com/project/nihonselfpacepractic/functions

### **Extensions** (if needed)
- **Extensions Console:** https://console.firebase.google.com/project/nihonselfpacepractic/extensions

---

## 🌐 **LIVE APPLICATION URLS**

```yaml
Web App (React):        https://nihonselfpacepractic.web.app/
Flutter Games App:      https://nihonselfpacepractic-flutter.web.app/
Auth Domain:            nihonselfpacepractic.firebaseapp.com
Storage Bucket:         nihonselfpacepractic.firebasestorage.app
```

---

## 💻 **WEB APP CONFIGURATION**

### **1. Install Firebase SDK**

```bash
npm install firebase
```

### **2. Configuration Code (TypeScript)**

**File:** `src/config/firebaseConfig.ts`

```typescript
// src/config/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "nihonselfpacepractic.firebaseapp.com",
  projectId: "nihonselfpacepractic",
  storageBucket: "nihonselfpacepractic.firebasestorage.app",
  messagingSenderId: "319096782095",
  appId: "1:319096782095:web:4eb19452c95a823eab527a",
  measurementId: "G-WWWT98XTT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app, analytics };
```

### **3. Usage Example**

```typescript
// src/services/authService.ts
import { auth } from '../config/firebaseConfig';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  return await firebaseSignOut(auth);
};
```

```typescript
// src/services/firestoreService.ts
import { db } from '../config/firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc,
  updateDoc,
  deleteDoc 
} from 'firebase/firestore';

export const addDocument = async (collectionName: string, data: any) => {
  return await addDoc(collection(db, collectionName), data);
};

export const getDocuments = async (collectionName: string) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
```

---

## 📱 **FLUTTER APP CONFIGURATION**

### **1. Install FlutterFire CLI**

```bash
dart pub global activate flutterfire_cli
```

### **2. Add PATH (if needed)**

```bash
# Add to ~/.zshrc or ~/.bashrc
export PATH="$PATH":"$HOME/.pub-cache/bin"
```

### **3. Configure Firebase**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile
flutterfire configure --project=nihonselfpacepractic
```

This will:
- ✅ Create `lib/firebase_options.dart`
- ✅ Configure iOS (`GoogleService-Info.plist`)
- ✅ Configure Android (`google-services.json`)
- ✅ Configure Web

### **4. Add Dependencies to pubspec.yaml**

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # Firebase Core (REQUIRED)
  firebase_core: ^3.8.1
  
  # Firebase Services (add as needed)
  cloud_firestore: ^5.5.0
  firebase_auth: ^5.3.3
  firebase_analytics: ^11.5.0
  firebase_storage: ^12.5.0
```

### **5. Initialize Firebase in main.dart**

```dart
// lib/main.dart
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  // Ensure Flutter binding is initialized
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  runApp(const NihonQuestApp());
}

class NihonQuestApp extends StatelessWidget {
  const NihonQuestApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NihongoQuest',
      home: const HomeScreen(),
    );
  }
}
```

### **6. Install Dependencies**

```bash
flutter pub get
```

### **7. Usage Example**

```dart
// lib/services/firebase_service.dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class FirebaseService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  
  // Auth methods
  Future<UserCredential> signIn(String email, String password) async {
    return await _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
  }
  
  Future<UserCredential> signUp(String email, String password) async {
    return await _auth.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );
  }
  
  Future<void> signOut() async {
    await _auth.signOut();
  }
  
  // Firestore methods
  Future<void> addDocument(String collection, Map<String, dynamic> data) async {
    await _firestore.collection(collection).add(data);
  }
  
  Stream<QuerySnapshot> getDocuments(String collection) {
    return _firestore.collection(collection).snapshots();
  }
}
```

---

## 🍎 **iOS APP CONFIGURATION**

### **1. Download GoogleService-Info.plist**

**Download Link:** https://console.firebase.google.com/project/nihonselfpacepractic/settings/general

**Steps:**
1. Go to Firebase Console → Project Settings
2. Scroll to "Your apps" section
3. Click on "Nihon Pace iOS" (Bundle ID: `com.jarrel.nihonselfpace`)
4. Click "Download GoogleService-Info.plist"

### **2. Add to Xcode Project**

```bash
# If using Flutter
cp ~/Downloads/GoogleService-Info.plist /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile/ios/Runner/

# If standalone iOS app
# Add file to Xcode project and ensure "Copy items if needed" is checked
```

### **3. Verify in Xcode**

1. Open Xcode project
2. Check `GoogleService-Info.plist` is in project navigator
3. Select the file
4. In File Inspector, ensure "Target Membership" includes your app target

### **4. Bundle ID Configuration**

Ensure your iOS app uses the correct Bundle ID:

```
Bundle ID: com.jarrel.nihonselfpace
```

**Verify in:**
- Xcode → Project → General → Bundle Identifier
- `Info.plist` → CFBundleIdentifier

---

## 🤖 **ANDROID APP CONFIGURATION** (if needed)

### **1. Download google-services.json**

**Download from:** https://console.firebase.google.com/project/nihonselfpacepractic/settings/general

**Place at:** `android/app/google-services.json`

### **2. Add Firebase to build.gradle**

**File:** `android/build.gradle`

```gradle
buildscript {
  dependencies {
    // Add the Google services Gradle plugin
    classpath 'com.google.gms:google-services:4.4.0'
  }
}
```

**File:** `android/app/build.gradle`

```gradle
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'com.google.gms.google-services'  // Add this line
}

dependencies {
    implementation platform('com.google.firebase:firebase-bom:32.7.0')
    implementation 'com.google.firebase:firebase-analytics'
}
```

### **3. Package Name**

Ensure your Android package name matches Firebase configuration:

```
com.jarrel.nihonselfpace
```

---

## 🔐 **ENVIRONMENT VARIABLES**

### **For Vite Projects (.env)**

```bash
# .env
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=nihonselfpacepractic.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nihonselfpacepractic
VITE_FIREBASE_STORAGE_BUCKET=nihonselfpacepractic.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=319096782095
VITE_FIREBASE_APP_ID=1:319096782095:web:4eb19452c95a823eab527a
VITE_FIREBASE_MEASUREMENT_ID=G-WWWT98XTT0
```

### **For Next.js Projects (.env.local)**

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=nihonselfpacepractic.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=nihonselfpacepractic
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=nihonselfpacepractic.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=319096782095
NEXT_PUBLIC_FIREBASE_APP_ID=1:319096782095:web:4eb19452c95a823eab527a
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-WWWT98XTT0
```

### **Usage in Code**

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // or process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
```

---

## 🔒 **SECURITY RULES**

### **Firestore Rules (Development)**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read public data
    match /public/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### **Storage Rules (Development)**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload to their own folder
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read public files
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### **How to Apply Rules**

1. Go to Firestore Console: https://console.firebase.google.com/project/nihonselfpacepractic/firestore/rules
2. Paste rules
3. Click "Publish"

---

## 🚀 **DEPLOYMENT COMMANDS**

### **Deploy Web App**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend
npm run build
firebase deploy --only hosting
```

### **Deploy Flutter App**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile
flutter build web --release
firebase deploy --only hosting:flutter
```

### **Deploy Firestore Rules**

```bash
firebase deploy --only firestore:rules
```

### **Deploy Storage Rules**

```bash
firebase deploy --only storage:rules
```

### **Deploy Everything**

```bash
firebase deploy
```

---

## 🧪 **TESTING FIREBASE CONNECTION**

### **Test Script (Web)**

```typescript
// test-firebase.ts
import { app, auth, db } from './config/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

async function testFirebase() {
  console.log('🔥 Testing Firebase Connection...');
  
  try {
    // Test 1: Check app initialization
    console.log('✅ App Name:', app.name);
    console.log('✅ Project ID:', app.options.projectId);
    
    // Test 2: Test Firestore write
    const testRef = await addDoc(collection(db, 'test'), {
      message: 'Hello Firebase!',
      timestamp: new Date(),
      test: true
    });
    console.log('✅ Firestore Write:', testRef.id);
    
    // Test 3: Test Firestore read
    const snapshot = await getDocs(collection(db, 'test'));
    console.log('✅ Firestore Read:', snapshot.size, 'documents');
    
    console.log('🎉 All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testFirebase();
```

### **Test Script (Flutter)**

```dart
// test_firebase.dart
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'firebase_options.dart';

Future<void> testFirebase() async {
  print('🔥 Testing Firebase Connection...');
  
  try {
    // Initialize Firebase
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
    print('✅ Firebase Initialized');
    print('✅ Project ID: ${Firebase.app().options.projectId}');
    
    // Test Firestore write
    final db = FirebaseFirestore.instance;
    final docRef = await db.collection('test').add({
      'message': 'Hello from Flutter!',
      'timestamp': FieldValue.serverTimestamp(),
      'test': true,
    });
    print('✅ Firestore Write: ${docRef.id}');
    
    // Test Firestore read
    final snapshot = await db.collection('test').get();
    print('✅ Firestore Read: ${snapshot.docs.length} documents');
    
    print('🎉 All tests passed!');
  } catch (e) {
    print('❌ Test failed: $e');
  }
}
```

---

## 📦 **FIREBASE SDK VERSIONS**

### **Web (npm)**

```json
{
  "dependencies": {
    "firebase": "^10.8.0"
  }
}
```

### **Flutter (pubspec.yaml)**

```yaml
dependencies:
  firebase_core: ^3.8.1
  cloud_firestore: ^5.5.0
  firebase_auth: ^5.3.3
  firebase_analytics: ^11.5.0
  firebase_storage: ^12.5.0
```

---

## 🛠️ **AUTOMATED SETUP**

### **Run Setup Script**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace
./setup-firebase.sh
```

This will:
- ✅ Check all required tools
- ✅ Install FlutterFire CLI
- ✅ Configure Flutter app
- ✅ Verify web app config
- ✅ Check iOS configuration
- ✅ Install dependencies

---

## ✅ **IMPLEMENTATION CHECKLIST**

### **nihon-quest-fullstack (React Web App)**
- [x] Firebase SDK installed (`npm install firebase`)
- [x] Config file created (`src/config/firebaseConfig.ts`)
- [x] Auth service configured
- [x] Firestore service configured
- [x] Analytics initialized
- [x] Deployed to Firebase Hosting

**Status:** ✅ **COMPLETE**

**Location:** `/Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend/src/config/firebaseConfig.ts`

---

### **nihon_quest_mobile (Flutter App)**
- [ ] FlutterFire CLI installed
- [ ] Run `flutterfire configure`
- [ ] `firebase_options.dart` generated
- [ ] Dependencies added to `pubspec.yaml`
- [ ] Firebase initialized in `main.dart`
- [ ] iOS `GoogleService-Info.plist` added
- [ ] Tested on web
- [ ] Deployed to Firebase Hosting

**Status:** ⏳ **READY TO CONFIGURE**

**Next Steps:**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile
flutterfire configure --project=nihonselfpacepractic
flutter pub get
```

---

### **nihongo-quest-app**
- [ ] Determine if Firebase is needed
- [ ] Install Firebase SDK
- [ ] Create config file
- [ ] Initialize services

**Status:** ❓ **OPTIONAL**

---

## 🆘 **TROUBLESHOOTING**

### **Issue: "FlutterFire not found"**

```bash
dart pub global activate flutterfire_cli
export PATH="$PATH":"$HOME/.pub-cache/bin"
source ~/.zshrc  # or source ~/.bashrc
```

### **Issue: "Firebase CLI not found"**

```bash
npm install -g firebase-tools
firebase login
firebase use nihonselfpacepractic
```

### **Issue: "Permission denied"**

```bash
chmod +x setup-firebase.sh
```

### **Issue: "Wrong project selected"**

```bash
firebase use nihonselfpacepractic
firebase projects:list  # Verify
```

### **Issue: "API key not working"**

- Verify API key is correct: `YOUR_FIREBASE_API_KEY_HERE`
- Check Firebase Console → Project Settings
- Ensure app is registered in Firebase

### **Issue: "Firestore permission denied"**

- Check Firestore Rules
- Ensure user is authenticated
- Go to: https://console.firebase.google.com/project/nihonselfpacepractic/firestore/rules

---

## 📚 **ADDITIONAL RESOURCES**

### **Documentation**
- **Firebase Docs:** https://firebase.google.com/docs
- **FlutterFire Docs:** https://firebase.flutter.dev/docs/overview
- **Firebase Web Setup:** https://firebase.google.com/docs/web/setup
- **Firebase iOS Setup:** https://firebase.google.com/docs/ios/setup
- **Firebase Android Setup:** https://firebase.google.com/docs/android/setup

### **Video Tutorials**
- **Firebase Web:** https://www.youtube.com/watch?v=9kRgVxULbag
- **FlutterFire:** https://www.youtube.com/watch?v=sz4slPFwEvs

### **Support**
- **Firebase Status:** https://status.firebase.google.com/
- **Stack Overflow:** https://stackoverflow.com/questions/tagged/firebase
- **Firebase Support:** https://firebase.google.com/support

---

## 🎯 **QUICK REFERENCE SUMMARY**

```yaml
PROJECT:
  Name: NihonSelfPacePractice
  ID: nihonselfpacepractic
  Number: 319096782095

WEB_CONFIG:
  API_Key: YOUR_FIREBASE_API_KEY_HERE
  Auth_Domain: nihonselfpacepractic.firebaseapp.com
  Storage_Bucket: nihonselfpacepractic.firebasestorage.app
  App_ID: 1:319096782095:web:4eb19452c95a823eab527a
  Measurement_ID: G-WWWT98XTT0

IOS_CONFIG:
  Bundle_ID: com.jarrel.nihonselfpace
  App_ID: 1:319096782095:ios:b973a0a7b464950eab527a

LIVE_URLS:
  Web_App: https://nihonselfpacepractic.web.app/
  Flutter_App: https://nihonselfpacepractic-flutter.web.app/
  
CONSOLE_LINKS:
  Dashboard: https://console.firebase.google.com/project/nihonselfpacepractic/overview
  Auth: https://console.firebase.google.com/project/nihonselfpacepractic/authentication
  Firestore: https://console.firebase.google.com/project/nihonselfpacepractic/firestore
  Hosting: https://console.firebase.google.com/project/nihonselfpacepractic/hosting
```

---

**🎉 Everything you need to integrate Firebase across all your projects!**

**Quick Start:** Run `./setup-firebase.sh` from the root directory!
