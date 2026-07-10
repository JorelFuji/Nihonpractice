import { describe, it, expect } from 'vitest'
import { 
  japaneseWords, 
  getWordsByCategory, 
  getRandomWords,
  searchWords,
  categories 
} from '../data/japaneseWords'

describe('Japanese Words Data', () => {
  it('should have 70 words', () => {
    expect(japaneseWords).toHaveLength(70)
  })

  it('should have 7 categories', () => {
    expect(categories).toHaveLength(7)
  })

  it('each word should have required fields', () => {
    japaneseWords.forEach(word => {
      expect(word).toHaveProperty('id')
      expect(word).toHaveProperty('japanese')
      expect(word).toHaveProperty('hiragana')
      expect(word).toHaveProperty('romaji')
      expect(word).toHaveProperty('english')
      expect(word).toHaveProperty('emoji')
      expect(word).toHaveProperty('category')
    })
  })

  it('should have unique IDs', () => {
    const ids = japaneseWords.map(w => w.id)
    const uniqueIds = new Set(ids)
    expect(ids.length).toBe(uniqueIds.size)
  })
})

describe('getWordsByCategory', () => {
  it('should return food words', () => {
    const foodWords = getWordsByCategory('food')
    expect(foodWords.length).toBeGreaterThan(0)
    foodWords.forEach(word => {
      expect(word.category).toBe('food')
    })
  })

  it('should return animals words', () => {
    const animalWords = getWordsByCategory('animals')
    expect(animalWords.length).toBeGreaterThan(0)
    animalWords.forEach(word => {
      expect(word.category).toBe('animals')
    })
  })

  it('should return colors words', () => {
    const colorWords = getWordsByCategory('colors')
    expect(colorWords.length).toBeGreaterThan(0)
    colorWords.forEach(word => {
      expect(word.category).toBe('colors')
    })
  })

  it('should return empty array for invalid category', () => {
    const words = getWordsByCategory('invalid' as any)
    expect(words).toEqual([])
  })
})

describe('getRandomWords', () => {
  it('should return requested number of words', () => {
    const words = getRandomWords(5)
    expect(words).toHaveLength(5)
  })

  it('should return all words if count exceeds total', () => {
    const words = getRandomWords(100)
    expect(words.length).toBeLessThanOrEqual(70)
  })

  it('should return different words on multiple calls', () => {
    const words1 = getRandomWords(10)
    const words2 = getRandomWords(10)
    const ids1 = words1.map(w => w.id).join(',')
    const ids2 = words2.map(w => w.id).join(',')
    // There's a small chance they might be the same, but very unlikely
    expect(ids1).not.toBe(ids2)
  })
})

describe('searchWords', () => {
  it('should find りんご', () => {
    const results = searchWords('りんご')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].japanese).toBe('りんご')
  })

  it('should find apple', () => {
    const results = searchWords('apple')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].english.toLowerCase()).toContain('apple')
  })

  it('should find ringo', () => {
    const results = searchWords('ringo')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].romaji).toBe('ringo')
  })

  it('should be case insensitive', () => {
    const results1 = searchWords('APPLE')
    const results2 = searchWords('apple')
    expect(results1.length).toBe(results2.length)
  })

  it('should return empty array for no matches', () => {
    const results = searchWords('xyz123notfound')
    expect(results).toEqual([])
  })
})

describe('Word Categories Content', () => {
  it('food category should have at least 8 words', () => {
    const foods = getWordsByCategory('food')
    expect(foods.length).toBeGreaterThanOrEqual(8)
  })

  it('animals category should have at least 8 words', () => {
    const animals = getWordsByCategory('animals')
    expect(animals.length).toBeGreaterThanOrEqual(8)
  })

  it('colors category should have at least 8 words', () => {
    const colors = getWordsByCategory('colors')
    expect(colors.length).toBeGreaterThanOrEqual(8)
  })

  it('numbers category should have at least 8 words', () => {
    const numbers = getWordsByCategory('numbers')
    expect(numbers.length).toBeGreaterThanOrEqual(8)
  })
})

describe('Word Consistency', () => {
  it('りんご should have correct data', () => {
    const apple = japaneseWords.find(w => w.japanese === 'りんご')
    expect(apple).toBeDefined()
    expect(apple?.hiragana).toBe('りんご')
    expect(apple?.romaji).toBe('ringo')
    expect(apple?.english).toBe('Apple')
    expect(apple?.emoji).toBe('🍎')
    expect(apple?.category).toBe('food')
  })

  it('ねこ should have correct data', () => {
    const cat = japaneseWords.find(w => w.japanese === 'ねこ')
    expect(cat).toBeDefined()
    expect(cat?.hiragana).toBe('ねこ')
    expect(cat?.romaji).toBe('neko')
    expect(cat?.english).toBe('Cat')
    expect(cat?.emoji).toBe('🐱')
    expect(cat?.category).toBe('animals')
  })

  it('あか should have correct data', () => {
    const red = japaneseWords.find(w => w.japanese === 'あか')
    expect(red).toBeDefined()
    expect(red?.hiragana).toBe('あか')
    expect(red?.romaji).toBe('aka')
    expect(red?.english).toBe('Red')
    expect(red?.emoji).toBe('🔴')
    expect(red?.category).toBe('colors')
  })
})
