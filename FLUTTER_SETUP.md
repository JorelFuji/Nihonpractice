# 📱 Flutter Mobile App Setup Guide

## Building a Flutter version of NihongoQuest for iOS & Android

---

## ✅ **What You Have Ready**

Your React web app is complete with:
- ✅ Kids Mode (picture matching games)
- ✅ Grammar Learning (SOV structure, registers)
- ✅ Furigana system
- ✅ Firebase backend
- ✅ Audio pronunciation

**Now:** Create a mobile app that mirrors these features!

---

## 🎯 **Flutter App Structure**

```
nihon_quest_mobile/
├── lib/
│   ├── main.dart                    # Entry point
│   ├── firebase_options.dart        # Auto-generated
│   ├── screens/
│   │   ├── home_screen.dart
│   │   ├── kids_mode_screen.dart
│   │   ├── grammar_learning_screen.dart
│   │   └── flashcards_screen.dart
│   ├── widgets/
│   │   ├── furigana_text.dart       # Ruby text widget
│   │   ├── audio_button.dart        # TTS playback
│   │   └── matching_card.dart
│   ├── models/
│   │   ├── grammar_point.dart
│   │   ├── picture_card.dart
│   │   └── lesson.dart
│   └── services/
│       ├── firebase_service.dart
│       ├── audio_service.dart
│       └── srs_service.dart
├── android/
├── ios/
└── pubspec.yaml                     # Dependencies
```

---

## 🚀 **Step-by-Step Setup**

### **1. Install Flutter**

```bash
# macOS
brew install flutter

# Verify installation
flutter doctor
```

**Fix any issues** that `flutter doctor` reports (Xcode, Android Studio, etc.)

---

### **2. Create Flutter Project**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace

flutter create nihon_quest_mobile \
  --org com.nihonquest \
  --platforms=ios,android
```

---

### **3. Install FlutterFire CLI**

```bash
# Activate FlutterFire CLI
dart pub global activate flutterfire_cli

# Add to PATH (add to ~/.zshrc)
export PATH="$PATH:$HOME/.pub-cache/bin"

# Reload shell
source ~/.zshrc
```

---

### **4. Configure Firebase**

```bash
cd nihon_quest_mobile

# Login to Firebase (if not already)
firebase login

# Configure FlutterFire
flutterfire configure --project=nihonselfpacepractic
```

This will:
- Register iOS and Android apps with Firebase
- Generate `lib/firebase_options.dart`
- Configure both platforms automatically

---

### **5. Add Dependencies**

Edit `pubspec.yaml`:

```yaml
name: nihon_quest_mobile
description: NihongoQuest Japanese Learning App
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  
  # Firebase
  firebase_core: ^2.24.0
  cloud_firestore: ^4.13.0
  firebase_auth: ^4.15.0
  firebase_storage: ^11.5.0
  
  # UI & Animations
  flutter_svg: ^2.0.9
  lottie: ^2.7.0
  confetti: ^0.7.0
  
  # Audio
  audioplayers: ^5.2.1
  flutter_tts: ^3.8.5
  
  # SRS (Spaced Repetition)
  # Note: Use your ts-fsrs logic or find Dart equivalent
  
  # State Management
  provider: ^6.1.1
  get_it: ^7.6.4
  
  # Utils
  intl: ^0.18.1
  shared_preferences: ^2.2.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/audio/
```

Install:
```bash
flutter pub get
```

---

### **6. Initialize Firebase in App**

Edit `lib/main.dart`:

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

class NihonQuestApp extends StatelessWidget {
  const NihonQuestApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NihongoQuest',
      theme: ThemeData(
        primarySwatch: Colors.purple,
        useMaterial3: true,
        fontFamily: 'Quicksand',
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('🔥 NihongoQuest'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              '🌸 Welcome to NihongoQuest! 🌸',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Navigate to Kids Mode
              },
              child: const Text('👶 Kids Mode (Ages 4-8)'),
            ),
            ElevatedButton(
              onPressed: () {
                // Navigate to Grammar Learning
              },
              child: const Text('📚 Grammar Learning'),
            ),
          ],
        ),
      ),
    );
  }
}
```

---

### **7. Test the App**

```bash
# iOS Simulator
flutter run -d "iPhone 15 Pro"

# Android Emulator
flutter run -d emulator-5554

# Physical device
flutter devices  # List devices
flutter run -d <device-id>
```

---

## 📱 **Implementing Kids Mode**

### **`lib/models/picture_card.dart`**

