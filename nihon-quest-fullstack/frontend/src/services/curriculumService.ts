interface Lesson {
  id: string
  title: string
  description: string
  structure: string
  examples: {
    japanese: string
    romaji: string
    english: string
  }[]
  completed: boolean
  notes: string
}

interface Unit {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

interface Phase {
  id: string
  level: string
  title: string
  duration: string
  goal: string
  kanji: string
  vocabulary: string
  units: Unit[]
}

class CurriculumService {
  private storageKey = 'japanese_curriculum_progress'

  getCurriculum(): Phase[] {
    return [
      {
        id: 'phase-0',
        level: 'Foundation',
        title: 'Foundations',
        duration: '2-4 weeks',
        goal: 'Read basic Japanese and understand sentence order',
        kanji: '50 characters',
        vocabulary: '100 words',
        units: [
          {
            id: 'unit-0-1',
            title: 'Hiragana',
            description: 'Learn the 46 basic hiragana characters',
            lessons: [
              {
                id: 'lesson-0-1-1',
                title: 'あ行 (A-row)',
                description: 'Learn あ、い、う、え、お',
                structure: 'あいうえお',
                examples: [
                  { japanese: 'あい', romaji: 'ai', english: 'love' },
                  { japanese: 'いえ', romaji: 'ie', english: 'house' },
                  { japanese: 'うえ', romaji: 'ue', english: 'above' }
                ],
                completed: false,
                notes: ''
              }
            ]
          },
          {
            id: 'unit-0-2',
            title: 'Katakana',
            description: 'Learn katakana for foreign words',
            lessons: [
              {
                id: 'lesson-0-2-1',
                title: 'ア行 (A-row)',
                description: 'Learn ア、イ、ウ、エ、オ',
                structure: 'アイウエオ',
                examples: [
                  { japanese: 'アメリカ', romaji: 'amerika', english: 'America' },
                  { japanese: 'コーヒー', romaji: 'koohii', english: 'coffee' }
                ],
                completed: false,
                notes: ''
              }
            ]
          }
        ]
      },
      {
        id: 'phase-1',
        level: 'N5',
        title: 'Beginner',
        duration: '3-6 months',
        goal: 'Handle simple daily sentences',
        kanji: '100-150 kanji',
        vocabulary: '800 words',
        units: [
          {
            id: 'unit-1-1',
            title: 'The Copula です',
            description: 'Learn basic "A is B" sentences',
            lessons: [
              {
                id: 'lesson-1-1-1',
                title: 'A は B です (A is B)',
                description: 'Basic sentence structure',
                structure: 'Topic は Noun です',
                examples: [
                  { japanese: '私は学生です。', romaji: 'Watashi wa gakusei desu.', english: 'I am a student.' },
                  { japanese: '妻は日本人です。', romaji: 'Tsuma wa Nihonjin desu.', english: 'My wife is Japanese.' },
                  { japanese: 'これは本です。', romaji: 'Kore wa hon desu.', english: 'This is a book.' }
                ],
                completed: false,
                notes: ''
              },
              {
                id: 'lesson-1-1-2',
                title: 'これ/それ/あれ (this/that)',
                description: 'Demonstratives in Japanese',
                structure: 'これ/それ/あれ は Noun です',
                examples: [
                  { japanese: 'これは本です。', romaji: 'Kore wa hon desu.', english: 'This is a book.' },
                  { japanese: 'それはペンです。', romaji: 'Sore wa pen desu.', english: 'That is a pen.' },
                  { japanese: 'あれは車です。', romaji: 'Are wa kuruma desu.', english: 'That over there is a car.' }
                ],
                completed: false,
                notes: ''
              },
              {
                id: 'lesson-1-1-3',
                title: 'Negative: ではありません',
                description: 'Making negative sentences',
                structure: 'Topic は Noun ではありません',
                examples: [
                  { japanese: '私は学生ではありません。', romaji: 'Watashi wa gakusei dewa arimasen.', english: 'I am not a student.' },
                  { japanese: 'これは本ではありません。', romaji: 'Kore wa hon dewa arimasen.', english: 'This is not a book.' }
                ],
                completed: false,
                notes: ''
              },
              {
                id: 'lesson-1-1-4',
                title: 'Questions with か',
                description: 'Asking yes/no questions',
                structure: 'Sentence + か',
                examples: [
                  { japanese: 'これは本ですか。', romaji: 'Kore wa hon desu ka?', english: 'Is this a book?' },
                  { japanese: '学生ですか。', romaji: 'Gakusei desu ka?', english: 'Are you a student?' }
                ],
                completed: false,
                notes: ''
              }
            ]
          },
          {
            id: 'unit-1-2',
            title: 'Core Particles',
            description: 'Master essential particles',
            lessons: [
              {
                id: 'lesson-1-2-1',
                title: 'Particle は (topic marker)',
                description: 'Introduce what you are talking about',
                structure: 'Topic は ...',
                examples: [
                  { japanese: '私はアメリカ人です。', romaji: 'Watashi wa Amerikajin desu.', english: 'I am American.' },
                  { japanese: '日本語は楽しいです。', romaji: 'Nihongo wa tanoshii desu.', english: 'Japanese is fun.' }
                ],
                completed: false,
                notes: ''
              },
              {
                id: 'lesson-1-2-2',
                title: 'Particle を (object marker)',
                description: 'Mark what receives the action',
                structure: 'Object を Verb',
                examples: [
                  { japanese: '寿司を食べます。', romaji: 'Sushi o tabemasu.', english: 'I eat sushi.' },
                  { japanese: '水を飲みます。', romaji: 'Mizu o nomimasu.', english: 'I drink water.' },
                  { japanese: '日本語を勉強します。', romaji: 'Nihongo o benkyou shimasu.', english: 'I study Japanese.' }
                ],
                completed: false,
                notes: ''
              },
              {
                id: 'lesson-1-2-3',
                title: 'Particle に (direction/time)',
                description: 'Destination and time expressions',
                structure: 'Place に / Time に',
                examples: [
                  { japanese: '学校に行きます。', romaji: 'Gakkou ni ikimasu.', english: 'I go to school.' },
                  { japanese: '7時に起きます。', romaji: 'Shichi-ji ni okimasu.', english: 'I wake up at 7.' }
                ],
                completed: false,
                notes: ''
              },
              {
                id: 'lesson-1-2-4',
                title: 'Particle で (place/method)',
                description: 'Location of action and means',
                structure: 'Place で / Method で',
                examples: [
                  { japanese: 'レストランで食べます。', romaji: 'Resutoran de tabemasu.', english: 'I eat at a restaurant.' },
                  { japanese: '車で行きます。', romaji: 'Kuruma de ikimasu.', english: 'I go by car.' }
                ],
                completed: false,
                notes: ''
              }
            ]
          },
          {
            id: 'unit-1-3',
            title: 'Verbs (ます-form)',
            description: 'Basic verb conjugations',
            lessons: [
              {
                id: 'lesson-1-3-1',
                title: 'Present/Future ます',
                description: 'Basic polite verb form',
                structure: 'Verb-stem + ます',
                examples: [
                  { japanese: 'コーヒーを飲みます。', romaji: 'Koohii o nomimasu.', english: 'I drink coffee.' },
                  { japanese: 'テレビを見ます。', romaji: 'Terebi o mimasu.', english: 'I watch TV.' }
                ],
                completed: false,
                notes: ''
              },
              {
                id: 'lesson-1-3-2',
                title: 'Past ました',
                description: 'Past tense verbs',
                structure: 'Verb-stem + ました',
                examples: [
                  { japanese: '昨日、映画を見ました。', romaji: 'Kinou, eiga o mimashita.', english: 'Yesterday, I watched a movie.' },
                  { japanese: '朝ご飯を食べました。', romaji: 'Asagohan o tabemashita.', english: 'I ate breakfast.' }
                ],
                completed: false,
                notes: ''
              },
              {
                id: 'lesson-1-3-3',
                title: 'Negative ません',
                description: 'Negative present tense',
                structure: 'Verb-stem + ません',
                examples: [
                  { japanese: '肉を食べません。', romaji: 'Niku o tabemasen.', english: "I don't eat meat." },
                  { japanese: 'お酒を飲みません。', romaji: 'Osake o nomimasen.', english: "I don't drink alcohol." }
                ],
                completed: false,
                notes: ''
              }
            ]
          }
        ]
      },
      {
        id: 'phase-2',
        level: 'N4',
        title: 'Upper Beginner',
        duration: '6-12 months',
        goal: 'Explain simple thoughts, daily plans, needs, and reasons',
        kanji: '300 kanji',
        vocabulary: '1,500 words',
        units: [
          {
            id: 'unit-2-1',
            title: 'Te-form',
            description: 'The most important verb form in Japanese',
            lessons: [
              {
                id: 'lesson-2-1-1',
                title: 'Te-form: Requests',
                description: 'Please do...',
                structure: 'Verb-て + ください',
                examples: [
                  { japanese: 'ちょっと待ってください。', romaji: 'Chotto matte kudasai.', english: 'Please wait a moment.' },
                  { japanese: 'ゆっくり話してください。', romaji: 'Yukkuri hanashite kudasai.', english: 'Please speak slowly.' },
                  { japanese: 'もう一度言ってください。', romaji: 'Mou ichido itte kudasai.', english: 'Please say it one more time.' }
                ],
                completed: false,
                notes: ''
              },
              {
                id: 'lesson-2-1-2',
                title: 'Te-form: Progressive',
                description: 'Currently doing...',
                structure: 'Verb-て + いる',
                examples: [
                  { japanese: '今、ご飯を食べています。', romaji: 'Ima, gohan o tabete imasu.', english: "I'm eating now." },
                  { japanese: '日本語を勉強しています。', romaji: 'Nihongo o benkyou shite imasu.', english: 'I am studying Japanese.' }
                ],
                completed: false,
                notes: ''
              },
              {
                id: 'lesson-2-1-3',
                title: 'Te-form: Linking actions',
                description: 'Do A and then B',
                structure: 'Verb-て、Verb',
                examples: [
                  { japanese: '朝起きて、顔を洗います。', romaji: 'Asa okite, kao o araimasu.', english: 'I wake up and wash my face.' },
                  { japanese: 'シャワーを浴びて、寝ます。', romaji: 'Shawaa o abite, nemasu.', english: 'I take a shower and sleep.' }
                ],
                completed: false,
                notes: ''
              }
            ]
          }
        ]
      }
    ]
  }

