# 🚀 NihonQuest Enhancement Roadmap
## Comprehensive Beginner-to-Fluent Learning Platform

**Live Site:** https://nihonselfpacepractic.web.app/  
**Target:** Align with 57-lecture Udemy course structure  
**Goal:** Full bilingual (Japanese/English) learning experience from N5 to N3+

---

## 📋 Current State Analysis

### ✅ What's Working:
- Home page with daily word feature
- AI Sensei tutor integration
- Kids Mode games
- Basic flashcards and quiz system
- Dictionary with JMDict integration
- Grammar learning pages
- Study journal
- Firebase authentication & Firestore
- Responsive design

### 🚧 What Needs Enhancement:
- **Lesson structure** doesn't match 12-section course curriculum
- **Word of the Day** not integrated with practice/journal
- **SOV sentence building** needs dedicated game/practice
- **Bilingual content** inconsistent across features
- **Progress tracking** not aligned with JLPT levels
- **Video lessons** placeholder only
- **Kanji learning** needs N5→N4→N3 progression
- **Grammar** needs N5-N1 structured lessons
- **Keigo/Formal Japanese** section missing
- **JLPT mock exams** not implemented

---

## 🎯 Enhancement Plan: 12 Sections

### **Section 1: Introduction** ✅ (Mostly Complete)
**Current:** Home page, welcome flow  
**Enhancements Needed:**
- [ ] Add bilingual course overview page
- [ ] Interactive study tips with Japanese/English toggle
- [ ] Course roadmap visualization (N5→N4→N3→N2→N1)
- [ ] Set learning goals (travel, anime, business, JLPT)

**Files to Update:**
- `frontend/src/pages/HomePage.tsx`
- Create: `frontend/src/pages/CourseOverviewPage.tsx`

---

### **Section 2: Hiragana - Foundation** 🚧 (Needs Structure)
**Current:** Basic hiragana in kids mode  
**Enhancements Needed:**
- [ ] Structured 5-lecture hiragana course
  - Lecture 4: K, S, T, N rows with mnemonics
  - Lecture 5: Vowels (a, i, u, e, o)
  - Lecture 6: H, M, Y, R, W rows
  - Lecture 7: Dakuten & combinations
  - Lecture 8: Mastery quiz
- [ ] Stroke order animations
- [ ] Audio pronunciation for each character
- [ ] Mnemonic visual aids
- [ ] Progress tracking per row
- [ ] Bilingual explanations

**Files to Create:**
- `frontend/src/pages/HiraganaCoursePage.tsx`
- `frontend/src/components/hiragana/HiraganaRow.tsx`
- `frontend/src/components/hiragana/StrokeOrderAnimation.tsx`
- `frontend/src/components/hiragana/HiraganaMasteryQuiz.tsx`

---

### **Section 3: Katakana - Loanwords** 🚧 (Needs Structure)
**Current:** Basic katakana in kids mode  
**Enhancements Needed:**
- [ ] Structured 5-lecture katakana course
  - Lecture 9: Intro & differences from hiragana
  - Lecture 10: All rows with mnemonics
  - Lecture 11: Special characters (long vowels, ー, ッ)
  - Lecture 12: Real loanwords (food, tech, fashion)
  - Lecture 13: Mastery quiz
- [ ] Loanword database with categories
- [ ] Real-world examples (menus, signs, media)
- [ ] Combination characters (ファ, ティ, ウィ)

**Files to Create:**
- `frontend/src/pages/KatakanaCoursePage.tsx`
- `frontend/src/components/katakana/LoanwordPractice.tsx`
- `frontend/src/data/loanwords.ts`

---

### **Section 4: Basic Grammar & Sentence Structure** 🚧 (Partial)
**Current:** Grammar pages exist but not structured  
**Enhancements Needed:**
- [ ] **SOV Game Enhancement** (Critical!)
  - Interactive sentence building
  - Drag-and-drop word order
  - Real-time feedback
  - Progressive difficulty
  - Bilingual hints
- [ ] Particle practice (は, が, を, に, で, と, へ, の, も)
- [ ] Verb groups (U-verbs, Ru-verbs, Irregular)
- [ ] Adjective types (I-adj vs Na-adj)
- [ ] Grammar pattern library
- [ ] Practice quiz with explanations

