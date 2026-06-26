import { useState } from 'react'
import { Brain, Trophy, RefreshCw, CheckCircle, XCircle } from 'lucide-react'
import { wordService } from '@/services/wordService'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

type QuizType = 'meaning' | 'reading' | 'translation'

interface Question {
  word: string
  reading: string
  correctAnswer: string
  options: string[]
  type: QuizType
}

export default function QuizPage() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizType, setQuizType] = useState<QuizType>('meaning')

  const generateQuestions = (type: QuizType, count: number = 10): Question[] => {
    const allWords = wordService.getAllWords()
    const selectedWords = [...allWords].sort(() => Math.random() - 0.5).slice(0, count)

    return selectedWords.map(word => {
      let correctAnswer: string
      let allOptions: string[]

      if (type === 'meaning') {
        correctAnswer = word.meanings[0]
        allOptions = allWords
          .filter(w => w.word !== word.word)
          .map(w => w.meanings[0])
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
        allOptions.push(correctAnswer)
      } else if (type === 'reading') {
        correctAnswer = word.reading
        allOptions = allWords
          .filter(w => w.word !== word.word)
          .map(w => w.reading)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
        allOptions.push(correctAnswer)
      } else {
        correctAnswer = word.word
        allOptions = allWords
          .filter(w => w.word !== word.word)
          .map(w => w.word)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
        allOptions.push(correctAnswer)
      }

      return {
        word: word.word,
        reading: word.reading,
        correctAnswer,
        options: allOptions.sort(() => Math.random() - 0.5),
        type
      }
    })
  }

  const startQuiz = (type: QuizType) => {
    setQuizType(type)
    setQuestions(generateQuestions(type))
    setCurrentQuestion(0)
    setScore(0)
    setQuizStarted(true)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    const isCorrect = answer === questions[currentQuestion].correctAnswer

    if (isCorrect) {
      setScore(score + 1)
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      })
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const getQuestionPrompt = (q: Question) => {
    if (q.type === 'meaning') {
      return `What does ${q.word} (${q.reading}) mean?`
    } else if (q.type === 'reading') {
      return `How do you read ${q.word}?`
    } else {
      return `How do you write "${q.correctAnswer}" in Japanese?`
    }
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Quiz Time!</h1>
            <p className="text-muted-foreground text-lg">Test your Japanese vocabulary knowledge</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="cursor-pointer border-2 hover:border-primary transition-all"
                onClick={() => startQuiz('meaning')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📚 Meaning Quiz
                  </CardTitle>
                  <CardDescription>
                    See the Japanese word and choose the correct English meaning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Quiz</Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="cursor-pointer border-2 hover:border-secondary transition-all"
                onClick={() => startQuiz('reading')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🔤 Reading Quiz
                  </CardTitle>
                  <CardDescription>
                    See the kanji and choose the correct reading (hiragana)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="secondary">Start Quiz</Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="cursor-pointer border-2 hover:border-tertiary transition-all"
                onClick={() => startQuiz('translation')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🈯 Translation Quiz
                  </CardTitle>
                  <CardDescription>
                    See the English meaning and choose the correct Japanese word
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Start Quiz</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100)
    const isPerfect = score === questions.length

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-primary/30">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Trophy className={`w-16 h-16 ${isPerfect ? 'text-yellow-500' : 'text-primary'}`} />
                </div>
                <CardTitle className="text-3xl">
                  {isPerfect ? '🎉 Perfect Score!' : 'Quiz Complete!'}
                </CardTitle>
                <CardDescription className="text-lg">
                  {isPerfect
                    ? 'Excellent work! You got everything right!'
                    : 'Great effort! Keep practicing!'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">
                    {score}/{questions.length}
                  </div>
                  <p className="text-2xl text-muted-foreground">{percentage}% Correct</p>
                </div>

                <div className="flex gap-4">
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => startQuiz(quizType)}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </Button>
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={() => setQuizStarted(false)}
                  >
                    Choose Different Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-2">
            <span className="text-lg font-semibold">
              Question {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          <div className="text-lg font-semibold">
            Score: {score}/{questions.length}
          </div>
        </div>

        <div className="mb-4 bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {getQuestionPrompt(question)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === option
                    const isCorrect = option === question.correctAnswer
                    const showFeedback = selectedAnswer !== null

                    return (
                      <Button
                        key={index}
                        onClick={() => !selectedAnswer && handleAnswer(option)}
                        disabled={selectedAnswer !== null}
                        variant={
                          showFeedback && isSelected && isCorrect
                            ? 'default'
                            : showFeedback && isSelected && !isCorrect
                            ? 'destructive'
                            : 'outline'
                        }
                        className={`h-auto py-4 text-lg justify-between ${
                          showFeedback && isCorrect && !isSelected
                            ? 'border-green-500 border-2'
                            : ''
                        }`}
                      >
                        <span>{option}</span>
                        {showFeedback && isSelected && isCorrect && (
                          <CheckCircle className="w-5 h-5" />
                        )}
                        {showFeedback && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5" />
                        )}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
