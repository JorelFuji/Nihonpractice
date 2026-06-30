/**
 * Comprehensive Learning Modules
 * Bilingual (Japanese/English) content for structured learning
 * Covers: Numbers, Time, Days, Months, SOV, Grammar, Hiragana, Katakana
 */

export interface LearningModule {
  id: string
  title: { ja: string; en: string }
  description: { ja: string; en: string }
  category: 'basics' | 'grammar' | 'writing' | 'time' | 'conversation'
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
  lessons: Lesson[]
  skillCheckoff: SkillCheckoff
  order: number
}

export interface Lesson {
  id: string
  title: { ja: string; en: string }
  content: LessonContent[]
  examples: Example[]
  practice: PracticeExercise[]
  rationale: { ja: string; en: string }
}

export interface LessonContent {
  type: 'text' | 'table' | 'chart' | 'audio' | 'video' | 'interactive'
  content: { ja: string; en: string }
  visual?: string // URL or component name
}

export interface Example {
  japanese: string
  reading: string
  english: string
  breakdown?: {
    word: string
    reading: string
    meaning: string
    type: string
  }[]
  audio?: string
}

export interface PracticeExercise {
  id: string
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'ordering' | 'writing'
  question: { ja: string; en: string }
  options?: string[]
  correctAnswer: string | string[]
  explanation: { ja: string; en: string }
}

export interface SkillCheckoff {
  id: string
  title: { ja: string; en: string }
  requirements: CheckoffItem[]
  passingScore: number
  quiz: PracticeExercise[]
}

export interface CheckoffItem {
  id: string
  skill: { ja: string; en: string }
  completed: boolean
}

// ============================================================================
// MODULE 1: NUMBERS (数字 / すうじ)
// ============================================================================