**Files to Update:**
- `frontend/src/pages/SentenceGamePage.tsx` ← **Priority!**
- `frontend/src/pages/GrammarLearningPage.tsx`
- Create: `frontend/src/components/grammar/ParticlePractice.tsx`
- Create: `frontend/src/components/grammar/VerbConjugator.tsx`

---

### **Section 5: Numbers, Time & Dates** 🚧 (Missing)
**Current:** Not implemented  
**Enhancements Needed:**
- [ ] Numbers 1-10,000 with kanji
- [ ] Counter system (people, objects, animals)
- [ ] Time telling (hours, minutes, schedule)
- [ ] Calendar system (days, weeks, months)
- [ ] Practice exercises (shopping, scheduling, age)
- [ ] Audio pronunciation
- [ ] Bilingual examples

**Files to Create:**
- `frontend/src/pages/NumbersTimePage.tsx`
- `frontend/src/components/numbers/CounterPractice.tsx`
- `frontend/src/components/numbers/TimeGame.tsx`
- `frontend/src/data/counters.ts`

---

### **Section 6: Essential Vocabulary** ✅ (Partial)
**Current:** Word of the Day, dictionary, flashcards  
**Enhancements Needed:**
- [ ] **Word of the Day Integration** (Critical!)
  - Auto-save to journal
  - Practice in SOV game
  - Add to flashcard deck
  - Track usage in conversations
  - Show in context sentences
- [ ] Categorized vocabulary lists:
  - Greetings & introductions
  - Food & drink (restaurant ordering)
  - Shopping & directions
  - Family & relationships
  - Transportation, weather, hobbies
- [ ] Spaced repetition system (SRS)
- [ ] Audio for all vocabulary
- [ ] Example sentences for each word

**Files to Update:**
- `frontend/src/pages/HomePage.tsx` ← Word of Day integration
- `frontend/src/pages/StudyJournalPage.tsx` ← Auto-journal feature
- Create: `frontend/src/components/vocabulary/VocabularyCategory.tsx`
- Create: `frontend/src/hooks/useWordOfDay.ts`

---

### **Section 7: Kanji Foundations (JLPT N5)** 🚧 (Needs Structure)
**Current:** Kanji page exists but needs N5 focus  
**Enhancements Needed:**
- [ ] 80 JLPT N5 kanji structured course
  - Set 1: Basic nouns (person, mountain, river, day)
  - Set 2: Time, direction, numbers
  - Set 3: Actions & descriptive kanji
- [ ] Radical breakdown system
- [ ] On/Kun readings with examples
- [ ] Stroke order animations
- [ ] Compound word formation
- [ ] N5 Mastery Quiz
- [ ] Progress tracking (0/80 learned)

**Files to Update:**
- `frontend/src/pages/KanjiPage.tsx`
- Create: `frontend/src/components/kanji/KanjiCard.tsx`
- Create: `frontend/src/components/kanji/RadicalBreakdown.tsx`
- Create: `frontend/src/data/n5-kanji.ts`

---

### **Section 8: Intermediate Grammar** 🚧 (Missing)
**Current:** Basic grammar only  
**Enhancements Needed:**
- [ ] Verb tenses (present, past, progressive, potential)
- [ ] Negative forms
- [ ] Conditional forms (-tara, -ba, -to)
- [ ] Giving & receiving (ageru, morau, kureru)
- [ ] Te-form conjugation practice
- [ ] Grammar pattern drills
- [ ] Bilingual explanations

**Files to Create:**
- `frontend/src/pages/IntermediateGrammarPage.tsx`
- `frontend/src/components/grammar/VerbTensePractice.tsx`
- `frontend/src/components/grammar/ConditionalBuilder.tsx`

---

### **Section 9: Everyday Conversations** 🚧 (Partial)
**Current:** AI Tutor for conversations  
**Enhancements Needed:**
- [ ] Scenario-based dialogues:
  - Airport & train station
  - School, work, office
  - Phone calls & texts
  - Health & emergencies
  - Shopping & restaurants
- [ ] Roleplay practice with AI Sensei
- [ ] Audio dialogues with transcripts
- [ ] Fill-in-the-blank exercises
- [ ] Conversation builder tool

**Files to Update:**
- `frontend/src/pages/AITutorPage.tsx`
- Create: `frontend/src/components/conversation/ScenarioDialog.tsx`
- Create: `frontend/src/components/conversation/RoleplayGame.tsx`
- Create: `frontend/src/data/conversations.ts`

