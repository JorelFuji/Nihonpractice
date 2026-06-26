import { Outlet } from 'react-router-dom'
import TopAppBar from './TopAppBar'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopAppBar />
      <main className="flex-grow pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
