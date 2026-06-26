import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Search, Star, Zap, Target, CheckCircle } from 'lucide-react'

// Enhanced Kanji data with mnemonics, hiragana, and visual aids
const kanjiByLevel = {
  N5: [
    { 
      kanji: '一', 
      reading: 'いち / イチ', 
      meaning: 'One', 
      strokes: 1,
      hiragana: 'いち',
      mnemonic: 'ONE horizontal line = 1',
      visual: '━',
      example: '一人 (ひとり) = one person',
      strokeOrder: '→'
    },
    { 
      kanji: '二', 
      reading: 'に / ニ', 
      meaning: 'Two', 
      strokes: 2,
      hiragana: 'に',
      mnemonic: 'TWO horizontal lines = 2',
      visual: '═',
      example: '二人 (ふたり) = two people',
      strokeOrder: '→ →'
    },
    { 
      kanji: '三', 
      reading: 'さん / サン', 
      meaning: 'Three', 
      strokes: 3,
      hiragana: 'さん',
      mnemonic: 'THREE horizontal lines = 3',
      visual: '≡',
      example: '三人 (さんにん) = three people',
      strokeOrder: '→ → →'
    },
    { 
      kanji: '日', 
      reading: 'にち / ひ', 
      meaning: 'Day, Sun', 
      strokes: 4,
      hiragana: 'ひ / にち',
      mnemonic: 'Picture of the SUN ☀️ in a box',
      visual: '☀️',
      example: '今日 (きょう) = today',
      strokeOrder: '| → | →'
    },
    { 
      kanji: '月', 
      reading: 'げつ / つき', 
      meaning: 'Month, Moon', 
      strokes: 4,
      hiragana: 'つき / げつ',
      mnemonic: 'Crescent MOON 🌙 shape',
      visual: '🌙',
      example: '月曜日 (げつようび) = Monday',
      strokeOrder: '丿 | ⌒ ー'
    },
    { 
      kanji: '火', 
      reading: 'か / ひ', 
      meaning: 'Fire', 
      strokes: 4,
      hiragana: 'ひ / か',
      mnemonic: 'Person with arms up fleeing FIRE 🔥',
      visual: '🔥',
      example: '火曜日 (かようび) = Tuesday',
      strokeOrder: '丶 ㇏ 丿 ㇏'
    },
    { 
      kanji: '水', 
      reading: 'すい / みず', 
      meaning: 'Water', 
      strokes: 4,
      hiragana: 'みず / すい',
      mnemonic: 'River flowing with drops 💧',
      visual: '💧',
      example: '水曜日 (すいようび) = Wednesday',
      strokeOrder: '丨 ⺀ 丿 ㇏'
    },
    { 
      kanji: '木', 
      reading: 'もく / き', 
      meaning: 'Tree, Wood', 
      strokes: 4,
      hiragana: 'き / もく',
      mnemonic: 'Picture of a TREE 🌳 with branches',
      visual: '🌳',
      example: '木曜日 (もくようび) = Thursday',
      strokeOrder: '一 丨 丿 ㇏'
    },
    { 
      kanji: '金', 
      reading: 'きん / かね', 
      meaning: 'Gold, Money', 
      strokes: 8,
      hiragana: 'かね / きん',
      mnemonic: 'King 👑 under roof = GOLD',
      visual: '💰',
      example: '金曜日 (きんようび) = Friday',
      strokeOrder: '丿 一 一 丨 ノ ㇏ 一 丶'
    },
    { 
      kanji: '土', 
      reading: 'ど / つち', 
      meaning: 'Earth, Soil', 
      strokes: 3,
      hiragana: 'つち / ど',
      mnemonic: 'Plant growing from EARTH 🌱',
      visual: '🌱',
      example: '土曜日 (どようび) = Saturday',
      strokeOrder: '一 丨 一'
    },
    { 
      kanji: '人', 
      reading: 'じん / ひと', 
      meaning: 'Person', 
      strokes: 2,
      hiragana: 'ひと / じん',
      mnemonic: 'Walking PERSON 🚶 with two legs',
      visual: '🚶',
      example: '日本人 (にほんじん) = Japanese person',
      strokeOrder: '丿 ㇏'
    },
    { 
      kanji: '四', 
      reading: 'し / よん', 
      meaning: 'Four', 
      strokes: 5,
      hiragana: 'よん / し',
      mnemonic: 'FOUR corners in a box',
      visual: '4️⃣',
      example: '四月 (しがつ) = April',
      strokeOrder: '| ⌒ | | ー'
    },
    { 
      kanji: '五', 
      reading: 'ご', 
      meaning: 'Five', 
      strokes: 4,
      hiragana: 'ご',
      mnemonic: 'FIVE fingers working together',
      visual: '5️⃣',
      example: '五月 (ごがつ) = May',
      strokeOrder: '一 | ⌒ ー'
    },
    { 
      kanji: '六', 
      reading: 'ろく', 
      meaning: 'Six', 
      strokes: 4,
      hiragana: 'ろく',
      mnemonic: 'SIX-sided hat on top',
      visual: '6️⃣',
      example: '六月 (ろくがつ) = June',
      strokeOrder: '丶 一 丿 丶'
    },
    { 
      kanji: '七', 
      reading: 'しち / なな', 
      meaning: 'Seven', 
      strokes: 2,
      hiragana: 'なな / しち',
      mnemonic: 'SEVEN looks like a cut',
      visual: '7️⃣',
      example: '七月 (しちがつ) = July',
      strokeOrder: '一 | \\'
    },
    { 
      kanji: '八', 
      reading: 'はち', 
      meaning: 'Eight', 
      strokes: 2,
      hiragana: 'はち',
      mnemonic: 'EIGHT splits apart ∧',
      visual: '8️⃣',
      example: '八月 (はちがつ) = August',
      strokeOrder: '丿 ㇏'
    },
    { 
      kanji: '九', 
      reading: 'きゅう / く', 
      meaning: 'Nine', 
      strokes: 2,
      hiragana: 'きゅう / く',
      mnemonic: 'NINE with a hook 🪝',
      visual: '9️⃣',
      example: '九月 (くがつ) = September',
      strokeOrder: '丿 乙'
    },
    { 
      kanji: '十', 
      reading: 'じゅう / とお', 
      meaning: 'Ten', 
      strokes: 2,
      hiragana: 'じゅう / とお',
      mnemonic: 'TEN is a cross + symbol',
      visual: '🔟',
      example: '十月 (じゅうがつ) = October',
      strokeOrder: '一 |'
    },
    { 
      kanji: '百', 
      reading: 'ひゃく', 
      meaning: 'Hundred', 
      strokes: 6,
      hiragana: 'ひゃく',
      mnemonic: 'White 白 + ONE = 100',
      visual: '💯',
      example: '百円 (ひゃくえん) = 100 yen',
      strokeOrder: '一 丿 丨 | ⌒ ー'
    },
    { 
      kanji: '千', 
      reading: 'せん / ち', 
      meaning: 'Thousand', 
      strokes: 3,
      hiragana: 'せん / ち',
      mnemonic: 'TEN 十 with a slash = 1000',
      visual: '1️⃣0️⃣0️⃣0️⃣',
      example: '千円 (せんえん) = 1000 yen',
      strokeOrder: '丿 一 |'
    },
  ],
  N4: [
    { kanji: '会', reading: 'かい / あう', meaning: 'Meet, Meeting', strokes: 6 },
    { kanji: '社', reading: 'しゃ / やしろ', meaning: 'Company, Society', strokes: 7 },
    { kanji: '者', reading: 'しゃ / もの', meaning: 'Person', strokes: 8 },
    { kanji: '事', reading: 'じ / こと', meaning: 'Thing, Matter', strokes: 8 },
    { kanji: '自', reading: 'じ / みずから', meaning: 'Self', strokes: 6 },
    { kanji: '分', reading: 'ぶん / ぷん / わける', meaning: 'Part, Minute', strokes: 4 },
    { kanji: '前', reading: 'ぜん / まえ', meaning: 'Before, Front', strokes: 9 },
    { kanji: '後', reading: 'ご / あと / うしろ', meaning: 'After, Behind', strokes: 9 },
    { kanji: '大', reading: 'だい / たい / おお', meaning: 'Big, Large', strokes: 3 },
    { kanji: '小', reading: 'しょう / ちい', meaning: 'Small, Little', strokes: 3 },
  ],
  N3: [
    { kanji: '的', reading: 'てき / まと', meaning: 'Target, -tic', strokes: 8 },
    { kanji: '度', reading: 'ど / たび', meaning: 'Degree, Times', strokes: 9 },
    { kanji: '員', reading: 'いん', meaning: 'Member, Staff', strokes: 10 },
    { kanji: '界', reading: 'かい', meaning: 'World, Boundary', strokes: 9 },
    { kanji: '決', reading: 'けつ / きめる', meaning: 'Decide, Determine', strokes: 7 },
    { kanji: '全', reading: 'ぜん / まったく', meaning: 'Whole, All', strokes: 6 },
    { kanji: '表', reading: 'ひょう / あらわす', meaning: 'Express, Table', strokes: 8 },
    { kanji: '戦', reading: 'せん / たたかう', meaning: 'War, Battle', strokes: 13 },
    { kanji: '経', reading: 'けい / へる', meaning: 'Pass, Sutra', strokes: 11 },
    { kanji: '最', reading: 'さい / もっとも', meaning: 'Most, Utmost', strokes: 12 },
  ],
}

