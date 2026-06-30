/**
 * SOV Particle Practice Component
 * Interactive drag-and-drop practice for particles in SOV sentence structure
 */

import { useState } from 'react'

interface WordTile {
  id: string
  word: string
  reading: string
  type: 'subject' | 'object' | 'verb' | 'particle' | 'location' | 'time'
  english: string
  correctParticle?: string
}

interface SOVExercise {
  id: string
  level: 'N5' | 'N4' | 'N3'
  targetParticles: string[]
  tiles: WordTile[]
  correctOrder: string[]
  hint: { ja: string; en: string }
  explanation: { ja: string; en: string }
}

const exercises: SOVExercise[] = [
  // は and を practice
  {
    id: 'ex-1',
    level: 'N5',
    targetParticles: ['は', 'を'],
    tiles: [
      { id: '1', word: '私', reading: 'わたし', type: 'subject', english: 'I', correctParticle: 'は' },
      { id: '2', word: 'は', reading: 'は', type: 'particle', english: '(topic)' },
      { id: '3', word: 'りんご', reading: 'りんご', type: 'object', english: 'apple', correctParticle: 'を' },
      { id: '4', word: 'を', reading: 'を', type: 'particle', english: '(object)' },
      { id: '5', word: '食べます', reading: 'たべます', type: 'verb', english: 'eat' }
    ],
    correctOrder: ['1', '2', '3', '4', '5'],
    hint: {
      ja: 'SOV順序：主語は + 目的語を + 動詞',
      en: 'SOV order: Subject は + Object を + Verb'
    },
    explanation: {
      ja: '「は」は主題を示し、「を」は動作の対象を示します。',
      en: 'は marks the topic, を marks the object of action.'
    }
  },
  // に practice (location)
  {
    id: 'ex-2',
    level: 'N5',
    targetParticles: ['は', 'に'],
    tiles: [
      { id: '1', word: '私', reading: 'わたし', type: 'subject', english: 'I', correctParticle: 'は' },
      { id: '2', word: 'は', reading: 'は', type: 'particle', english: '(topic)' },
      { id: '3', word: '学校', reading: 'がっこう', type: 'location', english: 'school', correctParticle: 'に' },
      { id: '4', word: 'に', reading: 'に', type: 'particle', english: '(at/in)' },
      { id: '5', word: 'います', reading: 'います', type: 'verb', english: 'am/exist' }
    ],
    correctOrder: ['1', '2', '3', '4', '5'],
    hint: {
      ja: '「に」は存在の場所を示します。',
      en: 'に marks location of existence.'
    },
    explanation: {
      ja: '「います」は存在動詞なので「に」を使います。',
      en: 'います is an existence verb, so use に.'
    }
  },
  // で practice (action location)
  {
    id: 'ex-3',
    level: 'N5',
    targetParticles: ['は', 'で', 'を'],
    tiles: [
      { id: '1', word: '学生', reading: 'がくせい', type: 'subject', english: 'student', correctParticle: 'は' },
      { id: '2', word: 'は', reading: 'は', type: 'particle', english: '(topic)' },
      { id: '3', word: '図書館', reading: 'としょかん', type: 'location', english: 'library', correctParticle: 'で' },
      { id: '4', word: 'で', reading: 'で', type: 'particle', english: '(at/in)' },
      { id: '5', word: '本', reading: 'ほん', type: 'object', english: 'book', correctParticle: 'を' },
      { id: '6', word: 'を', reading: 'を', type: 'particle', english: '(object)' },
      { id: '7', word: '読みます', reading: 'よみます', type: 'verb', english: 'read' }
    ],
    correctOrder: ['1', '2', '3', '4', '5', '6', '7'],
    hint: {
      ja: '「で」は動作の場所を示します。',
      en: 'で marks location of action.'
    },
    explanation: {
      ja: '「読みます」は動作動詞なので「で」を使います。',
      en: '読みます is an action verb, so use で.'
    }
  },
  // に vs で practice
  {
    id: 'ex-4',
    level: 'N5',
    targetParticles: ['は', 'に', 'で', 'を'],
    tiles: [
      { id: '1', word: '私', reading: 'わたし', type: 'subject', english: 'I', correctParticle: 'は' },
      { id: '2', word: 'は', reading: 'は', type: 'particle', english: '(topic)' },
      { id: '3', word: '東京', reading: 'とうきょう', type: 'location', english: 'Tokyo', correctParticle: 'に' },
      { id: '4', word: 'に', reading: 'に', type: 'particle', english: '(to)' },
      { id: '5', word: '電車', reading: 'でんしゃ', type: 'object', english: 'train', correctParticle: 'で' },
      { id: '6', word: 'で', reading: 'で', type: 'particle', english: '(by)' },
      { id: '7', word: '行きます', reading: 'いきます', type: 'verb', english: 'go' }
    ],
    correctOrder: ['1', '2', '3', '4', '5', '6', '7'],
    hint: {
      ja: '「に」は目的地、「で」は手段を示します。',
      en: 'に marks destination, で marks means.'
    },
    explanation: {
      ja: '東京に（目的地）、電車で（手段）行きます。',
      en: 'Go to Tokyo (destination に), by train (means で).'
    }
  },
  // が practice (like/dislike)
  {
    id: 'ex-5',
    level: 'N5',
    targetParticles: ['は', 'が'],
    tiles: [
      { id: '1', word: '私', reading: 'わたし', type: 'subject', english: 'I', correctParticle: 'は' },
      { id: '2', word: 'は', reading: 'は', type: 'particle', english: '(topic)' },
      { id: '3', word: '寿司', reading: 'すし', type: 'object', english: 'sushi', correctParticle: 'が' },
      { id: '4', word: 'が', reading: 'が', type: 'particle', english: '(subject)' },
      { id: '5', word: '好きです', reading: 'すきです', type: 'verb', english: 'like' }
    ],
    correctOrder: ['1', '2', '3', '4', '5'],
    hint: {
      ja: '好き・嫌いの文では「が」を使います。',
      en: 'Use が with like/dislike expressions.'
    },
    explanation: {
      ja: '「私は」がトピック、「寿司が」が主語です。',
      en: '私は is the topic, 寿司が is the subject.'
    }
  }
]

