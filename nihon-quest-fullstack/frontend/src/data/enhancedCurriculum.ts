/**
 * Enhanced Japanese Curriculum
 * Based on proven pedagogical approaches (Living Language methodology)
 * Structured progression: Phase 0 (Foundation) → Phase 5 (Advanced)
 * ~40 core lessons + grammar reference + review quizzes
 */

export interface LessonExample {
  japanese: string;
  kana?: string;
  romaji: string;
  english: string;
  note?: string;
}

export interface GrammarPattern {
  pattern: string;
  meaning: string;
  formation: string;
  examples: LessonExample[];
  usage: string;
}

export interface Vocabulary {
  word: string;
  kana: string;
  romaji: string;
  english: string;
  partOfSpeech: string;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  description: string;
  phase: number;
  grammar: GrammarPattern[];
  vocabulary: Vocabulary[];
  dialogues: LessonExample[];
  culturalNote?: string;
  studyTip: string;
}

export interface ReviewQuiz {
  id: string;
  afterLesson: number;
  phase: number;
  title: string;
  description: string;
}

// PHASE 0: SOUND & SCRIPT (Lessons 1-5)
export const PHASE_0_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    number: 1,
    title: 'Japanese Sounds & Accent',
    description: 'Pronunciation fundamentals and pitch accent',
    phase: 0,
    grammar: [],
    vocabulary: [
      { word: 'はい', kana: 'はい', romaji: 'hai', english: 'yes', partOfSpeech: 'interjection' },
      { word: 'いいえ', kana: 'いいえ', romaji: 'iie', english: 'no', partOfSpeech: 'interjection' },
      { word: 'ありがとう', kana: 'ありがとう', romaji: 'arigatou', english: 'thank you', partOfSpeech: 'expression' },
    ],
    dialogues: [],
    studyTip: 'Listen to the audio with your book closed first. Train your ear before your eyes.',
    culturalNote: 'Japanese has a pitch-accent system, not stress-accent like English. Pay attention to rising and falling tones.'
  },
  {
    id: 'lesson-2',
    number: 2,
    title: 'Vowels & Vowel Clusters',
    description: 'Master the 5 pure vowels and combinations',
    phase: 0,
    grammar: [],
    vocabulary: [
      { word: 'あい', kana: 'あい', romaji: 'ai', english: 'love', partOfSpeech: 'noun' },
      { word: 'いえ', kana: 'いえ', romaji: 'ie', english: 'house', partOfSpeech: 'noun' },
      { word: 'うえ', kana: 'うえ', romaji: 'ue', english: 'above', partOfSpeech: 'noun' },
    ],
    dialogues: [],
    studyTip: 'Japanese vowels are short and crisp, not drawn out like English. Record yourself and compare.',
    culturalNote: 'Unlike English, Japanese has no diphthongs—each vowel sound is pure.'
  },
  {
    id: 'lesson-5',
    number: 5,
    title: 'Hiragana & Katakana Systems',
    description: 'Complete syllabary mastery',
    phase: 0,
    grammar: [],
    vocabulary: [
      { word: 'コーヒー', kana: 'こーひー', romaji: 'koohii', english: 'coffee', partOfSpeech: 'noun' },
      { word: 'テレビ', kana: 'てれび', romaji: 'terebi', english: 'television', partOfSpeech: 'noun' },
      { word: 'アメリカ', kana: 'あめりか', romaji: 'Amerika', english: 'America', partOfSpeech: 'proper noun' },
    ],
    dialogues: [],
    studyTip: 'Master hiragana in week 1, katakana in week 2. Use spaced repetition flashcards daily.',
    culturalNote: 'Katakana is used for foreign loanwords, onomatopoeia, and emphasis.'
  }
];

