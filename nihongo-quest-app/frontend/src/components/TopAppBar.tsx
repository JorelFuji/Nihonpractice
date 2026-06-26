import { Link } from 'react-router-dom'
import { useUserStore } from '@/store/userStore'

export default function TopAppBar() {
  const { streak, gems, hearts } = useUserStore()

  return (
    <header className="bg-surface-container-low dark:bg-surface-container-lowest w-full top-0 sticky z-50 shadow-[0_2px_0_0_rgba(156,63,89,0.1)]">
      <div className="flex justify-between items-center px-container-margin py-md w-full max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-xs">
          <span 
            className="material-symbols-outlined text-primary text-headline-md" 
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight">
            KiraStudy
          </h1>
        </Link>

        <div className="flex items-center gap-md">
          <div className="flex items-center bg-surface-container px-3 py-1 rounded-full border-b-2 border-surface-container-highest">
            <span 
              className="material-symbols-outlined text-error mr-1 animate-pulse-slow" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
            <span className="font-label-bold text-on-surface">{hearts}</span>
          </div>
          <span className="text-primary font-label-bold">
            ⚡ {streak}  💎 {gems}
          </span>
        </div>
      </div>
    </header>
  )
}
