import { Link, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'

const navItems = [
  { path: '/', icon: 'map', label: 'Home' },
  { path: '/practice', icon: 'menu_book', label: 'Study', filled: true },
  { path: '/ai-tutor', icon: 'psychology', label: 'AI Tutor' },
  { path: '/profile', icon: 'person', label: 'Profile' },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-2 pb-6 bg-surface-container dark:bg-surface-container-highest z-50 rounded-t-lg border-t-4 border-surface-container-highest shadow-[0_-4px_10px_rgba(156,63,89,0.05)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              'flex flex-col items-center justify-center px-4 py-1 transition-all duration-75 active:translate-y-1',
              isActive 
                ? 'bg-primary-container text-on-primary-container rounded-xl border-b-4 border-primary' 
                : 'text-on-surface-variant hover:bg-surface-variant'
            )}
          >
            <span 
              className="material-symbols-outlined text-2xl"
              style={item.filled && isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="font-label-sm text-label-sm">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