// PHASE 1: SURVIVAL CORE (Lessons 6-9)
export const PHASE_1_LESSONS: Lesson[] = [
  {
    id: 'lesson-6',
    number: 6,
    title: 'Numbers, Days & Basics',
    description: 'Essential counting and time expressions',
    phase: 1,
    grammar: [],
    vocabulary: [
      { word: '一', kana: 'いち', romaji: 'ichi', english: 'one', partOfSpeech: 'number' },
      { word: '二', kana: 'に', romaji: 'ni', english: 'two', partOfSpeech: 'number' },
      { word: '三', kana: 'さん', romaji: 'san', english: 'three', partOfSpeech: 'number' },
      { word: '月曜日', kana: 'げつようび', romaji: 'getsuyoubi', english: 'Monday', partOfSpeech: 'noun' },
      { word: '火曜日', kana: 'かようび', romaji: 'kayoubi', english: 'Tuesday', partOfSpeech: 'noun' },
    ],
    dialogues: [],
    studyTip: 'Count everything you see throughout the day in Japanese. Numbers are pure drill.',
    culturalNote: 'Japanese days of the week are named after elements: fire (Tuesday), water (Wednesday), wood (Thursday).'
  },
  {
    id: 'lesson-7',
    number: 7,
    title: 'Greetings & Weather',
    description: 'Daily conversation starters',
    phase: 1,
    grammar: [],
    vocabulary: [
      { word: 'おはよう', kana: 'おはよう', romaji: 'ohayou', english: 'good morning (casual)', partOfSpeech: 'greeting' },
      { word: 'おはようございます', kana: 'おはようございます', romaji: 'ohayou gozaimasu', english: 'good morning (polite)', partOfSpeech: 'greeting' },
      { word: 'こんにちは', kana: 'こんにちは', romaji: 'konnichiwa', english: 'hello/good afternoon', partOfSpeech: 'greeting' },
      { word: 'こんばんは', kana: 'こんばんは', romaji: 'konbanwa', english: 'good evening', partOfSpeech: 'greeting' },
      { word: '天気', kana: 'てんき', romaji: 'tenki', english: 'weather', partOfSpeech: 'noun' },
    ],
    dialogues: [
      {
        japanese: 'おはようございます。',
        romaji: 'Ohayou gozaimasu.',
        english: 'Good morning.',
      },
      {
        japanese: 'いい天気ですね。',
        romaji: 'Ii tenki desu ne.',
        english: "Nice weather, isn't it?",
      }
    ],
    studyTip: 'Shadow the audio—speak along with the recording to match rhythm and intonation.',
    culturalNote: 'こんにちは literally means "this day is" (今日は) - it\'s a set greeting phrase.'
  },
  {
    id: 'lesson-9',
    number: 9,
    title: 'です - The Copula',
    description: 'The backbone of Japanese sentences: "to be"',
    phase: 1,
    grammar: [
      {
        pattern: 'A は B です',
        meaning: 'A is B',
        formation: '[Topic] は [Noun/Na-adjective] です',
        usage: 'The most fundamental sentence pattern. です is the polite copula (≈ "to be").',
        examples: [
          {
            japanese: '私は学生です。',
            romaji: 'Watashi wa gakusei desu.',
            english: 'I am a student.',
            note: 'は marks the topic of the sentence'
          },
          {
            japanese: 'これは本です。',
            romaji: 'Kore wa hon desu.',
            english: 'This is a book.',
          },
          {
            japanese: '田中さんは先生です。',
            romaji: 'Tanaka-san wa sensei desu.',
            english: 'Mr./Ms. Tanaka is a teacher.',
          }
        ]
      },
      {
        pattern: 'A は B ではありません',
        meaning: 'A is not B',
        formation: '[Topic] は [Noun] ではありません',
        usage: 'Negative copula. じゃありません is the casual contraction.',
        examples: [
          {
            japanese: '私は学生ではありません。',
            romaji: 'Watashi wa gakusei dewa arimasen.',
            english: 'I am not a student.',
          },
          {
            japanese: 'これは本じゃありません。',
            romaji: 'Kore wa hon ja arimasen.',
            english: 'This is not a book.',
            note: 'じゃ is casual form of では'
          }
        ]
      }
    ],
    vocabulary: [
      { word: '私', kana: 'わたし', romaji: 'watashi', english: 'I/me', partOfSpeech: 'pronoun' },
      { word: '学生', kana: 'がくせい', romaji: 'gakusei', english: 'student', partOfSpeech: 'noun' },
      { word: '先生', kana: 'せんせい', romaji: 'sensei', english: 'teacher', partOfSpeech: 'noun' },
      { word: '本', kana: 'ほん', romaji: 'hon', english: 'book', partOfSpeech: 'noun' },
      { word: 'これ', kana: 'これ', romaji: 'kore', english: 'this', partOfSpeech: 'pronoun' },
    ],
    dialogues: [
      {
        japanese: 'A: 学生ですか。',
        romaji: 'A: Gakusei desu ka?',
        english: 'A: Are you a student?',
      },
      {
        japanese: 'B: はい、学生です。',
        romaji: 'B: Hai, gakusei desu.',
        english: 'B: Yes, I am a student.',
      }
    ],
    studyTip: 'Milestone: Can self-introduce and identify objects. Master です before moving forward—it\'s the foundation.',
    culturalNote: 'Japanese drops pronouns when context is clear. "学生です" without 私は is perfectly natural.'
  }
];

