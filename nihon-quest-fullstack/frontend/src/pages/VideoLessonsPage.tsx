import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Play, Clock, Star, TrendingUp, BookOpen, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { VIDEO_LESSONS, FILTER_OPTIONS } from '@/data/video-lessons.seed'
import type { VideoLesson, Modality, Competence, Topic, JlptLevel } from '@/types/lesson-types'

export default function VideoLessonsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedLevels, setSelectedLevels] = useState<JlptLevel[]>([])
  const [selectedModalities, setSelectedModalities] = useState<Modality[]>([])
  const [selectedCompetences, setSelectedCompetence] = useState<Competence[]>([])
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([])
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'difficulty' | 'duration'>('recent')
  const [selectedLesson, setSelectedLesson] = useState<VideoLesson | null>(null)

  // Filter and sort lessons
  const filteredLessons = useMemo(() => {
    let filtered = VIDEO_LESSONS

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(lesson =>
        lesson.title.toLowerCase().includes(query) ||
        lesson.description.toLowerCase().includes(query) ||
        lesson.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Level filter
    if (selectedLevels.length > 0) {
      filtered = filtered.filter(lesson => selectedLevels.includes(lesson.level))
    }

    // Modality filter
    if (selectedModalities.length > 0) {
      filtered = filtered.filter(lesson =>
        lesson.modality.some(m => selectedModalities.includes(m))
      )
    }

    // Competence filter
    if (selectedCompetences.length > 0) {
      filtered = filtered.filter(lesson => selectedCompetences.includes(lesson.competence))
    }

    // Topic filter
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(lesson =>
        lesson.topics.some(t => selectedTopics.includes(t))
      )
    }

    // Sort
    const sorted = [...filtered]
    switch (sortBy) {
      case 'popular':
        sorted.sort((a, b) => b.views - a.views)
        break
      case 'difficulty':
        sorted.sort((a, b) => a.difficulty - b.difficulty)
        break
      case 'duration':
        sorted.sort((a, b) => a.duration - b.duration)
        break
      case 'recent':
      default:
        sorted.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
        break
    }

    return sorted
  }, [searchQuery, selectedLevels, selectedModalities, selectedCompetences, selectedTopics, sortBy])

  const toggleArrayFilter = <T,>(arr: T[], setArr: (arr: T[]) => void, value: T) => {
    if (arr.includes(value)) {
      setArr(arr.filter(v => v !== value))
    } else {
      setArr([...arr, value])
    }
  }

  const clearAllFilters = () => {
    setSelectedLevels([])
    setSelectedModalities([])
    setSelectedCompetence([])
    setSelectedTopics([])
    setSearchQuery('')
  }

  const activeFiltersCount = 
    selectedLevels.length + 
    selectedModalities.length + 
    selectedCompetences.length + 
    selectedTopics.length

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-500'
    if (difficulty <= 3) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              🎬 Video Lessons Library
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
            Learn Japanese with expert-guided video lessons
          </p>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-4 sm:mb-6 border-2 sm:border-4 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
              {/* Search */}
              <div className="w-full sm:flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lessons..."
                  className="pl-10 h-10 sm:h-12 text-base sm:text-lg w-full"
                />
              </div>

              {/* Filter and Sort Container */}
              <div className="flex gap-2 sm:gap-4">
              {/* Filter Button */}
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ? 'default' : 'outline'}
                size="default"
                className="relative flex-1 sm:flex-initial"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-red-500">{activeFiltersCount}</Badge>
                )}
              </Button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-10 sm:h-12 px-2 sm:px-4 border-2 border-purple-200 rounded-lg text-sm sm:text-base flex-1 sm:flex-initial"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="difficulty">Easiest First</option>
                <option value="duration">Shortest First</option>
              </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedLevels.map(level => (
                  <Badge key={level} className="bg-purple-500">
                    {level}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => toggleArrayFilter(selectedLevels, setSelectedLevels, level)}
                    />
                  </Badge>
                ))}
                {selectedModalities.map(mod => (
                  <Badge key={mod} className="bg-blue-500">
                    {FILTER_OPTIONS.modalities.find(m => m.value === mod)?.emoji} {mod}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => toggleArrayFilter(selectedModalities, setSelectedModalities, mod)}
                    />
                  </Badge>
                ))}
                {selectedCompetences.map(comp => (
                  <Badge key={comp} className="bg-green-500">
                    {comp}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => toggleArrayFilter(selectedCompetences, setSelectedCompetence, comp)}
                    />
                  </Badge>
                ))}
                {selectedTopics.map(topic => (
                  <Badge key={topic} className="bg-pink-500">
                    {FILTER_OPTIONS.topics.find(t => t.value === topic)?.emoji} {topic}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => toggleArrayFilter(selectedTopics, setSelectedTopics, topic)}
                    />
                  </Badge>
                ))}
                <Button onClick={clearAllFilters} variant="ghost" size="sm">
                  Clear All
                </Button>
              </div>
            )}

            {/* Results Count */}
            <div className="text-sm text-muted-foreground mt-4">
              Showing {filteredLessons.length} of {VIDEO_LESSONS.length} lessons
            </div>
          </CardContent>
        </Card>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card className="mb-6 border-4 border-blue-200">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* Level Filter */}
                    <div>
                      <h3 className="font-bold mb-3 text-lg">📊 Level</h3>
                      <div className="space-y-2">
                        {FILTER_OPTIONS.levels.map(level => (
                          <label key={level} className="flex items-center gap-2 cursor-pointer hover:bg-purple-50 p-2 rounded">
                            <input
                              type="checkbox"
                              checked={selectedLevels.includes(level)}
                              onChange={() => toggleArrayFilter(selectedLevels, setSelectedLevels, level)}
                              className="w-4 h-4"
                            />
                            <span>{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Modality Filter */}
                    <div>
                      <h3 className="font-bold mb-3 text-lg">🎯 Modality</h3>
                      <div className="space-y-2">
                        {FILTER_OPTIONS.modalities.map(mod => (
                          <label key={mod.value} className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 p-2 rounded">
                            <input
                              type="checkbox"
                              checked={selectedModalities.includes(mod.value)}
                              onChange={() => toggleArrayFilter(selectedModalities, setSelectedModalities, mod.value)}
                              className="w-4 h-4"
                            />
                            <span>{mod.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Competence Filter */}
                    <div>
                      <h3 className="font-bold mb-3 text-lg">💪 Competence</h3>
                      <div className="space-y-2">
                        {FILTER_OPTIONS.competences.map(comp => (
                          <label key={comp.value} className="flex items-center gap-2 cursor-pointer hover:bg-green-50 p-2 rounded">
                            <input
                              type="checkbox"
                              checked={selectedCompetences.includes(comp.value)}
                              onChange={() => toggleArrayFilter(selectedCompetences, setSelectedCompetence, comp.value)}
                              className="w-4 h-4"
                            />
                            <span>{comp.label}</span>
                            <div className={`w-2 h-2 rounded-full bg-${comp.color}-500`}></div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Topic Filter */}
                    <div>
                      <h3 className="font-bold mb-3 text-lg">📚 Topic</h3>
                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {FILTER_OPTIONS.topics.map(topic => (
                          <label key={topic.value} className="flex items-center gap-2 cursor-pointer hover:bg-pink-50 p-2 rounded">
                            <input
                              type="checkbox"
                              checked={selectedTopics.includes(topic.value)}
                              onChange={() => toggleArrayFilter(selectedTopics, setSelectedTopics, topic.value)}
                              className="w-4 h-4"
                            />
                            <span>{topic.emoji} {topic.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lessons Grid */}
        {filteredLessons.length === 0 ? (
          <Card className="border-4 border-yellow-200">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No lessons found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <Button onClick={clearAllFilters}>Clear All Filters</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredLessons.map((lesson) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedLesson(lesson)}
                className="cursor-pointer"
              >
                <Card className="border-4 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg h-full">
                  <CardContent className="p-0">
                    {/* Thumbnail */}
                    <div className="relative">
                      <img
                        src={lesson.thumbnailUrl || 'https://via.placeholder.com/640x360'}
                        alt={lesson.title}
                        className="w-full h-40 sm:h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lesson.duration}m
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-purple-500 text-white">{lesson.level}</Badge>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 transition-opacity">
                        <div className="bg-white rounded-full p-4">
                          <Play className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="text-2xl sm:text-3xl mb-2">{lesson.emoji}</div>
                      <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {lesson.description}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {lesson.modality.slice(0, 2).map(mod => (
                          <Badge key={mod} variant="outline" className="text-xs">
                            {FILTER_OPTIONS.modalities.find(m => m.value === mod)?.emoji}
                          </Badge>
                        ))}
                        {lesson.modality.length > 2 && (
                          <Badge variant="outline" className="text-xs">+{lesson.modality.length - 2}</Badge>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {(lesson.views / 1000).toFixed(1)}K views
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full mx-0.5 ${
                                  i < lesson.difficulty ? getDifficultyColor(lesson.difficulty) : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* XP Reward */}
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-purple-600 font-bold">
                          +{lesson.xpReward} XP
                        </span>
                        {lesson.hasQuiz && (
                          <Badge variant="outline" className="text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            Quiz
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lesson Detail Modal */}
        <AnimatePresence>
          {selectedLesson && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLesson(null)}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-2 sm:mx-0"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-4xl sm:text-5xl mb-2">{selectedLesson.emoji}</div>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-2">{selectedLesson.title}</h2>
                      <p className="text-muted-foreground">{selectedLesson.description}</p>
                    </div>
                    <Button onClick={() => setSelectedLesson(null)} variant="ghost" size="sm">
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Video Placeholder */}
                  <div className="bg-gray-900 rounded-lg aspect-video mb-6 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-2" />
                      <p>Video player would load here</p>
                      <p className="text-sm text-gray-400">{selectedLesson.videoUrl}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div>
                      <h4 className="font-bold mb-2">🎯 Learning Objectives</h4>
                      <ul className="space-y-1">
                        {selectedLesson.objectives.map((obj, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5" />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">📝 Key Vocabulary</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLesson.vocabulary.map((word, i) => (
                          <Badge key={i} variant="outline">{word}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(selectedLesson.estimatedTime)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      +{selectedLesson.xpReward} XP
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {selectedLesson.instructor}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="default" sm-size="lg" className="w-full sm:flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                      <Play className="w-5 h-5 mr-2" />
                      Start Lesson
                    </Button>
                    {selectedLesson.hasQuiz && (
                      <Button size="lg" variant="outline">
                        Take Quiz
                      </Button>
                    )}
                    {selectedLesson.worksheetUrl && (
                      <Button size="lg" variant="outline">
                        Download Worksheet
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
