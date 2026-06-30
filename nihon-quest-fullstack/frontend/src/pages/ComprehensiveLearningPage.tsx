/**
 * Comprehensive Learning Page
 * All learning modules with bilingual content, rationale, and skill checkoffs
 */

import { useState } from 'react'
import { allModules } from '../data/learningModules'
import { grammarModules } from '../data/grammarModules'
import { particlesModules } from '../data/particlesModule'
import { hiraganaChart, katakanaChart, kanaRows } from '../data/kanaCharts'
import SOVParticlePractice from '../components/SOVParticlePractice'
import GrammarRoadmapView from '../components/GrammarRoadmapView'
import type { LearningModule } from '../data/learningModules'

export default function ComprehensiveLearningPage() {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<number>(0)
  const [showEnglish, setShowEnglish] = useState(true)
  const [showJapanese, setShowJapanese] = useState(true)
  const [activeTab, setActiveTab] = useState<'lessons' | 'hiragana' | 'katakana' | 'checkoff' | 'roadmap'>('lessons')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const allLearningModules = [...allModules, ...grammarModules, ...particlesModules]

  return (
    <div className="comprehensive-learning-page min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-2 sm:p-4 md:p-6 overflow-x-hidden overflow-y-auto w-full">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4 sm:mb-6 md:mb-8 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 px-2">
          {showJapanese && <span className="text-purple-600 block sm:inline">学習センター</span>}
          {showJapanese && showEnglish && <span className="mx-2 hidden sm:inline">/</span>}
          {showEnglish && <span className="text-pink-600 block sm:inline">Learning Center</span>}
        </h1>
        <p className="text-center text-sm sm:text-base text-gray-600 px-4">
          {showJapanese && <span className="block sm:inline">初級から上級まで、体系的に学びます</span>}
          {showJapanese && showEnglish && <span className="mx-2 hidden sm:inline">•</span>}
          {showEnglish && <span className="block sm:inline">Structured learning from beginner to advanced</span>}
        </p>

        {/* Language Toggle */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 px-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showJapanese}
              onChange={(e) => setShowJapanese(e.target.checked)}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span className="text-sm sm:text-base md:text-lg whitespace-nowrap">🇯🇵 日本語</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showEnglish}
              onChange={(e) => setShowEnglish(e.target.checked)}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span className="text-sm sm:text-base md:text-lg whitespace-nowrap">🇺🇸 English</span>
          </label>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 w-full overflow-x-hidden">
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-semibold flex items-center justify-between"
          >
            <span className="text-sm sm:text-base">
              {showJapanese && '学習モジュール'}
              {showJapanese && showEnglish && ' / '}
              {showEnglish && 'Learning Modules'}
            </span>
            <span className="text-xl">{sidebarOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Sidebar - Module List */}
        <div className={`lg:col-span-1 ${sidebarOpen ? 'block' : 'hidden lg:block'} w-full overflow-x-hidden`}>
          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 lg:sticky lg:top-6 max-h-[80vh] overflow-y-auto overflow-x-hidden w-full">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-purple-600 break-words">
              {showJapanese && <span className="block sm:inline">学習モジュール</span>}
              {showJapanese && showEnglish && <span className="hidden sm:inline"> / </span>}
              {showEnglish && <span className="block sm:inline">Learning Modules</span>}
            </h2>

            <div className="space-y-2">
              {allLearningModules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => {
                    setSelectedModule(module)
                    setSelectedLesson(0)
                    setActiveTab('lessons')
                    setSidebarOpen(false)
                  }}
                  className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all touch-manipulation ${
                    selectedModule?.id === module.id
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'bg-gray-50 hover:bg-gray-100 active:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold text-sm sm:text-base break-words">
                    {showJapanese && <span className="block">{module.title.ja}</span>}
                    {showEnglish && <span className="text-xs sm:text-sm text-gray-600 block">{module.title.en}</span>}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {module.level} • {module.lessons.length} lessons
                  </div>
                </button>
              ))}

              {/* Kana Charts */}
              <button
                onClick={() => {
                  setSelectedModule(null)
                  setActiveTab('hiragana')
                  setSidebarOpen(false)
                }}
                className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all touch-manipulation ${
                  activeTab === 'hiragana'
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100 active:bg-gray-200'
                }`}
              >
                <div className="font-semibold text-sm sm:text-base break-words">
                  {showJapanese && <span className="block">ひらがな表</span>}
                  {showEnglish && <span className="text-xs sm:text-sm text-gray-600 block">Hiragana Chart</span>}
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedModule(null)
                  setActiveTab('katakana')
                  setSidebarOpen(false)
                }}
                className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all touch-manipulation ${
                  activeTab === 'katakana'
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-gray-50 hover:bg-gray-100 active:bg-gray-200'
                }`}
              >
                <div className="font-semibold text-sm sm:text-base break-words">
                  {showJapanese && <span className="block">カタカナ表</span>}
                  {showEnglish && <span className="text-xs sm:text-sm text-gray-600 block">Katakana Chart</span>}
                </div>
              </button>

              {/* Grammar Roadmap */}
              <button
                onClick={() => {
                  setSelectedModule(null)
                  setActiveTab('roadmap')
                  setSidebarOpen(false)
                }}
                className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all touch-manipulation ${
                  activeTab === 'roadmap'
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-500'
                    : 'bg-gray-50 hover:bg-gray-100 active:bg-gray-200'
                }`}
              >
                <div className="font-semibold text-sm sm:text-base break-words">
                  {showJapanese && <span className="block">🗺️ 文法ロードマップ</span>}
                  {showEnglish && <span className="text-xs sm:text-sm text-gray-600 block">Grammar Roadmap (N5-N1)</span>}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* Hiragana Chart */}
          {activeTab === 'hiragana' && (
            <HiraganaChartView
              showJapanese={showJapanese}
              showEnglish={showEnglish}
            />
          )}

          {/* Katakana Chart */}
          {activeTab === 'katakana' && (
            <KatakanaChartView
              showJapanese={showJapanese}
              showEnglish={showEnglish}
            />
          )}

          {/* Grammar Roadmap */}
          {activeTab === 'roadmap' && (
            <GrammarRoadmapView
              showJapanese={showJapanese}
              showEnglish={showEnglish}
            />
          )}

          {/* Module Content */}
          {selectedModule && activeTab === 'lessons' && (
            <ModuleContent
              module={selectedModule}
              selectedLesson={selectedLesson}
              setSelectedLesson={setSelectedLesson}
              showJapanese={showJapanese}
              showEnglish={showEnglish}
              onCheckoff={() => setActiveTab('checkoff')}
            />
          )}

          {/* Skill Checkoff */}
          {selectedModule && activeTab === 'checkoff' && (
            <SkillCheckoffView
              module={selectedModule}
              showJapanese={showJapanese}
              showEnglish={showEnglish}
            />
          )}

          {/* Welcome Screen */}
          {!selectedModule && activeTab === 'lessons' && (
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 px-2">
                {showJapanese && <span className="block sm:inline">学習モジュールを選んでください</span>}
                {showJapanese && showEnglish && <br className="hidden sm:block" />}
                {showEnglish && <span className="block sm:inline">Select a Learning Module</span>}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2">
                {showJapanese && <span className="block sm:inline">左のメニューから学習したいトピックを選んでください。</span>}
                {showJapanese && showEnglish && <br className="hidden sm:block" />}
                {showEnglish && <span className="block sm:inline">Choose a topic from the menu to begin learning.</span>}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8">
                {allLearningModules.slice(0, 6).map((module) => (
                  <button
                    key={module.id}
                    onClick={() => {
                      setSelectedModule(module)
                      setSidebarOpen(false)
                    }}
                    className="p-3 sm:p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg hover:shadow-lg active:shadow-md transition-all touch-manipulation"
                  >
                    <div className="text-2xl sm:text-3xl mb-2">
                      {module.category === 'basics' && '📚'}
                      {module.category === 'grammar' && '✏️'}
                      {module.category === 'time' && '⏰'}
                      {module.category === 'writing' && '✍️'}
                    </div>
                    <div className="font-semibold text-xs sm:text-sm break-words">
                      {showJapanese && <span className="block">{module.title.ja}</span>}
                      {showEnglish && <span className="text-xs block">{module.title.en}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Module Content Component
// ============================================================================

function ModuleContent({
  module,
  selectedLesson,
  setSelectedLesson,
  showJapanese,
  showEnglish,
  onCheckoff
}: {
  module: LearningModule
  selectedLesson: number
  setSelectedLesson: (n: number) => void
  showJapanese: boolean
  showEnglish: boolean
  onCheckoff: () => void
}) {
  const lesson = module.lessons[selectedLesson]

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
      {/* Lesson Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 pb-4 border-b gap-3">
        <button
          onClick={() => setSelectedLesson(Math.max(0, selectedLesson - 1))}
          disabled={selectedLesson === 0}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base touch-manipulation"
        >
          ← {showJapanese && '前'} {showEnglish && 'Previous'}
        </button>

        <div className="text-center flex-1 px-2">
          <div className="text-xs sm:text-sm text-gray-500">
            Lesson {selectedLesson + 1} / {module.lessons.length}
          </div>
          <div className="font-bold text-sm sm:text-base break-words">
            {showJapanese && <span className="block sm:inline">{lesson.title.ja}</span>}
            {showJapanese && showEnglish && <span className="hidden sm:inline"> / </span>}
            {showEnglish && <span className="block sm:inline">{lesson.title.en}</span>}
          </div>
        </div>

        <button
          onClick={() => setSelectedLesson(Math.min(module.lessons.length - 1, selectedLesson + 1))}
          disabled={selectedLesson === module.lessons.length - 1}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base touch-manipulation"
        >
          {showJapanese && '次'} {showEnglish && 'Next'} →
        </button>
      </div>

      {/* Rationale Section */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <h3 className="font-bold text-yellow-800 mb-2 text-sm sm:text-base break-words">
          💡 {showJapanese && <span className="block sm:inline">なぜこれを学ぶのか？</span>}
          {showJapanese && showEnglish && <span className="hidden sm:inline"> </span>}
          {showEnglish && <span className="block sm:inline">Why Learn This?</span>}
        </h3>
        <p className="text-gray-700 text-sm sm:text-base break-words">
          {showJapanese && <span className="block">{lesson.rationale.ja}</span>}
          {showJapanese && showEnglish && <br />}
          {showEnglish && <span className="block">{lesson.rationale.en}</span>}
        </p>
      </div>

      {/* Lesson Content */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          {showJapanese && '内容'} {showEnglish && 'Content'}
        </h3>
        {lesson.content.map((content, idx) => (
          <div key={idx} className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <p className="whitespace-pre-line text-sm sm:text-base break-words">
              {showJapanese && content.content.ja}
              {showJapanese && showEnglish && '\n\n'}
              {showEnglish && content.content.en}
            </p>
          </div>
        ))}
      </div>

      {/* Examples */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          {showJapanese && '例文'} {showEnglish && 'Examples'}
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {lesson.examples.map((example, idx) => (
            <div key={idx} className="p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="text-xl sm:text-2xl font-bold mb-2 break-words">{example.japanese}</div>
              <div className="text-base sm:text-lg text-gray-600 mb-2 break-words">({example.reading})</div>
              <div className="text-base sm:text-lg mb-3 break-words">{example.english}</div>

              {example.breakdown && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="text-xs sm:text-sm font-semibold mb-2">
                    {showJapanese && '分解：'} {showEnglish && 'Breakdown:'}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {example.breakdown.map((part, pidx) => (
                      <div key={pidx} className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                        <span className="font-bold break-all">{part.word}</span>
                        <span className="text-gray-600 break-all">({part.reading})</span>
                        <span className="text-gray-500 break-words">= {part.meaning}</span>
                        <span className="px-2 py-1 bg-blue-200 rounded text-xs whitespace-nowrap">{part.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Practice Exercises */}
      {lesson.practice.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
            {showJapanese && '練習問題'} {showEnglish && 'Practice'}
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {lesson.practice.map((exercise, idx) => (
              <div key={idx} className="p-3 sm:p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="font-semibold mb-2 text-sm sm:text-base break-words">
                  {showJapanese && <span className="block">{exercise.question.ja}</span>}
                  {showEnglish && <span className="block">{exercise.question.en}</span>}
                </div>
                {exercise.options && (
                  <div className="space-y-2 mt-3">
                    {exercise.options.map((option, oidx) => (
                      <button
                        key={oidx}
                        className="block w-full text-left p-2 sm:p-3 bg-white rounded hover:bg-green-100 active:bg-green-200 transition-colors text-sm sm:text-base break-words touch-manipulation"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SOV Particle Practice (only for particles module) */}
      {module.id === 'particles' && (
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
            {showJapanese && 'インタラクティブ練習'} {showEnglish && 'Interactive Practice'}
          </h3>
          <SOVParticlePractice showJapanese={showJapanese} showEnglish={showEnglish} />
        </div>
      )}

      {/* Skill Checkoff Button */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
        <button
          onClick={onCheckoff}
          className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg active:shadow-md transition-all text-sm sm:text-base touch-manipulation"
        >
          {showJapanese && <span className="block sm:inline">スキルチェックに進む</span>}
          {showJapanese && showEnglish && <span className="hidden sm:inline"> </span>}
          {showEnglish && <span className="block sm:inline">Go to Skill Checkoff</span>} →
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// Hiragana Chart Component
// ============================================================================

function HiraganaChartView({ showJapanese, showEnglish }: { showJapanese: boolean; showEnglish: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center break-words">
        {showJapanese && <span className="block sm:inline">ひらがな表</span>}
        {showJapanese && showEnglish && <span className="hidden sm:inline"> / </span>}
        {showEnglish && <span className="block sm:inline">Hiragana Chart</span>}
      </h2>

      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr>
              <th className="border p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm"></th>
              <th className="border p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm">a</th>
              <th className="border p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm">i</th>
              <th className="border p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm">u</th>
              <th className="border p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm">e</th>
              <th className="border p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm">o</th>
            </tr>
          </thead>
          <tbody>
            {kanaRows.map((row) => (
              <tr key={row}>
                <td className="border p-1 sm:p-2 bg-gray-50 font-bold text-xs sm:text-sm whitespace-nowrap">{row}</td>
                {['a', 'i', 'u', 'e', 'o'].map((col) => {
                  const char = hiraganaChart.find((c) => c.row === row && c.column === col)
                  return (
                    <td key={col} className="border p-2 sm:p-3 md:p-4 text-center hover:bg-blue-50 active:bg-blue-100 cursor-pointer touch-manipulation">
                      {char && (
                        <div>
                          <div className="text-2xl sm:text-3xl font-bold mb-1">{char.character}</div>
                          <div className="text-xs sm:text-sm text-gray-600">{char.romaji}</div>
                          {showEnglish && char.mnemonic && (
                            <div className="text-xs text-gray-500 mt-1 sm:mt-2 hidden md:block">{char.mnemonic.en.slice(0, 30)}...</div>
                          )}
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 text-center">
        {showJapanese && <span className="block sm:inline">タップして詳細を見る</span>}
        {showJapanese && showEnglish && <span className="hidden sm:inline"> • </span>}
        {showEnglish && <span className="block sm:inline">Tap characters for details</span>}
      </p>
    </div>
  )
}

// ============================================================================
// Katakana Chart Component
// ============================================================================

function KatakanaChartView({ showJapanese, showEnglish }: { showJapanese: boolean; showEnglish: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center break-words">
        {showJapanese && <span className="block sm:inline">カタカナ表</span>}
        {showJapanese && showEnglish && <span className="hidden sm:inline"> / </span>}
        {showEnglish && <span className="block sm:inline">Katakana Chart</span>}
      </h2>

      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr>
              <th className="border p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm"></th>
              <th className="border p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm">a</th>
              <th className="border p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm">i</th>
              <th className="border p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm">u</th>
              <th className="border p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm">e</th>
              <th className="border p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm">o</th>
            </tr>
          </thead>
          <tbody>
            {kanaRows.map((row) => (
              <tr key={row}>
                <td className="border p-1 sm:p-2 bg-gray-50 font-bold text-xs sm:text-sm whitespace-nowrap">{row.replace('ひらがな', 'カタカナ')}</td>
                {['a', 'i', 'u', 'e', 'o'].map((col) => {
                  const char = katakanaChart.find((c) => c.row === row.replace('あ', 'ア').replace('か', 'カ').replace('さ', 'サ').replace('た', 'タ').replace('な', 'ナ').replace('は', 'ハ').replace('ま', 'マ').replace('や', 'ヤ').replace('ら', 'ラ').replace('わ', 'ワ') && c.column === col)
                  return (
                    <td key={col} className="border p-2 sm:p-3 md:p-4 text-center hover:bg-green-50 active:bg-green-100 cursor-pointer touch-manipulation">
                      {char && (
                        <div>
                          <div className="text-2xl sm:text-3xl font-bold mb-1">{char.character}</div>
                          <div className="text-xs sm:text-sm text-gray-600">{char.romaji}</div>
                          {char.hiragana && <div className="text-xs text-gray-500 hidden sm:block">({char.hiragana})</div>}
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 text-center">
        {showJapanese && <span className="block sm:inline">タップして詳細を見る</span>}
        {showJapanese && showEnglish && <span className="hidden sm:inline"> • </span>}
        {showEnglish && <span className="block sm:inline">Tap characters for details</span>}
      </p>
    </div>
  )
}

// ============================================================================
// Skill Checkoff Component
// ============================================================================

function SkillCheckoffView({
  module,
  showJapanese,
  showEnglish
}: {
  module: LearningModule
  showJapanese: boolean
  showEnglish: boolean
}) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleCheck = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  const completionRate = (checkedItems.size / module.skillCheckoff.requirements.length) * 100

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 break-words">
        {showJapanese && <span className="block sm:inline">{module.skillCheckoff.title.ja}</span>}
        {showJapanese && showEnglish && <br className="hidden sm:block" />}
        {showEnglish && <span className="block sm:inline">{module.skillCheckoff.title.en}</span>}
      </h2>

      {/* Progress Bar */}
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-xs sm:text-sm font-semibold">
            {showJapanese && '進捗'} {showEnglish && 'Progress'}
          </span>
          <span className="text-xs sm:text-sm font-semibold">{completionRate.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 sm:h-4 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Checkoff Items */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {module.skillCheckoff.requirements.map((item) => (
          <label
            key={item.id}
            className={`flex items-start sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all touch-manipulation ${
              checkedItems.has(item.id)
                ? 'bg-green-50 border-green-500'
                : 'bg-gray-50 border-gray-200 hover:border-gray-300 active:border-gray-400'
            }`}
          >
            <input
              type="checkbox"
              checked={checkedItems.has(item.id)}
              onChange={() => toggleCheck(item.id)}
              className="w-5 h-5 sm:w-6 sm:h-6 mt-0.5 sm:mt-0 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              {showJapanese && <div className="font-semibold text-sm sm:text-base break-words">{item.skill.ja}</div>}
              {showEnglish && <div className="text-gray-600 text-xs sm:text-sm break-words">{item.skill.en}</div>}
            </div>
          </label>
        ))}
      </div>

      {/* Completion Message */}
      {completionRate === 100 && (
        <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg text-center">
          <div className="text-3xl sm:text-4xl mb-2">🎉</div>
          <div className="text-lg sm:text-xl font-bold mb-2 break-words">
            {showJapanese && <span className="block sm:inline">おめでとうございます！</span>}
            {showJapanese && showEnglish && <br className="hidden sm:block" />}
            {showEnglish && <span className="block sm:inline">Congratulations!</span>}
          </div>
          <div className="text-gray-700 text-sm sm:text-base break-words">
            {showJapanese && <span className="block sm:inline">すべてのスキルをマスターしました！</span>}
            {showJapanese && showEnglish && <br className="hidden sm:block" />}
            {showEnglish && <span className="block sm:inline">You have mastered all skills in this module!</span>}
          </div>
        </div>
      )}
    </div>
  )
}
