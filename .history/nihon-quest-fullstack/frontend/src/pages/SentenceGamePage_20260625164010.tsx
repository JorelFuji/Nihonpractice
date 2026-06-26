import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, Star, Trophy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import confetti from 'canvas-confetti'

interface SentencePart {
  id: string
  japanese: string
  romaji: string
  english: string
  type: 'subject' | 'object' | 'verb'
  emoji: string
}

interface Sentence {
  id: number
  subject: SentencePart
  object: SentencePart
  verb: SentencePart
  english: string
  hint: string
}

const sentences: Sentence[] = [
  {
    id: 1,
    subject: { id: 's1', japanese: '私は', romaji: 'watashi wa', english: 'I', type: 'subject', emoji: '👤' },
    object: { id: 'o1', japanese: '寿司を', romaji: 'sushi o', english: 'sushi', type: 'object', emoji: '🍣' },
    verb: { id: 'v1', japanese: '食べます', romaji: 'tabemasu', english: 'eat', type: 'verb', emoji: '🍽️' },
    english: 'I eat sushi',
    hint: 'Japanese order: I + sushi + eat'
  },
  {
    id: 2,
    subject: { id: 's2', japanese: '彼は', romaji: 'kare wa', english: 'He', type: 'subject', emoji: '👨' },
    object: { id: 'o2', japanese: '水を', romaji: 'mizu o', english: 'water', type: 'object', emoji: '💧' },
    verb: { id: 'v2', japanese: '飲みます', romaji: 'nomimasu', english: 'drink', type: 'verb', emoji: '🥤' },
    english: 'He drinks water',
    hint: 'Japanese order: He + water + drink'
  },
  {
    id: 3,
    subject: { id: 's3', japanese: '私は', romaji: 'watashi wa', english: 'I', type: 'subject', emoji: '👤' },
    object: { id: 'o3', japanese: '本を', romaji: 'hon o', english: 'book', type: 'object', emoji: '📖' },
    verb: { id: 'v3', japanese: '読みます', romaji: 'yomimasu', english: 'read', type: 'verb', emoji: '📚' },
    english: 'I read a book',
    hint: 'Japanese order: I + book + read'
  },
  {
    id: 4,
    subject: { id: 's4', japanese: '猫が', romaji: 'neko ga', english: 'Cat', type: 'subject', emoji: '🐱' },
    object: { id: 'o4', japanese: '魚を', romaji: 'sakana o', english: 'fish', type: 'object', emoji: '🐟' },
    verb: { id: 'v4', japanese: '食べます', romaji: 'tabemasu', english: 'eat', type: 'verb', emoji: '😋' },
    english: 'The cat eats fish',
    hint: 'Japanese order: Cat + fish + eat'
  },
  {
    id: 5,
    subject: { id: 's5', japanese: '学生が', romaji: 'gakusei ga', english: 'Student', type: 'subject', emoji: '👨‍🎓' },
    object: { id: 'o5', japanese: '日本語を', romaji: 'nihongo o', english: 'Japanese', type: 'object', emoji: '🇯🇵' },
    verb: { id: 'v5', japanese: '勉強します', romaji: 'benkyou shimasu', english: 'study', type: 'verb', emoji: '📝' },
    english: 'The student studies Japanese',
    hint: 'Japanese order: Student + Japanese + study'
  },
  {
    id: 6,
    subject: { id: 's6', japanese: '友達が', romaji: 'tomodachi ga', english: 'Friend', type: 'subject', emoji: '👥' },
    object: { id: 'o6', japanese: '音楽を', romaji: 'ongaku o', english: 'music', type: 'object', emoji: '🎵' },
    verb: { id: 'v6', japanese: '聞きます', romaji: 'kikimasu', english: 'listen to', type: 'verb', emoji: '🎧' },
    english: 'My friend listens to music',
    hint: 'Japanese order: Friend + music + listen'
  }
]

