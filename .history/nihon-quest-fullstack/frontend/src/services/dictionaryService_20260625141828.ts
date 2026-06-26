interface DictionaryEntry {
  word: string
  reading: string
  meanings: string[]
  jlptLevel?: string
  commonWords?: boolean
  examples?: string[]
  hiragana?: string
  katakana?: string
  romaji?: string
  kanji?: string
  partOfSpeech?: string[]
}

interface CachedData<T> {
  data: T
  timestamp: number
  expiresIn: number
}

class DictionaryService {
  private cache: Map<string, CachedData<any>> = new Map()
  private readonly CACHE_DURATION = 1000 * 60 * 60 * 24

  private getCached<T>(key: string): T | null {
    const cached = this.cache.get(key)
    if (!cached) return null

    const now = Date.now()
    if (now - cached.timestamp > cached.expiresIn) {
      this.cache.delete(key)
      return null
    }

    return cached.data as T
  }

  private setCache<T>(key: string, data: T, expiresIn = this.CACHE_DURATION): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn
    })
  }

  async lookupWord(word: string, targetLang: 'ja' | 'en' = 'ja'): Promise<DictionaryEntry[]> {
    const cacheKey = `lookup_${word}_${targetLang}`
    const cached = this.getCached<DictionaryEntry[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(word)}`)
      const data = await response.json()

      const entries: DictionaryEntry[] = data.data.slice(0, 5).map((item: any) => ({
        word: item.japanese[0]?.word || item.japanese[0]?.reading || word,
        reading: item.japanese[0]?.reading || '',
        meanings: item.senses[0]?.english_definitions || [],
        jlptLevel: item.jlpt?.[0] || undefined,
        commonWords: item.is_common || false,
        examples: []
      }))

      this.setCache(cacheKey, entries)
      return entries
    } catch (error) {
      console.error('Dictionary lookup error:', error)
      return []
    }
  }

  async translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
    const cacheKey = `translate_${text}_${sourceLang}_${targetLang}`
    const cached = this.getCached<string>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + 
        sourceLang + '&tl=' + targetLang + '&dt=t&q=' + encodeURIComponent(text))
      const data = await response.json()
      
      const translation = data[0]?.map((item: any) => item[0]).join('') || text
      this.setCache(cacheKey, translation)
      return translation
    } catch (error) {
      console.error('Translation error:', error)
      return text
    }
  }

  async getKanjiInfo(kanji: string): Promise<any> {
    const cacheKey = `kanji_${kanji}`
    const cached = this.getCached<any>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(kanji)}`)
      if (!response.ok) throw new Error('Kanji not found')
      
      const data = await response.json()
      this.setCache(cacheKey, data)
      return data
    } catch (error) {
      console.error('Kanji lookup error:', error)
      return null
    }
  }

  async searchExamples(keyword: string): Promise<any[]> {
    const cacheKey = `examples_${keyword}`
    const cached = this.getCached<any[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}`)
      const data = await response.json()
      
      const examples = data.data.slice(0, 3).map((item: any) => ({
        japanese: item.japanese[0]?.word || item.japanese[0]?.reading,
        reading: item.japanese[0]?.reading,
        meanings: item.senses[0]?.english_definitions?.join(', ')
      }))

      this.setCache(cacheKey, examples)
      return examples
    } catch (error) {
      console.error('Examples search error:', error)
      return []
    }
  }

  detectLanguage(text: string): 'ja' | 'en' | 'mixed' {
    const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/
    const englishRegex = /[a-zA-Z]/

    const hasJapanese = japaneseRegex.test(text)
    const hasEnglish = englishRegex.test(text)

    if (hasJapanese && hasEnglish) return 'mixed'
    if (hasJapanese) return 'ja'
    return 'en'
  }

  clearCache(): void {
    this.cache.clear()
  }

  getCacheSize(): number {
    return this.cache.size
  }
}

export const dictionaryService = new DictionaryService()
export type { DictionaryEntry }
