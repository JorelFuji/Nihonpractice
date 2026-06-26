import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trophy, RotateCcw, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import confetti from 'canvas-confetti'

type GameMode = 'hiragana' | 'katakana' | 'memory'

interface PictureCard {
  id: string
  character: string
  romanji: string
  emoji: string
  image: string
  sound?: string
}

const HIRAGANA_CARDS: PictureCard[] = [
  { id: 'a', character: 'あ', romanji: 'a', emoji: '🍎', image: 'Apple', sound: 'a' },
  { id: 'i', character: 'い', romanji: 'i', emoji: '🦷', image: 'Tooth', sound: 'i' },
  { id: 'u', character: 'う', romanji: 'u', emoji: '🐰', image: 'Rabbit', sound: 'u' },
  { id: 'e', character: 'え', romanji: 'e', emoji: '✏️', image: 'Pencil', sound: 'e' },
  { id: 'o', character: 'お', romanji: 'o', emoji: '👑', image: 'King', sound: 'o' },
  { id: 'ka', character: 'か', romanji: 'ka', emoji: '🚗', image: 'Car', sound: 'ka' },
  { id: 'ki', character: 'き', romanji: 'ki', emoji: '🌳', image: 'Tree', sound: 'ki' },
  { id: 'ku', character: 'く', romanji: 'ku', emoji: '☁️', image: 'Cloud', sound: 'ku' },
]

const KATAKANA_CARDS: PictureCard[] = [
  { id: 'a', character: 'ア', romanji: 'a', emoji: '🍦', image: 'Ice Cream', sound: 'a' },
  { id: 'i', character: 'イ', romanji: 'i', emoji: '🍓', image: 'Strawberry', sound: 'i' },
  { id: 'u', character: 'ウ', romanji: 'u', emoji: '🎾', image: 'Tennis', sound: 'u' },
  { id: 'e', character: 'エ', romanji: 'e', emoji: '🏃', image: 'Running', sound: 'e' },
  { id: 'o', character: 'オ', romanji: 'o', emoji: '🐺', image: 'Wolf', sound: 'o' },
  { id: 'ka', character: 'カ', romanji: 'ka', emoji: '📷', image: 'Camera', sound: 'ka' },
  { id: 'ki', character: 'キ', romanji: 'ki', emoji: '🔑', image: 'Key', sound: 'ki' },
  { id: 'ku', character: 'ク', romanji: 'ku', emoji: '🍪', image: 'Cookie', sound: 'ku' },
]

