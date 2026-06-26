import { useState, useEffect, useRef } from 'react'
import { Search, BookOpen, Languages, Sparkles, CheckCircle, AlertCircle, XCircle, Clock, TrendingUp, History, X } from 'lucide-react'
import { dictionaryService, type DictionaryEntry } from '@/services/dictionaryService'
import { romajiService } from '@/services/romajiService'
import { useAutocomplete } from '@/hooks/useAutocomplete'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'

export default function DictionarySearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<DictionaryEntry[]>([])
  const [translation, setTranslation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [kanjiInfo, setKanjiInfo] = useState<any>(null)
  const [writingForms, setWritingForms] = useState<any>(null)
  const [crossCheck, setCrossCheck] = useState<any>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  
  const { suggestions, setSuggestions, addToHistory, clearHistory, getSuggestions } = useAutocomplete()
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    romajiService.initialize()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    
    setIsLoading(true)
    setCrossCheck(null)
    setWritingForms(null)
    
    try {
      const detectedLang = dictionaryService.detectLanguage(searchTerm)
      
      const entries = await dictionaryService.lookupWord(searchTerm)
      setResults(entries)

      if (detectedLang === 'ja' || detectedLang === 'mixed') {
        const forms = await romajiService.getAllForms(searchTerm)
        setWritingForms(forms)
      }

      if (searchTerm.length === 1 && detectedLang === 'ja') {
        const info = await dictionaryService.getKanjiInfo(searchTerm)
        setKanjiInfo(info)
      } else {
        setKanjiInfo(null)
      }

      const targetLang = detectedLang === 'ja' ? 'en' : 'ja'
      const sourceLang = detectedLang === 'ja' ? 'ja' : 'en'
      const translated = await dictionaryService.translateText(searchTerm, sourceLang, targetLang)
      setTranslation(translated)

      if (searchTerm && translated) {
        const check = await dictionaryService.crossCheckTranslation(searchTerm, translated)
        setCrossCheck(check)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = async (value: string) => {
    setSearchTerm(value)
    setSelectedSuggestionIndex(-1)

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(async () => {
      const newSuggestions = await getSuggestions(value)
      setSuggestions(newSuggestions)
      setShowSuggestions(true)
    }, 300)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setShowSuggestions(false)
    setTimeout(() => handleSearch(suggestion), 0)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
        handleSuggestionClick(suggestions[selectedSuggestionIndex].text)
      } else {
        handleSearch()
      }
      setShowSuggestions(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedSuggestionIndex(prev => prev > -1 ? prev - 1 : -1)
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setSelectedSuggestionIndex(-1)
    }
  }

  const handleSearchWrapper = (term?: string) => {
    const searchValue = term || searchTerm
    if (searchValue.trim()) {
      addToHistory(searchValue)
    }
    handleSearch(searchValue)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Japanese-English Dictionary
          </CardTitle>
          <CardDescription>
            Search words in Japanese or English with instant translation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type in Japanese (ひらがな, カタカナ, 漢字) or English..."
                className="w-full pl-10 pr-4 py-3 border-2 border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-lg"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              size="lg"
              className="px-6"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              ) : (
                'Search'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {writingForms && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Writing Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {writingForms.original !== writingForms.hiragana && (
                <div className="bg-white/60 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">Hiragana (ひらがな)</p>
                  <p className="text-2xl font-bold text-primary">{writingForms.hiragana}</p>
                </div>
              )}
              {writingForms.original !== writingForms.katakana && (
                <div className="bg-white/60 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">Katakana (カタカナ)</p>
                  <p className="text-2xl font-bold text-secondary">{writingForms.katakana}</p>
                </div>
              )}
              <div className="bg-white/60 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground font-semibold mb-1">Romaji (Hepburn)</p>
                <p className="text-2xl font-bold text-tertiary">{writingForms.romaji}</p>
              </div>
              <div className="bg-white/60 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground font-semibold mb-1">Original</p>
                <p className="text-2xl font-bold text-on-surface">{writingForms.original}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {translation && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Languages className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Translation</p>
                  <p className="text-xl font-semibold mb-3">{translation}</p>
                  
                  {crossCheck && (
                    <div className={`flex items-start gap-2 p-3 rounded-lg ${
                      crossCheck.confidence > 70 ? 'bg-green-50 border border-green-200' :
                      crossCheck.confidence > 40 ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-red-50 border border-red-200'
                    }`}>
                      {crossCheck.confidence > 70 ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : crossCheck.confidence > 40 ? (
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-semibold mb-1">
                          Cross-Check: {crossCheck.confidence}% Match
                        </p>
                        {crossCheck.issues.map((issue: string, i: number) => (
                          <p key={i} className="text-xs text-muted-foreground">{issue}</p>
                        ))}
                        {crossCheck.suggestions.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-semibold text-muted-foreground mb-1">
                              Alternative meanings:
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {crossCheck.suggestions.join(', ')}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {kanjiInfo && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle>Kanji Information: {kanjiInfo.kanji}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Meanings</p>
                <p className="text-lg">{kanjiInfo.meanings?.join(', ')}</p>
              </div>
              {kanjiInfo.kun_readings && (
                <div>
                  <p className="text-sm text-muted-foreground">Kun Reading</p>
                  <p className="text-lg">{kanjiInfo.kun_readings.join(', ')}</p>
                </div>
              )}
              {kanjiInfo.on_readings && (
                <div>
                  <p className="text-sm text-muted-foreground">On Reading</p>
                  <p className="text-lg">{kanjiInfo.on_readings.join(', ')}</p>
                </div>
              )}
              {kanjiInfo.grade && (
                <div>
                  <p className="text-sm text-muted-foreground">Grade</p>
                  <p className="text-lg">Grade {kanjiInfo.grade}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {results.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <h3 className="text-2xl font-bold text-primary">
                          {entry.word}
                        </h3>
                        {entry.reading && entry.reading !== entry.word && (
                          <span className="text-lg text-muted-foreground">
                            [{entry.reading}]
                          </span>
                        )}
                        {entry.commonWords && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                            Common
                          </span>
                        )}
                        {entry.jlptLevel && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                            {entry.jlptLevel}
                          </span>
                        )}
                        {entry.kanji && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold">
                            Contains Kanji
                          </span>
                        )}
                      </div>
                      
                      {entry.partOfSpeech && entry.partOfSpeech.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Part of Speech:</p>
                          <div className="flex gap-2 flex-wrap">
                            {entry.partOfSpeech.slice(0, 3).map((pos, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {pos}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-muted-foreground text-sm font-semibold mb-2">English Meanings:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {entry.meanings.map((meaning, i) => (
                            <li key={i} className="text-base">{meaning}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
