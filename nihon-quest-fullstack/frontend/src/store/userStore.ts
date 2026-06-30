import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStats {
  totalXP: number
  wordsLearned: number
  dayStreak: number
  lessonsCompleted: number
  quizzesCompleted: number
  tutorInteractions: number
  lastActiveDate: string
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
  achievements: string[]
}

interface UserStore {
  stats: UserStats
  addXP: (amount: number) => void
  addWord: () => void
  incrementStreak: () => void
  completeLesson: () => void
  completeQuiz: (score: number) => void
  addTutorInteraction: () => void
  unlockAchievement: (id: string) => void
  resetProfile: () => void
  updateLevel: (level: UserStats['level']) => void
}

const defaultStats: UserStats = {
  totalXP: 0,
  wordsLearned: 0,
  dayStreak: 0,
  lessonsCompleted: 0,
  quizzesCompleted: 0,
  tutorInteractions: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  level: 'N5',
  achievements: []
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      stats: defaultStats,

      addXP: (amount: number) =>
        set((state) => ({
          stats: { ...state.stats, totalXP: state.stats.totalXP + amount }
        })),

      addWord: () =>
        set((state) => ({
          stats: {
            ...state.stats,
            wordsLearned: state.stats.wordsLearned + 1,
            totalXP: state.stats.totalXP + 10
          }
        })),

      incrementStreak: () =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0]
          const lastActive = new Date(state.stats.lastActiveDate)
          const todayDate = new Date(today)
          const daysDiff = Math.floor(
            (todayDate.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
          )

          let newStreak = state.stats.dayStreak
          if (daysDiff === 1) {
            // Consecutive day
            newStreak += 1
          } else if (daysDiff > 1) {
            // Streak broken, reset
            newStreak = 1
          }
          // If daysDiff === 0, same day, don't change streak

          return {
            stats: {
              ...state.stats,
              dayStreak: newStreak,
              lastActiveDate: today,
              totalXP: state.stats.totalXP + 5
            }
          }
        }),

      completeLesson: () =>
        set((state) => ({
          stats: {
            ...state.stats,
            lessonsCompleted: state.stats.lessonsCompleted + 1,
            totalXP: state.stats.totalXP + 50
          }
        })),

      completeQuiz: (score: number) =>
        set((state) => ({
          stats: {
            ...state.stats,
            quizzesCompleted: state.stats.quizzesCompleted + 1,
            totalXP: state.stats.totalXP + score * 10
          }
        })),

      addTutorInteraction: () =>
        set((state) => ({
          stats: {
            ...state.stats,
            tutorInteractions: state.stats.tutorInteractions + 1,
            totalXP: state.stats.totalXP + 5
          }
        })),

      unlockAchievement: (id: string) =>
        set((state) => {
          if (state.stats.achievements.includes(id)) {
            return state
          }
          return {
            stats: {
              ...state.stats,
              achievements: [...state.stats.achievements, id],
              totalXP: state.stats.totalXP + 100
            }
          }
        }),

      resetProfile: () =>
        set(() => ({
          stats: defaultStats
        })),

      updateLevel: (level: UserStats['level']) =>
        set((state) => ({
          stats: { ...state.stats, level }
        }))
    }),
    {
      name: 'nihongo-quest-user'
    }
  )
)
