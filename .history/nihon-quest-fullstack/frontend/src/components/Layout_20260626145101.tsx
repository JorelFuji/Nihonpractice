import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Bot, User, Flame, Heart, Baby, BookMarked } from 'lucide-react'

export default function Layout() {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-background font-quicksand flex flex-col">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 backdrop-blur-md shadow-sm border-b-2 border-primary/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Flame className="text-primary w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
              日本Quest
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center bg-white/50 backdrop-blur px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full border-2 border-error/20 shadow-sm">
              <Heart className="text-error w-4 h-4 sm:w-5 sm:h-5 mr-0.5 sm:mr-1" fill="currentColor" />
              <span className="font-bold text-on-surface text-sm sm:text-base">5</span>
            </div>
            <span className="text-primary font-bold px-2 sm:px-3 py-1 bg-white/50 backdrop-blur rounded-full border-2 border-primary/20 text-xs sm:text-sm lg:text-base">
              ⚡ 5  💎 120
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t-2 border-primary/20 shadow-2xl safe-area-inset-bottom">
        <div className="max-w-7xl mx-auto px-1 sm:px-2 py-1.5 sm:py-2 flex justify-around items-center">
          <NavItem to="/" icon={Home} label="Home" active={isActive('/')} />
          <NavItem to="/kids-mode" icon={Baby} label="Kids" active={isActive('/kids-mode')} />
          <NavItem to="/study-journal" icon={BookMarked} label="Journal" active={isActive('/study-journal')} />
          <NavItem to="/tutor" icon={Bot} label="AI Tutor" active={isActive('/tutor')} />
          <NavItem to="/profile" icon={User} label="Profile" active={isActive('/profile')} />
        </div>
      </nav>
    </div>
  )
}

function NavItem({ to, icon: Icon, label, active }: {
  to: string
  icon: any
  label: string
  active: boolean
}) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all ${
        active
          ? 'bg-primary-container text-on-primary-container border-b-4 border-primary'
          : 'text-on-surface-variant hover:bg-surface'
      }`}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1" fill={active ? 'currentColor' : 'none'} />
      <span className="text-[10px] sm:text-xs font-semibold">{label}</span>
    </Link>
  )
}
