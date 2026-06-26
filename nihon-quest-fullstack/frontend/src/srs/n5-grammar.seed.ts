/**
 * n5-grammar.seed.ts
 * -------------------
 * N5 grammar points in standard Genki I teaching order.
 * Includes the requested sentence and kid-friendly explanations.
 */

import type { GrammarCurriculum } from './grammar-types';

export const N5_GRAMMAR: GrammarCurriculum = [
  {
    id: 'n5-wa-desu',
    level: 'N5',
    sequenceIndex: 1,
    genkiLesson: 1,
    pattern: 'Noun1 は Noun2 です',
    title: 'X is Y (topic + copula)',
    summary: 'States that the topic (Noun1) is Noun2. です is the polite copula.',
    formation:
      'Topic + は (pronounced "wa") + predicate noun + です. は marks the topic, です makes it polite.',
    kidExplanation: 'Use は to say "this is that" politely! 👤 The word before は is what we\'re talking about!',
    emoji: '👋',
    examples: [
      {
        jp: '私は学生です。',
        kana: 'わたしはがくせいです。',
        romaji: 'Watashi wa gakusei desu.',
        en: 'I am a student.',
        register: 'polite',
        emoji: '👨‍🎓',
        tokens: [
          { surface: '私', reading: 'わたし', gloss: 'I' },
          { surface: 'は', gloss: 'topic particle (wa)' },
          { surface: '学生', reading: 'がくせい', gloss: 'student' },
          { surface: 'です', gloss: 'copula (polite)' },
        ],
      },
    ],
    primaryRegister: 'polite',
    commonMistakes: [
      'Writing/pronouncing は as "ha" instead of "wa" when it is the topic particle.',
      'Adding を or other object particles before です — です takes a noun directly.',
    ],
    prerequisites: [],
    tags: ['copula', 'particle', 'foundation'],
  },
  {
    id: 'n5-question-ka',
    level: 'N5',
    sequenceIndex: 2,
    genkiLesson: 1,
    pattern: 'Sentence + か',
    title: 'Question particle か',
    summary: 'Turns a statement into a yes/no or wh-question. No word-order change.',
    formation:
      'Append か to the end of a polite sentence. Japanese does not invert word order for questions; か does the work. A question mark is optional.',
    kidExplanation: 'Add か at the end to ask a question! Just like adding "?" but you say it! ❓',
    emoji: '❓',
    examples: [
      {
        jp: '学生ですか。',
        kana: 'がくせいですか。',
        romaji: 'Gakusei desu ka.',
        en: 'Are you a student?',
        register: 'polite',
        emoji: '🤔',
        tokens: [
          { surface: '学生', reading: 'がくせい', gloss: 'student' },
          { surface: 'です', gloss: 'copula (polite)' },
          { surface: 'か', gloss: 'question particle' },
        ],
      },
    ],
    primaryRegister: 'polite',
    commonMistakes: [
      'Trying to invert the subject and verb like English — Japanese keeps the order and just adds か.',
    ],
    prerequisites: ['n5-wa-desu'],
    tags: ['particle', 'question', 'foundation'],
  },
  {
    id: 'n5-no-possessive',
    level: 'N5',
    sequenceIndex: 3,
    genkiLesson: 1,
    pattern: 'Noun1 の Noun2',
    title: 'Possessive / noun linking の',
    summary: "Links two nouns: Noun1 modifies or owns Noun2 (English 's or 'of').",
    formation:
      'Place の between two nouns. Noun1 の Noun2 = "Noun2 of/belonging to Noun1". Modifier always comes first.',
    kidExplanation: 'の shows who owns something! Like "my toy" or "mom\'s bag"! 🎒',
    emoji: '🔗',
    examples: [
      {
        jp: 'まま、レックスのパンツわすれちゃだめよ',
        kana: 'まま、れっくすのぱんつわすれちゃだめよ',
        romaji: 'Mama, Rekkusu no pantsu wasurecha dame yo.',
        en: "Mom, don't forget Lex's underwear!",
        register: 'casual',
        emoji: '🩲',
        tokens: [
          { surface: 'まま', reading: 'まま', gloss: 'Mom' },
          { surface: 'レックス', reading: 'れっくす', gloss: 'Lex (name)' },
          { surface: 'の', gloss: 'possessive particle' },
          { surface: 'パンツ', reading: 'ぱんつ', gloss: 'underwear' },
          { surface: 'わすれちゃだめよ', reading: 'わすれちゃだめよ', gloss: "don't forget" },
        ],
      },
      {
        jp: '私の本',
        kana: 'わたしのほん',
        romaji: 'Watashi no hon',
        en: 'My book',
        register: 'casual',
        emoji: '📚',
        tokens: [
          { surface: '私', reading: 'わたし', gloss: 'I' },
          { surface: 'の', gloss: 'possessive particle' },
          { surface: '本', reading: 'ほん', gloss: 'book' },
        ],
      },
    ],
    primaryRegister: 'casual',
    commonMistakes: [
      "Reversing the order — English 'Lex's underwear' maps to レックス の パンツ, not パンツ の レックス.",
    ],
    prerequisites: ['n5-wa-desu'],
    tags: ['particle', 'noun', 'foundation'],
  },
  {
    id: 'n5-mo-also',
    level: 'N5',
    sequenceIndex: 4,
    genkiLesson: 2,
    pattern: 'Noun も',
    title: '"Also / too" particle も',
    summary: 'Replaces は or を to mean "also" or "too" for the marked noun.',
    formation:
      'Swap the topic/object particle (は or を) for も. Do not stack them: say 私も, never 私はも.',
    kidExplanation: 'も means "me too!" or "also"! Use it when you want to join in! 🙋',
    emoji: '➕',
    examples: [
      {
        jp: '私も学生です。',
        kana: 'わたしもがくせいです。',
        romaji: 'Watashi mo gakusei desu.',
        en: 'I am a student too.',
        register: 'polite',
        emoji: '🙋‍♂️',
        tokens: [
          { surface: '私', reading: 'わたし', gloss: 'I' },
          { surface: 'も', gloss: 'also / too' },
          { surface: '学生', reading: 'がくせい', gloss: 'student' },
          { surface: 'です', gloss: 'copula (polite)' },
        ],
      },
    ],
    primaryRegister: 'polite',
    commonMistakes: ['Keeping は or を in place — も replaces them, it does not stack on them.'],
    prerequisites: ['n5-wa-desu'],
    tags: ['particle', 'foundation'],
  },
  {
    id: 'n5-masu-form',
    level: 'N5',
    sequenceIndex: 5,
    genkiLesson: 3,
    pattern: 'Verb stem + ます / ません',
    title: 'Polite verb form (present/future)',
    summary: 'The ます-form: polite present/future. ません is its negative.',
    formation:
      'Attach ます to the verb stem for affirmative, ません for negative. ます-form covers both present habit and future ("eat" / "will eat"). It is the safe default that is never rude.',
    kidExplanation: 'Add ます to action words to be polite! Like "I eat" becomes たべます! 🍽️',
    emoji: '✨',
    examples: [
      {
        jp: '毎日勉強します。',
        kana: 'まいにちべんきょうします。',
        romaji: 'Mainichi benkyou shimasu.',
        en: 'I study every day.',
        register: 'polite',
        emoji: '📝',
        tokens: [
          { surface: '毎日', reading: 'まいにち', gloss: 'every day' },
          { surface: '勉強します', reading: 'べんきょうします', gloss: 'study (polite)' },
        ],
      },
    ],
    primaryRegister: 'polite',
    commonMistakes: [
      'Using ます-form with a plain-form noun clause where plain form is required.',
      'Forgetting that one form serves both present and future — there is no separate future tense.',
    ],
    prerequisites: ['n5-wa-desu'],
    tags: ['verb', 'conjugation', 'foundation'],
  },
  {
    id: 'n5-wo-object',
    level: 'N5',
    sequenceIndex: 6,
    genkiLesson: 3,
    pattern: 'Noun を Verb',
    title: 'Direct object particle を',
    summary: 'Marks the direct object — the thing the verb acts on. Pronounced "o".',
    formation:
      'Place を (pronounced "o") immediately after the direct object, before the verb. Remember SOV: object precedes verb.',
    kidExplanation: 'を shows what you\'re doing something to! "I eat を sushi" 🍣',
    emoji: '🎯',
    examples: [
      {
        jp: '寿司を食べます。',
        kana: 'すしをたべます。',
        romaji: 'Sushi o tabemasu.',
        en: 'I eat sushi.',
        register: 'polite',
        emoji: '🍣',
        tokens: [
          { surface: '寿司', reading: 'すし', gloss: 'sushi' },
          { surface: 'を', gloss: 'object particle (o)' },
          { surface: '食べます', reading: 'たべます', gloss: 'eat (polite)' },
        ],
      },
    ],
    primaryRegister: 'polite',
    commonMistakes: [
      'Pronouncing を as "wo" — it is "o" in modern Japanese.',
      'Dropping を in casual speech is fine, but learn it in place first.',
    ],
    prerequisites: ['n5-masu-form'],
    tags: ['particle', 'verb', 'foundation'],
  },
  {
    id: 'n5-ni-time-destination',
    level: 'N5',
    sequenceIndex: 7,
    genkiLesson: 3,
    pattern: 'Time/Place に',
    title: 'Particle に (time, destination, existence)',
    summary: 'Marks a point in time, a destination of movement, or a location of existence.',
    formation:
      'Use に after a specific time (七時に = at 7:00), a destination with motion verbs (学校に行きます = go to school), or a location with あります/います.',
    kidExplanation: 'に tells "when" or "where to"! At 3 o\'clock, to school! ⏰',
    emoji: '📍',
    examples: [
      {
        jp: '七時に起きます。',
        kana: 'しちじにおきます。',
        romaji: 'Shichi-ji ni okimasu.',
        en: 'I wake up at 7:00.',
        register: 'polite',
        emoji: '⏰',
        tokens: [
          { surface: '七時', reading: 'しちじ', gloss: '7 o\'clock' },
          { surface: 'に', gloss: 'at (time particle)' },
          { surface: '起きます', reading: 'おきます', gloss: 'wake up (polite)' },
        ],
      },
    ],
    primaryRegister: 'polite',
    commonMistakes: [
      'Adding に to relative time words like 今日 (today) or 明日 (tomorrow) — those take no particle.',
      'Confusing に (destination/arrival) with で (location where an action happens).',
    ],
    prerequisites: ['n5-masu-form'],
    tags: ['particle', 'time', 'foundation'],
  },
  {
    id: 'n5-de-location-means',
    level: 'N5',
    sequenceIndex: 8,
    genkiLesson: 3,
    pattern: 'Place で Verb / Means で',
    title: 'Particle で (location of action, means)',
    summary: 'Marks where an action takes place, or the means/tool used to do it.',
    formation:
      'Use で for the location an action occurs (図書館で勉強します = study at the library) or the means (電車で行きます = go by train).',
    kidExplanation: 'で shows WHERE you do something or HOW you do it! At home, by bus! 🏠',
    emoji: '🚌',
    examples: [
      {
        jp: '図書館で勉強します。',
        kana: 'としょかんでべんきょうします。',
        romaji: 'Toshokan de benkyou shimasu.',
        en: 'I study at the library.',
        register: 'polite',
        emoji: '📚',
        tokens: [
          { surface: '図書館', reading: 'としょかん', gloss: 'library' },
          { surface: 'で', gloss: 'at (action location)' },
          { surface: '勉強します', reading: 'べんきょうします', gloss: 'study (polite)' },
        ],
      },
    ],
    primaryRegister: 'polite',
    commonMistakes: [
      'Using に for the place of an action — に marks destination/existence, で marks where an action happens.',
    ],
    prerequisites: ['n5-ni-time-destination'],
    tags: ['particle', 'location', 'foundation'],
  },
];
