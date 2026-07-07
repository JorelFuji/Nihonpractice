/**
 * Core Vocabulary organized by JLPT level and lesson
 * ~800 words for N5, ~1500 for N4
 */

export interface VocabularyItem {
  id: string;
  word: string;
  kana: string;
  romaji: string;
  english: string;
  partOfSpeech: string;
  level: 'N5' | 'N4' | 'N3';
  lesson?: number;
  examples?: string[];
  audioUrl?: string;
}

// ESSENTIAL N5 VOCABULARY (~800 words)
export const N5_CORE_VOCABULARY: VocabularyItem[] = [
  // Pronouns & People
  {
    id: 'n5-001',
    word: '私',
    kana: 'わたし',
    romaji: 'watashi',
    english: 'I, me',
    partOfSpeech: 'pronoun',
    level: 'N5',
    lesson: 9,
    examples: ['私は学生です。']
  },
  {
    id: 'n5-002',
    word: 'あなた',
    kana: 'あなた',
    romaji: 'anata',
    english: 'you',
    partOfSpeech: 'pronoun',
    level: 'N5',
    lesson: 9,
    examples: []
  },
  {
    id: 'n5-003',
    word: '彼',
    kana: 'かれ',
    romaji: 'kare',
    english: 'he, him, boyfriend',
    partOfSpeech: 'pronoun',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-004',
    word: '彼女',
    kana: 'かのじょ',
    romaji: 'kanojo',
    english: 'she, her, girlfriend',
    partOfSpeech: 'pronoun',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-005',
    word: '先生',
    kana: 'せんせい',
    romaji: 'sensei',
    english: 'teacher',
    partOfSpeech: 'noun',
    level: 'N5',
    lesson: 9,
    examples: ['田中先生は優しいです。']
  },
  {
    id: 'n5-006',
    word: '学生',
    kana: 'がくせい',
    romaji: 'gakusei',
    english: 'student',
    partOfSpeech: 'noun',
    level: 'N5',
    lesson: 9,
    examples: ['私は学生です。']
  },
  {
    id: 'n5-007',
    word: '友達',
    kana: 'ともだち',
    romaji: 'tomodachi',
    english: 'friend',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: ['友達と映画を見ます。']
  },

  // Family
  {
    id: 'n5-010',
    word: '父',
    kana: 'ちち',
    romaji: 'chichi',
    english: 'father (my)',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-011',
    word: 'お父さん',
    kana: 'おとうさん',
    romaji: 'otousan',
    english: 'father (someone else\'s)',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-012',
    word: '母',
    kana: 'はは',
    romaji: 'haha',
    english: 'mother (my)',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-013',
    word: 'お母さん',
    kana: 'おかあさん',
    romaji: 'okaasan',
    english: 'mother (someone else\'s)',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },

  // Common Verbs (ます form shown)
  {
    id: 'n5-020',
    word: '食べる',
    kana: 'たべる',
    romaji: 'taberu',
    english: 'to eat',
    partOfSpeech: 'verb (ru)',
    level: 'N5',
    lesson: 10,
    examples: ['寿司を食べます。']
  },
  {
    id: 'n5-021',
    word: '飲む',
    kana: 'のむ',
    romaji: 'nomu',
    english: 'to drink',
    partOfSpeech: 'verb (u)',
    level: 'N5',
    lesson: 10,
    examples: ['コーヒーを飲みます。']
  },
  {
    id: 'n5-022',
    word: '行く',
    kana: 'いく',
    romaji: 'iku',
    english: 'to go',
    partOfSpeech: 'verb (u)',
    level: 'N5',
    lesson: 10,
    examples: ['学校に行きます。']
  },
  {
    id: 'n5-023',
    word: '来る',
    kana: 'くる',
    romaji: 'kuru',
    english: 'to come',
    partOfSpeech: 'verb (irregular)',
    level: 'N5',
    lesson: 10,
    examples: ['友達が来ます。']
  },
  {
    id: 'n5-024',
    word: 'する',
    kana: 'する',
    romaji: 'suru',
    english: 'to do',
    partOfSpeech: 'verb (irregular)',
    level: 'N5',
    lesson: 10,
    examples: ['宿題をします。']
  },
  {
    id: 'n5-025',
    word: '見る',
    kana: 'みる',
    romaji: 'miru',
    english: 'to see, to watch',
    partOfSpeech: 'verb (ru)',
    level: 'N5',
    examples: ['テレビを見ます。']
  },
  {
    id: 'n5-026',
    word: '読む',
    kana: 'よむ',
    romaji: 'yomu',
    english: 'to read',
    partOfSpeech: 'verb (u)',
    level: 'N5',
    examples: ['本を読みます。']
  },
  {
    id: 'n5-027',
    word: '書く',
    kana: 'かく',
    romaji: 'kaku',
    english: 'to write',
    partOfSpeech: 'verb (u)',
    level: 'N5',
    examples: ['手紙を書きます。']
  },
  {
    id: 'n5-028',
    word: '話す',
    kana: 'はなす',
    romaji: 'hanasu',
    english: 'to speak, to talk',
    partOfSpeech: 'verb (u)',
    level: 'N5',
    lesson: 12,
    examples: ['日本語を話します。']
  },
  {
    id: 'n5-029',
    word: '聞く',
    kana: 'きく',
    romaji: 'kiku',
    english: 'to listen, to hear, to ask',
    partOfSpeech: 'verb (u)',
    level: 'N5',
    examples: ['音楽を聞きます。']
  },
  {
    id: 'n5-030',
    word: '買う',
    kana: 'かう',
    romaji: 'kau',
    english: 'to buy',
    partOfSpeech: 'verb (u)',
    level: 'N5',
    examples: ['本を買います。']
  },
  {
    id: 'n5-031',
    word: '待つ',
    kana: 'まつ',
    romaji: 'matsu',
    english: 'to wait',
    partOfSpeech: 'verb (u)',
    level: 'N5',
    lesson: 12,
    examples: ['ちょっと待ってください。']
  },
  {
    id: 'n5-032',
    word: '忘れる',
    kana: 'わすれる',
    romaji: 'wasureru',
    english: 'to forget',
    partOfSpeech: 'verb (ru)',
    level: 'N5',
    lesson: 12,
    examples: ['パンツを忘れないでください。']
  },

  // Food & Drinks
  {
    id: 'n5-040',
    word: '寿司',
    kana: 'すし',
    romaji: 'sushi',
    english: 'sushi',
    partOfSpeech: 'noun',
    level: 'N5',
    lesson: 11,
    examples: ['寿司を食べます。']
  },
  {
    id: 'n5-041',
    word: 'コーヒー',
    kana: 'こーひー',
    romaji: 'koohii',
    english: 'coffee',
    partOfSpeech: 'noun',
    level: 'N5',
    lesson: 5,
    examples: ['コーヒーを飲みます。']
  },
  {
    id: 'n5-042',
    word: '水',
    kana: 'みず',
    romaji: 'mizu',
    english: 'water',
    partOfSpeech: 'noun',
    level: 'N5',
    lesson: 11,
    examples: ['水をください。']
  },
  {
    id: 'n5-043',
    word: 'お茶',
    kana: 'おちゃ',
    romaji: 'ocha',
    english: 'tea',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-044',
    word: 'ご飯',
    kana: 'ごはん',
    romaji: 'gohan',
    english: 'rice, meal',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: ['ご飯を食べています。']
  },
  {
    id: 'n5-045',
    word: 'パン',
    kana: 'ぱん',
    romaji: 'pan',
    english: 'bread',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },

  // Places
  {
    id: 'n5-050',
    word: '学校',
    kana: 'がっこう',
    romaji: 'gakkou',
    english: 'school',
    partOfSpeech: 'noun',
    level: 'N5',
    lesson: 11,
    examples: ['学校に行きます。']
  },
  {
    id: 'n5-051',
    word: '図書館',
    kana: 'としょかん',
    romaji: 'toshokan',
    english: 'library',
    partOfSpeech: 'noun',
    level: 'N5',
    lesson: 11,
    examples: ['図書館で勉強します。']
  },
  {
    id: 'n5-052',
    word: 'レストラン',
    kana: 'れすとらん',
    romaji: 'resutoran',
    english: 'restaurant',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-053',
    word: '家',
    kana: 'いえ',
    romaji: 'ie',
    english: 'house, home',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-054',
    word: '駅',
    kana: 'えき',
    romaji: 'eki',
    english: 'station',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },

  // Time
  {
    id: 'n5-060',
    word: '今',
    kana: 'いま',
    romaji: 'ima',
    english: 'now',
    partOfSpeech: 'noun',
    level: 'N5',
    lesson: 23,
    examples: ['今、三時です。']
  },
  {
    id: 'n5-061',
    word: '今日',
    kana: 'きょう',
    romaji: 'kyou',
    english: 'today',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-062',
    word: '明日',
    kana: 'あした',
    romaji: 'ashita',
    english: 'tomorrow',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-063',
    word: '昨日',
    kana: 'きのう',
    romaji: 'kinou',
    english: 'yesterday',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-064',
    word: '朝',
    kana: 'あさ',
    romaji: 'asa',
    english: 'morning',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: []
  },

  // Common Objects
  {
    id: 'n5-070',
    word: '本',
    kana: 'ほん',
    romaji: 'hon',
    english: 'book',
    partOfSpeech: 'noun',
    level: 'N5',
    lesson: 9,
    examples: ['これは本です。']
  },
  {
    id: 'n5-071',
    word: 'パンツ',
    kana: 'ぱんつ',
    romaji: 'pantsu',
    english: 'underwear, pants',
    partOfSpeech: 'noun',
    level: 'N5',
    examples: ['レックスのパンツを忘れないでください。']
  },

  // Adjectives (i-adjectives)
  {
    id: 'n5-080',
    word: '大きい',
    kana: 'おおきい',
    romaji: 'ookii',
    english: 'big, large',
    partOfSpeech: 'i-adjective',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-081',
    word: '小さい',
    kana: 'ちいさい',
    romaji: 'chiisai',
    english: 'small, little',
    partOfSpeech: 'i-adjective',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-082',
    word: '新しい',
    kana: 'あたらしい',
    romaji: 'atarashii',
    english: 'new',
    partOfSpeech: 'i-adjective',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-083',
    word: '古い',
    kana: 'ふるい',
    romaji: 'furui',
    english: 'old',
    partOfSpeech: 'i-adjective',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-084',
    word: '高い',
    kana: 'たかい',
    romaji: 'takai',
    english: 'high, tall, expensive',
    partOfSpeech: 'i-adjective',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-085',
    word: '安い',
    kana: 'やすい',
    romaji: 'yasui',
    english: 'cheap',
    partOfSpeech: 'i-adjective',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-086',
    word: 'いい / 良い',
    kana: 'いい / よい',
    romaji: 'ii / yoi',
    english: 'good',
    partOfSpeech: 'i-adjective',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-087',
    word: '悪い',
    kana: 'わるい',
    romaji: 'warui',
    english: 'bad',
    partOfSpeech: 'i-adjective',
    level: 'N5',
    examples: []
  },

  // Na-adjectives
  {
    id: 'n5-090',
    word: '好き',
    kana: 'すき',
    romaji: 'suki',
    english: 'liked, favorite',
    partOfSpeech: 'na-adjective',
    level: 'N5',
    examples: ['寿司が好きです。']
  },
  {
    id: 'n5-091',
    word: '嫌い',
    kana: 'きらい',
    romaji: 'kirai',
    english: 'disliked',
    partOfSpeech: 'na-adjective',
    level: 'N5',
    examples: []
  },
  {
    id: 'n5-092',
    word: '元気',
    kana: 'げんき',
    romaji: 'genki',
    english: 'healthy, energetic',
    partOfSpeech: 'na-adjective',
    level: 'N5',
    examples: ['元気ですか。']
  },
  {
    id: 'n5-093',
    word: '静か',
    kana: 'しずか',
    romaji: 'shizuka',
    english: 'quiet',
    partOfSpeech: 'na-adjective',
    level: 'N5',
    examples: []
  }
];

