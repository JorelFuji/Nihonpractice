/**
 * Progressive Curriculum Structure
 * 
 * This creates an interconnected learning path where:
 * - Lessons build on each other sequentially
 * - Topics are grouped thematically
 * - Prerequisites ensure proper skill progression
 * - Skills compound across lessons
 */

export interface CurriculumTopic {
  id: string;
  name: string;
  description: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  order: number;
  icon: string;
  color: string;
}

export interface SkillProgression {
  skill: string;
  introducedIn: string; // lesson ID
  practicedIn: string[]; // lesson IDs
  masteredIn: string; // lesson ID
}

export interface LessonConnection {
  lessonId: string;
  prerequisiteLessons: string[];
  nextLessons: string[];
  relatedTopics: string[];
  skillsIntroduced: string[];
  skillsPracticed: string[];
  buildingBlocks: string[]; // What this lesson provides for future lessons
}

// CURRICULUM TOPICS - Thematic grouping
export const curriculumTopics: CurriculumTopic[] = [
  // N5 LEVEL - Beginner
  {
    id: 'greetings-introductions',
    name: 'Greetings & Introductions',
    description: 'Basic social interactions and self-introduction',
    level: 'N5',
    order: 1,
    icon: '👋',
    color: 'blue'
  },
  {
    id: 'basic-grammar',
    name: 'Foundational Grammar',
    description: 'Essential sentence structures and particles',
    level: 'N5',
    order: 2,
    icon: '📝',
    color: 'green'
  },
  {
    id: 'daily-activities',
    name: 'Daily Activities',
    description: 'Talking about everyday life and routines',
    level: 'N5',
    order: 3,
    icon: '☀️',
    color: 'orange'
  },
  {
    id: 'time-dates',
    name: 'Time & Dates',
    description: 'Numbers, time, dates, and scheduling',
    level: 'N5',
    order: 4,
    icon: '🕐',
    color: 'purple'
  },
  {
    id: 'food-dining',
    name: 'Food & Dining',
    description: 'Restaurant conversations and food vocabulary',
    level: 'N5',
    order: 5,
    icon: '🍱',
    color: 'red'
  },
  {
    id: 'family-people',
    name: 'Family & Relationships',
    description: 'Talking about family and social connections',
    level: 'N5',
    order: 6,
    icon: '👨‍👩‍👧‍👦',
    color: 'pink'
  },
  {
    id: 'locations-directions',
    name: 'Places & Directions',
    description: 'Locations, directions, and navigation',
    level: 'N5',
    order: 7,
    icon: '🗺️',
    color: 'teal'
  },
  {
    id: 'shopping',
    name: 'Shopping & Money',
    description: 'Buying things and handling transactions',
    level: 'N5',
    order: 8,
    icon: '🛍️',
    color: 'yellow'
  },
  
  // N4 LEVEL - Elementary
  {
    id: 'past-tense',
    name: 'Past Tense & Events',
    description: 'Talking about past experiences',
    level: 'N4',
    order: 9,
    icon: '📅',
    color: 'blue'
  },
  {
    id: 'te-form',
    name: 'Te-form & Compound Actions',
    description: 'Connecting verbs and complex actions',
    level: 'N4',
    order: 10,
    icon: '🔗',
    color: 'green'
  },
  {
    id: 'comparisons',
    name: 'Comparisons & Preferences',
    description: 'Comparing things and expressing preferences',
    level: 'N4',
    order: 11,
    icon: '⚖️',
    color: 'purple'
  },
  {
    id: 'potential-form',
    name: 'Abilities & Potential',
    description: 'Expressing what you can or cannot do',
    level: 'N4',
    order: 12,
    icon: '💪',
    color: 'orange'
  },
  {
    id: 'giving-receiving',
    name: 'Giving & Receiving',
    description: 'Complex social interactions with giving/receiving',
    level: 'N4',
    order: 13,
    icon: '🎁',
    color: 'red'
  },
  
  // N3 LEVEL - Intermediate
  {
    id: 'casual-speech',
    name: 'Casual Speech Patterns',
    description: 'Natural conversation and informal language',
    level: 'N3',
    order: 14,
    icon: '💬',
    color: 'blue'
  },
  {
    id: 'complex-grammar',
    name: 'Complex Grammar Structures',
    description: 'Advanced sentence patterns and expressions',
    level: 'N3',
    order: 15,
    icon: '🧩',
    color: 'green'
  },
  {
    id: 'keigo-basics',
    name: 'Polite Language (Keigo)',
    description: 'Honorific and humble speech basics',
    level: 'N3',
    order: 16,
    icon: '🙇',
    color: 'purple'
  }
];

