import React from 'react'

interface FuriganaProps {
  word: string
  reading: string
  className?: string
  showParentheses?: boolean
}

/**
 * Furigana component - displays kanji with hiragana reading above in parentheses
 * This helps learners understand how to read kanji characters
 * 
 * @param word - The Japanese word (may contain kanji)
 * @param reading - The hiragana/katakana reading
 * @param className - Additional CSS classes
 * @param showParentheses - Show reading in parentheses (default: true)
 */
export default function Furigana({ 
  word, 
  reading, 
  className = '',
  showParentheses = true 
}: FuriganaProps) {
  // Check if word contains kanji (basic check for non-hiragana/katakana)
  const hasKanji = /[\u4e00-\u9faf\u3400-\u4dbf]/.test(word)

  if (!hasKanji) {
    // No kanji, just display the word normally
    return <span className={className}>{word}</span>
  }

  // Display with furigana
  return (
    <span className={`inline-block ${className}`}>
      <ruby className="ruby-text">
        <span className="text-base sm:text-lg font-bold">{word}</span>
        <rt className="text-xs sm:text-sm text-gray-600 font-normal">
          {showParentheses ? `(${reading})` : reading}
        </rt>
      </ruby>
    </span>
  )
}

/**
 * Simple inline furigana that displays as: 漢字 (かんじ)
 */
export function InlineFurigana({ 
  word, 
  reading, 
  className = '' 
}: FuriganaProps) {
  const hasKanji = /[\u4e00-\u9faf\u3400-\u4dbf]/.test(word)
  
  if (!hasKanji) {
    return <span className={className}>{word}</span>
  }

  return (
    <span className={className}>
      {word} <span className="text-sm text-gray-600">({reading})</span>
    </span>
  )
}

/**
 * Block-style furigana with reading on top
 */
export function BlockFurigana({ 
  word, 
  reading, 
  className = '' 
}: FuriganaProps) {
  const hasKanji = /[\u4e00-\u9faf\u3400-\u4dbf]/.test(word)
  
  return (
    <div className={`text-center ${className}`}>
      {hasKanji && (
        <div className="text-xs sm:text-sm text-gray-600 mb-1">
          ({reading})
        </div>
      )}
      <div className="text-2xl sm:text-3xl font-bold">
        {word}
      </div>
      {!hasKanji && (
        <div className="text-xs sm:text-sm text-gray-500 mt-1">
          {reading}
        </div>
      )}
    </div>
  )
}
