/**
 * Language Context - Bilingual Support (English + Japanese)
 * 
 * Provides app-wide language switching for American and Japanese users
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.lessons': 'Lessons',
    'nav.practice': 'Practice',
    'nav.profile': 'Profile',
    'nav.menu': 'Menu',
    'nav.games': 'Games',
    
    // Common
    'common.start': 'Start',
    'common.continue': 'Continue',
    'common.complete': 'Complete',
    'common.locked': 'Locked',
    'common.unlocked': 'Unlocked',
    'common.progress': 'Progress',
    'common.level': 'Level',
    'common.unit': 'Unit',
    'common.lesson': 'Lesson',
    'common.vocabulary': 'Vocabulary',
    'common.grammar': 'Grammar',
    'common.exercises': 'Exercises',
    'common.objectives': 'Objectives',
    
    // Curriculum
    'curriculum.title': 'Curriculum',
    'curriculum.subtitle': 'Comprehensive Japanese learning from Pimsleur, Yookoso, and more',
    'curriculum.total': 'Total Lessons',
    'curriculum.completed': 'Completed',
    'curriculum.no_lessons': 'No lessons yet for',
    'curriculum.add_content': 'Adding Your Content',
    'curriculum.start_lesson': 'Start Lesson',
    'curriculum.continue_lesson': 'Continue Lesson',
    'curriculum.review_lesson': 'Review Lesson',
    
    // Stats
    'stats.hearts': 'Hearts',
    'stats.energy': 'Energy',
    'stats.gems': 'Gems',
    'stats.reset': 'Reset Stats',
    'stats.streak': 'Day Streak',
    'stats.xp': 'Total XP',
    
    // Learning
    'learning.objectives': 'Learning Objectives',
    'learning.vocabulary_words': 'Vocabulary Words',
    'learning.grammar_points': 'Grammar Points',
    'learning.practice_exercises': 'Practice Exercises',
    'learning.prerequisites': 'Prerequisites',
    'learning.next_lessons': 'Next Lessons',
    
    // Messages
    'msg.welcome': 'Welcome to NihonQuest!',
    'msg.start_learning': 'Start your Japanese learning journey today',
    'msg.lesson_complete': 'Lesson completed! Great job!',
    'msg.stats_earned': 'Stats earned!',
    'msg.level_up': 'Level up!',
  },
  
  ja: {
    // ナビゲーション
    'nav.home': 'ホーム',
    'nav.lessons': 'レッスン',
    'nav.practice': '練習',
    'nav.profile': 'プロフィール',
    'nav.menu': 'メニュー',
    'nav.games': 'ゲーム',
    
    // 共通
    'common.start': '始める',
    'common.continue': '続ける',
    'common.complete': '完了',
    'common.locked': 'ロック中',
    'common.unlocked': 'アンロック済み',
    'common.progress': '進捗',
    'common.level': 'レベル',
    'common.unit': 'ユニット',
    'common.lesson': 'レッスン',
    'common.vocabulary': '語彙',
    'common.grammar': '文法',
    'common.exercises': '練習問題',
    'common.objectives': '学習目標',
    
    // カリキュラム
    'curriculum.title': 'カリキュラム',
    'curriculum.subtitle': 'Pimsleur、Yookoso、その他の教材による総合的な日本語学習',
    'curriculum.total': '総レッスン数',
    'curriculum.completed': '完了',
    'curriculum.no_lessons': 'まだレッスンがありません',
    'curriculum.add_content': 'コンテンツを追加',
    'curriculum.start_lesson': 'レッスンを始める',
    'curriculum.continue_lesson': 'レッスンを続ける',
    'curriculum.review_lesson': 'レッスンを復習',
    
    // 統計
    'stats.hearts': 'ハート',
    'stats.energy': 'エネルギー',
    'stats.gems': 'ジェム',
    'stats.reset': '統計をリセット',
    'stats.streak': '連続日数',
    'stats.xp': '総経験値',
    
    // 学習
    'learning.objectives': '学習目標',
    'learning.vocabulary_words': '語彙数',
    'learning.grammar_points': '文法ポイント',
    'learning.practice_exercises': '練習問題',
    'learning.prerequisites': '前提条件',
    'learning.next_lessons': '次のレッスン',
    
    // メッセージ
    'msg.welcome': 'NihonQuestへようこそ！',
    'msg.start_learning': '今日から日本語学習を始めよう',
    'msg.lesson_complete': 'レッスン完了！よくできました！',
    'msg.stats_earned': '統計を獲得しました！',
    'msg.level_up': 'レベルアップ！',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('app-language') as Language;
    if (saved && (saved === 'en' || saved === 'ja')) {
      setLanguageState(saved);
    } else {
      // Detect browser language
      const browserLang = navigator.language;
      if (browserLang.startsWith('ja')) {
        setLanguageState('ja');
      }
    }
  }, []);

  // Save language to localStorage when changed
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Language toggle component
export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-primary/20 hover:border-primary/40 transition-all"
      title={language === 'en' ? 'Switch to Japanese' : '英語に切り替え'}
    >
      <span className="text-2xl">{language === 'en' ? '🇺🇸' : '🇯🇵'}</span>
      <span className="font-bold text-sm">
        {language === 'en' ? 'EN' : '日本語'}
      </span>
    </button>
  );
}