// SKILL PROGRESSION - How skills build across lessons
export const skillProgressions: SkillProgression[] = [
  {
    skill: 'Particle は (wa)',
    introducedIn: 'n5-u1-l1',
    practicedIn: ['n5-u1-l2', 'n5-u1-l3', 'n5-u2-l1', 'n5-u2-l2'],
    masteredIn: 'n5-u3-l1'
  },
  {
    skill: 'Particle を (wo/o)',
    introducedIn: 'n5-u2-l1',
    practicedIn: ['n5-u2-l2', 'n5-u2-l3', 'n5-u3-l1'],
    masteredIn: 'n5-u4-l1'
  },
  {
    skill: 'Particle で (de) - location',
    introducedIn: 'n5-u2-l2',
    practicedIn: ['n5-u2-l3', 'n5-u3-l2', 'n5-u4-l1'],
    masteredIn: 'n5-u5-l1'
  },
  {
    skill: 'です (desu) - polite copula',
    introducedIn: 'n5-u1-l1',
    practicedIn: ['n5-u1-l2', 'n5-u1-l3', 'n5-u2-l1', 'n5-u2-l2', 'n5-u3-l1'],
    masteredIn: 'n5-u4-l1'
  },
  {
    skill: 'ます (masu) - polite verb ending',
    introducedIn: 'n5-u2-l1',
    practicedIn: ['n5-u2-l2', 'n5-u2-l3', 'n5-u3-l1', 'n5-u3-l2', 'n5-u4-l1'],
    masteredIn: 'n5-u5-l1'
  },
  {
    skill: 'Numbers 1-10',
    introducedIn: 'n5-u1-l2',
    practicedIn: ['n5-u1-l3', 'n5-u4-l1'],
    masteredIn: 'n5-u4-l2'
  },
  {
    skill: 'Numbers 11-100',
    introducedIn: 'n5-u4-l2',
    practicedIn: ['n5-u4-l3', 'n5-u5-l1'],
    masteredIn: 'n5-u8-l1'
  },
  {
    skill: 'Te-form basics',
    introducedIn: 'n4-u2-l1',
    practicedIn: ['n4-u2-l2', 'n4-u2-l3', 'n4-u3-l1', 'n4-u3-l2'],
    masteredIn: 'n4-u4-l1'
  },
  {
    skill: 'Past tense (ました)',
    introducedIn: 'n4-u1-l1',
    practicedIn: ['n4-u1-l2', 'n4-u1-l3', 'n4-u2-l1'],
    masteredIn: 'n4-u3-l1'
  }
];

