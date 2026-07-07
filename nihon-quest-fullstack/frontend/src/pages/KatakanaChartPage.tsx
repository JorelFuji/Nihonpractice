/**
 * Katakana Chart Page
 * Full-page view of Katakana characters with English romaji
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { KATAKANA_CHART, CharacterData } from '@/data/characterCharts';

export default function KatakanaChartPage() {
  const [selectedChar, setSelectedChar] = useState<CharacterData | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl"
          >
            <h1 className="text-4xl font-bold mb-2">🅱️ Katakana Chart (カタカナ)</h1>
            <p className="text-lg opacity-90">
              Complete 46-character chart • Used for foreign words & names
            </p>
            <p className="text-sm opacity-80 mt-2">
              Tap any character to see details • All with English romaji pronunciation
            </p>
          </motion.div>
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-6"
        >
          <div className="grid gap-3">
            {KATAKANA_CHART.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-5 gap-3">
                {row.map((cell, cellIndex) => (
                  <motion.button
                    key={cellIndex}
                    whileHover={cell.character ? { scale: 1.1 } : {}}
                    whileTap={cell.character ? { scale: 0.95 } : {}}
                    onClick={() => cell.character && setSelectedChar(cell)}
                    className={`${
                      cell.character
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white cursor-pointer hover:shadow-lg'
                        : 'bg-gray-100 cursor-default'
                    } rounded-xl p-4 text-center transition-all ${
                      selectedChar?.character === cell.character
                        ? 'ring-4 ring-yellow-400'
                        : ''
                    }`}
                    disabled={!cell.character}
                  >
                    {cell.character && (
                      <>
                        <div className="text-4xl font-bold mb-1">{cell.character}</div>
                        <div className="text-sm opacity-90">{cell.romaji}</div>
                      </>
                    )}
                  </motion.button>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Selected Character Details */}
        {selectedChar && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border-4 border-purple-200"
          >
            <div className="flex items-center gap-6">
              <div className="text-8xl font-bold text-purple-600">{selectedChar.character}</div>
              <div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  Romaji: {selectedChar.romaji}
                </div>
                <div className="text-lg text-gray-600">
                  Katakana character • Click another character to compare
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Learning Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-purple-50 rounded-xl p-6 border-2 border-purple-200"
        >
          <h3 className="text-xl font-bold text-purple-900 mb-3">💡 Katakana Learning Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Katakana is used for foreign words, names, and emphasis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Many look similar to Hiragana but are more angular and sharp</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Examples: コーヒー (kōhī - coffee), アメリカ (Amerika - America)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Use this chart as reference while playing games!</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
