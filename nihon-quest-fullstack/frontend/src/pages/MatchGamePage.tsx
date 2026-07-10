import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WORD_CATEGORIES, getRandomWords, type JapaneseWord } from '@/data/japaneseWords'

export default function MatchGamePage() {
  const { category } = useParams<{ category?: string }>()
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(category)
  const [gameWords, setGameWords] = useState<JapaneseWord[]>([])
  const [cards, setCards] = useState<Array<{ id: string; type: 'word' | 'meaning'; content: string; word: JapaneseWord }>>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set())
  const [moves, setMoves] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (selectedCategory) {
      startGame(selectedCategory)
    }
  }, [selectedCategory])

  const startGame = (cat: string) => {
    const words = getRandomWords(cat === 'random' ? undefined : cat, 8)
    setGameWords(words)
    
    // Create cards: word card + meaning card for each word
    const wordCards = words.map((word, index) => ({
      id: `word-${index}`,
      type: 'word' as const,
      content: word.japanese,
      word
    }))
    
    const meaningCards = words.map((word, index) => ({
      id: `meaning-${index}`,
      type: 'meaning' as const,
      content: `${word.emoji} ${word.english}`,
      word
    }))
    
    const allCards = [...wordCards, ...meaningCards].sort(() => Math.random() - 0.5)
    setCards(allCards)
    setFlippedCards([])
    setMatchedPairs(new Set())
    setMoves(0)
    setShowCelebration(false)
  }

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2) return
    if (flippedCards.includes(index)) return
    if (matchedPairs.has(cards[index].word.id)) return

    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlipped
      const firstCard = cards[first]
      const secondCard = cards[second]

      if (firstCard.word.id === secondCard.word.id && firstCard.type !== secondCard.type) {
        // Match!
        setTimeout(() => {
          setMatchedPairs(new Set([...matchedPairs, firstCard.word.id]))
          setFlippedCards([])
          
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          })

          if (matchedPairs.size + 1 === gameWords.length) {
            setTimeout(() => {
              setShowCelebration(true)
              confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5 }
              })
            }, 500)
          }
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🎮 Match Game
              </span>
            </h1>
            <p className="text-xl text-gray-700">Choose a category to start!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(WORD_CATEGORIES).map(([key, cat]) => (
              <Button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className="h-32 text-lg flex flex-col items-center justify-center bg-white hover:bg-purple-50 text-purple-700 border-4 border-purple-300"
              >
                <div className="text-4xl mb-2">{cat.emoji}</div>
                <div>{cat.name}</div>
                <div className="text-sm">{cat.japanese}</div>
              </Button>
            ))}
            <Button
              onClick={() => setSelectedCategory('random')}
              className="h-32 text-lg flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <div className="text-4xl mb-2">🎲</div>
              <div>Random</div>
              <div className="text-sm">ランダム</div>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
        <Card className="border-4 border-purple-300 shadow-2xl max-w-md w-full">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-purple-700 mb-4">
              おめでとう！
            </h2>
            <p className="text-2xl text-gray-700 mb-6">You won!</p>
            <div className="bg-purple-100 rounded-xl p-4 mb-6">
              <p className="text-xl text-gray-700">
                <strong>Moves:</strong> {moves}
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => startGame(selectedCategory)}
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500"
              >
                🔄 Play Again
              </Button>
              <Button
                onClick={() => setSelectedCategory(undefined)}
                variant="outline"
                className="w-full h-14 text-lg"
              >
                🏠 Choose Category
              </Button>
              <Button
                onClick={() => navigate('/vocabulary')}
                variant="outline"
                className="w-full h-14 text-lg"
              >
                📚 Back to Vocabulary
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <Button
            onClick={() => setSelectedCategory(undefined)}
            variant="outline"
            className="mb-4"
          >
            ← Change Category
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎮 Match Game
            </span>
          </h1>
          <div className="flex justify-center gap-8 text-lg font-semibold text-gray-700">
            <div>Moves: {moves}</div>
            <div>Matched: {matchedPairs.size}/{gameWords.length}</div>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {cards.map((card, index) => {
            const isFlipped = flippedCards.includes(index) || matchedPairs.has(card.word.id)
            const isMatched = matchedPairs.has(card.word.id)

            return (
              <motion.div
                key={`${card.id}-${index}`}
                whileHover={{ scale: isMatched ? 1 : 1.05 }}
                whileTap={{ scale: isMatched ? 1 : 0.95 }}
                onClick={() => handleCardClick(index)}
              >
                <Card
                  className={`aspect-square cursor-pointer border-4 transition-all ${
                    isMatched
                      ? 'border-green-500 bg-green-100'
                      : isFlipped
                      ? 'border-purple-500 bg-white'
                      : 'border-purple-300 bg-gradient-to-br from-purple-400 to-pink-400 hover:border-purple-500'
                  }`}
                >
                  <CardContent className="h-full flex items-center justify-center p-2 sm:p-4">
                    {isFlipped ? (
                      <div className="text-center">
                        {card.type === 'word' ? (
                          <div className="text-2xl sm:text-3xl font-bold text-purple-700">
                            {card.content}
                          </div>
                        ) : (
                          <div className="text-xl sm:text-2xl">
                            {card.content}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-3xl sm:text-4xl">❓</div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
