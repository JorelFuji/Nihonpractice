# 🔥 Firebase Quick Reference Card

**Project:** NihonSelfPacePractice  
**Project ID:** `nihonselfpacepractic`  
**Last Updated:** June 29, 2026

---

## 📋 **COPY-PASTE READY CONFIGS**

### **🌐 Web App Config (JavaScript/TypeScript)**

```typescript
// src/config/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
```

---

### **📱 Flutter App Setup**

```bash
# 1. Install FlutterFire CLI
dart pub global activate flutterfire_cli

# 2. Configure Firebase
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile
flutterfire configure --project=nihonselfpacepractic

# 3. Add to pubspec.yaml
firebase_core: ^3.8.1
cloud_firestore: ^5.5.0
firebase_auth: ^5.3.3
firebase_analytics: ^11.5.0

# 4. Initialize in main.dart
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}
```

---

### **🍎 iOS Configuration**

**Download from:** https://console.firebase.google.com/project/nihonselfpacepractic/settings/general

**Place at:** `ios/Runner/GoogleService-Info.plist`

**Bundle ID:** `com.jarrel.nihonselfpace`  
**App ID:** `1:319096782095:ios:b973a0a7b464950eab527a`

---

## 🚀 **QUICK COMMANDS**

### **Run Setup Script**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace
./setup-firebase.sh
```

### **Deploy Flutter App**
```bash
cd nihon_quest_mobile
flutter build web --release
firebase deploy --only hosting:flutter
```

### **Deploy Web App**
```bash
cd nihon-quest-fullstack/frontend
npm run build
firebase deploy --only hosting
```

---

## 🔗 **QUICK LINKS**

| Resource | URL |
|----------|-----|
| **Firebase Console** | https://console.firebase.google.com/project/nihonselfpacepractic |
| **Web App** | https://nihonselfpacepractic.web.app/ |
| **Flutter App** | https://nihonselfpacepractic-flutter.web.app/ |
| **Authentication** | https://console.firebase.google.com/project/nihonselfpacepractic/authentication |
| **Firestore** | https://console.firebase.google.com/project/nihonselfpacepractic/firestore |
| **Hosting** | https://console.firebase.google.com/project/nihonselfpacepractic/hosting |

---

## 📊 **PROJECT IDs**

```
Project Name:       NihonSelfPacePractice
Project ID:         nihonselfpacepractic
Project Number:     319096782095
Web App ID:         1:319096782095:web:4eb19452c95a823eab527a
iOS App ID:         1:319096782095:ios:b973a0a7b464950eab527a
Bundle ID:          com.jarrel.nihonselfpace
```

---

## 🔐 **Environment Variables (.env)**

```bash
# Firebase Config
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=nihonselfpacepractic.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nihonselfpacepractic
VITE_FIREBASE_STORAGE_BUCKET=nihonselfpacepractic.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=319096782095
VITE_FIREBASE_APP_ID=1:319096782095:web:4eb19452c95a823eab527a
VITE_FIREBASE_MEASUREMENT_ID=G-WWWT98XTT0
```

---

## ✅ **STATUS CHECKLIST**

### **nihon-quest-fullstack (React Web)**
- [x] Firebase SDK installed
- [x] Config file created
- [x] Auth configured
- [x] Firestore configured
- [x] Deployed to hosting

### **nihon_quest_mobile (Flutter)**
- [ ] FlutterFire CLI installed
- [ ] firebase_options.dart generated
- [ ] Firebase initialized in main.dart
- [ ] Deployed to hosting

### **iOS App**
- [ ] GoogleService-Info.plist downloaded
- [ ] Added to Xcode project
- [ ] Verified in project settings

---

## 🛠️ **TROUBLESHOOTING**

### **Issue: FlutterFire not found**
```bash
dart pub global activate flutterfire_cli
export PATH="$PATH":"$HOME/.pub-cache/bin"
```

### **Issue: Firebase CLI not found**
```bash
npm install -g firebase-tools
firebase login
```

### **Issue: Permission denied on script**
```bash
chmod +x setup-firebase.sh
```

### **Issue: Wrong project selected**
```bash
firebase use nihonselfpacepractic
```

---

## 📖 **FULL DOCUMENTATION**

See: `@/Users/m1876041/Documents/Github/NihonSelfPace/FIREBASE_CONFIG_SETUP.md`

---

**Quick Start:** Run `./setup-firebase.sh` to configure everything automatically!
