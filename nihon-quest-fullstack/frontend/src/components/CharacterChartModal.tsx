/**
 * Character Chart Modal with PIP (Picture-in-Picture) Support
 * 
 * Features:
 * - Hiragana, Katakana, and Kanji charts
 * - Draggable and resizable
 * - Can stay open while playing games
 * - Toggle between chart types
 * - Minimizable to corner
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2, Move } from 'lucide-react';
import { HIRAGANA_CHART, KATAKANA_CHART, COMMON_KANJI, CharacterData, KanjiData } from '@/data/characterCharts';

type ChartType = 'hiragana' | 'katakana' | 'kanji';

interface CharacterChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChartType?: ChartType;
}

export function CharacterChartModal({ isOpen, onClose, initialChartType = 'hiragana' }: CharacterChartModalProps) {
  const [chartType, setChartType] = useState<ChartType>(initialChartType);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (initialChartType) {
      setChartType(initialChartType);
    }
  }, [initialChartType]);

  if (!isOpen) return null;

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleDragMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          zIndex: 9999,
        }}
        className={`${isMinimized ? 'w-72' : 'w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw]'} max-h-[90vh] bg-white rounded-xl shadow-2xl border-4 border-primary/20 overflow-hidden`}
      >
        {/* Header - Draggable */}
        <div
          onMouseDown={handleDragStart}
          className={`bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 flex items-center justify-between ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <div className="flex items-center gap-2">
            <Move className="w-5 h-5" />
            <h2 className="text-lg font-bold">
              {chartType === 'hiragana' && '🅰️ Hiragana Chart'}
              {chartType === 'katakana' && '🅱️ Katakana Chart'}
              {chartType === 'kanji' && '🈁 Common Kanji'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-white/20 rounded transition-colors"
              title={isMinimized ? 'Maximize' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Chart Type Selector */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => setChartType('hiragana')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  chartType === 'hiragana'
                    ? 'bg-primary text-white scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🅰️ Hiragana (46)
              </button>
              <button
                onClick={() => setChartType('katakana')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  chartType === 'katakana'
                    ? 'bg-secondary text-white scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🅱️ Katakana (46)
              </button>
              <button
                onClick={() => setChartType('kanji')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  chartType === 'kanji'
                    ? 'bg-tertiary text-white scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🈁 Kanji (80+)
              </button>
            </div>

            {/* Hiragana Chart */}
            {chartType === 'hiragana' && (
              <div>
                <p className="text-sm text-gray-600 mb-3">Basic Japanese phonetic characters for native words</p>
                <KanaChart data={HIRAGANA_CHART} color="from-blue-500 to-cyan-500" />
              </div>
            )}

            {/* Katakana Chart */}
            {chartType === 'katakana' && (
              <div>
                <p className="text-sm text-gray-600 mb-3">Japanese phonetic characters for foreign words</p>
                <KanaChart data={KATAKANA_CHART} color="from-purple-500 to-pink-500" />
              </div>
            )}

            {/* Kanji Chart */}
            {chartType === 'kanji' && (
              <div>
                <p className="text-sm text-gray-600 mb-3">Essential JLPT N5 Kanji with meanings</p>
                <KanjiGrid data={COMMON_KANJI} />
              </div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Kana Chart Component (Hiragana/Katakana)
function KanaChart({ data, color }: { data: CharacterData[][]; color: string }) {
  return (
    <div className="grid gap-2">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`${
                cell.character
                  ? `bg-gradient-to-br ${color} text-white`
                  : 'bg-gray-100'
              } rounded-lg p-3 text-center transition-transform hover:scale-110`}
            >
              {cell.character && (
                <>
                  <div className="text-3xl font-bold mb-1">{cell.character}</div>
                  <div className="text-xs opacity-90">{cell.romaji}</div>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Kanji Grid Component
function KanjiGrid({ data }: { data: KanjiData[] }) {
  const [selectedKanji, setSelectedKanji] = useState<KanjiData | null>(null);

  return (
    <div>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 mb-4">
        {data.map((kanji, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedKanji(kanji)}
            className={`bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg p-3 text-center transition-all ${
              selectedKanji?.character === kanji.character ? 'ring-4 ring-yellow-400' : ''
            }`}
          >
            <div className="text-2xl font-bold">{kanji.character}</div>
          </motion.button>
        ))}
      </div>

      {/* Selected Kanji Details */}
      {selectedKanji && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-200"
        >
          <div className="flex items-start gap-4">
            <div className="text-6xl font-bold text-orange-600">{selectedKanji.character}</div>
            <div className="flex-1">
              <div className="text-xl font-bold text-gray-800 mb-1">{selectedKanji.meaning}</div>
              <div className="text-lg text-gray-600 mb-2">Romaji: {selectedKanji.romaji}</div>
              {selectedKanji.examples && selectedKanji.examples.length > 0 && (
                <div className="mt-2">
                  <div className="text-sm font-semibold text-gray-700 mb-1">Examples:</div>
                  {selectedKanji.examples.map((example, idx) => (
                    <div key={idx} className="text-sm text-gray-600 bg-white px-2 py-1 rounded mb-1">
                      {example}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default CharacterChartModal;