---

### **Section 10: Advanced Grammar & Keigo** 🚧 (Missing)
**Current:** Not implemented  
**Enhancements Needed:**
- [ ] Keigo introduction (Teineigo, Sonkeigo, Kenjougo)
- [ ] Causative, passive, causative-passive forms
- [ ] Advanced particles & conjunctions
- [ ] Business Japanese
- [ ] Formal email writing
- [ ] Honorific language practice

**Files to Create:**
- `frontend/src/pages/KeigoPage.tsx`
- `frontend/src/components/keigo/FormalityLevelPractice.tsx`
- `frontend/src/components/keigo/BusinessEmailBuilder.tsx`

---

### **Section 11: Advanced Kanji & Reading (N4-N3)** 🚧 (Missing)
**Current:** Only basic kanji  
**Enhancements Needed:**
- [ ] JLPT N4: 150 key characters
- [ ] JLPT N3: 250+ characters
- [ ] Kanji compounds & vocabulary building
- [ ] Reading authentic texts (news, social media)
- [ ] Manga & anime script reading
- [ ] Reading comprehension passages
- [ ] JLPT reading practice

**Files to Create:**
- `frontend/src/pages/AdvancedKanjiPage.tsx`
- `frontend/src/components/kanji/KanjiCompounds.tsx`
- `frontend/src/components/reading/PassageReader.tsx`
- `frontend/src/data/n4-kanji.ts`
- `frontend/src/data/n3-kanji.ts`

---

### **Section 12: Course Wrap-Up & JLPT Prep** 🚧 (Missing)
**Current:** No final review system  
**Enhancements Needed:**
- [ ] Full course review dashboard
- [ ] JLPT N5 mock exam
  - Vocabulary section
  - Reading comprehension
  - Listening practice (audio files)
  - Grammar section
- [ ] Progress certificate
- [ ] Recommended resources page
- [ ] Immersion strategies guide
- [ ] Congratulations message

**Files to Create:**
- `frontend/src/pages/CourseReviewPage.tsx`
- `frontend/src/pages/JLPTMockExamPage.tsx`
- `frontend/src/components/exam/MockExamSection.tsx`
- `frontend/src/components/exam/ProgressCertificate.tsx`

---

## 🔥 Critical Priority Features

### 1. **Word of the Day Integration** (Highest Priority)
**Current Issue:** Word of Day is displayed but not integrated with practice

**Implementation:**
```typescript
// frontend/src/hooks/useWordOfDay.ts
export function useWordOfDay() {
  const [word, setWord] = useState<DailyWord | null>(null)
  
  // Auto-save to journal
  const saveToJournal = async () => {
    await addToJournal({
      word: word.kanji,
      reading: word.reading,
      meaning: word.meaning,
      date: new Date(),
      practiced: false
    })
  }
  
  // Add to flashcard deck
  const addToFlashcards = async () => {
    await createFlashcard({
      front: word.kanji,
      back: word.meaning,
      reading: word.reading,
      level: word.level
    })
  }
  
  // Use in SOV game
  const practiceInSOV = () => {
    // Generate sentences using this word
    router.push(`/sentence-game?word=${word.kanji}`)
  }
  
  return { word, saveToJournal, addToFlashcards, practiceInSOV }
}
```

**Files to Update:**
- `frontend/src/pages/HomePage.tsx`
- `frontend/src/pages/StudyJournalPage.tsx`
- `frontend/src/pages/SentenceGamePage.tsx`

---

### 2. **SOV Sentence Building Game** (Highest Priority)
**Current Issue:** Sentence game exists but needs enhancement

**Features Needed:**
- Drag-and-drop word tiles
- Subject-Object-Verb order visualization
- Particle placement practice
- Real-time grammar checking
- Progressive difficulty (N5 → N3)
- Use Word of the Day in sentences
- Bilingual hints and explanations
- Score tracking and achievements

