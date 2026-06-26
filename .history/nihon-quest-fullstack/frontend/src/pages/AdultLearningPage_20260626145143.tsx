import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Volume2, CheckCircle, XCircle, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import confetti from 'canvas-confetti'
import { InlineFurigana } from '@/components/Furigana'

type ExerciseMode = 'fill-blank' | 'build-sentence' | 'conversation' | 'speaking' | null

interface FillBlankExercise {
  id: string
  sentence: string
  kana: string
  blank: string
  options: string[]
  correctAnswer: string
  explanation: string
  level: 'N5' | 'N4' | 'N3'
}

interface SentenceBuilderExercise {
  id: string
  english: string
  words: string[]
  correctOrder: string[]
  hint: string
  level: 'N5' | 'N4' | 'N3'
}

interface ConversationExercise {
  id: string
  context: string
  prompt: string
  correctResponse: string
  alternatives: string[]
  explanation: string
  level: 'N5' | 'N4' | 'N3'
}

const FILL_BLANK_EXERCISES: FillBlankExercise[] = [
  {
    id: 'fb1',
    sentence: '私___学生です。',
    kana: 'わたし___がくせいです',
    blank: 'は',
    options: ['は', 'が', 'を', 'に'],
    correctAnswer: 'は',
    explanation: 'は marks the topic of the sentence. "As for me, (I am) a student."',
    level: 'N5'
  },
  {
    id: 'fb2',
    sentence: '寿司___食べます。',
    kana: 'すし___たべます',
    blank: 'を',
    options: ['を', 'に', 'で', 'から'],
    correctAnswer: 'を',
    explanation: 'を marks the direct object. "I eat sushi."',
    level: 'N5'
  },
  {
    id: 'fb3',
    sentence: '図書館___勉強します。',
    kana: 'としょかん___べんきょうします',
    blank: 'で',
    options: ['で', 'に', 'へ', 'と'],
    correctAnswer: 'で',
    explanation: 'で marks the location where an action takes place. "I study at the library."',
    level: 'N5'
  },
  {
    id: 'fb4',
    sentence: 'レックス___パンツ___忘れないでください。',
    kana: 'れっくす___ぱんつ___わすれないでください',
    blank: 'の...を',
    options: ['の...を', 'が...に', 'を...で', 'は...が'],
    correctAnswer: 'の...を',
    explanation: 'の shows possession (Lex\'s), を marks the object. "Please don\'t forget Lex\'s underwear."',
    level: 'N4'
  }
]

const SENTENCE_BUILDER_EXERCISES: SentenceBuilderExercise[] = [
  {
    id: 'sb1',
    english: 'I eat sushi.',
    words: ['私は', '寿司を', '食べます', '。'],
    correctOrder: ['私は', '寿司を', '食べます', '。'],
    hint: 'Remember: Japanese is SOV (Subject-Object-Verb)',
    level: 'N5'
  },
  {
    id: 'sb2',
    english: 'The student reads a book.',
    words: ['学生が', '本を', '読みます', '。'],
    correctOrder: ['学生が', '本を', '読みます', '。'],
    hint: 'Object comes before verb in Japanese',
    level: 'N5'
  },
  {
    id: 'sb3',
    english: "Please don't forget Lex's underwear.",
    words: ['レックスの', 'パンツを', '忘れないでください', '。'],
    correctOrder: ['レックスの', 'パンツを', '忘れないでください', '。'],
    hint: 'Possessive (の) + Object (を) + Negative request',
    level: 'N4'
  },
  {
    id: 'sb4',
    english: 'I study at the library every day.',
    words: ['私は', '毎日', '図書館で', '勉強します', '。'],
    correctOrder: ['私は', '毎日', '図書館で', '勉強します', '。'],
    hint: 'Time + Location + Action',
    level: 'N4'
  }
]

