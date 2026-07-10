# 📱 NihongoQuest Flutter Web App - Complete Documentation

**Live URL:** https://nihonselfpacepractic-flutter.web.app/  
**App Name:** NihongoQuest - Kids Mode (日本語クエスト)  
**Version:** v2.0.0  
**Platform:** Flutter Web (Cross-platform: Web, iOS, Android)  
**Theme:** Purple, Pink, and Gradient-based Design  

---

## 📂 **PROJECT STRUCTURE**

### **Root Directory:**
```
/Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile/
├── lib/                          # Main source code
│   ├── main.dart                 # App entry point
│   ├── screens/                  # All game and page screens
│   ├── models/                   # Data models
│   └── services/                 # Helper services
├── web/                          # Web-specific files
├── android/                      # Android build files
├── ios/                          # iOS build files
├── test/                         # Unit tests
├── pubspec.yaml                  # Dependencies
└── firebase.json                 # Firebase hosting config
```

---

## 🎮 **MAIN SCREENS & NAVIGATION**

### **1. Home Screen** (`home_screen.dart`)
**Purpose:** Main landing page with menu navigation  
**Route:** `/` (default)  
**Features:**
- Purple-pink gradient background
- Scrollable menu cards
- Version badge (v2.0.0)
- Web app launcher button
- Refresh functionality

**Menu Options:**
1. 👶 **こどもモード** (Kids Mode) - Ages 4-8 games
2. 📚 **ぶんぽう N5-N1** (Grammar) - Coming soon
3. 🎓 **おとながくしゅう** (Adult Learning) - Coming soon
4. 🕹️ **レトロゲーム** (Retro Games) - Classic gaming history
5. ℹ️ **About** - App info & copyright

---

## 👶 **KIDS MODE SECTION**

### **Kids Mode Screen** (`kids_mode_screen.dart`)
**Icon:** 👶  
**Colors:** Pink gradient  
**Total Games:** 6 (5 playable + 1 coming soon)

---

### **✅ PLAYABLE KIDS GAMES (5)**

#### **Game 1: Hiragana Match** (`hiragana_match_screen.dart`)
**Icon:** あ  
**Title:** 1️⃣ ひらがナマッチ [Hiragana Match]  
**Subtitle:** えとじをあわせよう！ (Match pictures with letters!)  
**Color:** Blue  
**Type:** Educational matching game  
**Features:**
- Match hiragana characters with corresponding images
- Audio feedback for correct matches
- Progress tracking
- Kid-friendly UI

**Learning Goals:**
- Hiragana character recognition
- Visual-text association
- Memory skills

---

#### **Game 2: Memory Card Game** (`memory_card_game_screen.dart`)
**Icon:** 🧠  
**Title:** 2️⃣ 記憶(きおく)ゲーム [Memory Game]  
**Subtitle:** おなじカードをさがそう！ (Find matching cards!)  
**Color:** Purple  
**Type:** Memory matching game  
**Features:**
- Flip cards to find pairs
- Japanese character/object matching
- Score tracking
- Timer functionality

**Learning Goals:**
- Memory and concentration
- Pattern recognition
- Japanese vocabulary retention

---

#### **Game 3: Character Trace** (`character_trace_screen.dart`)
**Icon:** ✏️  
**Title:** 3️⃣ 文字(もじ)を書(か)こう [Character Trace]  
**Subtitle:** ひらがなをかく！ (Write hiragana!)  
**Color:** Orange  
**Type:** Drawing/tracing game  
**Features:**
- Interactive canvas for tracing
- Hiragana stroke order guidance
- Touch/mouse drawing support
- Instant feedback

**Learning Goals:**
- Proper hiragana writing
- Stroke order mastery
- Fine motor skills (touch devices)

---

#### **Game 4: Puzzle Slide** (`puzzle_slide_screen.dart`)
**Icon:** 🧩  
**Title:** 4️⃣ スライドパズル [Slide Puzzle]  
**Subtitle:** すうじパズルをとこう！ (Solve number puzzles!)  
**Color:** Cyan  
**Type:** Slide puzzle game  
**Features:**
- Classic 15-puzzle mechanic
- Japanese numbers
- Move counter
- Shuffle functionality

**Learning Goals:**
- Number recognition (Japanese)
- Logic and problem-solving
- Spatial reasoning

---

#### **Game 5: Fast Tap** (`character_tap_game_screen.dart`)
**Icon:** ⚡  
**Title:** 5️⃣ 速(はや)くタップ [Fast Tap]  
**Subtitle:** おちてくるもじをタップ！ (Tap falling characters!)  
**Color:** Indigo  
**Type:** Action/reaction game  
**Features:**
- Falling hiragana characters
- Tap matching characters before they fall
- Speed increases over time
- Score and combo system

