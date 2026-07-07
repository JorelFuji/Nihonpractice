/**
 * Floating Dictionary Button
 * 
 * Always-visible button that opens the Japanese-English dictionary
 * Uses Jisho.org API for comprehensive word lookup
 * Stays accessible during games with PIP support
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarked } from 'lucide-react';
import DictionaryModal from './DictionaryModal';

export function DictionaryButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Floating Button - Gold Theme */}
      <div className="fixed bottom-6 right-24 z-[9998]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 shadow-2xl flex items-center justify-center font-bold text-white transition-all hover:shadow-yellow-500/50 border-2 border-yellow-300"
          title="Open Dictionary (Jisho.org)"
        >
          <BookMarked className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Dictionary Modal */}
      <DictionaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default DictionaryButton;
