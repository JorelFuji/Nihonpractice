/**
 * Geography Learning Game for Kids (Ages 4-8)
 * 
 * Interactive geography learning with:
 * - Japan, North America, Texas, Fujinomiya City
 * - Multiple languages: Japanese, Hiragana, Katakana, Romaji, English
 * - Animated pictures and Japanese theme
 * - Kid-friendly interface
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { rewardForActivity } from '@/utils/statsManager';
import toast from 'react-hot-toast';

type Language = 'japanese' | 'hiragana' | 'katakana' | 'romaji' | 'english';

interface Location {
  id: string;
  name: {
    japanese: string;
    hiragana: string;
    katakana: string;
    romaji: string;
    english: string;
  };
  emoji: string;
  color: string;
  facts: {
    japanese: string;
    hiragana: string;
    katakana: string;
    romaji: string;
    english: string;
  }[];
  image: string;
  landmarks: string[];
}

const locations: Location[] = [
  {
    id: 'japan',
    name: {
      japanese: '日本',
      hiragana: 'にほん',
      katakana: 'ニホン',
      romaji: 'Nihon',
      english: 'Japan'
    },
    emoji: '🇯🇵',
    color: 'from-red-400 to-pink-500',
    facts: [
      {
        japanese: '日本には山がたくさんあります',
        hiragana: 'にほんにはやまがたくさんあります',
        katakana: 'ニホンニハヤマガタクサンアリマス',
        romaji: 'Nihon niwa yama ga takusan arimasu',
        english: 'Japan has many mountains'
      },
      {
        japanese: '富士山は日本で一番高い山です',
        hiragana: 'ふじさんはにほんでいちばんたかいやまです',
        katakana: 'フジサンハニホンデイチバンタカイヤマデス',
        romaji: 'Fujisan wa Nihon de ichiban takai yama desu',
        english: 'Mt. Fuji is the tallest mountain in Japan'
      },
      {
        japanese: '日本は島国です',
        hiragana: 'にほんはしまぐにです',
        katakana: 'ニホンハシマグニデス',
        romaji: 'Nihon wa shimaguni desu',
        english: 'Japan is an island country'
      }
    ],
    image: '🗾',
    landmarks: ['🗻 Mt. Fuji', '🏯 Castle', '🌸 Cherry Blossoms', '🍱 Sushi']
  },
  {
    id: 'fujinomiya',
    name: {
      japanese: '富士宮市',
      hiragana: 'ふじのみやし',
      katakana: 'フジノミヤシ',
      romaji: 'Fujinomiya-shi',
      english: 'Fujinomiya City'
    },
    emoji: '🗻',
    color: 'from-blue-400 to-indigo-500',
    facts: [
      {
        japanese: '富士宮市は富士山のふもとにあります',
        hiragana: 'ふじのみやしはふじさんのふもとにあります',
        katakana: 'フジノミヤシハフジサンノフモトニアリマス',
        romaji: 'Fujinomiya-shi wa Fujisan no fumoto ni arimasu',
        english: 'Fujinomiya City is at the foot of Mt. Fuji'
      },
      {
        japanese: '富士宮やきそばが有名です',
        hiragana: 'ふじのみややきそばがゆうめいです',
        katakana: 'フジノミヤヤキソバガユウメイデス',
        romaji: 'Fujinomiya yakisoba ga yuumei desu',
        english: 'Fujinomiya yakisoba is famous'
      },
      {
        japanese: '静岡県にあります',
        hiragana: 'しずおかけんにあります',
        katakana: 'シズオカケンニアリマス',
        romaji: 'Shizuoka-ken ni arimasu',
        english: 'It is in Shizuoka Prefecture'
      }
    ],
    image: '🏔️',
    landmarks: ['🗻 Mt. Fuji View', '🍜 Yakisoba', '⛩️ Shrine', '🌊 Lake']
  },
  {
    id: 'north-america',
    name: {
      japanese: '北アメリカ',
      hiragana: 'きたあめりか',
      katakana: 'キタアメリカ',
      romaji: 'Kita Amerika',
      english: 'North America'
    },
    emoji: '🌎',
    color: 'from-green-400 to-emerald-500',
    facts: [
      {
        japanese: '北アメリカは大きな大陸です',
        hiragana: 'きたあめりかはおおきなたいりくです',
        katakana: 'キタアメリカハオオキナタイリクデス',
        romaji: 'Kita Amerika wa ookina tairiku desu',
        english: 'North America is a big continent'
      },
      {
        japanese: 'アメリカ、カナダ、メキシコがあります',
        hiragana: 'あめりか、かなだ、めきしこがあります',
        katakana: 'アメリカ、カナダ、メキシコガアリマス',
        romaji: 'Amerika, Kanada, Mekishiko ga arimasu',
        english: 'It has USA, Canada, and Mexico'
      },
      {
        japanese: '太平洋と大西洋の間にあります',
        hiragana: 'たいへいようとたいせいようのあいだにあります',
        katakana: 'タイヘイヨウトタイセイヨウノアイダニアリマス',
        romaji: 'Taiheiyou to Taiseiyou no aida ni arimasu',
        english: 'It is between the Pacific and Atlantic Oceans'
      }
    ],
    image: '🌎',
    landmarks: ['🗽 Statue of Liberty', '🏔️ Mountains', '🌲 Forests', '🦅 Eagle']
  },
  {
    id: 'texas',
    name: {
      japanese: 'テキサス州',
      hiragana: 'てきさすしゅう',
      katakana: 'テキサスシュウ',
      romaji: 'Tekisasu-shuu',
      english: 'Texas'
    },
    emoji: '⭐',
    color: 'from-orange-400 to-red-500',
    facts: [
      {
        japanese: 'テキサスはとても大きい州です',
        hiragana: 'てきさすはとてもおおきいしゅうです',
        katakana: 'テキサスハトテモオオキイシュウデス',
        romaji: 'Tekisasu wa totemo ookii shuu desu',
        english: 'Texas is a very big state'
      },
      {
        japanese: 'カウボーイが有名です',
        hiragana: 'かうぼーいがゆうめいです',
        katakana: 'カウボーイガユウメイデス',
        romaji: 'Kaubōi ga yuumei desu',
        english: 'Cowboys are famous'
      },
      {
        japanese: '星の形のマークがあります',
        hiragana: 'ほしのかたちのまーくがあります',
        katakana: 'ホシノカタチノマークガアリマス',
        romaji: 'Hoshi no katachi no māku ga arimasu',
        english: 'It has a star-shaped mark'
      }
    ],
    image: '🤠',
    landmarks: ['🤠 Cowboys', '⭐ Lone Star', '🌵 Cactus', '🏇 Horses']
  }
];

interface QuizQuestion {
  question: {
    japanese: string;
    hiragana: string;
    katakana: string;
    romaji: string;
    english: string;
  };
  options: string[];
  correctAnswer: string;
  locationId: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: {
      japanese: '日本で一番高い山は？',
      hiragana: 'にほんでいちばんたかいやまは？',
      katakana: 'ニホンデイチバンタカイヤマハ？',
      romaji: 'Nihon de ichiban takai yama wa?',
      english: 'What is the tallest mountain in Japan?'
    },
    options: ['🗻 Mt. Fuji', '⛰️ Mt. Everest', '🏔️ Alps', '🌋 Volcano'],
    correctAnswer: '🗻 Mt. Fuji',
    locationId: 'japan'
  },
  {
    question: {
      japanese: '富士宮市は何県にありますか？',
      hiragana: 'ふじのみやしはなにけんにありますか？',
      katakana: 'フジノミヤシハナニケンニアリマスカ？',
      romaji: 'Fujinomiya-shi wa nani-ken ni arimasu ka?',
      english: 'What prefecture is Fujinomiya City in?'
    },
    options: ['🗻 Shizuoka', '🗼 Tokyo', '🏯 Kyoto', '🌸 Osaka'],
    correctAnswer: '🗻 Shizuoka',
    locationId: 'fujinomiya'
  },
  {
    question: {
      japanese: 'テキサス州のシンボルは？',
      hiragana: 'てきさすしゅうのしんぼるは？',
      katakana: 'テキサスシュウノシンボルハ？',
      romaji: 'Tekisasu-shuu no shinboru wa?',
      english: 'What is the symbol of Texas?'
    },
    options: ['⭐ Star', '🌙 Moon', '☀️ Sun', '💎 Diamond'],
    correctAnswer: '⭐ Star',
    locationId: 'texas'
  },
  {
    question: {
      japanese: '日本は何ですか？',
      hiragana: 'にほんはなんですか？',
      katakana: 'ニホンハナンデスカ？',
      romaji: 'Nihon wa nan desu ka?',
      english: 'What is Japan?'
    },
    options: ['🏝️ Island Country', '🏔️ Mountain', '🌊 Ocean', '🏜️ Desert'],
    correctAnswer: '🏝️ Island Country',
    locationId: 'japan'
  }
];

export default function GeographyGamePage() {
  const [gameMode, setGameMode] = useState<'menu' | 'learn' | 'quiz' | 'complete'>('menu');
  const [language, setLanguage] = useState<Language>('english');
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentLocation = locations[currentLocationIndex];
  const currentQuestion = quizQuestions[quizIndex];

  const playSound = () => {
    // Simple sound effect
    const audio = new Audio();
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    playSound();
  };

  const handleNextFact = () => {
    if (currentFactIndex < currentLocation.facts.length - 1) {
      setCurrentFactIndex(currentFactIndex + 1);
    } else if (currentLocationIndex < locations.length - 1) {
      setCurrentLocationIndex(currentLocationIndex + 1);
      setCurrentFactIndex(0);
    } else {
      setGameMode('quiz');
      setQuizIndex(0);
    }
    playSound();
  };

  const handleQuizAnswer = (answer: string) => {
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 10);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      playSound();
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(quizIndex + 1);
      } else {
        setGameMode('complete');
        rewardForActivity.game(score >= 30);
        toast.success(`🎉 Great job! Score: ${score}/40`);
      }
    }, 2000);
  };

  const resetGame = () => {
    setGameMode('menu');
    setCurrentLocationIndex(0);
    setCurrentFactIndex(0);
    setQuizIndex(0);
    setScore(0);
    setShowFeedback(false);
  };

  // Menu Screen
  if (gameMode === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-200 to-purple-300 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl sm:text-7xl font-bold mb-4">
              <span className="inline-block animate-bounce">🌍</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Geography Adventure!{' '}
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>🗺️</span>
            </h1>
            <p className="text-2xl text-purple-700 font-bold">
              Learn about Japan, Texas, and more! 🎌
            </p>
          </motion.div>

          {/* Language Selection */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-2xl mb-6"
          >
            <h2 className="text-2xl font-bold text-center mb-4 text-purple-600">
              🌐 Choose Your Language!
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { id: 'english' as Language, label: 'English', emoji: '🇺🇸' },
                { id: 'japanese' as Language, label: '日本語', emoji: '🇯🇵' },
                { id: 'hiragana' as Language, label: 'ひらがな', emoji: 'あ' },
                { id: 'katakana' as Language, label: 'カタカナ', emoji: 'カ' },
                { id: 'romaji' as Language, label: 'Rōmaji', emoji: 'Aa' }
              ].map((lang) => (
                <motion.button
                  key={lang.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLanguageChange(lang.id)}
                  className={`p-4 rounded-2xl font-bold transition-all ${
                    language === lang.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-3xl mb-1">{lang.emoji}</div>
                  <div className="text-sm">{lang.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Game Mode Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.button
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameMode('learn')}
              className="bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all"
            >
              <div className="text-7xl mb-4">📚</div>
              <div className="text-3xl font-bold mb-2">Learn!</div>
              <div className="text-lg opacity-90">Explore places around the world</div>
            </motion.button>

            <motion.button
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameMode('quiz')}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all"
            >
              <div className="text-7xl mb-4">🎯</div>
              <div className="text-3xl font-bold mb-2">Quiz!</div>
              <div className="text-lg opacity-90">Test your geography knowledge</div>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Learning Mode
  if (gameMode === 'learn') {
    const currentFact = currentLocation.facts[currentFactIndex];

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-300 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="mb-6">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <div className="flex justify-between text-sm font-bold text-purple-600 mb-2 px-4">
                <span>Location {currentLocationIndex + 1}/{locations.length}</span>
                <span>Fact {currentFactIndex + 1}/{currentLocation.facts.length}</span>
              </div>
              <div className="bg-gray-200 rounded-full h-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${((currentLocationIndex * 3 + currentFactIndex + 1) / (locations.length * 3)) * 100}%` 
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Location Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentLocationIndex}-${currentFactIndex}`}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              {/* Location Header */}
              <div className={`bg-gradient-to-r ${currentLocation.color} text-white rounded-2xl p-6 mb-6`}>
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-8xl mb-4"
                  >
                    {currentLocation.emoji}
                  </motion.div>
                  <h2 className="text-4xl font-bold mb-2">
                    {currentLocation.name[language]}
                  </h2>
                  <div className="text-6xl mb-4">{currentLocation.image}</div>
                </div>
              </div>

              {/* Landmarks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {currentLocation.landmarks.map((landmark, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-purple-100 rounded-xl p-3 text-center font-bold text-purple-700"
                  >
                    {landmark}
                  </motion.div>
                ))}
              </div>

              {/* Fact */}
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-8 h-8 text-yellow-600 fill-yellow-600" />
                  <h3 className="text-2xl font-bold text-orange-700">Fun Fact!</h3>
                </div>
                <p className="text-2xl font-bold text-gray-800 leading-relaxed">
                  {currentFact[language]}
                </p>
              </div>

              {/* Navigation */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextFact}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl py-6 text-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                <span>Next</span>
                <ChevronRight className="w-8 h-8" />
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="mt-6 mx-auto block bg-white text-purple-600 rounded-2xl px-8 py-4 text-xl font-bold shadow-lg"
          >
            🏠 Back to Menu
          </motion.button>
        </div>
      </div>
    );
  }

  // Quiz Mode
  if (gameMode === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-400 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Score */}
          <div className="flex justify-between items-center mb-6">
            <div className="bg-white rounded-full px-6 py-3 shadow-lg">
              <span className="text-2xl font-bold text-purple-600">
                Question {quizIndex + 1}/{quizQuestions.length}
              </span>
            </div>
            <div className="bg-yellow-400 rounded-full px-6 py-3 shadow-lg">
              <span className="text-2xl font-bold text-white flex items-center gap-2">
                <Star className="w-6 h-6 fill-white" />
                {score}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={quizIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="bg-white rounded-3xl p-8 shadow-2xl mb-6"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-7xl mb-4"
                >
                  {locations.find(l => l.id === currentQuestion.locationId)?.emoji || '🌍'}
                </motion.div>
                <h2 className="text-3xl font-bold text-purple-700 mb-4">
                  {currentQuestion.question[language]}
                </h2>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => !showFeedback && handleQuizAnswer(option)}
                    disabled={showFeedback}
                    className={`p-6 rounded-2xl font-bold text-2xl transition-all shadow-lg ${
                      showFeedback
                        ? option === currentQuestion.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-500'
                        : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    className={`mt-6 p-6 rounded-2xl text-center text-2xl font-bold ${
                      isCorrect
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {isCorrect ? '🎉 Correct! Great job!' : '❌ Try again next time!'}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="mx-auto block bg-white text-purple-600 rounded-2xl px-8 py-4 text-xl font-bold shadow-lg"
          >
            🏠 Back to Menu
          </motion.button>
        </div>
      </div>
    );
  }

  // Complete Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-400 py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="bg-white rounded-3xl p-12 shadow-2xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-9xl mb-6"
          >
            🏆
          </motion.div>
          <h1 className="text-5xl font-bold text-purple-700 mb-4">
            Amazing Work!
          </h1>
          <div className="text-7xl font-bold text-yellow-600 mb-6">
            {score}/40
          </div>
          <p className="text-2xl text-gray-700 mb-8">
            You're a geography superstar! 🌟
          </p>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl py-6 text-2xl font-bold shadow-lg"
            >
              🔄 Play Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/menu'}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl py-6 text-2xl font-bold shadow-lg"
            >
              🏠 Menu
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
