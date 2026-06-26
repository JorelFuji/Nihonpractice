import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Trophy, RotateCcw, Baby, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import confetti from 'canvas-confetti'
import { N5_GRAMMAR } from '@/srs/n5-grammar.seed'

type GameMode = 'matching' | 'fillblank' | 'sentence-order'
type UserMode = 'kid' | 'adult'

interface MatchingPair {
  id: string
  japanese: string
  romaji: string
  english: string
  emoji: string
  matched: boolean
}

export default function GrammarGamePage() {
  const [userMode, setUserMode] = useState<UserMode>('kid')
  const [gameMode, setGameMode] = useState<GameMode>('matching')
  const [score, setScore] = useState(0)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set())
  const [showCelebration, setShowCelebration] = useState(false)

  // Generate matching pairs from grammar examples
  const generateMatchingPairs = (): MatchingPair[] => {
    const pairs: MatchingPair[] = []
    N5_GRAMMAR.slice(0, 6).forEach((point, idx) => {
      const example = point.examples[0]
      pairs.push({
        id: `jp-${idx}`,
        japanese: example.jp,
        romaji: example.romaji,
        english: example.en,
        emoji: example.emoji || point.emoji || '✨',
        matched: false,
      })
    })
    return pairs
  }

  const [pairs, setPairs] = useState<MatchingPair[]>(generateMatchingPairs())

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleCardSelect = (id: string, type: 'japanese' | 'english') => {
    if (matchedPairs.has(id)) return
    
    const fullId = `${type}-${id}`
    
    if (selectedCards.includes(fullId)) {
      setSelectedCards(selectedCards.filter(c => c !== fullId))
      return
    }

    const newSelected = [...selectedCards, fullId]
    setSelectedCards(newSelected)

    if (newSelected.length === 2) {
      const [first, second] = newSelected
      const [firstType, firstId] = first.split('-')
      const [secondType, secondId] = second.split('-')

      if (firstType !== secondType && firstId === secondId) {
        // Match found!
        setMatchedPairs(new Set([...matchedPairs, firstId]))
        setScore(score + 10)
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        })
        setSelectedCards([])

        if (matchedPairs.size + 1 === pairs.length) {
          setTimeout(() => {
            setShowCelebration(true)
            confetti({
              particleCount: 200,
              spread: 160,
              origin: { y: 0.6 }
            })
          }, 500)
        }
      } else {
        // No match
        setTimeout(() => setSelectedCards([]), 800)
      }
    }
  }

  const resetGame = () => {
    setPairs(generateMatchingPairs())
    setSelectedCards([])
    setMatchedPairs(new Set())
    setShowCelebration(false)
  }

  const renderMatchingGame = () => {
    const japaneseCards = shuffleArray(pairs)
    const englishCards = shuffleArray([...pairs])

    return (
      <div className="grid md:grid-cols-2 gap-8">
        {/* Japanese Column */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-center mb-4">
            {userMode === 'kid' ? '🇯🇵 Japanese!' : '日本語 (Japanese)'}
          </h3>
          {japaneseCards.map((pair, idx) => {
            const cardId = pair.id.replace('jp-', '')
            const isSelected = selectedCards.includes(`japanese-${cardId}`)
            const isMatched = matchedPairs.has(cardId)

            return (
              <motion.div
                key={pair.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => !isMatched && handleCardSelect(cardId, 'japanese')}
                className={`cursor-pointer ${isMatched ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <Card className={`border-4 transition-all ${
                  isMatched 
                    ? 'border-green-400 bg-green-50' 
                    : isSelected 
                    ? 'border-purple-500 bg-purple-100 shadow-lg scale-105' 
                    : 'border-purple-200 hover:border-purple-400 hover:shadow-lg'
                }`}>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-4xl mb-2">{pair.emoji}</div>
                      <div className="text-2xl font-bold mb-1">{pair.japanese}</div>
                      {userMode === 'kid' && (
                        <div className="text-sm text-muted-foreground">{pair.romaji}</div>
                      )}
                      {isMatched && <div className="text-2xl mt-2">✓</div>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* English Column */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-center mb-4">
            {userMode === 'kid' ? '🇺🇸 English!' : 'English'}
          </h3>
          {englishCards.map((pair, idx) => {
            const cardId = pair.id.replace('jp-', '')
            const isSelected = selectedCards.includes(`english-${cardId}`)
            const isMatched = matchedPairs.has(cardId)

            return (
              <motion.div
                key={`en-${pair.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => !isMatched && handleCardSelect(cardId, 'english')}
                className={`cursor-pointer ${isMatched ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <Card className={`border-4 transition-all ${
                  isMatched 
                    ? 'border-green-400 bg-green-50' 
                    : isSelected 
                    ? 'border-blue-500 bg-blue-100 shadow-lg scale-105' 
                    : 'border-blue-200 hover:border-blue-400 hover:shadow-lg'
                }`}>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-xl font-semibold">{pair.english}</div>
                      {isMatched && <div className="text-2xl mt-2">✓</div>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderFillBlankGame = () => {
    const currentGrammar = N5_GRAMMAR[currentLevel]
    const example = currentGrammar.examples[0]
    
    // Split sentence into tokens for fill-in-the-blank
    const tokens = example.tokens || []
    const particleIndex = tokens.findIndex(t => ['は', 'を', 'の', 'に', 'で', 'も', 'か'].includes(t.surface))
    
    if (particleIndex === -1) return null

    const correctAnswer = tokens[particleIndex].surface
    const options = ['は', 'を', 'の', 'に', 'で', 'も', 'か'].filter(p => {
      return N5_GRAMMAR.slice(0, currentLevel + 1).some(g => 
        g.examples.some(ex => ex.jp.includes(p))
      )
    })

    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-4 border-purple-200 mb-6">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{example.emoji || currentGrammar.emoji || '✨'}</div>
              <h3 className="text-2xl font-bold mb-4">
                {userMode === 'kid' ? 'Fill in the missing word! 🎯' : 'Complete the sentence'}
              </h3>
              
              {/* Sentence with blank */}
              <div className="text-3xl font-bold mb-4 flex items-center justify-center gap-2 flex-wrap">
                {tokens.map((token, idx) => (
                  <span key={idx}>
                    {idx === particleIndex ? (
                      <span className="inline-block w-16 h-12 border-4 border-dashed border-purple-400 rounded-lg bg-purple-50"></span>
                    ) : (
                      <span>{token.surface}</span>
                    )}
                  </span>
                ))}
              </div>

              {userMode === 'kid' && (
                <p className="text-lg text-muted-foreground mb-2">{example.romaji}</p>
              )}
              <p className="text-xl font-semibold text-blue-600">{example.en}</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
              {shuffleArray(options).slice(0, 6).map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (option === correctAnswer) {
                      setScore(score + 10)
                      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
                      setTimeout(() => {
                        if (currentLevel < N5_GRAMMAR.length - 1) {
                          setCurrentLevel(currentLevel + 1)
                        } else {
                          setShowCelebration(true)
                        }
                      }, 1000)
                    }
                  }}
                  className={`p-6 rounded-xl text-3xl font-bold border-4 transition-all ${
                    option === correctAnswer
                      ? 'border-green-400 bg-green-50 hover:bg-green-100'
                      : 'border-purple-200 bg-white hover:border-purple-400 hover:shadow-lg'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {userMode === 'kid' && (
              <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-center">
                  💡 <strong>Hint:</strong> {currentGrammar.kidExplanation || currentGrammar.summary}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              ✨ Grammar Master Game ✨
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {userMode === 'kid' ? 'Learn Japanese with fun pictures! 🎨' : 'Master N5 grammar through interactive games'}
          </p>

          {/* Mode Toggles */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="flex gap-2 bg-white rounded-full p-2 shadow-lg">
              <Button
                onClick={() => setUserMode('kid')}
                variant={userMode === 'kid' ? 'default' : 'ghost'}
                className={userMode === 'kid' ? 'bg-gradient-to-r from-pink-400 to-purple-400' : ''}
              >
                <Baby className="w-4 h-4 mr-2" />
                Kids Mode
              </Button>
              <Button
                onClick={() => setUserMode('adult')}
                variant={userMode === 'adult' ? 'default' : 'ghost'}
                className={userMode === 'adult' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : ''}
              >
                <Users className="w-4 h-4 mr-2" />
                Adult Mode
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 text-lg mb-6">
            <div className="flex items-center gap-2 bg-white rounded-full px-6 py-2 shadow-md">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">{score}</span> points
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full px-6 py-2 shadow-md">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="font-bold">{matchedPairs.size}</span> / {pairs.length} matched
            </div>
          </div>
        </div>

        {/* Game Mode Selector */}
        <Card className="mb-8 border-4 border-purple-200">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold text-center mb-4">
              {userMode === 'kid' ? '🎮 Pick a game!' : 'Choose Game Mode'}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                onClick={() => {
                  setGameMode('matching')
                  resetGame()
                }}
                variant={gameMode === 'matching' ? 'default' : 'outline'}
                className={`h-24 text-lg ${gameMode === 'matching' ? 'bg-gradient-to-r from-pink-500 to-purple-500' : ''}`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-1">🎴</div>
                  <div>{userMode === 'kid' ? 'Match Cards!' : 'Matching Game'}</div>
                </div>
              </Button>
              <Button
                onClick={() => {
                  setGameMode('fillblank')
                  setCurrentLevel(0)
                  setScore(0)
                }}
                variant={gameMode === 'fillblank' ? 'default' : 'outline'}
                className={`h-24 text-lg ${gameMode === 'fillblank' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : ''}`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-1">📝</div>
                  <div>{userMode === 'kid' ? 'Fill Blanks!' : 'Fill in the Blank'}</div>
                </div>
              </Button>
              <Button
                onClick={() => setGameMode('sentence-order')}
                variant={gameMode === 'sentence-order' ? 'default' : 'outline'}
                className={`h-24 text-lg ${gameMode === 'sentence-order' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''}`}
                disabled
              >
                <div className="text-center">
                  <div className="text-3xl mb-1">🔤</div>
                  <div>{userMode === 'kid' ? 'Order Words!' : 'Sentence Building'}</div>
                  <div className="text-xs">(Coming Soon)</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Game Area */}
        {!showCelebration ? (
          <div>
            {gameMode === 'matching' && renderMatchingGame()}
            {gameMode === 'fillblank' && renderFillBlankGame()}
          </div>
        ) : (
          /* Celebration Screen */
          <Card className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <div className="text-8xl mb-6">🏆</div>
                <h2 className="text-4xl font-bold mb-4">
                  {userMode === 'kid' ? 'You did it! Amazing! 🎉' : 'おめでとうございます！'}
                </h2>
                <p className="text-2xl mb-6">
                  {userMode === 'kid' ? "You're a grammar superstar!" : 'Congratulations! You completed the game!'}
                </p>
                <div className="text-6xl font-bold text-primary mb-8">
                  {score} Points!
                </div>
                <Button
                  onClick={() => {
                    resetGame()
                    setScore(0)
                    setCurrentLevel(0)
                    setShowCelebration(false)
                  }}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {userMode === 'kid' ? 'Play Again!' : 'Play Again'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reset Button */}
        {!showCelebration && (
          <div className="text-center mt-8">
            <Button
              onClick={resetGame}
              variant="outline"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              {userMode === 'kid' ? 'Start Over!' : 'Reset Game'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
