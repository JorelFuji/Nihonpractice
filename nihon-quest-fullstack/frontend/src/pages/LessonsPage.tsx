import { useState } from 'react'
import { BookOpen, Lock, FileText, Headphones, MessageCircle, Award, ChevronDown, ChevronUp } from 'lucide-react'
import { getLessonsByLevel } from '@/data/curriculumData'
import type { Lesson } from '@/data/curriculumData'

export default function LessonsPage() {
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5')
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null)
  
  const lessons = getLessonsByLevel(selectedLevel)

  const getTypeIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'conversation': return <MessageCircle className="w-5 h-5" />
      case 'grammar': return <FileText className="w-5 h-5" />
      case 'vocabulary': return <BookOpen className="w-5 h-5" />
      case 'listening': return <Headphones className="w-5 h-5" />
      default: return <BookOpen className="w-5 h-5" />
    }
  }

  const getSourceBadge = (source: Lesson['source']) => {
    const colors = {
      'Pimsleur': 'bg-blue-100 text-blue-700',
      'Yookoso': 'bg-green-100 text-green-700',
      'PowerPoint': 'bg-purple-100 text-purple-700',
      'Original': 'bg-pink-100 text-pink-700'
    }
    return colors[source]
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-8 pb-24">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-primary mb-2">📚 Curriculum</h2>
        <p className="text-gray-600">Comprehensive Japanese learning from Pimsleur, Yookoso, and more</p>
      </div>

      {/* Level Selection */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap ${
              selectedLevel === level
                ? 'bg-primary text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {level} ({getLessonsByLevel(level).length})
          </button>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{lessons.length}</div>
          <div className="text-sm text-gray-600">Total Lessons</div>
        </div>
        <div className="bg-white rounded-lg p-4 border-2 border-green-200">
          <div className="text-2xl font-bold text-green-600">
            {lessons.filter(l => !l.locked).length}
          </div>
          <div className="text-sm text-gray-600">Unlocked</div>
        </div>
        <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
          <div className="text-2xl font-bold text-purple-600">
            {lessons.filter(l => l.progress === 100).length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-lg p-4 border-2 border-pink-200">
          <div className="text-2xl font-bold text-pink-600">
            {Math.round(lessons.reduce((sum, l) => sum + l.progress, 0) / lessons.length) || 0}%
          </div>
          <div className="text-sm text-gray-600">Progress</div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {lessons.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-bold text-gray-600 mb-2">No lessons yet for {selectedLevel}</p>
            <p className="text-gray-500">
              Lessons will appear here as you add content to curriculumData.ts
            </p>
          </div>
        ) : (
          lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`bg-white rounded-xl border-2 transition-all ${
                lesson.locked
                  ? 'border-gray-200 opacity-60'
                  : 'border-primary/20 hover:border-primary/40 hover:shadow-lg'
              }`}
            >
              {/* Lesson Header */}
              <div
                className={`p-6 ${!lesson.locked ? 'cursor-pointer' : ''}`}
                onClick={() => !lesson.locked && setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl ${lesson.locked ? 'bg-gray-100' : 'bg-primary/10'}`}>
                      {lesson.locked ? (
                        <Lock className="w-6 h-6 text-gray-400" />
                      ) : (
                        getTypeIcon(lesson.type)
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-bold text-lg text-gray-800">{lesson.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${getSourceBadge(lesson.source)}`}>
                          {lesson.source}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full font-bold bg-gray-100 text-gray-700">
                          Unit {lesson.unit}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full font-bold bg-orange-100 text-orange-700">
                          {lesson.type}
                        </span>
                      </div>

                      {/* Objectives Preview */}
                      {!lesson.locked && lesson.objectives.length > 0 && (
                        <div className="text-sm text-gray-600 mb-2">
                          {lesson.objectives[0]}
                          {lesson.objectives.length > 1 && ` +${lesson.objectives.length - 1} more`}
                        </div>
                      )}

                      {/* Progress Bar */}
                      {!lesson.locked && (
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-3">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-full transition-all rounded-full"
                            style={{ width: `${lesson.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats & Expand */}
                  <div className="flex flex-col items-end gap-2">
                    {!lesson.locked && (
                      <>
                        {lesson.progress === 100 ? (
                          <div className="flex items-center gap-1 text-secondary font-bold">
                            <Award className="w-5 h-5" />
                            Complete
                          </div>
                        ) : (
                          <span className="text-primary font-bold text-lg">{lesson.progress}%</span>
                        )}
                        {expandedLesson === lesson.id ? (
                          <ChevronUp className="w-6 h-6 text-primary" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {!lesson.locked && expandedLesson === lesson.id && (
                <div className="border-t-2 border-gray-100 p-6 bg-gray-50">
                  {/* Objectives */}
                  {lesson.objectives.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        Learning Objectives
                      </h4>
                      <ul className="space-y-2">
                        {lesson.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-gray-700">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Vocabulary Count */}
                  {lesson.vocabulary.length > 0 && (
                    <div className="mb-4">
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          <span className="font-bold text-blue-800">
                            {lesson.vocabulary.length} Vocabulary Words
                          </span>
                        </div>
                        <div className="text-sm text-blue-700">
                          {lesson.vocabulary.slice(0, 3).map(v => v.japanese).join(', ')}
                          {lesson.vocabulary.length > 3 && ` +${lesson.vocabulary.length - 3} more`}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Grammar Points Count */}
                  {lesson.grammarPoints.length > 0 && (
                    <div className="mb-4">
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-5 h-5 text-green-600" />
                          <span className="font-bold text-green-800">
                            {lesson.grammarPoints.length} Grammar Points
                          </span>
                        </div>
                        <div className="text-sm text-green-700">
                          {lesson.grammarPoints.map(g => g.title).join(', ')}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Exercises Count */}
                  {lesson.exercises.length > 0 && (
                    <div className="mb-4">
                      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-5 h-5 text-purple-600" />
                          <span className="font-bold text-purple-800">
                            {lesson.exercises.length} Practice Exercises
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all">
                    {lesson.progress === 0 ? 'Start Lesson' : lesson.progress === 100 ? 'Review Lesson' : 'Continue Lesson'} →
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Help Message */}
      <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
        <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          📖 Adding Your Content
        </h3>
        <p className="text-sm text-yellow-800 mb-2">
          To add lessons from your Pimsleur and Yookoso textbooks:
        </p>
        <ol className="text-sm text-yellow-800 space-y-1 ml-4">
          <li>1. Open <code className="bg-yellow-100 px-2 py-0.5 rounded">src/data/curriculumData.ts</code></li>
          <li>2. Follow the templates for Pimsleur or Yookoso</li>
          <li>3. Add vocabulary, grammar, and exercises from your PDFs</li>
          <li>4. See the <code className="bg-yellow-100 px-2 py-0.5 rounded">CONTENT_INTEGRATION_GUIDE.md</code> for details</li>
        </ol>
      </div>
    </div>
  )
}