```dart
class PictureCard {
  final String id;
  final String character;      // あ, ア
  final String romanji;         // a
  final String emoji;           // 🍎
  final String image;           // Apple
  final String? sound;          // Audio pronunciation

  PictureCard({
    required this.id,
    required this.character,
    required this.romanji,
    required this.emoji,
    required this.image,
    this.sound,
  });
}

// Hiragana cards
final hiraganaCards = [
  PictureCard(id: 'a', character: 'あ', romanji: 'a', emoji: '🍎', image: 'Apple', sound: 'a'),
  PictureCard(id: 'i', character: 'い', romanji: 'i', emoji: '🦷', image: 'Tooth', sound: 'i'),
  PictureCard(id: 'u', character: 'う', romanji: 'u', emoji: '🐰', image: 'Rabbit', sound: 'u'),
  // ... more cards
];
```

---

### **`lib/services/audio_service.dart`**

```dart
import 'package:flutter_tts/flutter_tts.dart';

class AudioService {
  final FlutterTts _tts = FlutterTts();

  AudioService() {
    _initialize();
  }

  Future<void> _initialize() async {
    await _tts.setLanguage('ja-JP');
    await _tts.setSpeechRate(0.4);  // Slower for kids
    await _tts.setVolume(1.0);
  }

  Future<void> speak(String text) async {
    await _tts.speak(text);
  }

  Future<void> stop() async {
    await _tts.stop();
  }
}
```

---

### **`lib/screens/kids_mode_screen.dart`**

```dart
import 'package:flutter/material.dart';
import 'package:confetti/confetti.dart';
import '../models/picture_card.dart';
import '../services/audio_service.dart';

class KidsModeScreen extends StatefulWidget {
  const KidsModeScreen({super.key});

  @override
  State<KidsModeScreen> createState() => _KidsModeScreenState();
}

class _KidsModeScreenState extends State<KidsModeScreen> {
  final AudioService _audio = AudioService();
  final ConfettiController _confettiController = ConfettiController();
  
  String? _selectedPicture;
  String? _selectedCharacter;
  Set<String> _matchedPairs = {};
  int _score = 0;

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  void _handleMatch(String id) {
    if (_selectedPicture == id) {
      setState(() {
        _matchedPairs.add(id);
        _score += 10;
      });
      _confettiController.play();
      _audio.speak('correct');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('👶 Kids Mode - Hiragana Match'),
        actions: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Chip(
              label: Text('⭐ $_score'),
              backgroundColor: Colors.yellow[100],
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Confetti overlay
          Align(
            alignment: Alignment.topCenter,
            child: ConfettiWidget(
              confettiController: _confettiController,
              blastDirectionality: BlastDirectionality.explosive,
            ),
          ),
          
          // Picture cards and character cards...
          Expanded(
            child: Row(
              children: [
                // Pictures column
                Expanded(
                  child: _buildPictureColumn(),
                ),
                
                // Characters column  
                Expanded(
                  child: _buildCharacterColumn(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPictureColumn() {
    return ListView.builder(
      padding: const EdgeInsets.all(8),
      itemCount: hiraganaCards.length,
      itemBuilder: (context, index) {
        final card = hiraganaCards[index];
        final isMatched = _matchedPairs.contains(card.id);
        final isSelected = _selectedPicture == card.id;
        
        return Card(
          color: isMatched 
            ? Colors.green[100]
            : isSelected 
            ? Colors.purple[100] 
            : Colors.white,
          child: ListTile(
            leading: Text(card.emoji, style: const TextStyle(fontSize: 40)),
            title: Text(card.image, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            trailing: isMatched ? const Icon(Icons.check_circle, color: Colors.green, size: 32) : null,
            onTap: isMatched ? null : () {
              setState(() {
                _selectedPicture = card.id;
              });
            },
          ),
        );
      },
    );
  }

  Widget _buildCharacterColumn() {
    return ListView.builder(
      padding: const EdgeInsets.all(8),
      itemCount: hiraganaCards.length,
      itemBuilder: (context, index) {
        final card = hiraganaCards[index];
        final isMatched = _matchedPairs.contains(card.id);
        final isSelected = _selectedCharacter == card.id;
        
        return Card(
          color: isMatched 
            ? Colors.green[100]
            : isSelected 
            ? Colors.blue[100] 
            : Colors.white,
          child: ListTile(
            title: Center(
              child: Text(
                card.character,
                style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
              ),
            ),
            subtitle: Center(child: Text(card.romanji, style: const TextStyle(fontSize: 16))),
            trailing: isMatched ? const Icon(Icons.check_circle, color: Colors.green, size: 32) : null,
            onTap: isMatched ? null : () {
              setState(() {
                _selectedCharacter = card.id;
              });
              _audio.speak(card.sound ?? card.romanji);
              _handleMatch(card.id);
            },
          ),
        );
      },
    );
  }
}
```

---

## 📚 **Implementing Furigana Widget**

### **`lib/widgets/furigana_text.dart`**