export default function SentenceGamePage() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [selectedParts, setSelectedParts] = useState<SentencePart[]>([])
  const [availableParts, setAvailableParts] = useState<SentencePart[]>([])
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const currentSentence = sentences[currentSentenceIndex]

  useEffect(() => {
    resetSentence()
  }, [currentSentenceIndex])

  const resetSentence = () => {
    const parts = [currentSentence.subject, currentSentence.object, currentSentence.verb]
    setAvailableParts(shuffleArray([...parts]))
    setSelectedParts([])
    setShowFeedback(false)
    setShowHint(false)
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleSelectPart = (part: SentencePart) => {
    if (selectedParts.length < 3) {
      setSelectedParts([...selectedParts, part])
      setAvailableParts(availableParts.filter(p => p.id !== part.id))
    }
  }

  const handleRemovePart = (part: SentencePart) => {
    setSelectedParts(selectedParts.filter(p => p.id !== part.id))
    setAvailableParts([...availableParts, part])
  }

  const checkAnswer = () => {
    if (selectedParts.length !== 3) return

    const correct = 
      selectedParts[0].type === 'subject' &&
      selectedParts[1].type === 'object' &&
      selectedParts[2].type === 'verb'

    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setScore(score + 10)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      
      setTimeout(() => {
        if (currentSentenceIndex < sentences.length - 1) {
          setCurrentSentenceIndex(currentSentenceIndex + 1)
        } else {
          // Game complete
          confetti({
            particleCount: 200,
            spread: 160,
            origin: { y: 0.6 }
          })
        }
      }, 2000)
    }
  }

  const restartGame = () => {
    setCurrentSentenceIndex(0)
    setScore(0)
    setShowFeedback(false)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'subject': return 'from-pink-400 to-pink-600'
      case 'object': return 'from-blue-400 to-blue-600'
      case 'verb': return 'from-purple-400 to-purple-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'subject': return '👤 Subject'
      case 'object': return '📦 Object'
      case 'verb': return '⚡ Verb'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              ✨ Kawaii Sentence Builder ✨
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Learn Japanese SOV (Subject-Object-Verb) order! 🎌
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 text-lg">
            <div className="flex items-center gap-2 bg-white rounded-full px-6 py-2 shadow-md">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">{score}</span> points
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full px-6 py-2 shadow-md">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="font-bold">{currentSentenceIndex + 1}</span> / {sentences.length}
            </div>
          </div>
        </div>

        {currentSentenceIndex < sentences.length ? (
          <>
            {/* Explanation Card */}
            <Card className="mb-6 border-4 border-purple-200">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold mb-2">🎯 Your Mission:</h3>
                  <p className="text-lg mb-2">Build this English sentence in Japanese word order:</p>
                  <p className="text-3xl font-bold text-primary mb-4">"{currentSentence.english}"</p>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-2">💡 Remember:</p>
                    <p className="text-lg font-semibold">
                      English: <span className="text-pink-600">Subject</span> + <span className="text-purple-600">Verb</span> + <span className="text-blue-600">Object</span>
                    </p>
                    <p className="text-lg font-semibold">
                      Japanese: <span className="text-pink-600">Subject</span> + <span className="text-blue-600">Object</span> + <span className="text-purple-600">Verb</span>
                    </p>
                  </div>

                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3"
                    >
                      <p className="text-sm">💭 Hint: {currentSentence.hint}</p>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Selected Parts Area */}
            <Card className="mb-6 border-4 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-center mb-4">
                  🎌 Your Japanese Sentence:
                </h3>
                <div className="flex justify-center gap-4 min-h-[120px] items-center">
                  {selectedParts.length === 0 ? (
                    <p className="text-muted-foreground text-lg">Select words below to build your sentence! 👇</p>
                  ) : (
                    <AnimatePresence>
                      {selectedParts.map((part, index) => (
                        <motion.div
                          key={part.id}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                          onClick={() => handleRemovePart(part)}
                          className={`cursor-pointer bg-gradient-to-br ${getTypeColor(part.type)} text-white rounded-2xl p-4 shadow-lg hover:scale-110 transition-transform`}
                        >
                          <div className="text-center">
                            <div className="text-4xl mb-2">{part.emoji}</div>
                            <div className="text-2xl font-bold mb-1">{part.japanese}</div>
                            <div className="text-sm opacity-90">{part.romaji}</div>
                            <div className="text-xs mt-1 bg-white/30 rounded px-2 py-1">
                              {part.english}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {selectedParts.length > 0 && (
                  <div className="flex justify-center gap-4 mt-6">
                    <Button
                      onClick={checkAnswer}
                      disabled={selectedParts.length !== 3 || showFeedback}
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Check Answer!
                    </Button>
                    <Button
                      onClick={resetSentence}
                      variant="outline"
                      size="lg"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Reset
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-6"
                >
                  <Card className={`border-4 ${isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'}`}>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{isCorrect ? '🎉' : '😅'}</div>
                        <h3 className="text-2xl font-bold mb-2">
                          {isCorrect ? 'Perfect! 素晴らしい！' : 'Not quite! もう一度！'}
                        </h3>
                        <p className="text-lg">
                          {isCorrect ? (
                            <>You got it right! +10 points! 🌟</>
                          ) : (
                            <>Try again! Remember the Japanese order: Subject → Object → Verb</>
                          )}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Available Parts */}
            <Card className="border-4 border-pink-200">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-center mb-4">
                  📝 Available Words:
                </h3>
                <div className="flex justify-center gap-4 flex-wrap">
                  {availableParts.map((part) => (
                    <motion.div
                      key={part.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSelectPart(part)}
                      className={`cursor-pointer bg-gradient-to-br ${getTypeColor(part.type)} text-white rounded-2xl p-4 shadow-lg`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2">{part.emoji}</div>
                        <div className="text-2xl font-bold mb-1">{part.japanese}</div>
                        <div className="text-sm opacity-90">{part.romaji}</div>
                        <div className="text-xs mt-1 bg-white/30 rounded px-2 py-1">
                          {part.english}
                        </div>
                        <div className="text-xs mt-2 font-semibold">
                          {getTypeBadge(part.type)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Button
                    onClick={() => setShowHint(!showHint)}
                    variant="outline"
                    size="sm"
                  >
                    💡 {showHint ? 'Hide' : 'Show'} Hint
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Game Complete */
          <Card className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <div className="text-8xl mb-6">🏆</div>
                <h2 className="text-4xl font-bold mb-4">
                  おめでとうございます！
                </h2>
                <p className="text-2xl mb-6">Congratulations! You completed all sentences!</p>
                <div className="text-6xl font-bold text-primary mb-8">
                  {score} Points!
                </div>
                <p className="text-xl mb-8">
                  You've mastered the Japanese SOV sentence structure! 🎌✨
                </p>
                <Button
                  onClick={restartGame}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Play Again!
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Learning Reference */}
        <Card className="mt-8 border-2 border-purple-100">
          <CardContent className="pt-6">
            <h4 className="font-bold text-lg mb-3 text-center">📚 Quick Reference:</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-3 rounded-lg">
                <p className="font-bold text-pink-700 mb-1">👤 Subject (主語)</p>
                <p>Who or what does the action</p>
                <p className="text-xs mt-1">は (wa) / が (ga)</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
                <p className="font-bold text-blue-700 mb-1">📦 Object (目的語)</p>
                <p>What receives the action</p>
                <p className="text-xs mt-1">を (o/wo)</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg">
                <p className="font-bold text-purple-700 mb-1">⚡ Verb (動詞)</p>
                <p>The action itself</p>
                <p className="text-xs mt-1">Always at the end!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
