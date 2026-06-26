import { useState, useEffect, useCallback } from 'react'
import { dictionaryService } from '@/services/dictionaryService'

interface AutocompleteResult {
  text: string
  type: 'suggestion' | 'history' | 'popular'
  preview?: string
}

export function useAutocomplete() {
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    const history = localStorage.getItem('searchHistory')
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  const addToHistory = useCallback((term: string) => {
    if (!term.trim()) return

    const newHistory = [term, ...searchHistory.filter(t => t !== term)].slice(0, 10)
    setSearchHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))
  }, [searchHistory])

  const clearHistory = useCallback(() => {
    setSearchHistory([])
    localStorage.removeItem('searchHistory')
  }, [])

  const getSuggestions = useCallback(async (input: string): Promise<AutocompleteResult[]> => {
    if (!input.trim()) {
      const recentSearches = searchHistory.slice(0, 5).map(text => ({
        text,
        type: 'history' as const,
        preview: 'Recent search'
      }))

      const popularWords = [
        { text: 'こんにちは', preview: 'hello' },
        { text: 'ありがとう', preview: 'thank you' },
        { text: '勉強', preview: 'study' },
        { text: '食べる', preview: 'to eat' },
        { text: '日本', preview: 'Japan' }
      ].map(item => ({
        ...item,
        type: 'popular' as const
      }))

      return [...recentSearches, ...popularWords]
    }

    const results: AutocompleteResult[] = []

    const historyMatches = searchHistory
      .filter(h => h.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 3)
      .map(text => ({
        text,
        type: 'history' as const,
        preview: 'Recent'
      }))

    results.push(...historyMatches)

    try {
      const entries = await dictionaryService.lookupWord(input)
      const dictSuggestions = entries.slice(0, 5).map(entry => ({
        text: entry.word,
        type: 'suggestion' as const,
        preview: entry.meanings[0] || entry.reading
      }))
      results.push(...dictSuggestions)
    } catch (error) {
      console.error('Suggestion error:', error)
    }

    const commonCompletions = getCommonCompletions(input)
    results.push(...commonCompletions.map(item => ({
      ...item,
      type: 'suggestion' as const
    })))

    const seen = new Set<string>()
    return results.filter(item => {
      if (seen.has(item.text)) return false
      seen.add(item.text)
      return true
    }).slice(0, 8)
  }, [searchHistory])

  return {
    suggestions,
    setSuggestions,
    searchHistory,
    addToHistory,
    clearHistory,
    getSuggestions
  }
}

function getCommonCompletions(input: string): Array<{ text: string; preview: string }> {
  const completions: Record<string, Array<{ text: string; preview: string }>> = {
    'こん': [
      { text: 'こんにちは', preview: 'hello (daytime)' },
      { text: 'こんばんは', preview: 'good evening' }
    ],
    'あり': [
      { text: 'ありがとう', preview: 'thank you' },
      { text: 'ありがとうございます', preview: 'thank you (polite)' }
    ],
    'おは': [
      { text: 'おはよう', preview: 'good morning' },
      { text: 'おはようございます', preview: 'good morning (polite)' }
    ],
    'た': [
      { text: '食べる', preview: 'to eat' },
      { text: '楽しい', preview: 'fun, enjoyable' }
    ],
    'べ': [
      { text: '勉強', preview: 'study' },
      { text: '便利', preview: 'convenient' }
    ],
    'hello': [
      { text: 'hello', preview: 'こんにちは' }
    ],
    'thank': [
      { text: 'thank you', preview: 'ありがとう' }
    ],
    'study': [
      { text: 'study', preview: '勉強' }
    ],
    'eat': [
      { text: 'eat', preview: '食べる' }
    ]
  }

  for (const [prefix, items] of Object.entries(completions)) {
    if (input.toLowerCase().startsWith(prefix.toLowerCase())) {
      return items
    }
  }

  return []
}
