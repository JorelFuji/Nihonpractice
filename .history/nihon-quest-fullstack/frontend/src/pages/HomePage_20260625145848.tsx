import { Link } from 'react-router-dom'
import { BookOpen, Bot, Target, Sparkles, Brain, Calendar } from 'lucide-react'
import WordOfDay from '@/components/WordOfDay'

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-8 pb-24">
      <div className="bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-2xl p-8 mb-8 border-2 border-primary/20">
        <h2 className="text-4xl font-bold text-primary mb-4">
          おはよう, Learner! 🌸
        </h2>
        <p className="text-lg text-on-surface-variant mb-6">
          Welcome back to your Japanese learning journey. Let's make today count!
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/practice"
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all active:scale-95 border-b-4 border-primary/50"
          >
            Start Practice
          </Link>
          <Link
            to="/quiz"
            className="bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-all active:scale-95 border-b-4 border-secondary/50"
          >
            Take Quiz
          </Link>
          <Link
            to="/tutor"
            className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-surface-container transition-all active:scale-95 border-2 border-primary/20"
          >
            Ask AI Sensei
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <WordOfDay mode="daily" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <StatCard
          icon={Target}
          label="Current Streak"
          value="7 days"
          color="primary"
        />
        <StatCard
          icon={Sparkles}
          label="Total EXP"
          value="1,240 XP"
          color="secondary"
        />
      </div>

      <h3 className="text-2xl font-bold text-primary mb-4">Quick Access</h3>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Link to="/quiz" className="block">
          <div className="bg-white rounded-xl p-5 border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg">
            <Brain className="w-8 h-8 text-primary mb-2" />
            <h4 className="font-bold mb-1">Quiz</h4>
            <p className="text-sm text-muted-foreground">Test your knowledge</p>
          </div>
        </Link>
        <Link to="/word-generator" className="block">
          <div className="bg-white rounded-xl p-5 border-2 border-secondary/10 hover:border-secondary/30 transition-all hover:shadow-lg">
            <Sparkles className="w-8 h-8 text-secondary mb-2" />
            <h4 className="font-bold mb-1">Random Word</h4>
            <p className="text-sm text-muted-foreground">Discover new vocab</p>
          </div>
        </Link>
        <Link to="/dictionary" className="block">
          <div className="bg-white rounded-xl p-5 border-2 border-tertiary/10 hover:border-tertiary/30 transition-all hover:shadow-lg">
            <BookOpen className="w-8 h-8 text-tertiary mb-2" />
            <h4 className="font-bold mb-1">Dictionary</h4>
            <p className="text-sm text-muted-foreground">Search words</p>
          </div>
        </Link>
        <Link to="/tutor" className="block">
          <div className="bg-white rounded-xl p-5 border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg">
            <Bot className="w-8 h-8 text-primary mb-2" />
            <h4 className="font-bold mb-1">AI Tutor</h4>
            <p className="text-sm text-muted-foreground">Get help from AI</p>
          </div>
        </Link>
      </div>

      <h3 className="text-2xl font-bold text-primary mb-4">Today's Goals</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <GoalCard
          icon={BookOpen}
          title="Daily Reviews"
          progress={15}
          total={20}
          color="primary"
        />
        <GoalCard
          icon={Brain}
          title="Quiz Score"
          progress={8}
          total={10}
          color="secondary"
        />
        <GoalCard
          icon={Target}
          title="New Words"
          progress={5}
          total={10}
          color="tertiary"
        />
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className={`bg-white rounded-2xl p-6 border-2 border-${color}/10`}>
      <div className="flex items-center gap-4">
        <div className={`bg-${color}/10 p-4 rounded-xl`}>
          <Icon className={`w-8 h-8 text-${color}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-on-surface-variant">{label}</p>
          <p className={`text-3xl font-bold text-${color}`}>{value}</p>
        </div>
      </div>
    </div>
  )
}

function GoalCard({ icon: Icon, title, progress, total, color }: any) {
  const percentage = (progress / total) * 100

  return (
    <div className="bg-white rounded-xl p-5 border-2 border-primary/10">
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-6 h-6 text-${color}`} />
        <h4 className="font-bold text-on-surface">{title}</h4>
      </div>
      <div className="mb-2">
        <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
          <div
            className={`bg-${color} h-full transition-all rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <p className="text-sm text-on-surface-variant">
        {progress} / {total}
      </p>
    </div>
  )
}