// PHASE 2: GRAMMAR ENGINE (Lessons 10-18) - THE HEART OF THE COURSE
export const PHASE_2_LESSONS: Lesson[] = [
  {
    id: 'lesson-10',
    number: 10,
    title: 'Common Verb Forms & Questions',
    description: 'Building real sentences with verbs',
    phase: 2,
    grammar: [
      {
        pattern: 'Verb-ます',
        meaning: 'polite present/future',
        formation: 'verb stem + ます',
        usage: 'The polite verb form for present habitual or future actions.',
        examples: [
          {
            japanese: '食べます',
            romaji: 'tabemasu',
            english: 'eat / will eat',
          },
          {
            japanese: '行きます',
            romaji: 'ikimasu',
            english: 'go / will go',
          }
        ]
      }
    ],
    vocabulary: [
      { word: '食べる', kana: 'たべる', romaji: 'taberu', english: 'to eat', partOfSpeech: 'verb (ru-verb)' },
      { word: '飲む', kana: 'のむ', romaji: 'nomu', english: 'to drink', partOfSpeech: 'verb (u-verb)' },
      { word: '行く', kana: 'いく', romaji: 'iku', english: 'to go', partOfSpeech: 'verb (u-verb)' },
      { word: '来る', kana: 'くる', romaji: 'kuru', english: 'to come', partOfSpeech: 'verb (irregular)' },
    ],
    dialogues: [],
    studyTip: 'Verbs are the engine of Japanese. Learn the three verb classes (u-verbs, ru-verbs, irregular).',
    culturalNote: 'ます-form is your safe default. Use it with everyone except close friends and family.'
  },
  {
    id: 'lesson-11',
    number: 11,
    title: 'Particles & Adjectives',
    description: 'Master を、に、で and adjective basics',
    phase: 2,
    grammar: [
      {
        pattern: 'Object を Verb',
        meaning: 'Mark direct object',
        formation: '[Noun] を [Verb]',
        usage: 'を marks what receives the action of the verb.',
        examples: [
          {
            japanese: '寿司を食べます。',
            romaji: 'Sushi o tabemasu.',
            english: 'I eat sushi.',
          },
          {
            japanese: '水を飲みます。',
            romaji: 'Mizu o nomimasu.',
            english: 'I drink water.',
          }
        ]
      },
      {
        pattern: 'Place に行く/来る',
        meaning: 'Destination marker',
        formation: '[Place] に [motion verb]',
        usage: 'に marks the destination with motion verbs.',
        examples: [
          {
            japanese: '学校に行きます。',
            romaji: 'Gakkou ni ikimasu.',
            english: 'I go to school.',
          }
        ]
      },
      {
        pattern: 'Place で Verb',
        meaning: 'Location of action',
        formation: '[Place] で [action verb]',
        usage: 'で marks where an action takes place.',
        examples: [
          {
            japanese: '図書館で勉強します。',
            romaji: 'Toshokan de benkyou shimasu.',
            english: 'I study at the library.',
          }
        ]
      }
    ],
    vocabulary: [
      { word: '寿司', kana: 'すし', romaji: 'sushi', english: 'sushi', partOfSpeech: 'noun' },
      { word: '水', kana: 'みず', romaji: 'mizu', english: 'water', partOfSpeech: 'noun' },
      { word: '学校', kana: 'がっこう', romaji: 'gakkou', english: 'school', partOfSpeech: 'noun' },
      { word: '図書館', kana: 'としょかん', romaji: 'toshokan', english: 'library', partOfSpeech: 'noun' },
      { word: '勉強する', kana: 'べんきょうする', romaji: 'benkyou suru', english: 'to study', partOfSpeech: 'verb (irregular)' },
    ],
    dialogues: [],
    studyTip: 'Particles are like grammatical GPS—they tell you relationships between words. Master を、に、で first.',
    culturalNote: 'Particle choice changes meaning dramatically. ここで食べます (eat here) vs ここに行きます (go here).'
  },
  {
    id: 'lesson-12',
    number: 12,
    title: 'Te-form - Most Important!',
    description: 'The Swiss Army knife of Japanese grammar',
    phase: 2,
    grammar: [
      {
        pattern: 'Verb-て + ください',
        meaning: 'Please do...',
        formation: '[Verb te-form] + ください',
        usage: 'Polite request. This is how you ask someone to do something.',
        examples: [
          {
            japanese: 'ちょっと待ってください。',
            romaji: 'Chotto matte kudasai.',
            english: 'Please wait a moment.',
          },
          {
            japanese: 'ゆっくり話してください。',
            romaji: 'Yukkuri hanashite kudasai.',
            english: 'Please speak slowly.',
          },
          {
            japanese: 'レックスのパンツを忘れないでください。',
            romaji: 'Rekkusu no pantsu o wasurenaide kudasai.',
            english: "Please don't forget Lex's underwear.",
            note: 'Negative: ないで instead of て'
          }
        ]
      },
      {
        pattern: 'Verb-て + いる',
        meaning: 'Progressive/continuous action',
        formation: '[Verb te-form] + いる',
        usage: 'Currently doing, or resultant state.',
        examples: [
          {
            japanese: '今、ご飯を食べています。',
            romaji: 'Ima, gohan o tabete imasu.',
            english: "I'm eating now.",
          },
          {
            japanese: '日本語を勉強しています。',
            romaji: 'Nihongo o benkyou shite imasu.',
            english: 'I am studying Japanese.',
          }
        ]
      },
      {
        pattern: 'Verb-て、Verb',
        meaning: 'Sequential actions',
        formation: '[Verb te-form], [Verb]',
        usage: 'Do A, then B. Links actions in sequence.',
        examples: [
          {
            japanese: '朝起きて、顔を洗います。',
            romaji: 'Asa okite, kao o araimasu.',
            english: 'I wake up in the morning and wash my face.',
          }
        ]
      }
    ],
    vocabulary: [
      { word: '待つ', kana: 'まつ', romaji: 'matsu', english: 'to wait', partOfSpeech: 'verb (u-verb)' },
      { word: '話す', kana: 'はなす', romaji: 'hanasu', english: 'to speak', partOfSpeech: 'verb (u-verb)' },
      { word: '忘れる', kana: 'わすれる', romaji: 'wasureru', english: 'to forget', partOfSpeech: 'verb (ru-verb)' },
      { word: '起きる', kana: 'おきる', romaji: 'okiru', english: 'to wake up', partOfSpeech: 'verb (ru-verb)' },
    ],
    dialogues: [],
    studyTip: '**OVER-INVEST HERE** The te-form is the highest-leverage item in Japanese. It unlocks requests, progressive, sequences, permission, prohibition, and more. Make extra SRS cards.',
    culturalNote: 'Te-form conjugation follows strict rules based on verb ending. Memorize the chart!'
  }
];