export const numbersModule: LearningModule = {
  id: 'numbers',
  title: { ja: '数字', en: 'Numbers' },
  description: {
    ja: '日本語の数字システムを学びます。1から10,000まで、カウンター、お金、年齢など。',
    en: 'Learn the Japanese number system from 1 to 10,000, counters, money, age, and more.'
  },
  category: 'basics',
  level: 'N5',
  order: 1,
  lessons: [
    {
      id: 'numbers-1-10',
      title: { ja: '数字 1-10', en: 'Numbers 1-10' },
      rationale: {
        ja: '日本語の数字は日常生活で最も重要な基礎です。買い物、時間、年齢など、毎日使います。',
        en: 'Numbers are the most essential foundation in daily Japanese life. You use them every day for shopping, time, age, and more.'
      },
      content: [
        {
          type: 'table',
          content: {
            ja: '基本の数字 (きほんのすうじ)',
            en: 'Basic Numbers'
          }
        }
      ],
      examples: [
        {
          japanese: '一',
          reading: 'いち',
          english: 'one (1)',
          breakdown: [
            { word: '一', reading: 'いち', meaning: 'one', type: 'number' }
          ]
        },
        {
          japanese: '二',
          reading: 'に',
          english: 'two (2)',
          breakdown: [
            { word: '二', reading: 'に', meaning: 'two', type: 'number' }
          ]
        },
        {
          japanese: '三',
          reading: 'さん',
          english: 'three (3)',
          breakdown: [
            { word: '三', reading: 'さん', meaning: 'three', type: 'number' }
          ]
        },
        {
          japanese: '四',
          reading: 'し / よん',
          english: 'four (4)',
          breakdown: [
            { word: '四', reading: 'し/よん', meaning: 'four', type: 'number' }
          ]
        },
        {
          japanese: '五',
          reading: 'ご',
          english: 'five (5)',
          breakdown: [
            { word: '五', reading: 'ご', meaning: 'five', type: 'number' }
          ]
        },
        {
          japanese: '六',
          reading: 'ろく',
          english: 'six (6)',
          breakdown: [
            { word: '六', reading: 'ろく', meaning: 'six', type: 'number' }
          ]
        },
        {
          japanese: '七',
          reading: 'しち / なな',
          english: 'seven (7)',
          breakdown: [
            { word: '七', reading: 'しち/なな', meaning: 'seven', type: 'number' }
          ]
        },
        {
          japanese: '八',
          reading: 'はち',
          english: 'eight (8)',
          breakdown: [
            { word: '八', reading: 'はち', meaning: 'eight', type: 'number' }
          ]
        },
        {
          japanese: '九',
          reading: 'きゅう / く',
          english: 'nine (9)',
          breakdown: [
            { word: '九', reading: 'きゅう/く', meaning: 'nine', type: 'number' }
          ]
        },
        {
          japanese: '十',
          reading: 'じゅう',
          english: 'ten (10)',
          breakdown: [
            { word: '十', reading: 'じゅう', meaning: 'ten', type: 'number' }
          ]
        }
      ],
      practice: [
        {
          id: 'num-1',
          type: 'multiple-choice',
          question: { ja: '「三」の読み方は？', en: 'How do you read 「三」?' },
          options: ['いち', 'に', 'さん', 'よん'],
          correctAnswer: 'さん',
          explanation: {
            ja: '「三」は「さん」と読みます。3を意味します。',
            en: '「三」is read as "san". It means 3.'
          }
        }
      ]
    },
    {
      id: 'numbers-11-100',
      title: { ja: '数字 11-100', en: 'Numbers 11-100' },
      rationale: {
        ja: '11以上の数字は組み合わせで作ります。パターンを理解すれば、大きな数字も簡単です。',
        en: 'Numbers above 11 are formed by combinations. Once you understand the pattern, larger numbers become easy.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '日本語の数字は論理的です：\n• 11 = 十一 (じゅういち) = 10 + 1\n• 20 = 二十 (にじゅう) = 2 × 10\n• 25 = 二十五 (にじゅうご) = 2 × 10 + 5',
            en: 'Japanese numbers are logical:\n• 11 = 十一 (juu-ichi) = 10 + 1\n• 20 = 二十 (ni-juu) = 2 × 10\n• 25 = 二十五 (ni-juu-go) = 2 × 10 + 5'
          }
        }
      ],
      examples: [
        {
          japanese: '十一',
          reading: 'じゅういち',
          english: 'eleven (11)',
          breakdown: [
            { word: '十', reading: 'じゅう', meaning: 'ten', type: 'number' },
            { word: '一', reading: 'いち', meaning: 'one', type: 'number' }
          ]
        },
        {
          japanese: '二十',
          reading: 'にじゅう',
          english: 'twenty (20)',
          breakdown: [
            { word: '二', reading: 'に', meaning: 'two', type: 'number' },
            { word: '十', reading: 'じゅう', meaning: 'ten', type: 'number' }
          ]
        },
        {
          japanese: '五十五',
          reading: 'ごじゅうご',
          english: 'fifty-five (55)',
          breakdown: [
            { word: '五', reading: 'ご', meaning: 'five', type: 'number' },
            { word: '十', reading: 'じゅう', meaning: 'ten', type: 'number' },
            { word: '五', reading: 'ご', meaning: 'five', type: 'number' }
          ]
        },
        {
          japanese: '百',
          reading: 'ひゃく',
          english: 'one hundred (100)',
          breakdown: [
            { word: '百', reading: 'ひゃく', meaning: 'hundred', type: 'number' }
          ]
        }
      ],
      practice: []
    }
  ],
  skillCheckoff: {
    id: 'numbers-checkoff',
    title: { ja: '数字スキルチェック', en: 'Numbers Skill Checkoff' },
    requirements: [
      { id: '1', skill: { ja: '1-10を読める', en: 'Can read 1-10' }, completed: false },
      { id: '2', skill: { ja: '1-10を書ける', en: 'Can write 1-10' }, completed: false },
      { id: '3', skill: { ja: '11-100を読める', en: 'Can read 11-100' }, completed: false },
      { id: '4', skill: { ja: '数字を聞いて理解できる', en: 'Can understand numbers by listening' }, completed: false }
    ],
    passingScore: 80,
    quiz: []
  }
}

