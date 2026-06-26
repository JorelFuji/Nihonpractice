import { useState, useEffect } from 'react'
import { Search, BookOpen, Languages, Sparkles, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { dictionaryService, type DictionaryEntry } from '@/services/dictionaryService'
import { romajiService } from '@/services/romajiService'
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

  useEffect(() => {
    romajiService.initialize()
  }, [])

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    
    setIsLoading(true)
    try {
      const detectedLang = dictionaryService.detectLanguage(searchTerm)
      
      const entries = await dictionaryService.lookupWord(searchTerm)
      setResults(entries)

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
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
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
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Translation</p>
                  <p className="text-xl font-semibold">{translation}</p>
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
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-3">
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
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Meanings:</p>
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
