/**
 * Centralized Japanese Vocabulary Database
 * All words with proper Japanese names and picture matching
 * Example: りんご (ringo) = apple = 🍎
 */

export interface JapaneseWord {
  id: string
  japanese: string          // りんご
  hiragana: string          // りんご (if different from kanji)
  katakana?: string         // カタカナ version if applicable
  romaji: string            // ringo
  english: string           // apple
  emoji: string             // 🍎
  category: string          // food, animals, colors, etc.
  difficulty?: number       // 1-5
  audioUrl?: string         // pronunciation audio
}

// ======================
// 🍎 FOOD (たべもの)
// ======================
export const FOOD_WORDS: JapaneseWord[] = [
  {
    id: 'food-001',
    japanese: 'りんご',
    hiragana: 'りんご',
    romaji: 'ringo',
    english: 'apple',
    emoji: '🍎',
    category: 'たべもの',
    difficulty: 1
  },
  {
    id: 'food-002',
    japanese: 'バナナ',
    hiragana: 'ばなな',
    katakana: 'バナナ',
    romaji: 'banana',
    english: 'banana',
    emoji: '🍌',
    category: 'たべもの',
    difficulty: 1
  },
  {
    id: 'food-003',
    japanese: 'いちご',
    hiragana: 'いちご',
    romaji: 'ichigo',
    english: 'strawberry',
    emoji: '🍓',
    category: 'たべもの',
    difficulty: 1
  },
  {
    id: 'food-004',
    japanese: 'パン',
    hiragana: 'ぱん',
    katakana: 'パン',
    romaji: 'pan',
    english: 'bread',
    emoji: '🍞',
    category: 'たべもの',
    difficulty: 1
  },
  {
    id: 'food-005',
    japanese: 'みず',
    hiragana: 'みず',
    romaji: 'mizu',
    english: 'water',
    emoji: '💧',
    category: 'たべもの',
    difficulty: 1
  },
  {
    id: 'food-006',
    japanese: 'おにぎり',
    hiragana: 'おにぎり',
    romaji: 'onigiri',
    english: 'rice ball',
    emoji: '🍙',
    category: 'たべもの',
    difficulty: 2
  },
  {
    id: 'food-007',
    japanese: 'ラーメン',
    hiragana: 'らーめん',
    katakana: 'ラーメン',
    romaji: 'rāmen',
    english: 'ramen',
    emoji: '🍜',
    category: 'たべもの',
    difficulty: 1
  },
  {
    id: 'food-008',
    japanese: 'すし',
    hiragana: 'すし',
    romaji: 'sushi',
    english: 'sushi',
    emoji: '🍣',
    category: 'たべもの',
    difficulty: 1
  },
  {
    id: 'food-009',
    japanese: 'たまご',
    hiragana: 'たまご',
    romaji: 'tamago',
    english: 'egg',
    emoji: '🥚',
    category: 'たべもの',
    difficulty: 1
  },
  {
    id: 'food-010',
    japanese: 'さかな',
    hiragana: 'さかな',
    romaji: 'sakana',
    english: 'fish',
    emoji: '🐟',
    category: 'たべもの',
    difficulty: 1
  }
]

// ======================
// 🐱 ANIMALS (どうぶつ)
// ======================
export const ANIMAL_WORDS: JapaneseWord[] = [
  {
    id: 'animal-001',
    japanese: 'ねこ',
    hiragana: 'ねこ',
    romaji: 'neko',
    english: 'cat',
    emoji: '🐱',
    category: 'どうぶつ',
    difficulty: 1
  },
  {
    id: 'animal-002',
    japanese: 'いぬ',
    hiragana: 'いぬ',
    romaji: 'inu',
    english: 'dog',
    emoji: '🐕',
    category: 'どうぶつ',
    difficulty: 1
  },
  {
    id: 'animal-003',
    japanese: 'とり',
    hiragana: 'とり',
    romaji: 'tori',
    english: 'bird',
    emoji: '🐦',
    category: 'どうぶつ',
    difficulty: 1
  },
  {
    id: 'animal-004',
    japanese: 'うさぎ',
    hiragana: 'うさぎ',
    romaji: 'usagi',
    english: 'rabbit',
    emoji: '🐰',
    category: 'どうぶつ',
    difficulty: 1
  },
  {
    id: 'animal-005',
    japanese: 'くま',
    hiragana: 'くま',
    romaji: 'kuma',
    english: 'bear',
    emoji: '🐻',
    category: 'どうぶつ',
    difficulty: 1
  },
  {
    id: 'animal-006',
    japanese: 'ぞう',
    hiragana: 'ぞう',
    romaji: 'zou',
    english: 'elephant',
    emoji: '🐘',
    category: 'どうぶつ',
    difficulty: 1
  },
  {
    id: 'animal-007',
    japanese: 'さる',
    hiragana: 'さる',
    romaji: 'saru',
    english: 'monkey',
    emoji: '🐵',
    category: 'どうぶつ',
    difficulty: 1
  },
  {
    id: 'animal-008',
    japanese: 'きりん',
    hiragana: 'きりん',
    romaji: 'kirin',
    english: 'giraffe',
    emoji: '🦒',
    category: 'どうぶつ',
    difficulty: 2
  },
  {
    id: 'animal-009',
    japanese: 'らいおん',
    hiragana: 'らいおん',
    katakana: 'ライオン',
    romaji: 'raion',
    english: 'lion',
    emoji: '🦁',
    category: 'どうぶつ',
    difficulty: 2
  },
  {
    id: 'animal-010',
    japanese: 'ぺんぎん',
    hiragana: 'ぺんぎん',
    katakana: 'ペンギン',
    romaji: 'pengin',
    english: 'penguin',
    emoji: '🐧',
    category: 'どうぶつ',
    difficulty: 2
  }
]

