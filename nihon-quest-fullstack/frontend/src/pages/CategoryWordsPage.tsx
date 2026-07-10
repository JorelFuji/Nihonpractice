import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { WORD_CATEGORIES } from '@/data/japaneseWords'

export default function CategoryWordsPage() {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()

  const categoryData = category ? WORD_CATEGORIES[category as keyof typeof WORD_CATEGORIES] : null

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xl text-gray-700">Category not found</p>
            <Button onClick={() => navigate('/vocabulary')} className="mt-4">
              Back to Vocabulary
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            onClick={() => navigate('/vocabulary')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Categories
          </Button>
          <div className="text-6xl mb-4">{categoryData.emoji}</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {categoryData.name}
            </span>
          </h1>
          <p className="text-2xl text-gray-700">{categoryData.japanese}</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Button
            onClick={() => navigate(`/match-game/${category}`)}
            className="h-16 text-lg bg-gradient-to-r from-pink-500 to-purple-500"
          >
            🎮 Play Match Game
          </Button>
          <Button
            onClick={() => navigate(`/flashcards/${category}`)}
            className="h-16 text-lg bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            🃏 Study Flashcards
          </Button>
        </div>

        {/* Word Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.words.map((word) => (
            <Card
              key={word.id}
              className="border-4 border-purple-300 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <CardContent className="pt-8 pb-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">{word.emoji}</div>
                  <h3 className="text-3xl font-bold text-purple-700 mb-2">
                    {word.japanese}
                  </h3>
                  <p className="text-xl text-gray-600 mb-1">{word.romaji}</p>
                  <p className="text-lg text-gray-500">{word.english}</p>
                  {word.hiragana !== word.japanese && (
                    <p className="text-sm text-gray-400 mt-2">
                      ({word.hiragana})
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
