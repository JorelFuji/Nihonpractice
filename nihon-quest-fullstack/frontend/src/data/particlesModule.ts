/**
 * Comprehensive Particles Learning Module
 * All Japanese particles with SOV practice, examples, and exercises
 */

import { LearningModule } from './learningModules'

// ============================================================================
// PARTICLES MODULE - Complete Guide
// ============================================================================

export const particlesModule: LearningModule = {
  id: 'particles',
  title: { ja: '助詞（じょし）', en: 'Particles' },
  description: {
    ja: '日本語の助詞を完全にマスターします。は、を、に、で、が、と、も、へ、から、まで、の、や、か、ね、よ',
    en: 'Master all Japanese particles completely: wa, wo, ni, de, ga, to, mo, he, kara, made, no, ya, ka, ne, yo'
  },
  category: 'grammar',
  level: 'N5',
  order: 6,
  lessons: [
    // ========================================================================
    // LESSON 1: は (wa) - Topic Marker
    // ========================================================================
    {
      id: 'particle-wa',
      title: { ja: '助詞「は」- 主題', en: 'Particle は (wa) - Topic Marker' },
      rationale: {
        ja: '「は」は日本語で最も重要な助詞です。文の主題（トピック）を示します。「〜について言えば」という意味で、会話の焦点を明確にします。英語の主語とは違い、話題を設定する役割があります。',
        en: '"は" is the most important particle in Japanese. It marks the topic of a sentence. It means "as for ~" or "speaking of ~" and sets the focus of conversation. Unlike English subjects, it establishes what you\'re talking about.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '「は」の使い方：\n\n1. 主題を示す\n   私は学生です。(As for me, I am a student)\n\n2. 対比を示す\n   りんごは好きですが、バナナは嫌いです。\n   (I like apples, but I don\'t like bananas)\n\n3. 既知の情報\n   田中さんは先生です。(Mr. Tanaka is a teacher)\n\n注意：「は」は「wa」と読みますが、書くときは「ha」です。',
            en: 'How to use は:\n\n1. Mark the topic\n   私は学生です。(As for me, I am a student)\n\n2. Show contrast\n   りんごは好きですが、バナナは嫌いです。\n   (I like apples, but I don\'t like bananas)\n\n3. Known information\n   田中さんは先生です。(Mr. Tanaka is a teacher)\n\nNote: は is pronounced "wa" but written as "ha".'
          }
        }
      ],
      examples: [
        {
          japanese: '私は 学生です。',
          reading: 'わたしは がくせいです。',
          english: 'I am a student. (As for me, I am a student)',
          breakdown: [
            { word: '私', reading: 'わたし', meaning: 'I', type: 'noun' },
            { word: 'は', reading: 'は', meaning: '(topic marker)', type: 'particle' },
            { word: '学生', reading: 'がくせい', meaning: 'student', type: 'noun' },
            { word: 'です', reading: 'です', meaning: 'am/is/are', type: 'copula' }
          ]
        },
        {
          japanese: '今日は 月曜日です。',
          reading: 'きょうは げつようびです。',
          english: 'Today is Monday.',
          breakdown: [
            { word: '今日', reading: 'きょう', meaning: 'today', type: 'noun' },
            { word: 'は', reading: 'は', meaning: '(topic marker)', type: 'particle' },
            { word: '月曜日', reading: 'げつようび', meaning: 'Monday', type: 'noun' },
            { word: 'です', reading: 'です', meaning: 'is', type: 'copula' }
          ]
        },
        {
          japanese: '日本語は 難しいですが、面白いです。',
          reading: 'にほんごは むずかしいですが、おもしろいです。',
          english: 'Japanese is difficult, but interesting.',
          breakdown: [
            { word: '日本語', reading: 'にほんご', meaning: 'Japanese language', type: 'noun' },
            { word: 'は', reading: 'は', meaning: '(topic: Japanese)', type: 'particle' },
            { word: '難しい', reading: 'むずかしい', meaning: 'difficult', type: 'i-adjective' },
            { word: 'ですが', reading: 'ですが', meaning: 'but', type: 'conjunction' },
            { word: '面白い', reading: 'おもしろい', meaning: 'interesting', type: 'i-adjective' },
            { word: 'です', reading: 'です', meaning: 'is', type: 'copula' }
          ]
        }
      ],
      practice: [
        {
          id: 'wa-1',
          type: 'fill-blank',
          question: {
            ja: '空欄に「は」を入れてください：私___日本人です。',
            en: 'Fill in the blank with は: 私___日本人です。'
          },
          correctAnswer: 'は',
          explanation: {
            ja: '「私は」で主題を示します。「私について言えば、日本人です」という意味です。',
            en: '私は marks the topic. It means "As for me, I am Japanese."'
          }
        },
        {
          id: 'wa-2',
          type: 'multiple-choice',
          question: {
            ja: '正しい文はどれですか？',
            en: 'Which sentence is correct?'
          },
          options: ['私を学生です', '私は学生です', '私が学生です', '私に学生です'],
          correctAnswer: '私は学生です',
          explanation: {
            ja: '「私は学生です」が正しいです。「は」は主題を示します。',
            en: '私は学生です is correct. は marks the topic.'
          }
        }
      ]
    },

    // ========================================================================
    // LESSON 2: を (wo/o) - Object Marker
    // ========================================================================
    {
      id: 'particle-wo',
      title: { ja: '助詞「を」- 目的語', en: 'Particle を (wo) - Object Marker' },
      rationale: {
        ja: '「を」は動作の対象を示す助詞です。SOV文型で、動詞の前に置かれ、「何を」という質問に答えます。この助詞を理解することで、日本語の文構造が明確になります。',
        en: '"を" marks the direct object of an action. In SOV structure, it comes before the verb and answers "what?" Understanding this particle clarifies Japanese sentence structure.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '「を」の使い方：\n\n1. 動作の対象\n   りんごを食べます。(eat an apple)\n\n2. 移動の経路\n   道を歩きます。(walk along the road)\n\n3. 出発点\n   家を出ます。(leave the house)\n\nSOV構造：主語 + 目的語を + 動詞\n例：私は りんごを 食べます。',
            en: 'How to use を:\n\n1. Direct object\n   りんごを食べます。(eat an apple)\n\n2. Route of movement\n   道を歩きます。(walk along the road)\n\n3. Point of departure\n   家を出ます。(leave the house)\n\nSOV structure: Subject + Object を + Verb\nExample: 私は りんごを 食べます。'
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
            { word: 'は', reading: 'は', meaning: '(topic)', type: 'particle' },
            { word: 'りんご', reading: 'りんご', meaning: 'apple', type: 'object' },
            { word: 'を', reading: 'を', meaning: '(object marker)', type: 'particle' },
            { word: '食べます', reading: 'たべます', meaning: 'eat', type: 'verb' }
          ]
        },
        {
          japanese: '学生は 日本語を 勉強します。',
          reading: 'がくせいは にほんごを べんきょうします。',
          english: 'The student studies Japanese.',
          breakdown: [
            { word: '学生', reading: 'がくせい', meaning: 'student', type: 'subject' },
            { word: 'は', reading: 'は', meaning: '(topic)', type: 'particle' },
            { word: '日本語', reading: 'にほんご', meaning: 'Japanese', type: 'object' },
            { word: 'を', reading: 'を', meaning: '(object marker)', type: 'particle' },
            { word: '勉強します', reading: 'べんきょうします', meaning: 'study', type: 'verb' }
          ]
        },
        {
          japanese: '毎日 公園を 散歩します。',
          reading: 'まいにち こうえんを さんぽします。',
          english: 'I walk in the park every day.',
          breakdown: [
            { word: '毎日', reading: 'まいにち', meaning: 'every day', type: 'adverb' },
            { word: '公園', reading: 'こうえん', meaning: 'park', type: 'object' },
            { word: 'を', reading: 'を', meaning: '(through/in)', type: 'particle' },
            { word: '散歩します', reading: 'さんぽします', meaning: 'walk/stroll', type: 'verb' }
          ]
        }
      ],
      practice: [
        {
          id: 'wo-1',
          type: 'ordering',
          question: {
            ja: '正しい順序に並べてください：「私は」「食べます」「パンを」',
            en: 'Put in correct order: "I" "eat" "bread"'
          },
          correctAnswer: ['私は', 'パンを', '食べます'],
          explanation: {
            ja: 'SOV順序：主語は + 目的語を + 動詞',
            en: 'SOV order: Subject は + Object を + Verb'
          }
        },
        {
          id: 'wo-2',
          type: 'fill-blank',
          question: {
            ja: '空欄を埋めてください：本___読みます。',
            en: 'Fill in the blank: 本___読みます。'
          },
          correctAnswer: 'を',
          explanation: {
            ja: '「本を読みます」= read a book。「を」は動作の対象を示します。',
            en: '本を読みます = read a book. を marks the object.'
          }
        }
      ]
    },

    // ========================================================================
    // LESSON 3: に (ni) - Location, Time, Direction
    // ========================================================================
    {
      id: 'particle-ni',
      title: { ja: '助詞「に」- 場所・時間・方向', en: 'Particle に (ni) - Location, Time, Direction' },
      rationale: {
        ja: '「に」は多機能な助詞で、場所、時間、方向、目的を示します。「で」との違いを理解することが重要です。「に」は存在や到着点を示し、「で」は動作の場所を示します。',
        en: '"に" is a multi-functional particle indicating location, time, direction, and purpose. Understanding the difference between に and で is crucial. に shows existence or destination, while で shows location of action.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '「に」の使い方：\n\n1. 存在の場所（います・あります）\n   学校にいます。(I am at school)\n\n2. 時間\n   3時に会います。(meet at 3 o\'clock)\n\n3. 方向・目的地\n   東京に行きます。(go to Tokyo)\n\n4. 目的\n   買い物に行きます。(go shopping)\n\n5. 間接目的語\n   友達に手紙を書きます。(write a letter to a friend)',
            en: 'How to use に:\n\n1. Location of existence (います・あります)\n   学校にいます。(I am at school)\n\n2. Time\n   3時に会います。(meet at 3 o\'clock)\n\n3. Direction/Destination\n   東京に行きます。(go to Tokyo)\n\n4. Purpose\n   買い物に行きます。(go shopping)\n\n5. Indirect object\n   友達に手紙を書きます。(write a letter to a friend)'
          }
        }
      ],
      examples: [
        {
          japanese: '私は 学校に います。',
          reading: 'わたしは がっこうに います。',
          english: 'I am at school.',
          breakdown: [
            { word: '私', reading: 'わたし', meaning: 'I', type: 'subject' },
            { word: 'は', reading: 'は', meaning: '(topic)', type: 'particle' },
            { word: '学校', reading: 'がっこう', meaning: 'school', type: 'location' },
            { word: 'に', reading: 'に', meaning: '(at/in)', type: 'particle' },
            { word: 'います', reading: 'います', meaning: 'am/exist (animate)', type: 'verb' }
          ]
        },
        {
          japanese: '7時に 起きます。',
          reading: 'しちじに おきます。',
          english: 'I wake up at 7 o\'clock.',
          breakdown: [
            { word: '7時', reading: 'しちじ', meaning: '7 o\'clock', type: 'time' },
            { word: 'に', reading: 'に', meaning: '(at)', type: 'particle' },
            { word: '起きます', reading: 'おきます', meaning: 'wake up', type: 'verb' }
          ]
        },
        {
          japanese: '友達は 東京に 行きます。',
          reading: 'ともだちは とうきょうに いきます。',
          english: 'My friend goes to Tokyo.',
          breakdown: [
            { word: '友達', reading: 'ともだち', meaning: 'friend', type: 'subject' },
            { word: 'は', reading: 'は', meaning: '(topic)', type: 'particle' },
            { word: '東京', reading: 'とうきょう', meaning: 'Tokyo', type: 'destination' },
            { word: 'に', reading: 'に', meaning: '(to)', type: 'particle' },
            { word: '行きます', reading: 'いきます', meaning: 'go', type: 'verb' }
          ]
        }
      ],
      practice: [
        {
          id: 'ni-1',
          type: 'multiple-choice',
          question: {
            ja: '「学校___います」正しい助詞は？',
            en: 'Correct particle for 学校___います?'
          },
          options: ['を', 'に', 'で', 'へ'],
          correctAnswer: 'に',
          explanation: {
            ja: '「に」は存在の場所を示します。「います」は存在動詞です。',
            en: 'に marks location of existence. います is an existence verb.'
          }
        },
        {
          id: 'ni-2',
          type: 'fill-blank',
          question: {
            ja: '空欄を埋めてください：9時___寝ます。',
            en: 'Fill in the blank: 9時___寝ます。'
          },
          correctAnswer: 'に',
          explanation: {
            ja: '「に」は時間を示します。「9時に寝ます」= go to bed at 9 o\'clock',
            en: 'に marks time. 9時に寝ます = go to bed at 9 o\'clock'
          }
        }
      ]
    },

    // ========================================================================
    // LESSON 4: で (de) - Location of Action, Means, Scope
    // ========================================================================
    {
      id: 'particle-de',
      title: { ja: '助詞「で」- 動作の場所・手段', en: 'Particle で (de) - Location of Action, Means' },
      rationale: {
        ja: '「で」は動作が行われる場所や手段を示します。「に」との違いが重要：「に」は存在の場所、「で」は動作の場所です。例：学校にいます（存在）vs 学校で勉強します（動作）。',
        en: '"で" indicates where an action takes place or the means of doing something. The difference from に is crucial: に shows existence location, で shows action location. Example: 学校にいます (existence) vs 学校で勉強します (action).'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '「で」の使い方：\n\n1. 動作の場所\n   図書館で勉強します。(study at the library)\n\n2. 手段・方法\n   バスで行きます。(go by bus)\n   日本語で話します。(speak in Japanese)\n\n3. 材料\n   木で作ります。(make with wood)\n\n4. 範囲\n   日本で一番高い山。(tallest mountain in Japan)\n\n「に」vs「で」：\n• 学校にいます。(I am at school) ← 存在\n• 学校で勉強します。(I study at school) ← 動作',
            en: 'How to use で:\n\n1. Location of action\n   図書館で勉強します。(study at the library)\n\n2. Means/Method\n   バスで行きます。(go by bus)\n   日本語で話します。(speak in Japanese)\n\n3. Material\n   木で作ります。(make with wood)\n\n4. Scope/Range\n   日本で一番高い山。(tallest mountain in Japan)\n\nに vs で:\n• 学校にいます。(I am at school) ← existence\n• 学校で勉強します。(I study at school) ← action'
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
          japanese: '電車で 会社に 行きます。',
          reading: 'でんしゃで かいしゃに いきます。',
          english: 'I go to the office by train.',
          breakdown: [
            { word: '電車', reading: 'でんしゃ', meaning: 'train', type: 'means' },
            { word: 'で', reading: 'で', meaning: '(by)', type: 'particle' },
            { word: '会社', reading: 'かいしゃ', meaning: 'office/company', type: 'destination' },
            { word: 'に', reading: 'に', meaning: '(to)', type: 'particle' },
            { word: '行きます', reading: 'いきます', meaning: 'go', type: 'verb' }
          ]
        },
        {
          japanese: 'レストランで 友達と 食事します。',
          reading: 'レストランで ともだちと しょくじします。',
          english: 'I dine with friends at a restaurant.',
          breakdown: [
            { word: 'レストラン', reading: 'レストラン', meaning: 'restaurant', type: 'location' },
            { word: 'で', reading: 'で', meaning: '(at)', type: 'particle' },
            { word: '友達', reading: 'ともだち', meaning: 'friend', type: 'noun' },
            { word: 'と', reading: 'と', meaning: '(with)', type: 'particle' },
            { word: '食事します', reading: 'しょくじします', meaning: 'dine/eat', type: 'verb' }
          ]
        }
      ],
      practice: [
        {
          id: 'de-1',
          type: 'multiple-choice',
          question: {
            ja: '「図書館___勉強します」正しい助詞は？',
            en: 'Correct particle for 図書館___勉強します?'
          },
          options: ['に', 'を', 'で', 'へ'],
          correctAnswer: 'で',
          explanation: {
            ja: '「で」は動作の場所を示します。勉強するという動作が図書館で行われます。',
            en: 'で marks location of action. The action of studying takes place at the library.'
          }
        },
        {
          id: 'de-2',
          type: 'multiple-choice',
          question: {
            ja: '違いを選んでください：',
            en: 'Choose the difference:'
          },
          options: [
            '学校にいます (存在) / 学校で勉強します (動作)',
            '学校にいます (動作) / 学校で勉強します (存在)',
            '両方同じ意味',
            'どちらも間違い'
          ],
          correctAnswer: '学校にいます (存在) / 学校で勉強します (動作)',
          explanation: {
            ja: '「に」は存在、「で」は動作の場所を示します。',
            en: 'に shows existence, で shows location of action.'
          }
        }
      ]
    },

    // ========================================================================
    // LESSON 5: が (ga) - Subject Marker, But
    // ========================================================================
    {
      id: 'particle-ga',
      title: { ja: '助詞「が」- 主語・逆接', en: 'Particle が (ga) - Subject Marker, But' },
      rationale: {
        ja: '「が」は主語を示す助詞で、「は」との違いが重要です。「が」は新情報や強調、質問の答えに使います。また、「しかし」の意味で逆接も表します。',
        en: '"が" marks the grammatical subject and differs importantly from は. が introduces new information, emphasis, or answers to questions. It also means "but" for contrast.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '「が」の使い方：\n\n1. 主語（新情報）\n   誰が来ますか？ - 田中さんが来ます。\n\n2. 好き・嫌い・上手・下手\n   私は寿司が好きです。\n\n3. 存在文\n   猫がいます。(There is a cat)\n\n4. 逆接（but）\n   高いですが、買います。(It\'s expensive, but I\'ll buy it)\n\n「は」vs「が」：\n• 私は学生です。(I am a student) ← 既知の情報\n• 誰が学生ですか？ - 田中さんが学生です。← 新情報',
            en: 'How to use が:\n\n1. Subject (new information)\n   誰が来ますか？ - 田中さんが来ます。\n\n2. Like/dislike, good at/bad at\n   私は寿司が好きです。\n\n3. Existence sentences\n   猫がいます。(There is a cat)\n\n4. But (contrast)\n   高いですが、買います。(It\'s expensive, but I\'ll buy it)\n\nは vs が:\n• 私は学生です。(I am a student) ← known info\n• 誰が学生ですか？ - 田中さんが学生です。← new info'
          }
        }
      ],
      examples: [
        {
          japanese: '私は 寿司が 好きです。',
          reading: 'わたしは すしが すきです。',
          english: 'I like sushi.',
          breakdown: [
            { word: '私', reading: 'わたし', meaning: 'I', type: 'topic' },
            { word: 'は', reading: 'は', meaning: '(topic)', type: 'particle' },
            { word: '寿司', reading: 'すし', meaning: 'sushi', type: 'subject' },
            { word: 'が', reading: 'が', meaning: '(subject)', type: 'particle' },
            { word: '好き', reading: 'すき', meaning: 'like', type: 'na-adjective' },
            { word: 'です', reading: 'です', meaning: 'is', type: 'copula' }
          ]
        },
        {
          japanese: '誰が 来ますか。- 田中さんが 来ます。',
          reading: 'だれが きますか。- たなかさんが きます。',
          english: 'Who is coming? - Mr. Tanaka is coming.',
          breakdown: [
            { word: '誰', reading: 'だれ', meaning: 'who', type: 'question' },
            { word: 'が', reading: 'が', meaning: '(subject)', type: 'particle' },
            { word: '来ます', reading: 'きます', meaning: 'come', type: 'verb' },
            { word: '田中さん', reading: 'たなかさん', meaning: 'Mr. Tanaka', type: 'subject' },
            { word: 'が', reading: 'が', meaning: '(subject)', type: 'particle' },
            { word: '来ます', reading: 'きます', meaning: 'come', type: 'verb' }
          ]
        },
        {
          japanese: '高いですが、買います。',
          reading: 'たかいですが、かいます。',
          english: 'It\'s expensive, but I\'ll buy it.',
          breakdown: [
            { word: '高い', reading: 'たかい', meaning: 'expensive', type: 'i-adjective' },
            { word: 'ですが', reading: 'ですが', meaning: 'but', type: 'conjunction' },
            { word: '買います', reading: 'かいます', meaning: 'buy', type: 'verb' }
          ]
        }
      ],
      practice: [
        {
          id: 'ga-1',
          type: 'multiple-choice',
          question: {
            ja: '「私は寿司___好きです」正しい助詞は？',
            en: 'Correct particle for 私は寿司___好きです?'
          },
          options: ['は', 'を', 'が', 'に'],
          correctAnswer: 'が',
          explanation: {
            ja: '好き・嫌いの文では「が」を使います。',
            en: 'Use が with like/dislike expressions.'
          }
        }
      ]
    },

    // ========================================================================
    // LESSON 6: と (to) - And, With
    // ========================================================================
    {
      id: 'particle-to',
      title: { ja: '助詞「と」- 〜と', en: 'Particle と (to) - And, With' },
      rationale: {
        ja: '「と」は接続や一緒にすることを示す助詞です。名詞を並べたり、誰かと一緒に何かをする時に使います。完全なリストを表すので、「や」との違いを理解することが重要です。',
        en: '"と" indicates connection or doing something together. It\'s used to list nouns or show accompaniment. It implies a complete list, so understanding the difference from や is important.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '「と」の使い方：\n\n1. 名詞の並列（完全なリスト）\n   りんごとバナナを買います。(buy apples and bananas)\n\n2. 一緒に（with）\n   友達と映画を見ます。(watch a movie with a friend)\n\n3. 引用\n   「はい」と言います。(say "yes")\n\n4. 条件\n   春になると、桜が咲きます。(When spring comes, cherry blossoms bloom)\n\n「と」vs「や」：\n• りんごとバナナ (apples and bananas - complete list)\n• りんごやバナナ (apples, bananas, etc. - incomplete list)',
            en: 'How to use と:\n\n1. Listing nouns (complete list)\n   りんごとバナナを買います。(buy apples and bananas)\n\n2. Together with\n   友達と映画を見ます。(watch a movie with a friend)\n\n3. Quotation\n   「はい」と言います。(say "yes")\n\n4. Condition\n   春になると、桜が咲きます。(When spring comes, cherry blossoms bloom)\n\nと vs や:\n• りんごとバナナ (apples and bananas - complete)\n• りんごやバナナ (apples, bananas, etc. - incomplete)'
          }
        }
      ],
      examples: [
        {
          japanese: '友達と 映画を 見ます。',
          reading: 'ともだちと えいがを みます。',
          english: 'I watch a movie with a friend.',
          breakdown: [
            { word: '友達', reading: 'ともだち', meaning: 'friend', type: 'noun' },
            { word: 'と', reading: 'と', meaning: '(with)', type: 'particle' },
            { word: '映画', reading: 'えいが', meaning: 'movie', type: 'object' },
            { word: 'を', reading: 'を', meaning: '(object marker)', type: 'particle' },
            { word: '見ます', reading: 'みます', meaning: 'watch', type: 'verb' }
          ]
        },
        {
          japanese: 'パンと 牛乳を 買います。',
          reading: 'パンと ぎゅうにゅうを かいます。',
          english: 'I buy bread and milk.',
          breakdown: [
            { word: 'パン', reading: 'パン', meaning: 'bread', type: 'noun' },
            { word: 'と', reading: 'と', meaning: '(and)', type: 'particle' },
            { word: '牛乳', reading: 'ぎゅうにゅう', meaning: 'milk', type: 'noun' },
            { word: 'を', reading: 'を', meaning: '(object marker)', type: 'particle' },
            { word: '買います', reading: 'かいます', meaning: 'buy', type: 'verb' }
          ]
        }
      ],
      practice: [
        {
          id: 'to-1',
          type: 'fill-blank',
          question: {
            ja: '空欄を埋めてください：友達___映画を見ます。',
            en: 'Fill in the blank: 友達___映画を見ます。'
          },
          correctAnswer: 'と',
          explanation: {
            ja: '「と」は「一緒に」を意味します。',
            en: 'と means "together with".'
          }
        }
      ]
    },

    // ========================================================================
    // LESSON 7: も (mo) - Also, Too
    // ========================================================================
    {
      id: 'particle-mo',
      title: { ja: '助詞「も」- 〜も', en: 'Particle も (mo) - Also, Too' },
      rationale: {
        ja: '「も」は「〜も」という意味で、追加や同様を示します。「は」や「が」の代わりに使い、「AもBも」の形で複数の項目を並べることができます。',
        en: '"も" means "also" or "too" and indicates addition or similarity. It replaces は or が, and can be used in "A も B も" patterns to list multiple items.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '「も」の使い方：\n\n1. 追加（also, too）\n   私も学生です。(I am also a student)\n\n2. 複数の項目\n   りんごもバナナも好きです。(I like both apples and bananas)\n\n3. 否定文で「〜も〜ない」\n   何も食べません。(I don\'t eat anything)\n\n4. 数量の強調\n   10個も買いました。(I bought as many as 10)\n\n「は」→「も」：\n• 私は学生です。→ 私も学生です。\n• 田中さんは来ます。→ 田中さんも来ます。',
            en: 'How to use も:\n\n1. Addition (also, too)\n   私も学生です。(I am also a student)\n\n2. Multiple items\n   りんごもバナナも好きです。(I like both apples and bananas)\n\n3. Negative "nothing/nobody"\n   何も食べません。(I don\'t eat anything)\n\n4. Quantity emphasis\n   10個も買いました。(I bought as many as 10)\n\nは → も:\n• 私は学生です。→ 私も学生です。\n• 田中さんは来ます。→ 田中さんも来ます。'
          }
        }
      ],
      examples: [
        {
          japanese: '私も 日本語を 勉強します。',
          reading: 'わたしも にほんごを べんきょうします。',
          english: 'I also study Japanese.',
          breakdown: [
            { word: '私', reading: 'わたし', meaning: 'I', type: 'subject' },
            { word: 'も', reading: 'も', meaning: '(also)', type: 'particle' },
            { word: '日本語', reading: 'にほんご', meaning: 'Japanese', type: 'object' },
            { word: 'を', reading: 'を', meaning: '(object marker)', type: 'particle' },
            { word: '勉強します', reading: 'べんきょうします', meaning: 'study', type: 'verb' }
          ]
        },
        {
          japanese: 'りんごも バナナも 好きです。',
          reading: 'りんごも バナナも すきです。',
          english: 'I like both apples and bananas.',
          breakdown: [
            { word: 'りんご', reading: 'りんご', meaning: 'apple', type: 'noun' },
            { word: 'も', reading: 'も', meaning: '(also)', type: 'particle' },
            { word: 'バナナ', reading: 'バナナ', meaning: 'banana', type: 'noun' },
            { word: 'も', reading: 'も', meaning: '(also)', type: 'particle' },
            { word: '好き', reading: 'すき', meaning: 'like', type: 'na-adjective' },
            { word: 'です', reading: 'です', meaning: 'is', type: 'copula' }
          ]
        }
      ],
      practice: [
        {
          id: 'mo-1',
          type: 'fill-blank',
          question: {
            ja: '空欄を埋めてください：私___学生です。(I am also a student)',
            en: 'Fill in the blank: 私___学生です。(I am also a student)'
          },
          correctAnswer: 'も',
          explanation: {
            ja: '「も」は「〜も」(also, too)を意味します。',
            en: 'も means "also" or "too".'
          }
        }
      ]
    },

    // ========================================================================
    // LESSON 8: の (no) - Possession, Explanation
    // ========================================================================
    {
      id: 'particle-no',
      title: { ja: '助詞「の」- 所有・説明', en: 'Particle の (no) - Possession, Explanation' },
      rationale: {
        ja: '「の」は所有や関係を示す最も基本的な助詞です。英語の「\'s」や「of」に相当し、名詞と名詞をつなぎます。また、文末で説明や質問を柔らかくする役割もあります。',
        en: '"の" is the most basic particle showing possession or relationship. It corresponds to English "\'s" or "of" and connects nouns. It also softens explanations or questions at sentence end.'
      },
      content: [
        {
          type: 'text',
          content: {
            ja: '「の」の使い方：\n\n1. 所有\n   私の本 (my book)\n   田中さんの車 (Mr. Tanaka\'s car)\n\n2. 関係・所属\n   日本の首都 (Japan\'s capital)\n   会社の人 (company person)\n\n3. 名詞化\n   食べるのが好きです。(I like eating)\n\n4. 説明・質問（文末）\n   どうしたの？ (What\'s wrong?)\n   行くの？ (Are you going?)\n\n連続使用：\n• 私の友達の本 (my friend\'s book)',
            en: 'How to use の:\n\n1. Possession\n   私の本 (my book)\n   田中さんの車 (Mr. Tanaka\'s car)\n\n2. Relationship/Affiliation\n   日本の首都 (Japan\'s capital)\n   会社の人 (company person)\n\n3. Nominalization\n   食べるのが好きです。(I like eating)\n\n4. Explanation/Question (sentence end)\n   どうしたの？ (What\'s wrong?)\n   行くの？ (Are you going?)\n\nConsecutive use:\n• 私の友達の本 (my friend\'s book)'
          }
        }
      ],
      examples: [
        {
          japanese: 'これは 私の 本です。',
          reading: 'これは わたしの ほんです。',
          english: 'This is my book.',
          breakdown: [
            { word: 'これ', reading: 'これ', meaning: 'this', type: 'pronoun' },
            { word: 'は', reading: 'は', meaning: '(topic)', type: 'particle' },
            { word: '私', reading: 'わたし', meaning: 'I/my', type: 'noun' },
            { word: 'の', reading: 'の', meaning: '(possessive)', type: 'particle' },
            { word: '本', reading: 'ほん', meaning: 'book', type: 'noun' },
            { word: 'です', reading: 'です', meaning: 'is', type: 'copula' }
          ]
        },
        {
          japanese: '日本の 首都は 東京です。',
          reading: 'にほんの しゅとは とうきょうです。',
          english: 'Japan\'s capital is Tokyo.',
          breakdown: [
            { word: '日本', reading: 'にほん', meaning: 'Japan', type: 'noun' },
            { word: 'の', reading: 'の', meaning: '(of/\'s)', type: 'particle' },
            { word: '首都', reading: 'しゅと', meaning: 'capital', type: 'noun' },
            { word: 'は', reading: 'は', meaning: '(topic)', type: 'particle' },
            { word: '東京', reading: 'とうきょう', meaning: 'Tokyo', type: 'noun' },
            { word: 'です', reading: 'です', meaning: 'is', type: 'copula' }
          ]
        }
      ],
      practice: [
        {
          id: 'no-1',
          type: 'fill-blank',
          question: {
            ja: '空欄を埋めてください：私___本',
            en: 'Fill in the blank: 私___本 (my book)'
          },
          correctAnswer: 'の',
          explanation: {
            ja: '「の」は所有を示します。私の本 = my book',
            en: 'の shows possession. 私の本 = my book'
          }
        }
      ]
    }
  ],

  skillCheckoff: {
    id: 'particles-checkoff',
    title: { ja: '助詞スキルチェック', en: 'Particles Skill Checkoff' },
    requirements: [
      { id: '1', skill: { ja: '「は」を正しく使える', en: 'Can use は correctly' }, completed: false },
      { id: '2', skill: { ja: '「を」を正しく使える', en: 'Can use を correctly' }, completed: false },
      { id: '3', skill: { ja: '「に」を正しく使える', en: 'Can use に correctly' }, completed: false },
      { id: '4', skill: { ja: '「で」を正しく使える', en: 'Can use で correctly' }, completed: false },
      { id: '5', skill: { ja: '「に」と「で」の違いが分かる', en: 'Understand difference between に and で' }, completed: false },
      { id: '6', skill: { ja: '「が」を正しく使える', en: 'Can use が correctly' }, completed: false },
      { id: '7', skill: { ja: '「は」と「が」の違いが分かる', en: 'Understand difference between は and が' }, completed: false },
      { id: '8', skill: { ja: '「と」「も」「の」を使える', en: 'Can use と, も, の' }, completed: false },
      { id: '9', skill: { ja: 'SOV文で助詞を正しく配置できる', en: 'Can place particles correctly in SOV sentences' }, completed: false },
      { id: '10', skill: { ja: '複数の助詞を組み合わせて使える', en: 'Can combine multiple particles' }, completed: false }
    ],
    passingScore: 85,
    quiz: []
  }
}

export const particlesModules: LearningModule[] = [particlesModule]