// ======================
// 🎨 COLORS (いろ)
// ======================
export const COLOR_WORDS: JapaneseWord[] = [
  {
    id: 'color-001',
    japanese: 'あか',
    hiragana: 'あか',
    romaji: 'aka',
    english: 'red',
    emoji: '🔴',
    category: 'いろ',
    difficulty: 1
  },
  {
    id: 'color-002',
    japanese: 'あお',
    hiragana: 'あお',
    romaji: 'ao',
    english: 'blue',
    emoji: '🔵',
    category: 'いろ',
    difficulty: 1
  },
  {
    id: 'color-003',
    japanese: 'きいろ',
    hiragana: 'きいろ',
    romaji: 'kiiro',
    english: 'yellow',
    emoji: '🟡',
    category: 'いろ',
    difficulty: 1
  },
  {
    id: 'color-004',
    japanese: 'みどり',
    hiragana: 'みどり',
    romaji: 'midori',
    english: 'green',
    emoji: '🟢',
    category: 'いろ',
    difficulty: 1
  },
  {
    id: 'color-005',
    japanese: 'しろ',
    hiragana: 'しろ',
    romaji: 'shiro',
    english: 'white',
    emoji: '⚪',
    category: 'いろ',
    difficulty: 1
  },
  {
    id: 'color-006',
    japanese: 'くろ',
    hiragana: 'くろ',
    romaji: 'kuro',
    english: 'black',
    emoji: '⚫',
    category: 'いろ',
    difficulty: 1
  },
  {
    id: 'color-007',
    japanese: 'ピンク',
    hiragana: 'ぴんく',
    katakana: 'ピンク',
    romaji: 'pinku',
    english: 'pink',
    emoji: '🩷',
    category: 'いろ',
    difficulty: 1
  },
  {
    id: 'color-008',
    japanese: 'オレンジ',
    hiragana: 'おれんじ',
    katakana: 'オレンジ',
    romaji: 'orenji',
    english: 'orange',
    emoji: '🟠',
    category: 'いろ',
    difficulty: 1
  },
  {
    id: 'color-009',
    japanese: 'むらさき',
    hiragana: 'むらさき',
    romaji: 'murasaki',
    english: 'purple',
    emoji: '🟣',
    category: 'いろ',
    difficulty: 2
  },
  {
    id: 'color-010',
    japanese: 'ちゃいろ',
    hiragana: 'ちゃいろ',
    romaji: 'chairo',
    english: 'brown',
    emoji: '🟤',
    category: 'いろ',
    difficulty: 2
  }
]

