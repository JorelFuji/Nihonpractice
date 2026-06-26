import { BookOpen, Lock } from 'lucide-react'

export default function LessonsPage() {
  const lessons = [
    { id: 1, title: 'Hiragana Basics', level: 'N5', locked: false, progress: 100 },
    { id: 2, title: 'Katakana Basics', level: 'N5', locked: false, progress: 75 },
    { id: 3, title: 'Basic Greetings', level: 'N5', locked: false, progress: 50 },
    { id: 4, title: 'Particles は and が', level: 'N5', locked: true, progress: 0 },
    { id: 5, title: 'Numbers and Counting', level: 'N5', locked: true, progress: 0 },
  ]

  return (
    <div className="max-w-4xl mx-auto px-5 py-8 pb-24">
      <h2 className="text-3xl font-bold text-primary mb-6">Lessons</h2>
      
      <div className="space-y-4">
        {lessons.map(lesson => (
          <div
            key={lesson.id}
            className={`bg-white rounded-xl p-6 border-2 transition-all ${
              lesson.locked
                ? 'border-on-surface-variant/20 opacity-60'
                : 'border-primary/10 hover:border-primary/30 cursor-pointer active:scale-[0.98]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${lesson.locked ? 'bg-surface-container' : 'bg-primary/10'}`}>
                  {lesson.locked ? (
                    <Lock className="w-6 h-6 text-on-surface-variant" />
                  ) : (
                    <BookOpen className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-on-surface">{lesson.title}</h3>
                  <span className="text-sm text-on-surface-variant">{lesson.level}</span>
                </div>
              </div>
              {!lesson.locked && lesson.progress < 100 && (
                <span className="text-primary font-bold">{lesson.progress}%</span>
              )}
              {!lesson.locked && lesson.progress === 100 && (
                <span className="text-secondary font-bold">✓ Complete</span>
              )}
            </div>
            {!lesson.locked && lesson.progress > 0 && (
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all rounded-full"
                  style={{ width: `${lesson.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