**Implementation:**
```typescript
// frontend/src/components/grammar/SOVBuilder.tsx
export function SOVBuilder({ word, level }: Props) {
  const [tiles, setTiles] = useState<WordTile[]>([])
  const [sentence, setSentence] = useState<WordTile[]>([])
  
  // Validate SOV structure
  const validateSentence = () => {
    const hasSubject = sentence.some(t => t.type === 'subject')
    const hasObject = sentence.some(t => t.type === 'object')
    const hasVerb = sentence.some(t => t.type === 'verb')
    const correctOrder = checkSOVOrder(sentence)
    const correctParticles = checkParticles(sentence)
    
    return { hasSubject, hasObject, hasVerb, correctOrder, correctParticles }
  }
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <WordTileBank tiles={tiles} />
      <SentenceDropZone sentence={sentence} />
      <ValidationFeedback validation={validateSentence()} />
      <BilingualHint sentence={sentence} />
    </DndContext>
  )
}
```

---

### 3. **Bilingual Content System** (High Priority)
**Current Issue:** Inconsistent Japanese/English across app

**Implementation:**
```typescript
// frontend/src/contexts/LanguageContext.tsx
export const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState<'ja' | 'en' | 'both'>('both')
  const [showFurigana, setShowFurigana] = useState(true)
  
  const t = (key: string) => {
    const translations = {
      'word_of_day': {
        ja: '今日の言葉',
        en: 'Word of the Day'
      },
      'practice': {
        ja: '練習',
        en: 'Practice'
      },
      // ... all UI strings
    }
    
    if (language === 'both') {
      return `${translations[key].ja}\n${translations[key].en}`
    }
    return translations[key][language]
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, showFurigana }}>
      {children}
    </LanguageContext.Provider>
  )
}
```

**Files to Create:**
- `frontend/src/contexts/LanguageContext.tsx`
- `frontend/src/data/translations.ts`
- `frontend/src/hooks/useTranslation.ts`

---

### 4. **Progress Tracking System** (High Priority)
**Current Issue:** No comprehensive progress tracking

**Features Needed:**
- JLPT level progress (N5 → N4 → N3 → N2 → N1)
- Section completion tracking (12 sections)
- Lecture completion (57 lectures)
- Kanji learned counter (0/80 N5, 0/150 N4, etc.)
- Grammar patterns mastered
- Vocabulary size
- Study streak
- Time spent per section
- Quiz scores history
- Certificate generation

**Implementation:**
```typescript
// frontend/src/types/progress.ts
export interface UserProgress {
  userId: string
  currentLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
  sectionsCompleted: number[] // [1, 2, 3, ...]
  lecturesCompleted: number[] // [1, 2, 3, ..., 57]
  kanjiLearned: {
    n5: number // 0-80
    n4: number // 0-150
    n3: number // 0-250
  }
  vocabularySize: number
  grammarPatterns: string[]
  studyStreak: number
  totalStudyTime: number // minutes
  quizScores: QuizScore[]
  achievements: Achievement[]
  lastStudied: Date
}
```

**Files to Create:**
- `frontend/src/contexts/ProgressContext.tsx`
- `frontend/src/components/progress/ProgressDashboard.tsx`
- `frontend/src/components/progress/JLPTLevelBadge.tsx`
- `frontend/src/hooks/useProgress.ts`

---

## 📦 Data Structure Enhancements

### Lesson/Lecture Structure
```typescript
// frontend/src/data/curriculum.ts
export interface Section {
  id: number
  title: { ja: string; en: string }
  description: { ja: string; en: string }
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
  lectures: Lecture[]
  quiz?: Quiz
}

export interface Lecture {
  id: number
  sectionId: number
  title: { ja: string; en: string }
  duration: number // minutes
  content: LectureContent
  practiceExercises: Exercise[]
  videoUrl?: string
  completed: boolean
}

export const curriculum: Section[] = [
  {
    id: 1,
    title: { ja: 'はじめに', en: 'Introduction' },
    level: 'N5',
    lectures: [
      {
        id: 1,
        title: { ja: 'コースへようこそ', en: 'Welcome to the Course' },
        duration: 5,
        content: { /* ... */ }
      },
      // ... more lectures
    ]
  },
  // ... 12 sections total
]
```

---

## 🎨 UI/UX Enhancements

### Bilingual Display Patterns
```typescript
// Option 1: Stacked (Default)
<div className="bilingual-text">
  <div className="text-japanese">今日の言葉</div>
  <div className="text-english">Word of the Day</div>
</div>

// Option 2: Side-by-side
<div className="flex gap-2">
  <span className="text-japanese">今日の言葉</span>
  <span className="text-muted">/</span>
  <span className="text-english">Word of the Day</span>
</div>

// Option 3: Japanese only (advanced learners)
<div className="text-japanese">今日の言葉</div>

// Option 4: English only (absolute beginners)
<div className="text-english">Word of the Day</div>
```