const CONVERSATION_EXERCISES: ConversationExercise[] = [
  {
    id: 'conv1',
    context: 'Meeting someone for the first time at a party',
    prompt: 'The other person says: はじめまして。田中です。(Nice to meet you. I\'m Tanaka.)',
    correctResponse: 'はじめまして。[Your name]です。よろしくお願いします。',
    alternatives: ['こんにちは、田中さん。', 'はじめまして。よろしく。'],
    explanation: 'This is the polite formal introduction. Add よろしくお願いします at the end.',
    level: 'N5'
  },
  {
    id: 'conv2',
    context: 'At a restaurant, ordering food',
    prompt: 'Server asks: ご注文は？(Your order?)',
    correctResponse: 'すみません、寿司をください。',
    alternatives: ['寿司をお願いします。', 'これをください。'],
    explanation: 'ください is the polite way to request something. すみません gets attention first.',
    level: 'N5'
  },
  {
    id: 'conv3',
    context: 'Asking a coworker for help',
    prompt: 'You need to borrow a pen',
    correctResponse: 'すみません、ペンを貸してください。',
    alternatives: ['ペンを貸してくれませんか。', 'ペンをお願いします。'],
    explanation: '貸してください means "please lend me". This is polite for workplace.',
    level: 'N5'
  },
  {
    id: 'conv4',
    context: 'Parent reminding child (casual register)',
    prompt: 'Remind your child not to forget their homework',
    correctResponse: '宿題、忘れちゃダメよ。',
    alternatives: ['宿題を忘れないでね。', '宿題を忘れないように。'],
    explanation: 'Casual form with ちゃダメ contraction. よ adds emphasis. Used with family.',
    level: 'N4'
  }
]

