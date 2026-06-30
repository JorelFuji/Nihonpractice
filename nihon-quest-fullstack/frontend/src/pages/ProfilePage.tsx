import { useState } from 'react'
import { User, Award, Flame, Calendar, TrendingUp, RotateCcw, AlertTriangle, BookOpen, MessageCircle, Trophy } from 'lucide-react'
import { useUserStore } from '@/store/userStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import confetti from 'canvas-confetti'

export default function ProfilePage() {
  const { stats, resetProfile, updateLevel } = useUserStore()
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleResetProfile = () => {
    resetProfile()
    setShowResetConfirm(false)
    // Show notification
    alert('Profile reset successfully! All progress has been cleared.')
  }

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateLevel(e.target.value as any)
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-8 pb-24">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-primary/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">Learning Ninja</h2>
              <p className="text-on-surface-variant">JLPT {stats.level} Student</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-on-surface-variant">Target Level:</span>
                <select
                  value={stats.level}
                  onChange={handleLevelChange}
                  className="px-3 py-1 rounded-lg border-2 border-primary/20 text-sm font-semibold text-primary focus:outline-none focus:border-primary"
                >
                  <option value="N5">N5 (Beginner)</option>
                  <option value="N4">N4 (Elementary)</option>
                  <option value="N3">N3 (Intermediate)</option>
                  <option value="N2">N2 (Advanced)</option>
                  <option value="N1">N1 (Expert)</option>
                </select>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowResetConfirm(true)}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Profile
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <p className="text-3xl font-bold text-primary">{stats.totalXP}</p>
            <p className="text-sm text-on-surface-variant">Total XP</p>
          </div>
          <div className="text-center p-3 bg-secondary/5 rounded-lg">
            <p className="text-3xl font-bold text-secondary">{stats.wordsLearned}</p>
            <p className="text-sm text-on-surface-variant">Words Learned</p>
          </div>
          <div className="text-center p-3 bg-tertiary/5 rounded-lg">
            <p className="text-3xl font-bold text-tertiary">{stats.dayStreak}</p>
            <p className="text-sm text-on-surface-variant">Day Streak</p>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-2 border-2 border-gray-200 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <p className="text-xl font-bold">{stats.lessonsCompleted}</p>
            </div>
            <p className="text-xs text-on-surface-variant">Lessons</p>
          </div>
          <div className="text-center p-2 border-2 border-gray-200 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <p className="text-xl font-bold">{stats.quizzesCompleted}</p>
            </div>
            <p className="text-xs text-on-surface-variant">Quizzes</p>
          </div>
          <div className="text-center p-2 border-2 border-gray-200 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <p className="text-xl font-bold">{stats.tutorInteractions}</p>
            </div>
            <p className="text-xs text-on-surface-variant">AI Chats</p>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full border-4 border-error">
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <AlertTriangle className="w-16 h-16 text-error mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-error mb-2">
                  Reset Profile?
                </h3>
                <p className="text-on-surface-variant">
                  This will permanently delete:
                </p>
                <ul className="text-left mt-3 space-y-1 text-sm">
                  <li>✗ All {stats.totalXP} XP points</li>
                  <li>✗ {stats.wordsLearned} learned words</li>
                  <li>✗ {stats.dayStreak} day streak</li>
                  <li>✗ {stats.lessonsCompleted} completed lessons</li>
                  <li>✗ {stats.quizzesCompleted} quiz scores</li>
                  <li>✗ All {stats.achievements.length} achievements</li>
                </ul>
                <p className="mt-3 text-sm text-error font-bold">
                  This action cannot be undone!
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 gap-2"
                  onClick={handleResetProfile}
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Everything
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <h3 className="text-2xl font-bold text-primary mb-4">
        Achievements ({stats.achievements.length}/12)
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <AchievementCard
          icon={Flame}
          title="🔥 First Flame"
          description="Start your streak"
          earned={stats.dayStreak >= 1}
          progress={`${Math.min(stats.dayStreak, 1)}/1 days`}
        />
        <AchievementCard
          icon={Flame}
          title="🔥 Week Warrior"
          description="7 day streak"
          earned={stats.dayStreak >= 7}
          progress={`${Math.min(stats.dayStreak, 7)}/7 days`}
        />
        <AchievementCard
          icon={Calendar}
          title="🗓️ Month Master"
          description="30 day streak"
          earned={stats.dayStreak >= 30}
          progress={`${Math.min(stats.dayStreak, 30)}/30 days`}
        />
        <AchievementCard
          icon={TrendingUp}
          title="💯 Century Club"
          description="100 day streak"
          earned={stats.dayStreak >= 100}
          progress={`${Math.min(stats.dayStreak, 100)}/100 days`}
        />
        <AchievementCard
          icon={Award}
          title="📚 First Steps"
          description="Complete your first lesson"
          earned={stats.lessonsCompleted >= 1}
          progress={`${Math.min(stats.lessonsCompleted, 1)}/1 lessons`}
        />
        <AchievementCard
          icon={BookOpen}
          title="📖 Dedicated Student"
          description="Complete 10 lessons"
          earned={stats.lessonsCompleted >= 10}
          progress={`${Math.min(stats.lessonsCompleted, 10)}/10 lessons`}
        />
        <AchievementCard
          icon={Trophy}
          title="🏆 Quiz Novice"
          description="Complete 5 quizzes"
          earned={stats.quizzesCompleted >= 5}
          progress={`${Math.min(stats.quizzesCompleted, 5)}/5 quizzes`}
        />
        <AchievementCard
          icon={Trophy}
          title="🎯 Quiz Master"
          description="Complete 25 quizzes"
          earned={stats.quizzesCompleted >= 25}
          progress={`${Math.min(stats.quizzesCompleted, 25)}/25 quizzes`}
        />
        <AchievementCard
          icon={MessageCircle}
          title="💬 AI Friend"
          description="10 AI tutor chats"
          earned={stats.tutorInteractions >= 10}
          progress={`${Math.min(stats.tutorInteractions, 10)}/10 chats`}
        />
        <AchievementCard
          icon={TrendingUp}
          title="📈 Word Collector"
          description="Learn 50 words"
          earned={stats.wordsLearned >= 50}
          progress={`${Math.min(stats.wordsLearned, 50)}/50 words`}
        />
        <AchievementCard
          icon={TrendingUp}
          title="📚 Vocabulary Master"
          description="Learn 200 words"
          earned={stats.wordsLearned >= 200}
          progress={`${Math.min(stats.wordsLearned, 200)}/200 words`}
        />
        <AchievementCard
          icon={Trophy}
          title="⭐ XP Millionaire"
          description="Earn 10,000 XP"
          earned={stats.totalXP >= 10000}
          progress={`${Math.min(stats.totalXP, 10000).toLocaleString()}/10,000 XP`}
        />
      </div>
    </div>
  )
}

function AchievementCard({ icon: Icon, title, description, earned, progress }: any) {
  return (
    <div className={`rounded-xl p-4 border-2 transition-all ${
      earned
        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400 shadow-lg'
        : 'bg-surface-container border-on-surface-variant/20 opacity-60'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-xl ${earned ? 'bg-yellow-400/30' : 'bg-surface'}`}>
          <Icon className={`w-6 h-6 ${earned ? 'text-yellow-700' : 'text-on-surface-variant'}`} />
        </div>
        <div className="flex-1">
          <h4 className={`font-bold ${earned ? 'text-yellow-900' : 'text-on-surface'}`}>
            {title}
          </h4>
          <p className="text-sm text-on-surface-variant mb-1">{description}</p>
          {progress && (
            <p className="text-xs font-mono font-semibold text-on-surface-variant">
              {progress}
            </p>
          )}
        </div>
        {earned && (
          <div className="text-2xl">✅</div>
        )}
      </div>
    </div>
  )
}