// ============================================================================
// MODULE 2: TIME (時間 / じかん)
// ============================================================================

export const timeModule: LearningModule = {
  id: 'time',
  title: { ja: '時間', en: 'Time' },
  description: {
    ja: '時間、分、時刻の言い方を学びます。',
    en: 'Learn how to tell time, hours, and minutes in Japanese.'
  },
  category: 'time',
  level: 'N5',
  order: 2,
  lessons: [
    {
      id: 'time-hours',
      title: { ja: '時間（じかん）', en: 'Hours' },
      rationale: {
        ja: '時間を言えることは、約束、スケジュール、日常会話に必須です。',
        en: 'Being able to tell time is essential for appointments, schedules, and daily conversation.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '時間の言い方：\n数字 + 時（じ）\n例：3時 = さんじ (3 o\'clock)',
            en: 'How to say hours:\nNumber + 時（ji）\nExample: 3時 = san-ji (3 o\'clock)'
          }
        }
      ],
      examples: [
        {
          japanese: '一時',
          reading: 'いちじ',
          english: '1 o\'clock',
          breakdown: [
            { word: '一', reading: 'いち', meaning: 'one', type: 'number' },
            { word: '時', reading: 'じ', meaning: 'o\'clock', type: 'counter' }
          ]
        },
        {
          japanese: '三時',
          reading: 'さんじ',
          english: '3 o\'clock',
          breakdown: [
            { word: '三', reading: 'さん', meaning: 'three', type: 'number' },
            { word: '時', reading: 'じ', meaning: 'o\'clock', type: 'counter' }
          ]
        },
        {
          japanese: '十二時',
          reading: 'じゅうにじ',
          english: '12 o\'clock',
          breakdown: [
            { word: '十二', reading: 'じゅうに', meaning: 'twelve', type: 'number' },
            { word: '時', reading: 'じ', meaning: 'o\'clock', type: 'counter' }
          ]
        }
      ],
      practice: [
        {
          id: 'time-1',
          type: 'multiple-choice',
          question: { ja: '「5時」の読み方は？', en: 'How do you read 「5時」?' },
          options: ['ごじ', 'いつじ', 'ごとき', 'いつとき'],
          correctAnswer: 'ごじ',
          explanation: {
            ja: '5時は「ごじ」と読みます。',
            en: '5時 is read as "go-ji".'
          }
        }
      ]
    },
    {
      id: 'time-minutes',
      title: { ja: '分（ふん）', en: 'Minutes' },
      rationale: {
        ja: '分を言えると、正確な時刻を伝えられます。',
        en: 'Being able to say minutes allows you to tell precise times.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '分の言い方：\n数字 + 分（ふん/ぷん）\n例：15分 = じゅうごふん',
            en: 'How to say minutes:\nNumber + 分（fun/pun）\nExample: 15分 = juu-go-fun'
          }
        }
      ],
      examples: [
        {
          japanese: '三時十五分',
          reading: 'さんじじゅうごふん',
          english: '3:15',
          breakdown: [
            { word: '三時', reading: 'さんじ', meaning: '3 o\'clock', type: 'time' },
            { word: '十五分', reading: 'じゅうごふん', meaning: '15 minutes', type: 'time' }
          ]
        },
        {
          japanese: '七時半',
          reading: 'しちじはん',
          english: '7:30',
          breakdown: [
            { word: '七時', reading: 'しちじ', meaning: '7 o\'clock', type: 'time' },
            { word: '半', reading: 'はん', meaning: 'half', type: 'time' }
          ]
        }
      ],
      practice: []
    }
  ],
  skillCheckoff: {
    id: 'time-checkoff',
    title: { ja: '時間スキルチェック', en: 'Time Skill Checkoff' },
    requirements: [
      { id: '1', skill: { ja: '時間を読める', en: 'Can read hours' }, completed: false },
      { id: '2', skill: { ja: '分を読める', en: 'Can read minutes' }, completed: false },
      { id: '3', skill: { ja: '時刻を言える', en: 'Can tell time' }, completed: false },
      { id: '4', skill: { ja: '時間を聞いて理解できる', en: 'Can understand time by listening' }, completed: false }
    ],
    passingScore: 80,
    quiz: []
  }
}

