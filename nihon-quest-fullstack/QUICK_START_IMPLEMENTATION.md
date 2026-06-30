# 🚀 Quick Start: Priority Features Implementation

## Phase 1: Critical Features (Start Here!)

These are the **must-have** features to align with your course objectives and make the app immediately more useful.

---

## 1️⃣ Word of the Day Integration (2-3 hours)

### Current State:
- Word displays on home page
- Not saved anywhere
- Not used in practice

### Goal:
- Auto-save to journal
- Practice in SOV game
- Add to flashcards
- Track usage

### Implementation:

#### Step 1: Create Word of Day Hook
```typescript
// frontend/src/hooks/useWordOfDay.ts
import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'

export interface DailyWord {
  kanji: string
  reading: string
  meaning: string
  level: string
  example: string
  date: string
}

export function useWordOfDay() {
  const [word, setWord] = useState<DailyWord | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Fetch today's word
    const fetchWord = async () => {
      const today = new Date().toISOString().split('T')[0]
      // Your existing word fetch logic
    }
    fetchWord()
  }, [])

  const saveToJournal = async (userId: string) => {
    if (!word) return
    
    try {
      await addDoc(collection(db, 'journal'), {
        userId,
        word: word.kanji,
        reading: word.reading,
        meaning: word.meaning,
        level: word.level,
        date: new Date(),
        practiced: false,
        reviewCount: 0
      })
      setSaved(true)
    } catch (error) {
      console.error('Error saving to journal:', error)
    }
  }

  const addToFlashcards = async (userId: string) => {
    if (!word) return
    
    try {
      await addDoc(collection(db, 'flashcards'), {
        userId,
        front: word.kanji,
        back: word.meaning,
        reading: word.reading,
        level: word.level,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5
      })
    } catch (error) {
      console.error('Error adding to flashcards:', error)
    }
  }

  const practiceInSOV = () => {
    // Navigate to SOV game with this word
    return `/sentence-game?word=${encodeURIComponent(word?.kanji || '')}`
  }

  return {
    word,
    saved,
    saveToJournal,
    addToFlashcards,
    practiceInSOV
  }
}
```

#### Step 2: Update Home Page
```typescript
// frontend/src/pages/HomePage.tsx
import { useWordOfDay } from '../hooks/useWordOfDay'
import { useAuth } from '../contexts/AuthContext'

export default function HomePage() {
  const { word, saved, saveToJournal, addToFlashcards, practiceInSOV } = useWordOfDay()
  const { user } = useAuth()

  return (
    <div className="word-of-day-card">
      <h3>今日の言葉 / Word of the Day</h3>
      
      {word && (
        <>
          <div className="word-display">
            <div className="kanji">{word.kanji}</div>
            <div className="reading">({word.reading})</div>
            <div className="meaning">{word.meaning}</div>
            <div className="level-badge">{word.level}</div>
          </div>

          <div className="word-actions">
            <button
              onClick={() => saveToJournal(user.uid)}
              disabled={saved}
              className="btn-primary"
            >
              {saved ? '✓ Saved' : '📝 Save to Journal'}
            </button>

            <button
              onClick={() => addToFlashcards(user.uid)}
              className="btn-secondary"
            >
              🃏 Add to Flashcards
            </button>

            <a href={practiceInSOV()} className="btn-accent">
              🎮 Practice in SOV Game
            </a>
          </div>

          <div className="example-sentence">
            <p className="text-sm text-gray-600">Example:</p>
            <p className="text-japanese">{word.example}</p>
          </div>
        </>
      )}
    </div>
  )
}
```

#### Step 3: Update Study Journal
```typescript
// frontend/src/pages/StudyJournalPage.tsx
import { useEffect, useState } from 'react'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

export default function StudyJournalPage() {
  const [entries, setEntries] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchEntries = async () => {
      const q = query(
        collection(db, 'journal'),
        where('userId', '==', user.uid),
        orderBy('date', 'desc')
      )
      const snapshot = await getDocs(q)
      setEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }
    fetchEntries()
  }, [user])

  return (
    <div className="journal-page">
      <h1>学習ジャーナル / Study Journal</h1>
      
      <div className="journal-stats">
        <div className="stat-card">
          <span className="stat-value">{entries.length}</span>
          <span className="stat-label">Words Saved</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {entries.filter(e => e.practiced).length}
          </span>
          <span className="stat-label">Practiced</span>
        </div>
      </div>

      <div className="journal-entries">
        {entries.map(entry => (
          <div key={entry.id} className="journal-entry">
            <div className="entry-word">
              <span className="kanji">{entry.word}</span>
              <span className="reading">({entry.reading})</span>
            </div>
            <div className="entry-meaning">{entry.meaning}</div>
            <div className="entry-meta">
              <span className="level-badge">{entry.level}</span>
              <span className="date">
                {new Date(entry.date.seconds * 1000).toLocaleDateString()}
              </span>
              {entry.practiced && <span className="badge-practiced">✓ Practiced</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 2️⃣ Enhanced SOV Sentence Game (4-5 hours)

### Current State:
- Basic sentence game exists
- Needs drag-and-drop
- Needs real-time feedback

### Goal:
- Interactive word tile system
- SOV order validation
- Particle checking
- Progressive difficulty
- Use Word of Day

### Implementation:

#### Step 1: Install Dependencies
```bash
cd frontend
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