  getProgress(): Record<string, { completed: boolean; notes: string }> {
    const stored = localStorage.getItem(this.storageKey)
    return stored ? JSON.parse(stored) : {}
  }

  saveProgress(lessonId: string, completed: boolean, notes: string) {
    const progress = this.getProgress()
    progress[lessonId] = { completed, notes }
    localStorage.setItem(this.storageKey, JSON.stringify(progress))
  }

  getLessonProgress(lessonId: string): { completed: boolean; notes: string } {
    const progress = this.getProgress()
    return progress[lessonId] || { completed: false, notes: '' }
  }

  getPhaseProgress(phaseId: string): { completed: number; total: number; percentage: number } {
    const curriculum = this.getCurriculum()
    const phase = curriculum.find(p => p.id === phaseId)
    if (!phase) return { completed: 0, total: 0, percentage: 0 }

    let total = 0
    let completed = 0

    phase.units.forEach(unit => {
      unit.lessons.forEach(lesson => {
        total++
        const progress = this.getLessonProgress(lesson.id)
        if (progress.completed) completed++
      })
    })

    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    }
  }

  getTotalProgress(): { completed: number; total: number; percentage: number; xp: number } {
    const curriculum = this.getCurriculum()
    let total = 0
    let completed = 0

    curriculum.forEach(phase => {
      phase.units.forEach(unit => {
        unit.lessons.forEach(lesson => {
          total++
          const progress = this.getLessonProgress(lesson.id)
          if (progress.completed) completed++
        })
      })
    })

    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      xp: completed * 10 // 10 XP per lesson
    }
  }
}

export const curriculumService = new CurriculumService()
export type { Phase, Unit, Lesson }
