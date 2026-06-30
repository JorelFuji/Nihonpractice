import { useState, useEffect } from 'react'
import { BookOpen, CheckCircle, Circle, ChevronDown, ChevronRight, Trophy, Zap, Target } from 'lucide-react'
import { curriculumService, type Lesson } from '@/services/curriculumService'
import { useUserStore } from '@/store/userStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function CurriculumPage() {
  const { completeLesson, stats, incrementStreak } = useUserStore()
  const curriculum = curriculumService.getCurriculum()
  const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-1')
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [lessonNotes, setLessonNotes] = useState('')
  const [, setShowXPAnimation] = useState(false)
  
  const totalProgress = curriculumService.getTotalProgress()

  useEffect(() => {
    // Update streak on page visit
    incrementStreak()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    const progress = curriculumService.getLessonProgress(lesson.id)
    setLessonNotes(progress.notes)
  }

  const handleToggleComplete = () => {
    if (!selectedLesson) return
    const progress = curriculumService.getLessonProgress(selectedLesson.id)
    const newCompleted = !progress.completed
    curriculumService.saveProgress(selectedLesson.id, newCompleted, lessonNotes)
    setSelectedLesson({ ...selectedLesson, completed: newCompleted })
    
    // Award XP if completing (not uncompleting)
    if (newCompleted) {
      completeLesson()
      setShowXPAnimation(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setTimeout(() => setShowXPAnimation(false), 3000)
    }
  }

  const handleSaveNotes = () => {
    if (!selectedLesson) return
    const progress = curriculumService.getLessonProgress(selectedLesson.id)
    curriculumService.saveProgress(selectedLesson.id, progress.completed, lessonNotes)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Japanese Learning Curriculum</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Complete structured path from Beginner (N5) to Fluent (N1)
          </p>

          {/* Overall Progress */}
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-primary/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <span className="text-2xl font-bold">{totalProgress.percentage}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Lessons Completed</p>
                      <p className="font-bold">{totalProgress.completed} / {totalProgress.total}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Your Total XP</p>
                      <p className="font-bold flex items-center gap-1">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        {stats.totalXP.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${totalProgress.percentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Curriculum List */}
          <div className="lg:col-span-2 space-y-4">
            {curriculum.map((phase) => {
              const phaseProgress = curriculumService.getPhaseProgress(phase.id)
              const isExpanded = expandedPhase === phase.id

              return (
                <Card key={phase.id} className="border-2 border-primary/20">
                  <CardHeader
                    className="cursor-pointer hover:bg-primary/5 transition-colors"
                    onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-primary" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          )}
                          <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded">
                            {phase.level}
                          </span>
                          <CardTitle className="text-xl">{phase.title}</CardTitle>
                        </div>
                        <CardDescription className="ml-7">
                          {phase.goal} • {phase.duration}
                        </CardDescription>
                        <div className="ml-7 mt-2 flex gap-4 text-sm">
                          <span className="text-muted-foreground">📝 {phase.kanji}</span>
                          <span className="text-muted-foreground">💬 {phase.vocabulary}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{phaseProgress.percentage}%</p>
                        <p className="text-xs text-muted-foreground">
                          {phaseProgress.completed}/{phaseProgress.total} lessons
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="space-y-3">
                          {phase.units.map((unit) => {
                            const isUnitExpanded = expandedUnit === unit.id

                            return (
                              <div key={unit.id} className="border rounded-lg overflow-hidden">
                                <div
                                  className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                  onClick={() => setExpandedUnit(isUnitExpanded ? null : unit.id)}
                                >
                                  <div className="flex items-center gap-2">
                                    {isUnitExpanded ? (
                                      <ChevronDown className="w-4 h-4" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4" />
                                    )}
                                    <BookOpen className="w-4 h-4 text-secondary" />
                                    <span className="font-semibold">{unit.title}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground ml-10">{unit.description}</p>
                                </div>

                                <AnimatePresence>
                                  {isUnitExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="border-t"
                                    >
                                      {unit.lessons.map((lesson) => {
                                        const progress = curriculumService.getLessonProgress(lesson.id)

                                        return (
                                          <div
                                            key={lesson.id}
                                            className={`p-3 flex items-center gap-3 hover:bg-primary/5 cursor-pointer transition-colors ${
                                              selectedLesson?.id === lesson.id ? 'bg-primary/10' : ''
                                            }`}
                                            onClick={() => handleLessonClick(lesson)}
                                          >
                                            {progress.completed ? (
                                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            ) : (
                                              <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                              <p className="font-medium">{lesson.title}</p>
                                              <p className="text-sm text-muted-foreground truncate">
                                                {lesson.description}
                                              </p>
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )
                          })}
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              )
            })}
          </div>

          {/* Lesson Detail Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              {selectedLesson ? (
                <Card className="border-2 border-secondary/30">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span className="flex-1">{selectedLesson.title}</span>
                      <Button
                        size="sm"
                        variant={curriculumService.getLessonProgress(selectedLesson.id).completed ? 'default' : 'outline'}
                        onClick={handleToggleComplete}
                      >
                        {curriculumService.getLessonProgress(selectedLesson.id).completed ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Complete
                          </>
                        ) : (
                          <>
                            <Circle className="w-4 h-4 mr-1" />
                            Mark Done
                          </>
                        )}
                      </Button>
                    </CardTitle>
                    <CardDescription>{selectedLesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Structure:</h4>
                      <p className="text-lg font-mono bg-gray-50 p-2 rounded">{selectedLesson.structure}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <div className="space-y-3">
                        {selectedLesson.examples.map((example, i) => (
                          <div key={i} className="bg-gradient-to-r from-primary/5 to-secondary/5 p-3 rounded-lg">
                            <p className="text-lg font-bold mb-1">{example.japanese}</p>
                            <p className="text-sm text-muted-foreground mb-1">{example.romaji}</p>
                            <p className="text-sm">{example.english}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Notes:</h4>
                      <textarea
                        className="w-full border-2 border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        rows={4}
                        placeholder="Add your notes here..."
                        value={lessonNotes}
                        onChange={(e) => setLessonNotes(e.target.value)}
                        onBlur={handleSaveNotes}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Notes are auto-saved when you click outside
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-gray-200">
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Select a lesson to view details and track progress</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