// PHASE 3: DAILY LIFE SYSTEMS (Lessons 19-26)
export const PHASE_3_LESSONS: Lesson[] = [
  {
    id: 'lesson-21',
    number: 21,
    title: 'Numbers & Counters',
    description: 'Counting system and counter words',
    phase: 3,
    grammar: [
      {
        pattern: 'Number + Counter',
        meaning: 'Count objects by type',
        formation: '[Number] + [Counter]',
        usage: 'Japanese uses different counters for different types of objects.',
        examples: [
          {
            japanese: '一つ、二つ、三つ',
            romaji: 'hitotsu, futatsu, mittsu',
            english: 'one (thing), two (things), three (things)',
            note: 'Generic counter'
          },
          {
            japanese: '一人、二人、三人',
            romaji: 'hitori, futari, san-nin',
            english: 'one person, two people, three people',
            note: '-nin counter for people'
          },
          {
            japanese: '一本、二本、三本',
            romaji: 'ippon, nihon, sanbon',
            english: 'one (long object), two, three',
            note: '-hon counter for cylindrical objects'
          }
        ]
      }
    ],
    vocabulary: [
      { word: '一つ', kana: 'ひとつ', romaji: 'hitotsu', english: 'one (thing)', partOfSpeech: 'counter' },
      { word: '人', kana: 'ひと/にん', romaji: 'hito/nin', english: 'person', partOfSpeech: 'noun/counter' },
      { word: '本', kana: 'ほん/ぼん/ぽん', romaji: 'hon/bon/pon', english: 'counter for long objects', partOfSpeech: 'counter' },
    ],
    dialogues: [],
    studyTip: 'Counters are pure drill. Create a dedicated SRS deck. The system is logical once you learn the patterns.',
    culturalNote: 'Counter words change with the number (rendaku). 三本 is "sanbon" not "sanhon" due to voicing.'
  },
  {
    id: 'lesson-23',
    number: 23,
    title: 'Time Expressions',
    description: 'Telling time and time-related phrases',
    phase: 3,
    grammar: [
      {
        pattern: '〜時〜分',
        meaning: 'O\'clock and minutes',
        formation: '[Number]時 [Number]分',
        usage: 'Express specific times.',
        examples: [
          {
            japanese: '今、三時十五分です。',
            romaji: 'Ima, san-ji juugo-fun desu.',
            english: "It's 3:15 now.",
          },
          {
            japanese: '七時に起きます。',
            romaji: 'Shichi-ji ni okimasu.',
            english: 'I wake up at 7 o\'clock.',
          }
        ]
      }
    ],
    vocabulary: [
      { word: '時', kana: 'じ', romaji: 'ji', english: 'o\'clock', partOfSpeech: 'counter' },
      { word: '分', kana: 'ふん/ぷん', romaji: 'fun/pun', english: 'minute(s)', partOfSpeech: 'counter' },
      { word: '今', kana: 'いま', romaji: 'ima', english: 'now', partOfSpeech: 'noun' },
    ],
    dialogues: [],
    studyTip: 'Time expressions have irregular readings. Practice daily by announcing the time out loud.',
    culturalNote: 'Japan uses 24-hour time in formal contexts (train schedules, etc.), but 12-hour in casual speech.'
  }
];

