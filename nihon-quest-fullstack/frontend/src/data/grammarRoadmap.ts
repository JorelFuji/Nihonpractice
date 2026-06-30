/**
 * Complete Japanese Grammar Roadmap: N5 → N1
 * Conversation-focused progression for speaking fluency
 */

export interface GrammarPoint {
  id: string
  grammar: string
  example: {
    ja: string
    romaji: string
    en: string
  }
  meaning: string
  conversationPriority: 'essential' | 'high' | 'medium' | 'low'
  notes?: string
}

export interface ConversationDrill {
  id: string
  pattern: string
  examples: Array<{
    ja: string
    romaji: string
    en: string
  }>
  practice: string
}

export interface GrammarLevel {
  id: string
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
  jfLevel: string
  title: {
    ja: string
    en: string
  }
  goal: {
    ja: string
    en: string
  }
  timeframe: string
  grammarPoints: GrammarPoint[]
  conversationDrills: ConversationDrill[]
  keyFocus: string[]
  milestones: string[]
}

export const grammarRoadmap: GrammarLevel[] = [
  // LEVEL 1: N5 - Survival Core
  {
    id: 'n5-survival',
    level: 'N5',
    jfLevel: 'A1',
    title: {
      ja: 'サバイバル基礎',
      en: 'Survival Core'
    },
    goal: {
      ja: '基本的な文を作り、質問し、物事を説明する',
      en: 'Form basic sentences, ask questions, describe things'
    },
    timeframe: '3 months',
    keyFocus: [
      'SOV word order',
      'Particles',
      'Verb conjugation basics',
      'Polite form (です/ます)',
      'て-form introduction'
    ],
    milestones: [
      'Can introduce yourself',
      'Can order food',
      'Can ask basic questions',
      'Can describe family and daily life',
      'Can use て-form for requests'
    ],
    grammarPoints: [
      {
        id: 'n5-wa-desu',
        grammar: 'A は B です',
        example: {
          ja: '私はジャレルです。',
          romaji: 'Watashi wa Jareru desu.',
          en: 'I am Jarrel.'
        },
        meaning: 'A is B (topic marker)',
        conversationPriority: 'essential'
      },
      {
        id: 'n5-particles-wa',
        grammar: 'は (topic)',
        example: {
          ja: '私は学生です。',
          romaji: 'Watashi wa gakusei desu.',
          en: 'I am a student.'
        },
        meaning: 'Topic marker - "as for..."',
        conversationPriority: 'essential'
      },
      {
        id: 'n5-particles-ga',
        grammar: 'が (subject)',
        example: {
          ja: '犬がいます。',
          romaji: 'Inu ga imasu.',
          en: 'There is a dog.'
        },
        meaning: 'Subject marker',
        conversationPriority: 'essential'
      },
      {
        id: 'n5-particles-wo',
        grammar: 'を (object)',
        example: {
          ja: 'コーヒーを飲みます。',
          romaji: 'Koohii o nomimasu.',
          en: 'I drink coffee.'
        },
        meaning: 'Object marker',
        conversationPriority: 'essential'
      },
      {
        id: 'n5-particles-ni',
        grammar: 'に (target/time)',
        example: {
          ja: '7時に行きます。',
          romaji: 'Shichi-ji ni ikimasu.',
          en: 'I go at 7 o\'clock.'
        },
        meaning: 'Time/location/direction marker',
        conversationPriority: 'essential'
      },
      {
        id: 'n5-particles-de',
        grammar: 'で (location/means)',
        example: {
          ja: '家で食べます。',
          romaji: 'Ie de tabemasu.',
          en: 'I eat at home.'
        },
        meaning: 'Location of action/means',
        conversationPriority: 'essential'
      },
      {
        id: 'n5-masu-form',
        grammar: 'ます form',
        example: {
          ja: '行きます / 食べます',
          romaji: 'ikimasu / tabemasu',
          en: 'go / eat'
        },
        meaning: 'Polite present/future verb form',
        conversationPriority: 'essential'
      },
      {
        id: 'n5-past',
        grammar: 'ました (past)',
        example: {
          ja: '行きました。',
          romaji: 'Ikimashita.',
          en: 'I went.'
        },
        meaning: 'Polite past tense',
        conversationPriority: 'essential'
      },
      {
        id: 'n5-negative',
        grammar: 'ません (negative)',
        example: {
          ja: '行きません。',
          romaji: 'Ikimasen.',
          en: 'I do not go.'
        },
        meaning: 'Polite negative',
        conversationPriority: 'essential'
      },
      {
        id: 'n5-question-ka',
        grammar: 'か (question)',
        example: {
          ja: '日本語を話しますか。',
          romaji: 'Nihongo o hanashimasu ka.',
          en: 'Do you speak Japanese?'
        },
        meaning: 'Question particle',
        conversationPriority: 'essential'
      },
      {
        id: 'n5-kosoado',
        grammar: 'これ・それ・あれ・どれ',
        example: {
          ja: 'これは何ですか。',
          romaji: 'Kore wa nan desu ka.',
          en: 'What is this?'
        },
        meaning: 'This/that/that over there/which',
        conversationPriority: 'essential'
      },
      {
        id: 'n5-tai',
        grammar: '〜たい',
        example: {
          ja: '日本に行きたいです。',
          romaji: 'Nihon ni ikitai desu.',
          en: 'I want to go to Japan.'
        },
        meaning: 'Want to do',
        conversationPriority: 'essential'
      },
      {
        id: 'n5-te-form',
        grammar: 'て-form',
        example: {
          ja: '食べてください。',
          romaji: 'Tabete kudasai.',
          en: 'Please eat.'
        },
        meaning: 'Connective form for requests, progressive, etc.',
        conversationPriority: 'essential',
        notes: 'Most important conjugation in Japanese'
      },
      {
        id: 'n5-suki',
        grammar: '好き / 嫌い',
        example: {
          ja: 'ラーメンが好きです。',
          romaji: 'Raamen ga suki desu.',
          en: 'I like ramen.'
        },
        meaning: 'Like / dislike',
        conversationPriority: 'high'
      },
      {
        id: 'n5-ne-yo',
        grammar: 'ね / よ',
        example: {
          ja: 'いいですね。',
          romaji: 'Ii desu ne.',
          en: 'That\'s good, isn\'t it?'
        },
        meaning: 'Sentence-final particles for agreement/informing',
        conversationPriority: 'essential',
        notes: 'Critical for natural conversation'
      }
    ],
    conversationDrills: [
      {
        id: 'n5-drill-1',
        pattern: '私は ___ です。',
        examples: [
          {
            ja: '私はジャレルです。',
            romaji: 'Watashi wa Jareru desu.',
            en: 'I am Jarrel.'
          },
          {
            ja: '私は学生です。',
            romaji: 'Watashi wa gakusei desu.',
            en: 'I am a student.'
          },
          {
            ja: '私はアメリカ人です。',
            romaji: 'Watashi wa Amerika-jin desu.',
            en: 'I am American.'
          }
        ],
        practice: 'Introduce yourself with your name, occupation, and nationality'
      },
      {
        id: 'n5-drill-2',
        pattern: '___ が好きです。',
        examples: [
          {
            ja: 'コーヒーが好きです。',
            romaji: 'Koohii ga suki desu.',
            en: 'I like coffee.'
          },
          {
            ja: '日本語が好きです。',
            romaji: 'Nihongo ga suki desu.',
            en: 'I like Japanese.'
          },
          {
            ja: '寿司が好きです。',
            romaji: 'Sushi ga suki desu.',
            en: 'I like sushi.'
          }
        ],
        practice: 'Say 3 things you like'
      },
      {
        id: 'n5-drill-3',
        pattern: '___ に行きたいです。',
        examples: [
          {
            ja: '日本に行きたいです。',
            romaji: 'Nihon ni ikitai desu.',
            en: 'I want to go to Japan.'
          },
          {
            ja: '学校に行きたいです。',
            romaji: 'Gakkou ni ikitai desu.',
            en: 'I want to go to school.'
          },
          {
            ja: '東京に行きたいです。',
            romaji: 'Toukyou ni ikitai desu.',
            en: 'I want to go to Tokyo.'
          }
        ],
        practice: 'Say where you want to go'
      },
      {
        id: 'n5-drill-4',
        pattern: '___ はどこですか。',
        examples: [
          {
            ja: 'トイレはどこですか。',
            romaji: 'Toire wa doko desu ka.',
            en: 'Where is the bathroom?'
          },
          {
            ja: '駅はどこですか。',
            romaji: 'Eki wa doko desu ka.',
            en: 'Where is the station?'
          },
          {
            ja: 'レストランはどこですか。',
            romaji: 'Resutoran wa doko desu ka.',
            en: 'Where is the restaurant?'
          }
        ],
        practice: 'Ask where 3 places are'
      }
    ]
  },

  // LEVEL 2: N4 - Everyday Beginner
  {
    id: 'n4-everyday',
    level: 'N4',
    jfLevel: 'A2',
    title: {
      ja: '日常会話の基礎',
      en: 'Everyday Beginner'
    },
    goal: {
      ja: '日常生活、家族、予定、過去の出来事について話す',
      en: 'Talk about daily life, family, plans, past events'
    },
    timeframe: '5 months (months 4-8)',
    keyFocus: [
      'て-form mastery',
      'Casual/plain form',
      'Conditionals (4 types)',
      'Giving/receiving verbs',
      'Ability expressions'
    ],
    milestones: [
      'Can use て-form naturally',
      'Can express ability and permission',
      'Can make comparisons',
      'Can talk about experiences',
      'Can use conditionals'
    ],
    grammarPoints: [
      {
        id: 'n4-te-iru',
        grammar: '〜ている',
        example: {
          ja: '勉強しています。',
          romaji: 'Benkyou shite imasu.',
          en: 'I am studying.'
        },
        meaning: 'Progressive/continuous action',
        conversationPriority: 'essential'
      },
      {
        id: 'n4-te-mo-ii',
        grammar: '〜てもいい',
        example: {
          ja: '入ってもいいですか。',
          romaji: 'Haitte mo ii desu ka.',
          en: 'May I come in?'
        },
        meaning: 'Permission - "may I..."',
        conversationPriority: 'essential'
      },
      {
        id: 'n4-te-wa-ikenai',
        grammar: '〜てはいけない',
        example: {
          ja: 'ここで吸ってはいけません。',
          romaji: 'Koko de sutte wa ikemasen.',
          en: 'You must not smoke here.'
        },
        meaning: 'Prohibition - "must not..."',
        conversationPriority: 'high'
      },
      {
        id: 'n4-mashou',
        grammar: '〜ましょう',
        example: {
          ja: '行きましょう。',
          romaji: 'Ikimashou.',
          en: 'Let\'s go.'
        },
        meaning: 'Volitional - "let\'s..."',
        conversationPriority: 'essential'
      },
      {
        id: 'n4-ta-koto-ga-aru',
        grammar: '〜たことがある',
        example: {
          ja: '日本に行ったことがあります。',
          romaji: 'Nihon ni itta koto ga arimasu.',
          en: 'I have been to Japan.'
        },
        meaning: 'Experience - "have ever..."',
        conversationPriority: 'high'
      },
      {
        id: 'n4-to-omou',
        grammar: '〜と思います',
        example: {
          ja: '明日雨だと思います。',
          romaji: 'Ashita ame da to omoimasu.',
          en: 'I think it will rain tomorrow.'
        },
        meaning: 'Opinion - "I think..."',
        conversationPriority: 'essential'
      },
      {
        id: 'n4-to-iu',
        grammar: '〜と言いました',
        example: {
          ja: '彼は行くと言いました。',
          romaji: 'Kare wa iku to iimashita.',
          en: 'He said he will go.'
        },
        meaning: 'Quotation - "said that..."',
        conversationPriority: 'high'
      },
      {
        id: 'n4-node',
        grammar: '〜ので',
        example: {
          ja: '疲れたので寝ます。',
          romaji: 'Tsukareta node nemasu.',
          en: 'I\'m tired, so I\'ll sleep.'
        },
        meaning: 'Reason - "because..." (softer)',
        conversationPriority: 'essential'
      },
      {
        id: 'n4-yori',
        grammar: '〜より / 〜のほうが',
        example: {
          ja: 'これのほうが安いです。',
          romaji: 'Kore no hou ga yasui desu.',
          en: 'This one is cheaper.'
        },
        meaning: 'Comparison',
        conversationPriority: 'high'
      },
      {
        id: 'n4-potential',
        grammar: 'Potential form',
        example: {
          ja: '日本語を話せます。',
          romaji: 'Nihongo o hanasemasu.',
          en: 'I can speak Japanese.'
        },
        meaning: 'Ability - "can do"',
        conversationPriority: 'essential'
      },
      {
        id: 'n4-tara',
        grammar: '〜たら',
        example: {
          ja: '雨だったら行きません。',
          romaji: 'Ame dattara ikimasen.',
          en: 'If it rains, I won\'t go.'
        },
        meaning: 'Conditional - "if/when"',
        conversationPriority: 'essential'
      },
      {
        id: 'n4-ageru-kureru',
        grammar: 'あげる / くれる / もらう',
        example: {
          ja: '妻が本をくれました。',
          romaji: 'Tsuma ga hon o kuremashita.',
          en: 'My wife gave me a book.'
        },
        meaning: 'Giving/receiving verbs',
        conversationPriority: 'essential',
        notes: 'Critical for Japanese relationship tracking'
      },
      {
        id: 'n4-hou-ga-ii',
        grammar: '〜たほうがいい',
        example: {
          ja: '病院に行ったほうがいいです。',
          romaji: 'Byouin ni itta hou ga ii desu.',
          en: 'You should go to the hospital.'
        },
        meaning: 'Advice - "should..."',
        conversationPriority: 'high'
      }
    ],
    conversationDrills: [
      {
        id: 'n4-drill-1',
        pattern: '日本語を話せます。',
        examples: [
          {
            ja: '日本語を話せます。',
            romaji: 'Nihongo o hanasemasu.',
            en: 'I can speak Japanese.'
          },
          {
            ja: '漢字を読めます。',
            romaji: 'Kanji o yomemasu.',
            en: 'I can read kanji.'
          },
          {
            ja: '料理ができます。',
            romaji: 'Ryouri ga dekimasu.',
            en: 'I can cook.'
          }
        ],
        practice: 'Say 3 things you can do'
      },
      {
        id: 'n4-drill-2',
        pattern: '明日、雨だったら行きません。',
        examples: [
          {
            ja: '明日、雨だったら行きません。',
            romaji: 'Ashita, ame dattara ikimasen.',
            en: 'If it rains tomorrow, I won\'t go.'
          },
          {
            ja: '時間があったら、電話します。',
            romaji: 'Jikan ga attara, denwa shimasu.',
            en: 'If I have time, I\'ll call.'
          },
          {
            ja: '暇だったら、手伝ってください。',
            romaji: 'Hima dattara, tetsudatte kudasai.',
            en: 'If you\'re free, please help.'
          }
        ],
        practice: 'Make 3 conditional sentences'
      },
      {
        id: 'n4-drill-3',
        pattern: '手伝ってもいいですか。',
        examples: [
          {
            ja: '手伝ってもいいですか。',
            romaji: 'Tetsudatte mo ii desu ka.',
            en: 'May I help?'
          },
          {
            ja: '写真を撮ってもいいですか。',
            romaji: 'Shashin o totte mo ii desu ka.',
            en: 'May I take a photo?'
          },
          {
            ja: 'ここに座ってもいいですか。',
            romaji: 'Koko ni suwatte mo ii desu ka.',
            en: 'May I sit here?'
          }
        ],
        practice: 'Ask permission for 3 things'
      }
    ]
  },

  // LEVEL 3: N3 - Real Conversation
  {
    id: 'n3-conversation',
    level: 'N3',
    jfLevel: 'A2-B1',
    title: {
      ja: '実践会話',
      en: 'Real Conversation'
    },
    goal: {
      ja: '意見を説明し、物語を語り、問題を説明し、カジュアルな日本語を理解する',
      en: 'Explain opinions, tell stories, describe problems, understand casual Japanese'
    },
    timeframe: '7 months (months 9-15)',
    keyFocus: [
      'Plain/casual form mastery',
      'んです explanatory tone',
      'Inference patterns (そう/よう/みたい)',
      'Passive/causative voice',
      'Basic keigo'
    ],
    milestones: [
      'Can speak naturally in casual form',
      'Can explain reasons and situations',
      'Can express plans and intentions',
      'Can understand and use passive voice',
      'Can use basic honorific language'
    ],
    grammarPoints: [
      {
        id: 'n3-plain-form',
        grammar: 'Plain/casual form',
        example: {
          ja: '行く？食べた？',
          romaji: 'Iku? Tabeta?',
          en: 'Going? Ate?'
        },
        meaning: 'Casual speech register',
        conversationPriority: 'essential',
        notes: 'Critical for family conversation'
      },
      {
        id: 'n3-n-desu',
        grammar: 'んです / のです',
        example: {
          ja: 'どうしたんですか。',
          romaji: 'Doushita n desu ka.',
          en: 'What happened?'
        },
        meaning: 'Explanatory tone - seeking/giving explanation',
        conversationPriority: 'essential',
        notes: 'Makes Japanese sound natural'
      },
      {
        id: 'n3-tsumori',
        grammar: '〜つもり',
        example: {
          ja: '日本に住むつもりです。',
          romaji: 'Nihon ni sumu tsumori desu.',
          en: 'I plan to live in Japan.'
        },
        meaning: 'Intention - "plan to..."',
        conversationPriority: 'high'
      },
      {
        id: 'n3-you-to-omou',
        grammar: '〜ようと思う',
        example: {
          ja: '勉強しようと思います。',
          romaji: 'Benkyou shiyou to omoimasu.',
          en: 'I\'m thinking of studying.'
        },
        meaning: 'Thinking of doing',
        conversationPriority: 'high'
      },
      {
        id: 'n3-you-ni-suru',
        grammar: '〜ようにする',
        example: {
          ja: '毎日話すようにします。',
          romaji: 'Mainichi hanasu you ni shimasu.',
            en: 'I\'ll try to speak daily.'
        },
        meaning: 'Make effort to do',
        conversationPriority: 'high'
      },
      {
        id: 'n3-you-ni-naru',
        grammar: '〜ようになる',
        example: {
          ja: '日本語がわかるようになりました。',
          romaji: 'Nihongo ga wakaru you ni narimashita.',
          en: 'I became able to understand Japanese.'
        },
        meaning: 'Come to be able to',
        conversationPriority: 'essential'
      },
      {
        id: 'n3-tame-ni',
        grammar: '〜ために',
        example: {
          ja: '家族のために働きます。',
          romaji: 'Kazoku no tame ni hatarakimasu.',
          en: 'I work for my family.'
        },
        meaning: 'Purpose/benefit - "for..."',
        conversationPriority: 'high'
      },
      {
        id: 'n3-noni',
        grammar: '〜のに',
        example: {
          ja: '勉強したのに忘れました。',
          romaji: 'Benkyou shita noni wasuremashita.',
          en: 'Even though I studied, I forgot.'
        },
        meaning: 'Contrast - "even though..."',
        conversationPriority: 'high'
      },
      {
        id: 'n3-sou-hearsay',
        grammar: '〜そうです (hearsay)',
        example: {
          ja: '雨が降るそうです。',
          romaji: 'Ame ga furu sou desu.',
          en: 'I heard it will rain.'
        },
        meaning: 'Hearsay - "I heard..."',
        conversationPriority: 'high'
      },
      {
        id: 'n3-sou-appearance',
        grammar: '〜そうです (appearance)',
        example: {
          ja: 'おいしそうです。',
          romaji: 'Oishisou desu.',
          en: 'It looks delicious.'
        },
        meaning: 'Appearance - "looks..."',
        conversationPriority: 'high'
      },
      {
        id: 'n3-mitai',
        grammar: '〜みたいです',
        example: {
          ja: '彼は忙しいみたいです。',
          romaji: 'Kare wa isogashii mitai desu.',
          en: 'He seems busy.'
        },
        meaning: 'Seems like (casual)',
        conversationPriority: 'essential'
      },
      {
        id: 'n3-kamoshirenai',
        grammar: '〜かもしれない',
        example: {
          ja: '明日行くかもしれません。',
          romaji: 'Ashita iku kamoshiremasen.',
          en: 'I might go tomorrow.'
        },
        meaning: 'Might/maybe',
        conversationPriority: 'essential'
      },
      {
        id: 'n3-hazu',
        grammar: '〜はず',
        example: {
          ja: '彼は来るはずです。',
          romaji: 'Kare wa kuru hazu desu.',
          en: 'He should come.'
        },
        meaning: 'Expected to/should',
        conversationPriority: 'high'
      },
      {
        id: 'n3-passive',
        grammar: 'Passive voice',
        example: {
          ja: '褒められました。',
          romaji: 'Homeraremashita.',
          en: 'I was praised.'
        },
        meaning: 'Passive construction',
        conversationPriority: 'high'
      },
      {
        id: 'n3-causative',
        grammar: 'Causative',
        example: {
          ja: '子どもに食べさせます。',
          romaji: 'Kodomo ni tabesasemasu.',
          en: 'I make/let the child eat.'
        },
        meaning: 'Make/let someone do',
        conversationPriority: 'medium'
      }
    ],
    conversationDrills: [
      {
        id: 'n3-drill-1',
        pattern: '日本語が少しわかるようになりました。',
        examples: [
          {
            ja: '日本語が少しわかるようになりました。',
            romaji: 'Nihongo ga sukoshi wakaru you ni narimashita.',
            en: 'I\'ve become able to understand a little Japanese.'
          },
          {
            ja: '早く起きられるようになりました。',
            romaji: 'Hayaku okirareru you ni narimashita.',
            en: 'I\'ve become able to wake up early.'
          },
          {
            ja: '漢字が読めるようになりました。',
            romaji: 'Kanji ga yomeru you ni narimashita.',
            en: 'I\'ve become able to read kanji.'
          }
        ],
        practice: 'Describe 3 abilities you\'ve gained'
      },
      {
        id: 'n3-drill-2',
        pattern: '来年、日本に住むつもりです。',
        examples: [
          {
            ja: '来年、日本に住むつもりです。',
            romaji: 'Rainen, Nihon ni sumu tsumori desu.',
            en: 'I plan to live in Japan next year.'
          },
          {
            ja: '毎日勉強するつもりです。',
            romaji: 'Mainichi benkyou suru tsumori desu.',
            en: 'I plan to study every day.'
          },
          {
            ja: 'JLPTを受けるつもりです。',
            romaji: 'JLPT o ukeru tsumori desu.',
            en: 'I plan to take the JLPT.'
          }
        ],
        practice: 'State 3 future plans'
      },
      {
        id: 'n3-drill-3',
        pattern: '妻は忙しいみたいです。',
        examples: [
          {
            ja: '妻は忙しいみたいです。',
            romaji: 'Tsuma wa isogashii mitai desu.',
            en: 'My wife seems busy.'
          },
          {
            ja: '雨が降るみたいです。',
            romaji: 'Ame ga furu mitai desu.',
            en: 'It seems like it will rain.'
          },
          {
            ja: '彼は疲れているみたいです。',
            romaji: 'Kare wa tsukarete iru mitai desu.',
            en: 'He seems tired.'
          }
        ],
        practice: 'Make 3 observations using みたい'
      }
    ]
  },

  // LEVEL 4: N2 - Strong Intermediate
  {
    id: 'n2-intermediate',
    level: 'N2',
    jfLevel: 'B1-B2',
    title: {
      ja: '中級会話',
      en: 'Strong Intermediate'
    },
    goal: {
      ja: '仕事、ニュース、意見、感情、社会問題について議論する',
      en: 'Discuss work, news, opinions, emotions, social issues'
    },
    timeframe: '15 months (months 16-30)',
    keyFocus: [
      'Adult conversation nuance',
      'Work Japanese',
      'Formal expressions',
      'Complex reasoning',
      'Indirect communication'
    ],
    milestones: [
      'Can discuss abstract topics',
      'Can express complex opinions',
      'Can understand news and articles',
      'Can handle workplace Japanese',
      'Can disagree politely'
    ],
    grammarPoints: [
      {
        id: 'n2-wake',
        grammar: 'わけ',
        example: {
          ja: 'そういうわけではありません。',
          romaji: 'Sou iu wake dewa arimasen.',
          en: 'That\'s not exactly what I mean.'
        },
        meaning: 'Reason/conclusion nuance',
        conversationPriority: 'high'
      },
      {
        id: 'n2-wake-ni-wa-ikanai',
        grammar: 'わけにはいかない',
        example: {
          ja: '休むわけにはいきません。',
          romaji: 'Yasumu wake ni wa ikimasen.',
          en: 'I can\'t just take off.'
        },
        meaning: 'Cannot afford to/socially cannot',
        conversationPriority: 'high'
      },
      {
        id: 'n2-mono',
        grammar: 'もの / もん',
        example: {
          ja: 'だって忙しいんだもん。',
          romaji: 'Datte isogashii n da mon.',
          en: 'Because I\'m busy.'
        },
        meaning: 'Explanatory emphasis (casual)',
        conversationPriority: 'high'
      },
      {
        id: 'n2-koto-ni-natte-iru',
        grammar: 'ことになっている',
        example: {
          ja: '明日会議することになっています。',
          romaji: 'Ashita kaigi suru koto ni natte imasu.',
          en: 'It\'s arranged that we meet tomorrow.'
        },
        meaning: 'It is arranged/decided that',
        conversationPriority: 'high'
      },
      {
        id: 'n2-ni-chigai-nai',
        grammar: 'に違いない',
        example: {
          ja: '彼は疲れているに違いない。',
          romaji: 'Kare wa tsukarete iru ni chigai nai.',
          en: 'He must be tired.'
        },
        meaning: 'Must be/no doubt',
        conversationPriority: 'medium'
      },
      {
        id: 'n2-ni-kanshite',
        grammar: 'に関して / について',
        example: {
          ja: '日本語に関して質問があります。',
          romaji: 'Nihongo ni kanshite shitsumon ga arimasu.',
          en: 'I have a question about Japanese.'
        },
        meaning: 'Regarding/concerning',
        conversationPriority: 'high'
      },
      {
        id: 'n2-ni-yoru-to',
        grammar: 'によると',
        example: {
          ja: 'ニュースによると…',
          romaji: 'Nyuusu ni yoru to...',
          en: 'According to the news...'
        },
        meaning: 'According to',
        conversationPriority: 'high'
      },
      {
        id: 'n2-ni-mo-kakawarazu',
        grammar: 'にもかかわらず',
        example: {
          ja: '雨にもかかわらず行きました。',
          romaji: 'Ame ni mo kakawarazu ikimashita.',
          en: 'I went despite the rain.'
        },
        meaning: 'Despite/in spite of',
        conversationPriority: 'medium'
      },
      {
        id: 'n2-ue-de',
        grammar: '〜上で',
        example: {
          ja: '確認した上で連絡します。',
          romaji: 'Kakunin shita ue de renraku shimasu.',
          en: 'I\'ll contact you after checking.'
        },
        meaning: 'After doing/upon',
        conversationPriority: 'high'
      },
      {
        id: 'n2-shidai',
        grammar: '〜次第',
        example: {
          ja: '終わり次第、連絡します。',
          romaji: 'Owari shidai, renraku shimasu.',
          en: 'I\'ll contact you as soon as I finish.'
        },
        meaning: 'As soon as/depending on',
        conversationPriority: 'high'
      },
      {
        id: 'n2-ni-taishite',
        grammar: 'に対して',
        example: {
          ja: 'その意見に対して反対です。',
          romaji: 'Sono iken ni taishite hantai desu.',
          en: 'I disagree with that opinion.'
        },
        meaning: 'Toward/in contrast to',
        conversationPriority: 'high'
      },
      {
        id: 'n2-zaru-wo-enai',
        grammar: 'ざるを得ない',
        example: {
          ja: '行かざるを得ません。',
          romaji: 'Ikazaru wo emasen.',
          en: 'I have no choice but to go.'
        },
        meaning: 'Cannot help but/must',
        conversationPriority: 'medium'
      }
    ],
    conversationDrills: [
      {
        id: 'n2-drill-1',
        pattern: 'その意見に対して、少し違う考えがあります。',
        examples: [
          {
            ja: 'その意見に対して、少し違う考えがあります。',
            romaji: 'Sono iken ni taishite, sukoshi chigau kangae ga arimasu.',
            en: 'I have a slightly different view about that opinion.'
          },
          {
            ja: 'その提案に対して、賛成です。',
            romaji: 'Sono teian ni taishite, sansei desu.',
            en: 'I agree with that proposal.'
          }
        ],
        practice: 'Express your opinion on a topic politely'
      },
      {
        id: 'n2-drill-2',
        pattern: '確認した上で、また連絡します。',
        examples: [
          {
            ja: '確認した上で、また連絡します。',
            romaji: 'Kakunin shita ue de, mata renraku shimasu.',
            en: 'After checking, I\'ll contact you again.'
          },
          {
            ja: '相談した上で、決めます。',
            romaji: 'Soudan shita ue de, kimemasu.',
            en: 'After consulting, I\'ll decide.'
          }
        ],
        practice: 'Describe a two-step process'
      }
    ]
  },

  // LEVEL 5: N1 - Advanced/Fluent
  {
    id: 'n1-advanced',
    level: 'N1',
    jfLevel: 'B2-C2',
    title: {
      ja: '上級・流暢',
      en: 'Advanced/Fluent'
    },
    goal: {
      ja: '正式なスピーチ、ニュース、法的文書、エッセイ、高度な職場日本語を理解する',
      en: 'Understand formal speech, news, legal documents, essays, advanced workplace Japanese'
    },
    timeframe: '30+ months (lifelong refinement)',
    keyFocus: [
      'Formal/literary Japanese',
      'Business keigo mastery',
      'Nuanced expressions',
      'Cultural idioms',
      'Professional communication'
    ],
    milestones: [
      'Can read newspapers fluently',
      'Can handle business negotiations',
      'Can write formal documents',
      'Can understand literary texts',
      'Can detect subtle nuance and irony'
    ],
    grammarPoints: [
      {
        id: 'n1-ni-itaru-made',
        grammar: '〜に至るまで',
        example: {
          ja: '細部に至るまで確認しました。',
          romaji: 'Saibu ni itaru made kakunin shimashita.',
          en: 'I checked down to the details.'
        },
        meaning: 'Down to/extending to',
        conversationPriority: 'low'
      },
      {
        id: 'n1-wo-megutte',
        grammar: '〜をめぐって',
        example: {
          ja: 'その問題をめぐって議論があります。',
          romaji: 'Sono mondai wo megutte giron ga arimasu.',
          en: 'There is debate surrounding that issue.'
        },
        meaning: 'Surrounding/concerning',
        conversationPriority: 'low'
      },
      {
        id: 'n1-ni-sokushite',
        grammar: '〜に即して',
        example: {
          ja: '状況に即して判断します。',
          romaji: 'Joukyou ni sokushite handan shimasu.',
          en: 'I\'ll judge according to the situation.'
        },
        meaning: 'In accordance with',
        conversationPriority: 'low'
      },
      {
        id: 'n1-wo-fumaete',
        grammar: '〜を踏まえて',
        example: {
          ja: '結果を踏まえて考えます。',
          romaji: 'Kekka wo fumaete kangaemasu.',
          en: 'I\'ll consider it based on the results.'
        },
        meaning: 'Based on/taking into account',
        conversationPriority: 'medium'
      },
      {
        id: 'n1-ni-hoka-naranai',
        grammar: '〜にほかならない',
        example: {
          ja: '努力の結果にほかなりません。',
          romaji: 'Doryoku no kekka ni hoka narimasen.',
          en: 'It is nothing other than the result of effort.'
        },
        meaning: 'Nothing but/none other than',
        conversationPriority: 'low'
      },
      {
        id: 'n1-zu-ni-wa-okanai',
        grammar: '〜ずにはおかない',
        example: {
          ja: 'この映画は感動させずにはおかない。',
          romaji: 'Kono eiga wa kandou sasezuni wa okanai.',
          en: 'This movie cannot fail to move people.'
        },
        meaning: 'Cannot help but/inevitably',
        conversationPriority: 'low'
      },
      {
        id: 'n1-made-mo-nai',
        grammar: '〜までもない',
        example: {
          ja: '言うまでもありません。',
          romaji: 'Iu made mo arimasen.',
          en: 'It goes without saying.'
        },
        meaning: 'Needless to say',
        conversationPriority: 'medium'
      },
      {
        id: 'n1-wo-yoginaku-sareru',
        grammar: '〜を余儀なくされる',
        example: {
          ja: '変更を余儀なくされました。',
          romaji: 'Henkou wo yoginaku saremashita.',
          en: 'We were forced to change.'
        },
        meaning: 'Be forced to/compelled to',
        conversationPriority: 'low'
      },
      {
        id: 'n1-beku',
        grammar: '〜べく',
        example: {
          ja: '成功すべく努力します。',
          romaji: 'Seikou subeku doryoku shimasu.',
          en: 'I work hard in order to succeed.'
        },
        meaning: 'In order to (literary)',
        conversationPriority: 'low'
      },
      {
        id: 'n1-ga-yue-ni',
        grammar: '〜がゆえに',
        example: {
          ja: '愛するがゆえに心配します。',
          romaji: 'Aisuru ga yue ni shinpai shimasu.',
          en: 'I worry precisely because I love them.'
        },
        meaning: 'Precisely because (formal)',
        conversationPriority: 'low'
      }
    ],
    conversationDrills: [
      {
        id: 'n1-drill-1',
        pattern: '結果を踏まえて、次の行動を決めます。',
        examples: [
          {
            ja: '結果を踏まえて、次の行動を決めます。',
            romaji: 'Kekka wo fumaete, tsugi no koudou wo kimemasu.',
            en: 'Based on the results, I\'ll decide the next action.'
          },
          {
            ja: '過去の経験を踏まえて、計画を立てます。',
            romaji: 'Kako no keiken wo fumaete, keikaku wo tatemasu.',
            en: 'Based on past experience, I\'ll make a plan.'
          }
        ],
        practice: 'Make formal statements using N1 grammar'
      }
    ]
  }
]

// Conversation priority checklist - what to master first for speaking
export const conversationPriorityList = [
  'Particles: は, が, を, に, で, へ, と, も, の, から, まで',
  'Verb forms: ます, dictionary, ない, た, て, potential, passive, causative',
  'Sentence endings: よ, ね, よね, かな, かも, でしょう, だろう',
  'Questions: 何, 誰, どこ, いつ, どう, なぜ, どのくらい',
  'Requests: ください, てもいい, てください, ないでください',
  'Opinions: と思う, と思います, かなと思う',
  'Reasons: から, ので, ために, おかげで, せいで',
  'Plans: つもり, 予定, ようと思う, ことにする',
  'Conditionals: たら, と, ば, なら',
  'Softening Japanese: んです, ちょっと, かもしれない, みたい, そう',
  'Casual speech: 行く？食べた？何してる？',
  'Keigo: です/ます → 尊敬語 → 謙譲語 → 丁寧な断り方',
  'Advanced connectors: 一方で, にもかかわらず, したがって, つまり',
  'Fluent nuance: わけ, はず, もの, こと, ところ, よう, だけ, ばかり'
]