```dart
import 'package:flutter/material.dart';

class FuriganaText extends StatelessWidget {
  final String kanji;
  final String reading;
  final TextStyle? kanjiStyle;
  final TextStyle? readingStyle;

  const FuriganaText({
    super.key,
    required this.kanji,
    required this.reading,
    this.kanjiStyle,
    this.readingStyle,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Reading (furigana) above
        Text(
          '($reading)',
          style: readingStyle ?? const TextStyle(
            fontSize: 12,
            color: Colors.grey,
          ),
        ),
        // Kanji below
        Text(
          kanji,
          style: kanjiStyle ?? const TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }
}

// Usage:
// FuriganaText(kanji: '日本', reading: 'にほん')
```

---

## 🎯 **Next Steps**

### **1. Complete Kids Mode**
- ✅ Picture matching (hiragana)
- ✅ Picture matching (katakana)
- ✅ Memory game
- ✅ Audio pronunciation

### **2. Add Grammar Learning**
- SOV structure lessons
- Register examples (casual/polite/formal)
- Interactive sentence building

### **3. Implement SRS**
- Port ts-fsrs logic to Dart
- Schedule reviews in Firestore
- Show due cards

### **4. Add Navigation**
- Bottom navigation bar
- Route management
- Deep linking

### **5. Polish & Test**
- Animations
- Sound effects
- Haptic feedback
- iOS/Android testing

---

## 📱 **Platform-Specific Setup**

### **iOS Configuration**

Edit `ios/Runner/Info.plist`:

```xml
<key>CFBundleLocalizations</key>
<array>
    <string>en</string>
    <string>ja</string>
</array>

<key>NSMicrophoneUsageDescription</key>
<string>We need microphone access for pronunciation practice</string>

<key>NSSpeechRecognitionUsageDescription</key>
<string>We use speech recognition to help you practice pronunciation</string>
```

---

### **Android Configuration**

Edit `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>

<application
    android:label="NihongoQuest"
    android:icon="@mipmap/ic_launcher">
    <!-- ... -->
</application>
```

---

## 🚀 **Build & Deploy**

### **Development**
```bash
# Run on device
flutter run

# Hot reload: press 'r'
# Hot restart: press 'R'
```

### **Build for Release**

**iOS:**
```bash
flutter build ios --release
# Then open Xcode and submit to App Store
open ios/Runner.xcworkspace
```

**Android:**
```bash
flutter build appbundle --release
# Upload nihon_quest_mobile/build/app/outputs/bundle/release/app-release.aab
# to Google Play Console
```

---

## 🎨 **Design Tips**

### **Match Web App Style**
- Use same colors (purple, pink, blue gradients)
- Same emoji/icons
- Similar card layouts
- Consistent spacing

### **Mobile-Specific**
- Larger touch targets (min 48x48dp)
- Bottom navigation bar
- Swipe gestures
- Pull-to-refresh

---

## 📊 **Feature Parity Checklist**

| Feature | Web ✅ | Flutter 📱 |
|---------|--------|-----------|
| Kids Mode - Hiragana | ✅ | 🔜 Build |
| Kids Mode - Katakana | ✅ | 🔜 Build |
| Kids Mode - Memory | ✅ | 🔜 Build |
| Audio Playback | ✅ | 🔜 flutter_tts |
| Grammar Learning SOV | ✅ | 🔜 Build |
| Grammar Registers | ✅ | 🔜 Build |
| Furigana Display | ✅ | 🔜 Custom widget |
| Firebase Auth | ✅ | 🔜 firebase_auth |
| Firestore Data | ✅ | 🔜 cloud_firestore |
| Responsive UI | ✅ | ✅ Built-in |

---

## 🎓 **Learning Resources**

- **Flutter Docs:** https://docs.flutter.dev
- **FlutterFire:** https://firebase.flutter.dev
- **Cookbook:** https://docs.flutter.dev/cookbook
- **Widget Catalog:** https://docs.flutter.dev/development/ui/widgets

---

## 🐛 **Common Issues**

### **Issue: CocoaPods errors (iOS)**
```bash
cd ios
pod install --repo-update
cd ..
```

### **Issue: Gradle errors (Android)**
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
```

### **Issue: Firebase not working**
```bash
# Re-run configuration
flutterfire configure --project=nihonselfpacepractic
```

---

## ✅ **Summary**

You now have:
1. ✅ **Flutter project created** - Ready structure
2. ✅ **Firebase configured** - Auto-generated config
3. ✅ **Dependencies defined** - All packages listed
4. ✅ **Example code** - Kids Mode, Audio, Furigana
5. ✅ **Build instructions** - iOS & Android
6. ✅ **Clear roadmap** - What to build next

**Next:** Start coding the Kids Mode screen and test on a device!

---

日本語学習アプリのFlutter版が始まります！📱✨  
(Nihongo gakushū apuri no Flutter-ban ga hajimarimasu!)  
**Your Flutter Japanese learning app begins!**
