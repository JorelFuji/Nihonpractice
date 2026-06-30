/**
 * Complete N5 Curriculum
 * 
 * Progressive lessons where each builds on previous knowledge
 * Following Pimsleur conversational approach + Yookoso grammar structure
 */

import type { Lesson } from './curriculumData';

export const n5Lessons: Lesson[] = [
  // ==========================================
  // UNIT 1: GREETINGS & INTRODUCTIONS
  // ==========================================
  
  {
    id: 'n5-u1-l1',
    title: 'First Greetings & "I am..."',
    level: 'N5',
    unit: 1,
    source: 'Original',
    type: 'conversation',
    locked: false,
    progress: 0,
    objectives: [
      'Greet people appropriately',
      'Introduce yourself with "I am..."',
      'Understand です (desu) and は (wa)',
      'Use basic polite expressions'
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
        japanese: 'おはようございます',
        hiragana: 'おはようございます',
        romaji: 'ohayou gozaimasu',
        english: 'good morning (polite)',
        partOfSpeech: 'greeting'
      },
      {
        japanese: 'こんばんは',
        hiragana: 'こんばんは',
        romaji: 'konbanwa',
        english: 'good evening',
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
        japanese: '学生',
        hiragana: 'がくせい',
        romaji: 'gakusei',
        english: 'student',
        partOfSpeech: 'noun'
      },
      {
        japanese: '先生',
        hiragana: 'せんせい',
        romaji: 'sensei',
        english: 'teacher',
        partOfSpeech: 'noun'
      },
      {
        japanese: 'です',
        hiragana: 'です',
        romaji: 'desu',
        english: 'to be (polite copula)',
        partOfSpeech: 'copula',
        example: {
          japanese: '田中さんは先生です。',
          hiragana: 'たなかさんはせんせいです。',
          english: 'Tanaka-san is a teacher.'
        }
      }
    ],
    grammarPoints: [
      {
        id: 'g-desu',
        title: 'です (desu) - Polite "to be"',
        pattern: '[Noun] + です',
        explanation: 'です is the polite copula that connects nouns. It means "is/am/are" and makes sentences polite.',
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
          },
          {
            japanese: '田中さんは先生です。',
            hiragana: 'たなかさんはせんせいです。',
            romaji: 'Tanaka-san wa sensei desu.',
            english: 'Tanaka-san is a teacher.'
          }
        ],
        usageNotes: [
          'Always use です for polite speech',
          'だ (da) is the casual version',
          'Never changes based on the noun',
          'Essential for polite conversation'
        ]
      },
      {
        id: 'g-wa-particle',
        title: 'は (wa) - Topic Marker',
        pattern: '[Topic] + は + [Comment]',
        explanation: 'は marks the topic - what the sentence is about. Pronounced "wa" not "ha".',
        examples: [
          {
            japanese: '私は学生です。',
            hiragana: 'わたしはがくせいです。',
            romaji: 'Watashi wa gakusei desu.',
            english: 'As for me, (I) am a student.'
          },
          {
            japanese: '今日はいい天気です。',
            hiragana: 'きょうはいいてんきです。',
            romaji: 'Kyou wa ii tenki desu.',
            english: 'As for today, (it) is good weather.'
          }
        ],
        usageNotes: [
          'Written は but pronounced "wa"',
          'Marks the topic (what you\'re talking about)',
          'Different from が which marks the subject',
          'Used in 90% of basic sentences'
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
        explanation: '私 (I) + は (topic) + 先生 (teacher) + です (am)'
      },
      {
        id: 'ex3',
        type: 'multiple-choice',
        question: 'How do you say "good morning" politely?',
        options: ['こんにちは', 'おはようございます', 'こんばんは', 'さようなら'],
        correctAnswer: 'おはようございます',
        explanation: 'おはようございます (ohayou gozaimasu) is the polite form of good morning.'
      }
    ],
    culturalNotes: [
      {
        title: 'Bowing Culture',
        content: 'In Japan, bowing is as important as the words you say. A slight bow (15°) accompanies greetings. Deeper bows show more respect.'
      },
      {
        title: 'Morning Greetings',
        content: 'おはようございます is used until around 10-11 AM, then switch to こんにちは. The casual おはよう is only for close friends and family.'
      }
    ]
  },

  {
    id: 'n5-u1-l2',
    title: 'Names & Numbers 1-10',
    level: 'N5',
    unit: 1,
    source: 'Original',
    type: 'conversation',
    locked: false,
    progress: 0,
    objectives: [
      'Ask someone\'s name',
      'Give your own name',
      'Count from 1 to 10',
      'Use よろしくお願いします'
    ],
    vocabulary: [
      {
        japanese: '名前',
        hiragana: 'なまえ',
        romaji: 'namae',
        english: 'name',
        partOfSpeech: 'noun'
      },
      {
        japanese: 'お名前',
        hiragana: 'おなまえ',
        romaji: 'onamae',
        english: 'name (polite)',
        partOfSpeech: 'noun'
      },
      {
        japanese: '一',
        hiragana: 'いち',
        romaji: 'ichi',
        english: 'one',
        partOfSpeech: 'number'
      },
      {
        japanese: '二',
        hiragana: 'に',
        romaji: 'ni',
        english: 'two',
        partOfSpeech: 'number'
      },
      {
        japanese: '三',
        hiragana: 'さん',
        romaji: 'san',
        english: 'three',
        partOfSpeech: 'number'
      },
      {
        japanese: '四',
        hiragana: 'よん/し',
        romaji: 'yon/shi',
        english: 'four',
        partOfSpeech: 'number'
      },
      {
        japanese: '五',
        hiragana: 'ご',
        romaji: 'go',
        english: 'five',
        partOfSpeech: 'number'
      },
      {
        japanese: '六',
        hiragana: 'ろく',
        romaji: 'roku',
        english: 'six',
        partOfSpeech: 'number'
      },
      {
        japanese: '七',
        hiragana: 'なな/しち',
        romaji: 'nana/shichi',
        english: 'seven',
        partOfSpeech: 'number'
      },
      {
        japanese: '八',
        hiragana: 'はち',
        romaji: 'hachi',
        english: 'eight',
        partOfSpeech: 'number'
      },
      {
        japanese: '九',
        hiragana: 'きゅう/く',
        romaji: 'kyuu/ku',
        english: 'nine',
        partOfSpeech: 'number'
      },
      {
        japanese: '十',
        hiragana: 'じゅう',
        romaji: 'juu',
        english: 'ten',
        partOfSpeech: 'number'
      },
      {
        japanese: 'よろしくお願いします',
        hiragana: 'よろしくおねがいします',
        romaji: 'yoroshiku onegaishimasu',
        english: 'nice to meet you / please treat me well',
        partOfSpeech: 'expression'
      }
    ],
    grammarPoints: [
      {
        id: 'g-question-wa',
        title: 'Question Particle か (ka)',
        pattern: '[Statement] + か',
        explanation: 'Adding か to the end of a sentence makes it a question.',
        examples: [
          {
            japanese: 'お名前は？',
            hiragana: 'おなまえは？',
            romaji: 'Onamae wa?',
            english: 'What is your name? (casual question)'
          },
          {
            japanese: '学生ですか。',
            hiragana: 'がくせいですか。',
            romaji: 'Gakusei desu ka.',
            english: 'Are (you) a student?'
          }
        ],
        usageNotes: [
          'か makes statements into questions',
          'Rising intonation helps show it\'s a question',
          'Can be omitted in casual speech with just rising tone'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex1',
        type: 'fill-blank',
        question: 'お名前___何ですか。',
        options: ['は', 'が', 'を', 'の'],
        correctAnswer: 'は',
        explanation: 'は marks "name" as the topic of the question.'
      },
      {
        id: 'ex2',
        type: 'multiple-choice',
        question: 'What number is ななな (nana)?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '7',
        explanation: 'なな (nana) is seven. しち (shichi) is the alternate reading.'
      }
    ]
  },

  {
    id: 'n5-u1-l3',
    title: 'Where Are You From?',
    level: 'N5',
    unit: 1,
    source: 'Original',
    type: 'conversation',
    locked: false,
    progress: 0,
    objectives: [
      'Talk about nationalities and origins',
      'Use から (from)',
      'Make negative sentences with じゃありません',
      'Ask follow-up questions'
    ],
    vocabulary: [
      {
        japanese: 'アメリカ',
        hiragana: 'あめりか',
        romaji: 'amerika',
        english: 'America',
        partOfSpeech: 'proper noun'
      },
      {
        japanese: '日本',
        hiragana: 'にほん',
        romaji: 'nihon',
        english: 'Japan',
        partOfSpeech: 'proper noun'
      },
      {
        japanese: 'から',
        hiragana: 'から',
        romaji: 'kara',
        english: 'from',
        partOfSpeech: 'particle',
        example: {
          japanese: '私は日本からです。',
          hiragana: 'わたしはにほんからです。',
          english: 'I am from Japan.'
        }
      },
      {
        japanese: 'どこ',
        hiragana: 'どこ',
        romaji: 'doko',
        english: 'where',
        partOfSpeech: 'question word'
      }
    ],
    grammarPoints: [
      {
        id: 'g-negative-janai',
        title: 'じゃありません - Negative "is not"',
        pattern: '[Noun] + じゃありません',
        explanation: 'じゃありません is the polite negative of です (is not).',
        examples: [
          {
            japanese: '私は学生じゃありません。',
            hiragana: 'わたしはがくせいじゃありません。',
            romaji: 'Watashi wa gakusei ja arimasen.',
            english: 'I am not a student.'
          },
          {
            japanese: 'これは本じゃありません。',
            hiragana: 'これはほんじゃありません。',
            romaji: 'Kore wa hon ja arimasen.',
            english: 'This is not a book.'
          }
        ],
        usageNotes: [
          'じゃありません is more polite than じゃない',
          'ではありません is even more formal',
          'Essential for corrections and clarifications'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex1',
        type: 'translation',
        question: 'Translate: I am from America.',
        correctAnswer: '私はアメリカからです。',
        explanation: '私は (I/topic) + アメリカ (America) + から (from) + です (am)'
      },
      {
        id: 'ex2',
        type: 'fill-blank',
        question: '田中さんは先生___ありません。',
        options: ['じゃ', 'は', 'が', 'を'],
        correctAnswer: 'じゃ',
        explanation: 'じゃありません is the negative form of です.'
      }
    ]
  },

  // ==========================================
  // UNIT 2: BASIC ACTIONS & GRAMMAR
  // ==========================================

  {
    id: 'n5-u2-l1',
    title: 'Action Verbs: Eat, Drink, Watch',
    level: 'N5',
    unit: 2,
    source: 'Original',
    type: 'grammar',
    locked: false,
    progress: 0,
    objectives: [
      'Use basic action verbs with ます',
      'Understand を particle for objects',
      'Form Subject-Object-Verb sentences',
      'Talk about daily actions'
    ],
    vocabulary: [
      {
        japanese: '食べます',
        hiragana: 'たべます',
        romaji: 'tabemasu',
        english: 'to eat',
        partOfSpeech: 'verb (iru/eru)'
      },
      {
        japanese: '飲みます',
        hiragana: 'のみます',
        romaji: 'nomimasu',
        english: 'to drink',
        partOfSpeech: 'verb (u-verb)'
      },
      {
        japanese: '見ます',
        hiragana: 'みます',
        romaji: 'mimasu',
        english: 'to watch, to see',
        partOfSpeech: 'verb (iru/eru)'
      },
      {
        japanese: '読みます',
        hiragana: 'よみます',
        romaji: 'yomimasu',
        english: 'to read',
        partOfSpeech: 'verb (u-verb)'
      },
      {
        japanese: '寿司',
        hiragana: 'すし',
        romaji: 'sushi',
        english: 'sushi',
        partOfSpeech: 'noun'
      },
      {
        japanese: '水',
        hiragana: 'みず',
        romaji: 'mizu',
        english: 'water',
        partOfSpeech: 'noun'
      },
      {
        japanese: 'テレビ',
        hiragana: 'てれび',
        romaji: 'terebi',
        english: 'television',
        partOfSpeech: 'noun'
      },
      {
        japanese: '本',
        hiragana: 'ほん',
        romaji: 'hon',
        english: 'book',
        partOfSpeech: 'noun'
      }
    ],
    grammarPoints: [
      {
        id: 'g-masu-verbs',
        title: 'ます Form - Polite Verbs',
        pattern: '[Verb stem] + ます',
        explanation: 'ます makes verbs polite. This is the standard form for polite conversation.',
        examples: [
          {
            japanese: '寿司を食べます。',
            hiragana: 'すしをたべます。',
            romaji: 'Sushi o tabemasu.',
            english: 'I eat sushi.'
          },
          {
            japanese: '水を飲みます。',
            hiragana: 'みずをのみます。',
            romaji: 'Mizu o nomimasu.',
            english: 'I drink water.'
          }
        ],
        usageNotes: [
          'ます is present/future tense',
          'Always use ます in polite situations',
          'Dictionary form (食べる) is for casual/plain speech'
        ]
      },
      {
        id: 'g-wo-particle',
        title: 'を (wo/o) - Object Marker',
        pattern: '[Object] + を + [Verb]',
        explanation: 'を marks the direct object - what receives the action of the verb.',
        examples: [
          {
            japanese: '私は寿司を食べます。',
            hiragana: 'わたしはすしをたべます。',
            romaji: 'Watashi wa sushi o tabemasu.',
            english: 'I eat sushi.'
          },
          {
            japanese: 'テレビを見ます。',
            hiragana: 'てれびをみます。',
            romaji: 'Terebi o mimasu.',
            english: '(I) watch TV.'
          }
        ],
        usageNotes: [
          'Pronounced "o" not "wo"',
          'Shows what is being acted upon',
          'Essential for action sentences',
          'Remember: Subject-OBJECT-Verb order!'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex1',
        type: 'fill-blank',
        question: '私は本___読みます。',
        options: ['を', 'は', 'が', 'に'],
        correctAnswer: 'を',
        explanation: 'を marks "book" as the object being read.'
      },
      {
        id: 'ex2',
        type: 'translation',
        question: 'Translate: I watch TV.',
        correctAnswer: '私はテレビを見ます。',
        explanation: '私は (I) + テレビを (TV/object) + 見ます (watch)'
      }
    ],
    culturalNotes: [
      {
        title: 'Japanese Word Order',
        content: 'Japanese is SOV (Subject-Object-Verb) unlike English SVO. The verb ALWAYS comes last. This is fundamental to Japanese grammar.'
      }
    ]
  },

  {
    id: 'n5-u2-l2',
    title: 'Where: Location of Actions',
    level: 'N5',
    unit: 2,
    source: 'Original',
    type: 'grammar',
    locked: false,
    progress: 0,
    objectives: [
      'Use で particle for action locations',
      'Talk about where actions happen',
      'Learn existence verbs (います/あります)',
      'Describe locations'
    ],
    vocabulary: [
      {
        japanese: '図書館',
        hiragana: 'としょかん',
        romaji: 'toshokan',
        english: 'library',
        partOfSpeech: 'noun'
      },
      {
        japanese: 'レストラン',
        hiragana: 'れすとらん',
        romaji: 'resutoran',
        english: 'restaurant',
        partOfSpeech: 'noun'
      },
      {
        japanese: 'うち',
        hiragana: 'うち',
        romaji: 'uchi',
        english: 'home, house',
        partOfSpeech: 'noun'
      },
      {
        japanese: '勉強します',
        hiragana: 'べんきょうします',
        romaji: 'benkyou shimasu',
        english: 'to study',
        partOfSpeech: 'verbal noun'
      },
      {
        japanese: 'います',
        hiragana: 'います',
        romaji: 'imasu',
        english: 'to exist, to be (animate)',
        partOfSpeech: 'verb'
      },
      {
        japanese: 'あります',
        hiragana: 'あります',
        romaji: 'arimasu',
        english: 'to exist, to be (inanimate)',
        partOfSpeech: 'verb'
      }
    ],
    grammarPoints: [
      {
        id: 'g-de-location',
        title: 'で - Location of Action',
        pattern: '[Place] + で + [Action]',
        explanation: 'で marks where an action takes place.',
        examples: [
          {
            japanese: '図書館で勉強します。',
            hiragana: 'としょかんでべんきょうします。',
            romaji: 'Toshokan de benkyou shimasu.',
            english: 'I study at the library.'
          },
          {
            japanese: 'レストランで食べます。',
            hiragana: 'れすとらんでたべます。',
            romaji: 'Resutoran de tabemasu.',
            english: 'I eat at a restaurant.'
          }
        ],
        usageNotes: [
          'で shows where action happens',
          'Different from に which shows location of existence',
          'Think: "at" or "in" for actions'
        ]
      },
      {
        id: 'g-imasu-arimasu',
        title: 'います/あります - Existence',
        pattern: '[Thing] + が + います/あります',
        explanation: 'います for living things (people, animals), あります for non-living things.',
        examples: [
          {
            japanese: '猫がいます。',
            hiragana: 'ねこがいます。',
            romaji: 'Neko ga imasu.',
            english: 'There is a cat.'
          },
          {
            japanese: '本があります。',
            hiragana: 'ほんがあります。',
            romaji: 'Hon ga arimasu.',
            english: 'There is a book.'
          }
        ],
        usageNotes: [
          'います = animate (can move on its own)',
          'あります = inanimate (objects)',
          'Plants use あります despite being alive'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex1',
        type: 'fill-blank',
        question: 'うち___本を読みます。',
        options: ['で', 'に', 'を', 'は'],
        correctAnswer: 'で',
        explanation: 'で marks home as the location where the action (reading) happens.'
      },
      {
        id: 'ex2',
        type: 'multiple-choice',
        question: 'Which verb for "There is a person"?',
        options: ['います', 'あります', '食べます', 'です'],
        correctAnswer: 'います',
        explanation: 'います is for living things. People are animate, so use います.'
      }
    ]
  }

  // TODO: Continue with more lessons following the progression structure
  // Each lesson builds on previous vocabulary and grammar
  // Skills compound: n5-u2-l3, n5-u3-l1, n5-u3-l2, etc.
];

export default n5Lessons;