**Learning Goals:**
- Quick character recognition
- Hand-eye coordination
- Reading speed improvement

---

### **🚧 COMING SOON (1)**

#### **Game 6: Katakana Match**
**Icon:** ア  
**Title:** 6️⃣ カタカナマッチ [Katakana Match]  
**Subtitle:** もうすぐ！ (Coming soon!)  
**Color:** Green  
**Status:** Not yet implemented  
**Planned Features:**
- Similar to Hiragana Match
- Focus on katakana characters
- Foreign word vocabulary

---

## 🕹️ **RETRO GAMES SECTION**

### **Retro Games Screen** (`retro_games_screen.dart`)
**Icon:** 🕹️  
**Title:** レトロゲーム (Retro Games)  
**Subtitle:** Classic gaming history  
**Colors:** Deep Orange gradient  
**Total Games:** 50+ classic games from 1972-2009  
**Status:** All games showing "Coming soon" with educational info

**Purpose:**
- Educational gaming history
- Japanese game title learning
- Cultural appreciation of gaming evolution

---

### **🇺🇸 ATARI CLASSICS (1970s-80s)**

#### **Arcade Legends:**

**1. Pong (1972)**
- **Icon:** 🏓
- **Title:** ポン [Pong]
- **Subtitle:** The game that started it all
- **Historical Significance:** First commercially successful video game

**2. Asteroids (1979)**
- **Icon:** ☄️
- **Title:** アステロイド [Asteroids]
- **Subtitle:** Vector space shooter

**3. Centipede (1981)**
- **Icon:** 🐛
- **Title:** センティピード [Centipede]
- **Subtitle:** Shoot through mushroom field

**4. Missile Command (1980)**
- **Icon:** 🚀
- **Title:** ミサイルコマンド [Missile Command]
- **Subtitle:** Defend cities from nukes

**5. Tempest (1981)**
- **Icon:** 🌀
- **Title:** テンペスト [Tempest]
- **Subtitle:** Fast tube shooter

---

#### **Atari 2600 Home Classics:**

**6. Space Invaders (1980)**
- **Icon:** 👾
- **Title:** スペースインベーダー [Space Invaders]
- **Subtitle:** The killer app

**7. Pitfall! (1982)**
- **Icon:** 🌴
- **Title:** ピットフォール [Pitfall!]
- **Subtitle:** Jungle platformer

**8. Adventure (1980)**
- **Icon:** 🗝️
- **Title:** アドベンチャー [Adventure]
- **Subtitle:** First action-adventure + Easter egg

**9. Combat (1977)**
- **Icon:** 🎮
- **Title:** コンバット [Combat]
- **Subtitle:** Tank and plane duels

