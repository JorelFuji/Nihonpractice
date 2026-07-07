/**
 * Summary of Japanese Grammar Reference
 * Based on proven textbook grammar sections
 * Comprehensive reference for N5-N4 learners
 */

export interface GrammarReference {
  id: string;
  section: number;
  title: string;
  level: 'N5' | 'N4' | 'N3';
  category: 'particles' | 'verbs' | 'adjectives' | 'sentence-patterns' | 'expressions' | 'advanced';
  explanation: string;
  examples: Array<{
    japanese: string;
    romaji: string;
    english: string;
    note?: string;
  }>;
  commonMistakes?: string[];
  relatedSections?: number[];
}

export const GRAMMAR_REFERENCE: GrammarReference[] = [
  // §10 - Nouns
  {
    id: 'grammar-10',
    section: 10,
    title: 'Nouns',
    level: 'N5',
    category: 'sentence-patterns',
    explanation: 'Japanese nouns have no articles, no plural forms, and no gender. Context determines meaning.',
    examples: [
      {
        japanese: '本',
        romaji: 'hon',
        english: 'book / books / a book / the book',
        note: 'Same word for all forms'
      },
      {
        japanese: '学生',
        romaji: 'gakusei',
        english: 'student(s)',
        note: 'Add たち (tachi) for explicit plural: 学生たち'
      }
    ],
    commonMistakes: [
      'Don\'t add "a" or "the" - these don\'t exist in Japanese',
      'Context, not word form, indicates singular/plural'
    ],
    relatedSections: [18]
  },

  // §11 - Counters
  {
    id: 'grammar-11',
    section: 11,
    title: 'Counters',
    level: 'N5',
    category: 'sentence-patterns',
    explanation: 'Japanese uses specific counter words based on object shape, size, or type. This is the part learners chronically underestimate.',
    examples: [
      {
        japanese: '一つ、二つ、三つ',
        romaji: 'hitotsu, futatsu, mittsu',
        english: 'one thing, two things, three things',
        note: 'Generic counter for small objects'
      },
      {
        japanese: '一人、二人、三人',
        romaji: 'hitori, futari, san-nin',
        english: 'one person, two people, three people',
        note: '人 counter; irregular for 1 and 2'
      },
      {
        japanese: '一本、二本、三本',
        romaji: 'ippon, nihon, sanbon',
        english: '1, 2, 3 cylindrical objects',
        note: 'ほん/ぼん/ぽん changes with number'
      },
      {
        japanese: '一枚、二枚、三枚',
        romaji: 'ichimai, nimai, sanmai',
        english: '1, 2, 3 flat objects (paper, shirts)',
        note: '枚 for thin/flat things'
      }
    ],
    commonMistakes: [
      'Forgetting to use counters - you can\'t just say 三 (san) alone',
      'Using wrong counter for object type',
      'Not applying sound changes (rendaku): 三本 is sanBON not sanHON'
    ],
    relatedSections: [21]
  },

  // §17 - The Classes and Forms of Verbs
  {
    id: 'grammar-17',
    section: 17,
    title: 'Verb Classes & Conjugation',
    level: 'N5',
    category: 'verbs',
    explanation: 'The master conjugation map. Japanese has 3 verb classes: u-verbs (godan), ru-verbs (ichidan), and 2 irregulars (する, くる).',
    examples: [
      {
        japanese: '書く → 書きます',
        romaji: 'kaku → kakimasu',
        english: 'to write (u-verb)',
        note: 'Drop う sound, add ます'
      },
      {
        japanese: '食べる → 食べます',
        romaji: 'taberu → tabemasu',
        english: 'to eat (ru-verb)',
        note: 'Drop る, add ます'
      },
      {
        japanese: 'する → します',
        romaji: 'suru → shimasu',
        english: 'to do (irregular)',
      },
      {
        japanese: '来る → 来ます',
        romaji: 'kuru → kimasu',
        english: 'to come (irregular)',
        note: 'Completely irregular reading'
      }
    ],
    commonMistakes: [
      'Treating all -ru verbs as ru-verbs (e.g., 帰る is u-verb, not ru-verb)',
      'Not memorizing the て-form rules',
      'Forgetting the two irregulars'
    ],
    relatedSections: [18, 19]
  },

  // §18 - Particles Used with Verbs
  {
    id: 'grammar-18',
    section: 18,
    title: 'Particles with Verbs',
    level: 'N5',
    category: 'particles',
    explanation: 'Particles are grammatical GPS. They show relationships between words. Master は, が, を, に, で, から, まで first.',
    examples: [
      {
        japanese: '私は学生です。',
        romaji: 'Watashi wa gakusei desu.',
        english: 'I am a student.',
        note: 'は marks the topic (what we\'re talking about)'
      },
      {
        japanese: '雨が降っています。',
        romaji: 'Ame ga futte imasu.',
        english: 'Rain is falling.',
        note: 'が marks the subject (what\'s doing the action)'
      },
      {
        japanese: 'パンを食べます。',
        romaji: 'Pan o tabemasu.',
        english: 'I eat bread.',
        note: 'を marks direct object'
      },
      {
        japanese: '学校に行きます。',
        romaji: 'Gakkou ni ikimasu.',
        english: 'I go to school.',
        note: 'に marks destination with motion verbs'
      },
      {
        japanese: '図書館で勉強します。',
        romaji: 'Toshokan de benkyou shimasu.',
        english: 'I study at the library.',
        note: 'で marks location of action'
      },
      {
        japanese: '東京から来ました。',
        romaji: 'Toukyou kara kimashita.',
        english: 'I came from Tokyo.',
        note: 'から marks origin/starting point'
      }
    ],
    commonMistakes: [
      'Confusing は and が (は = topic, が = subject)',
      'Using に instead of で for action location',
      'Dropping particles in polite speech (okay in casual, not polite)'
    ],
    relatedSections: [10, 11]
  },

  // §28 - Obligation & Prohibition
  {
    id: 'grammar-28',
    section: 28,
    title: 'Obligation & Prohibition',
    level: 'N4',
    category: 'expressions',
    explanation: 'Express "must do", "must not do", and "don\'t have to".',
    examples: [
      {
        japanese: '宿題をしなければなりません。',
        romaji: 'Shukudai o shinakereba narimasen.',
        english: 'I must do homework.',
        note: 'Formal obligation'
      },
      {
        japanese: '宿題をしなくてはいけません。',
        romaji: 'Shukudai o shinakute wa ikemasen.',
        english: 'I must do homework.',
        note: 'Common obligation form'
      },
      {
        japanese: '宿題をしなきゃ。',
        romaji: 'Shukudai o shinakya.',
        english: 'I gotta do homework.',
        note: 'Casual contraction'
      },
      {
        japanese: 'タバコを吸ってはいけません。',
        romaji: 'Tabako o sutte wa ikemasen.',
        english: 'You must not smoke.',
        note: 'Prohibition'
      },
      {
        japanese: 'レックスのパンツを忘れちゃダメよ。',
        romaji: 'Rekkusu no pantsu o wasurechya dame yo.',
        english: 'Don\'t forget Lex\'s underwear! (casual)',
        note: 'ちゃダメ = casual prohibition'
      }
    ],
    commonMistakes: [
      'Using いけない in formal situations (use なりません)',
      'Forgetting the は after て-form for prohibition'
    ],
    relatedSections: [29, 30]
  },

  // §31 - Passive, Potential, Respect
  {
    id: 'grammar-31',
    section: 31,
    title: 'Passive, Potential & Honorific Forms',
    level: 'N4',
    category: 'verbs',
    explanation: 'Advanced verb forms. Passive (受身), potential (可能), and respectful (尊敬語) all use similar conjugations.',
    examples: [
      {
        japanese: '先生に褒められました。',
        romaji: 'Sensei ni homeraremashita.',
        english: 'I was praised by the teacher.',
        note: 'Passive form'
      },
      {
        japanese: '日本語が話せます。',
        romaji: 'Nihongo ga hanasemasu.',
        english: 'I can speak Japanese.',
        note: 'Potential form'
      },
      {
        japanese: '先生が来られました。',
        romaji: 'Sensei ga koraremashita.',
        english: 'The teacher came. (respectful)',
        note: 'Honorific form'
      }
    ],
    commonMistakes: [
      'Confusing passive and potential (they look similar)',
      'Overusing passive (Japanese uses it differently than English)'
    ],
    relatedSections: [32, 17]
  },

  // §32 - Causative
  {
    id: 'grammar-32',
    section: 32,
    title: 'Causative Form',
    level: 'N4',
    category: 'verbs',
    explanation: 'Make/let someone do something. (使役)',
    examples: [
      {
        japanese: '母が私に野菜を食べさせました。',
        romaji: 'Haha ga watashi ni yasai o tabesasemashita.',
        english: 'My mother made me eat vegetables.',
        note: 'Causative (forcing)'
      },
      {
        japanese: '子供を遊ばせます。',
        romaji: 'Kodomo o asobasemasu.',
        english: 'I let the child play.',
        note: 'Causative (permitting)'
      }
    ],
    commonMistakes: [
      'Wrong particle with causative (use に for person caused)',
      'Confusing causative with causative-passive'
    ],
    relatedSections: [31]
  },

  // §36 - If and When
  {
    id: 'grammar-36',
    section: 36,
    title: 'Conditionals: If and When',
    level: 'N4',
    category: 'sentence-patterns',
    explanation: 'Four conditional forms: たら, と, ば, なら. Each has specific uses.',
    examples: [
      {
        japanese: '雨が降ったら、行きません。',
        romaji: 'Ame ga futtara, ikimasen.',
        english: 'If it rains, I won\'t go.',
        note: 'たら = general conditional'
      },
      {
        japanese: 'このボタンを押すと、電気がつきます。',
        romaji: 'Kono botan o osu to, denki ga tsukimasu.',
        english: 'When you press this button, the light turns on.',
        note: 'と = natural consequence'
      },
      {
        japanese: '安ければ、買います。',
        romaji: 'Yasukereba, kaimasu.',
        english: 'If it\'s cheap, I\'ll buy it.',
        note: 'ば = hypothetical (less used)'
      },
      {
        japanese: '日本に行くなら、富士山を見てください。',
        romaji: 'Nihon ni iku nara, Fujisan o mite kudasai.',
        english: 'If you\'re going to Japan, please see Mt. Fuji.',
        note: 'なら = contextual (if that\'s the case)'
      }
    ],
    commonMistakes: [
      'Using wrong conditional for context',
      'Starting with conditionals - master たら first'
    ],
    relatedSections: [37]
  }
];

// Quick reference by level
export function getGrammarByLevel(level: 'N5' | 'N4' | 'N3'): GrammarReference[] {
  return GRAMMAR_REFERENCE.filter(g => g.level === level);
}

// Get grammar by category
export function getGrammarByCategory(category: string): GrammarReference[] {
  return GRAMMAR_REFERENCE.filter(g => g.category === category);
}

// Get grammar by section number
export function getGrammarBySection(section: number): GrammarReference | undefined {
  return GRAMMAR_REFERENCE.find(g => g.section === section);
}

// Essential grammar points (highest priority)
export const ESSENTIAL_GRAMMAR_SECTIONS = [10, 11, 17, 18, 28, 31, 32, 36];