export default function KidsModePage() {
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [score, setScore] = useState(0)
  const [selectedPicture, setSelectedPicture] = useState<string | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set())
  const [showCelebration, setShowCelebration] = useState(false)
  const [memoryCards, setMemoryCards] = useState<string[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedMemory, setMatchedMemory] = useState<Set<number>>(new Set())

  const getCurrentCards = () => {
    if (gameMode === 'katakana') return KATAKANA_CARDS
    return HIRAGANA_CARDS
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const startGame = (mode: GameMode) => {
    setGameMode(mode)
    setScore(0)
    setMatchedPairs(new Set())
    setShowCelebration(false)
    setSelectedPicture(null)
    setSelectedCharacter(null)

    if (mode === 'memory') {
      // Create memory game cards (pairs of emojis)
      const cards = getCurrentCards().slice(0, 6)
      const memoryPairs = [...cards.map(c => c.emoji), ...cards.map(c => c.emoji)]
      setMemoryCards(shuffleArray(memoryPairs))
      setFlippedCards([])
      setMatchedMemory(new Set())
    }
  }

  const handlePictureSelect = (id: string) => {
    if (matchedPairs.has(id)) return
    setSelectedPicture(selectedPicture === id ? null : id)
  }

  const playSound = (sound?: string) => {
    if (!sound) return
    const utterance = new SpeechSynthesisUtterance(sound)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.8
    window.speechSynthesis.speak(utterance)
  }

  const handleCharacterSelect = (id: string) => {
    if (matchedPairs.has(id)) return
    setSelectedCharacter(selectedCharacter === id ? null : id)

    // Play sound when character is selected
    const card = getCurrentCards().find(c => c.id === id)
    if (card) playSound(card.sound)

    if (selectedPicture && selectedPicture === id) {
      // Match found!
      setMatchedPairs(new Set([...matchedPairs, id]))
      setScore(score + 10)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF69B4', '#FFD700', '#87CEEB', '#98FB98']
      })
      setSelectedPicture(null)
      setSelectedCharacter(null)

      // Check if all matched
      if (matchedPairs.size + 1 === getCurrentCards().length) {
        setTimeout(() => {
          setShowCelebration(true)
          confetti({
            particleCount: 200,
            spread: 160,
            origin: { y: 0.6 }
          })
        }, 500)
      }
    }
  }

  const handleMemoryCardClick = (index: number) => {
    if (flippedCards.length === 2) return
    if (flippedCards.includes(index)) return
    if (matchedMemory.has(index)) return

    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (memoryCards[first] === memoryCards[second]) {
        // Match!
        setMatchedMemory(new Set([...matchedMemory, first, second]))
        setScore(score + 20)
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        })
        setTimeout(() => setFlippedCards([]), 500)

        // Check if game complete
        if (matchedMemory.size + 2 === memoryCards.length) {
          setTimeout(() => {
            setShowCelebration(true)
            confetti({
              particleCount: 200,
              spread: 160
            })
          }, 1000)
        }
      } else {
        // No match
        setTimeout(() => setFlippedCards([]), 1000)
      }
    }
  }

  const renderMatchingGame = () => {
    const cards = getCurrentCards()
    const shuffledPictures = shuffleArray([...cards])
    const shuffledCharacters = shuffleArray([...cards])

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Pictures Column */}
        <div className="space-y-3">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-purple-600">
            🖼️ Pick a Picture!
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {shuffledPictures.map((card) => {
              const isSelected = selectedPicture === card.id
              const isMatched = matchedPairs.has(card.id)

              return (
                <motion.div
                  key={card.id}
                  whileHover={{ scale: isMatched ? 1 : 1.05 }}
                  whileTap={{ scale: isMatched ? 1 : 0.95 }}
                  onClick={() => handlePictureSelect(card.id)}
                >
                  <Card className={`border-4 transition-all cursor-pointer ${
                    isMatched 
                      ? 'border-green-400 bg-green-50 opacity-50' 
                      : isSelected 
                      ? 'border-purple-500 bg-purple-100 shadow-2xl scale-105' 
                      : 'border-purple-200 hover:border-purple-400 hover:shadow-lg'
                  }`}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-center">
                        <div className="text-5xl sm:text-6xl mb-3">{card.emoji}</div>
                        <div className="text-lg sm:text-xl font-bold text-gray-700">{card.image}</div>
                        {isMatched && <div className="text-4xl mt-2">✓</div>}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Characters Column */}
        <div className="space-y-3">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-blue-600">
            {gameMode === 'katakana' ? '🔤 Find Katakana!' : '🔤 Find Hiragana!'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {shuffledCharacters.map((card) => {
              const isSelected = selectedCharacter === card.id
              const isMatched = matchedPairs.has(card.id)

              return (
                <motion.div
                  key={card.id}
                  whileHover={{ scale: isMatched ? 1 : 1.05 }}
                  whileTap={{ scale: isMatched ? 1 : 0.95 }}
                >
                  <Card className={`border-4 transition-all ${
                    isMatched 
                      ? 'border-green-400 bg-green-50 opacity-50' 
                      : isSelected 
                      ? 'border-blue-500 bg-blue-100 shadow-2xl scale-105' 
                      : 'border-blue-200 hover:border-blue-400 hover:shadow-lg'
                  }`}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-center">
                        <div className="text-5xl sm:text-7xl font-bold mb-2">{card.character}</div>
                        <div className="text-base sm:text-lg text-gray-600">{card.romanji}</div>
                        {isMatched && <div className="text-4xl mt-2">✓</div>}
                      </div>
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

  const renderMemoryGame = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-pink-600">
          🧠 Memory Match Game!
        </h3>
        <p className="text-center text-lg mb-6 text-gray-600">
          Find matching pairs! 🎯
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
          {memoryCards.map((emoji, index) => {
            const isFlipped = flippedCards.includes(index) || matchedMemory.has(index)
            const isMatched = matchedMemory.has(index)

            return (
              <motion.div
                key={index}
                whileHover={{ scale: isMatched ? 1 : 1.05 }}
                whileTap={{ scale: isMatched ? 1 : 0.95 }}
                onClick={() => handleMemoryCardClick(index)}
              >
                <Card className={`border-4 cursor-pointer aspect-square transition-all ${
                  isMatched 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-purple-200 hover:border-purple-400'
                }`}>
                  <CardContent className="p-4 sm:p-6 h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isFlipped ? (
                        <motion.div
                          key="front"
                          initial={{ rotateY: 90 }}
                          animate={{ rotateY: 0 }}
                          exit={{ rotateY: 90 }}
                          transition={{ duration: 0.2 }}
                          className="text-4xl sm:text-6xl"
                        >
                          {emoji}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="back"
                          initial={{ rotateY: 90 }}
                          animate={{ rotateY: 0 }}
                          exit={{ rotateY: 90 }}
                          transition={{ duration: 0.2 }}
                          className="text-4xl sm:text-6xl"
                        >
                          ❓
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <Card className="border-4 sm:border-8 border-yellow-400 bg-white shadow-2xl">
            <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  className="text-8xl sm:text-9xl mb-6"
                >
                  🏆
                </motion.div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-purple-600">
                  🎉 Amazing Job! 🎉
                </h2>
                <p className="text-xl sm:text-2xl lg:text-3xl mb-6 text-pink-600">
                  You're a superstar! ⭐
                </p>
                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-yellow-500 mb-8">
                  {score} Points!
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setShowCelebration(false)
                      startGame(gameMode!)
                    }}
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl px-8 py-6"
                  >
                    <RotateCcw className="w-6 h-6 mr-2" />
                    Play Again!
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCelebration(false)
                      setGameMode(null)
                    }}
                    size="lg"
                    variant="outline"
                    className="text-xl px-8 py-6 border-4"
                  >
                    <ArrowRight className="w-6 h-6 mr-2" />
                    New Game
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!gameMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                🌈 Kids Learning Zone! 🌈
              </span>
            </motion.h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-purple-600 font-bold">
              For Ages 4-8! Learn Japanese with Fun Games! 🎮
            </p>
          </div>

          {/* Game Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {/* Hiragana Game */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startGame('hiragana')}
            >
              <Card className="border-4 border-purple-300 hover:border-purple-500 cursor-pointer shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl mb-4">🍎</div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-purple-600">
                      Hiragana Match
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">
                      Match pictures to Japanese letters!
                    </p>
                    <div className="text-5xl font-bold text-purple-500 mb-2">
                      あいうえお
                    </div>
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white text-lg px-6 py-6 w-full">
                      Start Game! 🚀
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Katakana Game */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startGame('katakana')}
            >
              <Card className="border-4 border-blue-300 hover:border-blue-500 cursor-pointer shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl mb-4">🍦</div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-blue-600">
                      Katakana Match
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">
                      Match pictures to Katakana letters!
                    </p>
                    <div className="text-5xl font-bold text-blue-500 mb-2">
                      アイウエオ
                    </div>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-6 w-full">
                      Start Game! 🚀
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Memory Game */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startGame('memory')}
            >
              <Card className="border-4 border-pink-300 hover:border-pink-500 cursor-pointer shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br from-pink-50 to-rose-50">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl mb-4">🧠</div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-pink-600">
                      Memory Match
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">
                      Find matching pairs of pictures!
                    </p>
                    <div className="text-4xl mb-2">
                      🍎 🍓 🚗 🎾
                    </div>
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-6 w-full">
                      Start Game! 🚀
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Features Section */}
          <Card className="border-4 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="pt-6 pb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-orange-600">
                ✨ Why Kids Love It! ✨
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-5xl mb-2">🎨</div>
                  <h4 className="font-bold text-lg mb-1">Colorful & Fun</h4>
                  <p className="text-gray-600">Bright colors and cute pictures!</p>
                </div>
                <div>
                  <div className="text-5xl mb-2">🎯</div>
                  <h4 className="font-bold text-lg mb-1">Easy to Learn</h4>
                  <p className="text-gray-600">Perfect for ages 4-8!</p>
                </div>
                <div>
                  <div className="text-5xl mb-2">🏆</div>
                  <h4 className="font-bold text-lg mb-1">Earn Points</h4>
                  <p className="text-gray-600">Get rewards for matching!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Game Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {gameMode === 'hiragana' ? '🍎 Hiragana Match!' : gameMode === 'katakana' ? '🍦 Katakana Match!' : '🧠 Memory Game!'}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-purple-600 font-bold">
            {gameMode === 'memory' ? 'Find the matching pairs!' : 'Match the pictures to the letters!'}
          </p>
        </div>

        {/* Score Display */}
        <div className="flex justify-center gap-4 mb-4 sm:mb-6">
          <Card className="border-4 border-yellow-300 bg-yellow-50">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" fill="currentColor" />
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Score</div>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-600">{score}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-4 border-purple-300 bg-purple-50">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" fill="currentColor" />
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Matched</div>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                    {gameMode === 'memory' ? matchedMemory.size / 2 : matchedPairs.size} / {gameMode === 'memory' ? memoryCards.length / 2 : getCurrentCards().length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mb-4">
          <Button
            onClick={() => setGameMode(null)}
            variant="outline"
            className="border-4 border-gray-300 text-lg px-6 py-6"
          >
            ← Back to Games
          </Button>
        </div>

        {/* Game Area */}
        {gameMode === 'memory' ? renderMemoryGame() : renderMatchingGame()}
      </div>
    </div>
  )
}