### Progress Visualization
- Circular progress rings for each JLPT level
- Section completion checkmarks
- Lecture progress bars
- Kanji learned counter with visual grid
- Study streak calendar
- XP/Level gamification

---

## 🔧 Technical Implementation Plan

### Phase 1: Foundation (Week 1-2)
- [ ] Set up bilingual context system
- [ ] Create progress tracking system
- [ ] Implement Word of Day integration
- [ ] Enhance SOV game

### Phase 2: Content Structure (Week 3-4)
- [ ] Build hiragana course (5 lectures)
- [ ] Build katakana course (5 lectures)
- [ ] Structure basic grammar section
- [ ] Add numbers & time section

### Phase 3: Vocabulary & Kanji (Week 5-6)
- [ ] Categorize vocabulary lists
- [ ] Implement N5 kanji course (80 kanji)
- [ ] Add flashcard SRS system
- [ ] Build kanji stroke order animations

### Phase 4: Intermediate Content (Week 7-8)
- [ ] Intermediate grammar lessons
- [ ] Conversation scenarios
- [ ] N4 kanji (150 characters)
- [ ] Reading comprehension

### Phase 5: Advanced Content (Week 9-10)
- [ ] Keigo & formal Japanese
- [ ] N3 kanji (250 characters)
- [ ] Business Japanese
- [ ] Advanced reading

### Phase 6: Assessment & Polish (Week 11-12)
- [ ] JLPT N5 mock exam
- [ ] Course review dashboard
- [ ] Certificate generation
- [ ] Final testing & bug fixes

---

## 📱 Mobile Responsiveness

All features must work on:
- Desktop (1920x1080+)
- Tablet (768x1024)
- Mobile (375x667)

**Key considerations:**
- Touch-friendly drag-and-drop for SOV game
- Readable Japanese text on small screens
- Collapsible sections for mobile
- Bottom navigation for mobile
- Swipe gestures for flashcards

---

## 🌐 Deployment Checklist

### Before Deploying:
- [ ] All 12 sections implemented
- [ ] All 57 lectures accessible
- [ ] Bilingual content complete
- [ ] Progress tracking functional
- [ ] Word of Day integrated
- [ ] SOV game enhanced
- [ ] JLPT mock exam ready
- [ ] Mobile responsive
- [ ] Performance optimized
- [ ] Firebase rules updated
- [ ] Analytics tracking added

### Deploy Commands:
```bash
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend
npm run build
firebase deploy --only hosting
```

---

## 📊 Success Metrics

### User Engagement:
- Daily active users
- Average session duration
- Lessons completed per user
- Quiz completion rate
- Study streak retention

### Learning Outcomes:
- Kanji learned per user
- Vocabulary size growth
- Grammar patterns mastered
- JLPT mock exam scores
- Course completion rate

### Technical:
- Page load time < 2s
- Mobile responsiveness score > 95
- Accessibility score > 90
- SEO score > 90

---

## 🎯 Learning Objectives Alignment

Your course promises students will:

1. ✅ **Read and pronounce hiragana, katakana, and beginner words**
   - Sections 2 & 3 cover this
   - Stroke order, audio, mnemonics

2. ✅ **Introduce yourself in Japanese**
   - Section 6: Greetings & introductions
   - Section 9: Conversation practice

3. ✅ **Use basic grammar and particles**
   - Section 4: Basic grammar
   - Section 8: Intermediate grammar
   - SOV game for practice

4. ✅ **Translate simple sentences**
   - SOV sentence builder
   - Grammar game
   - AI Sensei practice

5. ✅ **Build conversational skills**
   - Section 9: Everyday conversations
   - Roleplay scenarios
   - AI tutor dialogues

---

## 📝 Next Steps

1. **Review this roadmap** and prioritize features
2. **Start with Phase 1** (Foundation)
3. **Implement Word of Day integration** first
4. **Enhance SOV game** second
5. **Build out section structure** progressively
6. **Test each section** before moving to next
7. **Deploy incrementally** to get user feedback

---

**This roadmap transforms your app into a comprehensive beginner-to-fluent Japanese learning platform that matches your 57-lecture Udemy course!** 🚀🎌