#### Step 2: Create SOV Builder Component
```typescript
// frontend/src/components/grammar/SOVBuilder.tsx
import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface WordTile {
  id: string
  word: string
  reading: string
  type: 'subject' | 'object' | 'verb' | 'particle' | 'adjective'
  english: string
}

interface SOVBuilderProps {
  targetSentence: {
    subject: string
    object: string
    verb: string
    particles: { [key: string]: string }
  }
  level: 'N5' | 'N4' | 'N3'
  wordOfDay?: string
}

function SortableItem({ tile }: { tile: WordTile }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: tile.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const typeColors = {
    subject: 'bg-blue-100 border-blue-500',
    object: 'bg-green-100 border-green-500',
    verb: 'bg-red-100 border-red-500',
    particle: 'bg-yellow-100 border-yellow-500',
    adjective: 'bg-purple-100 border-purple-500',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`word-tile ${typeColors[tile.type]} p-4 rounded-lg border-2 cursor-move`}
    >
      <div className="text-2xl font-bold">{tile.word}</div>
      <div className="text-sm text-gray-600">({tile.reading})</div>
      <div className="text-xs text-gray-500">{tile.english}</div>
      <div className="text-xs font-semibold mt-1">{tile.type.toUpperCase()}</div>
    </div>
  )
}

export function SOVBuilder({ targetSentence, level, wordOfDay }: SOVBuilderProps) {
  const [tiles, setTiles] = useState<WordTile[]>([
    // Generate tiles from target sentence
    { id: '1', word: targetSentence.subject, reading: 'わたし', type: 'subject', english: 'I' },
    { id: '2', word: 'は', reading: 'は', type: 'particle', english: '(topic)' },
    { id: '3', word: targetSentence.object, reading: 'りんご', type: 'object', english: 'apple' },
    { id: '4', word: 'を', reading: 'を', type: 'particle', english: '(object)' },
    { id: '5', word: targetSentence.verb, reading: 'たべます', type: 'verb', english: 'eat' },
  ])

  const [sentence, setSentence] = useState<WordTile[]>([])
  const [feedback, setFeedback] = useState<string>('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setSentence((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const validateSentence = () => {
    if (sentence.length === 0) {
      setFeedback('ことばをならべてください / Please arrange the words')
      return
    }

    // Check SOV order
    const subjectIndex = sentence.findIndex(t => t.type === 'subject')
    const objectIndex = sentence.findIndex(t => t.type === 'object')
    const verbIndex = sentence.findIndex(t => t.type === 'verb')

    const correctOrder = subjectIndex < objectIndex && objectIndex < verbIndex

    // Check particles
    const hasTopicParticle = sentence.some((t, i) => 
      t.word === 'は' && i === subjectIndex + 1
    )
    const hasObjectParticle = sentence.some((t, i) => 
      t.word === 'を' && i === objectIndex + 1
    )

    const allCorrect = correctOrder && hasTopicParticle && hasObjectParticle

    setIsCorrect(allCorrect)

    if (allCorrect) {
      setFeedback('🎉 せいかい！ / Correct! Perfect SOV structure!')
    } else {
      if (!correctOrder) {
        setFeedback('❌ じゅんばんがちがいます / Word order is incorrect. Remember: Subject-Object-Verb')
      } else if (!hasTopicParticle || !hasObjectParticle) {
        setFeedback('❌ じょしがちがいます / Particle placement is incorrect')
      }
    }
  }

  const addToSentence = (tile: WordTile) => {
    setSentence([...sentence, tile])
    setTiles(tiles.filter(t => t.id !== tile.id))
  }

  const removeFromSentence = (tile: WordTile) => {
    setSentence(sentence.filter(t => t.id !== tile.id))
    setTiles([...tiles, tile])
  }

  return (
    <div className="sov-builder p-6">
      <div className="instructions mb-6">
        <h2 className="text-2xl font-bold mb-2">
          ぶんをつくろう / Build a Sentence
        </h2>
        <p className="text-gray-600">
          Drag words to create a correct Japanese sentence in SOV order
        </p>
        {wordOfDay && (
          <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
            <span className="font-semibold">今日の言葉を使おう / Use today's word:</span>
            <span className="ml-2 text-xl">{wordOfDay}</span>
          </div>
        )}
      </div>

      {/* Word Bank */}
      <div className="word-bank mb-6">
        <h3 className="text-lg font-semibold mb-3">ことばバンク / Word Bank</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {tiles.map(tile => (
            <div
              key={tile.id}
              onClick={() => addToSentence(tile)}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <SortableItem tile={tile} />
            </div>
          ))}
        </div>
      </div>

      {/* Sentence Area */}
      <div className="sentence-area mb-6">
        <h3 className="text-lg font-semibold mb-3">あなたのぶん / Your Sentence</h3>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sentence.map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-wrap gap-3 min-h-[100px] p-4 bg-gray-50 rounded-lg border-2 border-dashed">
              {sentence.length === 0 ? (
                <p className="text-gray-400">ここにことばをドラッグ / Drag words here</p>
              ) : (
                sentence.map(tile => (
                  <div key={tile.id} onClick={() => removeFromSentence(tile)}>
                    <SortableItem tile={tile} />
                  </div>
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Validation */}
      <div className="validation-area">
        <button
          onClick={validateSentence}
          className="btn-primary px-8 py-3 text-lg"
        >
          チェック / Check Answer
        </button>

        {feedback && (
          <div className={`mt-4 p-4 rounded-lg ${
            isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
          } border-2`}>
            <p className="text-lg font-semibold">{feedback}</p>
          </div>
        )}
      </div>

      {/* Hint Section */}
      <div className="hint-section mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-2">💡 ヒント / Hint</h4>
        <p>Japanese sentence order: <strong>Subject は Object を Verb</strong></p>
        <p className="text-sm text-gray-600 mt-1">
          Example: 私は りんごを 食べます (I eat an apple)
        </p>
      </div>
    </div>
  )
}
```

