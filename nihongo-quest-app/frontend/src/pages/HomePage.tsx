import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUserStore } from '@/store/userStore'

const features = [
  {
    title: 'Daily Practice',
    description: 'Master vocabulary and grammar with spaced repetition',
    icon: 'menu_book',
    color: 'bg-primary-container',
    textColor: 'text-on-primary-container',
    link: '/practice',
  },
  {
    title: 'Handwriting',
    description: 'Practice writing hiragana, katakana, and kanji',
    icon: 'edit',
    color: 'bg-secondary-container',
    textColor: 'text-on-secondary-container',
    link: '/handwriting',
  },
  {
    title: 'AI Tutor',
    description: 'Get instant help with grammar and conversation',
    icon: 'psychology',
    color: 'bg-tertiary-container',
    textColor: 'text-on-tertiary-container',
    link: '/ai-tutor',
  },
  {
    title: 'Learning Path',
    description: 'Follow your personalized curriculum',
    icon: 'map',
    color: 'bg-primary-container',
    textColor: 'text-on-primary-container',
    link: '/roadmap',
  },
]

const stats = [
  { label: 'Kanji Learned', value: '150', icon: '🔥' },
  { label: 'Vocabulary', value: '450', icon: '📚' },
  { label: 'Grammar Points', value: '28', icon: '✨' },
  { label: 'Day Streak', value: '12', icon: '⚡' },
]

export default function HomePage() {
  const { username, level, xp, currentJLPTLevel } = useUserStore()
  const xpForNextLevel = level * 100
  const xpProgress = (xp / xpForNextLevel) * 100

  return (
    <div className="max-w-7xl mx-auto px-container-margin py-lg">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-xl"
      >
        <div className="flex items-center gap-md mb-md">
          <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center text-4xl">
            🐕
          </div>
          <div>
            <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary">
              おかえり、{username}さん！
            </h1>
            <p className="font-body-lg text-on-surface-variant">
              Welcome back! Ready to continue your Japanese journey?
            </p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white rounded-lg p-md border-2 border-surface-container-highest">
          <div className="flex justify-between items-center mb-sm">
            <div className="flex items-center gap-sm">
              <span className="font-label-bold text-primary">Level {level}</span>
              <span className="text-on-surface-variant">•</span>
              <span className="font-body-md text-on-surface-variant">
                {currentJLPTLevel} Student
              </span>
            </div>
            <span className="font-label-sm text-on-surface-variant">
              {xp} / {xpForNextLevel} XP
            </span>
          </div>
          <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary-container"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-card-gap mb-xl">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-md border-2 border-surface-container-highest text-center"
          >
            <div className="text-3xl mb-sm">{stat.icon}</div>
            <div className="font-headline-md text-headline-md text-primary mb-xs">
              {stat.value}
            </div>
            <div className="font-label-sm text-on-surface-variant">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Feature Cards */}
      <h2 className="font-headline-md text-headline-md text-on-surface mb-md">
        What would you like to practice?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-card-gap mb-xl">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={feature.link}>
              <div className="kawaii-card group cursor-pointer">
                <div className="flex items-start gap-md">
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <span className={`material-symbols-outlined text-3xl ${feature.textColor}`}>
                      {feature.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-label-bold text-on-surface mb-xs group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="font-body-md text-on-surface-variant">
                      {feature.description}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Daily Goal */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-lg border-2 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">
              Daily Goal: 3 / 5 lessons
            </h3>
            <p className="font-body-md text-on-surface-variant">
              Complete 2 more lessons to maintain your streak!
            </p>
          </div>
          <div className="text-6xl animate-pulse-slow">🎯</div>
        </div>
        <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden mt-md">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  )
}
