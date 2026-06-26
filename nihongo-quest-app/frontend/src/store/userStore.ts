import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  userId: string | null
  username: string
  level: number
  xp: number
  streak: number
  gems: number
  hearts: number
  totalKanji: number
  totalVocab: number
  totalGrammar: number
  currentJLPTLevel: string
  setUser: (user: Partial<UserState>) => void
  addXP: (amount: number) => void
  addGems: (amount: number) => void
  useHeart: () => void
  refillHearts: () => void
  incrementStreak: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      username: 'Guest',
      level: 1,
      xp: 0,
      streak: 5,
      gems: 120,
      hearts: 5,
      totalKanji: 0,
      totalVocab: 0,
      totalGrammar: 0,
      currentJLPTLevel: 'N5',
      
      setUser: (user) => set((state) => ({ ...state, ...user })),
      
      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount
        const xpForNextLevel = state.level * 100
        if (newXP >= xpForNextLevel) {
          return {
            xp: newXP - xpForNextLevel,
            level: state.level + 1,
          }
        }
        return { xp: newXP }
      }),
      
      addGems: (amount) => set((state) => ({ gems: state.gems + amount })),
      
      useHeart: () => set((state) => ({ 
        hearts: Math.max(0, state.hearts - 1) 
      })),
      
      refillHearts: () => set(() => ({ hearts: 5 })),
      
      incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
    }),
    {
      name: 'nihongo-quest-user',
    }
  )
)