// PHASE 4: EXPRESSIVE RANGE (Lessons 27-33)
export const PHASE_4_LESSONS: Lesson[] = [
  {
    id: 'lesson-29',
    number: 29,
    title: 'Wants & Intentions',
    description: 'Express desires and plans',
    phase: 4,
    grammar: [
      {
        pattern: 'Verb-たい',
        meaning: 'want to do',
        formation: '[Verb stem] + たい',
        usage: 'Express your own desire to do something. Acts like an i-adjective.',
        examples: [
          {
            japanese: '日本に行きたいです。',
            romaji: 'Nihon ni ikitai desu.',
            english: 'I want to go to Japan.',
          },
          {
            japanese: '寿司を食べたいです。',
            romaji: 'Sushi o tabetai desu.',
            english: 'I want to eat sushi.',
          }
        ]
      },
      {
        pattern: '〜つもりです',
        meaning: 'intend to',
        formation: '[Verb plain] + つもりです',
        usage: 'Express intention or plan to do something.',
        examples: [
          {
            japanese: '来年、日本に行くつもりです。',
            romaji: 'Rainen, Nihon ni iku tsumori desu.',
            english: 'I intend to go to Japan next year.',
          }
        ]
      }
    ],
    vocabulary: [
      { word: '〜たい', kana: 'たい', romaji: 'tai', english: 'want to (do)', partOfSpeech: 'auxiliary' },
      { word: 'つもり', kana: 'つもり', romaji: 'tsumori', english: 'intention/plan', partOfSpeech: 'noun' },
      { word: '来年', kana: 'らいねん', romaji: 'rainen', english: 'next year', partOfSpeech: 'noun' },
    ],
    dialogues: [],
    studyTip: 'たい is for your own wants. Don\'t use it to ask about others\' wants—use たがる instead.',
    culturalNote: 'Japanese avoids direct statements of desire in formal situations. Use たいです carefully.'
  }
];