export default function AdultLearningPage() {
  const [mode, setMode] = useState<ExerciseMode>(null)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [sentenceBlocks, setSentenceBlocks] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [feedback, setFeedback] = useState('')

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.7
    window.speechSynthesis.speak(utterance)
  }

  const checkFillBlankAnswer = (answer: string) => {
    const exercise = FILL_BLANK_EXERCISES[currentExercise]
    const correct = answer === exercise.correctAnswer

    setIsCorrect(correct)
    setFeedback(correct ? '✓ Correct!' : `✗ Wrong. The correct answer is: ${exercise.correctAnswer}`)
    setShowFeedback(true)

    if (correct) {
      setScore(score + 10)
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      })
    }

    setTimeout(() => {
      if (currentExercise < FILL_BLANK_EXERCISES.length - 1) {
        setCurrentExercise(currentExercise + 1)
        setShowFeedback(false)
      }
    }, 3000)
  }

  const checkSentenceBuilder = () => {
    const exercise = SENTENCE_BUILDER_EXERCISES[currentExercise]
    const correct = JSON.stringify(sentenceBlocks) === JSON.stringify(exercise.correctOrder)

    setIsCorrect(correct)
    setFeedback(correct ? '✓ Perfect sentence!' : '✗ Not quite. Check the word order.')
    setShowFeedback(true)

    if (correct) {
      setScore(score + 15)
      confetti({
        particleCount: 100,
        spread: 70
      })

      setTimeout(() => {
        if (currentExercise < SENTENCE_BUILDER_EXERCISES.length - 1) {
          setCurrentExercise(currentExercise + 1)
          setSentenceBlocks([])
          setShowFeedback(false)
        }
      }, 3000)
    }
  }

  const checkConversation = () => {
    const exercise = CONVERSATION_EXERCISES[currentExercise]
    const userAnswerNormalized = userAnswer.trim().replace(/\s+/g, '')
    const correctNormalized = exercise.correctResponse.replace(/\s+/g, '')
    
    const correct = userAnswerNormalized.includes(correctNormalized.substring(0, 10))

    setIsCorrect(correct)
    setFeedback(correct ? '✓ Good response!' : `Sample answer: ${exercise.correctResponse}`)
    setShowFeedback(true)

    if (correct) {
      setScore(score + 20)
      confetti({
        particleCount: 80,
        spread: 60
      })
    }

    setTimeout(() => {
      if (currentExercise < CONVERSATION_EXERCISES.length - 1) {
        setCurrentExercise(currentExercise + 1)
        setUserAnswer('')
        setShowFeedback(false)
      }
    }, 4000)
  }

  const resetExercise = () => {
    setCurrentExercise(0)
    setScore(0)
    setUserAnswer('')
    setSentenceBlocks([])
    setShowFeedback(false)
    setMode(null)
  }

  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                🎓 Adult Learning Mode
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600">
              Master Japanese through practice and conversation!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setMode('fill-blank')}
            >
              <Card className="border-4 border-blue-300 hover:border-blue-500 cursor-pointer shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-6xl mb-3">📝</div>
                    <div className="text-2xl sm:text-3xl text-blue-600">Fill in the Blanks</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600 mb-4">
                    Practice particles and grammar points
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="font-mono">私___ 学生です。</p>
                    <p className="text-xs text-gray-500 mt-1">Choose: は, が, を, に</p>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-lg py-6">
                    Start Practice →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setMode('build-sentence')}
            >
              <Card className="border-4 border-green-300 hover:border-green-500 cursor-pointer shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-6xl mb-3">🏗️</div>
                    <div className="text-2xl sm:text-3xl text-green-600">Build Sentences</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600 mb-4">
                    Arrange words in correct SOV order
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="font-bold mb-2">English: I eat sushi</p>
                    <div className="flex flex-wrap gap-2">
                      {['私は', '寿司を', '食べます'].map((word, i) => (
                        <span key={i} className="bg-green-100 px-2 py-1 rounded">{word}</span>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-lg py-6">
                    Start Building →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setMode('conversation')}
            >
              <Card className="border-4 border-purple-300 hover:border-purple-500 cursor-pointer shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-6xl mb-3">💬</div>
                    <div className="text-2xl sm:text-3xl text-purple-600">Conversation Practice</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600 mb-4">
                    Learn real-world conversations
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="font-bold mb-1">Context: At a restaurant</p>
                    <p className="text-gray-700">Server: ご注文は？</p>
                    <p className="text-xs text-gray-500 mt-1">How do you respond?</p>
                  </div>
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-lg py-6">
                    Start Conversations →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Card className="border-4 border-orange-300 hover:border-orange-500 cursor-pointer shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br from-orange-50 to-amber-50 opacity-75">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-6xl mb-3">🎤</div>
                    <div className="text-2xl sm:text-3xl text-orange-600">Speaking Practice</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600 mb-4">
                    Record and improve pronunciation
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="text-center">🎙️ Voice recognition</p>
                    <p className="text-xs text-gray-500 mt-1 text-center">Pronunciation feedback</p>
                  </div>
                  <Button className="w-full mt-4 bg-gray-400 text-lg py-6" disabled>
                    Coming Soon! 🔜
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Card className="mt-6 border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-yellow-900 mb-2">💡 Study Tip:</p>
                  <p className="text-sm text-yellow-800">
                    Practice these exercises daily for 15-20 minutes. Combine with the Grammar Learning mode
                    and your Study Journal to track progress. Remember: consistency beats intensity!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Fill in the Blank Mode
  if (mode === 'fill-blank') {
    const exercise = FILL_BLANK_EXERCISES[currentExercise]

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center mb-4">
            <Button onClick={resetExercise} variant="outline">
              ← Back
            </Button>
            <div className="flex gap-3">
              <div className="bg-white px-4 py-2 rounded-lg shadow">
                <span className="font-bold text-blue-600">{currentExercise + 1}</span> / {FILL_BLANK_EXERCISES.length}
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow">
                ⭐ <span className="font-bold text-yellow-600">{score}</span>
              </div>
            </div>
          </div>

          <Card className="border-4 border-blue-300 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
              <CardTitle className="text-center">
                <div className="text-4xl mb-2">📝</div>
                <div className="text-2xl">Fill in the Blank - {exercise.level}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
                  {exercise.sentence}
                </div>
                <div className="text-xl text-gray-600 mb-6">
                  {exercise.kana}
                </div>
                <Button
                  onClick={() => playAudio(exercise.sentence.replace('___', exercise.correctAnswer))}
                  variant="outline"
                  size="lg"
                >
                  <Volume2 className="w-5 h-5 mr-2" />
                  Hear Full Sentence
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                {exercise.options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => checkFillBlankAnswer(option)}
                    disabled={showFeedback}
                    size="lg"
                    variant="outline"
                    className="text-2xl py-8 border-2 hover:border-blue-500 hover:bg-blue-50"
                  >
                    {option}
                  </Button>
                ))}
              </div>

              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className={`border-4 ${isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                          )}
                          <div>
                            <p className="text-xl font-bold mb-2">{feedback}</p>
                            <p className="text-gray-700">{exercise.explanation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Sentence Builder Mode
  if (mode === 'build-sentence') {
    const exercise = SENTENCE_BUILDER_EXERCISES[currentExercise]
    const availableWords = exercise.words.filter(w => !sentenceBlocks.includes(w))

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center mb-4">
            <Button onClick={resetExercise} variant="outline">
              ← Back
            </Button>
            <div className="flex gap-3">
              <div className="bg-white px-4 py-2 rounded-lg shadow">
                <span className="font-bold text-green-600">{currentExercise + 1}</span> / {SENTENCE_BUILDER_EXERCISES.length}
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow">
                ⭐ <span className="font-bold text-yellow-600">{score}</span>
              </div>
            </div>
          </div>

          <Card className="border-4 border-green-300 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
              <CardTitle className="text-center">
                <div className="text-4xl mb-2">🏗️</div>
                <div className="text-2xl">Build the Sentence - {exercise.level}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-6">
                <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  English: {exercise.english}
                </p>
                <p className="text-sm text-gray-600 italic">💡 {exercise.hint}</p>
              </div>

              {/* User's sentence */}
              <div className="bg-white p-4 rounded-lg border-2 border-green-300 min-h-[80px] mb-6">
                <p className="text-xs text-gray-500 mb-2">Your sentence:</p>
                <div className="flex flex-wrap gap-2">
                  {sentenceBlocks.length === 0 ? (
                    <span className="text-gray-400">Tap words below to build your sentence...</span>
                  ) : (
                    sentenceBlocks.map((word, index) => (
                      <motion.button
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={() => setSentenceBlocks(sentenceBlocks.filter((_, i) => i !== index))}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-bold hover:bg-green-600"
                      >
                        {word}
                      </motion.button>
                    ))
                  )}
                </div>
              </div>

              {/* Available words */}
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {availableWords.map((word, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSentenceBlocks([...sentenceBlocks, word])}
                    className="bg-gray-100 border-2 border-gray-300 px-4 py-2 rounded-lg text-lg font-bold hover:border-green-500 hover:bg-green-50"
                  >
                    {word}
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={checkSentenceBuilder}
                  disabled={sentenceBlocks.length === 0 || showFeedback}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-6"
                >
                  Check Answer
                </Button>
                <Button
                  onClick={() => setSentenceBlocks([])}
                  variant="outline"
                  className="px-6"
                >
                  Reset
                </Button>
              </div>

              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <Card className={`border-4 ${isCorrect ? 'border-green-400 bg-green-50' : 'border-orange-400 bg-orange-50'}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                          ) : (
                            <Lightbulb className="w-8 h-8 text-orange-600 flex-shrink-0" />
                          )}
                          <div>
                            <p className="text-xl font-bold mb-2">{feedback}</p>
                            {!isCorrect && (
                              <div>
                                <p className="text-gray-700 mb-2">Correct order:</p>
                                <div className="flex flex-wrap gap-2">
                                  {exercise.correctOrder.map((word, i) => (
                                    <span key={i} className="bg-green-200 px-3 py-1 rounded font-bold">
                                      {word}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Conversation Mode
  if (mode === 'conversation') {
    const exercise = CONVERSATION_EXERCISES[currentExercise]

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center mb-4">
            <Button onClick={resetExercise} variant="outline">
              ← Back
            </Button>
            <div className="flex gap-3">
              <div className="bg-white px-4 py-2 rounded-lg shadow">
                <span className="font-bold text-purple-600">{currentExercise + 1}</span> / {CONVERSATION_EXERCISES.length}
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow">
                ⭐ <span className="font-bold text-yellow-600">{score}</span>
              </div>
            </div>
          </div>

          <Card className="border-4 border-purple-300 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
              <CardTitle className="text-center">
                <div className="text-4xl mb-2">💬</div>
                <div className="text-2xl">Conversation Practice - {exercise.level}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <div className="mb-6">
                <div className="bg-indigo-100 p-4 rounded-lg mb-4">
                  <p className="text-sm text-indigo-700 font-bold mb-1">Context:</p>
                  <p className="text-indigo-900">{exercise.context}</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-purple-300 mb-6">
                  <p className="text-xl font-bold text-purple-600 mb-3">
                    <InlineFurigana word={exercise.prompt.split(':')[1] || exercise.prompt} reading="" />
                  </p>
                  <Button
                    onClick={() => playAudio(exercise.prompt.split(':')[1] || exercise.prompt)}
                    variant="outline"
                    size="sm"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Hear
                  </Button>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-700 mb-2">Your response:</p>
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your response in Japanese..."
                    className="w-full p-4 border-2 border-purple-300 rounded-lg min-h-[100px] text-lg"
                    disabled={showFeedback}
                  />
                </div>

                <Button
                  onClick={checkConversation}
                  disabled={!userAnswer.trim() || showFeedback}
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-lg py-6"
                >
                  Submit Response
                </Button>
              </div>

              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className={`border-4 ${isCorrect ? 'border-green-400 bg-green-50' : 'border-blue-400 bg-blue-50'}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                          ) : (
                            <MessageSquare className="w-8 h-8 text-blue-600 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-xl font-bold mb-3">{feedback}</p>
                            <div className="bg-white p-3 rounded-lg mb-3">
                              <p className="text-sm font-bold text-gray-700 mb-1">Sample answer:</p>
                              <p className="text-lg text-purple-600 font-bold mb-2">{exercise.correctResponse}</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{exercise.explanation}</p>
                            {exercise.alternatives.length > 0 && (
                              <div className="mt-3">
                                <p className="text-sm font-bold text-gray-700 mb-1">Other good responses:</p>
                                {exercise.alternatives.map((alt, i) => (
                                  <p key={i} className="text-sm text-gray-600 ml-4">• {alt}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}
