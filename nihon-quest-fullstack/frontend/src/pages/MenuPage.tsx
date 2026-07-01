import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, GraduationCap, BookMarked, Baby, BookOpen, 
  Languages, Zap, Brain, Video, Gamepad2, PenTool, Target,
  Library, Sparkles, User, Bot, Calendar, Award, Settings
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { japaneseText } from '@/config/japaneseText'

interface MenuTile {
  to: string
  icon: any
  titleKey: keyof typeof japaneseText.menuPage.tiles
  color: string
  badge?: string
}

const MENU_TILES: MenuTile[] = [
  {
    to: '/',
    icon: Home,
    titleKey: 'home',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    to: '/adult-learning',
    icon: GraduationCap,
    titleKey: 'adultLearning',
    color: 'from-indigo-500 to-blue-500',
    badge: '新着 (NEW)'
  },
  {
    to: '/kids-mode',
    icon: Baby,
    titleKey: 'kidsMode',
    color: 'from-pink-500 to-rose-500'
  },
  {
    to: '/study-journal',
    icon: BookMarked,
    titleKey: 'studyJournal',
    color: 'from-purple-500 to-pink-500',
    badge: '新着 (NEW)'
  },
  {
    to: '/grammar-learning',
    icon: BookOpen,
    titleKey: 'grammarN5N1',
    color: 'from-orange-500 to-amber-500'
  },
  {
    to: '/flashcards',
    icon: Zap,
    titleKey: 'flashcards',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    to: '/dictionary',
    icon: Languages,
    titleKey: 'dictionary',
    color: 'from-green-500 to-emerald-500'
  },
  {
    to: '/tutor',
    icon: Bot,
    titleKey: 'aiTutor',
    color: 'from-violet-500 to-purple-500'
  },
  {
    to: '/video-lessons',
    icon: Video,
    titleKey: 'videoLessons',
    color: 'from-red-500 to-pink-500'
  },
  {
    to: '/sentence-game',
    icon: Gamepad2,
    titleKey: 'sovGame',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    to: '/grammar-game',
    icon: PenTool,
    titleKey: 'grammarGame',
    color: 'from-lime-500 to-green-500'
  },
  {
    to: '/quiz',
    icon: Brain,
    titleKey: 'quiz',
    color: 'from-fuchsia-500 to-pink-500'
  },
  {
    to: '/practice',
    icon: Target,
    titleKey: 'curriculum',
    color: 'from-sky-500 to-blue-500'
  },
  {
    to: '/lessons',
    icon: Library,
    titleKey: 'lessons',
    color: 'from-amber-500 to-yellow-500'
  },
  {
    to: '/word-generator',
    icon: Sparkles,
    titleKey: 'wordGenerator',
    color: 'from-rose-500 to-red-500'
  },
  {
    to: '/profile',
    icon: User,
    titleKey: 'profile',
    color: 'from-slate-500 to-gray-500'
  }
]

const QUICK_STATS = [
  { label: japaneseText.menuPage.stats.totalFeatures, value: '16+', icon: Sparkles, color: 'text-yellow-600' },
  { label: japaneseText.menuPage.stats.learningModes, value: '8', icon: Target, color: 'text-blue-600' },
  { label: japaneseText.menuPage.stats.games, value: '5', icon: Gamepad2, color: 'text-green-600' },
  { label: japaneseText.menuPage.stats.tools, value: '3', icon: Settings, color: 'text-purple-600' }
]

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {japaneseText.menuPage.title}
            </span>
          </motion.h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-2">
            {japaneseText.menuPage.subtitle}
          </p>
          <p className="text-sm sm:text-base text-gray-500">
            {japaneseText.menuPage.description}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {QUICK_STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-2 border-gray-200 hover:border-blue-400 transition-all">
                <CardContent className="pt-4 pb-4 text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Category Labels */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            {japaneseText.menuPage.allFeaturesPages}
          </h2>
          <p className="text-gray-600">{japaneseText.menuPage.tapToStart}</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {MENU_TILES.map((tile, index) => (
            <motion.div
              key={tile.to}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to={tile.to}>
                <Card className={`border-2 border-transparent hover:border-blue-400 transition-all shadow-md hover:shadow-xl overflow-hidden h-full bg-gradient-to-br ${tile.color} group`}>
                  <CardContent className="pt-6 pb-6 relative">
                    {tile.badge && (
                      <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                        {tile.badge}
                      </span>
                    )}
                    <div className="text-center">
                      <div className="bg-white/90 group-hover:bg-white w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                        <tile.icon className="w-8 h-8 text-gray-700" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 drop-shadow-md">
                        {japaneseText.menuPage.tiles[tile.titleKey].title}
                      </h3>
                      <p className="text-sm text-white/90 drop-shadow">
                        {japaneseText.menuPage.tiles[tile.titleKey].description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Learning Path Section */}
        <Card className="border-4 border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 mb-8">
          <CardContent className="pt-6 pb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
              {japaneseText.menuPage.learningPath.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-3xl mb-2">1️⃣</div>
                <h3 className="font-bold text-lg mb-2 text-green-600">{japaneseText.menuPage.learningPath.beginners.title}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {japaneseText.menuPage.learningPath.beginners.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-3xl mb-2">2️⃣</div>
                <h3 className="font-bold text-lg mb-2 text-blue-600">{japaneseText.menuPage.learningPath.practice.title}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {japaneseText.menuPage.learningPath.practice.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-3xl mb-2">3️⃣</div>
                <h3 className="font-bold text-lg mb-2 text-purple-600">{japaneseText.menuPage.learningPath.track.title}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {japaneseText.menuPage.learningPath.track.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-3xl mb-2">4️⃣</div>
                <h3 className="font-bold text-lg mb-2 text-orange-600">{japaneseText.menuPage.learningPath.advanced.title}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {japaneseText.menuPage.learningPath.advanced.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="w-5 h-5 inline mr-2" />
              {japaneseText.menuPage.backToHome}
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  )
}
