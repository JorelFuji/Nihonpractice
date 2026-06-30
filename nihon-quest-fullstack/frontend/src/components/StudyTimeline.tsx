/**
 * Study Timeline Component
 * Visual timeline showing recommended study progression with milestones
 */

import { useState } from 'react'

interface TimelinePhase {
  id: string
  months: string
  level: string
  title: {
    ja: string
    en: string
  }
  focus: string[]
  milestones: string[]
  drills: string[]
  color: string
}

const studyTimeline: TimelinePhase[] = [
  {
    id: 'phase-1',
    months: 'Months 1-3',
    level: 'N5',
    title: {
      ja: 'N5 基礎',
      en: 'N5 Foundation'
    },
    focus: [
      'です, ます, particles',
      'Basic verbs, adjectives',
      'Questions, time, numbers',
      'Family, food, location'
    ],
    milestones: [
      'Can introduce yourself',
      'Can order food',
      'Can ask basic questions',
      'Can describe daily life'
    ],
    drills: [
      '私は ___ です。',
      '___ が好きです。',
      '___ に行きたいです。',
      '___ はどこですか。'
    ],
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'phase-2',
    months: 'Months 4-8',
    level: 'N4',
    title: {
      ja: 'N4 日常会話',
      en: 'N4 Everyday Speech'
    },
    focus: [
      'て-form mastery',
      'Casual form',
      'Conditionals',
      'Requests, reasons, comparisons'
    ],
    milestones: [
      'Can use て-form naturally',
      'Can express ability',
      'Can make comparisons',
      'Can talk about experiences'
    ],
    drills: [
      '日本語を話せます。',
      '明日、雨だったら行きません。',
      '手伝ってもいいですか。'
    ],
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'phase-3',
    months: 'Months 9-15',
    level: 'N3',
    title: {
      ja: 'N3 実践会話',
      en: 'N3 Real Conversation'
    },
    focus: [
      'Plain/casual form mastery',
      'んです explanatory tone',
      'Inference patterns',
      'Passive/causative, basic keigo'
    ],
    milestones: [
      'Can speak naturally in casual form',
      'Can explain reasons',
      'Can express plans and intentions',
      'Can use basic honorific language'
    ],
    drills: [
      '日本語が少しわかるようになりました。',
      '来年、日本に住むつもりです。',
      '妻は忙しいみたいです。'
    ],
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'phase-4',
    months: 'Months 16-30',
    level: 'N2',
    title: {
      ja: 'N2 中級',
      en: 'N2 Strong Intermediate'
    },
    focus: [
      'Adult conversation nuance',
      'Work Japanese',
      'Formal expressions',
      'Complex reasoning'
    ],
    milestones: [
      'Can discuss abstract topics',
      'Can express complex opinions',
      'Can understand news',
      'Can handle workplace Japanese'
    ],
    drills: [
      'その意見に対して、少し違う考えがあります。',
      '確認した上で、また連絡します。'
    ],
    color: 'from-orange-400 to-orange-600'
  },
  {
    id: 'phase-5',
    months: 'Months 30+',
    level: 'N1',
    title: {
      ja: 'N1 上級',
      en: 'N1 Advanced/Fluent'
    },
    focus: [
      'Formal/literary Japanese',
      'Business keigo mastery',
      'Nuanced expressions',
      'Cultural idioms'
    ],
    milestones: [
      'Can read newspapers fluently',
      'Can handle business negotiations',
      'Can write formal documents',
      'Can understand literary texts'
    ],
    drills: [
      '結果を踏まえて、次の行動を決めます。'
    ],
    color: 'from-red-400 to-red-600'
  }
]

interface Props {
  showJapanese: boolean
  showEnglish: boolean
}

