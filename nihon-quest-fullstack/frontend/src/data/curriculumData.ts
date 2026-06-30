/**
 * Curriculum Data Structure
 * 
 * Progressive curriculum where each lesson builds on previous knowledge.
 * Lessons are organized by level and unit with clear prerequisites.
 * 
 * Sources integrated:
 * - N5 Curriculum: Complete foundational lessons
 * - Pimsleur approach: Conversational focus
 * - Yookoso structure: Grammar-based progression
 * - Progressive skill building
 */

import { n5Lessons } from './n5Curriculum';

export interface Lesson {
  id: string;
  title: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  unit: number;
  source: 'Pimsleur' | 'Yookoso' | 'Original' | 'PowerPoint';
  type: 'conversation' | 'grammar' | 'vocabulary' | 'kanji' | 'culture' | 'listening';
  locked: boolean;
  progress: number;
  objectives: string[];
  vocabulary: VocabularyItem[];
  grammarPoints: GrammarPoint[];
  exercises: Exercise[];
  culturalNotes?: CulturalNote[];
  audioUrl?: string;
}

export interface VocabularyItem {
  japanese: string;
  hiragana: string;
  romaji: string;
  english: string;
  partOfSpeech: string;
  example?: {
    japanese: string;
    hiragana: string;
    english: string;
  };
}

export interface GrammarPoint {
  id: string;
  title: string;
  pattern: string;
  explanation: string;
  examples: {
    japanese: string;
    hiragana: string;
    romaji: string;
    english: string;
  }[];
  usageNotes: string[];
}

export interface Exercise {
  id: string;
  type: 'fill-blank' | 'multiple-choice' | 'translation' | 'conversation' | 'listening';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  audioUrl?: string;
}

export interface CulturalNote {
  title: string;
  content: string;
  image?: string;
}

