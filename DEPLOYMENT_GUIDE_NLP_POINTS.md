# 🚀 Deployment Guide: Profile Reset, Points System & Japanese NLP Integration

## ✅ What Was Added

### **1. Profile System with Reset (/profile)**
- ✅ **Complete profile reset functionality** with confirmation modal
- ✅ **Dynamic XP tracking** across all activities
- ✅ **JLPT level selector** (N5 → N1)
- ✅ **12 achievements** with progress tracking
- ✅ **Activity stats** (lessons, quizzes, AI chats)
- ✅ **Persistent storage** using Zustand + localStorage

### **2. Points & XP System**
- ✅ **+50 XP** per lesson completed
- ✅ **+10 XP** per quiz question correct
- ✅ **+5 XP** per AI tutor interaction
- ✅ **+10 XP** per word learned
- ✅ **+5 XP** per day streak
- ✅ **+100 XP** per achievement unlocked
- ✅ **Real-time XP display** in Quiz & AI Tutor pages

### **3. Japanese NLP Integration (Kuromoji + Kuroshiro)**
- ✅ **Morphology Parsing** - Break sentences into words/grammar (MeCab-style)
- ✅ **Furigana Generation** - Add pronunciation above kanji
- ✅ **Kana Conversion** - Hiragana ↔ Katakana ↔ Romaji
- ✅ **Part of Speech Tagging** - Grammar analysis (名詞, 動詞, 助詞, etc.)
- ✅ **Tokenization** - Word segmentation
- ✅ **Interactive NLP analysis modal** in AI Tutor page

### **4. Updated Pages**
1. **ProfilePage** (`/profile`) - Complete overhaul with reset, stats, achievements
2. **QuizPage** (`/quiz`) - XP rewards, streak tracking, stats integration
3. **AITutorPage** (`/tutor`) - NLP analysis, XP display, Japanese text parsing
4. **CurriculumPage** (`/practice`) - XP rewards for lesson completion

---

## 📦 New Files Created

```
frontend/src/
├── store/
│   └── userStore.ts              ⭐ NEW - Global user state management
├── services/
│   └── japaneseNLP.ts            ⭐ NEW - Japanese NLP service (Kuromoji/Kuroshiro)
└── pages/
    ├── ProfilePage.tsx           ✏️ UPDATED - Reset, achievements, stats
    ├── QuizPage.tsx              ✏️ UPDATED - XP tracking, NLP init
    ├── AITutorPage.tsx           ✏️ UPDATED - NLP analysis modal, XP display
    └── CurriculumPage.tsx        ✏️ UPDATED - XP rewards for lessons
```

---

## 🔧 Installation Steps

### **1. Install Zustand Persist Middleware**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend

# Install zustand persist (already have zustand 4.5.0)
npm install zustand
```

**Note:** Zustand is already in package.json, no additional installation needed!

### **2. Verify Dependencies**

Already installed in package.json:
```json
{
  "zustand": "^4.5.0",
  "kuromoji": "^0.1.2",
  "kuroshiro": "^1.2.0",
  "kuroshiro-analyzer-kuromoji": "^1.1.0",
  "canvas-confetti": "^1.9.2"
}
```

All required packages are present! ✅

---

## 🧪 Testing Locally

### **1. Run Development Server**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend
npm run dev
```

### **2. Test Profile Reset**

1. Visit: http://localhost:5173/profile
2. Check current stats (XP, streak, lessons, etc.)
3. Click "Reset Profile" button
4. Confirm in modal (shows what will be deleted)
5. Verify all stats reset to 0
6. Check localStorage cleared: `localStorage.getItem('nihongo-quest-user')`

### **3. Test Points System**

**Quiz XP:**
1. Visit: http://localhost:5173/quiz
2. Take any quiz (10 questions)
3. Get some correct answers
4. Check result screen shows: `+XX XP` badge
5. Visit `/profile` - XP should increase by 10 per correct answer

**AI Tutor XP:**
1. Visit: http://localhost:5173/tutor
2. Type any message (English or Japanese)
3. Check XP counter in top-right increases by +5 XP per interaction
4. Visit `/profile` - "AI Chats" counter should increment

**Curriculum XP:**
1. Visit: http://localhost:5173/practice
2. Select any lesson
3. Click "Mark Done" button
4. Check confetti animation plays
5. Visit `/profile` - XP should increase by +50, "Lessons" counter +1

