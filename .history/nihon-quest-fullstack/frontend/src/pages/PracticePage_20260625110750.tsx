import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { BookOpen, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Card {
  id: number
  type: string
  front: string
  back: string
  due_date: string
  difficulty: float
  stability: number
  reps: number
}

export default function PracticePage() {
  const [showAnswer, setShowAnswer] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  const { data: reviewData, isLoading, refetch } = useQuery({
    queryKey: ['due-reviews'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/srs/reviews/due', {
        params: { user_id: 1, limit: 20 }
      })
      return response.data
    }
  })

  const reviewMutation = useMutation({
    mutationFn: async ({ cardId, rating, duration }: { cardId: number; rating: number; duration: number }) => {
      const response = await axios.post('/api/v1/srs/reviews/answer', {
        card_id: cardId,
        rating,
        duration_ms: duration
      }, {
        params: { user_id: 1 }
      })
      return response.data
    },
    onSuccess: () => {
      setShowAnswer(false)
      if (currentCardIndex < (reviewData?.cards?.length || 0) - 1) {
        setCurrentCardIndex(prev => prev + 1)
      } else {
        refetch()
        setCurrentCardIndex(0)
      }
    }
  })

  const handleRating = (rating: number) => {
    if (!currentCard) return
    const duration = Math.floor(Math.random() * 10000) + 5000
    reviewMutation.mutate({ cardId: currentCard.id, rating, duration })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">Loading your reviews...</p>
        </div>
      </div>
    )
  }

  const currentCard = reviewData?.cards?.[currentCardIndex] as Card | undefined

  if (!currentCard) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-12 text-center">
        <div className="bg-white rounded-2xl p-12 border-2 border-primary/10">
          <CheckCircle className="w-24 h-24 text-secondary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-primary mb-4">All Caught Up!</h2>
          <p className="text-on-surface-variant text-lg mb-6">
            Great work! You've completed all your reviews for now. 
          </p>
          <p className="text-sm text-on-surface-variant">
            Come back later for more practice, or add new cards to your deck!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-8 pb-24">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="font-bold text-on-surface">
            Card {currentCardIndex + 1} of {reviewData?.count || 0}
          </span>
        </div>
        <div className="bg-surface-container px-4 py-2 rounded-full">
          <Clock className="w-4 h-4 inline mr-2 text-on-surface-variant" />
          <span className="text-sm font-semibold text-on-surface-variant">
            {currentCard.reps} reviews
          </span>
        </div>
      </div>

      <div className="w-full bg-surface-container h-2 rounded-full mb-6 overflow-hidden">
        <div 
          className="bg-primary h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentCardIndex + 1) / (reviewData?.count || 1)) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl border-2 border-primary/10 p-8 min-h-[400px] flex flex-col justify-center items-center mb-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-on-surface-variant mb-4 uppercase tracking-wider">
            {currentCard.type}
          </p>
          <div className="text-5xl font-bold text-primary mb-8">
            {currentCard.front}
          </div>

          {showAnswer && (
            <div className="mt-8 pt-8 border-t-2 border-primary/10">
              <p className="text-3xl text-on-surface mb-4">
                {currentCard.back}
              </p>
              <div className="flex gap-3 justify-center mt-8">
                <RatingButton
                  onClick={() => handleRating(1)}
                  label="Again"
                  color="error"
                  icon={XCircle}
                />
                <RatingButton
                  onClick={() => handleRating(2)}
                  label="Hard"
                  color="tertiary"
                />
                <RatingButton
                  onClick={() => handleRating(3)}
                  label="Good"
                  color="secondary"
                />
                <RatingButton
                  onClick={() => handleRating(4)}
                  label="Easy"
                  color="primary"
                  icon={CheckCircle}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {!showAnswer && (
        <button
          onClick={() => setShowAnswer(true)}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all active:scale-95 border-b-4 border-primary/50"
        >
          Show Answer
        </button>
      )}

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <StatCard
          label="Difficulty"
          value={currentCard.difficulty.toFixed(1)}
          color="primary"
        />
        <StatCard
          label="Stability"
          value={Math.round(currentCard.stability)}
          color="secondary"
        />
        <StatCard
          label="Reviews"
          value={currentCard.reps}
          color="tertiary"
        />
      </div>
    </div>
  )
}

function RatingButton({ onClick, label, color, icon: Icon }: {
  onClick: () => void
  label: string
  color: string
  icon?: any
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 border-b-4 bg-${color} text-white border-${color}/50 hover:bg-${color}/90`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {label}
    </button>
  )
}

function StatCard({ label, value, color }: {
  label: string
  value: string | number
  color: string
}) {
  return (
    <div className="bg-white rounded-xl p-4 border-2 border-primary/10">
      <p className="text-xs font-semibold text-on-surface-variant mb-1">{label}</p>
      <p className={`text-2xl font-bold text-${color}`}>{value}</p>
    </div>
  )
}