type KanjiLevel = keyof typeof kanjiByLevel

export default function KanjiPage() {
  const [selectedLevel, setSelectedLevel] = useState<KanjiLevel>('N5')
  const [selectedKanji, setSelectedKanji] = useState<typeof kanjiByLevel.N5[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [learnedKanji, setLearnedKanji] = useState<Set<string>>(new Set())

  const currentKanji = kanjiByLevel[selectedLevel]
  const filteredKanji = currentKanji.filter(k => 
    k.kanji.includes(searchTerm) || 
    k.reading.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleLearned = (kanji: string) => {
    const newSet = new Set(learnedKanji)
    if (newSet.has(kanji)) {
      newSet.delete(kanji)
    } else {
      newSet.add(kanji)
    }
    setLearnedKanji(newSet)
  }

  const learnedCount = currentKanji.filter(k => learnedKanji.has(k.kanji)).length
  const progress = (learnedCount / currentKanji.length) * 100

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2 flex items-center gap-2">
          <BookOpen className="w-8 h-8" />
          漢字 Kanji Learning
        </h1>
        <p className="text-muted-foreground">
          Master Japanese characters organized by JLPT level
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-300"
        >
          <Target className="w-6 h-6 text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-blue-700">{learnedCount}</div>
          <div className="text-sm text-blue-600">Learned</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-300"
        >
          <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
          <div className="text-2xl font-bold text-green-700">{Math.round(progress)}%</div>
          <div className="text-sm text-green-600">Progress</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-300"
        >
          <Star className="w-6 h-6 text-purple-600 mb-2" />
          <div className="text-2xl font-bold text-purple-700">{currentKanji.length}</div>
          <div className="text-sm text-purple-600">Total</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border-2 border-orange-300"
        >
          <Zap className="w-6 h-6 text-orange-600 mb-2" />
          <div className="text-2xl font-bold text-orange-700">{selectedLevel}</div>
          <div className="text-sm text-orange-600">Level</div>
        </motion.div>
      </div>

      {/* Level Selector & Learning Mode Hint */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {(['N5', 'N4', 'N3'] as KanjiLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => {
                setSelectedLevel(level)
                setSelectedKanji(null)
              }}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                selectedLevel === level
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              JLPT {level}
            </button>
          ))}
        </div>
        
        {/* Learning Tips */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-3xl">💡</div>
            <div>
              <div className="font-bold text-orange-700 mb-1">Learning Tips:</div>
              <ul className="text-sm text-orange-600 space-y-1">
                <li>• <strong>Visual:</strong> Use emoji pictures to remember kanji</li>
                <li>• <strong>Mnemonic:</strong> Fun stories help you memorize</li>
                <li>• <strong>Hiragana:</strong> Connect kanji to sounds you know</li>
                <li>• <strong>Examples:</strong> See kanji in real Japanese words</li>
                <li>• <strong>Stroke Order:</strong> Learn to write correctly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search kanji, reading, or meaning..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Kanji Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kanji List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {filteredKanji.map((k, index) => (
              <motion.button
                key={k.kanji}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => setSelectedKanji(k)}
                className={`relative aspect-square rounded-xl border-2 transition-all hover:scale-110 ${
                  selectedKanji?.kanji === k.kanji
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : learnedKanji.has(k.kanji)
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-primary/50'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-bold">{k.kanji}</span>
                </div>
                {learnedKanji.has(k.kanji) && (
                  <div className="absolute top-1 right-1">
                    <CheckCircle className="w-5 h-5 text-green-500" fill="currentColor" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Kanji Details */}
        <div className="lg:col-span-1">
          {selectedKanji ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border-2 border-primary p-6 sticky top-4"
            >
              <div className="text-center mb-6">
                <div className="text-8xl font-bold mb-4">{selectedKanji.kanji}</div>
                <button
                  onClick={() => toggleLearned(selectedKanji.kanji)}
                  className={`w-full py-2 rounded-lg font-bold transition-all ${
                    learnedKanji.has(selectedKanji.kanji)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {learnedKanji.has(selectedKanji.kanji) ? '✓ Learned' : 'Mark as Learned'}
                </button>
              </div>

              <div className="space-y-4">
                {/* Visual Memory Aid */}
                {'visual' in selectedKanji && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-200">
                    <div className="text-sm font-semibold text-purple-600 mb-2">👁️ Visual Aid</div>
                    <div className="text-5xl text-center mb-2">{selectedKanji.visual}</div>
                    <div className="text-sm text-purple-700 text-center font-medium">{selectedKanji.mnemonic}</div>
                  </div>
                )}

                {/* Hiragana Association */}
                {'hiragana' in selectedKanji && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-200">
                    <div className="text-sm font-semibold text-blue-600 mb-1">🔤 Hiragana</div>
                    <div className="text-3xl font-bold text-blue-700">{selectedKanji.hiragana}</div>
                    <div className="text-sm text-blue-600 mt-1">{selectedKanji.reading}</div>
                  </div>
                )}

                {/* Stroke Order */}
                {'strokeOrder' in selectedKanji && (
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border-2 border-orange-200">
                    <div className="text-sm font-semibold text-orange-600 mb-1">✏️ Stroke Order</div>
                    <div className="text-2xl font-mono text-orange-700">{selectedKanji.strokeOrder}</div>
                    <div className="text-xs text-orange-600 mt-1">{selectedKanji.strokes} strokes total</div>
                  </div>
                )}

                {/* Example Usage */}
                {'example' in selectedKanji && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
                    <div className="text-sm font-semibold text-green-600 mb-1">📝 Example</div>
                    <div className="text-lg font-bold text-green-700">{selectedKanji.example}</div>
                  </div>
                )}

                <div>
                  <div className="text-sm font-semibold text-gray-500 mb-1">Meaning</div>
                  <div className="text-lg font-bold">{selectedKanji.meaning}</div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-500 mb-1">Level</div>
                  <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                    JLPT {selectedLevel}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center sticky top-4">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">
                Select a kanji to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
