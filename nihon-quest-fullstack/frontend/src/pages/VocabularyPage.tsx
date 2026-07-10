import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WORD_CATEGORIES } from '@/data/japaneseWords'

export default function VocabularyPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const categories = Object.entries(WORD_CATEGORIES)

  const filteredCategories = searchQuery
    ? categories.filter(([_, cat]) => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.japanese.includes(searchQuery)
      )
    : categories

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              📚 たんご (Vocabulary)
            </span>
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Learn Japanese words by category
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 text-lg rounded-2xl border-4 border-purple-300 focus:border-purple-500 focus:outline-none shadow-lg"
          />
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(([key, category]) => (
            <Card
              key={key}
              className="border-4 border-purple-300 hover:border-purple-500 cursor-pointer shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              onClick={() => navigate(`/vocabulary/${key}`)}
            >
              <CardContent className="pt-8 pb-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">{category.emoji}</div>
                  <h3 className="text-2xl font-bold text-purple-700 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-xl text-gray-600 mb-4">
                    {category.japanese}
                  </p>
                  <p className="text-lg text-gray-500">
                    {category.words.length} words
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Button
            onClick={() => navigate('/match-game')}
            className="h-20 text-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            🎮 Play Match Games
          </Button>
          <Button
            onClick={() => navigate('/flashcards')}
            className="h-20 text-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            🃏 Study Flashcards
          </Button>
        </div>
      </div>
    </div>
  )
}
