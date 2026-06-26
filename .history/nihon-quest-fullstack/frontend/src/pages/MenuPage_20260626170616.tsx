import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, GraduationCap, BookMarked, Baby, BookOpen, 
  Languages, Zap, Brain, Video, Gamepad2, PenTool, Target,
  Library, Sparkles, User, Bot, Calendar, Award, Settings
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface MenuTile {
  to: string
  icon: any
  title: string
  description: string
  color: string
  badge?: string
}

const MENU_TILES: MenuTile[] = [
  {
    to: '/',
    icon: Home,
    title: 'Home',
    description: 'Dashboard & overview',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    to: '/adult-learning',
    icon: GraduationCap,
    title: 'Adult Learning',
    description: 'Grammar, conversation & practice',
    color: 'from-indigo-500 to-blue-500',
    badge: 'NEW'
  },
  {
    to: '/kids-mode',
    icon: Baby,
    title: 'Kids Mode',
    description: 'Games for ages 4-8',
    color: 'from-pink-500 to-rose-500'
  },
  {
    to: '/study-journal',
    icon: BookMarked,
    title: 'Study Journal',
    description: 'Track progress & vocabulary',
    color: 'from-purple-500 to-pink-500',
    badge: 'NEW'
  },
  {
    to: '/grammar-learning',
    icon: BookOpen,
    title: 'Grammar N5-N1',
    description: 'SOV structure & registers',
    color: 'from-orange-500 to-amber-500'
  },
  {
    to: '/flashcards',
    icon: Zap,
    title: 'Flashcards',
    description: 'SRS vocabulary practice',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    to: '/dictionary',
    icon: Languages,
    title: 'Dictionary',
    description: 'Japanese-English lookup',
    color: 'from-green-500 to-emerald-500'
  },
  {
    to: '/tutor',
    icon: Bot,
    title: 'AI Tutor',
    description: 'ChatGPT language assistant',
    color: 'from-violet-500 to-purple-500'
  },
  {
    to: '/video-lessons',
    icon: Video,
    title: 'Video Lessons',
    description: 'Curated learning videos',
    color: 'from-red-500 to-pink-500'
  },
  {
    to: '/sentence-game',
    icon: Gamepad2,
    title: 'SOV Game',
    description: 'Sentence word order',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    to: '/grammar-game',
    icon: PenTool,
    title: 'Grammar Game',
    description: 'Particle matching',
    color: 'from-lime-500 to-green-500'
  },
  {
    to: '/quiz',
    icon: Brain,
    title: 'Quiz',
    description: 'Test your knowledge',
    color: 'from-fuchsia-500 to-pink-500'
  },
  {
    to: '/practice',
    icon: Target,
    title: 'Curriculum',
    description: 'Structured lessons',
    color: 'from-sky-500 to-blue-500'
  },
  {
    to: '/lessons',
    icon: Library,
    title: 'Lessons',
    description: 'Learning modules',
    color: 'from-amber-500 to-yellow-500'
  },
  {
    to: '/word-generator',
    icon: Sparkles,
    title: 'Word Generator',
    description: 'Practice vocabulary',
    color: 'from-rose-500 to-red-500'
  },
  {
    to: '/profile',
    icon: User,
    title: 'Profile',
    description: 'Your account & settings',
    color: 'from-slate-500 to-gray-500'
  }
]

const QUICK_STATS = [
  { label: 'Total Features', labelJP: 'ごうけいきのう', value: '16+', icon: Sparkles, color: 'text-yellow-600' },
  { label: 'Learning Modes', labelJP: 'がくしゅうモード', value: '8', icon: Target, color: 'text-blue-600' },
  { label: 'Games', labelJP: 'ゲーム', value: '5', icon: Gamepad2, color: 'text-green-600' },
  { label: 'Tools', labelJP: 'ツール', value: '3', icon: Settings, color: 'text-purple-600' }
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
              🎌 All Features
            </span>
          </motion.h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-2">
            Complete Japanese Learning Platform
          </p>
          <p className="text-sm sm:text-base text-gray-500">
            Everything you need from beginner to advanced
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
            All Features & Pages
          </h2>
          <p className="text-gray-600">Tap any tile to start learning!</p>
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
                        {tile.title}
                      </h3>
                      <p className="text-sm text-white/90 drop-shadow">
                        {tile.description}
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
              Recommended Learning Path
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-3xl mb-2">1️⃣</div>
                <h3 className="font-bold text-lg mb-2 text-green-600">Beginners</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Kids Mode (if young)</li>
                  <li>• Flashcards</li>
                  <li>• Grammar N5</li>
                  <li>• Video Lessons</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-3xl mb-2">2️⃣</div>
                <h3 className="font-bold text-lg mb-2 text-blue-600">Practice</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Adult Learning</li>
                  <li>• SOV Game</li>
                  <li>• Grammar Game</li>
                  <li>• Dictionary</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-3xl mb-2">3️⃣</div>
                <h3 className="font-bold text-lg mb-2 text-purple-600">Track</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Study Journal</li>
                  <li>• Checklist goals</li>
                  <li>• Quiz yourself</li>
                  <li>• Profile stats</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-3xl mb-2">4️⃣</div>
                <h3 className="font-bold text-lg mb-2 text-orange-600">Advanced</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• AI Tutor</li>
                  <li>• Conversation</li>
                  <li>• N3-N1 Grammar</li>
                  <li>• Curriculum</li>
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
              Back to Home
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  )
}