export default function StudyTimeline({ showJapanese, showEnglish }: Props) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null)

  return (
    <div className="study-timeline bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">
          {showJapanese && <span className="block sm:inline">学習タイムライン</span>}
          {showJapanese && showEnglish && <span className="hidden sm:inline"> / </span>}
          {showEnglish && <span className="block sm:inline">Study Timeline</span>}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 break-words">
          {showJapanese && <span className="block">初級から上級まで：推奨される学習進行</span>}
          {showEnglish && <span className="block">Beginner to Advanced: Recommended Study Progression</span>}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line (desktop) */}
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-purple-400 to-red-400" />

        {/* Timeline phases */}
        <div className="space-y-4 sm:space-y-6">
          {studyTimeline.map((phase) => {
            const isExpanded = expandedPhase === phase.id

            return (
              <div key={phase.id} className="relative">
                {/* Timeline dot (desktop) */}
                <div className="hidden md:block absolute left-6 top-6 w-5 h-5 rounded-full bg-white border-4 border-purple-500 z-10" />

                {/* Phase card */}
                <div className="md:ml-16">
                  <button
                    onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                    className={`w-full text-left p-4 sm:p-6 rounded-lg border-2 transition-all touch-manipulation ${
                      isExpanded
                        ? `bg-gradient-to-br ${phase.color} text-white border-transparent shadow-xl`
                        : 'bg-white border-gray-300 hover:border-gray-400 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                      <div>
                        <div className="text-xs sm:text-sm font-semibold opacity-90 mb-1">
                          {phase.months}
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                          {phase.level} - {showJapanese && phase.title.ja}
                          {showJapanese && showEnglish && ' / '}
                          {showEnglish && phase.title.en}
                        </h3>
                      </div>
                      <div className="text-2xl">
                        {isExpanded ? '▼' : '▶'}
                      </div>
                    </div>

                    {/* Preview (always visible) */}
                    {!isExpanded && (
                      <div className="text-sm sm:text-base opacity-90">
                        <strong>{showJapanese && '重点：'}{showEnglish && 'Focus: '}</strong>
                        {phase.focus[0]}, {phase.focus[1]}...
                      </div>
                    )}
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="mt-3 p-4 sm:p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
                      {/* Focus areas */}
                      <div className="mb-4">
                        <h4 className="font-bold text-base sm:text-lg mb-2">
                          {showJapanese && '重点分野'} {showEnglish && 'Focus Areas'}
                        </h4>
                        <ul className="space-y-1 text-sm sm:text-base">
                          {phase.focus.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-purple-500 mr-2">•</span>
                              <span className="break-words">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Milestones */}
                      <div className="mb-4">
                        <h4 className="font-bold text-base sm:text-lg mb-2">
                          🎯 {showJapanese && 'マイルストーン'} {showEnglish && 'Milestones'}
                        </h4>
                        <ul className="space-y-1 text-sm sm:text-base">
                          {phase.milestones.map((milestone, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span className="break-words">{milestone}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Daily drills */}
                      <div>
                        <h4 className="font-bold text-base sm:text-lg mb-2">
                          💬 {showJapanese && '毎日の練習'} {showEnglish && 'Daily Drills'}
                        </h4>
                        <div className="space-y-2">
                          {phase.drills.map((drill, idx) => (
                            <div key={idx} className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                              <code className="text-sm sm:text-base break-words">{drill}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Study tips */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300">
        <h3 className="text-lg sm:text-xl font-bold mb-3 text-yellow-900">
          💡 {showJapanese && '学習のコツ'} {showEnglish && 'Study Tips'}
        </h3>
        <ul className="space-y-2 text-sm sm:text-base text-gray-700">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <span className="break-words">
              {showJapanese && '毎日少しずつ練習する（30分でも効果的）'}
              {showEnglish && 'Practice a little every day (even 30 minutes is effective)'}
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <span className="break-words">
              {showJapanese && '家族と日本語で話す機会を作る'}
              {showEnglish && 'Create opportunities to speak Japanese with family'}
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <span className="break-words">
              {showJapanese && '文法を覚えるだけでなく、実際に使う'}
              {showEnglish && 'Don\'t just memorize grammar - actually use it'}
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">4.</span>
            <span className="break-words">
              {showJapanese && '間違いを恐れずに話す（間違いから学ぶ）'}
              {showEnglish && 'Don\'t fear mistakes - learn from them'}
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">5.</span>
            <span className="break-words">
              {showJapanese && 'N5とN4をしっかり固めることが最も重要'}
              {showEnglish && 'Solidifying N5 and N4 is most important for conversation'}
            </span>
          </li>
        </ul>
      </div>

      {/* Your advantage */}
      <div className="mt-4 p-4 sm:p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-300">
        <h3 className="text-lg sm:text-xl font-bold mb-3 text-green-900">
          🌟 {showJapanese && 'あなたの強み'} {showEnglish && 'Your Advantage'}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 mb-3 break-words">
          {showJapanese && '日本人の家族がいることは大きなアドバンテージです：'}
          {showEnglish && 'Having a Japanese family is a huge advantage:'}
        </p>
        <ul className="space-y-2 text-sm sm:text-base text-gray-700">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="break-words">
              {showJapanese && 'Meiさんと毎日カジュアルフォームで話す（N4-N3レベル）'}
              {showEnglish && 'Speak casual form with Mei daily (N4-N3 level)'}
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="break-words">
              {showJapanese && '義理の家族と丁寧語・敬語を練習（N3レベル）'}
              {showEnglish && 'Practice polite/keigo with in-laws (N3 level)'}
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="break-words">
              {showJapanese && '子供たちと自然な日本語を学ぶ'}
              {showEnglish && 'Learn natural Japanese with children'}
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="break-words">
              {showJapanese && '毎日の食事が無料のイマージョン環境'}
              {showEnglish && 'Every meal is free immersion practice'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