// LESSON CONNECTIONS - Prerequisites and skill building
export const lessonConnections: LessonConnection[] = [
  // UNIT 1: Greetings & Introductions
  {
    lessonId: 'n5-u1-l1',
    prerequisiteLessons: [],
    nextLessons: ['n5-u1-l2'],
    relatedTopics: ['greetings-introductions', 'basic-grammar'],
    skillsIntroduced: ['です (desu)', 'Particle は (wa)', 'こんにちは', 'おはよう', '私'],
    skillsPracticed: [],
    buildingBlocks: [
      'Basic sentence structure (X は Y です)',
      'Polite speech basics',
      'Self-introduction'
    ]
  },
  {
    lessonId: 'n5-u1-l2',
    prerequisiteLessons: ['n5-u1-l1'],
    nextLessons: ['n5-u1-l3', 'n5-u2-l1'],
    relatedTopics: ['greetings-introductions', 'time-dates'],
    skillsIntroduced: ['Numbers 1-10', 'お名前は？', 'よろしくお願いします'],
    skillsPracticed: ['です (desu)', 'Particle は (wa)'],
    buildingBlocks: [
      'Asking names',
      'Basic numbers',
      'Polite responses'
    ]
  },
  {
    lessonId: 'n5-u1-l3',
    prerequisiteLessons: ['n5-u1-l1', 'n5-u1-l2'],
    nextLessons: ['n5-u2-l1'],
    relatedTopics: ['greetings-introductions', 'family-people'],
    skillsIntroduced: ['Countries/Nationalities', 'から (from)', 'じゃありません (negative)'],
    skillsPracticed: ['です (desu)', 'Particle は (wa)', 'Numbers 1-10'],
    buildingBlocks: [
      'Nationality/Origin',
      'Negative sentences',
      'Follow-up questions'
    ]
  },
  
  // UNIT 2: Basic Actions & Grammar
  {
    lessonId: 'n5-u2-l1',
    prerequisiteLessons: ['n5-u1-l1', 'n5-u1-l2'],
    nextLessons: ['n5-u2-l2'],
    relatedTopics: ['basic-grammar', 'daily-activities'],
    skillsIntroduced: ['Particle を (wo)', 'ます (masu) verbs', '食べます', '飲みます', '見ます'],
    skillsPracticed: ['Particle は (wa)', 'です (desu)'],
    buildingBlocks: [
      'Subject-Object-Verb structure',
      'Action verbs',
      'Object marker を'
    ]
  },
  {
    lessonId: 'n5-u2-l2',
    prerequisiteLessons: ['n5-u2-l1'],
    nextLessons: ['n5-u2-l3', 'n5-u3-l1'],
    relatedTopics: ['basic-grammar', 'locations-directions'],
    skillsIntroduced: ['Particle で (de) - location', '行きます', 'います', 'あります'],
    skillsPracticed: ['Particle を (wo)', 'ます (masu) verbs', 'Particle は (wa)'],
    buildingBlocks: [
      'Location of action',
      'Existence verbs',
      'Movement verbs'
    ]
  },
  {
    lessonId: 'n5-u2-l3',
    prerequisiteLessons: ['n5-u2-l1', 'n5-u2-l2'],
    nextLessons: ['n5-u3-l1'],
    relatedTopics: ['basic-grammar', 'daily-activities'],
    skillsIntroduced: ['Particle に (ni) - destination', 'へ (e) - direction', '来ます'],
    skillsPracticed: ['Particle で (de)', 'Particle を (wo)', 'ます verbs'],
    buildingBlocks: [
      'Directional movement',
      'Destination marking',
      'Complex sentences'
    ]
  },
  
  // UNIT 3: Daily Life
  {
    lessonId: 'n5-u3-l1',
    prerequisiteLessons: ['n5-u2-l1', 'n5-u2-l2', 'n5-u2-l3'],
    nextLessons: ['n5-u3-l2'],
    relatedTopics: ['daily-activities', 'time-dates'],
    skillsIntroduced: ['Time expressions', '毎日', '今', 'い-adjectives'],
    skillsPracticed: ['All particles (は, を, で, に)', 'ます verbs', 'です'],
    buildingBlocks: [
      'Time + action sentences',
      'Frequency expressions',
      'Basic adjectives'
    ]
  },
  {
    lessonId: 'n5-u3-l2',
    prerequisiteLessons: ['n5-u3-l1'],
    nextLessons: ['n5-u4-l1'],
    relatedTopics: ['daily-activities', 'locations-directions'],
    skillsIntroduced: ['な-adjectives', 'Particle の (no) possession', 'Location words (前, 後, etc.)'],
    skillsPracticed: ['Time expressions', 'い-adjectives', 'All basic particles'],
    buildingBlocks: [
      'Descriptive sentences',
      'Possession',
      'Spatial relationships'
    ]
  },
  
  // UNIT 4: Time, Numbers, Dates
  {
    lessonId: 'n5-u4-l1',
    prerequisiteLessons: ['n5-u2-l2', 'n5-u3-l1'],
    nextLessons: ['n5-u4-l2'],
    relatedTopics: ['time-dates'],
    skillsIntroduced: ['Telling time', '〜時', '〜分', 'Question words (何時)'],
    skillsPracticed: ['Numbers 1-10', 'Time expressions', 'ます verbs'],
    buildingBlocks: [
      'Clock time',
      'Scheduling',
      'When questions'
    ]
  },
  {
    lessonId: 'n5-u4-l2',
    prerequisiteLessons: ['n5-u1-l2', 'n5-u4-l1'],
    nextLessons: ['n5-u4-l3'],
    relatedTopics: ['time-dates', 'shopping'],
    skillsIntroduced: ['Numbers 11-100', '〜円', 'Counters (-つ)'],
    skillsPracticed: ['Numbers 1-10', 'Telling time'],
    buildingBlocks: [
      'Larger numbers',
      'Money/prices',
      'Counting objects'
    ]
  },
  {
    lessonId: 'n5-u4-l3',
    prerequisiteLessons: ['n5-u4-l1', 'n5-u4-l2'],
    nextLessons: ['n5-u5-l1'],
    relatedTopics: ['time-dates'],
    skillsIntroduced: ['Days of week', 'Months', 'Dates (〜日)'],
    skillsPracticed: ['Numbers', 'Time expressions'],
    buildingBlocks: [
      'Calendar vocabulary',
      'Making appointments',
      'Date expressions'
    ]
  },
  
  // UNIT 5: Food & Dining
  {
    lessonId: 'n5-u5-l1',
    prerequisiteLessons: ['n5-u2-l1', 'n5-u4-l2'],
    nextLessons: ['n5-u5-l2'],
    relatedTopics: ['food-dining', 'shopping'],
    skillsIntroduced: ['Food vocabulary', 'ください', 'おいしい', 'Restaurant phrases'],
    skillsPracticed: ['Numbers', 'を particle', 'Counters'],
    buildingBlocks: [
      'Ordering food',
      'Making requests',
      'Food descriptions'
    ]
  },
  {
    lessonId: 'n5-u5-l2',
    prerequisiteLessons: ['n5-u5-l1'],
    nextLessons: ['n5-u6-l1'],
    relatedTopics: ['food-dining', 'daily-activities'],
    skillsIntroduced: ['Food preferences', '好き/嫌い', 'よく', 'あまり'],
    skillsPracticed: ['Food vocabulary', 'ください', 'Adjectives'],
    buildingBlocks: [
      'Expressing likes/dislikes',
      'Frequency adverbs',
      'Food opinions'
    ]
  },
  
  // UNIT 6: Family & People
  {
    lessonId: 'n5-u6-l1',
    prerequisiteLessons: ['n5-u1-l3', 'n5-u3-l2'],
    nextLessons: ['n5-u6-l2'],
    relatedTopics: ['family-people'],
    skillsIntroduced: ['Family terms', 'Counting people', '何人', 'いる (for people)'],
    skillsPracticed: ['Particle の', 'Numbers', 'います'],
    buildingBlocks: [
      'Family structure',
      'People counters',
      'Talking about family'
    ]
  },
  
  // UNIT 7: Places & Directions
  {
    lessonId: 'n5-u7-l1',
    prerequisiteLessons: ['n5-u2-l2', 'n5-u2-l3', 'n5-u3-l2'],
    nextLessons: ['n5-u7-l2'],
    relatedTopics: ['locations-directions'],
    skillsIntroduced: ['Place words', 'どこ', 'ここ/そこ/あそこ', 'Direction verbs'],
    skillsPracticed: ['Particle に/へ', 'で particle', 'Location words'],
    buildingBlocks: [
      'Asking locations',
      'Giving directions',
      'Spatial deixis'
    ]
  },
  
  // UNIT 8: Shopping
  {
    lessonId: 'n5-u8-l1',
    prerequisiteLessons: ['n5-u4-l2', 'n5-u5-l1'],
    nextLessons: ['n5-u8-l2'],
    relatedTopics: ['shopping'],
    skillsIntroduced: ['Shopping vocabulary', 'これ/それ/あれ', '〜も', 'いくら'],
    skillsPracticed: ['Numbers 11-100', 'ください', 'Counters'],
    buildingBlocks: [
      'Shopping transactions',
      'Object demonstratives',
      'Price negotiation'
    ]
  },
  
  // N4 UNIT 1: Past Tense
  {
    lessonId: 'n4-u1-l1',
    prerequisiteLessons: ['n5-u2-l1', 'n5-u2-l2', 'n5-u3-l1'],
    nextLessons: ['n4-u1-l2'],
    relatedTopics: ['past-tense'],
    skillsIntroduced: ['Past tense ました', 'でした', 'Past negative ませんでした'],
    skillsPracticed: ['All ます verbs', 'です', 'All particles'],
    buildingBlocks: [
      'Past tense formation',
      'Talking about past events',
      'Past negative'
    ]
  },
  {
    lessonId: 'n4-u1-l2',
    prerequisiteLessons: ['n4-u1-l1'],
    nextLessons: ['n4-u1-l3'],
    relatedTopics: ['past-tense', 'daily-activities'],
    skillsIntroduced: ['Past time expressions', '先週', '昨日', 'もう/まだ'],
    skillsPracticed: ['Past tense', 'Time expressions'],
    buildingBlocks: [
      'Past time references',
      'Completion/non-completion',
      'Past experiences'
    ]
  },
  
  // N4 UNIT 2: Te-form
  {
    lessonId: 'n4-u2-l1',
    prerequisiteLessons: ['n4-u1-l1', 'n4-u1-l2'],
    nextLessons: ['n4-u2-l2'],
    relatedTopics: ['te-form'],
    skillsIntroduced: ['Te-form formation', 'て is for connecting', '〜ている (progressive)'],
    skillsPracticed: ['All verbs', 'Past tense'],
    buildingBlocks: [
      'Verb conjugation (te-form)',
      'Sequential actions',
      'Progressive aspect'
    ]
  },
  {
    lessonId: 'n4-u2-l2',
    prerequisiteLessons: ['n4-u2-l1'],
    nextLessons: ['n4-u2-l3'],
    relatedTopics: ['te-form'],
    skillsIntroduced: ['〜てください', '〜てもいい', '〜てはいけない'],
    skillsPracticed: ['Te-form', '〜ている'],
    buildingBlocks: [
      'Requests',
      'Permission',
      'Prohibition'
    ]
  },
  {
    lessonId: 'n4-u2-l3',
    prerequisiteLessons: ['n4-u2-l1', 'n4-u2-l2'],
    nextLessons: ['n4-u3-l1'],
    relatedTopics: ['te-form'],
    skillsIntroduced: ['〜てから', '〜ておく', '〜てしまう'],
    skillsPracticed: ['All te-form patterns'],
    buildingBlocks: [
      'Sequential actions',
      'Preparation',
      'Completion'
    ]
  },
  
  // N4 UNIT 3: Comparisons
  {
    lessonId: 'n4-u3-l1',
    prerequisiteLessons: ['n5-u3-l1', 'n4-u1-l1'],
    nextLessons: ['n4-u3-l2'],
    relatedTopics: ['comparisons'],
    skillsIntroduced: ['より', '〜ほど', '一番', 'Comparative sentences'],
    skillsPracticed: ['Adjectives', 'Past tense'],
    buildingBlocks: [
      'Comparisons',
      'Superlatives',
      'Preferences'
    ]
  },
  
  // N4 UNIT 4: Potential Form
  {
    lessonId: 'n4-u4-l1',
    prerequisiteLessons: ['n4-u2-l1', 'n4-u2-l3'],
    nextLessons: ['n4-u4-l2'],
    relatedTopics: ['potential-form'],
    skillsIntroduced: ['Potential form', 'できる', 'Particle が for potential'],
    skillsPracticed: ['Te-form', 'All verb types'],
    buildingBlocks: [
      'Expressing ability',
      'Can/cannot',
      'Potential conjugation'
    ]
  },
  
  // N4 UNIT 5: Giving & Receiving
  {
    lessonId: 'n4-u5-l1',
    prerequisiteLessons: ['n4-u2-l1', 'n4-u4-l1'],
    nextLessons: ['n4-u5-l2'],
    relatedTopics: ['giving-receiving'],
    skillsIntroduced: ['あげる/くれる/もらう', '〜てあげる/くれる/もらう'],
    skillsPracticed: ['Te-form', 'Particle に'],
    buildingBlocks: [
      'Giving/receiving verbs',
      'Benefactive actions',
      'Social hierarchy'
    ]
  }
];