// ======================
// 🔢 NUMBERS (かず)
// ======================
export const NUMBER_WORDS: JapaneseWord[] = [
  {
    id: 'number-001',
    japanese: 'いち',
    hiragana: 'いち',
    romaji: 'ichi',
    english: 'one',
    emoji: '1️⃣',
    category: 'かず',
    difficulty: 1
  },
  {
    id: 'number-002',
    japanese: 'に',
    hiragana: 'に',
    romaji: 'ni',
    english: 'two',
    emoji: '2️⃣',
    category: 'かず',
    difficulty: 1
  },
  {
    id: 'number-003',
    japanese: 'さん',
    hiragana: 'さん',
    romaji: 'san',
    english: 'three',
    emoji: '3️⃣',
    category: 'かず',
    difficulty: 1
  },
  {
    id: 'number-004',
    japanese: 'よん',
    hiragana: 'よん',
    romaji: 'yon',
    english: 'four',
    emoji: '4️⃣',
    category: 'かず',
    difficulty: 1
  },
  {
    id: 'number-005',
    japanese: 'ご',
    hiragana: 'ご',
    romaji: 'go',
    english: 'five',
    emoji: '5️⃣',
    category: 'かず',
    difficulty: 1
  },
  {
    id: 'number-006',
    japanese: 'ろく',
    hiragana: 'ろく',
    romaji: 'roku',
    english: 'six',
    emoji: '6️⃣',
    category: 'かず',
    difficulty: 1
  },
  {
    id: 'number-007',
    japanese: 'なな',
    hiragana: 'なな',
    romaji: 'nana',
    english: 'seven',
    emoji: '7️⃣',
    category: 'かず',
    difficulty: 1
  },
  {
    id: 'number-008',
    japanese: 'はち',
    hiragana: 'はち',
    romaji: 'hachi',
    english: 'eight',
    emoji: '8️⃣',
    category: 'かず',
    difficulty: 1
  },
  {
    id: 'number-009',
    japanese: 'きゅう',
    hiragana: 'きゅう',
    romaji: 'kyuu',
    english: 'nine',
    emoji: '9️⃣',
    category: 'かず',
    difficulty: 1
  },
  {
    id: 'number-010',
    japanese: 'じゅう',
    hiragana: 'じゅう',
    romaji: 'juu',
    english: 'ten',
    emoji: '🔟',
    category: 'かず',
    difficulty: 1
  }
]

// ======================
// 👨‍👩‍👧‍👦 FAMILY (かぞく)
// ======================
export const FAMILY_WORDS: JapaneseWord[] = [
  {
    id: 'family-001',
    japanese: 'おかあさん',
    hiragana: 'おかあさん',
    romaji: 'okaasan',
    english: 'mother',
    emoji: '👩',
    category: 'かぞく',
    difficulty: 1
  },
  {
    id: 'family-002',
    japanese: 'おとうさん',
    hiragana: 'おとうさん',
    romaji: 'otousan',
    english: 'father',
    emoji: '👨',
    category: 'かぞく',
    difficulty: 1
  },
  {
    id: 'family-003',
    japanese: 'おにいさん',
    hiragana: 'おにいさん',
    romaji: 'oniisan',
    english: 'older brother',
    emoji: '👦',
    category: 'かぞく',
    difficulty: 2
  },
  {
    id: 'family-004',
    japanese: 'おねえさん',
    hiragana: 'おねえさん',
    romaji: 'oneesan',
    english: 'older sister',
    emoji: '👧',
    category: 'かぞく',
    difficulty: 2
  },
  {
    id: 'family-005',
    japanese: 'おばあさん',
    hiragana: 'おばあさん',
    romaji: 'obaasan',
    english: 'grandmother',
    emoji: '👵',
    category: 'かぞく',
    difficulty: 2
  },
  {
    id: 'family-006',
    japanese: 'おじいさん',
    hiragana: 'おじいさん',
    romaji: 'ojiisan',
    english: 'grandfather',
    emoji: '👴',
    category: 'かぞく',
    difficulty: 2
  },
  {
    id: 'family-007',
    japanese: 'あかちゃん',
    hiragana: 'あかちゃん',
    romaji: 'akachan',
    english: 'baby',
    emoji: '👶',
    category: 'かぞく',
    difficulty: 1
  },
  {
    id: 'family-008',
    japanese: 'かぞく',
    hiragana: 'かぞく',
    romaji: 'kazoku',
    english: 'family',
    emoji: '👨‍👩‍👧‍👦',
    category: 'かぞく',
    difficulty: 1
  }
]

// ======================
// 👁️ BODY (からだ)
// ======================
export const BODY_WORDS: JapaneseWord[] = [
  {
    id: 'body-001',
    japanese: 'あたま',
    hiragana: 'あたま',
    romaji: 'atama',
    english: 'head',
    emoji: '👤',
    category: 'からだ',
    difficulty: 1
  },
  {
    id: 'body-002',
    japanese: 'め',
    hiragana: 'め',
    romaji: 'me',
    english: 'eye',
    emoji: '👁️',
    category: 'からだ',
    difficulty: 1
  },
  {
    id: 'body-003',
    japanese: 'はな',
    hiragana: 'はな',
    romaji: 'hana',
    english: 'nose',
    emoji: '👃',
    category: 'からだ',
    difficulty: 1
  },
  {
    id: 'body-004',
    japanese: 'くち',
    hiragana: 'くち',
    romaji: 'kuchi',
    english: 'mouth',
    emoji: '👄',
    category: 'からだ',
    difficulty: 1
  },
  {
    id: 'body-005',
    japanese: 'て',
    hiragana: 'て',
    romaji: 'te',
    english: 'hand',
    emoji: '✋',
    category: 'からだ',
    difficulty: 1
  },
  {
    id: 'body-006',
    japanese: 'あし',
    hiragana: 'あし',
    romaji: 'ashi',
    english: 'foot',
    emoji: '🦵',
    category: 'からだ',
    difficulty: 1
  },
  {
    id: 'body-007',
    japanese: 'みみ',
    hiragana: 'みみ',
    romaji: 'mimi',
    english: 'ear',
    emoji: '👂',
    category: 'からだ',
    difficulty: 1
  },
  {
    id: 'body-008',
    japanese: 'かみ',
    hiragana: 'かみ',
    romaji: 'kami',
    english: 'hair',
    emoji: '💇',
    category: 'からだ',
    difficulty: 1
  }
]

