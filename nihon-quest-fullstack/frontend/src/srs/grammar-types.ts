/**
 * grammar-types.ts
 * -----------------
 * Static curriculum content model for JLPT grammar points.
 *
 * Design rule: this file describes CONTENT only. It contains no scheduling
 * state, no user data, and no FSRS types. Content is immutable, versioned,
 * and shipped with the app. Per-user review state lives in grammar-scheduler.ts.
 */

export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type Register = 'casual' | 'polite' | 'formal';

/**
 * A single token inside an example sentence.
 *
 * `jmdictSeq` is the JMdict <ent_seq> number. After you tokenize a sentence
 * with kuromoji.js, map each surface form to its JMdict entry and store the
 * sequence number here. That gives you click-to-define for free in the UI
 * without re-running the dictionary lookup at render time.
 */
export interface Token {
  /** Surface form as it appears in the sentence, e.g. "食べます". */
  surface: string;
  /** Reading in kana, e.g. "たべます". Used for furigana rendering. */
  reading?: string;
  /** JMdict ent_seq for the dictionary (base) form. Null for particles/grammar. */
  jmdictSeq?: number;
  /** Optional short gloss for inline display, e.g. "eat (polite)". */
  gloss?: string;
}

export interface ExampleSentence {
  /** Japanese with kanji, e.g. "私は学生です". */
  jp: string;
  /** Full kana reading of `jp`, e.g. "わたしはがくせいです". */
  kana: string;
  /** Hepburn romaji. Keep for N5 learners; you can hide it past N4 in the UI. */
  romaji: string;
  /** Natural English translation. */
  en: string;
  /** Optional word-by-word breakdown. Powers tap-to-define and parsing drills. */
  tokens?: Token[];
  /** Register this sentence models. Lets you filter examples by formality. */
  register: Register;
  /** Optional image URL for visual learning */
  imageUrl?: string;
  /** Emoji for quick visual reference */
  emoji?: string;
}

export interface GrammarPoint {
  /** Stable slug. Never reuse or renumber — scheduling state references this. */
  id: string;
  level: JlptLevel;
  /** Global teaching order within the level (1-based). Drives the unlock path. */
  sequenceIndex: number;
  /** Cross-reference to the standard textbook so learners can read further. */
  genkiLesson?: number;

  /** The pattern with placeholders, e.g. "Noun1 は Noun2 です". */
  pattern: string;
  /** Short English name, e.g. "X is Y (copula)". */
  title: string;
  /** One-sentence function. This is the SRS prompt's "answer" in essence. */
  summary: string;
  /** How to build the form, in plain steps. Markdown allowed. */
  formation: string;

  examples: ExampleSentence[];

  /** Default register a learner produces this in. */
  primaryRegister: Register;
  /** Frequent learner errors. Surface these as hints after a lapse. */
  commonMistakes: string[];
  /** ids of points that should be learned first. Enforces the unlock order. */
  prerequisites: string[];
  /** Free-form tags for filtering: "particle", "verb", "adjective", etc. */
  tags: string[];
  
  /** Kid-friendly explanation (simplified) */
  kidExplanation?: string;
  /** Main emoji for this grammar point */
  emoji?: string;
}

/** A whole level's curriculum, sorted by sequenceIndex. */
export type GrammarCurriculum = GrammarPoint[];