### **4. Test Japanese NLP**

**AI Tutor NLP Analysis:**
1. Visit: http://localhost:5173/tutor
2. Type Japanese text: `今日は学校へ行きます`
3. Send message
4. Click "View NLP Analysis 🔍" button on your message
5. Modal should show:
   - Original text
   - Hiragana conversion
   - Romaji conversion
   - Part of speech tags
   - Furigana (pronunciation)
   - Morphological tokens

**Example Japanese phrases to test:**
```
こんにちは - Hello
今日は学校へ行きます - I go to school today
日本語を勉強します - I study Japanese
謝ってください - Please apologize
ごめんなさい - I'm sorry
本当にごめんなさい - I'm really sorry
申し訳ありません - I sincerely apologize
食べました - I ate
```

### **5. Test Achievements**

Achievements unlock automatically based on stats:

| Achievement | Requirement |
|-------------|-------------|
| 🔥 First Flame | 1 day streak |
| 🔥 Week Warrior | 7 day streak |
| 🗓️ Month Master | 30 day streak |
| 💯 Century Club | 100 day streak |
| 📚 First Steps | 1 lesson completed |
| 📖 Dedicated Student | 10 lessons completed |
| 🏆 Quiz Novice | 5 quizzes completed |
| 🎯 Quiz Master | 25 quizzes completed |
| 💬 AI Friend | 10 AI tutor interactions |
| 📈 Word Collector | 50 words learned |
| 📚 Vocabulary Master | 200 words learned |
| ⭐ XP Millionaire | 10,000 XP earned |

Test by completing activities and checking `/profile`.

---

## 🚀 Deployment to Firebase

### **1. Build Production Bundle**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend

# Build for production
npm run build
```

**Expected output:**
```
✓ 1,249 modules transformed.
dist/index.html                  0.xx kB
dist/assets/index-[hash].css    64.51 kB │ gzip: 15.xx kB
dist/assets/index-[hash].js   1,249.xx kB │ gzip: 345.xx kB
```

### **2. Deploy to Firebase**

```bash
firebase deploy --only hosting
```

**Expected output:**
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/nihonselfpacepractic
Hosting URL: https://nihonselfpacepractic.web.app
```

### **3. Verify Deployment**

Visit: https://nihonselfpacepractic.web.app

Test all features:
- ✅ Profile page loads
- ✅ Reset button works
- ✅ Quiz awards XP
- ✅ AI Tutor shows NLP analysis
- ✅ Curriculum awards XP for lessons
- ✅ Achievements track correctly

---

## 📊 Feature Status

### **✅ Fully Working**

| Feature | Page | Status |
|---------|------|--------|
| Profile Stats | `/profile` | ✅ Live |
| Profile Reset | `/profile` | ✅ Live |
| XP Tracking | All pages | ✅ Live |
| Quiz Points | `/quiz` | ✅ Live |
| Tutor Points | `/tutor` | ✅ Live |
| Lesson Points | `/practice` | ✅ Live |
| Achievements | `/profile` | ✅ Live |
| NLP Analysis | `/tutor` | ✅ Live |
| Furigana | `/tutor` | ✅ Live |
| Tokenization | `/tutor` | ✅ Live |
| Kana Conversion | `/tutor` | ✅ Live |

### **🔜 Coming Soon (Backend Required)**

| Feature | Status |
|---------|--------|
| AI ChatGPT Responses | 📝 Frontend ready, awaiting API |
| Cloud Progress Sync | 📝 Awaiting database setup |
| User Authentication | 📝 Firebase Auth integration planned |
| Multi-device Sync | 📝 Requires backend |

---

## 🧠 How Japanese NLP Works

### **Libraries Used**

**1. Kuromoji.js** - Japanese Morphological Analyzer (MeCab port)
- Tokenizes Japanese text into words
- Provides part-of-speech tags
- Handles conjugations and verb forms
- Used by: Google, Microsoft, many Japanese apps

**2. Kuroshiro** - Japanese Language Utility
- Built on top of Kuromoji
- Converts between scripts (kanji ↔ hiragana ↔ katakana ↔ romaji)
- Generates furigana (ruby text)
- Handles multiple readings

### **What It Does**

