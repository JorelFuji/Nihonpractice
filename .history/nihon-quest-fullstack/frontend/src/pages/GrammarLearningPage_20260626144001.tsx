import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Lightbulb, MessageCircle, Volume2, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import confetti from 'canvas-confetti'
import Furigana, { InlineFurigana } from '@/components/Furigana'

type LearningMode = 'sov' | 'registers' | 'particles' | null

interface SentenceExample {
  japanese: string
  kana: string
  romaji: string
  english: string
  structure: string
  register: 'casual' | 'polite' | 'formal'
  emoji: string
}

const SOV_EXAMPLES: SentenceExample[] = [
  {
    japanese: 'ママ、レックスのパンツ忘れちゃダメよ',
    kana: 'ママ、レックスのパンツわすれちゃダメよ',
    romaji: 'Mama, Rekkusu no pantsu wasurecha dame yo',
    english: "Mom, don't forget Lex's underwear!",
    structure: '[Subject] [Object] [Verb]',
    register: 'casual',
    emoji: '👨‍👩‍👧'
  },
  {
    japanese: '私は寿司を食べます',
    kana: 'わたしはすしをたべます',
    romaji: 'Watashi wa sushi o tabemasu',
    english: 'I eat sushi',
    structure: 'I (S) sushi (O) eat (V)',
    register: 'polite',
    emoji: '🍣'
  },
  {
    japanese: '学生が本を読みます',
    kana: 'がくせいがほんをよみます',
    romaji: 'Gakusei ga hon o yomimasu',
    english: 'The student reads a book',
    structure: 'Student (S) book (O) read (V)',
    register: 'polite',
    emoji: '📚'
  },
  {
    japanese: '猫がネズミを追いかける',
    kana: 'ねこがねずみをおいかける',
    romaji: 'Neko ga nezumi o oikakeru',
    english: 'The cat chases the mouse',
    structure: 'Cat (S) mouse (O) chase (V)',
    register: 'casual',
    emoji: '🐱'
  }
]

const REGISTER_EXAMPLES: SentenceExample[] = [
  {
    japanese: 'レックスのパンツ、忘れちゃダメよ',
    kana: 'レックスのパンツ、わすれちゃダメよ',
    romaji: 'Rekkusu no pantsu, wasurecha dame yo',
    english: "Don't forget Lex's underwear (family)",
    structure: 'Casual contraction',
    register: 'casual',
    emoji: '👶'
  },
  {
    japanese: 'レックスのパンツを忘れないでください',
    kana: 'レックスのパンツをわすれないでください',
    romaji: 'Rekkusu no pantsu o wasurenaide kudasai',
    english: "Please don't forget Lex's underwear (polite)",
    structure: 'Polite form',
    register: 'polite',
    emoji: '🙇'
  },
  {
    japanese: 'レックスの着替えをお忘れなきよう',
    kana: 'レックスのきがえをおわすれなきよう',
    romaji: 'Rekkusu no kigae o owasure naki you',
    english: "Please do not forget Lex's change of clothes (formal)",
    structure: 'Formal/keigo',
    register: 'formal',
    emoji: '💼'
  }
]