// PHASE 5: REAL-WORLD INTEGRATION (Lessons 34-40)
export const PHASE_5_LESSONS: Lesson[] = [
  {
    id: 'lesson-38',
    number: 38,
    title: 'Conditionals: If/When',
    description: 'Express conditions and hypotheticals',
    phase: 5,
    grammar: [
      {
        pattern: '〜たら',
        meaning: 'if/when',
        formation: '[Verb ta-form] + ら',
        usage: 'General conditional: "if/when X happens, then Y"',
        examples: [
          {
            japanese: '雨が降ったら、行きません。',
            romaji: 'Ame ga futtara, ikimasen.',
            english: "If it rains, I won't go.",
          },
          {
            japanese: '日本に行ったら、富士山を見たいです。',
            romaji: 'Nihon ni ittara, Fujisan o mitai desu.',
            english: 'When I go to Japan, I want to see Mt. Fuji.',
          }
        ]
      }
    ],
    vocabulary: [
      { word: '雨', kana: 'あめ', romaji: 'ame', english: 'rain', partOfSpeech: 'noun' },
      { word: '降る', kana: 'ふる', romaji: 'furu', english: 'to fall (rain/snow)', partOfSpeech: 'verb (u-verb)' },
    ],
    dialogues: [],
    studyTip: 'There are 4 conditionals in Japanese (たら, と, ば, なら). Start with たら—it\'s the most versatile.',
    culturalNote: 'Choice of conditional conveys subtle nuances. たら is neutral and widely applicable.'
  },
  {
    id: 'lesson-40',
    number: 40,
    title: 'Most Common Verbs & Public Signs',
    description: 'Course capstone: essential verbs and reading practice',
    phase: 5,
    grammar: [],
    vocabulary: [
      { word: 'する', kana: 'する', romaji: 'suru', english: 'to do', partOfSpeech: 'verb (irregular)' },
      { word: '来る', kana: 'くる', romaji: 'kuru', english: 'to come', partOfSpeech: 'verb (irregular)' },
      { word: '言う', kana: 'いう', romaji: 'iu', english: 'to say', partOfSpeech: 'verb (u-verb)' },
      { word: '入口', kana: 'いりぐち', romaji: 'iriguchi', english: 'entrance', partOfSpeech: 'noun' },
      { word: '出口', kana: 'でぐち', romaji: 'deguchi', english: 'exit', partOfSpeech: 'noun' },
      { word: '禁煙', kana: 'きんえん', romaji: 'kin\'en', english: 'no smoking', partOfSpeech: 'noun' },
    ],
    dialogues: [],
    studyTip: 'Final lesson milestone: You can now handle survival Japanese, transit, shopping, and basic conversation!',
    culturalNote: 'Public signs in Japan often use kanji without furigana. Start recognizing common kanji in the wild.'
  }
];