// CURRICULUM LESSONS - Progressive learning path
// Each lesson builds on previous lessons
// Import from specific level files (n5Curriculum, n4Curriculum, etc.)
export const curriculumLessons: Lesson[] = [
  ...n5Lessons,
  
  // TODO: Add N4, N3, N2, N1 lessons
  // Import from n4Curriculum.ts, n3Curriculum.ts, etc.
  
  // TEMPLATE FOR ADDITIONAL LESSONS
  {
    id: 'n5-unit1-lesson1-template',
    title: 'TEMPLATE - Replace with your content',
    level: 'N5',
    unit: 1,
    source: 'Original',
    type: 'conversation',
    locked: true, // Set to false when ready
    progress: 0,
    objectives: [
      'TODO: Add learning objectives',
      'What will students learn?',
      'What skills will they practice?'
    ],
    vocabulary: [
      {
        japanese: 'こんにちは',
        hiragana: 'こんにちは',
        romaji: 'konnichiwa',
        english: 'hello, good afternoon',
        partOfSpeech: 'greeting'
      },
      {
        japanese: 'おはよう',
        hiragana: 'おはよう',
        romaji: 'ohayou',
        english: 'good morning (casual)',
        partOfSpeech: 'greeting'
      },
      {
        japanese: 'おはようございます',
        hiragana: 'おはようございます',
        romaji: 'ohayou gozaimasu',
        english: 'good morning (polite)',
        partOfSpeech: 'greeting'
      },
      {
        japanese: '私',
        hiragana: 'わたし',
        romaji: 'watashi',
        english: 'I, me',
        partOfSpeech: 'pronoun',
        example: {
          japanese: '私は学生です。',
          hiragana: 'わたしはがくせいです。',
          english: 'I am a student.'
        }
      },
      {
        japanese: '名前',
        hiragana: 'なまえ',
        romaji: 'namae',
        english: 'name',
        partOfSpeech: 'noun'
      }
    ],
    grammarPoints: [
      {
        id: 'g1',
        title: 'です (desu) - To be',
        pattern: '[Noun] + です',
        explanation: 'です is the polite copula (to be). It connects a noun to the topic.',
        examples: [
          {
            japanese: '私は学生です。',
            hiragana: 'わたしはがくせいです。',
            romaji: 'Watashi wa gakusei desu.',
            english: 'I am a student.'
          },
          {
            japanese: 'これは本です。',
            hiragana: 'これはほんです。',
            romaji: 'Kore wa hon desu.',
            english: 'This is a book.'
          }
        ],
        usageNotes: [
          'Use です for polite speech',
          'だ is the casual equivalent',
          'です never changes based on the noun'
        ]
      },
      {
        id: 'g2',
        title: 'は (wa) - Topic Marker',
        pattern: '[Topic] + は + [Comment]',
        explanation: 'は marks the topic of the sentence - what you are talking about.',
        examples: [
          {
            japanese: '私は田中です。',
            hiragana: 'わたしはたなかです。',
            romaji: 'Watashi wa Tanaka desu.',
            english: 'I am Tanaka. (As for me, I am Tanaka.)'
          }
        ],
        usageNotes: [
          'Pronounced "wa" not "ha"',
          'Marks old information or the topic',
          'Different from が which marks the subject'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex1',
        type: 'fill-blank',
        question: '私___学生です。',
        options: ['は', 'が', 'を', 'に'],
        correctAnswer: 'は',
        explanation: 'は marks the topic. "As for me, I am a student."'
      },
      {
        id: 'ex2',
        type: 'translation',
        question: 'Translate: I am a teacher.',
        correctAnswer: '私は先生です。',
        explanation: '私 (I) + は (topic marker) + 先生 (teacher) + です (to be)'
      }
    ],
    culturalNotes: [
      {
        title: 'Bowing',
        content: 'In Japan, bowing is an important part of greetings. A slight bow (15 degrees) is common for casual situations, while a deeper bow shows more respect.'
      }
    ]
  },
  
  // TEMPLATE FOR PIMSLEUR LESSONS
  {
    id: 'pimsleur-lesson1',
    title: 'Pimsleur Unit 1 - Basic Conversation',
    level: 'N5',
    unit: 1,
    source: 'Pimsleur',
    type: 'conversation',
    locked: false,
    progress: 0,
    objectives: [
      '// TODO: Add objectives from Pimsleur Lesson 1',
      '// Example: Learn to say excuse me',
      '// Example: Ask if someone understands English'
    ],
    vocabulary: [
      // TODO: Add vocabulary from Pimsleur
      {
        japanese: 'すみません',
        hiragana: 'すみません',
        romaji: 'sumimasen',
        english: 'excuse me, sorry',
        partOfSpeech: 'expression'
      }
    ],
    grammarPoints: [
      // TODO: Add grammar patterns from Pimsleur
    ],
    exercises: [
      // TODO: Add listening exercises based on Pimsleur audio
    ],
    audioUrl: '// TODO: Add path to Pimsleur audio file if available'
  },

  // TEMPLATE FOR YOOKOSO LESSONS
  {
    id: 'yookoso-ch1-lesson1',
    title: 'Yookoso Chapter 1 - Getting Started',
    level: 'N5',
    unit: 1,
    source: 'Yookoso',
    type: 'grammar',
    locked: false,
    progress: 0,
    objectives: [
      '// TODO: Add learning objectives from Yookoso Chapter 1',
      '// Check the textbook for specific goals'
    ],
    vocabulary: [
      // TODO: Add vocabulary list from Yookoso Chapter 1
      // The textbook has comprehensive vocab lists at the end of each chapter
    ],
    grammarPoints: [
      // TODO: Add grammar points from Yookoso
      // Yookoso typically covers multiple grammar points per chapter
    ],
    exercises: [
      // TODO: Add exercises from Yookoso Workbook
      // The workbook has fill-in-the-blank, translation, and comprehension exercises
    ]
  }
];

// Helper function to get lessons by level
export const getLessonsByLevel = (level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'): Lesson[] => {
  return curriculumLessons.filter(lesson => lesson.level === level);
};

// Helper function to get lessons by source
export const getLessonsBySource = (source: 'Pimsleur' | 'Yookoso' | 'Original' | 'PowerPoint'): Lesson[] => {
  return curriculumLessons.filter(lesson => lesson.source === source);
};

// Helper function to get lessons by unit
export const getLessonsByUnit = (unit: number): Lesson[] => {
  return curriculumLessons.filter(lesson => lesson.unit === unit);
};