**10. Yars' Revenge (1982)**
- **Icon:** 🐝
- **Title:** ヤーズリベンジ [Yars' Revenge]
- **Subtitle:** Best-selling original 2600 game

**11. River Raid (1982)**
- **Icon:** ✈️
- **Title:** リバーレイド [River Raid]
- **Subtitle:** Vertical shooter by Carol Shaw

---

### **🇯🇵 JAPANESE CLASSICS (1970s-2000s)**

#### **1970s - Arcade Era Begins:**

**12. Space Invaders (1978)**
- **Icon:** 👾
- **Title:** スペースインベーダー [Space Invaders]
- **Subtitle:** Global phenomenon
- **Impact:** Created arcade boom in Japan

**13. Galaxian (1979)**
- **Icon:** 🌌
- **Title:** ギャラクシアン [Galaxian]
- **Subtitle:** Colorful space shooter

---

#### **1980s - Famicom Golden Age:**

**14. Pac-Man (1980)**
- **Icon:** 🟡
- **Title:** パックマン [Pac-Man]
- **Subtitle:** Maze chase icon
- **Impact:** Created by Namco, global cultural icon

**15. Donkey Kong (1981)**
- **Icon:** 🦍
- **Title:** ドンキーコング [Donkey Kong]
- **Subtitle:** Introduced Mario
- **Impact:** Nintendo's first major arcade hit

**16. Super Mario Bros. (1985)**
- **Icon:** 🍄
- **Title:** スーパーマリオブラザーズ [Super Mario Bros.]
- **Subtitle:** Platform revolution
- **Impact:** Saved the video game industry

**17. The Legend of Zelda (1986)**
- **Icon:** 🗡️
- **Title:** ゼルダの伝説(でんせつ) [The Legend of Zelda]
- **Subtitle:** Open-world adventure
- **Impact:** Invented battery backup saves

**18. Dragon Quest (1986)**
- **Icon:** 🐉
- **Title:** ドラゴンクエスト [Dragon Quest]
- **Subtitle:** JRPG foundation
- **Impact:** Created the JRPG genre

**19. Final Fantasy (1987)**
- **Icon:** ⚔️
- **Title:** ファイナルファンタジー [Final Fantasy]
- **Subtitle:** RPG classic
- **Impact:** Square's last chance game (hence "Final")

**20. Mega Man / Rockman (1987)**
- **Icon:** 🤖
- **Title:** ロックマン [Mega Man/Rockman]
- **Subtitle:** Action platformer
- **Impact:** Boss weapon system innovation

---

#### **1990s - PlayStation & Pokémon Era:**

**21. Street Fighter II (1991)**
- **Icon:** 🥋
- **Title:** ストリートファイターII [Street Fighter II]
- **Subtitle:** Fighting game boom
- **Impact:** Created competitive gaming scene

**22. Sonic the Hedgehog (1991)**
- **Icon:** 🦔
- **Title:** ソニック・ザ・ヘッジホッグ [Sonic the Hedgehog]
- **Subtitle:** Speed platformer
- **Impact:** Sega's answer to Mario

**23. Pokémon Red/Green (1996)**
- **Icon:** 🎾
- **Title:** ポケットモンスター 赤(あか)・緑(みどり) [Pokémon Red/Green]
- **Subtitle:** Global phenomenon
- **Impact:** Largest media franchise in history

**24. Resident Evil / Biohazard (1996)**
- **Icon:** 🧟
- **Title:** バイオハザード [Resident Evil/Biohazard]
- **Subtitle:** Survival horror
- **Impact:** Defined survival horror genre

**25. Final Fantasy VII (1997)**
- **Icon:** 💎
- **Title:** ファイナルファンタジーVII [Final Fantasy VII]
- **Subtitle:** Cinematic RPG
- **Impact:** Made RPGs mainstream in West

**26. Metal Gear Solid (1998)**
- **Icon:** 📦
- **Title:** メタルギアソリッド [Metal Gear Solid]
- **Subtitle:** Stealth action
- **Impact:** Cinematic storytelling in games

**27. Gran Turismo (1997)**
- **Icon:** 🏎️
- **Title:** グランツーリスモ [Gran Turismo]
- **Subtitle:** Racing sim
- **Impact:** Realistic car simulation

---

#### **2000s - DS, Wii, PSP Era:**

**28. Animal Crossing (2001)**
- **Icon:** 🏡
- **Title:** どうぶつの森(もり) [Animal Crossing]
- **Subtitle:** Life simulation
- **Impact:** Social simulation gaming

**29. Kingdom Hearts (2002)**
- **Icon:** 🗝️
- **Title:** キングダムハーツ [Kingdom Hearts]
- **Subtitle:** Disney x FF
- **Impact:** Unexpected successful crossover

**30. Taiko no Tatsujin (2001)**
- **Icon:** 🥁
- **Title:** 太鼓(たいこ)の達人(たつじん) [Taiko no Tatsujin]
- **Subtitle:** Rhythm drumming
- **Impact:** Arcade rhythm game phenomenon

**31. Monster Hunter (2004)**
- **Icon:** ⚔️
- **Title:** モンスターハンター [Monster Hunter]
- **Subtitle:** Co-op hunting
- **Impact:** Massive in Japan, defined co-op action

**32. Katamari Damacy (2004)**
- **Icon:** 🎲
- **Title:** 塊魂(かたまりだましい) [Katamari Damacy]
- **Subtitle:** Roll everything up
- **Impact:** Unique gameplay and art style

**33. Brain Age (2005)**
- **Icon:** 🧠
- **Title:** 脳(のう)を鍛(きた)える [Brain Age]
- **Subtitle:** Brain training
- **Impact:** Expanded gaming demographics

**34. Nintendogs (2005)**
- **Icon:** 🐕
- **Title:** ニンテンドッグス [Nintendogs]
- **Subtitle:** Virtual pets
- **Impact:** Showcase for DS touch screen

**35. Wii Sports (2006)**
- **Icon:** 🎾
- **Title:** Wiiスポーツ [Wii Sports]
- **Subtitle:** Motion control
- **Impact:** Mainstream motion gaming

**36. Professor Layton (2007)**
- **Icon:** 🎩
- **Title:** レイトン教授(きょうじゅ) [Professor Layton]
- **Subtitle:** Puzzle adventure
- **Impact:** Revitalized puzzle game genre

**37. Wii Fit (2007)**
- **Icon:** 🧘
- **Title:** Wiiフィット [Wii Fit]
- **Subtitle:** Fitness gaming
- **Impact:** Health and fitness gaming

---

## 📚 **OTHER SCREENS**

### **Grammar Screen** (`grammar_screen.dart`)
**Icon:** 📚  
**Title:** ぶんぽう N5-N1 (Grammar N5-N1)  
**Status:** Coming soon (もうすぐ！)  
**Planned Features:**
- JLPT grammar lessons
- Interactive exercises
- Progress tracking

---

### **Adult Learning Screen** (`adult_learning_screen.dart`)
**Icon:** 🎓  
**Title:** おとながくしゅう (Adult Learning)  
**Status:** Coming soon (もうすぐ！)  
**Planned Features:**
- Advanced vocabulary
- Business Japanese
- Kanji practice
- Conversation practice

---

### **About Screen** (`about_screen.dart`)
**Icon:** ℹ️  
**Title:** About  
**Subtitle:** App info & copyright  
**Content:**
- App information
- Copyright notices
- Version details
- Credits

---

## 🛠️ **SUPPORTING FILES**

### **Models:**

**`models/picture_card.dart` (3,199 bytes)**
- Data model for picture cards used in games
- Contains card properties (image, text, hiragana, etc.)
- Used by memory game and matching games

---

### **Services:**

**`services/audio_service.dart` (1,048 bytes)**
- Audio playback service
- Handles sound effects
- Text-to-speech for Japanese pronunciation
- Background music management

---

## 📊 **APP STATISTICS**

### **Kids Mode Games:**
- **Total:** 6 games
- **Playable:** 5 games (83%)
- **Coming Soon:** 1 game (17%)

### **Retro Games:**
- **Total:** 37 documented classic games
- **Atari Games:** 11 games
- **Japanese Classics:** 26 games
- **Status:** All informational (Coming soon for playable versions)

### **Total Screens:**
- **Main Navigation:** 5 screens
- **Kids Games:** 5 playable screens
- **Other:** Grammar, Adult Learning, About (3 screens)
- **Total:** 13+ screens

---

## 🎨 **DESIGN SYSTEM**

### **Color Palette:**

**Primary Colors:**
- Purple: `Colors.purple` (Main brand)
- Pink: `Colors.pink` (Kids mode)
- Deep Orange: `Colors.deepOrange` (Retro games)

**Screen-Specific Gradients:**
- **Home:** Purple → Pink
- **Kids Mode:** Light pink → Pink → Darker pink
- **Retro Games:** Light orange → Orange → Deep orange

**Game Card Colors:**
1. Hiragana Match: Blue
2. Memory Game: Purple
3. Character Trace: Orange
4. Puzzle Slide: Cyan
5. Fast Tap: Indigo
6. Katakana Match: Green

---

### **UI Components:**

**Scrollbars:**
- Always visible (forced)
- Thickness: 16px
- Color: Purple (#9C27B0)
- Track color: Light purple (#F3E5F5)

**Buttons:**
- Rounded corners (BorderRadius: 20)
- Shadow effects
- Hover states
- Icon + Text layout

**Cards:**
- White background
- Colored borders (3px)
- Shadow effects
- Icon + Title + Subtitle layout

---

## 🔧 **TECHNICAL DETAILS**

### **Framework:**
- **Flutter SDK:** Latest stable
- **Language:** Dart
- **Build Target:** Web (also supports iOS/Android)

### **Key Packages:**
```yaml
dependencies:
  flutter:
    sdk: flutter
  google_fonts: # Custom fonts
  url_launcher: # External links
  # Other dependencies as needed
```

### **Build Commands:**
```bash
# Development
flutter run -d chrome

# Build for web
flutter build web

# Deploy to Firebase
firebase deploy --only hosting
```

### **Firebase Hosting:**
- **Project ID:** nihonselfpacepractic-flutter
- **URL:** https://nihonselfpacepractic-flutter.web.app/
- **Caching:** Disabled (no-cache headers)
- **Version:** 2.0.0

---

## 📱 **RESPONSIVE DESIGN**

### **Supported Platforms:**
- ✅ Web browsers (Chrome, Firefox, Safari, Edge)
- ✅ iOS (iPhone, iPad)
- ✅ Android (phones, tablets)

### **Screen Adaptations:**
- Scrollable content for all screens
- Touch-friendly buttons (minimum 44px tap targets)
- Responsive gradients
- Adaptive font sizes

---

## 🔄 **APP FEATURES**

### **Navigation:**
- Back button (AppBar)
- Home button (Return to main menu)
- Refresh button (Reload current screen)
- External web app launcher

### **User Feedback:**
- SnackBar notifications
- Success/error messages
- "Coming soon" alerts
- Version indicators

### **Performance:**
- Smooth scrolling
- Optimized gradients
- Efficient widget rebuilds
- Minimal loading times

---

## 📖 **LEARNING CONTENT**

### **Hiragana Coverage:**
- All 46 basic hiragana characters
- Audio pronunciation
- Stroke order guidance
- Real-world associations

### **Japanese Vocabulary:**
- Game titles (37 retro games in Japanese)
- Numbers (puzzle game)
- Common words (memory game)
- Cultural references

### **Gaming History Education:**
- Timeline: 1972-2009
- American vs. Japanese game industry
- Genre evolution
- Cultural impact of games

---

## 🚀 **FUTURE DEVELOPMENT**

### **Planned Features:**
1. ✅ Katakana Match game
2. ✅ Grammar lessons (N5-N1)
3. ✅ Adult learning section
4. ✅ Playable retro games (selected titles)
5. ✅ Progress tracking & achievements
6. ✅ User accounts & cloud saves
7. ✅ Multiplayer modes
8. ✅ More language games (vocabulary, kanji)

---

## 📄 **DOCUMENTATION FILES**

### **Available Guides:**
- `CACHE_BUSTING_GUIDE.md` (12,658 bytes) - Cache management
- `CROSS_APP_NAVIGATION.md` (8,989 bytes) - App linking
- `FIREBASE_TESTING_GUIDE.md` (11,061 bytes) - Testing guide
- `GAME_TITLE_FORMAT.md` (10,805 bytes) - Title formatting
- `NEW_GAME_LEVELS.md` (11,681 bytes) - Level design
- `RETRO_GAMES_GUIDE.md` (14,137 bytes) - Retro games info
- `SCROLLBAR_FIX_FINAL.md` (9,754 bytes) - Scrollbar implementation
- `SCROLLBAR_UPDATE.md` (5,826 bytes) - Scrollbar updates

---

## 🎯 **TARGET AUDIENCE**

### **Primary:**
- Kids aged 4-8 (Japanese language learners)
- Parents seeking educational games
- Japanese language students (all ages)

### **Secondary:**
- Gaming history enthusiasts
- Retro gaming fans
- Japanese culture learners

---

## 📞 **SUPPORT & CONTACT**

### **Web App:**
- Main app: https://nihonselfpacepractic.web.app/
- Flutter app: https://nihonselfpacepractic-flutter.web.app/

### **Version:**
- Current: v2.0.0
- Last updated: 2024

---

## 📝 **COMPLETE FILE LISTING**

### **Core Files:**
```
lib/
├── main.dart                           # Entry point (31 lines)
├── models/
│   └── picture_card.dart               # Card model (3,199 bytes)
├── screens/
│   ├── home_screen.dart                # Main menu (352 lines)
│   ├── kids_mode_screen.dart           # Kids game menu (341 lines)
│   ├── hiragana_match_screen.dart      # Game 1 (11,841 bytes)
│   ├── memory_card_game_screen.dart    # Game 2 (12,902 bytes)
│   ├── character_trace_screen.dart     # Game 3 (13,473 bytes)
│   ├── puzzle_slide_screen.dart        # Game 4 (12,732 bytes)
│   ├── character_tap_game_screen.dart  # Game 5 (17,920 bytes)
│   ├── retro_games_screen.dart         # Retro games (752 lines)
│   ├── grammar_screen.dart             # Grammar (17,095 bytes)
│   ├── adult_learning_screen.dart      # Adult learning (18,241 bytes)
│   └── about_screen.dart               # About page (9,547 bytes)
└── services/
    └── audio_service.dart              # Audio service (1,048 bytes)
```

---

## 🎊 **SUMMARY**

**NihongoQuest Flutter App** is a comprehensive Japanese learning platform with:

✅ **5 playable kids games** focusing on hiragana, memory, tracing, puzzles, and reaction  
✅ **37 documented retro games** for gaming history education  
✅ **13+ screens** with smooth navigation and responsive design  
✅ **Educational content** with audio support and visual feedback  
✅ **Cross-platform** support (Web, iOS, Android)  
✅ **Modern UI** with gradients, shadows, and smooth animations  
✅ **Version 2.0.0** with active development  

**Perfect for:** Kids learning Japanese, gaming enthusiasts, and Japanese language students of all levels!

---

**Live now at:** https://nihonselfpacepractic-flutter.web.app/ 🎉
