import { useEffect, useState } from 'react'
import { Calendar, Sparkles, RefreshCw } from 'lucide-react'
import { wordService, type WordOfDay as WordOfDayType } from '@/services/wordService'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Furigana, { InlineFurigana } from '@/components/Furigana'

interface WordOfDayProps {
  mode?: 'daily' | 'random'
}

export default function WordOfDay({ mode = 'daily' }: WordOfDayProps) {
  const [word, setWord] = useState<WordOfDayType | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if (mode === 'daily') {
      setWord(wordService.getWordOfDay())
    } else {
      setWord(wordService.getRandomWord())
    }
  }, [mode])

  const handleRefresh = () => {
    setWord(wordService.getRandomWord())
    setIsFlipped(false)
  }

  if (!word) return null

  return (
    <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mode === 'daily' ? (
              <>
                <Calendar className="w-6 h-6 text-primary" />
                <span>Word of the Day</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 text-secondary" />
                <span>Random Word</span>
              </>
            )}
          </div>
          {mode === 'random' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Word
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          {mode === 'daily' 
            ? `Daily vocabulary for ${new Date().toLocaleDateString()}`
            : 'Click to reveal the meaning'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="bg-white rounded-lg p-6 shadow-md min-h-[200px] flex flex-col justify-center">
            {!isFlipped ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-4"
              >
                <div className="mb-3">
                  <Furigana 
                    word={word.word} 
                    reading={word.reading}
                    className="text-5xl font-bold text-primary"
                  />
                </div>
                {word.jlptLevel && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {word.jlptLevel}
                  </span>
                )}
                <p className="text-sm text-muted-foreground mt-4">
                  👆 Click to reveal meaning
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <Furigana 
                    word={word.word} 
                    reading={word.reading}
                    className="text-3xl font-bold text-primary"
                  />
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Meanings:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {word.meanings.map((meaning, i) => (
                      <li key={i} className="text-lg">{meaning}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Example:</p>
                  <p className="text-lg mb-2">
                    <InlineFurigana word={word.example} reading={word.reading} />
                  </p>
                  <p className="text-base text-muted-foreground italic">{word.exampleTranslation}</p>
                </div>

                <p className="text-sm text-muted-foreground text-center mt-4">
                  👆 Click to flip back
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