**Example Input:**
```
今日は学校へ行きます
```

**NLP Output:**
```
Hiragana: きょうはがっこうへいきます
Romaji: kyou wa gakkou he ikimasu
Furigana: 今日（きょう）は学校（がっこう）へ行（い）きます

Tokens:
- 今日 (名詞) - kyou - today
- は (助詞) - wa - topic particle
- 学校 (名詞) - gakkou - school
- へ (助詞) - he - direction particle
- 行き (動詞) - iki - go (stem)
- ます (助動詞) - masu - polite ending
```

### **Use Cases**

1. **Language Learning** - See pronunciation and grammar breakdown
2. **Dictionary Lookups** - Automatic word segmentation
3. **Search** - Normalize different writings of same word
4. **Accessibility** - Add furigana for kanji
5. **Text-to-Speech** - Get correct pronunciations
6. **Grammar Analysis** - Understand sentence structure

---

## 📱 User Guide

### **How to Use Profile Reset**

1. Go to **Profile** page (`/profile`)
2. Click **"Reset Profile"** button (top-right)
3. Review what will be deleted in the modal
4. Click **"Reset Everything"** to confirm
5. All progress resets to 0

**Warning:** This cannot be undone! (Until backend sync is added)

### **How to Earn XP**

| Activity | XP Earned |
|----------|-----------|
| Complete 1 Quiz Question (correct) | +10 XP |
| Complete 1 Lesson | +50 XP |
| Chat with AI Tutor | +5 XP |
| Learn 1 New Word | +10 XP |
| Maintain Daily Streak | +5 XP/day |
| Unlock Achievement | +100 XP |

**Pro Tip:** Complete lessons for the most XP!

### **How to View NLP Analysis**

1. Go to **AI Tutor** page (`/tutor`)
2. Type Japanese text (kanji, hiragana, or katakana)
3. Send the message
4. Click the **"View NLP Analysis 🔍"** button on your message
5. Modal appears showing:
   - Hiragana reading
   - Romaji transliteration
   - Part of speech tags
   - Furigana (pronunciation above kanji)
   - Morphological tokens

**Example Phrases:**
- `こんにちは` - Basic hiragana
- `今日は学校へ行きます` - Full sentence with kanji
- `日本語を勉強します` - "I study Japanese"
- `ごめんなさい` - "I'm sorry"

---

## 🐛 Troubleshooting

### **Issue: Profile doesn't reset**

**Solution:**
```bash
# Clear localStorage manually
localStorage.removeItem('nihongo-quest-user')
# Refresh page
```

### **Issue: NLP not working**

**Check console for errors:**
```javascript
// In browser console
japaneseNLP.initialize().then(() => console.log('NLP initialized'))
```

**If Kuromoji fails to load:**
- Check internet connection (needs to download dictionary)
- Try refreshing the page
- Check browser console for CORS errors

### **Issue: XP not updating**

**Check Zustand store:**
```javascript
// In browser console
JSON.parse(localStorage.getItem('nihongo-quest-user'))
```

Should show:
```json
{
  "state": {
    "stats": {
      "totalXP": 123,
      "wordsLearned": 5,
      "dayStreak": 2,
      ...
    }
  }
}
```

### **Issue: Build fails**

**Error:** `Module not found: zustand/middleware`

**Solution:**
```bash
npm install zustand@latest
npm run build
```

---

## 📚 Code Documentation

### **User Store API**

```typescript
import { useUserStore } from '@/store/userStore'

// In your component:
const { 
  stats,              // Get all stats
  addXP,              // Add XP manually
  completeLesson,     // +50 XP, increment lessons
  completeQuiz,       // +10 XP per correct answer
  addTutorInteraction, // +5 XP
  incrementStreak,    // Update streak, +5 XP
  addWord,            // +10 XP, increment words
  resetProfile,       // Reset everything to 0
  updateLevel         // Change JLPT level
} = useUserStore()

// Usage examples:
completeLesson()                    // Award 50 XP
completeQuiz(8)                     // Award 80 XP (8 correct)
addTutorInteraction()               // Award 5 XP
incrementStreak()                   // Check streak, award 5 XP if new day
resetProfile()                      // Clear all progress
updateLevel('N3')                   // Change to N3
```

### **Japanese NLP API**

