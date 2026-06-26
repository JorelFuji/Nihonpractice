import { User, Award, Flame, Calendar, TrendingUp } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-8 pb-24">
      <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-primary/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary">Learning Ninja</h2>
            <p className="text-on-surface-variant">JLPT N5 Student</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">1,240</p>
            <p className="text-sm text-on-surface-variant">Total XP</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary">156</p>
            <p className="text-sm text-on-surface-variant">Words Learned</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-tertiary">7</p>
            <p className="text-sm text-on-surface-variant">Day Streak</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-primary mb-4">Achievements</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <AchievementCard
          icon={Flame}
          title="7 Day Streak"
          description="Keep it going!"
          earned
        />
        <AchievementCard
          icon={Award}
          title="First Lesson"
          description="Complete your first lesson"
          earned
        />
        <AchievementCard
          icon={Calendar}
          title="30 Day Streak"
          description="Practice for 30 days straight"
          earned={false}
        />
        <AchievementCard
          icon={TrendingUp}
          title="Fast Learner"
          description="Complete 50 reviews in one day"
          earned={false}
        />
      </div>
    </div>
  )
}

function AchievementCard({ icon: Icon, title, description, earned }: any) {
  return (
    <div className={`rounded-xl p-5 border-2 ${
      earned ? 'bg-white border-primary/20' : 'bg-surface-container border-on-surface-variant/20 opacity-60'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${earned ? 'bg-primary/10' : 'bg-surface'}`}>
          <Icon className={`w-6 h-6 ${earned ? 'text-primary' : 'text-on-surface-variant'}`} />
        </div>
        <div>
          <h4 className="font-bold text-on-surface">{title}</h4>
          <p className="text-sm text-on-surface-variant">{description}</p>
        </div>
      </div>
    </div>
  )
}
