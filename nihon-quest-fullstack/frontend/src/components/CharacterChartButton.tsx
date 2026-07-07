/**
 * Floating Character Chart Button
 * 
 * Always-visible button that opens character charts
 * Stays accessible during games with PIP support
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X } from 'lucide-react';
import CharacterChartModal from './CharacterChartModal';

type ChartType = 'hiragana' | 'katakana' | 'kanji';

export function CharacterChartButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<ChartType>('hiragana');

  const openChart = (chartType: ChartType) => {
    setSelectedChart(chartType);
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end gap-2">
        {/* Chart Options Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="flex flex-col gap-2 bg-white rounded-xl shadow-2xl p-3 border-2 border-primary/20"
            >
              <button
                onClick={() => openChart('hiragana')}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold hover:scale-105 transition-transform text-left flex items-center gap-2"
              >
                <span className="text-2xl">あ</span>
                <div>
                  <div className="text-sm">Hiragana</div>
                  <div className="text-xs opacity-90">46 characters</div>
                </div>
              </button>
              
              <button
                onClick={() => openChart('katakana')}
                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:scale-105 transition-transform text-left flex items-center gap-2"
              >
                <span className="text-2xl">ア</span>
                <div>
                  <div className="text-sm">Katakana</div>
                  <div className="text-xs opacity-90">46 characters</div>
                </div>
              </button>
              
              <button
                onClick={() => openChart('kanji')}
                className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:scale-105 transition-transform text-left flex items-center gap-2"
              >
                <span className="text-2xl">漢</span>
                <div>
                  <div className="text-sm">Kanji</div>
                  <div className="text-xs opacity-90">80+ common</div>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center font-bold text-white transition-all ${
            isMenuOpen
              ? 'bg-gradient-to-br from-red-500 to-pink-500'
              : 'bg-gradient-to-br from-primary to-secondary'
          }`}
          title={isMenuOpen ? 'Close Menu' : 'Open Character Charts'}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Character Chart Modal */}
      <CharacterChartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialChartType={selectedChart}
      />
    </>
  );
}

export default CharacterChartButton;
