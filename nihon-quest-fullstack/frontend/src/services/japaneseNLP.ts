// Japanese NLP Service using Kuromoji and Kuroshiro
// For tokenization, morphology parsing, furigana, and kana conversion

import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'

let kuroshiro: Kuroshiro | null = null
let isInitialized = false

/**
 * Initialize the Japanese NLP engine
 * Must be called before using other functions
 */
export async function initializeNLP(): Promise<void> {
  if (isInitialized) return

  try {
    kuroshiro = new Kuroshiro()
    await kuroshiro.init(new KuromojiAnalyzer())
    isInitialized = true
    console.log('✅ Japanese NLP Engine initialized')
  } catch (error) {
    console.error('Failed to initialize Japanese NLP:', error)
    throw error
  }
}

/**
 * Convert Japanese text to different formats
 * @param text - Japanese text (kanji, hiragana, katakana, or mixed)
 * @param options - Conversion options
 */
export async function convertText(
  text: string,
  options: {
    to: 'hiragana' | 'katakana' | 'romaji'
    mode?: 'normal' | 'spaced' | 'okurigana' | 'furigana'
  }
): Promise<string> {
  if (!kuroshiro) {
    await initializeNLP()
  }

  try {
    const result = await kuroshiro!.convert(text, {
      to: options.to,
      mode: options.mode || 'normal'
    })
    return result
  } catch (error) {
    console.error('Text conversion error:', error)
    return text
  }
}

/**
 * Add furigana (pronunciation) above kanji
 * Returns HTML string with <ruby> tags
 * @param text - Japanese text with kanji
 */
export async function addFurigana(text: string): Promise<string> {
  if (!kuroshiro) {
    await initializeNLP()
  }

  try {
    const result = await kuroshiro!.convert(text, {
      to: 'hiragana',
      mode: 'furigana'
    })
    return result
  } catch (error) {
    console.error('Furigana generation error:', error)
    return text
  }
}

/**
 * Convert kanji to hiragana
 * @param text - Japanese text with kanji
 */
export async function kanjiToHiragana(text: string): Promise<string> {
  return convertText(text, { to: 'hiragana' })
}

/**
 * Convert to katakana
 * @param text - Japanese text
 */
export async function toKatakana(text: string): Promise<string> {
  return convertText(text, { to: 'katakana' })
}

/**
 * Convert to romaji (Roman letters)
 * @param text - Japanese text
 */
export async function toRomaji(text: string): Promise<string> {
  return convertText(text, { to: 'romaji' })
}

/**
 * Tokenize Japanese text into words/morphemes
 * Uses MeCab-style morphological analysis
 * @param text - Japanese sentence
 */
export async function tokenize(text: string): Promise<Token[]> {
  if (!kuroshiro || !(kuroshiro as any)._analyzer) {
    await initializeNLP()
  }

  try {
    // Access the underlying analyzer (kuromoji)
    const analyzer = (kuroshiro as any)._analyzer
    const tokens = await analyzer.parse(text)

    return tokens.map((token: any) => ({
      surface: token.surface_form,
      reading: token.reading || token.surface_form,
      baseForm: token.basic_form || token.surface_form,
      partOfSpeech: token.pos,
      pos_detail_1: token.pos_detail_1,
      pos_detail_2: token.pos_detail_2,
      pos_detail_3: token.pos_detail_3,
      conjugation: token.conjugated_type,
      conjugationForm: token.conjugated_form
    }))
  } catch (error) {
    console.error('Tokenization error:', error)
    return []
  }
}

/**
 * Analyze Japanese sentence structure
 * Returns grammatical breakdown
 * @param sentence - Japanese sentence
 */
export async function analyzeSentence(sentence: string): Promise<SentenceAnalysis> {
  const tokens = await tokenize(sentence)

  const particles = tokens.filter(t => t.partOfSpeech === '助詞')
  const verbs = tokens.filter(t => t.partOfSpeech === '動詞')
  const nouns = tokens.filter(t => t.partOfSpeech === '名詞')
  const adjectives = tokens.filter(t =>
    t.partOfSpeech === '形容詞' || t.partOfSpeech === '形容動詞'
  )

  return {
    tokens,
    particles: particles.map(t => ({
      particle: t.surface,
      position: tokens.indexOf(t),
      type: t.pos_detail_1
    })),
    verbs: verbs.map(t => ({
      verb: t.surface,
      baseForm: t.baseForm,
      conjugation: t.conjugationForm
    })),
    nouns: nouns.map(t => t.surface),
    adjectives: adjectives.map(t => t.surface),
    structure: analyzeStructure(tokens)
  }
}

/**
 * Determine sentence structure (SOV, etc.)
 */
function analyzeStructure(tokens: Token[]): string {
  const hasSubject = tokens.some(t => t.pos_detail_1 === '主語')
  const hasObject = tokens.some(t => t.surface === 'を')
  const hasVerb = tokens.some(t => t.partOfSpeech === '動詞')

  if (hasSubject && hasObject && hasVerb) {
    return 'SOV (Subject-Object-Verb)'
  } else if (hasVerb) {
    return 'Verb-final'
  } else {
    return 'Noun phrase'
  }
}

/**
 * Get word information for vocabulary learning
 * @param word - Japanese word
 */
export async function getWordInfo(word: string): Promise<WordInfo> {
  const tokens = await tokenize(word)
  const mainToken = tokens[0] || {}

  const hiragana = await kanjiToHiragana(word)
  const romaji = await toRomaji(word)
  const furigana = await addFurigana(word)

  return {
    word,
    hiragana,
    romaji,
    furigana,
    partOfSpeech: mainToken.partOfSpeech || 'unknown',
    baseForm: mainToken.baseForm || word
  }
}

/**
 * Check if text contains kanji
 */
export function hasKanji(text: string): boolean {
  return /[\u4e00-\u9faf]/.test(text)
}

/**
 * Check if text contains hiragana
 */
export function hasHiragana(text: string): boolean {
  return /[\u3040-\u309f]/.test(text)
}

/**
 * Check if text contains katakana
 */
export function hasKatakana(text: string): boolean {
  return /[\u30a0-\u30ff]/.test(text)
}

/**
 * Extract kanji characters from text
 */
export function extractKanji(text: string): string[] {
  const matches = text.match(/[\u4e00-\u9faf]/g)
  return matches ? [...new Set(matches)] : []
}

// Type definitions

export interface Token {
  surface: string // The word as it appears
  reading: string // Reading in katakana
  baseForm: string // Dictionary form
  partOfSpeech: string // 名詞, 動詞, 助詞, etc.
  pos_detail_1: string
  pos_detail_2: string
  pos_detail_3: string
  conjugation: string
  conjugationForm: string
}

export interface SentenceAnalysis {
  tokens: Token[]
  particles: Array<{
    particle: string
    position: number
    type: string
  }>
  verbs: Array<{
    verb: string
    baseForm: string
    conjugation: string
  }>
  nouns: string[]
  adjectives: string[]
  structure: string
}

export interface WordInfo {
  word: string
  hiragana: string
  romaji: string
  furigana: string
  partOfSpeech: string
  baseForm: string
}

export const japaneseNLP = {
  initialize: initializeNLP,
  convert: convertText,
  addFurigana,
  kanjiToHiragana,
  toKatakana,
  toRomaji,
  tokenize,
  analyzeSentence,
  getWordInfo,
  hasKanji,
  hasHiragana,
  hasKatakana,
  extractKanji
}
