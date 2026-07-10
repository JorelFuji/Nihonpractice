import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'
import { useUserStore } from '@/store/userStore'

interface Question {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  japanese: string
  romaji: string
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'How do you say "Good Morning" in Japanese?',
    options: ['おはよう (Ohayou)', 'こんにちは (Konnichiwa)', 'こんばんは (Konbanwa)', 'さようなら (Sayounara)'],
    correctIndex: 0,
    explanation: 'おはよう (Ohayou) is used in the morning until about 10-11 AM.',
    japanese: 'おはよう',
    romaji: 'Ohayou',
  },
  {
    id: '2',
    question: 'What does "ありがとう" mean?',
    options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
    correctIndex: 2,
    explanation: 'ありがとう (Arigatou) means "Thank you". For more formal situations, use ありがとうございます (Arigatou gozaimasu).',
    japanese: 'ありがとう',
    romaji: 'Arigatou',
  },
  {
    id: '3',
    question: 'Which particle marks the direct object?',
    options: ['は (wa)', 'が (ga)', 'を (wo/o)', 'に (ni)'],
    correctIndex: 2,
    explanation: 'The particle を (wo, pronounced "o") marks the direct object of an action. Example: 本を読みます (I read a book).',
    japanese: 'を',
    romaji: 'wo/o',
  },
]

export default function PracticePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const { addXP, addGems, useHeart } = useUserStore()
  
  const currentQuestion = sampleQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === sampleQuestions.length - 1

  useEffect(() => {
    setProgress((currentQuestionIndex / sampleQuestions.length) * 100)
  }, [currentQuestionIndex])

  const handleSelectOption = (index: number) => {
    if (isAnswered) return
    setSelectedOption(index)
  }

  const handleCheckAnswer = () => {
    if (selectedOption === null) return
    
    setIsAnswered(true)
    const isCorrect = selectedOption === currentQuestion.correctIndex

    if (isCorrect) {
      setScore(score + 1)
      addXP(10)
      addGems(5)
      toast.success('すばらしい！(Subarashii!) Correct! +10 XP')
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useHeart()
      toast.error('がんばって！(Ganbatte!) Try again!')
    }
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      toast.success(`Quiz Complete! Score: ${score + 1}/${sampleQuestions.length}`)
      setCurrentQuestionIndex(0)
      setScore(0)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
    setSelectedOption(null)
    setIsAnswered(false)
  }

  const getOptionStyle = (index: number) => {
    if (!isAnswered) {
      return selectedOption === index
        ? 'border-primary bg-primary-fixed'
        : 'border-surface-container-highest hover:border-primary'
    }
    
    if (index === currentQuestion.correctIndex) {
      return 'border-secondary bg-secondary-fixed ring-4 ring-secondary'
    }
    
    if (index === selectedOption && selectedOption !== currentQuestion.correctIndex) {
      return 'border-error bg-error-container ring-4 ring-error'
    }
    
    return 'border-surface-container-highest opacity-50'
  }

  return (
    <div className="max-w-2xl mx-auto px-container-margin py-lg">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Progress Bar */}
      <div className="w-full mb-xl">
        <div className="flex justify-between items-center mb-xs">
          <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">
            Lesson Progress
          </span>
          <span className="font-label-sm text-primary font-bold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-4 bg-surface-container-highest rounded-full overflow-hidden relative border-b-2 border-surface-container-highest">
          <motion.div
            className="h-full bg-primary-container relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 glossy-progress" />
            <div className="absolute right-1 top-1/2 -translate-y-1/2">
              <span className="material-symbols-outlined text-white text-[12px]">auto_awesome</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Character Mascot & Question */}
      <div className="w-full flex flex-col md:flex-row items-center gap-lg mb-xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative w-32 h-32 flex-shrink-0"
        >
          <div className="absolute inset-0 bg-secondary-container rounded-full opacity-20 animate-ping" />
          <div className="w-full h-full bg-primary-container rounded-full flex items-center justify-center text-6xl relative z-10 animate-bounce-slow">
            🐕
          </div>
        </motion.div>

        <div className="relative bg-white p-lg rounded-lg border-2 border-surface-container-highest shadow-sm w-full">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-white border-b-[10px] border-b-transparent hidden md:block" />
          <h2 className="font-headline-md text-headline-md text-on-surface text-center md:text-left">
            {currentQuestion.question}
          </h2>
        </div>
      </div>

      {/* Multiple Choice Options */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-card-gap mb-xl">
        {currentQuestion.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: isAnswered ? 1 : 1.02 }}
            whileTap={{ scale: isAnswered ? 1 : 0.98 }}
            onClick={() => handleSelectOption(index)}
            disabled={isAnswered}
            className={`group relative bg-white p-lg rounded-lg border-2 shadow-sm transition-all text-left ${getOptionStyle(index)}`}
          >
            <div className="flex items-center gap-md">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-label-bold transition-colors ${
                  selectedOption === index
                    ? 'border-primary bg-primary text-white'
                    : 'border-surface-container-highest text-on-surface-variant'
                }`}
              >
                {index + 1}
              </div>
              <div className="font-headline-md text-headline-md text-on-surface leading-tight">
                {option.split('(')[0].trim()}
                <div className="font-body-md text-on-surface-variant italic">
                  {option.includes('(') ? `(${option.split('(')[1]}` : ''}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Explanation (shown after answering) */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-tertiary-container/20 p-md rounded-lg border-l-4 border-tertiary mb-xl"
        >
          <h3 className="font-label-bold text-primary uppercase tracking-wider mb-sm flex items-center gap-2">
            <span className="material-symbols-outlined">lightbulb</span>
            Explanation
          </h3>
          <p className="font-body-md text-on-surface-variant">{currentQuestion.explanation}</p>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="sticky bottom-0 w-full bg-white border-t border-surface-container-highest px-container-margin py-lg z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-md">
          <button className="bg-surface-container text-on-surface-variant px-lg py-md rounded-lg font-label-bold uppercase tracking-widest hover:bg-surface-container-highest active:scale-95 transition-all">
            Skip
          </button>
          {!isAnswered ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className="flex-grow bg-primary text-white py-md rounded-lg font-headline-md text-headline-md tactile-btn transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
            >
              Check
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex-grow bg-secondary text-white py-md rounded-lg font-headline-md text-headline-md tactile-btn transition-all"
            >
              {isLastQuestion ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