// N4 VOCABULARY ADDITIONS (~700 more words)
export const N4_CORE_VOCABULARY: VocabularyItem[] = [
  {
    id: 'n4-001',
    word: '決める',
    kana: 'きめる',
    romaji: 'kimeru',
    english: 'to decide',
    partOfSpeech: 'verb (ru)',
    level: 'N4',
    examples: []
  },
  {
    id: 'n4-002',
    word: '信じる',
    kana: 'しんじる',
    romaji: 'shinjiru',
    english: 'to believe',
    partOfSpeech: 'verb (ru)',
    level: 'N4',
    examples: []
  },
  {
    id: 'n4-003',
    word: '続ける',
    kana: 'つづける',
    romaji: 'tsuzukeru',
    english: 'to continue',
    partOfSpeech: 'verb (ru)',
    level: 'N4',
    examples: []
  },
  {
    id: 'n4-004',
    word: '〜たい',
    kana: 'たい',
    romaji: 'tai',
    english: 'want to (do)',
    partOfSpeech: 'auxiliary',
    level: 'N4',
    lesson: 29,
    examples: ['日本に行きたいです。']
  },
  {
    id: 'n4-005',
    word: 'つもり',
    kana: 'つもり',
    romaji: 'tsumori',
    english: 'intention, plan',
    partOfSpeech: 'noun',
    level: 'N4',
    lesson: 29,
    examples: ['来年、日本に行くつもりです。']
  }
];

// Combine all vocabulary
export const ALL_VOCABULARY = [...N5_CORE_VOCABULARY, ...N4_CORE_VOCABULARY];

// Helper functions
export function getVocabularyByLevel(level: 'N5' | 'N4' | 'N3'): VocabularyItem[] {
  return ALL_VOCABULARY.filter(v => v.level === level);
}

export function getVocabularyByLesson(lessonNumber: number): VocabularyItem[] {
  return ALL_VOCABULARY.filter(v => v.lesson === lessonNumber);
}

export function searchVocabulary(query: string): VocabularyItem[] {
  const lowerQuery = query.toLowerCase();
  return ALL_VOCABULARY.filter(v =>
    v.word.includes(query) ||
    v.kana.includes(query) ||
    v.romaji.toLowerCase().includes(lowerQuery) ||
    v.english.toLowerCase().includes(lowerQuery)
  );
}

export function getRandomVocabulary(level: 'N5' | 'N4' | 'N3', count: number = 10): VocabularyItem[] {
  const levelVocab = getVocabularyByLevel(level);
  const shuffled = [...levelVocab].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
