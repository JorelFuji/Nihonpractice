/**
 * Grammar Roadmap Component
 * Interactive N5-N1 grammar progression with checklist tracking
 */

import { useState, useEffect } from 'react'
import { grammarRoadmap, conversationPriorityList, type GrammarLevel } from '../data/grammarRoadmap'

interface Props {
  showJapanese: boolean
  showEnglish: boolean
}

export default function GrammarRoadmapView({ showJapanese, showEnglish }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<GrammarLevel>(grammarRoadmap[0])
  const [checkedGrammar, setCheckedGrammar] = useState<Set<string>>(new Set())
  const [expandedPoint, setExpandedPoint] = useState<string | null>(null)
  const [showDrills, setShowDrills] = useState(false)

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('grammarRoadmapProgress')
    if (saved) {
      setCheckedGrammar(new Set(JSON.parse(saved)))
    }
  }, [])

  // Save progress to localStorage
  const toggleGrammarPoint = (id: string) => {
    const newChecked = new Set(checkedGrammar)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedGrammar(newChecked)
    localStorage.setItem('grammarRoadmapProgress', JSON.stringify([...newChecked]))
  }

  const getLevelProgress = (level: GrammarLevel) => {
    const total = level.grammarPoints.length
    const completed = level.grammarPoints.filter(p => checkedGrammar.has(p.id)).length
    return { completed, total, percentage: Math.round((completed / total) * 100) }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'N5':
        return 'from-green-400 to-green-600'
      case 'N4':
        return 'from-blue-400 to-blue-600'
      case 'N3':
        return 'from-purple-400 to-purple-600'
      case 'N2':
        return 'from-orange-400 to-orange-600'
      case 'N1':
        return 'from-red-400 to-red-600'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  const currentProgress = getLevelProgress(selectedLevel)

  return (
    <div className="grammar-roadmap bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 overflow-x-hidden overflow-y-auto w-full">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">
          {showJapanese && <span className="block sm:inline">文法ロードマップ</span>}
          {showJapanese && showEnglish && <span className="hidden sm:inline"> / </span>}
          {showEnglish && <span className="block sm:inline">Grammar Roadmap</span>}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 break-words">
          {showJapanese && <span className="block">JLPT N5 → N1 会話重視の文法進行</span>}
          {showEnglish && <span className="block">JLPT N5 → N1 Conversation-Focused Progression</span>}
        </p>
      </div>

      {/* Level Selector */}
      <div className="mb-4 sm:mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
          {grammarRoadmap.map((level) => {
            const progress = getLevelProgress(level)
            return (
              <button
                key={level.id}
                onClick={() => {
                  setSelectedLevel(level)
                  setShowDrills(false)
                }}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all touch-manipulation ${
                  selectedLevel.id === level.id
                    ? `bg-gradient-to-br ${getLevelColor(level.level)} text-white border-transparent shadow-lg`
                    : 'bg-white border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-lg sm:text-xl font-bold">{level.level}</div>
                <div className="text-xs sm:text-sm opacity-90">{level.jfLevel}</div>
                <div className="mt-2 text-xs sm:text-sm font-semibold">
                  {progress.completed}/{progress.total}
                </div>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-white h-1.5 rounded-full transition-all"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Level Info */}
      <div className={`mb-4 sm:mb-6 p-4 sm:p-6 rounded-lg bg-gradient-to-br ${getLevelColor(selectedLevel.level)} text-white`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">
              {selectedLevel.level} - {showJapanese && selectedLevel.title.ja}
              {showJapanese && showEnglish && ' / '}
              {showEnglish && selectedLevel.title.en}
            </h3>
            <p className="text-sm sm:text-base opacity-90 mt-1">
              ⏱️ {selectedLevel.timeframe}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold">{currentProgress.percentage}%</div>
            <div className="text-xs sm:text-sm opacity-90">
              {currentProgress.completed}/{currentProgress.total} {showEnglish && 'complete'}
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base mb-3 break-words">
          <strong>{showJapanese && '目標：'}{showEnglish && 'Goal: '}</strong>
          {showJapanese && selectedLevel.goal.ja}
          {showJapanese && showEnglish && ' / '}
          {showEnglish && selectedLevel.goal.en}
        </p>

        <div className="mb-3">
          <strong className="text-sm sm:text-base">{showJapanese && '重点：'}{showEnglish && 'Key Focus:'}</strong>
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
            {selectedLevel.keyFocus.map((focus, idx) => (
              <span key={idx} className="px-2 py-1 bg-white bg-opacity-20 rounded text-xs sm:text-sm">
                {focus}
              </span>
            ))}
          </div>
        </div>

        <div>
          <strong className="text-sm sm:text-base">{showJapanese && 'マイルストーン：'}{showEnglish && 'Milestones:'}</strong>
          <ul className="mt-1 space-y-1 text-xs sm:text-sm">
            {selectedLevel.milestones.map((milestone, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2">✓</span>
                <span className="break-words">{milestone}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
        <button
          onClick={() => setShowDrills(false)}
          className={`flex-1 py-2 sm:py-3 px-4 rounded-lg font-bold transition-all touch-manipulation ${
            !showDrills
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          📚 {showJapanese && '文法ポイント'} {showEnglish && 'Grammar Points'}
        </button>
        <button
          onClick={() => setShowDrills(true)}
          className={`flex-1 py-2 sm:py-3 px-4 rounded-lg font-bold transition-all touch-manipulation ${
            showDrills
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          💬 {showJapanese && '会話練習'} {showEnglish && 'Conversation Drills'}
        </button>
      </div>

      {/* Grammar Points Checklist */}
      {!showDrills && (
        <div className="space-y-2 sm:space-y-3">
          {selectedLevel.grammarPoints.map((point) => {
            const isChecked = checkedGrammar.has(point.id)
            const isExpanded = expandedPoint === point.id

            return (
              <div
                key={point.id}
                className={`border-2 rounded-lg transition-all ${
                  isChecked ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
                }`}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleGrammarPoint(point.id)}
                      className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded border-2 flex items-center justify-center transition-all touch-manipulation"
                      style={{
                        borderColor: isChecked ? '#10b981' : '#d1d5db',
                        backgroundColor: isChecked ? '#10b981' : 'white'
                      }}
                    >
                      {isChecked && <span className="text-white text-lg">✓</span>}
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-base sm:text-lg font-bold break-words">{point.grammar}</span>
                        <span className={`px-2 py-0.5 rounded border text-xs ${getPriorityColor(point.conversationPriority)}`}>
                          {point.conversationPriority}
                        </span>
                      </div>

                      <div className="text-sm sm:text-base text-gray-700 mb-2 break-words">
                        {point.meaning}
                      </div>

                      {/* Example (always visible) */}
                      <div className="bg-blue-50 p-2 sm:p-3 rounded border-l-4 border-blue-500">
                        <div className="text-base sm:text-lg font-bold mb-1 break-words">
                          {point.example.ja}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 mb-1 break-words">
                          {point.example.romaji}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 break-words">
                          → {point.example.en}
                        </div>
                      </div>

                      {/* Notes */}
                      {point.notes && (
                        <div className="mt-2 text-xs sm:text-sm text-purple-700 bg-purple-50 p-2 rounded break-words">
                          💡 {point.notes}
                        </div>
                      )}

                      {/* Expand button */}
                      <button
                        onClick={() => setExpandedPoint(isExpanded ? null : point.id)}
                        className="mt-2 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        {isExpanded ? '▼ Hide details' : '▶ Show more examples'}
                      </button>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">
                            {showJapanese && '会話で使う：'}{showEnglish && 'Use in conversation:'}
                          </p>
                          <div className="space-y-2">
                            <div className="text-sm break-words">
                              <strong>Context:</strong> {point.conversationPriority === 'essential' 
                                ? 'Must master for basic conversation' 
                                : point.conversationPriority === 'high'
                                ? 'Very common in daily speech'
                                : point.conversationPriority === 'medium'
                                ? 'Useful for more complex topics'
                                : 'Formal/literary contexts'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Conversation Drills */}
      {showDrills && (
        <div className="space-y-4 sm:space-y-6">
          {selectedLevel.conversationDrills.map((drill) => (
            <div key={drill.id} className="border-2 border-purple-300 rounded-lg p-3 sm:p-4 bg-purple-50">
              <h4 className="text-base sm:text-lg font-bold mb-2 text-purple-900 break-words">
                {drill.pattern}
              </h4>
              <p className="text-xs sm:text-sm text-purple-700 mb-3 break-words">
                📝 {drill.practice}
              </p>

              <div className="space-y-3">
                {drill.examples.map((example, idx) => (
                  <div key={idx} className="bg-white p-3 sm:p-4 rounded-lg border border-purple-200">
                    <div className="text-base sm:text-lg font-bold mb-1 break-words">
                      {example.ja}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mb-1 break-words">
                      {example.romaji}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-700 break-words">
                      → {example.en}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                <p className="text-xs sm:text-sm text-yellow-800 break-words">
                  💡 <strong>{showJapanese && '練習：'}{showEnglish && 'Practice: '}</strong>
                  {showJapanese && 'このパターンを使って自分の文を3つ作ってください。'}
                  {showEnglish && 'Create 3 of your own sentences using this pattern.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Conversation Priority List */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300">
        <h3 className="text-lg sm:text-xl font-bold mb-3 text-yellow-900">
          🎯 {showJapanese && '会話優先順位'} {showEnglish && 'Conversation Priority Order'}
        </h3>
        <p className="text-xs sm:text-sm text-yellow-800 mb-3 break-words">
          {showJapanese && 'スピーキングのために、この順序で学習してください：'}
          {showEnglish && 'For speaking, learn in this order:'}
        </p>
        <ol className="space-y-2 text-xs sm:text-sm">
          {conversationPriorityList.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="font-bold text-yellow-700 mr-2 flex-shrink-0">{idx + 1}.</span>
              <span className="text-gray-700 break-words">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Progress Summary */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-300">
        <h3 className="text-lg sm:text-xl font-bold mb-3 text-green-900">
          📊 {showJapanese && '全体の進捗'} {showEnglish && 'Overall Progress'}
        </h3>
        <div className="space-y-2">
          {grammarRoadmap.map((level) => {
            const progress = getLevelProgress(level)
            return (
              <div key={level.id} className="flex items-center gap-3">
                <span className="font-bold text-sm sm:text-base w-12">{level.level}</span>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                    <div
                      className={`h-3 sm:h-4 rounded-full transition-all bg-gradient-to-r ${getLevelColor(level.level)}`}
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-semibold w-16 text-right">
                  {progress.completed}/{progress.total}
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-white rounded border border-green-300">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-700">
              {checkedGrammar.size}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              {showJapanese && '合計完了した文法ポイント'}
              {showEnglish && 'Total Grammar Points Completed'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