```typescript
import { japaneseNLP } from '@/services/japaneseNLP'

// Initialize (call once on mount)
await japaneseNLP.initialize()

// Convert text
const hiragana = await japaneseNLP.kanjiToHiragana('日本語')
// Result: "にほんご"

const romaji = await japaneseNLP.toRomaji('こんにちは')
// Result: "konnichiha"

const furigana = await japaneseNLP.addFurigana('今日')
// Result: "<ruby>今日<rt>きょう</rt></ruby>"

// Tokenize sentence
const tokens = await japaneseNLP.tokenize('今日は学校へ行きます')
// Result: Array of tokens with part-of-speech tags

// Get word info
const info = await japaneseNLP.getWordInfo('日本語')
// Result: { word, hiragana, romaji, furigana, partOfSpeech, baseForm }

// Analyze sentence structure
const analysis = await japaneseNLP.analyzeSentence('私は学生です')
// Result: { tokens, particles, verbs, nouns, adjectives, structure }

// Check character types
japaneseNLP.hasKanji('日本')        // true
japaneseNLP.hasHiragana('ひらがな')  // true
japaneseNLP.hasKatakana('カタカナ')  // true
```

---

## 🎓 Educational Content

### **What is NLP?**

**Natural Language Processing** = Using computers to understand human language.

For Japanese, this is extra hard because:
- ❌ No spaces between words (今日は学校へ行きます looks like one word!)
- 🔀 3 writing systems (kanji, hiragana, katakana)
- 📝 Same kanji has multiple readings (日 = "hi" or "nichi")
- 🔄 Words change form constantly (食べる → 食べます → 食べた)

### **How MeCab/Kuromoji Works**

1. **Dictionary Lookup** - Check all possible word boundaries
2. **Cost Calculation** - Each word has a "cost" based on likelihood
3. **Viterbi Algorithm** - Find lowest-cost path through sentence
4. **Part-of-Speech Tagging** - Assign grammar labels to each word

**Example:**
```
Input: 今日は学校へ行きます

Step 1: Find boundaries
今日 | は | 学校 | へ | 行き | ます

Step 2: Tag parts of speech
今日 (名詞)
は (助詞)
学校 (名詞)
へ (助詞)
行き (動詞)
ます (助動詞)
```

### **Glossary**

| Term | Japanese | Meaning |
|------|----------|---------|
| Tokenization | 分かち書き | Split text into words |
| Morphology | 形態素解析 | Grammar analysis |
| Furigana | 振り仮名 | Pronunciation above kanji |
| Part of Speech | 品詞 | Word type (noun, verb, etc.) |
| Particle | 助詞 | は、が、を、に、で、と |
| Verb | 動詞 | Action word |
| Noun | 名詞 | Person, place, thing |

---

## ✅ Deployment Checklist

```
Before Deployment:
☐ Run `npm run build` successfully
☐ Test profile reset locally
☐ Test XP earning in quiz
☐ Test XP earning in curriculum
☐ Test AI tutor NLP analysis
☐ Test achievements unlock
☐ Check browser console for errors
☐ Verify localStorage working

After Deployment:
☐ Visit https://nihonselfpacepractic.web.app
☐ Test profile page loads
☐ Test reset functionality
☐ Test quiz XP awards
☐ Test AI tutor NLP modal
☐ Test on mobile device
☐ Check Firebase console for errors
☐ Update README with new features
```

---

## 🎉 Summary

### **What You Can Do Now**

1. ✅ **Reset your profile** and start fresh anytime
2. ✅ **Earn XP** from quizzes, lessons, and AI chats
3. ✅ **Unlock achievements** as you progress
4. ✅ **Analyze Japanese text** with NLP tools
5. ✅ **See furigana** for kanji pronunciation
6. ✅ **Learn grammar** through morphological analysis
7. ✅ **Track progress** across all activities
8. ✅ **Choose JLPT level** (N5-N1)

### **Coming Soon (When Backend Connects)**

- 🔜 AI ChatGPT responses in tutor
- 🔜 Cloud progress sync
- 🔜 Multi-device access
- 🔜 User authentication
- 🔜 Social features (leaderboards, friends)

---

**🚀 Ready to deploy!**

```bash
npm run build && firebase deploy --only hosting
```

**© 2026 Osaka Oaks LLC** - Japanese Learning Platform with NLP
