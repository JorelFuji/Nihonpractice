/**
 * Kanji Chart Page
 * Full-page view of common JLPT N5 Kanji with English meanings
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMMON_KANJI, KanjiData } from '@/data/characterCharts';

export default function KanjiChartPage() {
  const [selectedKanji, setSelectedKanji] = useState<KanjiData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKanji = COMMON_KANJI.filter(
    (kanji) =>
      kanji.character.includes(searchTerm) ||
      kanji.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kanji.romaji.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-semibold mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl"
          >
            <h1 className="text-4xl font-bold mb-2">🈁 Common Kanji Chart (漢字)</h1>
            <p className="text-lg opacity-90">
              80+ Essential JLPT N5 Kanji • All with English meanings & examples
            </p>
            <p className="text-sm opacity-80 mt-2">
              Tap any kanji to see detailed information • Includes romaji readings
            </p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search kanji, meaning, or romaji..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none text-lg"
            />
          </div>
        </motion.div>

        {/* Kanji Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-6"
        >
          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2 mb-4">
            {filteredKanji.map((kanji, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedKanji(kanji)}
                className={`bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg p-3 text-center transition-all hover:shadow-lg ${
                  selectedKanji?.character === kanji.character
                    ? 'ring-4 ring-yellow-400'
                    : ''
                }`}
              >
                <div className="text-2xl font-bold">{kanji.character}</div>
              </motion.button>
            ))}
          </div>

          {filteredKanji.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No kanji found matching "{searchTerm}"
            </div>
          )}

          <div className="text-sm text-gray-600 text-center mt-4">
            Showing {filteredKanji.length} of {COMMON_KANJI.length} kanji
          </div>
        </motion.div>

        {/* Selected Kanji Details */}
        {selectedKanji && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 shadow-xl border-4 border-orange-200"
          >
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="text-9xl font-bold text-orange-600 sm:w-40 text-center">
                {selectedKanji.character}
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedKanji.meaning}
                </div>
                <div className="text-xl text-gray-600 mb-4">
                  Romaji: <span className="font-semibold">{selectedKanji.romaji}</span>
                </div>
                {selectedKanji.examples && selectedKanji.examples.length > 0 && (
                  <div className="mt-4">
                    <div className="text-lg font-semibold text-gray-700 mb-2">📝 Examples:</div>
                    <div className="space-y-2">
                      {selectedKanji.examples.map((example, idx) => (
                        <div
                          key={idx}
                          className="bg-white px-4 py-2 rounded-lg text-gray-800 font-medium"
                        >
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Learning Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-orange-50 rounded-xl p-6 border-2 border-orange-200"
        >
          <h3 className="text-xl font-bold text-orange-900 mb-3">💡 Kanji Learning Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>Kanji are Chinese characters used in Japanese writing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>Most kanji have multiple readings (on-yomi and kun-yomi)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>Learn radicals (building blocks) to remember complex kanji easier</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>Practice writing stroke order to improve recognition</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>Use this chart as reference while playing games!</span>
            </li>
          </ul>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-blue-200">
            <div className="text-2xl mb-2">🔢</div>
            <h4 className="font-bold text-gray-800 mb-1">Numbers</h4>
            <p className="text-sm text-gray-600">一二三四五六七八九十百千万</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-green-200">
            <div className="text-2xl mb-2">📅</div>
            <h4 className="font-bold text-gray-800 mb-1">Time & Days</h4>
            <p className="text-sm text-gray-600">日月火水木金土年時分週間</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-purple-200">
            <div className="text-2xl mb-2">👥</div>
            <h4 className="font-bold text-gray-800 mb-1">People & Family</h4>
            <p className="text-sm text-gray-600">人父母子男女先生友名</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-yellow-200">
            <div className="text-2xl mb-2">🗺️</div>
            <h4 className="font-bold text-gray-800 mb-1">Places</h4>
            <p className="text-sm text-gray-600">国本山川田学校駅店所</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-red-200">
            <div className="text-2xl mb-2">🧭</div>
            <h4 className="font-bold text-gray-800 mb-1">Directions</h4>
            <p className="text-sm text-gray-600">上下中外左右前後東西南北</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-pink-200">
            <div className="text-2xl mb-2">✨</div>
            <h4 className="font-bold text-gray-800 mb-1">Adjectives</h4>
            <p className="text-sm text-gray-600">大小高新古長白赤青黒</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