// ============================================================================
// MODULE 3: DAYS OF THE WEEK (曜日 / ようび)
// ============================================================================

export const daysModule: LearningModule = {
  id: 'days',
  title: { ja: '曜日', en: 'Days of the Week' },
  description: {
    ja: '月曜日から日曜日まで、曜日の言い方を学びます。',
    en: 'Learn the days of the week from Monday to Sunday.'
  },
  category: 'time',
  level: 'N5',
  order: 3,
  lessons: [
    {
      id: 'days-week',
      title: { ja: '一週間の曜日', en: 'Days of the Week' },
      rationale: {
        ja: '曜日は予定、約束、スケジュールを話すときに必要です。各曜日は自然の要素に基づいています。',
        en: 'Days are necessary for discussing plans, appointments, and schedules. Each day is based on natural elements.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '曜日の由来：\n月曜日 = 月（つき）\n火曜日 = 火（ひ）\n水曜日 = 水（みず）\n木曜日 = 木（き）\n金曜日 = 金（きん）\n土曜日 = 土（つち）\n日曜日 = 日（ひ）',
            en: 'Origin of day names:\nMonday = Moon\nTuesday = Fire\nWednesday = Water\nThursday = Wood\nFriday = Gold/Metal\nSaturday = Earth\nSunday = Sun'
          }
        }
      ],
      examples: [
        {
          japanese: '月曜日',
          reading: 'げつようび',
          english: 'Monday',
          breakdown: [
            { word: '月', reading: 'げつ', meaning: 'moon', type: 'kanji' },
            { word: '曜日', reading: 'ようび', meaning: 'day of week', type: 'suffix' }
          ]
        },
        {
          japanese: '火曜日',
          reading: 'かようび',
          english: 'Tuesday',
          breakdown: [
            { word: '火', reading: 'か', meaning: 'fire', type: 'kanji' },
            { word: '曜日', reading: 'ようび', meaning: 'day of week', type: 'suffix' }
          ]
        },
        {
          japanese: '水曜日',
          reading: 'すいようび',
          english: 'Wednesday',
          breakdown: [
            { word: '水', reading: 'すい', meaning: 'water', type: 'kanji' },
            { word: '曜日', reading: 'ようび', meaning: 'day of week', type: 'suffix' }
          ]
        },
        {
          japanese: '木曜日',
          reading: 'もくようび',
          english: 'Thursday',
          breakdown: [
            { word: '木', reading: 'もく', meaning: 'wood/tree', type: 'kanji' },
            { word: '曜日', reading: 'ようび', meaning: 'day of week', type: 'suffix' }
          ]
        },
        {
          japanese: '金曜日',
          reading: 'きんようび',
          english: 'Friday',
          breakdown: [
            { word: '金', reading: 'きん', meaning: 'gold/metal', type: 'kanji' },
            { word: '曜日', reading: 'ようび', meaning: 'day of week', type: 'suffix' }
          ]
        },
        {
          japanese: '土曜日',
          reading: 'どようび',
          english: 'Saturday',
          breakdown: [
            { word: '土', reading: 'ど', meaning: 'earth/soil', type: 'kanji' },
            { word: '曜日', reading: 'ようび', meaning: 'day of week', type: 'suffix' }
          ]
        },
        {
          japanese: '日曜日',
          reading: 'にちようび',
          english: 'Sunday',
          breakdown: [
            { word: '日', reading: 'にち', meaning: 'sun/day', type: 'kanji' },
            { word: '曜日', reading: 'ようび', meaning: 'day of week', type: 'suffix' }
          ]
        }
      ],
      practice: [
        {
          id: 'days-1',
          type: 'matching',
          question: { ja: '曜日を英語とマッチさせてください', en: 'Match the days with English' },
          correctAnswer: ['Monday-月曜日', 'Tuesday-火曜日', 'Wednesday-水曜日'],
          explanation: {
            ja: '各曜日は自然の要素に基づいています。',
            en: 'Each day is based on natural elements.'
          }
        }
      ]
    }
  ],
  skillCheckoff: {
    id: 'days-checkoff',
    title: { ja: '曜日スキルチェック', en: 'Days Skill Checkoff' },
    requirements: [
      { id: '1', skill: { ja: '全ての曜日を読める', en: 'Can read all days' }, completed: false },
      { id: '2', skill: { ja: '全ての曜日を書ける', en: 'Can write all days' }, completed: false },
      { id: '3', skill: { ja: '曜日を使って文を作れる', en: 'Can make sentences using days' }, completed: false }
    ],
    passingScore: 80,
    quiz: []
  }
}