// Helper: Get prerequisites for a lesson
export const getPrerequisites = (lessonId: string): LessonConnection | undefined => {
  return lessonConnections.find(conn => conn.lessonId === lessonId);
};

// Helper: Get all lessons in a topic
export const getLessonsByTopic = (topicId: string): LessonConnection[] => {
  return lessonConnections.filter(conn => conn.relatedTopics.includes(topicId));
};

// Helper: Check if lesson is unlocked (all prerequisites met)
export const isLessonUnlocked = (lessonId: string, completedLessons: string[]): boolean => {
  const connection = lessonConnections.find(conn => conn.lessonId === lessonId);
  if (!connection) return false;
  
  if (connection.prerequisiteLessons.length === 0) return true;
  
  return connection.prerequisiteLessons.every(prereq => completedLessons.includes(prereq));
};

// Helper: Get next recommended lessons
export const getNextLessons = (completedLessons: string[]): string[] => {
  const available: string[] = [];
  
  for (const connection of lessonConnections) {
    if (completedLessons.includes(connection.lessonId)) {
      continue; // Already completed
    }
    
    if (isLessonUnlocked(connection.lessonId, completedLessons)) {
      available.push(connection.lessonId);
    }
  }
  
  return available;
};

// Helper: Get learning path (suggested order)
export const getSuggestedLearningPath = (): string[] => {
  return lessonConnections.map(conn => conn.lessonId);
};

// Helper: Get skills that will be learned in lesson
export const getLessonSkills = (lessonId: string): { introduced: string[], practiced: string[] } => {
  const connection = lessonConnections.find(conn => conn.lessonId === lessonId);
  return {
    introduced: connection?.skillsIntroduced || [],
    practiced: connection?.skillsPracticed || []
  };
};