// ======================
// 🌸 NATURE (しぜん)
// ======================
export const NATURE_WORDS: JapaneseWord[] = [
  {
    id: 'nature-001',
    japanese: 'はな',
    hiragana: 'はな',
    romaji: 'hana',
    english: 'flower',
    emoji: '🌸',
    category: 'しぜん',
    difficulty: 1
  },
  {
    id: 'nature-002',
    japanese: 'き',
    hiragana: 'き',
    romaji: 'ki',
    english: 'tree',
    emoji: '🌳',
    category: 'しぜん',
    difficulty: 1
  },
  {
    id: 'nature-003',
    japanese: 'やま',
    hiragana: 'やま',
    romaji: 'yama',
    english: 'mountain',
    emoji: '⛰️',
    category: 'しぜん',
    difficulty: 1
  },
  {
    id: 'nature-004',
    japanese: 'うみ',
    hiragana: 'うみ',
    romaji: 'umi',
    english: 'sea',
    emoji: '🌊',
    category: 'しぜん',
    difficulty: 1
  },
  {
    id: 'nature-005',
    japanese: 'そら',
    hiragana: 'そら',
    romaji: 'sora',
    english: 'sky',
    emoji: '☁️',
    category: 'しぜん',
    difficulty: 1
  },
  {
    id: 'nature-006',
    japanese: 'つき',
    hiragana: 'つき',
    romaji: 'tsuki',
    english: 'moon',
    emoji: '🌙',
    category: 'しぜん',
    difficulty: 1
  },
  {
    id: 'nature-007',
    japanese: 'ほし',
    hiragana: 'ほし',
    romaji: 'hoshi',
    english: 'star',
    emoji: '⭐',
    category: 'しぜん',
    difficulty: 1
  },
  {
    id: 'nature-008',
    japanese: 'たいよう',
    hiragana: 'たいよう',
    romaji: 'taiyou',
    english: 'sun',
    emoji: '☀️',
    category: 'しぜん',
    difficulty: 2
  }
]

// ======================
// COMBINED DATA
// ======================
export const ALL_JAPANESE_WORDS: JapaneseWord[] = [
  ...FOOD_WORDS,
  ...ANIMAL_WORDS,
  ...COLOR_WORDS,
  ...NUMBER_WORDS,
  ...FAMILY_WORDS,
  ...BODY_WORDS,
  ...NATURE_WORDS
]

export const WORD_CATEGORIES = {
  たべもの: { name: 'Food', japanese: 'たべもの', emoji: '🍎', words: FOOD_WORDS },
  どうぶつ: { name: 'Animals', japanese: 'どうぶつ', emoji: '🐱', words: ANIMAL_WORDS },
  いろ: { name: 'Colors', japanese: 'いろ', emoji: '🎨', words: COLOR_WORDS },
  かず: { name: 'Numbers', japanese: 'かず', emoji: '🔢', words: NUMBER_WORDS },
  かぞく: { name: 'Family', japanese: 'かぞく', emoji: '👨‍👩‍👧‍👦', words: FAMILY_WORDS },
  からだ: { name: 'Body', japanese: 'からだ', emoji: '👁️', words: BODY_WORDS },
  しぜん: { name: 'Nature', japanese: 'しぜん', emoji: '🌸', words: NATURE_WORDS }
}

// ======================
// HELPER FUNCTIONS
// ======================
export function getWordsByCategory(category: string): JapaneseWord[] {
  return ALL_JAPANESE_WORDS.filter(word => word.category === category)
}

export function getRandomWords(category?: string, count: number = 8): JapaneseWord[] {
  const words = category 
    ? getWordsByCategory(category)
    : ALL_JAPANESE_WORDS
  
  const shuffled = [...words].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function searchWords(query: string): JapaneseWord[] {
  const lowerQuery = query.toLowerCase()
  return ALL_JAPANESE_WORDS.filter(word =>
    word.japanese.includes(query) ||
    word.hiragana.includes(query) ||
    word.romaji.toLowerCase().includes(lowerQuery) ||
    word.english.toLowerCase().includes(lowerQuery)
  )
}

export function getWordById(id: string): JapaneseWord | undefined {
  return ALL_JAPANESE_WORDS.find(word => word.id === id)
}
