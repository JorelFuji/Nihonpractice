import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'

class RomajiService {
  private kuroshiro: Kuroshiro | null = null
  private isInitialized = false

  async initialize() {
    if (this.isInitialized) return

    try {
      this.kuroshiro = new Kuroshiro()
      await this.kuroshiro.init(new KuromojiAnalyzer())
      this.isInitialized = true
      console.log('Kuroshiro initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Kuroshiro:', error)
    }
  }

  async toHiragana(text: string): Promise<string> {
    if (!this.isInitialized) await this.initialize()
    if (!this.kuroshiro) return text

    try {
      return await this.kuroshiro.convert(text, { to: 'hiragana', mode: 'normal' })
    } catch (error) {
      console.error('Hiragana conversion error:', error)
      return text
    }
  }

  async toKatakana(text: string): Promise<string> {
    if (!this.isInitialized) await this.initialize()
    if (!this.kuroshiro) return text

    try {
      return await this.kuroshiro.convert(text, { to: 'katakana', mode: 'normal' })
    } catch (error) {
      console.error('Katakana conversion error:', error)
      return text
    }
  }

  async toRomaji(text: string): Promise<string> {
    if (!this.isInitialized) await this.initialize()
    if (!this.kuroshiro) return text

    try {
      return await this.kuroshiro.convert(text, { to: 'romaji', mode: 'normal', romajiSystem: 'hepburn' })
    } catch (error) {
      console.error('Romaji conversion error:', error)
      return text
    }
  }

  async toFurigana(text: string): Promise<string> {
    if (!this.isInitialized) await this.initialize()
    if (!this.kuroshiro) return text

    try {
      return await this.kuroshiro.convert(text, { to: 'hiragana', mode: 'furigana' })
    } catch (error) {
      console.error('Furigana conversion error:', error)
      return text
    }
  }

  async getAllForms(text: string): Promise<{
    original: string
    hiragana: string
    katakana: string
    romaji: string
    furigana: string
  }> {
    const [hiragana, katakana, romaji, furigana] = await Promise.all([
      this.toHiragana(text),
      this.toKatakana(text),
      this.toRomaji(text),
      this.toFurigana(text)
    ])

    return {
      original: text,
      hiragana,
      katakana,
      romaji,
      furigana
    }
  }
}

export const romajiService = new RomajiService()