// REVIEW QUIZZES
export const REVIEW_QUIZZES: ReviewQuiz[] = [
  {
    id: 'review-quiz-1',
    afterLesson: 9,
    phase: 1,
    title: 'Phase 1 Review Quiz',
    description: 'Test your survival Japanese: greetings, です, basic questions'
  },
  {
    id: 'review-quiz-2',
    afterLesson: 20,
    phase: 3,
    title: 'Phase 3 Mid-Point Review',
    description: 'Particles, verbs, and daily conversation'
  },
  {
    id: 'review-quiz-3',
    afterLesson: 31,
    phase: 4,
    title: 'Phase 4 Review Quiz',
    description: 'Wants, opinions, quantities, and modality'
  },
  {
    id: 'final-review-quiz',
    afterLesson: 40,
    phase: 5,
    title: 'Final Course Exam',
    description: 'Complete curriculum assessment: Foundation through N4'
  }
];

// Combine all lessons
export const ALL_LESSONS = [
  ...PHASE_0_LESSONS,
  ...PHASE_1_LESSONS,
  ...PHASE_2_LESSONS,
  ...PHASE_3_LESSONS,
  ...PHASE_4_LESSONS,
  ...PHASE_5_LESSONS
];

// Helper function to get lessons by phase
export function getLessonsByPhase(phase: number): Lesson[] {
  return ALL_LESSONS.filter(lesson => lesson.phase === phase);
}

// Helper function to get lesson by number
export function getLessonByNumber(lessonNumber: number): Lesson | undefined {
  return ALL_LESSONS.find(lesson => lesson.number === lessonNumber);
}

// Study methodology constants
export const STUDY_LOOP_STEPS = [
  {
    step: 1,
    name: 'Ear-first',
    description: 'Play the dialogue audio with the book closed. Just listen, twice.',
    why: 'Trains sound discrimination before script interferes'
  },
  {
    step: 2,
    name: 'Read-along',
    description: 'Replay while reading the Japanese (kana, not romaji).',
    why: 'Binds sound → script'
  },
  {
    step: 3,
    name: 'Shadow',
    description: 'Replay and speak aloud in the pauses, mimicking rhythm and pitch.',
    why: 'Builds production + prosody. Most critical step!'
  },
  {
    step: 4,
    name: 'Decode',
    description: 'Work through the grammar notes + vocabulary.',
    why: 'Understand mechanics after meeting them in context'
  },
  {
    step: 5,
    name: 'Gate',
    description: 'Take the lesson quiz. Score ≥80% to advance.',
    why: 'Mastery check before moving forward'
  },
  {
    step: 6,
    name: 'Capture',
    description: 'Add new vocab + 2-3 sentence cards to SRS same day.',
    why: 'Encoding within 24h beats re-reading'
  },
  {
    step: 7,
    name: 'Space',
    description: 'Daily SRS reps + weekly cumulative review.',
    why: 'Moves items to long-term memory'
  }
];

export const PACING_OPTIONS = [
  {
    name: 'Intensive',
    lessonsPerWeek: 4,
    dailyCommitment: '~90 min + SRS',
    totalWeeks: 10,
    totalDuration: '~12 weeks total',
    bestFor: 'Full-time study, immersion prep',
    risk: 'Review pileup, shallow retention'
  },
  {
    name: 'Standard',
    lessonsPerWeek: 2,
    dailyCommitment: '~45 min + SRS',
    totalWeeks: 20,
    totalDuration: '~24 weeks (~6 months)',
    bestFor: 'Working adult, steady progress',
    risk: 'Low',
    recommended: true
  },
  {
    name: 'Sustainable',
    lessonsPerWeek: 1.5,
    dailyCommitment: '~30 min + SRS',
    totalWeeks: 27,
    totalDuration: '~32 weeks (~8 months)',
    bestFor: 'High life-load, anti-burnout',
    risk: 'Slow momentum'
  }
];
