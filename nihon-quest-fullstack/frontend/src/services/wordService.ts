interface WordOfDay {
  word: string
  reading: string
  meanings: string[]
  example: string
  exampleTranslation: string
  jlptLevel?: string
  date: string
}

class WordService {
  private wordBank = [
    {
      word: '勉強', reading: 'べんきょう', meanings: ['study', 'learning'],
      example: '毎日日本語を勉強します。', exampleTranslation: 'I study Japanese every day.',
      jlptLevel: 'N5'
    },
    {
      word: '食べる', reading: 'たべる', meanings: ['to eat'],
      example: 'りんごを食べます。', exampleTranslation: 'I eat an apple.',
      jlptLevel: 'N5'
    },
    {
      word: '友達', reading: 'ともだち', meanings: ['friend'],
      example: '友達と遊びます。', exampleTranslation: 'I play with my friend.',
      jlptLevel: 'N5'
    },
    {
      word: '学校', reading: 'がっこう', meanings: ['school'],
      example: '学校に行きます。', exampleTranslation: 'I go to school.',
      jlptLevel: 'N5'
    },
    {
      word: '本', reading: 'ほん', meanings: ['book'],
      example: '本を読みます。', exampleTranslation: 'I read a book.',
      jlptLevel: 'N5'
    },
    {
      word: '音楽', reading: 'おんがく', meanings: ['music'],
      example: '音楽を聞きます。', exampleTranslation: 'I listen to music.',
      jlptLevel: 'N5'
    },
    {
      word: '映画', reading: 'えいが', meanings: ['movie', 'film'],
      example: '映画を見ます。', exampleTranslation: 'I watch a movie.',
      jlptLevel: 'N5'
    },
    {
      word: '天気', reading: 'てんき', meanings: ['weather'],
      example: '今日はいい天気ですね。', exampleTranslation: "The weather is nice today, isn't it?",
      jlptLevel: 'N5'
    },
    {
      word: '時間', reading: 'じかん', meanings: ['time'],
      example: '時間がありません。', exampleTranslation: "I don't have time.",
      jlptLevel: 'N5'
    },
    {
      word: '仕事', reading: 'しごと', meanings: ['work', 'job'],
      example: '仕事が忙しいです。', exampleTranslation: 'Work is busy.',
      jlptLevel: 'N5'
    },
    {
      word: '楽しい', reading: 'たのしい', meanings: ['fun', 'enjoyable'],
      example: '日本語は楽しいです。', exampleTranslation: 'Japanese is fun.',
      jlptLevel: 'N5'
    },
    {
      word: '美味しい', reading: 'おいしい', meanings: ['delicious', 'tasty'],
      example: 'このラーメンは美味しい。', exampleTranslation: 'This ramen is delicious.',
      jlptLevel: 'N5'
    }
  ]

  getWordOfDay(): WordOfDay {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    const index = dayOfYear % this.wordBank.length
    
    return {
      ...this.wordBank[index],
      date: today.toISOString().split('T')[0]
    }
  }

  getRandomWord(): WordOfDay {
    const randomIndex = Math.floor(Math.random() * this.wordBank.length)
    return {
      ...this.wordBank[randomIndex],
      date: new Date().toISOString().split('T')[0]
    }
  }

  getRandomWords(count: number): WordOfDay[] {
    const shuffled = [...this.wordBank].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count).map(word => ({
      ...word,
      date: new Date().toISOString().split('T')[0]
    }))
  }

  getAllWords(): WordOfDay[] {
    return this.wordBank.map(word => ({
      ...word,
      date: new Date().toISOString().split('T')[0]
    }))
  }
}

export const wordService = new WordService()
export type { WordOfDay }