// ============================================================================
// MODULE 4: MONTHS (月 / つき)
// ============================================================================

export const monthsModule: LearningModule = {
  id: 'months',
  title: { ja: '月', en: 'Months' },
  description: {
    ja: '1月から12月まで、月の言い方を学びます。',
    en: 'Learn the months from January to December.'
  },
  category: 'time',
  level: 'N5',
  order: 4,
  lessons: [
    {
      id: 'months-year',
      title: { ja: '一年の月', en: 'Months of the Year' },
      rationale: {
        ja: '日本語の月は数字で表します。とてもシンプルで覚えやすいです。',
        en: 'Japanese months are expressed with numbers. They are very simple and easy to remember.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '月の言い方：\n数字 + 月（がつ）\n例：1月 = いちがつ (January)',
            en: 'How to say months:\nNumber + 月（gatsu）\nExample: 1月 = ichi-gatsu (January)'
          }
        }
      ],
      examples: [
        {
          japanese: '一月',
          reading: 'いちがつ',
          english: 'January',
          breakdown: [
            { word: '一', reading: 'いち', meaning: 'one', type: 'number' },
            { word: '月', reading: 'がつ', meaning: 'month', type: 'counter' }
          ]
        },
        {
          japanese: '二月',
          reading: 'にがつ',
          english: 'February',
          breakdown: [
            { word: '二', reading: 'に', meaning: 'two', type: 'number' },
            { word: '月', reading: 'がつ', meaning: 'month', type: 'counter' }
          ]
        },
        {
          japanese: '三月',
          reading: 'さんがつ',
          english: 'March',
          breakdown: [
            { word: '三', reading: 'さん', meaning: 'three', type: 'number' },
            { word: '月', reading: 'がつ', meaning: 'month', type: 'counter' }
          ]
        },
        {
          japanese: '四月',
          reading: 'しがつ',
          english: 'April',
          breakdown: [
            { word: '四', reading: 'し', meaning: 'four', type: 'number' },
            { word: '月', reading: 'がつ', meaning: 'month', type: 'counter' }
          ]
        },
        {
          japanese: '五月',
          reading: 'ごがつ',
          english: 'May',
          breakdown: [
            { word: '五', reading: 'ご', meaning: 'five', type: 'number' },
            { word: '月', reading: 'がつ', meaning: 'month', type: 'counter' }
          ]
        },
        {
          japanese: '十二月',
          reading: 'じゅうにがつ',
          english: 'December',
          breakdown: [
            { word: '十二', reading: 'じゅうに', meaning: 'twelve', type: 'number' },
            { word: '月', reading: 'がつ', meaning: 'month', type: 'counter' }
          ]
        }
      ],
      practice: []
    }
  ],
  skillCheckoff: {
    id: 'months-checkoff',
    title: { ja: '月スキルチェック', en: 'Months Skill Checkoff' },
    requirements: [
      { id: '1', skill: { ja: '全ての月を読める', en: 'Can read all months' }, completed: false },
      { id: '2', skill: { ja: '全ての月を書ける', en: 'Can write all months' }, completed: false },
      { id: '3', skill: { ja: '日付を言える', en: 'Can say dates' }, completed: false }
    ],
    passingScore: 80,
    quiz: []
  }
}

// Export all modules
export const allModules: LearningModule[] = [
  numbersModule,
  timeModule,
  daysModule,
  monthsModule
]