interface Props {
  showJapanese: boolean
  showEnglish: boolean
}

export default function SOVParticlePractice({ showJapanese, showEnglish }: Props) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState<string[]>([])
  const [availableTiles, setAvailableTiles] = useState<WordTile[]>(exercises[0].tiles)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const exercise = exercises[currentExercise]

  const handleTileClick = (tile: WordTile) => {
    // Add to answer
    setUserAnswer([...userAnswer, tile.id])
    // Remove from available
    setAvailableTiles(availableTiles.filter(t => t.id !== tile.id))
    setFeedback(null)
  }

  const handleRemoveTile = (index: number) => {
    const tileId = userAnswer[index]
    const tile = exercise.tiles.find(t => t.id === tileId)
    if (tile) {
      setAvailableTiles([...availableTiles, tile])
      setUserAnswer(userAnswer.filter((_, i) => i !== index))
      setFeedback(null)
    }
  }

  const checkAnswer = () => {
    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(exercise.correctOrder)
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    if (isCorrect) {
      setShowExplanation(true)
    }
  }

  const resetExercise = () => {
    setUserAnswer([])
    setAvailableTiles(exercise.tiles)
    setFeedback(null)
    setShowHint(false)
    setShowExplanation(false)
  }

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setUserAnswer([])
      setAvailableTiles(exercises[currentExercise + 1].tiles)
      setFeedback(null)
      setShowHint(false)
      setShowExplanation(false)
    }
  }

  const previousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
      setUserAnswer([])
      setAvailableTiles(exercises[currentExercise - 1].tiles)
      setFeedback(null)
      setShowHint(false)
      setShowExplanation(false)
    }
  }

  const getTileColor = (type: string) => {
    switch (type) {
      case 'subject':
        return 'bg-blue-100 border-blue-500'
      case 'object':
        return 'bg-green-100 border-green-500'
      case 'verb':
        return 'bg-red-100 border-red-500'
      case 'particle':
        return 'bg-yellow-100 border-yellow-500'
      case 'location':
        return 'bg-purple-100 border-purple-500'
      case 'time':
        return 'bg-pink-100 border-pink-500'
      default:
        return 'bg-gray-100 border-gray-500'
    }
  }

  return (
    <div className="sov-particle-practice bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 break-words">
          {showJapanese && <span className="block sm:inline">助詞とSOV練習</span>}
          {showJapanese && showEnglish && <span className="hidden sm:inline"> / </span>}
          {showEnglish && <span className="block sm:inline">Particles & SOV Practice</span>}
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
          <span className="px-2 py-1 bg-purple-100 rounded">{exercise.level}</span>
          <span>
            {showJapanese && '練習'} {showEnglish && 'Exercise'} {currentExercise + 1} / {exercises.length}
          </span>
          <span>
            {showJapanese && '助詞：'} {showEnglish && 'Particles: '}
            {exercise.targetParticles.join(', ')}
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-sm sm:text-base break-words">
          {showJapanese && <span className="block">タイルをタップして正しい順序で文を作ってください。</span>}
          {showEnglish && <span className="block">Tap tiles to build the sentence in correct order.</span>}
        </p>
      </div>

      {/* Available Tiles */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-base font-semibold mb-2">
          {showJapanese && 'ことばバンク'} {showEnglish && 'Word Bank'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
          {availableTiles.map((tile) => (
            <button
              key={tile.id}
              onClick={() => handleTileClick(tile)}
              className={`${getTileColor(tile.type)} p-2 sm:p-3 rounded-lg border-2 transition-all hover:shadow-md active:shadow-sm touch-manipulation`}
            >
              <div className="text-base sm:text-lg font-bold break-words">{tile.word}</div>
              <div className="text-xs text-gray-600 break-words">({tile.reading})</div>
              <div className="text-xs text-gray-500 break-words">{tile.english}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Answer Area */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-base font-semibold mb-2">
          {showJapanese && 'あなたの答え'} {showEnglish && 'Your Answer'}
        </h3>
        <div className="min-h-[100px] p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          {userAnswer.length === 0 ? (
            <p className="text-gray-400 text-center text-sm sm:text-base">
              {showJapanese && 'ここにタイルを並べてください'}
              {showJapanese && showEnglish && ' / '}
              {showEnglish && 'Place tiles here'}
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {userAnswer.map((tileId, index) => {
                const tile = exercise.tiles.find(t => t.id === tileId)
                if (!tile) return null
                return (
                  <button
                    key={index}
                    onClick={() => handleRemoveTile(index)}
                    className={`${getTileColor(tile.type)} p-2 sm:p-3 rounded-lg border-2 transition-all hover:opacity-75 touch-manipulation`}
                  >
                    <div className="text-base sm:text-lg font-bold">{tile.word}</div>
                    <div className="text-xs text-gray-600">({tile.reading})</div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        <button
          onClick={checkAnswer}
          disabled={userAnswer.length === 0}
          className="flex-1 min-w-[120px] px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:shadow-md transition-all text-sm sm:text-base touch-manipulation"
        >
          {showJapanese && 'チェック'} {showEnglish && 'Check'}
        </button>
        <button
          onClick={resetExercise}
          className="px-4 py-2 sm:py-3 bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition-all text-sm sm:text-base touch-manipulation"
        >
          {showJapanese && 'リセット'} {showEnglish && 'Reset'}
        </button>
        <button
          onClick={() => setShowHint(!showHint)}
          className="px-4 py-2 sm:py-3 bg-blue-200 rounded-lg hover:bg-blue-300 active:bg-blue-400 transition-all text-sm sm:text-base touch-manipulation"
        >
          💡 {showJapanese && 'ヒント'} {showEnglish && 'Hint'}
        </button>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="mb-4 p-3 sm:p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
          <h4 className="font-bold text-yellow-800 mb-1 text-sm sm:text-base">
            💡 {showJapanese && 'ヒント'} {showEnglish && 'Hint'}
          </h4>
          <p className="text-sm sm:text-base break-words">
            {showJapanese && <span className="block">{exercise.hint.ja}</span>}
            {showEnglish && <span className="block">{exercise.hint.en}</span>}
          </p>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className={`mb-4 p-3 sm:p-4 rounded-lg border-l-4 ${
          feedback === 'correct'
            ? 'bg-green-50 border-green-500'
            : 'bg-red-50 border-red-500'
        }`}>
          <h4 className={`font-bold mb-1 text-sm sm:text-base ${
            feedback === 'correct' ? 'text-green-800' : 'text-red-800'
          }`}>
            {feedback === 'correct' ? '🎉 ' : '❌ '}
            {showJapanese && (feedback === 'correct' ? 'せいかい！' : 'ざんねん...')}
            {showJapanese && showEnglish && ' / '}
            {showEnglish && (feedback === 'correct' ? 'Correct!' : 'Incorrect')}
          </h4>
          {feedback === 'incorrect' && (
            <p className="text-sm break-words">
              {showJapanese && 'もう一度試してみてください。'}
              {showJapanese && showEnglish && ' '}
              {showEnglish && 'Try again!'}
            </p>
          )}
        </div>
      )}

      {/* Explanation */}
      {showExplanation && feedback === 'correct' && (
        <div className="mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-bold text-blue-800 mb-2 text-sm sm:text-base">
            📚 {showJapanese && '説明'} {showEnglish && 'Explanation'}
          </h4>
          <p className="text-sm sm:text-base break-words">
            {showJapanese && <span className="block">{exercise.explanation.ja}</span>}
            {showEnglish && <span className="block">{exercise.explanation.en}</span>}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3 pt-4 border-t">
        <button
          onClick={previousExercise}
          disabled={currentExercise === 0}
          className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 active:bg-gray-400 transition-all text-sm sm:text-base touch-manipulation"
        >
          ← {showJapanese && '前の練習'} {showEnglish && 'Previous'}
        </button>
        <button
          onClick={nextExercise}
          disabled={currentExercise === exercises.length - 1}
          className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 active:bg-gray-400 transition-all text-sm sm:text-base touch-manipulation"
        >
          {showJapanese && '次の練習'} {showEnglish && 'Next'} →
        </button>
      </div>
    </div>
  )
}
