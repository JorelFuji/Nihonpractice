/**
 * Grammar Learning Modules
 * SOV Sentence Structure, Particles, Verb Forms, and All Grammar Patterns
 * Bilingual with rationale and understanding
 */

import { LearningModule } from './learningModules'

// ============================================================================
// MODULE: SOV SENTENCE STRUCTURE (文の構造)
// ============================================================================

export const sovModule: LearningModule = {
  id: 'sov-structure',
  title: { ja: 'SOV文の構造', en: 'SOV Sentence Structure' },
  description: {
    ja: '日本語の基本的な文の順序を学びます：主語-目的語-動詞',
    en: 'Learn the basic Japanese sentence order: Subject-Object-Verb'
  },
  category: 'grammar',
  level: 'N5',
  order: 5,
  lessons: [
    {
      id: 'sov-basics',
      title: { ja: 'SOVの基本', en: 'SOV Basics' },
      rationale: {
        ja: '日本語と英語の最大の違いは文の順序です。英語はSVO（主語-動詞-目的語）ですが、日本語はSOV（主語-目的語-動詞）です。この違いを理解することが、日本語を話す第一歩です。',
        en: 'The biggest difference between Japanese and English is sentence order. English is SVO (Subject-Verb-Object), but Japanese is SOV (Subject-Object-Verb). Understanding this difference is the first step to speaking Japanese.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '英語と日本語の比較：\n\n英語 (SVO):\nI eat an apple.\n主語 動詞 目的語\n\n日本語 (SOV):\n私は りんごを 食べます。\n主語 目的語 動詞',
            en: 'English vs Japanese comparison:\n\nEnglish (SVO):\nI eat an apple.\nSubject Verb Object\n\nJapanese (SOV):\n私は りんごを 食べます。\nSubject Object Verb'
          }
        }
      ],
      examples: [
        {
          japanese: '私は りんごを 食べます。',
          reading: 'わたしは りんごを たべます。',
          english: 'I eat an apple.',
          breakdown: [
            { word: '私', reading: 'わたし', meaning: 'I', type: 'subject' },
            { word: 'は', reading: 'は', meaning: '(topic marker)', type: 'particle' },
            { word: 'りんご', reading: 'りんご', meaning: 'apple', type: 'object' },
            { word: 'を', reading: 'を', meaning: '(object marker)', type: 'particle' },
            { word: '食べます', reading: 'たべます', meaning: 'eat', type: 'verb' }
          ]
        },
        {
          japanese: '田中さんは 本を 読みます。',
          reading: 'たなかさんは ほんを よみます。',
          english: 'Tanaka reads a book.',
          breakdown: [
            { word: '田中さん', reading: 'たなかさん', meaning: 'Tanaka (Mr./Ms.)', type: 'subject' },
            { word: 'は', reading: 'は', meaning: '(topic marker)', type: 'particle' },
            { word: '本', reading: 'ほん', meaning: 'book', type: 'object' },
            { word: 'を', reading: 'を', meaning: '(object marker)', type: 'particle' },
            { word: '読みます', reading: 'よみます', meaning: 'read', type: 'verb' }
          ]
        },
        {
          japanese: '学生は 日本語を 勉強します。',
          reading: 'がくせいは にほんごを べんきょうします。',
          english: 'The student studies Japanese.',
          breakdown: [
            { word: '学生', reading: 'がくせい', meaning: 'student', type: 'subject' },
            { word: 'は', reading: 'は', meaning: '(topic marker)', type: 'particle' },
            { word: '日本語', reading: 'にほんご', meaning: 'Japanese language', type: 'object' },
            { word: 'を', reading: 'を', meaning: '(object marker)', type: 'particle' },
            { word: '勉強します', reading: 'べんきょうします', meaning: 'study', type: 'verb' }
          ]
        }
      ],
      practice: [
        {
          id: 'sov-1',
          type: 'ordering',
          question: {
            ja: '正しい順序に並べてください：「私は」「食べます」「パンを」',
            en: 'Put in correct order: "I" "eat" "bread"'
          },
          correctAnswer: ['私は', 'パンを', '食べます'],
          explanation: {
            ja: '日本語はSOV順序です：主語 + 目的語 + 動詞',
            en: 'Japanese follows SOV order: Subject + Object + Verb'
          }
        }
      ]
    },
    {
      id: 'particles-wa-wo',
      title: { ja: '助詞：は と を', en: 'Particles: は and を' },
      rationale: {
        ja: '助詞は日本語の文法で最も重要です。「は」は主題を示し、「を」は動作の対象を示します。これらがないと、文の意味が不明確になります。',
        en: 'Particles are the most important in Japanese grammar. "は" marks the topic, and "を" marks the object of action. Without these, sentence meaning becomes unclear.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '助詞の役割：\n\n「は」(wa):\n• 主題を示す\n• 「〜について言えば」という意味\n• 例：私は学生です (As for me, I am a student)\n\n「を」(wo/o):\n• 動作の対象を示す\n• 動詞の前に使う\n• 例：りんごを食べる (eat an apple)',
            en: 'Particle roles:\n\n"は" (wa):\n• Marks the topic\n• Means "as for ~"\n• Example: 私は学生です (As for me, I am a student)\n\n"を" (wo/o):\n• Marks the object of action\n• Used before verbs\n• Example: りんごを食べる (eat an apple)'
          }
        }
      ],
      examples: [
        {
          japanese: '猫は 魚を 食べます。',
          reading: 'ねこは さかなを たべます。',
          english: 'The cat eats fish.',
          breakdown: [
            { word: '猫', reading: 'ねこ', meaning: 'cat', type: 'subject' },
            { word: 'は', reading: 'は', meaning: '(topic: the cat)', type: 'particle' },
            { word: '魚', reading: 'さかな', meaning: 'fish', type: 'object' },
            { word: 'を', reading: 'を', meaning: '(object: fish)', type: 'particle' },
            { word: '食べます', reading: 'たべます', meaning: 'eat', type: 'verb' }
          ]
        }
      ],
      practice: []
    },
    {
      id: 'particles-ni-de',
      title: { ja: '助詞：に と で', en: 'Particles: に and で' },
      rationale: {
        ja: '「に」は場所・時間・方向を示し、「で」は動作の場所・手段を示します。これらを使い分けることで、より詳しい情報を伝えられます。',
        en: '"に" indicates location/time/direction, and "で" indicates place/means of action. Using these correctly allows you to convey more detailed information.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '「に」の使い方：\n• 存在の場所：学校にいます\n• 時間：3時に会います\n• 方向：東京に行きます\n\n「で」の使い方：\n• 動作の場所：図書館で勉強します\n• 手段：バスで行きます\n• 範囲：日本で一番高い山',
            en: 'Using "に":\n• Location of existence: at school\n• Time: meet at 3 o\'clock\n• Direction: go to Tokyo\n\nUsing "で":\n• Place of action: study at library\n• Means: go by bus\n• Scope: tallest mountain in Japan'
          }
        }
      ],
      examples: [
        {
          japanese: '図書館で 本を 読みます。',
          reading: 'としょかんで ほんを よみます。',
          english: 'I read books at the library.',
          breakdown: [
            { word: '図書館', reading: 'としょかん', meaning: 'library', type: 'location' },
            { word: 'で', reading: 'で', meaning: '(at/in)', type: 'particle' },
            { word: '本', reading: 'ほん', meaning: 'book', type: 'object' },
            { word: 'を', reading: 'を', meaning: '(object marker)', type: 'particle' },
            { word: '読みます', reading: 'よみます', meaning: 'read', type: 'verb' }
          ]
        },
        {
          japanese: '東京に 行きます。',
          reading: 'とうきょうに いきます。',
          english: 'I go to Tokyo.',
          breakdown: [
            { word: '東京', reading: 'とうきょう', meaning: 'Tokyo', type: 'destination' },
            { word: 'に', reading: 'に', meaning: '(to/toward)', type: 'particle' },
            { word: '行きます', reading: 'いきます', meaning: 'go', type: 'verb' }
          ]
        }
      ],
      practice: []
    },
    {
      id: 'verb-types',
      title: { ja: '動詞の種類', en: 'Verb Types' },
      rationale: {
        ja: '日本語の動詞は3つのグループに分かれます：う動詞、る動詞、不規則動詞。グループを知ることで、活用が簡単になります。',
        en: 'Japanese verbs are divided into 3 groups: u-verbs, ru-verbs, and irregular verbs. Knowing the group makes conjugation easier.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '動詞のグループ：\n\n1. う動詞（五段動詞）\n• 語尾が「う、く、ぐ、す、つ、ぬ、ぶ、む、る」\n• 例：書く、話す、読む\n\n2. る動詞（一段動詞）\n• 語尾が「る」（前が「い」か「え」の音）\n• 例：食べる、見る、起きる\n\n3. 不規則動詞\n• する、来る だけ',
            en: 'Verb groups:\n\n1. U-verbs (Godan verbs)\n• End with u, ku, gu, su, tsu, nu, bu, mu, ru\n• Examples: write, speak, read\n\n2. Ru-verbs (Ichidan verbs)\n• End with "ru" (preceded by "i" or "e" sound)\n• Examples: eat, see, wake up\n\n3. Irregular verbs\n• Only する (do) and 来る (come)'
          }
        }
      ],
      examples: [
        {
          japanese: '書く',
          reading: 'かく',
          english: 'to write (u-verb)',
          breakdown: [
            { word: '書く', reading: 'かく', meaning: 'write', type: 'u-verb' }
          ]
        },
        {
          japanese: '食べる',
          reading: 'たべる',
          english: 'to eat (ru-verb)',
          breakdown: [
            { word: '食べる', reading: 'たべる', meaning: 'eat', type: 'ru-verb' }
          ]
        },
        {
          japanese: 'する',
          reading: 'する',
          english: 'to do (irregular)',
          breakdown: [
            { word: 'する', reading: 'する', meaning: 'do', type: 'irregular' }
          ]
        }
      ],
      practice: []
    },
    {
      id: 'adjectives',
      title: { ja: '形容詞：い形容詞とな形容詞', en: 'Adjectives: I-adjectives and Na-adjectives' },
      rationale: {
        ja: '日本語の形容詞は2種類あります。い形容詞は語尾が「い」で、な形容詞は名詞の前に「な」をつけます。使い方が違うので、区別が重要です。',
        en: 'Japanese has two types of adjectives. I-adjectives end with "i", and na-adjectives use "na" before nouns. They conjugate differently, so distinguishing them is important.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: 'い形容詞：\n• 語尾が「い」\n• 例：大きい、小さい、高い、安い\n• 活用：大きい → 大きくない（否定）\n\nな形容詞：\n• 名詞の前に「な」\n• 例：きれい、静か、便利、有名\n• 活用：きれいな → きれいじゃない（否定）',
            en: 'I-adjectives:\n• End with "i"\n• Examples: big, small, expensive, cheap\n• Conjugation: 大きい → 大きくない (negative)\n\nNa-adjectives:\n• Use "na" before nouns\n• Examples: pretty, quiet, convenient, famous\n• Conjugation: きれいな → きれいじゃない (negative)'
          }
        }
      ],
      examples: [
        {
          japanese: '大きい 犬',
          reading: 'おおきい いぬ',
          english: 'big dog',
          breakdown: [
            { word: '大きい', reading: 'おおきい', meaning: 'big', type: 'i-adjective' },
            { word: '犬', reading: 'いぬ', meaning: 'dog', type: 'noun' }
          ]
        },
        {
          japanese: 'きれいな 花',
          reading: 'きれいな はな',
          english: 'pretty flower',
          breakdown: [
            { word: 'きれい', reading: 'きれい', meaning: 'pretty', type: 'na-adjective' },
            { word: 'な', reading: 'な', meaning: '(connector)', type: 'particle' },
            { word: '花', reading: 'はな', meaning: 'flower', type: 'noun' }
          ]
        }
      ],
      practice: []
    }
  ],
  skillCheckoff: {
    id: 'sov-checkoff',
    title: { ja: 'SOV文法スキルチェック', en: 'SOV Grammar Skill Checkoff' },
    requirements: [
      { id: '1', skill: { ja: 'SOV順序を理解している', en: 'Understand SOV order' }, completed: false },
      { id: '2', skill: { ja: '助詞「は」「を」を使える', en: 'Can use particles は and を' }, completed: false },
      { id: '3', skill: { ja: '助詞「に」「で」を使える', en: 'Can use particles に and で' }, completed: false },
      { id: '4', skill: { ja: '動詞のグループを識別できる', en: 'Can identify verb groups' }, completed: false },
      { id: '5', skill: { ja: 'い形容詞とな形容詞を区別できる', en: 'Can distinguish i-adj and na-adj' }, completed: false },
      { id: '6', skill: { ja: '基本的な文を作れる', en: 'Can build basic sentences' }, completed: false }
    ],
    passingScore: 85,
    quiz: []
  }
}

export const grammarModules: LearningModule[] = [sovModule]