#### Step 3: Update Sentence Game Page
```typescript
// frontend/src/pages/SentenceGamePage.tsx
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SOVBuilder } from '../components/grammar/SOVBuilder'

export default function SentenceGamePage() {
  const [searchParams] = useSearchParams()
  const wordOfDay = searchParams.get('word')
  
  const [currentLevel, setCurrentLevel] = useState<'N5' | 'N4' | 'N3'>('N5')
  const [currentSentence, setCurrentSentence] = useState(0)

  const sentences = {
    N5: [
      {
        subject: '私',
        object: 'りんご',
        verb: '食べます',
        particles: { topic: 'は', object: 'を' }
      },
      {
        subject: '田中さん',
        object: '本',
        verb: '読みます',
        particles: { topic: 'は', object: 'を' }
      },
      // Add more N5 sentences
    ],
    N4: [
      // Intermediate sentences
    ],
    N3: [
      // Advanced sentences
    ]
  }

  return (
    <div className="sentence-game-page">
      <div className="level-selector mb-6">
        <button
          onClick={() => setCurrentLevel('N5')}
          className={currentLevel === 'N5' ? 'active' : ''}
        >
          N5 (Beginner)
        </button>
        <button
          onClick={() => setCurrentLevel('N4')}
          className={currentLevel === 'N4' ? 'active' : ''}
        >
          N4 (Intermediate)
        </button>
        <button
          onClick={() => setCurrentLevel('N3')}
          className={currentLevel === 'N3' ? 'active' : ''}
        >
          N3 (Advanced)
        </button>
      </div>

      <SOVBuilder
        targetSentence={sentences[currentLevel][currentSentence]}
        level={currentLevel}
        wordOfDay={wordOfDay || undefined}
      />

      <div className="navigation mt-6">
        <button
          onClick={() => setCurrentSentence(Math.max(0, currentSentence - 1))}
          disabled={currentSentence === 0}
        >
          ← まえ / Previous
        </button>
        <span className="mx-4">
          {currentSentence + 1} / {sentences[currentLevel].length}
        </span>
        <button
          onClick={() => setCurrentSentence(
            Math.min(sentences[currentLevel].length - 1, currentSentence + 1)
          )}
          disabled={currentSentence === sentences[currentLevel].length - 1}
        >
          つぎ / Next →
        </button>
      </div>
    </div>
  )
}
```

---

## 3️⃣ Bilingual Language System (2-3 hours)

### Implementation:

