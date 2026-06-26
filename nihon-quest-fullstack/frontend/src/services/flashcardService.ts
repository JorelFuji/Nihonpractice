interface Flashcard {
  id: string
  japanese: string
  hiragana: string
  katakana: string
  romaji: string
  english: string
  emoji: string
  example: string
  exampleTranslation: string
  audioRecording?: string
  lastReviewed?: Date
  nextReview?: Date
  easiness: number
  interval: number
  repetitions: number
}

class FlashcardService {
  private storageKey = 'japanese_flashcards'
  
  private defaultCards: Omit<Flashcard, 'id' | 'lastReviewed' | 'nextReview' | 'easiness' | 'interval' | 'repetitions' | 'audioRecording'>[] = [
    {
      japanese: 'こんにちは',
      hiragana: 'こんにちは',
      katakana: 'コンニチハ',
      romaji: 'konnichiwa',
      english: 'hello',
      emoji: '👋',
      example: 'こんにちは、元気ですか？',
      exampleTranslation: 'Hello, how are you?'
    },
    {
      japanese: 'ありがとう',
      hiragana: 'ありがとう',
      katakana: 'アリガトウ',
      romaji: 'arigatou',
      english: 'thank you',
      emoji: '🙏',
      example: 'ありがとうございます。',
      exampleTranslation: 'Thank you very much.'
    },
    {
      japanese: '食べる',
      hiragana: 'たべる',
      katakana: 'タベル',
      romaji: 'taberu',
      english: 'to eat',
      emoji: '🍽️',
      example: '寿司を食べます。',
      exampleTranslation: 'I eat sushi.'
    },
    {
      japanese: '飲む',
      hiragana: 'のむ',
      katakana: 'ノム',
      romaji: 'nomu',
      english: 'to drink',
      emoji: '🥤',
      example: 'コーヒーを飲みます。',
      exampleTranslation: 'I drink coffee.'
    },
    {
      japanese: '学校',
      hiragana: 'がっこう',
      katakana: 'ガッコウ',
      romaji: 'gakkou',
      english: 'school',
      emoji: '🏫',
      example: '学校に行きます。',
      exampleTranslation: 'I go to school.'
    },
    {
      japanese: '友達',
      hiragana: 'ともだち',
      katakana: 'トモダチ',
      romaji: 'tomodachi',
      english: 'friend',
      emoji: '👥',
      example: '友達と遊びます。',
      exampleTranslation: 'I play with my friend.'
    },
    {
      japanese: '勉強',
      hiragana: 'べんきょう',
      katakana: 'ベンキョウ',
      romaji: 'benkyou',
      english: 'study',
      emoji: '📚',
      example: '日本語を勉強します。',
      exampleTranslation: 'I study Japanese.'
    },
    {
      japanese: '音楽',
      hiragana: 'おんがく',
      katakana: 'オンガク',
      romaji: 'ongaku',
      english: 'music',
      emoji: '🎵',
      example: '音楽を聞きます。',
      exampleTranslation: 'I listen to music.'
    },
    {
      japanese: '映画',
      hiragana: 'えいが',
      katakana: 'エイガ',
      romaji: 'eiga',
      english: 'movie',
      emoji: '🎬',
      example: '映画を見ます。',
      exampleTranslation: 'I watch a movie.'
    },
    {
      japanese: '本',
      hiragana: 'ほん',
      katakana: 'ホン',
      romaji: 'hon',
      english: 'book',
      emoji: '📖',
      example: '本を読みます。',
      exampleTranslation: 'I read a book.'
    }
  ]

  getAllCards(): Flashcard[] {
    const stored = localStorage.getItem(this.storageKey)
    if (stored) {
      return JSON.parse(stored)
    }

    // Initialize with default cards
    const initialCards: Flashcard[] = this.defaultCards.map((card, index) => ({
      ...card,
      id: `card-${index}`,
      easiness: 2.5,
      interval: 0,
      repetitions: 0
    }))

    this.saveCards(initialCards)
    return initialCards
  }

  private saveCards(cards: Flashcard[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(cards))
  }

  getCard(id: string): Flashcard | undefined {
    return this.getAllCards().find(c => c.id === id)
  }

  getDueCards(): Flashcard[] {
    const now = new Date()
    return this.getAllCards().filter(card => {
      if (!card.nextReview) return true
      return new Date(card.nextReview) <= now
    })
  }

  updateCardProgress(cardId: string, quality: number) {
    const cards = this.getAllCards()
    const cardIndex = cards.findIndex(c => c.id === cardId)
    if (cardIndex === -1) return

    const card = cards[cardIndex]
    const now = new Date()

    // SM-2 Algorithm
    if (quality >= 3) {
      if (card.repetitions === 0) {
        card.interval = 1
      } else if (card.repetitions === 1) {
        card.interval = 6
      } else {
        card.interval = Math.round(card.interval * card.easiness)
      }
      card.repetitions += 1
    } else {
      card.repetitions = 0
      card.interval = 1
    }

    card.easiness = Math.max(1.3, card.easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
    card.lastReviewed = now
    card.nextReview = new Date(now.getTime() + card.interval * 24 * 60 * 60 * 1000)

    cards[cardIndex] = card
    this.saveCards(cards)
  }

  saveAudioRecording(cardId: string, audioBlob: string) {
    const cards = this.getAllCards()
    const cardIndex = cards.findIndex(c => c.id === cardId)
    if (cardIndex === -1) return

    cards[cardIndex].audioRecording = audioBlob
    this.saveCards(cards)
  }

  getRandomCard(): Flashcard {
    const dueCards = this.getDueCards()
    if (dueCards.length > 0) {
      return dueCards[Math.floor(Math.random() * dueCards.length)]
    }
    const allCards = this.getAllCards()
    return allCards[Math.floor(Math.random() * allCards.length)]
  }
}

export const flashcardService = new FlashcardService()
export type { Flashcard }
