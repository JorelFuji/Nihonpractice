/**
 * lesson-types.ts
 * ---------------
 * Comprehensive lesson system with video support and filtering
 */

export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'Beginner' | 'Intermediate' | 'Advanced'

export type Modality = 
  | 'listening'    // Audio comprehension
  | 'reading'      // Text comprehension
  | 'writing'      // Production (kanji, composition)
  | 'speaking'     // Pronunciation, conversation
  | 'grammar'      // Grammar rules
  | 'vocabulary'   // Word learning
  | 'kanji'        // Kanji study
  | 'culture'      // Cultural context

export type Competence = 
  | 'beginner'     // Just starting
  | 'elementary'   // Basic understanding
  | 'intermediate' // Can handle daily conversation
  | 'advanced'     // Fluent, complex topics
  | 'native'       // Native-level proficiency

export type Topic =
  | 'greetings'
  | 'self-introduction'
  | 'family'
  | 'food'
  | 'shopping'
  | 'travel'
  | 'school'
  | 'work'
  | 'hobbies'
  | 'weather'
  | 'health'
  | 'numbers'
  | 'time'
  | 'directions'
  | 'technology'
  | 'culture'
  | 'anime'
  | 'business'
  | 'daily-life'
  | 'emergency'

export interface VideoLesson {
  id: string
  title: string
  description: string
  
  // Categorization
  level: JlptLevel
  modality: Modality[]           // Can cover multiple modalities
  competence: Competence
  topics: Topic[]                // Can cover multiple topics
  
  // Video details
  videoUrl: string               // YouTube, Vimeo, or self-hosted
  thumbnailUrl?: string
  duration: number               // In minutes
  
  // Learning content
  objectives: string[]           // What you'll learn
  vocabulary: string[]           // Key words covered
  grammarPoints?: string[]       // Grammar patterns (link to grammar system)
  
  // Resources
  transcript?: string            // Full transcript
  subtitles?: {
    language: 'ja' | 'en' | 'both'
    url?: string
  }
  worksheetUrl?: string          // Downloadable exercises
  
  // Metadata
  instructor?: string
  publishedDate: Date
  difficulty: 1 | 2 | 3 | 4 | 5  // 1 = easiest, 5 = hardest
  tags: string[]
  
  // Interactive elements
  hasQuiz: boolean
  quizId?: string
  hasExercises: boolean
  
  // Progress tracking
  estimatedTime: number          // Total time including exercises (minutes)
  xpReward: number
  
  // Engagement
  views: number
  likes: number
  emoji: string
}

export interface LessonFilters {
  levels: JlptLevel[]
  modalities: Modality[]
  competences: Competence[]
  topics: Topic[]
  searchQuery: string
  sortBy: 'recent' | 'popular' | 'difficulty' | 'duration'
}

export interface LessonProgress {
  userId: string
  lessonId: string
  started: Date
  completed: boolean
  completedDate?: Date
  watchTime: number              // Minutes watched
  quizScore?: number
  bookmarked: boolean
  notes: string
}