export default function GrammarLearningPage() {
  const [mode, setMode] = useState<LearningMode>(null)
  const [currentExample, setCurrentExample] = useState(0)
  const [score, setScore] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.7
    window.speechSynthesis.speak(utterance)
  }

  const examples = mode === 'sov' ? SOV_EXAMPLES : mode === 'registers' ? REGISTER_EXAMPLES : []

  const handleCorrect = () => {
    setScore(score + 10)
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    })
    setTimeout(() => {
      if (currentExample < examples.length - 1) {
        setCurrentExample(currentExample + 1)
        setShowAnswer(false)
      } else {
        confetti({
          particleCount: 200,
          spread: 160
        })
      }
    }, 1500)
  }

  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-6 sm:mb-8">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                📚 Grammar Learning Zone! 📚
              </span>
            </motion.h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-purple-600 font-bold">
              Master Japanese Sentence Structure! N5→N1
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMode('sov')}
            >
              <Card className="border-4 border-indigo-300 hover:border-indigo-500 cursor-pointer shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br from-indigo-50 to-blue-50">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl mb-4">🔄</div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-indigo-600">
                      SOV vs SVO
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">
                      Japanese is Subject-Object-Verb!
                    </p>
                    <div className="bg-white p-3 rounded-lg mb-2">
                      <p className="text-sm font-mono text-left">
                        🇯🇵 私は 寿司を 食べます<br/>
                        📍 I (S) sushi (O) eat (V)
                      </p>
                    </div>
                    <Button className="bg-indigo-500 hover:bg-indigo-600 text-white text-lg px-6 py-6 w-full">
                      Learn SOV! 🚀
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMode('registers')}
            >
              <Card className="border-4 border-purple-300 hover:border-purple-500 cursor-pointer shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl mb-4">🎭</div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-purple-600">
                      Casual vs Polite
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">
                      Kids, friends, or formal speech?
                    </p>
                    <div className="bg-white p-3 rounded-lg mb-2">
                      <p className="text-xs text-left space-y-1">
                        <span className="block">👶 <strong>Casual:</strong> 忘れちゃダメ</span>
                        <span className="block">🙇 <strong>Polite:</strong> 忘れないでください</span>
                        <span className="block">💼 <strong>Formal:</strong> お忘れなきよう</span>
                      </p>
                    </div>
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white text-lg px-6 py-6 w-full">
                      Learn Registers! 🎯
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="border-4 border-pink-300 hover:border-pink-500 cursor-pointer shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br from-pink-50 to-rose-50">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl mb-4">⚡</div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-pink-600">
                      Particles
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">
                      は, を, に, で, の, が...
                    </p>
                    <div className="bg-white p-3 rounded-lg mb-2">
                      <p className="text-sm text-left">
                        • <strong>の</strong> = possessive ('s)<br/>
                        • <strong>を</strong> = direct object<br/>
                        • <strong>は</strong> = topic marker
                      </p>
                    </div>
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-6 w-full" disabled>
                      Coming Soon! 🔜
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Card className="border-4 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="pt-6 pb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-orange-600">
                ✨ Learning Path: N5 → N1 ✨
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">🌱</div>
                  <h4 className="font-bold text-lg mb-1">N5</h4>
                  <p className="text-sm text-gray-600">Basic patterns<br/>~6 months</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🌿</div>
                  <h4 className="font-bold text-lg mb-1">N4</h4>
                  <p className="text-sm text-gray-600">Simple sentences<br/>+6 months</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🌳</div>
                  <h4 className="font-bold text-lg mb-1">N3</h4>
                  <p className="text-sm text-gray-600">Conversations<br/>+9 months</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🌲</div>
                  <h4 className="font-bold text-lg mb-1">N2</h4>
                  <p className="text-sm text-gray-600">Read news<br/>+1-2 years</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🏔️</div>
                  <h4 className="font-bold text-lg mb-1">N1</h4>
                  <p className="text-sm text-gray-600">Native content<br/>+1-2 years</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentSentence = examples[currentExample]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => setMode(null)} variant="outline">
            ← Back
          </Button>
          <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <span className="font-bold text-indigo-600">{currentExample + 1}</span> / {examples.length}
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              ⭐ <span className="font-bold text-yellow-600">{score}</span>
            </div>
          </div>
        </div>

        <Card className="border-4 border-indigo-300 shadow-2xl mb-6">
          <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
            <CardTitle className="text-center">
              <div className="text-5xl mb-2">{currentSentence.emoji}</div>
              <div className="text-2xl sm:text-3xl">
                {mode === 'sov' ? 'SOV Word Order' : 'Register: ' + currentSentence.register}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 pb-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="text-4xl font-bold mb-2 text-indigo-600">
                      <InlineFurigana word={currentSentence.japanese} reading={currentSentence.kana} />
                    </div>
                    <div className="text-xl text-gray-600 mb-2">{currentSentence.kana}</div>
                    <div className="text-lg text-gray-500 italic">{currentSentence.romaji}</div>
                  </div>
                  <Button
                    onClick={() => playAudio(currentSentence.japanese)}
                    className="bg-blue-500 hover:bg-blue-600"
                    size="lg"
                  >
                    <Volume2 className="w-6 h-6" />
                  </Button>
                </div>
                
                <AnimatePresence mode="wait">
                  {showAnswer ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="border-t-2 pt-4">
                        <div className="flex items-start gap-2 mb-3">
                          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-2xl font-bold text-green-600 mb-2">
                              {currentSentence.english}
                            </p>
                            <p className="text-lg text-gray-700">
                              <strong>Structure:</strong> {currentSentence.structure}
                            </p>
                          </div>
                        </div>
                        
                        {mode === 'sov' && (
                          <div className="bg-indigo-50 p-4 rounded-lg mt-4">
                            <div className="flex items-start gap-2">
                              <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                              <div>
                                <p className="font-bold mb-2">Key Point:</p>
                                <p className="text-sm">
                                  Japanese is <strong>SOV</strong> (Subject-Object-Verb). The verb always comes last!<br/>
                                  English is <strong>SVO</strong> (Subject-Verb-Object). The verb comes in the middle.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {mode === 'registers' && (
                          <div className="bg-purple-50 p-4 rounded-lg mt-4">
                            <div className="flex items-start gap-2">
                              <MessageCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                              <div>
                                <p className="font-bold mb-2">Register Info:</p>
                                <p className="text-sm">
                                  <strong className="capitalize">{currentSentence.register}:</strong>{' '}
                                  {currentSentence.register === 'casual' && 'Used with family, kids, and close friends. Particles often drop, contractions are common.'}
                                  {currentSentence.register === 'polite' && 'Safe default for strangers, coworkers, and most situations. Uses です/ます forms.'}
                                  {currentSentence.register === 'formal' && 'Business, official notices, written documents. Uses honorific/humble keigo.'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button
                          onClick={handleCorrect}
                          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white text-xl py-6"
                          size="lg"
                        >
                          {currentExample < examples.length - 1 ? (
                            <>Next Sentence <ArrowRight className="w-6 h-6 ml-2" /></>
                          ) : (
                            <>Complete! 🎉</>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button
                        onClick={() => setShowAnswer(true)}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-xl py-6"
                        size="lg"
                      >
                        Show Translation & Explanation
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </Card>

        {mode === 'sov' && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-blue-900 mb-1">Common Mistake:</p>
                  <p className="text-sm text-blue-800">
                    Don't think word-by-word from English! Japanese builds sentences differently.
                    The verb always comes last, so listen/read to the end before translating.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