#### Step 1: Create Language Context
```typescript
// frontend/src/contexts/LanguageContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'ja' | 'en' | 'both'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  showFurigana: boolean
  setShowFurigana: (show: boolean) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('both')
  const [showFurigana, setShowFurigana] = useState(true)

  const translations: Record<string, { ja: string; en: string }> = {
    // Navigation
    'nav.home': { ja: 'ホーム', en: 'Home' },
    'nav.practice': { ja: '練習', en: 'Practice' },
    'nav.quiz': { ja: 'クイズ', en: 'Quiz' },
    'nav.journal': { ja: 'ジャーナル', en: 'Journal' },
    'nav.tutor': { ja: 'AI先生', en: 'AI Tutor' },
    
    // Word of Day
    'word_of_day': { ja: '今日の言葉', en: 'Word of the Day' },
    'save_to_journal': { ja: 'ジャーナルに保存', en: 'Save to Journal' },
    'add_to_flashcards': { ja: 'フラッシュカードに追加', en: 'Add to Flashcards' },
    'practice_sov': { ja: 'SOVゲームで練習', en: 'Practice in SOV Game' },
    
    // Study
    'start_practice': { ja: '練習を始める', en: 'Start Practice' },
    'take_quiz': { ja: 'クイズを受ける', en: 'Take Quiz' },
    'ask_ai': { ja: 'AI先生に聞く', en: 'Ask AI Sensei' },
    
    // Progress
    'current_streak': { ja: '現在の連続日数', en: 'Current Streak' },
    'total_exp': { ja: '合計経験値', en: 'Total EXP' },
    'words_learned': { ja: '学習した単語', en: 'Words Learned' },
    
    // Levels
    'beginner': { ja: '初級', en: 'Beginner' },
    'intermediate': { ja: '中級', en: 'Intermediate' },
    'advanced': { ja: '上級', en: 'Advanced' },
    
    // Add more translations...
  }

  const t = (key: string): string => {
    const translation = translations[key]
    if (!translation) return key

    if (language === 'both') {
      return `${translation.ja}\n${translation.en}`
    }
    return translation[language]
  }

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      showFurigana,
      setShowFurigana,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
```

#### Step 2: Add Language Selector Component
```typescript
// frontend/src/components/LanguageSelector.tsx
import { useLanguage } from '../contexts/LanguageContext'

export function LanguageSelector() {
  const { language, setLanguage, showFurigana, setShowFurigana } = useLanguage()

  return (
    <div className="language-selector flex items-center gap-4">
      <div className="btn-group">
        <button
          onClick={() => setLanguage('ja')}
          className={language === 'ja' ? 'active' : ''}
        >
          🇯🇵 日本語
        </button>
        <button
          onClick={() => setLanguage('both')}
          className={language === 'both' ? 'active' : ''}
        >
          🌐 両方
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'active' : ''}
        >
          🇺🇸 English
        </button>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={showFurigana}
          onChange={(e) => setShowFurigana(e.target.checked)}
        />
        <span>ふりがな / Furigana</span>
      </label>
    </div>
  )
}
```

#### Step 3: Update App.tsx
```typescript
// frontend/src/App.tsx
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          {/* ... rest of app */}
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  )
}
```

---

## 🚀 Deploy These Changes

```bash
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend

# Install new dependencies
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Build
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

---

## ✅ Testing Checklist

After implementing:

- [ ] Word of Day saves to journal
- [ ] Word of Day adds to flashcards
- [ ] Word of Day link to SOV game works
- [ ] Journal shows all saved words
- [ ] SOV game drag-and-drop works
- [ ] SOV game validates correctly
- [ ] SOV game shows bilingual feedback
- [ ] Language selector changes UI language
- [ ] Furigana toggle works
- [ ] Mobile responsive on all features

---

## 📊 Expected Impact

### User Experience:
- **Word of Day becomes actionable** (not just display)
- **SOV game becomes engaging** (interactive drag-and-drop)
- **Bilingual support** makes app accessible to all levels

### Learning Outcomes:
- Students practice words immediately
- Sentence structure becomes visual and intuitive
- Progress tracking shows real learning

### Technical:
- Clean, reusable components
- Type-safe with TypeScript
- Firebase integration for persistence
- Mobile-friendly interactions

---

## 🎯 Next Steps After Phase 1

Once these 3 features are done:

1. **Phase 2:** Build hiragana/katakana structured courses
2. **Phase 3:** Add N5 kanji course (80 characters)
3. **Phase 4:** Implement progress tracking dashboard
4. **Phase 5:** Create JLPT mock exam system

**Start with these 3 features and you'll have immediate value for your students!** 🚀
